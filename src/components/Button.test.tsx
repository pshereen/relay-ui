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
})
