import { X } from 'lucide-react'
import { useEffect, useId, useRef, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'

export type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  footer?: ReactNode
  size?: 'small' | 'medium' | 'large'
  closeLabel?: string
  showClose?: boolean
  closeOnEscape?: boolean
  closeOnBackdrop?: boolean
}

const focusableSelector = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = 'medium',
  closeLabel = 'Close dialog',
  showClose = true,
  closeOnEscape = true,
  closeOnBackdrop = true,
}: DialogProps) {
  const generatedId = useId()
  const titleId = `relay-dialog-${generatedId}-title`
  const descriptionId = description ? `relay-dialog-${generatedId}-description` : undefined
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const focusTimer = window.setTimeout(() => {
      const initialTarget = panelRef.current?.querySelector<HTMLElement>('[data-autofocus]')
        ?? panelRef.current?.querySelector<HTMLElement>(focusableSelector)
        ?? panelRef.current
      initialTarget?.focus()
    }, 0)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus()
    }
  }, [open])

  if (!open) return null

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape' && closeOnEscape) {
      event.preventDefault()
      onOpenChange(false)
      return
    }

    if (event.key !== 'Tab') return
    const focusableElements = Array.from(panelRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? [])
    if (focusableElements.length === 0) {
      event.preventDefault()
      panelRef.current?.focus()
      return
    }

    const first = focusableElements[0]
    const last = focusableElements[focusableElements.length - 1]
    if (event.shiftKey && (document.activeElement === first || !panelRef.current?.contains(document.activeElement))) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  const handleBackdropClick = (event: MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdrop && event.target === event.currentTarget) onOpenChange(false)
  }

  return createPortal(
    <div className="relay-dialog__backdrop" onMouseDown={handleBackdropClick}>
      <div
        ref={panelRef}
        className={`relay-dialog relay-dialog--${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        <div className="relay-dialog__header">
          <div><h2 id={titleId}>{title}</h2>{description && <p id={descriptionId}>{description}</p>}</div>
          {showClose && <button className="relay-dialog__close" type="button" aria-label={closeLabel} onClick={() => onOpenChange(false)}><X size={18} /></button>}
        </div>
        {children && <div className="relay-dialog__body">{children}</div>}
        {footer && <div className="relay-dialog__footer">{footer}</div>}
      </div>
    </div>,
    document.body,
  )
}
