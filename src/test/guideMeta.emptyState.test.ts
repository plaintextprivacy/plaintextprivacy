import { describe, it, expect, vi } from 'vitest'

vi.mock('@/data/guideMeta.generated.json', () => ({
  default: { guides: {}, featured: null }
}))

describe('guideMeta with the placeholder (pre-generation) data', () => {
  it('getFeaturedGuide returns null rather than throwing', async () => {
    const { getFeaturedGuide } = await import('@/lib/guideMeta')
    expect(getFeaturedGuide()).toBeNull()
  })

  it('getGuideDates returns undefined for any slug when guides is empty', async () => {
    const { getGuideDates } = await import('@/lib/guideMeta')
    expect(getGuideDates('iphone')).toBeUndefined()
  })
})
