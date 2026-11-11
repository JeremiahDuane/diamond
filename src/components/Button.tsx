import type { ComponentPropsWithRef, ComponentType } from 'react'
import { AddIcon } from './icons/AddIcon'
import { CancelIcon } from './icons/CancelIcon'
import { RemoveIcon } from './icons/RemoveIcon'
import { cx } from '../utils/cx'

export type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'add' | 'remove' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  active?: boolean
}

const variants: Record<NonNullable<ButtonProps['variant']>, {
  className: string
  icon?: ComponentType
  active?: { className: string; icon: ComponentType }
}> = {
  primary: {
    className: 'border-transparent bg-primary text-primary-foreground enabled:hover:bg-primary-hover',
  },
  secondary: {
    className: 'border-input bg-surface text-foreground enabled:hover:bg-muted',
  },
  ghost: {
    className: 'border-transparent bg-transparent text-foreground enabled:hover:bg-muted',
  },
  add: {
    className: 'border-transparent bg-primary text-primary-foreground enabled:hover:bg-primary-hover',
    icon: AddIcon,
    active: {
      className: 'border-transparent bg-primary/50 text-primary-foreground enabled:hover:bg-primary-hover/50',
      icon: CancelIcon,
    },
  },
  remove: {
    className: 'border-transparent bg-destructive text-destructive-foreground enabled:hover:bg-destructive-hover',
    icon: RemoveIcon,
  },
  destructive: {
    className: 'border-transparent bg-destructive text-destructive-foreground enabled:hover:bg-destructive-hover',
    icon: RemoveIcon,
  },
}

const sizes = {
  sm: 'min-h-8 gap-2 px-3 py-1 text-sm',
  md: 'min-h-10 gap-2 px-4 py-2 text-sm',
  lg: 'min-h-12 gap-2 px-6 py-3 text-base',
}

export function Button({
  variant = 'primary',
  size = 'md',
  active = false,
  type = 'button',
  className = '',
  children,
  ...props
}: ButtonProps) {
  // The variant supplies its icon automatically alongside its styles.
  const configuration = variants[variant]
  const { className: variantClassName, icon: Icon } = (active && configuration.active) || configuration

  return (
    <button
      {...props}
      type={type}
      className={cx('inline-flex items-center justify-center rounded-md border font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:cursor-not-allowed disabled:opacity-50', variantClassName, sizes[size], className)}
    >
      {Icon && <Icon />}
      {children}
    </button>
  )
}
