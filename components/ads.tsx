export function AdBanner() {
  return (
    <div
      aria-hidden
      className="mx-auto flex w-full max-w-3xl items-center justify-center rounded-3xl border border-dashed border-border bg-fog px-4 py-6 text-xs text-muted-foreground select-none"
      style={{ minHeight: 90 }}
    >
      {/* Replace with: <ins className="adsbygoogle" data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" data-ad-format="auto" data-full-width-responsive="true" /> */}
      Advertisement
    </div>
  )
}

export function AdRect() {
  return (
    <div
      aria-hidden
      className="mx-auto flex w-full max-w-xs items-center justify-center rounded-3xl border border-dashed border-border bg-fog px-4 py-10 text-xs text-muted-foreground select-none"
      style={{ minHeight: 280 }}
    >
      {/* Replace with: <ins className="adsbygoogle" data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX" data-ad-format="rectangle" /> */}
      Advertisement
    </div>
  )
}