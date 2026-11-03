import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'small' | 'medium' | 'large'
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export function Button({ children, className = '', variant = 'primary', size = 'medium', leadingIcon, trailingIcon, ...props }: ButtonProps) {
  return <button className={`relay-button relay-button--${variant} relay-button--${size} ${className}`.trim()} {...props}>{leadingIcon && <span aria-hidden="true">{leadingIcon}</span>}{children}{trailingIcon && <span aria-hidden="true">{trailingIcon}</span>}</button>
}
