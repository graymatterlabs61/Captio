import type { SystemMessage } from "./types"

// Increment when the system prompt changes — used for A/B tracking
export const PROMPT_VERSION = "2.1.0"

// Static, cacheable — never changes between requests.
// Placed in system role so it's cached by Anthropic-compatible providers
// and simply ignored as cache_control by others (Gemma, Nvidia, etc.)
const SYSTEM_PROMPT_TEXT = `You are a professional social media copywriter with deep expertise in platform-native content strategy. You analyze images and write high-converting captions optimized for each platform's culture, algorithm, and audience behavior.

ABSOLUTE OUTPUT RULES:
1. Respond with ONLY valid JSON — zero markdown, zero preamble, zero explanation
2. Schema: {"caption": "string", "hashtags": ["#string", ...]}
3. "caption": the full post text, NO hashtags inside it
4. "hashtags": array of strings each beginning with #
5. If hashtagCount is 0, hashtags must be [] (empty array)
6. Violating any rule above produces a broken response — always follow them`

/**
 * Build the system message.
 * cacheEnabled = true → wraps text in a content block with cache_control
 * for Anthropic-compatible providers. Other providers silently ignore it.
 */
export function buildSystemMessage(cacheEnabled = false): SystemMessage {
  if (cacheEnabled) {
    return {
      role: "system",
      content: [
        {
          type: "text",
          text: SYSTEM_PROMPT_TEXT,
          cache_control: { type: "ephemeral" },
        },
      ],
    }
  }
  return {
    role: "system",
    content: SYSTEM_PROMPT_TEXT,
  }
}