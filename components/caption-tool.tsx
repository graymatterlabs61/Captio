"use client"

import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import {
  type Icon as PhosphorIconType,
  InstagramLogoIcon,
  TiktokLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  YoutubeLogoIcon,
  SparkleIcon,
  CopyIcon,
  CheckIcon,
  ArrowsClockwiseIcon,
  CloudArrowUpIcon,
  XCircleIcon,
} from "@phosphor-icons/react"

// ─── Types ────────────────────────────────────────────────────────────────────

type Platform = "instagram" | "tiktok" | "linkedin" | "twitter" | "facebook" | "youtube"
type Tone = "engaging" | "professional" | "funny" | "inspirational" | "casual"
type PhosphorIcon = PhosphorIconType

interface ImageData {
  preview: string
  base64: string
  type: string
}

interface Result {
  caption: string
  hashtags: string[]
}

// ─── Config ───────────────────────────────────────────────────────────────────

const PLATFORMS: { id: Platform; label: string; Icon: PhosphorIcon }[] = [
  { id: "instagram", label: "Instagram", Icon: InstagramLogoIcon },
  { id: "tiktok", label: "TikTok", Icon: TiktokLogoIcon },
  { id: "linkedin", label: "LinkedIn", Icon: LinkedinLogoIcon },
  { id: "twitter", label: "X / Twitter", Icon: XLogoIcon },
  { id: "facebook", label: "Facebook", Icon: FacebookLogoIcon },
  { id: "youtube", label: "YouTube", Icon: YoutubeLogoIcon },
]

const TONES: { id: Tone; label: string; emoji: string }[] = [
  { id: "engaging", label: "Engaging", emoji: "✨" },
  { id: "professional", label: "Professional", emoji: "💼" },
  { id: "funny", label: "Funny", emoji: "😄" },
  { id: "inspirational", label: "Inspirational", emoji: "🔥" },
  { id: "casual", label: "Casual", emoji: "👋" },
]

const HASHTAG_COUNTS = [0, 5, 10, 15, 20]

const MODELS: { id: string; label: string }[] = [
  { id: "google/gemma-4-31b-it:free", label: "Gemma-4 31B" },
  { id: "google/gemma-4-26b-a4b-it:free", label: "Gemma-4 26B" },
  { id: "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free", label: "Nemotron-3 Reasoning" },
  { id: "nvidia/nemotron-nano-12b-v2-vl:free", label: "Nemotron Nano VL" },
  { id: "moonshotai/kimi-k2.6:free", label: "Kimi 2.6" },
]

// ─── Image resize utility (client-side, keeps payload small) ──────────────────

async function resizeImage(file: File, maxDimension = 1024): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas")
        let { width, height } = img
        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width)
            width = maxDimension
          } else {
            width = Math.round((width * maxDimension) / height)
            height = maxDimension
          }
        }
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext("2d")!
        ctx.drawImage(img, 0, 0, width, height)
        const dataUrl = canvas.toDataURL("image/jpeg", 0.85)
        const base64 = dataUrl.split(",")[1]
        URL.revokeObjectURL(url)
        resolve({ preview: dataUrl, base64, type: "image/jpeg" })
      } catch (e) {
        reject(e)
      }
    }
    img.onerror = reject
    img.src = url
  })
}

// ─── Copy hook ────────────────────────────────────────────────────────────────

function useCopy(resetDelay = 2000) {
  const [copied, setCopied] = useState(false)
  const copy = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), resetDelay)
    } catch {
      toast.error("Failed to copy — try manually selecting the text.")
    }
  }, [resetDelay])
  return { copied, copy }
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CopyButton({ text, label = "Copy" }: { text: string; label?: string }) {
  const { copied, copy } = useCopy()
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => copy(text)}
      className="gap-1.5 shrink-0 rounded-full border-border hover:border-midnight-ink"
    >
      {copied ? <CheckIcon className="size-3.5 text-green-600" /> : <CopyIcon className="size-3.5" />}
      {copied ? "Copied!" : label}
    </Button>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CaptionTool() {
  const [image, setImage] = useState<ImageData | null>(null)
  const [platform, setPlatform] = useState<Platform>("instagram")
  const [tone, setTone] = useState<Tone>("engaging")
  const [hashtagCount, setHashtagCount] = useState(10)
  const [model, setModel] = useState<string>("google/gemma-4-31b-it:free")
  const [isGenerating, setIsGenerating] = useState(false)
  const [result, setResult] = useState<Result | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const processFile = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file (JPG, PNG, WEBP, etc.)")
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("Image must be under 20 MB.")
      return
    }
    try {
      const data = await resizeImage(file)
      setImage(data)
      setResult(null)
      setError(null)
    } catch {
      toast.error("Could not read image. Try a different file.")
    }
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) processFile(file)
    },
    [processFile]
  )

  const onFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) processFile(file)
      e.target.value = ""
    },
    [processFile]
  )

  const generate = useCallback(async () => {
    if (!image) return
    setIsGenerating(true)
    setError(null)

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64: image.base64,
          imageType: image.type,
          platform,
          tone,
          hashtagCount,
          model,
        }),
      })

      const data = await res.json() as { caption?: string; hashtags?: string[]; error?: string }

      if (!res.ok || data.error) {
        setError(data.error ?? "Something went wrong. Please try again.")
        return
      }

      setResult({ caption: data.caption ?? "", hashtags: data.hashtags ?? [] })
    } catch {
      setError("Network error. Check your connection and try again.")
    } finally {
      setIsGenerating(false)
    }
  }, [image, platform, tone, hashtagCount, model])

  const hashtagText = result?.hashtags.join(" ") ?? ""
  const allText = result
    ? hashtagText
      ? `${result.caption}\n\n${hashtagText}`
      : result.caption
    : ""

  return (
    <div className="flex flex-col gap-8">
      {/* ── Step 1: Upload ── */}
      <div className="flex flex-col gap-3">
        <StepLabel number={1} text="Upload your image" />

        {image ? (
          <div className="relative group rounded-3xl overflow-hidden border border-border genie-shadow">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.preview}
              alt="Uploaded preview"
              className="w-full max-h-72 object-cover"
            />
            <div className="absolute inset-0 bg-midnight-ink/0 group-hover:bg-midnight-ink/40 transition-colors flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
              <Button
                size="sm"
                variant="outline"
                className="bg-canvas-white/90 backdrop-blur-sm rounded-full"
                onClick={() => fileInputRef.current?.click()}
              >
                Change image
              </Button>
              <Button
                size="icon-sm"
                variant="outline"
                className="bg-canvas-white/90 backdrop-blur-sm rounded-full"
                onClick={() => { setImage(null); setResult(null) }}
                aria-label="Remove image"
              >
                <XCircleIcon />
              </Button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            className={cn(
              "flex flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed p-10 transition-all cursor-pointer select-none",
              isDragging
                ? "border-midnight-ink bg-sky-wash/60"
                : "border-ghostly-blue bg-sky-wash/30 hover:border-midnight-ink hover:bg-sky-wash/60"
            )}
          >
            <div className={cn(
              "flex size-14 items-center justify-center rounded-2xl transition-colors",
              isDragging ? "bg-midnight-ink text-canvas-white" : "bg-ghostly-blue text-electric-blue"
            )}>
              <CloudArrowUpIcon className="size-7" weight="duotone" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-obsidian">
                {isDragging ? "Drop to upload" : "Drag & drop or click to upload"}
              </p>
              <p className="text-xs text-silver-pine mt-1">
                JPG, PNG, WEBP, GIF — up to 20 MB
              </p>
            </div>
          </button>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onFileChange}
          aria-label="Upload image"
        />
      </div>

      {/* ── Step 2: Platform ── */}
      <div className="flex flex-col gap-3">
        <StepLabel number={2} text="Choose your platform" />
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {PLATFORMS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => { setPlatform(id); setResult(null) }}
              className={cn(
                "flex flex-col items-center justify-center gap-1.5 rounded-2xl border py-3 px-2 text-xs font-medium transition-all cursor-pointer select-none",
                platform === id
                  ? "bg-midnight-ink text-canvas-white border-midnight-ink"
                  : "bg-arctic-mist text-silver-pine border-border hover:border-midnight-ink hover:text-obsidian hover:bg-ghostly-blue"
              )}
            >
              <Icon className="size-5" weight={platform === id ? "fill" : "regular"} />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 3: Tone ── */}
      <div className="flex flex-col gap-3">
        <StepLabel number={3} text="Set the tone" />
        <div className="flex flex-wrap gap-2">
          {TONES.map(({ id, label, emoji }) => (
            <button
              key={id}
              type="button"
              onClick={() => { setTone(id); setResult(null) }}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-all cursor-pointer select-none",
                tone === id
                  ? "bg-midnight-ink text-canvas-white border-midnight-ink"
                  : "bg-arctic-mist text-silver-pine border-border hover:border-midnight-ink hover:text-obsidian hover:bg-ghostly-blue"
              )}
            >
              <span>{emoji}</span>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 4: Hashtags ── */}
      <div className="flex flex-col gap-3">
        <StepLabel number={4} text="Hashtag count" />
        <div className="flex flex-wrap gap-2">
          {HASHTAG_COUNTS.map((count) => (
            <button
              key={count}
              type="button"
              onClick={() => { setHashtagCount(count); setResult(null) }}
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all cursor-pointer select-none",
                hashtagCount === count
                  ? "bg-midnight-ink text-canvas-white border-midnight-ink"
                  : "bg-arctic-mist text-silver-pine border-border hover:border-midnight-ink hover:text-obsidian hover:bg-ghostly-blue"
              )}
            >
              {count === 0 ? "None" : `#${count}`}
            </button>
          ))}
        </div>
      </div>

      {/* ── Step 5: Model ── */}
      <div className="flex flex-col gap-3">
        <StepLabel number={5} text="Choose AI model" />
        <div className="flex flex-wrap gap-2">
          {MODELS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => { setModel(id); setResult(null) }}
              className={cn(
                "inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all cursor-pointer select-none",
                model === id
                  ? "bg-midnight-ink text-canvas-white border-midnight-ink"
                  : "bg-arctic-mist text-silver-pine border-border hover:border-midnight-ink hover:text-obsidian hover:bg-ghostly-blue"
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Generate button ── */}
      <Button
        onClick={generate}
        disabled={!image || isGenerating}
        size="lg"
        className="w-full gap-2 text-base h-12 rounded-full bg-midnight-ink text-canvas-white hover:bg-midnight-ink/90"
      >
        {isGenerating ? (
          <>
            <ArrowsClockwiseIcon className="size-4 animate-spin" />
            Generating…
          </>
        ) : (
          <>
            <SparkleIcon className="size-4" weight="fill" />
            Generate Caption
          </>
        )}
      </Button>

      {!image && (
        <p className="text-center text-xs text-ash-gray -mt-5">
          Upload an image to get started
        </p>
      )}

      {/* ── Error ── */}
      {error && (
        <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* ── Result ── */}
      {isGenerating && <ResultSkeleton />}

      {result && !isGenerating && (
        <ResultCard
          caption={result.caption}
          hashtags={result.hashtags}
          allText={allText}
          onRegenerate={generate}
        />
      )}
    </div>
  )
}

// ─── ResultCard ───────────────────────────────────────────────────────────────

function ResultCard({
  caption,
  hashtags,
  allText,
  onRegenerate,
}: {
  caption: string
  hashtags: string[]
  allText: string
  onRegenerate: () => void
}) {
  const { copied: copiedAll, copy: copyAll } = useCopy()

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border bg-arctic-mist p-5 genie-shadow">
      {/* Caption */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-ash-gray uppercase tracking-wide">
            Caption
          </span>
          <CopyButton text={caption} />
        </div>
        <p className="text-sm leading-relaxed text-obsidian whitespace-pre-wrap">
          {caption}
        </p>
      </div>

      {/* Hashtags */}
      {hashtags.length > 0 && (
        <>
          <div className="h-px bg-border" />
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-ash-gray uppercase tracking-wide">
                Hashtags ({hashtags.length})
              </span>
              <CopyButton text={hashtags.join(" ")} label="Copy hashtags" />
            </div>
            <p className="text-sm text-silver-pine leading-relaxed break-words">
              {hashtags.join(" ")}
            </p>
          </div>
        </>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1">
        <Button
          variant="default"
          size="sm"
          className="flex-1 gap-1.5 rounded-full bg-midnight-ink text-canvas-white hover:bg-midnight-ink/90"
          onClick={() => copyAll(allText)}
        >
          {copiedAll ? <CheckIcon className="size-3.5 text-green-400" /> : <CopyIcon className="size-3.5" />}
          {copiedAll ? "Copied!" : "Copy all"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 rounded-full border-border hover:border-midnight-ink"
          onClick={onRegenerate}
        >
          <ArrowsClockwiseIcon className="size-3.5" />
          Regenerate
        </Button>
      </div>
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ResultSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-border bg-arctic-mist p-5">
      <div className="flex flex-col gap-2">
        <div className="h-3 w-16 animate-pulse rounded-full bg-ghostly-blue" />
        <div className="h-4 w-full animate-pulse rounded-full bg-ghostly-blue" />
        <div className="h-4 w-5/6 animate-pulse rounded-full bg-ghostly-blue" />
        <div className="h-4 w-4/6 animate-pulse rounded-full bg-ghostly-blue" />
      </div>
      <div className="h-px bg-border" />
      <div className="flex flex-col gap-2">
        <div className="h-3 w-20 animate-pulse rounded-full bg-ghostly-blue" />
        <div className="h-4 w-full animate-pulse rounded-full bg-ghostly-blue" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-ghostly-blue" />
      </div>
    </div>
  )
}

// ─── Step label ───────────────────────────────────────────────────────────────

function StepLabel({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex size-6 items-center justify-center rounded-full bg-midnight-ink text-canvas-white text-xs font-semibold shrink-0">
        {number}
      </span>
      <span className="text-sm font-medium text-obsidian">{text}</span>
    </div>
  )
}