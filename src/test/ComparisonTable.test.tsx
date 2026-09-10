import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComparisonTable } from '@/components/guide/ComparisonTable'
import type { ComparisonTable as ComparisonTableType } from '@/types/guide'

const baseTable: ComparisonTableType = {
  title: 'Test comparison',
  note: 'Values change - verify directly.',
  columns: [
    { id: 'a', label: 'Provider A', recommended: true, url: 'https://a.example.com' },
    { id: 'b', label: 'Provider B' }
  ],
  rows: [
    { label: 'No-logs audit', values: { a: 'Yes', b: 'No' } },
    { label: 'Price', values: { a: '$5/mo', b: '$4/mo' } }
  ]
}

describe('ComparisonTable', () => {
  it('renders the title and note', () => {
    render(<ComparisonTable table={baseTable} />)
    expect(screen.getByText('Test comparison')).toBeInTheDocument()
    expect(screen.getByText('Values change - verify directly.')).toBeInTheDocument()
  })

  it('renders every column label', () => {
    render(<ComparisonTable table={baseTable} />)
    expect(screen.getByText('Provider A')).toBeInTheDocument()
    expect(screen.getByText('Provider B')).toBeInTheDocument()
  })

  it('renders every row label', () => {
    render(<ComparisonTable table={baseTable} />)
    expect(screen.getByText('No-logs audit')).toBeInTheDocument()
    expect(screen.getByText('Price')).toBeInTheDocument()
  })

  it('renders a "Yes" value as a check icon, not literal text', () => {
    render(<ComparisonTable table={baseTable} />)
    expect(screen.getByLabelText('Yes')).toBeInTheDocument()
    expect(screen.queryByText('Yes')).toBeNull()
  })

  it('renders a "No" value as an x icon, not literal text', () => {
    render(<ComparisonTable table={baseTable} />)
    expect(screen.getByLabelText('No')).toBeInTheDocument()
    expect(screen.queryByText('No')).toBeNull()
  })

  it('renders non-yes/no values as plain text', () => {
    render(<ComparisonTable table={baseTable} />)
    expect(screen.getByText('$5/mo')).toBeInTheDocument()
    expect(screen.getByText('$4/mo')).toBeInTheDocument()
  })

  it('renders a column with a url as a link to that url', () => {
    render(<ComparisonTable table={baseTable} />)
    const link = screen.getByRole('link', { name: 'Provider A' })
    expect(link).toHaveAttribute('href', 'https://a.example.com')
  })

  it('renders a column without a url as plain text, not a link', () => {
    render(<ComparisonTable table={baseTable} />)
    expect(screen.queryByRole('link', { name: 'Provider B' })).toBeNull()
  })

  it('shows a "Recommended" label on the recommended column', () => {
    render(<ComparisonTable table={baseTable} />)
    expect(screen.getByText('Recommended')).toBeInTheDocument()
  })

  it('falls back to an em dash for a missing cell value', () => {
    const tableWithGap: ComparisonTableType = {
      columns: baseTable.columns,
      rows: [{ label: 'Missing cell', values: { a: 'Yes' } }]
    }
    render(<ComparisonTable table={tableWithGap} />)
    expect(screen.getByText('—')).toBeInTheDocument()
  })

  describe('column count warning', () => {
    afterEach(() => {
      vi.restoreAllMocks()
    })

    it('warns in the console when given more than 4 columns', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      const fiveColumnTable: ComparisonTableType = {
        columns: [
          { id: 'a', label: 'A' },
          { id: 'b', label: 'B' },
          { id: 'c', label: 'C' },
          { id: 'd', label: 'D' },
          { id: 'e', label: 'E' }
        ],
        rows: [{ label: 'Row', values: { a: 'Yes', b: 'No', c: 'Yes', d: 'No', e: 'Yes' } }]
      }
      render(<ComparisonTable table={fiveColumnTable} />)
      expect(warnSpy).toHaveBeenCalled()
    })

    it('does not warn when given 4 or fewer columns', () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      render(<ComparisonTable table={baseTable} />)
      expect(warnSpy).not.toHaveBeenCalled()
    })
  })
})
