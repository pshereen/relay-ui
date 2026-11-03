import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Input } from './Input'

describe('Input', () => {
  it('associates its visible label and description', () => {
    render(<Input label="Email address" description="We will only use this for account updates." />)
    const input = screen.getByRole('textbox', { name: 'Email address' })
    expect(input).toHaveAccessibleDescription('We will only use this for account updates.')
  })

  it('announces errors and marks the input invalid', () => {
    render(<Input label="Work email" error="Enter a valid work email." />)
    const input = screen.getByRole('textbox', { name: 'Work email' })
    expect(input).toHaveAttribute('aria-invalid', 'true')
    expect(input).toHaveAccessibleDescription('Enter a valid work email.')
    expect(screen.getByRole('alert')).toHaveTextContent('Enter a valid work email.')
  })

  it('accepts typing and forwards change events', async () => {
    const onChange = vi.fn()
    render(<Input label="Project name" onChange={onChange} />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Project name' }), 'Relay')
    expect(onChange).toHaveBeenCalledTimes(5)
  })
})
