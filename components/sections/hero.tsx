import {
  InstagramLogoIcon,
  TiktokLogoIcon,
  LinkedinLogoIcon,
  XLogoIcon,
  FacebookLogoIcon,
  YoutubeLogoIcon,
  StarIcon,
  SparkleIcon,
} from "@phosphor-icons/react/dist/ssr"

const PLATFORMS = [
  { Icon: InstagramLogoIcon, label: "Instagram" },
  { Icon: TiktokLogoIcon, label: "TikTok" },
  { Icon: LinkedinLogoIcon, label: "LinkedIn" },
  { Icon: XLogoIcon, label: "Twitter / X" },
  { Icon: FacebookLogoIcon, label: "Facebook" },
  { Icon: YoutubeLogoIcon, label: "YouTube" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden genie-bg px-4 pb-20 pt-16 text-center sm:pt-28">
      {/* Decorative blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-ghostly-blue/50 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-1/4 h-64 w-64 rounded-full bg-lavender-mist/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-1.5 rounded-full border border-electric-blue/30 bg-sky-wash px-3 py-1.5 text-xs font-medium text-electric-blue">
          <StarIcon className="size-3" weight="fill" />
          100% free — no sign-up required
        </div>

        {/* Heading */}
        <h1
          className="font-serif text-5xl font-medium text-obsidian sm:text-6xl md:text-7xl"
          style={{ lineHeight: 1.05, letterSpacing: "-0.02em" }}
        >
          Captions that stop
          <br />
          the scroll
        </h1>

        {/* Sub */}
        <p
          className="mx-auto mt-6 max-w-xl text-base text-silver-pine sm:text-lg"
          style={{ letterSpacing: "-0.01em" }}
        >
          Upload your image, choose your platform, and get AI-powered captions
          for Instagram, TikTok, LinkedIn, Twitter &amp; more — in seconds.
        </p>

        {/* Platform pills */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {PLATFORMS.map(({ Icon, label }) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-canvas-white px-3 py-1.5 text-xs font-medium text-silver-pine"
            >
              <Icon className="size-3.5" />
              {label}
            </span>
          ))}
        </div>

        {/* CTA row */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#tool"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-midnight-ink px-8 text-sm font-medium text-canvas-white transition-opacity hover:opacity-80"
          >
            <SparkleIcon className="size-4" weight="fill" />
            Generate my caption
          </a>
          <a
            href="#how-it-works"
            className="hidden text-sm text-silver-pine underline-offset-4 hover:underline sm:block"
          >
            How it works ↓
          </a>
        </div>
      </div>
    </section>
  )
}