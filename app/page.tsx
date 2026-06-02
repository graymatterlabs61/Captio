import type { Metadata } from "next"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Hero } from "@/components/sections/hero"
import { ToolSection } from "@/components/sections/tool-section"
import { TrustStrip } from "@/components/sections/trust-strip"
import { HowItWorks } from "@/components/sections/how-it-works"
import { PlatformGrid } from "@/components/sections/platform-grid"
import { FaqSection } from "@/components/sections/faq-section"
import { BottomCta } from "@/components/sections/bottom-cta"
import { AdBanner, AdRect } from "@/components/ads"

export const metadata: Metadata = {
  title: "Free AI Caption Generator — Instagram, TikTok, LinkedIn & More",
  description:
    "Generate scroll-stopping captions for Instagram, TikTok, LinkedIn, Twitter, Facebook & YouTube. Upload your image, pick your platform — get AI captions in seconds. 100% free, no sign-up.",
  keywords: [
    "ai caption generator",
    "instagram caption generator",
    "tiktok caption generator",
    "free caption generator",
    "image caption generator",
    "social media caption generator",
    "ai image caption",
    "caption generator app",
  ],
  openGraph: {
    title: "Free AI Caption Generator — Instagram, TikTok & More",
    description:
      "Upload your image. Pick your platform. Get AI-powered captions in seconds — completely free.",
    type: "website",
  },
}

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      <main>
        <Hero />

        <div className="px-4 py-4">
          <AdBanner />
        </div>

        <ToolSection />

        <TrustStrip />

        <HowItWorks />

        <PlatformGrid />

        <div className="flex justify-center px-4 py-8">
          <AdRect />
        </div>

        <FaqSection />

        <BottomCta />
      </main>

      <SiteFooter />
    </div>
  )
}