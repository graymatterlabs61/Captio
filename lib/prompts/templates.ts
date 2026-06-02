import { PLATFORM_CONFIGS } from "./platforms"
import { TONE_LIBRARY } from "./tones"
import { FEW_SHOT_EXAMPLES, formatExample } from "./few-shot"
import { buildSystemMessage, PROMPT_VERSION } from "./system"
import type { PromptConfig, ComposedPrompt } from "./types"

// ─── Model detection ──────────────────────────────────────────────────────────

/**
 * Reasoning models (nemotron-reasoning, deepseek-r1, qwq, etc.) run chain-of-thought
 * internally — explicit CoT steps waste their tokens. Use direct prompts instead.
 */
export function isReasoningModel(model: string): boolean {
  return /reasoning|thinking|\br1\b|\br2\b|qwq|deepseek-r/i.test(model)
}

/**
 * Anthropic-compatible providers support cache_control on content blocks.
 * Others silently ignore it — safe to include, but we skip for cleanliness.
 */
export function supportsCaching(model: string): boolean {
  return /claude|anthropic/i.test(model)
}

// ─── Prompt builders ──────────────────────────────────────────────────────────

function hashtagInstruction(count: number): string {
  return count === 0
    ? "No hashtags. Set hashtags to [] (empty array)."
    : `Exactly ${count} highly relevant hashtags.`
}

/**
 * CoT prompt for standard models.
 * Explicit observe → write → (optional self-check) → output structure.
 */
function buildCotPrompt(config: PromptConfig): string {
  const pc = PLATFORM_CONFIGS[config.platform]
  const tc = TONE_LIBRARY[config.tone]
  const example = formatExample(FEW_SHOT_EXAMPLES[config.platform])
  const hashtags = hashtagInstruction(config.hashtagCount)

  const rules = pc.rules.map((r, i) => `${i + 1}. ${r}`).join("\n")
  const negatives = pc.negativeRules.map((r) => `• ${r}`).join("\n")

  const selfCheckBlock = pc.selfCheck
    ? `\nStep 3 — Self-check before outputting:
   ✓ Opens with insight, not pleasantries
   ✓ Short paragraphs separated by blank lines
   ✓ Delivers one concrete takeaway
   ✓ Ends with a thought-provoking question
   Fix anything that fails, then proceed to Step 4.\n`
    : ""

  const outputStep = pc.selfCheck ? "Step 4" : "Step 3"

  return `Analyze this image, then write a ${pc.name} caption.

Step 1 — Observe: Study the subject, mood, setting, colors, action, and any visible context or text.
Step 2 — Write: Apply every requirement below to produce the caption.${selfCheckBlock}
${outputStep} — Output: Return JSON only — no other text, no explanation.

REQUIREMENTS:
• Platform: ${pc.name}
• Target length: ${pc.idealLength}
• Tone: ${tc.instruction}
• Tone example: "${tc.microExample}"
• Hashtags: ${hashtags}

PLATFORM RULES (follow all):
${rules}

DO NOT:
${negatives}

REFERENCE EXAMPLE (same platform, engaging tone):
${example}

Return JSON now:
{"caption": "...", "hashtags": [...]}`
}

/**
 * Direct prompt for reasoning models.
 * No explicit CoT — model reasons internally. Shorter = less wasted tokens.
 */
function buildDirectPrompt(config: PromptConfig): string {
  const pc = PLATFORM_CONFIGS[config.platform]
  const tc = TONE_LIBRARY[config.tone]
  const example = formatExample(FEW_SHOT_EXAMPLES[config.platform])
  const hashtags = hashtagInstruction(config.hashtagCount)

  return `Write a ${pc.name} caption for this image.

Platform: ${pc.name} | Length: ${pc.idealLength}
Tone: ${tc.instruction}
Hashtags: ${hashtags}

Rules: ${pc.rules.join(" | ")}
Avoid: ${pc.negativeRules.join(" | ")}

Example (same platform):
${example}

Output JSON only: {"caption": "...", "hashtags": [...]}`
}

// ─── Main compose function ────────────────────────────────────────────────────

/**
 * Compose a complete, model-aware prompt for a caption request.
 * The image URL placeholder is filled in by the API route.
 */
export function composePrompt(config: PromptConfig): ComposedPrompt {
  const pc = PLATFORM_CONFIGS[config.platform]
  const reasoning = isReasoningModel(config.model)
  const caching = supportsCaching(config.model)

  const userText = reasoning
    ? buildDirectPrompt(config)
    : buildCotPrompt(config)

  return {
    systemMessage: buildSystemMessage(caching),
    userMessage: {
      role: "user",
      content: [
        {
          type: "image_url",
          // Placeholder — route.ts injects the real base64 data URL
          image_url: { url: "__IMAGE_PLACEHOLDER__" },
        },
        {
          type: "text",
          text: userText,
        },
      ],
    },
    temperature: reasoning ? 0.6 : pc.temperature,
    maxTokens: 4096,
    promptVersion: PROMPT_VERSION,
  }
}