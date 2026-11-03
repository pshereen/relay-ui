import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Select, type SelectOptionGroup } from './Select'

const options = [
  { value: 'design', label: 'Design' },
  { value: 'engineering', label: 'Engineering' },
]

describe('Select', () => {
  it('associates its label and helper text', () => {
    render(<Select label="Team" options={options} description="Choose your primary team." />)
    expect(screen.getByRole('combobox', { name: 'Team' })).toHaveAccessibleDescription('Choose your primary team.')
  })

  it('supports selecting an option and forwards change events', async () => {
    const onChange = vi.fn()
    render(<Select label="Team" options={options} placeholder="Select a team" onChange={onChange} />)
    const select = screen.getByRole('combobox', { name: 'Team' })
    await userEvent.selectOptions(select, 'engineering')
    expect(select).toHaveValue('engineering')
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('renders grouped options', () => {
    const groupedOptions: SelectOptionGroup[] = [{ label: 'Product', options }]
    render(<Select label="Role" options={groupedOptions} />)
    expect(screen.getByRole('group', { name: 'Product' })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: 'Design' })).toBeInTheDocument()
  })

  it('exposes error, required, and disabled states', () => {
    const { rerender } = render(<Select label="Region" options={options} error="Select a region." required />)
    const select = screen.getByRole('combobox', { name: 'Region' })
    expect(select).toBeRequired()
    expect(select).toHaveAttribute('aria-invalid', 'true')
    expect(select).toHaveAccessibleDescription('Select a region.')

    rerender(<Select label="Region" options={options} disabled />)
    expect(screen.getByRole('combobox', { name: 'Region' })).toBeDisabled()
  })
})
