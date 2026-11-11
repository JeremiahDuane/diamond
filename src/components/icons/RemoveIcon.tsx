import { X } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { cx } from '../../utils/cx'

export function RemoveIcon({ className, ...props }: LucideProps) {
  return <X aria-hidden="true" {...props} className={cx('size-4 shrink-0', className)} />
}
