import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ToastProvider } from './Toast'
import { useToast } from './toast-context'

function ToastDemo({ duration = 5000 }: { duration?: number }) {
  const { toast } = useToast()
  return <><button onClick={() => toast({ title: 'Changes saved', description: 'Your workspace is up to date.', tone: 'success', duration })}>Show success</button><button onClick={() => toast({ title: 'Upload failed', tone: 'error', duration })}>Show error</button></>
}

afterEach(() => vi.useRealTimers())

describe('Toast', () => {
  it('stacks notifications and allows manual dismissal', async () => {
    render(<ToastProvider><ToastDemo duration={0} /></ToastProvider>)
    await userEvent.click(screen.getByRole('button', { name: 'Show success' }))
    await userEvent.click(screen.getByRole('button', { name: 'Show error' }))
    expect(screen.getByRole('status')).toHaveTextContent('Changes saved')
    expect(screen.getByRole('alert')).toHaveTextContent('Upload failed')
    await userEvent.click(screen.getAllByRole('button', { name: 'Dismiss notification' })[0])
    expect(screen.queryByText('Changes saved')).not.toBeInTheDocument()
  })

  it('automatically dismisses after its duration', () => {
    vi.useFakeTimers()
    render(<ToastProvider><ToastDemo duration={1000} /></ToastProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'Show success' }))
    expect(screen.getByRole('status')).toBeInTheDocument()
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })

  it('pauses auto-dismissal while hovered', () => {
    vi.useFakeTimers()
    render(<ToastProvider><ToastDemo duration={1000} /></ToastProvider>)
    fireEvent.click(screen.getByRole('button', { name: 'Show success' }))
    const notification = screen.getByRole('status')
    fireEvent.mouseEnter(notification)
    act(() => vi.advanceTimersByTime(1500))
    expect(notification).toBeInTheDocument()
    fireEvent.mouseLeave(notification)
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
  })
})
