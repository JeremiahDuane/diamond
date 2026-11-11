import { CircleSlash } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { cx } from '../../utils/cx'

export function CancelIcon({ className, ...props }: LucideProps) {
  return <CircleSlash aria-hidden="true" {...props} className={cx('size-4 shrink-0', className)} />
}
