import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import { useCallback, useEffect, useState, type FocusEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { ToastContext, type ToastOptions } from './toast-context'

type ToastRecord = ToastOptions & { id: string }
let toastCounter = 0

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
}

function ToastItem({ item, onDismiss }: { item: ToastRecord; onDismiss: (id: string) => void }) {
  const [paused, setPaused] = useState(false)
  const tone = item.tone ?? 'info'
  const duration = item.duration ?? 5000
  const Icon = icons[tone]

  useEffect(() => {
    if (paused || duration <= 0) return
    const timer = window.setTimeout(() => onDismiss(item.id), duration)
    return () => window.clearTimeout(timer)
  }, [duration, item.id, onDismiss, paused])

  const handleBlur = (event: FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false)
  }

  return (
    <article
      className={`relay-toast relay-toast--${tone}`}
      role={tone === 'error' ? 'alert' : 'status'}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={handleBlur}
    >
      <span className="relay-toast__icon" aria-hidden="true"><Icon size={18} /></span>
      <div className="relay-toast__content"><p>{item.title}</p>{item.description && <div>{item.description}</div>}{item.action && <div className="relay-toast__action">{item.action}</div>}</div>
      <button className="relay-toast__dismiss" type="button" aria-label="Dismiss notification" onClick={() => onDismiss(item.id)}><X size={16} /></button>
    </article>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastRecord[]>([])
  const dismissToast = useCallback((id: string) => setToasts((current) => current.filter((item) => item.id !== id)), [])
  const toast = useCallback((options: ToastOptions) => {
    toastCounter += 1
    const id = `relay-toast-${toastCounter}`
    setToasts((current) => [...current, { ...options, id }])
    return id
  }, [])

  return (
    <ToastContext.Provider value={{ toast, dismissToast }}>
      {children}
      {createPortal(<div className="relay-toast-viewport" aria-label="Notifications">{toasts.map((item) => <ToastItem item={item} onDismiss={dismissToast} key={item.id} />)}</div>, document.body)}
    </ToastContext.Provider>
  )
}
