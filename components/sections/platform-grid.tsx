import {
  InstagramLogoIcon,
  TiktokLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  YoutubeLogoIcon,
} from "@phosphor-icons/react/dist/ssr"

const PLATFORMS = [
  {
    Icon: InstagramLogoIcon,
    name: "Instagram Caption Generator",
    desc: "Crafts emotional, story-driven captions up to 300 characters with curated hashtags. Engineered for saves, shares, and follower growth.",
    iconBg: "bg-lavender-mist",
    iconColor: "text-deep-violet",
  },
  {
    Icon: TiktokLogoIcon,
    name: "TikTok Caption Generator",
    desc: "Short, punchy hooks that grab attention in the first second. Optimized for TikTok's algorithm with trending, platform-native language.",
    iconBg: "bg-ghostly-blue",
    iconColor: "text-electric-blue",
  },
  {
    Icon: LinkedinLogoIcon,
    name: "LinkedIn Caption Generator",
    desc: "Professional, value-driven posts that position you as a thought leader. Optimized for LinkedIn's long-form engagement format.",
    iconBg: "bg-ghostly-blue",
    iconColor: "text-electric-blue",
  },
  {
    Icon: XLogoIcon,
    name: "X (Twitter) Caption Generator",
    desc: "Concise, witty copy under 280 characters. Built for retweets, quote-tweets, and conversation-starting threads.",
    iconBg: "bg-arctic-mist",
    iconColor: "text-obsidian",
  },
  {
    Icon: FacebookLogoIcon,
    name: "Facebook Caption Generator",
    desc: "Warm, conversational copy that drives comments and shares. Perfect for community building, local businesses, and personal brands.",
    iconBg: "bg-mint-glaze",
    iconColor: "text-obsidian",
  },
  {
    Icon: YoutubeLogoIcon,
    name: "YouTube Caption Generator",
    desc: "SEO-optimized video descriptions with searchable keywords. Designed to boost discoverability and drive views.",
    iconBg: "bg-sky-wash",
    iconColor: "text-electric-blue",
  },
]

export function PlatformGrid() {
  return (
    <section className="border-t border-border bg-canvas-white px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2
            className="font-serif text-3xl font-medium text-obsidian sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            Built for every platform
          </h2>
          <p className="mt-3 text-sm text-silver-pine">
            Each platform has its own culture. Our AI knows the difference.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {PLATFORMS.map(({ Icon, name, desc, iconBg, iconColor }) => (
            <div
              key={name}
              className="flex flex-col gap-4 rounded-3xl border border-border bg-arctic-mist p-8"
            >
              <div className="flex items-center gap-3">
                <div className={`flex size-10 items-center justify-center rounded-2xl ${iconBg}`}>
                  <Icon className={`size-5 ${iconColor}`} weight="fill" />
                </div>
                <h3
                  className="text-sm font-medium text-obsidian"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {name}
                </h3>
              </div>
              <p className="text-xs text-silver-pine leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}