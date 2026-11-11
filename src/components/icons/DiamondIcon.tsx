import type { ComponentPropsWithRef } from 'react'
import { cx } from '../../utils/cx'

export function DiamondIcon({ className, ...props }: ComponentPropsWithRef<'svg'>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props} className={cx('size-8 shrink-0 text-primary', className)}>
      <path d="M9 5h14l6 9-13 14L3 14 9 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 14h26M9 5l7 23 7-23" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}
