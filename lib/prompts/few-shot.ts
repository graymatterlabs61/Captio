import type { Platform, FewShotExample } from "./types"

// One curated, high-quality example per platform.
// Used for the "engaging" tone (most common) — other tones rely on tone instructions.
// Examples are compact to stay within context window budgets.
export const FEW_SHOT_EXAMPLES: Record<Platform, FewShotExample> = {
  instagram: {
    imageDesc: "Golden hour coffee flat lay on white marble with a notebook",
    output: {
      caption:
        "That first sip hits different when the light cooperates ☕️\n\nMorning rituals aren't about the coffee — they're about stealing 10 minutes before the world needs you.\n\nWhat's your non-negotiable morning moment? ↓",
      hashtags: [
        "#MorningRitual",
        "#CoffeeMoment",
        "#GoldenHour",
        "#SlowMornings",
        "#CoffeeLovers",
        "#FlatLayPhotography",
        "#MindfulMorning",
        "#CafeVibes",
        "#DailyRitual",
        "#CaffeineAndDreams",
      ],
    },
  },

  tiktok: {
    imageDesc: "Before and after bedroom transformation, dramatic difference",
    output: {
      caption: "POV: you finally stopped saying 'one day' 🏠✨",
      hashtags: [
        "#glowup",
        "#roomtransformation",
        "#interiordesign",
        "#fyp",
        "#homeideas",
      ],
    },
  },

  linkedin: {
    imageDesc: "Team collaborating at a whiteboard in a modern office",
    output: {
      caption:
        "The best meetings I've been in have one thing in common: someone draws something.\n\nNot because visuals are fancy. Because drawing forces clarity.\n\nWhen you can't sketch your idea on a whiteboard, it's not ready.\n\nThe teams I've seen struggle most? They talk in circles.\n\nThe ones who ship fast? Someone always grabs a marker.\n\nNext time your team is stuck — hand someone a pen.\n\nDoes visual thinking change how your team moves?",
      hashtags: [
        "#Leadership",
        "#Teamwork",
        "#Innovation",
        "#VisualThinking",
        "#ProductivityTips",
      ],
    },
  },

  twitter: {
    imageDesc: "Sunset over a dense city skyline",
    output: {
      caption:
        "Cities never look more beautiful than the moment before they turn their lights on.",
      hashtags: ["#CityLife", "#GoldenHour"],
    },
  },

  facebook: {
    imageDesc: "Family having a relaxed picnic in a sunny park",
    output: {
      caption:
        "Some days the best plan is no plan at all 🌿\n\nPacked a blanket, grabbed some snacks, and just went. No screens, no schedule — just this.\n\nWhen did you last do something completely unplanned? 👇",
      hashtags: [
        "#FamilyTime",
        "#UnplugAndUnwind",
        "#WeekendVibes",
        "#NatureTime",
        "#SimplePleasures",
      ],
    },
  },

  youtube: {
    imageDesc: "Chef plating a professional dish in a home kitchen thumbnail",
    output: {
      caption:
        "Most people get this dish completely wrong — and it comes down to one step home cooks always skip. In this video I break down the exact technique professional chefs use. Watch till the end for the tip that changed everything.\n\n👍 Like if this helped | 🔔 Subscribe for weekly recipes",
      hashtags: [
        "#CookingTips",
        "#FoodHacks",
        "#RecipeVideo",
        "#LearnToCook",
        "#KitchenTips",
        "#HomeCooking",
        "#FoodTutorial",
      ],
    },
  },
}

/** Format a few-shot example as a prompt string block */
export function formatExample(example: FewShotExample): string {
  const outputJson = JSON.stringify(example.output, null, 2)
  return `<example>
Image: ${example.imageDesc}
Output: ${outputJson}
</example>`
}