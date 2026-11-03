import { useState } from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Dialog } from './Dialog'

function DialogExample({ onOpenChange = () => undefined }: { onOpenChange?: (open: boolean) => void }) {
  const [open, setOpen] = useState(false)
  const updateOpen = (nextOpen: boolean) => {
    setOpen(nextOpen)
    onOpenChange(nextOpen)
  }
  return <><button onClick={() => updateOpen(true)}>Open settings</button><Dialog open={open} onOpenChange={updateOpen} title="Workspace settings" description="Update this workspace."><input aria-label="Workspace name" data-autofocus /><button onClick={() => updateOpen(false)}>Save</button></Dialog></>
}

describe('Dialog', () => {
  it('opens with an accessible name and moves focus inside', async () => {
    render(<DialogExample />)
    await userEvent.click(screen.getByRole('button', { name: 'Open settings' }))
    const dialog = screen.getByRole('dialog', { name: 'Workspace settings' })
    expect(dialog).toHaveAccessibleDescription('Update this workspace.')
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Workspace name' })).toHaveFocus())
  })

  it('closes with Escape and restores focus to the trigger', async () => {
    const onOpenChange = vi.fn()
    render(<DialogExample onOpenChange={onOpenChange} />)
    const trigger = screen.getByRole('button', { name: 'Open settings' })
    await userEvent.click(trigger)
    await userEvent.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(onOpenChange).toHaveBeenLastCalledWith(false)
    expect(trigger).toHaveFocus()
  })

  it('closes from its close button and backdrop', async () => {
    render(<DialogExample />)
    await userEvent.click(screen.getByRole('button', { name: 'Open settings' }))
    await userEvent.click(screen.getByRole('button', { name: 'Close dialog' }))
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await userEvent.click(screen.getByRole('button', { name: 'Open settings' }))
    const backdrop = screen.getByRole('dialog').parentElement!
    await userEvent.click(backdrop)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('locks document scrolling while open', async () => {
    render(<DialogExample />)
    await userEvent.click(screen.getByRole('button', { name: 'Open settings' }))
    expect(document.body).toHaveStyle({ overflow: 'hidden' })
    await userEvent.keyboard('{Escape}')
    expect(document.body.style.overflow).toBe('')
  })

  it('wraps focus within the dialog', async () => {
    render(<DialogExample />)
    await userEvent.click(screen.getByRole('button', { name: 'Open settings' }))
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus())
    const closeButton = screen.getByRole('button', { name: 'Close dialog' })
    closeButton.focus()
    await userEvent.tab({ shift: true })
    expect(screen.getByRole('button', { name: 'Save' })).toHaveFocus()
  })
})
