import { Logo } from "@/components/logo"

const NAV_LINKS = [
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-canvas-white px-4 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <Logo className="h-4 w-auto" />
          <span className="text-sm font-medium text-obsidian">Caption Genie</span>
        </div>

        <nav className="flex flex-wrap gap-5">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              className="text-xs text-silver-pine transition-colors hover:text-obsidian"
            >
              {label}
            </a>
          ))}
        </nav>

        <p className="text-xs text-ash-gray">
          © {new Date().getFullYear()} Caption Genie. Free to use.
        </p>
      </div>
    </footer>
  )
}