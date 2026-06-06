import { useMemo, useState, useEffect, useRef } from 'react'
import Fuse from 'fuse.js'
import type { IndexGuideCard, IndexCategory } from '@/types/guide'
import indexData from '@/data/index.json'

interface FlatCard extends IndexGuideCard {
  categoryLabel: string
}

export interface TopbarSearchResult {
  slug: string
  title: string
  description: string
  icon: string
  categoryLabel: string
  status: IndexGuideCard['status']
}

const { categories } = indexData as { categories: IndexCategory[] }

const allCards: FlatCard[] = categories.flatMap(({ label, guides }) =>
  guides.map((guide) => ({ ...guide, categoryLabel: label }))
)

const publishedCards = allCards.filter(({ status }) => status === 'published')

const fuse = new Fuse<FlatCard>(publishedCards, {
  keys: [
    { name: 'title', weight: 0.5 },
    { name: 'description', weight: 0.3 },
    { name: 'tags', weight: 0.2 }
  ],
  threshold: 0.35,
  ignoreLocation: true,
  minMatchCharLength: 2
})

export const useTopbarSearch = () => {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const results: TopbarSearchResult[] = useMemo(() => {
    if (query.trim().length < 2) return []
    return fuse.search(query, { limit: 6 }).map(({ item }) => ({
      slug: item.slug,
      title: item.title,
      description: item.description,
      icon: item.icon,
      categoryLabel: item.categoryLabel,
      status: item.status
    }))
  }, [query])

  // open dropdown when there are results, close when query is cleared
  useEffect(() => {
    setOpen(results.length > 0)
  }, [results])

  // close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const handleClear = () => {
    setQuery('')
    setOpen(false)
  }

  const handleResultClick = () => {
    setQuery('')
    setOpen(false)
  }

  return {
    query,
    setQuery,
    results,
    open,
    containerRef,
    handleClear,
    handleResultClick
  }
}
