import type { ComponentPropsWithRef } from 'react'
import { cx } from '../utils/cx'

export function Table({ className, ...props }: ComponentPropsWithRef<'table'>) {
  return <table {...props} className={cx('w-full border-collapse text-left text-sm text-foreground', className)} />
}

export function TableCaption({ className, ...props }: ComponentPropsWithRef<'caption'>) {
  return <caption {...props} className={cx('px-6 py-3 text-left text-xs text-muted-foreground flex items-center gap-4', className)} />
}

export function TableHeader({ className, ...props }: ComponentPropsWithRef<'thead'>) {
  return <thead {...props} className={cx('bg-muted', className)} />
}

export function TableBody(props: ComponentPropsWithRef<'tbody'>) {
  return <tbody {...props} />
}

export function TableRow({ className, ...props }: ComponentPropsWithRef<'tr'>) {
  return <tr {...props} className={cx('border-b border-border last:border-b-0', className)} />
}

export function TableHead({ className, ...props }: ComponentPropsWithRef<'th'>) {
  return <th scope="col" {...props} className={cx('border-b border-input px-6 py-4 whitespace-nowrap font-semibold', className)} />
}

export function TableCell({ className, ...props }: ComponentPropsWithRef<'td'>) {
  return <td {...props} className={cx('px-6 py-4 whitespace-nowrap', className)} />
}
