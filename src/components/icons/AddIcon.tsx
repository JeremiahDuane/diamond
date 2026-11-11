import { Plus } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { cx } from '../../utils/cx'

export function AddIcon({ className, ...props }: LucideProps) {
  return <Plus aria-hidden="true" {...props} className={cx('size-4 shrink-0', className)} />
}
