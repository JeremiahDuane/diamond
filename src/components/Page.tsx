import type { ComponentPropsWithRef, ReactNode } from 'react'
import { cx } from '../utils/cx'

export function Page({ className, ...props }: ComponentPropsWithRef<'main'>) {
  return (
    <main
      {...props}
      className={cx('mx-auto max-w-7xl px-4 py-8 sm:px-8 sm:py-14', className)}
    />
  )
}

type PageHeaderProps = {
  title: string
  eyebrow?: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ title, eyebrow, description, children }: PageHeaderProps) {
  return (
    <header className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        {eyebrow && <p className="mb-3 text-xs font-bold tracking-widest text-muted-foreground">{eyebrow}</p>}
        <h1 className="text-3xl leading-tight font-bold tracking-tighter text-foreground sm:text-4xl">{title}</h1>
        {description && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>}
      </div>
      {children}
    </header>
  )
}

type PageSectionProps = Omit<ComponentPropsWithRef<'section'>, 'title'> & {
  title: string
  description?: ReactNode
  actions?: ReactNode
  footer?: ReactNode
}

export function PageSection({ title, description, actions, footer, children, className, ...props }: PageSectionProps) {
  return (
    <section {...props} className={cx('overflow-hidden rounded-xl border border-border bg-surface shadow-sm', className)}>
      <header className="flex flex-col items-start justify-between gap-4 border-b border-border p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
        <div>
          <h2 className="text-base font-semibold text-foreground">{title}</h2>
          {description && <div className="mt-1 text-sm text-muted-foreground">{description}</div>}
        </div>
        {actions}
      </header>
      {children}
      {footer && <footer className="border-t border-border px-6 py-4 text-xs text-muted-foreground">{footer}</footer>}
    </section>
  )
}
