import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react'

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
  label: ReactNode
  description?: ReactNode
  error?: ReactNode
  success?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({
  id,
  label,
  description,
  error,
  success = false,
  leadingIcon,
  trailingIcon,
  required,
  disabled,
  readOnly,
  className = '',
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) {
  const generatedId = useId()
  const inputId = id ?? `relay-input-${generatedId}`
  const descriptionId = description ? `${inputId}-description` : undefined
  const errorId = error ? `${inputId}-error` : undefined
  const describedBy = [ariaDescribedBy, errorId, descriptionId].filter(Boolean).join(' ') || undefined
  const state = error ? 'error' : success ? 'success' : 'default'

  return (
    <div className={`relay-field ${className}`.trim()} data-state={state} data-disabled={disabled || undefined}>
      <label className="relay-field__label" htmlFor={inputId}>
        {label}{required && <span className="relay-field__required" aria-hidden="true"> *</span>}
      </label>
      <div className="relay-field__control">
        {leadingIcon && <span className="relay-field__icon relay-field__icon--leading" aria-hidden="true">{leadingIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          className="relay-input"
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        />
        {trailingIcon && <span className="relay-field__icon relay-field__icon--trailing" aria-hidden="true">{trailingIcon}</span>}
      </div>
      {error && <p className="relay-field__message relay-field__message--error" id={errorId} role="alert">{error}</p>}
      {description && <p className="relay-field__message" id={descriptionId}>{description}</p>}
    </div>
  )
})
