export type Platform =
  | "instagram"
  | "tiktok"
  | "linkedin"
  | "twitter"
  | "facebook"
  | "youtube"

export type Tone =
  | "engaging"
  | "professional"
  | "funny"
  | "inspirational"
  | "casual"

// ─── Config shapes ────────────────────────────────────────────────────────────

export interface PlatformConfig {
  name: string
  idealLength: string
  rules: string[]
  negativeRules: string[]   // explicit "do NOT" constraints
  temperature: number       // platform-tuned creativity level
  selfCheck: boolean        // add self-verification step (LinkedIn/professional)
}

export interface ToneConfig {
  instruction: string       // prescriptive HOW-TO, not vague outcome
  microExample: string      // one sentence showing the tone in action
}

export interface FewShotExample {
  imageDesc: string
  output: { caption: string; hashtags: string[] }
}

// ─── Prompt composition ───────────────────────────────────────────────────────

export interface PromptConfig {
  platform: Platform
  tone: Tone
  hashtagCount: number
  model: string
}

export interface SystemMessage {
  role: "system"
  content: string | SystemContentBlock[]
}

export interface SystemContentBlock {
  type: "text"
  text: string
  cache_control?: { type: "ephemeral" }
}

export interface ComposedPrompt {
  systemMessage: SystemMessage
  userMessage: {
    role: "user"
    content: object[]
  }
  temperature: number
  maxTokens: number
  /** Semver string for A/B tracking and logging */
  promptVersion: string
}