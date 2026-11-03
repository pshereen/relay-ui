import { createContext, useContext, type ReactNode } from 'react'
import type { AlertTone } from './Alert'

export type ToastOptions = {
  title: ReactNode
  description?: ReactNode
  tone?: AlertTone
  duration?: number
  action?: ReactNode
}

export type ToastContextValue = {
  toast: (options: ToastOptions) => string
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within a ToastProvider')
  return context
}
