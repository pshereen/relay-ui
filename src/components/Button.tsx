import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  loading?: boolean
  iconOnly?: boolean
}

export function Button({
  children,
  className = '',
  variant = 'primary',
  size = 'medium',
  leadingIcon,
  trailingIcon,
  loading = false,
  iconOnly = false,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  const classes = [
    'relay-button',
    `relay-button--${variant}`,
    `relay-button--${size}`,
    iconOnly ? 'relay-button--icon-only' : '',
    loading ? 'relay-button--loading' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <button
      className={classes}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <span className="relay-button__spinner" aria-hidden="true" /> : leadingIcon && <span className="relay-button__icon" aria-hidden="true">{leadingIcon}</span>}
      {iconOnly ? <span className="relay-button__icon" aria-hidden="true">{children}</span> : children}
      {!loading && !iconOnly && trailingIcon && <span className="relay-button__icon" aria-hidden="true">{trailingIcon}</span>}
    </button>
  )
}
