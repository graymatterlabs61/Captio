import type { Platform, PlatformConfig } from "./types"

export const PLATFORM_CONFIGS: Record<Platform, PlatformConfig> = {
  instagram: {
    name: "Instagram",
    idealLength: "150–300 characters",
    rules: [
      "First sentence must hook — open with a question, bold claim, or vivid scene-setter",
      "Build emotional connection through micro-storytelling or relatability in the body",
      "End with a specific CTA: ask to tag someone, save, comment, or share",
      "Hashtags go AFTER the caption body, separated by a blank line",
    ],
    negativeRules: [
      "Do NOT open with 'I' or 'We'",
      "Do NOT use generic openers like 'Excited to share' or 'Check this out'",
      "Do NOT write a list — Instagram captions flow as prose",
      "Do NOT exceed 300 characters in the caption body",
    ],
    temperature: 0.80,
    selfCheck: false,
  },

  tiktok: {
    name: "TikTok",
    idealLength: "80–150 characters",
    rules: [
      "First 5 words must create immediate curiosity, FOMO, or a hook",
      "Use Gen-Z-native language — casual, energetic, trend-aware",
      "Short punchy phrasing. Emojis used sparingly for rhythm, not decoration",
      "3–5 highly relevant hashtags only — no hashtag walls",
    ],
    negativeRules: [
      "Do NOT write more than 2 sentences",
      "Do NOT use formal or corporate language",
      "Do NOT add more than 5 hashtags",
      "Do NOT write a caption that could work for any other platform",
    ],
    temperature: 0.85,
    selfCheck: false,
  },

  linkedin: {
    name: "LinkedIn",
    idealLength: "800–1200 characters",
    rules: [
      "Open with a counterintuitive statement, hard-won lesson, or surprising stat — not 'Excited to share'",
      "Structure as short paragraphs with blank lines between them — optimized for mobile skimming",
      "Deliver one concrete, actionable takeaway or insight",
      "Close with a thought-provoking question to drive comments",
    ],
    negativeRules: [
      "Do NOT open with 'I am excited', 'Thrilled to announce', or 'Humbled to share'",
      "Do NOT write in bullet points — LinkedIn captions are narrative prose",
      "Do NOT include more than 5 hashtags",
      "Do NOT use buzzwords: 'synergy', 'leverage', 'game-changer', 'disrupt'",
    ],
    temperature: 0.65,
    selfCheck: true,  // add self-check step — quality matters most here
  },

  twitter: {
    name: "X (Twitter)",
    idealLength: "under 240 characters",
    rules: [
      "One sharp, clear observation — no throat-clearing",
      "Every word earns its place — cut anything not essential",
      "Wit, specificity, or a surprising angle beats generic commentary",
      "0–2 hashtags max — fewer is better",
    ],
    negativeRules: [
      "Do NOT write more than 2 sentences",
      "Do NOT add more than 2 hashtags",
      "Do NOT use meaningless filler phrases",
      "Do NOT exceed 240 characters in the caption",
    ],
    temperature: 0.80,
    selfCheck: false,
  },

  facebook: {
    name: "Facebook",
    idealLength: "200–400 characters",
    rules: [
      "Warm, conversational tone — like talking to someone you know",
      "Open with a relatable observation or short story",
      "Ask a direct question at the end to spark comments",
      "Authentic and human — avoid corporate polish",
    ],
    negativeRules: [
      "Do NOT sound like an advertisement",
      "Do NOT use overly formal or stiff language",
      "Do NOT exceed 400 characters",
      "Do NOT write a listicle",
    ],
    temperature: 0.75,
    selfCheck: false,
  },

  youtube: {
    name: "YouTube",
    idealLength: "200–500 characters",
    rules: [
      "Weave searchable keywords naturally into the first 2 sentences",
      "Tell viewers exactly what they will learn or experience in this video",
      "Create a reason to watch until the end",
      "End with subscribe/like prompt",
    ],
    negativeRules: [
      "Do NOT keyword-stuff unnaturally",
      "Do NOT reveal the full answer in the description — create curiosity",
      "Do NOT exceed 500 characters",
    ],
    temperature: 0.70,
    selfCheck: false,
  },
}