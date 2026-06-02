import { NextRequest, NextResponse } from "next/server"
import { composePrompt, isReasoningModel, PROMPT_VERSION } from "@/lib/prompts"
import type { Platform, Tone } from "@/lib/prompts"

const VALID_PLATFORMS = new Set<Platform>([
  "instagram", "tiktok", "linkedin", "twitter", "facebook", "youtube",
])
const VALID_TONES = new Set<Tone>([
  "engaging", "professional", "funny", "inspirational", "casual",
])

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      imageBase64?: string
      imageType?: string
      platform?: string
      tone?: string
      hashtagCount?: number
      model?: string
    }

    const { imageBase64, imageType, platform, tone, hashtagCount, model } = body

    // ── Validation ────────────────────────────────────────────────────────────
    if (!imageBase64 || !imageType) {
      return NextResponse.json({ error: "Image is required." }, { status: 400 })
    }
    if (!platform || !VALID_PLATFORMS.has(platform as Platform)) {
      return NextResponse.json({ error: "Invalid platform." }, { status: 400 })
    }
    if (!tone || !VALID_TONES.has(tone as Tone)) {
      return NextResponse.json({ error: "Invalid tone." }, { status: 400 })
    }

    const selectedModel = model || "google/gemma-4-31b-it:free"
    const count = Math.max(0, Math.min(20, Number(hashtagCount) || 0))

    // ── Compose prompt ────────────────────────────────────────────────────────
    const composed = composePrompt({
      platform: platform as Platform,
      tone: tone as Tone,
      hashtagCount: count,
      model: selectedModel,
    })

    // Inject real image into the placeholder content block
    const userContent = composed.userMessage.content.map((block) => {
      const b = block as { type: string; image_url?: { url: string } }
      if (b.type === "image_url" && b.image_url?.url === "__IMAGE_PLACEHOLDER__") {
        return {
          type: "image_url",
          image_url: { url: `data:${imageType};base64,${imageBase64}` },
        }
      }
      return block
    })

    // ── Call OpenRouter ───────────────────────────────────────────────────────
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://captiongenie.app",
        "X-Title": "Caption Genie",
      },
      body: JSON.stringify({
        model: selectedModel,
        messages: [
          composed.systemMessage,
          { role: "user", content: userContent },
        ],
        max_tokens: composed.maxTokens,
        temperature: composed.temperature,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error(`[${PROMPT_VERSION}] OpenRouter error (${response.status}):`, err)
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit reached. Wait a moment and try again." },
          { status: 429 }
        )
      }
      return NextResponse.json(
        { error: "AI service error. Please try again." },
        { status: 500 }
      )
    }

    // ── Parse response ────────────────────────────────────────────────────────
    const data = await response.json()

    // OpenRouter sometimes returns errors in the body with HTTP 200
    if (data.error) {
      console.error(`[${PROMPT_VERSION}] Body-level error (model=${selectedModel}):`, data.error)
      const msg = typeof data.error === "object" ? data.error.message : String(data.error)
      return NextResponse.json(
        { error: `AI error: ${msg ?? "Please try again."}` },
        { status: 500 }
      )
    }

    const choice = data.choices?.[0]
    if (!choice) {
      console.error(`[${PROMPT_VERSION}] No choices in response (model=${selectedModel}):`, JSON.stringify(data))
      return NextResponse.json(
        { error: "No response from AI. Please try again." },
        { status: 500 }
      )
    }

    const finishReason = choice?.finish_reason as string | undefined
    const rawContent = choice?.message?.content

    // Normalize: some models return content as array of content blocks
    let content: string | undefined
    if (typeof rawContent === "string") {
      content = rawContent || undefined
    } else if (Array.isArray(rawContent)) {
      content = rawContent
        .filter((b: { type: string; text?: string }) => b.type === "text")
        .map((b: { type: string; text?: string }) => b.text ?? "")
        .join("") || undefined
    }

    // Fallback: some reasoning models surface output in message.reasoning
    if (!content && choice?.message?.reasoning) {
      console.warn(`[${PROMPT_VERSION}] Content empty, falling back to reasoning field (model=${selectedModel})`)
      content = choice.message.reasoning as string
    }

    if (!content) {
      console.error(
        `[${PROMPT_VERSION}] Empty content (model=${selectedModel}, finish_reason=${finishReason}):`,
        JSON.stringify(choice)
      )
      return NextResponse.json(
        { error: "No response from AI. Please try again." },
        { status: 500 }
      )
    }

    if (finishReason === "length") {
      console.error(
        `[${PROMPT_VERSION}] Token limit hit (model=${selectedModel}, reasoning=${isReasoningModel(selectedModel)}):`,
        content
      )
      return NextResponse.json(
        { error: "AI ran out of tokens. Try fewer hashtags or switch to a different model." },
        { status: 500 }
      )
    }

    // Extract JSON — handles markdown fences and surrounding text
    const jsonMatch =
      content.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/) ??
      content.match(/\{[\s\S]*?\}(?=\s*$)/) ??
      content.match(/\{[\s\S]*\}/)

    if (!jsonMatch) {
      console.error(`[${PROMPT_VERSION}] Unparseable response:`, content)
      return NextResponse.json(
        { error: "Unexpected AI response format. Please try again." },
        { status: 500 }
      )
    }

    const jsonStr = jsonMatch[1] ?? jsonMatch[0]
    const parsed = JSON.parse(jsonStr) as { caption?: string; hashtags?: string[] }

    return NextResponse.json({
      caption: parsed.caption ?? "",
      hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : [],
    })
  } catch (error) {
    console.error(`[${PROMPT_VERSION}] Generation error:`, error)
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    )
  }
}