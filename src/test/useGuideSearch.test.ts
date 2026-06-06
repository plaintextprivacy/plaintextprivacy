import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useGuideSearch } from '@/components/index/useGuideSearch'
import type { IndexCategory } from '@/types/guide'

// data

const categories: IndexCategory[] = [
  {
    id: 'phones',
    label: 'Phones',
    icon: 'mobile-screen',
    guides: [
      {
        slug: 'iphone',
        title: 'iPhone privacy settings',
        description: 'Lock down iOS biometrics and location.',
        icon: 'apple',
        risk: 'critical',
        status: 'published',
        tags: ['iphone', 'ios', 'apple', 'location'],
        meta: { timeMinutes: 15 }
      },
      {
        slug: 'signal',
        title: 'Signal secure setup',
        description: 'Configure Signal for private messaging.',
        icon: 'comments',
        risk: 'critical',
        status: 'published',
        tags: ['signal', 'messaging', 'e2ee'],
        meta: { timeMinutes: 10 }
      }
    ]
  },
  {
    id: 'browsing',
    label: 'Web browsing',
    icon: 'globe',
    guides: [
      {
        slug: 'browsers',
        title: 'Browsers and search engines',
        description: 'Switch from Chrome and Google.',
        icon: 'magnifying-glass',
        risk: 'critical',
        status: 'published',
        tags: ['browser', 'chrome', 'firefox', 'search'],
        meta: { timeMinutes: 20 }
      },
      {
        slug: 'email-privacy',
        title: 'Email privacy',
        description: 'Private email providers and masking.',
        icon: 'envelope',
        risk: 'high',
        status: 'coming-soon',
        tags: ['email', 'protonmail'],
        meta: { timeMinutes: 25 }
      }
    ]
  }
]

// tests

describe('useGuideSearch', () => {
  it('returns all categories when query is empty', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    expect(result.current.grouped).toHaveLength(2)
    expect(result.current.hasResults).toBe(true)
  })

  it('filters guides by title keyword', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    act(() => result.current.setQuery('iphone'))

    expect(result.current.grouped).toHaveLength(1)
    expect(result.current.grouped[0].guides[0].slug).toBe('iphone')
  })

  it('filters guides by tag keyword', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    act(() => result.current.setQuery('messaging'))

    expect(result.current.grouped[0].guides[0].slug).toBe('signal')
  })

  it('returns empty results for unmatched query', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    act(() => result.current.setQuery('zzznomatch'))

    expect(result.current.hasResults).toBe(false)
    expect(result.current.grouped).toHaveLength(0)
  })

  it('does not search with single-character query', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    act(() => result.current.setQuery('i'))

    // single char should return all results, not filter
    expect(result.current.grouped).toHaveLength(2)
  })

  it('filters by category when activeCategory is set', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    act(() => result.current.setCategory('phones'))

    expect(result.current.grouped).toHaveLength(1)
    expect(result.current.grouped[0].id).toBe('phones')
  })

  it('returns only matching guides within an active category', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    act(() => result.current.setCategory('phones'))
    act(() => result.current.setQuery('signal'))

    expect(result.current.grouped).toHaveLength(1)
    expect(result.current.grouped[0].guides[0].slug).toBe('signal')
  })

  it('correctly counts published vs total guides', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    // 3 published (iphone, signal, browsers), 1 coming soon (email-privacy)
    expect(result.current.publishedCount).toBe(3)
    expect(result.current.totalCount).toBe(4)
  })

  it('resets to all results when query is cleared', () => {
    const { result } = renderHook(() => useGuideSearch(categories))

    act(() => result.current.setQuery('iphone'))
    act(() => result.current.setQuery(''))

    expect(result.current.grouped).toHaveLength(2)
  })
})
