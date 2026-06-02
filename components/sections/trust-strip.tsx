const STATS = [
  { value: "6+", label: "Platforms supported" },
  { value: "Free", label: "Always, forever" },
  { value: "5s", label: "Avg. generation time" },
  { value: "AI", label: "Powered by Gemma 4" },
]

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-canvas-white px-4 py-12">
      <div className="mx-auto grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
        {STATS.map(({ value, label }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-2 rounded-3xl border border-border bg-arctic-mist p-8 genie-shadow text-center"
          >
            <span
              className="font-serif text-3xl font-medium text-obsidian"
              style={{ letterSpacing: "-0.02em" }}
            >
              {value}
            </span>
            <span className="text-xs text-silver-pine leading-snug">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}