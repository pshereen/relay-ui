import { forwardRef, useId, useState, type ReactNode, type TextareaHTMLAttributes } from 'react'

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: ReactNode
  description?: ReactNode
  error?: ReactNode
  success?: boolean
  showCharacterCount?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea({
  id,
  label,
  description,
  error,
  success = false,
  showCharacterCount = false,
  required,
  disabled,
  readOnly,
  className = '',
  maxLength,
  value,
  defaultValue,
  onChange,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) {
  const generatedId = useId()
  const textareaId = id ?? `relay-textarea-${generatedId}`
  const descriptionId = description ? `${textareaId}-description` : undefined
  const errorId = error ? `${textareaId}-error` : undefined
  const countId = showCharacterCount ? `${textareaId}-count` : undefined
  const describedBy = [ariaDescribedBy, errorId, descriptionId, countId].filter(Boolean).join(' ') || undefined
  const [uncontrolledCount, setUncontrolledCount] = useState(() => String(defaultValue ?? '').length)
  const characterCount = value === undefined ? uncontrolledCount : String(value).length
  const state = error ? 'error' : success ? 'success' : 'default'

  return (
    <div className={`relay-field ${className}`.trim()} data-state={state} data-disabled={disabled || undefined}>
      <label className="relay-field__label" htmlFor={textareaId}>
        {label}{required && <span className="relay-field__required" aria-hidden="true"> *</span>}
      </label>
      <div className="relay-field__control relay-field__control--textarea">
        <textarea
          ref={ref}
          id={textareaId}
          className="relay-textarea"
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          onChange={(event) => {
            setUncontrolledCount(event.currentTarget.value.length)
            onChange?.(event)
          }}
          {...props}
        />
      </div>
      <div className="relay-field__meta">
        <div>
          {error && <p className="relay-field__message relay-field__message--error" id={errorId} role="alert">{error}</p>}
          {description && <p className="relay-field__message" id={descriptionId}>{description}</p>}
        </div>
        {showCharacterCount && <span className="relay-field__count" id={countId} aria-live="polite">{characterCount}{maxLength ? ` / ${maxLength}` : ''}</span>}
      </div>
    </div>
  )
})
