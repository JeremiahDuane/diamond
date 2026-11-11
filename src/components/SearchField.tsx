import type { ComponentPropsWithRef } from 'react'
import { cx } from '../utils/cx'
import { SearchIcon } from './icons/SearchIcon'

type SearchFieldProps = Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'> & {
  label: string
}

export function SearchField({ label, className, ...props }: SearchFieldProps) {
  return (
    <label className="flex w-full max-w-full items-center gap-3 rounded-lg border border-input px-3 py-3 text-muted-foreground focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring sm:w-80">
      <SearchIcon />
      {/* Keep an accessible label when the design only shows a placeholder. */}
      <span className="sr-only">{label}</span>
      <input {...props} type="search" className={cx('min-w-0 w-full border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground', className)} />
    </label>
  )
}
