import { CaptionTool } from "@/components/caption-tool"

export function ToolSection() {
  return (
    <section id="tool" className="px-4 py-16">
      <div className="mx-auto max-w-xl">
        <div className="rounded-3xl border border-border bg-arctic-mist p-8 genie-shadow">
          <div className="mb-8 text-center">
            <h2
              className="font-serif text-2xl font-medium text-obsidian"
              style={{ letterSpacing: "-0.02em" }}
            >
              Generate your caption
            </h2>
            <p className="mt-1.5 text-sm text-silver-pine">
              Powered by Google Gemma 4 AI
            </p>
          </div>
          <CaptionTool />
        </div>
      </div>
    </section>
  )
}