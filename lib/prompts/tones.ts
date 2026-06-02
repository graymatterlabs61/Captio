import type { Tone, ToneConfig } from "./types"

export const TONE_LIBRARY: Record<Tone, ToneConfig> = {
  engaging: {
    instruction:
      "Hook with a question or surprising fact. Build curiosity through the body. End with a specific interactive CTA ('tag someone who needs this', 'save for later', 'drop your answer below').",
    microExample:
      "Ever wonder why this hits differently at 6am? ☕️ Because you earned it.",
  },

  professional: {
    instruction:
      "Open with a bold, evidence-backed or experience-backed insight — skip all pleasantries. Authoritative, confident voice. Deliver one concrete takeaway. Professional CTA (comment, connect, or follow).",
    microExample:
      "The teams I've seen move fastest share one habit: they draw before they talk.",
  },

  funny: {
    instruction:
      "Lead with the punchline setup or absurd observation. Punchy — 1-2 beats max. Self-aware, relatable humor. Subvert expectations. Avoid forced wordplay or cringe.",
    microExample:
      "Nobody: / Me at 11pm: this is the perfect time to rearrange everything.",
  },

  inspirational: {
    instruction:
      "Open with a powerful declarative statement. Build emotional momentum using 'you' language to make it personal. Close with an uplifting call or rallying phrase that lingers.",
    microExample:
      "You didn't come this far to only come this far. Keep going.",
  },

  casual: {
    instruction:
      "Write exactly like texting a close friend. Short sentences. Natural contractions. No formal structure. Effortless and conversational — like you just thought of it.",
    microExample:
      "ok this one actually turned out kinda perfect ngl 🙂",
  },
}