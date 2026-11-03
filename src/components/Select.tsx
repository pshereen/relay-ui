import { ChevronDown } from 'lucide-react'
import { forwardRef, useId, type ReactNode, type SelectHTMLAttributes } from 'react'

export type SelectOption = {
  value: string
  label: string
  disabled?: boolean
}

export type SelectOptionGroup = {
  label: string
  options: SelectOption[]
}

export type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label: ReactNode
  options: Array<SelectOption | SelectOptionGroup>
  placeholder?: string
  description?: ReactNode
  error?: ReactNode
  success?: boolean
}

function isOptionGroup(option: SelectOption | SelectOptionGroup): option is SelectOptionGroup {
  return 'options' in option
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select({
  id,
  label,
  options,
  placeholder,
  description,
  error,
  success = false,
  required,
  disabled,
  className = '',
  value,
  defaultValue,
  'aria-describedby': ariaDescribedBy,
  ...props
}, ref) {
  const generatedId = useId()
  const selectId = id ?? `relay-select-${generatedId}`
  const descriptionId = description ? `${selectId}-description` : undefined
  const errorId = error ? `${selectId}-error` : undefined
  const describedBy = [ariaDescribedBy, errorId, descriptionId].filter(Boolean).join(' ') || undefined
  const state = error ? 'error' : success ? 'success' : 'default'

  return (
    <div className={`relay-field ${className}`.trim()} data-state={state} data-disabled={disabled || undefined}>
      <label className="relay-field__label" htmlFor={selectId}>
        {label}{required && <span className="relay-field__required" aria-hidden="true"> *</span>}
      </label>
      <div className="relay-field__control relay-field__control--select">
        <select
          ref={ref}
          id={selectId}
          className="relay-select"
          required={required}
          disabled={disabled}
          value={value}
          defaultValue={value === undefined ? (defaultValue ?? (placeholder ? '' : undefined)) : undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((option) => isOptionGroup(option) ? (
            <optgroup label={option.label} key={option.label}>
              {option.options.map((item) => <option value={item.value} disabled={item.disabled} key={item.value}>{item.label}</option>)}
            </optgroup>
          ) : <option value={option.value} disabled={option.disabled} key={option.value}>{option.label}</option>)}
        </select>
        <span className="relay-select__chevron" aria-hidden="true"><ChevronDown size={16} /></span>
      </div>
      {error && <p className="relay-field__message relay-field__message--error" id={errorId} role="alert">{error}</p>}
      {description && <p className="relay-field__message" id={descriptionId}>{description}</p>}
    </div>
  )
})
