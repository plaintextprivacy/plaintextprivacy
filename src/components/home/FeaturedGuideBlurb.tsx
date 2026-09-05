import { Link } from 'react-router-dom'
import { Sparkles, RefreshCw } from 'lucide-react'
import { getFeaturedGuide, formatMonthYear } from '@/lib/guideMeta'
import indexData from '@/data/index.json'
import type { GuidesIndex, IndexGuideCard } from '@/types/guide'

const { categories } = indexData as GuidesIndex

const findGuideCard = (slug: string): IndexGuideCard | undefined =>
  categories.flatMap((c) => c.guides).find((g) => g.slug === slug)

export const FeaturedGuideBlurb = () => {
  const featured = getFeaturedGuide()
  if (!featured) return null

  const card = findGuideCard(featured.slug)
  if (!card) return null

  const Icon = featured.type === 'new' ? Sparkles : RefreshCw
  const label =
    featured.type === 'new' ? 'New guide' : `Updated ${formatMonthYear(featured.date)}`

  return (
    <Link
      to={`/guides/${card.slug}`}
      className='mx-auto mt-6 flex items-center justify-center gap-2 text-center text-body text-text-secondary transition-colors hover:text-accent'
    >
      <Icon size={13} className='shrink-0 text-accent' />
      <span>
        <span className='font-medium text-text-primary'>{label}:</span>{' '}
        <span className='font-medium'>{card.title}</span>
        {' - '}
        {card.description}
      </span>
    </Link>
  )
}
