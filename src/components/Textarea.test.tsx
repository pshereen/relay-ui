import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { Textarea } from './Textarea'

describe('Textarea', () => {
  it('updates its character count as the user types', async () => {
    render(<Textarea label="Summary" showCharacterCount maxLength={20} />)
    await userEvent.type(screen.getByRole('textbox', { name: 'Summary' }), 'Clear UI')
    expect(screen.getByText('8 / 20')).toBeInTheDocument()
  })

  it('supports required, disabled, and read-only native states', () => {
    render(<>
      <Textarea label="Required notes" required />
      <Textarea label="Disabled notes" disabled />
      <Textarea label="Read-only notes" readOnly value="Final" onChange={() => undefined} />
    </>)
    expect(screen.getByRole('textbox', { name: 'Required notes' })).toBeRequired()
    expect(screen.getByRole('textbox', { name: 'Disabled notes' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Read-only notes' })).toHaveAttribute('readonly')
  })
})
