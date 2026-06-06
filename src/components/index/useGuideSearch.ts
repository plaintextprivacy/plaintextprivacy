import { useMemo, useState } from 'react'
import Fuse, { type IFuseOptions } from 'fuse.js'
import type { IndexGuideCard, IndexCategory } from '@/types/guide'
import { getDuration } from '@/lib/guideItemCounts'

interface FlatCard extends IndexGuideCard {
  categoryId: string
}

const fuseOptions: IFuseOptions<FlatCard> = {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 }
  ],
  threshold: 0.35,
  includeScore: false,
  ignoreLocation: true,
  minMatchCharLength: 2
}

export const useGuideSearch = (categories: IndexCategory[]) => {
  const [query, setQuery] = useState('')
  const [activeCategory, setCategory] = useState('all')

  const allCards: FlatCard[] = useMemo(
    () =>
      categories.flatMap(({ id, guides }) => guides.map((guide) => ({ ...guide, categoryId: id }))),
    [categories]
  )

  const fuse = useMemo(() => new Fuse(allCards, fuseOptions), [allCards])

  const results: FlatCard[] = useMemo(() => {
    const searched: FlatCard[] =
      query.trim().length >= 2 ? fuse.search(query).map(({ item }) => item) : allCards

    return activeCategory === 'all'
      ? searched
      : searched.filter(({ categoryId }) => categoryId === activeCategory)
  }, [query, activeCategory, allCards, fuse])

  const grouped: IndexCategory[] = useMemo(() => {
    const resultSlugs = new Set(results.map(({ slug }) => slug))

    return categories
      .map((cat) => ({
        ...cat,
        guides: cat.guides.filter(({ slug }) => resultSlugs.has(slug))
      }))
      .filter(({ guides }) => guides.length > 0)
  }, [results, categories])

  const publishedCount = allCards.filter(({ status }) => status === 'published').length
  const totalCount = allCards.length
  const criticalCount = allCards.filter(
    ({ status, risk }) => status === 'published' && risk === 'critical'
  ).length
  const totalMinutes = allCards
    .filter(({ status }) => status === 'published')
    .reduce((sum, { slug }) => sum + (getDuration(slug) ?? 0), 0)

  return {
    query,
    setQuery,
    activeCategory,
    setCategory,
    grouped,
    publishedCount,
    totalCount,
    criticalCount,
    totalMinutes,
    hasResults: grouped.length > 0
  }
}
