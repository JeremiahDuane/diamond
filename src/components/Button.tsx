import type { ComponentPropsWithRef } from 'react'
import { Plus, X } from 'lucide-react'

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'add' | 'remove' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
}

const variants = {
  primary: 'border-transparent bg-violet-700 text-white enabled:hover:bg-violet-800',
  secondary: 'border-gray-300 bg-white text-gray-900 enabled:hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:enabled:hover:bg-gray-700',
  ghost: 'border-transparent bg-transparent text-violet-700 enabled:hover:bg-violet-50 dark:text-violet-300 dark:enabled:hover:bg-violet-950',
  add: 'border-transparent bg-violet-700 text-white enabled:hover:bg-violet-800',
  remove: 'border-transparent bg-red-700 text-white enabled:hover:bg-red-800 focus-visible:outline-red-600',
  destructive: 'border-transparent bg-red-700 text-white enabled:hover:bg-red-800 focus-visible:outline-red-600',
}

const icons = {
  add: Plus,
  remove: X,
  destructive: X,
}

const sizes = {
  sm: 'min-h-8 gap-1.5 px-3 py-1 text-sm',
  md: 'min-h-10 gap-2 px-4 py-2 text-sm',
  lg: 'min-h-12 gap-2 px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  const Icon = variant in icons ? icons[variant as keyof typeof icons] : undefined

  return (
    <button
      {...props}
      type={type}
      className={`inline-flex items-center justify-center rounded-md border font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {Icon && <Icon aria-hidden="true" className="size-[1em] shrink-0" />}
      {children}
    </button>
  )
}
