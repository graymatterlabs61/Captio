import { Logo } from "@/components/logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-canvas-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5">
          <Logo className="h-5 w-auto" />
          <span
            className="font-serif text-base font-medium text-obsidian"
            style={{ letterSpacing: "-0.02em" }}
          >
            Caption Genie
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 sm:flex">
          <a
            href="#how-it-works"
            className="text-sm text-silver-pine transition-colors hover:text-obsidian"
          >
            How it works
          </a>
          <a
            href="#faq"
            className="text-sm text-silver-pine transition-colors hover:text-obsidian"
          >
            FAQ
          </a>
          <a
            href="#tool"
            className="inline-flex h-9 items-center rounded-full bg-midnight-ink px-6 text-sm font-medium text-canvas-white transition-opacity hover:opacity-80"
          >
            Try free →
          </a>
        </nav>

        {/* Mobile CTA */}
        <a
          href="#tool"
          className="sm:hidden inline-flex h-8 items-center rounded-full bg-midnight-ink px-4 text-xs font-medium text-canvas-white"
        >
          Try free
        </a>
      </div>
    </header>
  )
}