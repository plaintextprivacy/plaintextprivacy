import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StepList } from '@/components/guide/StepList'

describe('StepList', () => {
  it('renders each step as a numbered list item', () => {
    render(<StepList steps={[{ text: 'Step one' }, { text: 'Step two' }]} />)
    expect(screen.getByText('Step one')).toBeInTheDocument()
    expect(screen.getByText('Step two')).toBeInTheDocument()
  })

  it('renders step numbers starting at 1', () => {
    render(<StepList steps={[{ text: 'First' }, { text: 'Second' }]} />)

    const numbers = screen.getAllByText(/^[0-9]+$/)
    expect(numbers[0].textContent).toBe('1')
    expect(numbers[1].textContent).toBe('2')
  })

  it('converts backtick tokens to <code> elements', () => {
    render(<StepList steps={[{ text: 'Open `Settings → Privacy`' }]} />)

    const code = document.querySelector('code')
    expect(code?.textContent).toBe('Settings → Privacy')
  })

  it('handles multiple backtick tokens in one step', () => {
    render(<StepList steps={[{ text: 'Open `Settings` then tap `Privacy`' }]} />)
    const codes = document.querySelectorAll('code')
    expect(codes).toHaveLength(2)
    expect(codes[0].textContent).toBe('Settings')
    expect(codes[1].textContent).toBe('Privacy')
  })

  it('renders plain text without backticks as-is', () => {
    render(<StepList steps={[{ text: 'No code here' }]} />)
    expect(document.querySelector('code')).toBeNull()
    expect(screen.getByText('No code here')).toBeInTheDocument()
  })

  it('renders an empty list when steps array is empty', () => {
    const { container } = render(<StepList steps={[]} />)
    expect(container.querySelectorAll('li')).toHaveLength(0)
  })
})
