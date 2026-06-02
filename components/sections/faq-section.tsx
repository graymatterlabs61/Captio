import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ_ITEMS = [
  {
    q: "What is an AI caption generator?",
    a: "An AI caption generator uses artificial intelligence to automatically write social media captions for your photos and videos. Caption Genie analyzes your uploaded image using Google's Gemma 4 AI model and creates captions optimized for the platform and tone you choose — saving you time writing copy from scratch.",
  },
  {
    q: "What is the best caption generator app?",
    a: "The best caption generator understands your image AND your platform. Caption Genie uses multimodal AI (vision + text) so the caption is relevant to what's actually in your photo, not just generic text. It also adapts to each platform's character limits, culture, and hashtag norms.",
  },
  {
    q: "What is the best Instagram caption generator?",
    a: "Caption Genie is optimized for Instagram — it generates captions between 150–300 characters with a strong hook, emotional storytelling, a call-to-action, and up to 20 curated hashtags. All generated specifically from your image, not generic templates.",
  },
  {
    q: "How do I use an AI caption generator for engagement?",
    a: "Select the 'Engaging' tone when generating. This instructs the AI to open with a curiosity hook, use emotional language, and end with a call-to-action (like 'Tag a friend who needs to see this'). These elements are proven to drive likes, comments, and shares.",
  },
  {
    q: "Does Caption Genie support video captions?",
    a: "Currently, Caption Genie works with still images. You can upload a thumbnail or screenshot from your video to generate a caption — this works great for TikTok, YouTube, Instagram Reels, and Facebook video posts. Full video support is on our roadmap.",
  },
  {
    q: "Is this caption generator really free?",
    a: "Yes — Caption Genie is 100% free with no sign-up required. It's supported by advertising, so you can use it as much as you like without a credit card or account.",
  },
  {
    q: "What does social caption generator software do?",
    a: "Social caption generator software analyzes your content and writes platform-optimized copy for social media posts. It handles tone, character limits, hashtag strategy, and platform culture automatically — so you can focus on creating great content instead of agonizing over what to write.",
  },
  {
    q: "How do I use Caption Genie?",
    a: "Three steps: (1) Click the upload zone or drag your image into it. (2) Pick your platform and set the tone and hashtag count. (3) Click 'Generate Caption'. The AI analyzes your image and returns a ready-to-use caption plus hashtags. Hit 'Copy all' and paste directly into your social media post.",
  },
]

export function FaqSection() {
  return (
    <section id="faq" className="px-4 py-16">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <h2
            className="font-serif text-3xl font-medium text-obsidian sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Frequently asked questions
          </h2>
        </div>

        <div className="rounded-3xl border border-border bg-arctic-mist p-8 genie-shadow sm:p-10">
          <Accordion type="single" collapsible>
            {FAQ_ITEMS.map((item) => (
              <AccordionItem key={item.q} value={item.q}>
                <AccordionTrigger className="text-left text-obsidian">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-silver-pine">{item.a}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}