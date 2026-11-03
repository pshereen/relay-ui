import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  it('renders non-urgent feedback as a status', () => {
    render(<Alert tone="success" title="Changes saved">Your profile is up to date.</Alert>)
    expect(screen.getByRole('status')).toHaveTextContent('Changes savedYour profile is up to date.')
  })

  it('renders errors as urgent alerts', () => {
    render(<Alert tone="error">We could not save your changes.</Alert>)
    expect(screen.getByRole('alert')).toHaveTextContent('We could not save your changes.')
  })

  it('supports an accessible dismiss action', async () => {
    const onDismiss = vi.fn()
    render(<Alert onDismiss={onDismiss}>Scheduled maintenance tonight.</Alert>)
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss alert' }))
    expect(onDismiss).toHaveBeenCalledOnce()
  })
})
