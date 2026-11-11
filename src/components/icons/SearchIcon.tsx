import { Search } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { cx } from '../../utils/cx'

export function SearchIcon({ className, ...props }: LucideProps) {
  return <Search aria-hidden="true" {...props} className={cx('size-5 shrink-0', className)} />
}
