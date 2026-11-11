import { DiamondIcon } from './icons/DiamondIcon'

export function SiteHeader({ label }: { label: string }) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 p-4 sm:px-8 sm:py-5">
        <a className="inline-flex items-center gap-3 text-xl font-bold tracking-tighter text-foreground" href="/" aria-label="Diamond home">
          <DiamondIcon />
          Diamond Properties Demo
        </a>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </header>
  )
}
