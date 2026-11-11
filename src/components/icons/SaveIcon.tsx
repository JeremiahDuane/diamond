import { Save } from 'lucide-react'
import type { LucideProps } from 'lucide-react'
import { cx } from '../../utils/cx'

export function SaveIcon({ className, ...props }: LucideProps) {
  return <Save aria-hidden="true" {...props} className={cx('size-4 shrink-0', className)} />
}
