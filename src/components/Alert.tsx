import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'
import type { ReactNode } from 'react'

export type AlertTone = 'info' | 'success' | 'warning' | 'error'

export type AlertProps = {
  tone?: AlertTone
  title?: ReactNode
  children: ReactNode
  action?: ReactNode
  onDismiss?: () => void
  dismissLabel?: string
  className?: string
}

const icons = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
}

export function Alert({ tone = 'info', title, children, action, onDismiss, dismissLabel = 'Dismiss alert', className = '' }: AlertProps) {
  const Icon = icons[tone]
  return (
    <div className={`relay-alert relay-alert--${tone} ${className}`.trim()} role={tone === 'error' ? 'alert' : 'status'}>
      <span className="relay-alert__icon" aria-hidden="true"><Icon size={18} /></span>
      <div className="relay-alert__content">{title && <p className="relay-alert__title">{title}</p>}<div className="relay-alert__description">{children}</div>{action && <div className="relay-alert__action">{action}</div>}</div>
      {onDismiss && <button className="relay-alert__dismiss" type="button" aria-label={dismissLabel} onClick={onDismiss}><X size={16} /></button>}
    </div>
  )
}
