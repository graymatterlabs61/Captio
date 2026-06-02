export function BottomCta() {
  return (
    <section className="genie-bg border-t border-border px-4 py-20 text-center">
      <div className="mx-auto max-w-xl">
        <h2
          className="font-serif text-3xl font-medium text-obsidian sm:text-4xl"
          style={{ letterSpacing: "-0.02em" }}
        >
          Start for free, right now
        </h2>
        <p className="mt-4 text-sm text-silver-pine">
          No account. No credit card. Just better captions.
        </p>
        <a
          href="#tool"
          className="mt-8 inline-flex h-12 items-center rounded-full bg-midnight-ink px-8 text-sm font-medium text-canvas-white transition-opacity hover:opacity-80"
        >
          Generate my caption →
        </a>
      </div>
    </section>
  )
}