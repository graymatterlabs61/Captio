// Public API — import from here, not individual modules

export { composePrompt, isReasoningModel, supportsCaching } from "./templates"
export { PLATFORM_CONFIGS } from "./platforms"
export { TONE_LIBRARY } from "./tones"
export { FEW_SHOT_EXAMPLES } from "./few-shot"
export { PROMPT_VERSION } from "./system"
export type { PromptConfig, ComposedPrompt, Platform, Tone } from "./types"