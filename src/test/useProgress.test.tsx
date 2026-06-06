import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { RiskBadge } from '@/components/guide/RiskBadge'
import { ProgressBar } from '@/components/guide/ProgressBar'
import { RiskDots } from '@/components/guide/RiskDots'
import { ChecklistItem } from '@/components/guide/ChecklistItem'
import { getIcon, hasIcon } from '@/lib/iconMap'
import type { ChecklistItem as ChecklistItemType, RiskLevel } from '@/types/guide'

// RiskBadge

describe('RiskBadge', () => {
  const levels: RiskLevel[] = ['critical', 'high', 'medium', 'low']

  it.each(levels)('renders the correct label for risk=%s', (risk) => {
    render(<RiskBadge risk={risk} />)
    const label = risk.charAt(0).toUpperCase() + risk.slice(1)
    expect(screen.getByText(label)).toBeInTheDocument()
  })

  it('applies a distinct class for each risk level', () => {
    const { rerender, container } = render(<RiskBadge risk='critical' />)
    const criticalClass = container.firstElementChild?.className

    rerender(<RiskBadge risk='low' />)
    const lowClass = container.firstElementChild?.className

    expect(criticalClass).not.toBe(lowClass)
  })
})

// ProgressBar

describe('ProgressBar', () => {
  it('renders the completed / total count', () => {
    render(<ProgressBar completed={3} total={10} />)
    expect(screen.getByText('3 of 10 complete')).toBeInTheDocument()
  })

  it('has the correct ARIA progressbar attributes', () => {
    render(<ProgressBar completed={5} total={20} />)
    const bar = screen.getByRole('progressbar')
    expect(bar).toHaveAttribute('aria-valuenow', '5')
    expect(bar).toHaveAttribute('aria-valuemax', '20')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
  })

  it('renders zero progress without error', () => {
    render(<ProgressBar completed={0} total={0} />)
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('shows a live region for screen readers', () => {
    render(<ProgressBar completed={2} total={5} />)
    const live = document.querySelector('[aria-live="polite"]')
    expect(live).toBeInTheDocument()
  })
})

// RiskDots

describe('RiskDots', () => {
  it('renders 5 dots for every risk level', () => {
    const { container } = render(<RiskDots risk='critical' />)
    const dots = container.querySelectorAll('span')
    expect(dots).toHaveLength(5)
  })

  it('is hidden from assistive technology', () => {
    const { container } = render(<RiskDots risk='high' />)
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })
})

// ChecklistItem

const mockItem: ChecklistItemType = {
  id: 'test-item',
  name: 'Enable FileVault',
  path: 'System Settings → FileVault',
  risk: 'critical',
  why: 'Encrypts your drive.',
  steps: [{ text: 'Open `System Settings`' }, { text: 'Click FileVault' }]
}

describe('ChecklistItem', () => {
  it('renders the item name', () => {
    render(<ChecklistItem item={mockItem} />)
    expect(screen.getByText('Enable FileVault')).toBeInTheDocument()
  })

  it('renders the settings path', () => {
    render(<ChecklistItem item={mockItem} />)
    expect(screen.getByText('System Settings → FileVault')).toBeInTheDocument()
  })

  it('starts unchecked by default', () => {
    render(<ChecklistItem item={mockItem} />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(false)
  })

  it('respects initialChecked=true', () => {
    render(<ChecklistItem item={mockItem} initialChecked={true} />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(true)
  })

  it('calls onChange when checkbox is toggled', () => {
    const onChange = vi.fn()
    render(<ChecklistItem item={mockItem} onChange={onChange} />)

    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(true)

    fireEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('does not show expanded content by default', () => {
    render(<ChecklistItem item={mockItem} />)
    expect(screen.queryByText('Encrypts your drive.')).toBeNull()
  })

  it('expands to show why/steps when the row button is clicked', () => {
    render(<ChecklistItem item={mockItem} />)

    fireEvent.click(document.querySelector('button[aria-expanded]')!)
    expect(screen.getByText('Encrypts your drive.')).toBeInTheDocument()
  })

  it('expand button has aria-expanded attribute', () => {
    render(<ChecklistItem item={mockItem} />)
    const btn = document.querySelector('button[aria-expanded]')
    expect(btn).toHaveAttribute('aria-expanded', 'false')
  })

  it('checking an item does not open the drawer', () => {
    render(<ChecklistItem item={mockItem} />)
    fireEvent.click(screen.getByRole('checkbox'))
    expect(screen.queryByText('Encrypts your drive.')).toBeNull()
  })
})

// iconMap

describe('iconMap', () => {
  it('returns a React element for a known key', () => {
    const icon = getIcon('apple')
    expect(icon).not.toBeNull()
  })

  it('returns null for an unknown key', () => {
    const icon = getIcon('does-not-exist-xyz')
    expect(icon).toBeNull()
  })

  it('hasIcon returns true for known keys', () => {
    expect(hasIcon('lock')).toBe(true)
    expect(hasIcon('envelope')).toBe(true)
  })

  it('hasIcon returns false for unknown keys', () => {
    expect(hasIcon('not-a-real-icon')).toBe(false)
  })

  it('applies className option to the rendered icon', () => {
    const { container } = render(<>{getIcon('lock', { className: 'test-class' })}</>)
    expect(container.querySelector('.test-class')).toBeInTheDocument()
  })
})
