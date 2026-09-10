import { describe, it, expect, vi } from 'vitest'

const mockData = {
  guides: {
    iphone: { created: '2026-01-05', updated: '2026-01-05' },
    macos: { created: '2026-03-12', updated: '2026-08-14' }
  },
  featured: {
    type: 'updated',
    slug: 'macos',
    date: '2026-08-14'
  }
}

vi.mock('@/data/guideMeta.generated.json', () => ({
  default: mockData
}))

describe('guideMeta', () => {
  it('getGuideDates returns created/updated dates for a known slug', async () => {
    const { getGuideDates } = await import('@/lib/guideMeta')
    expect(getGuideDates('macos')).toEqual({ created: '2026-03-12', updated: '2026-08-14' })
  })

  it('getGuideDates returns undefined for a slug with no git history entry', async () => {
    const { getGuideDates } = await import('@/lib/guideMeta')
    expect(getGuideDates('does-not-exist')).toBeUndefined()
  })

  it('getFeaturedGuide returns the featured guide data', async () => {
    const { getFeaturedGuide } = await import('@/lib/guideMeta')
    expect(getFeaturedGuide()).toEqual(mockData.featured)
  })

  it('formatMonthYear formats an ISO date as "Month YYYY"', async () => {
    const { formatMonthYear } = await import('@/lib/guideMeta')
    expect(formatMonthYear('2026-08-14')).toBe('August 2026')
  })

  it('formatMonthYear handles January correctly (0-indexed month edge case)', async () => {
    const { formatMonthYear } = await import('@/lib/guideMeta')
    expect(formatMonthYear('2026-01-05')).toBe('January 2026')
  })

  it('formatMonthYear handles December correctly', async () => {
    const { formatMonthYear } = await import('@/lib/guideMeta')
    expect(formatMonthYear('2025-12-25')).toBe('December 2025')
  })
})
