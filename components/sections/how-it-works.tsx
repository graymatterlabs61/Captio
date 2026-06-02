import {
  ImageIcon,
  CursorClickIcon,
  DownloadIcon,
} from "@phosphor-icons/react/dist/ssr"

const STEPS = [
  {
    Icon: ImageIcon,
    step: "1",
    title: "Upload your image",
    desc: "Drag & drop any photo — product shots, selfies, landscapes, artwork. Supports JPG, PNG, WEBP and more.",
    iconBg: "bg-ghostly-blue",
    iconColor: "text-electric-blue",
  },
  {
    Icon: CursorClickIcon,
    step: "2",
    title: "Pick platform & tone",
    desc: "Choose from Instagram, TikTok, LinkedIn, Twitter, Facebook or YouTube. Set the tone to match your brand.",
    iconBg: "bg-lavender-mist",
    iconColor: "text-deep-violet",
  },
  {
    Icon: DownloadIcon,
    step: "3",
    title: "Copy & post",
    desc: "AI generates a caption and hashtags optimized for your platform. One click to copy, then paste and post.",
    iconBg: "bg-mint-glaze",
    iconColor: "text-obsidian",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-4 py-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h2
            className="font-serif text-3xl font-medium text-obsidian sm:text-4xl"
            style={{ letterSpacing: "-0.02em" }}
          >
            How it works
          </h2>
          <p className="mt-3 text-sm text-silver-pine">
            Three steps. Ten seconds. Perfect caption.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map(({ Icon, step, title, desc, iconBg, iconColor }) => (
            <div
              key={step}
              className="flex flex-col gap-6 rounded-3xl border border-border bg-arctic-mist p-10 genie-shadow"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-full bg-midnight-ink text-sm font-semibold text-canvas-white shrink-0">
                  {step}
                </span>
                <div className={`flex size-9 items-center justify-center rounded-2xl ${iconBg}`}>
                  <Icon className={`size-5 ${iconColor}`} weight="duotone" />
                </div>
              </div>
              <div>
                <h3
                  className="font-medium text-obsidian"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {title}
                </h3>
                <p className="mt-2 text-sm text-silver-pine leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}