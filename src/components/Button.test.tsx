import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders an accessible button and handles activation', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Save changes</Button>)
    await userEvent.click(screen.getByRole('button', { name: 'Save changes' }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('applies its variant and size contracts', () => {
    render(<Button variant="secondary" size="large">Continue</Button>)
    expect(screen.getByRole('button', { name: 'Continue' })).toHaveClass('relay-button--secondary', 'relay-button--large')
  })

  it('prevents activation and exposes busy state while loading', async () => {
    const onClick = vi.fn()
    render(<Button loading onClick={onClick}>Saving changes</Button>)

    const button = screen.getByRole('button', { name: 'Saving changes' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    await userEvent.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('supports icon-only actions with an accessible name', () => {
    render(<Button iconOnly aria-label="Add item"><span>+</span></Button>)
    expect(screen.getByRole('button', { name: 'Add item' })).toHaveClass('relay-button--icon-only')
  })

  it('defaults to button type to avoid accidental form submission', () => {
    render(<Button>Cancel</Button>)
    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveAttribute('type', 'button')
  })
})
