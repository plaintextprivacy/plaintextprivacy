import { Link } from 'react-router-dom'
import type { IndexGuideCard } from '@/types/guide'
import { RiskBadge } from '@/components/guide/RiskBadge'
import { getIcon, formatDuration } from '@/lib/iconMap'
import { getItemCount, getDuration } from '@/lib/guideItemCounts'

interface GuideCardProps {
  card: IndexGuideCard
}

const statusStyles = {
  published: 'bg-[#0f2e1a] text-risk-low',
  'coming-soon': 'bg-bg-elevated text-text-tertiary'
} as const

const statusLabels = {
  published: 'Published',
  'coming-soon': 'Coming soon'
} as const

export const GuideCard = ({ card }: GuideCardProps) => {
  const { slug, title, description, icon, risk, status } = card
  const isPublished = status === 'published'

  const Inner = () => (
    <div
      className={`flex h-full flex-col gap-2.5 rounded-[10px] border p-4 transition-all ${
        isPublished
          ? 'border-border-default bg-bg-secondary hover:border-accent hover:-translate-y-px cursor-pointer'
          : 'border-border-default bg-bg-secondary opacity-60 cursor-default'
      }`}
    >
      <div className='flex items-start justify-between gap-2'>
        <span className='flex w-6 items-center justify-center'>{getIcon(icon, { size: 18 })}</span>
        <p className='grow text-sm font-medium leading-snug text-text-primary'>{title}</p>
        <div className='flex flex-wrap justify-end gap-1.5'>
          <span
            className={`rounded px-1.5 py-[3px] text-micro font-medium ${statusStyles[status]}`}
          >
            {statusLabels[status]}
          </span>
          {isPublished && <RiskBadge risk={risk} />}
        </div>
      </div>

      <p className='flex-1 text-label leading-relaxed text-text-secondary'>{description}</p>

      <div className='flex items-center justify-between'>
        <span className='text-caption text-text-tertiary'>
          {getItemCount(slug) !== undefined
            ? `${getItemCount(slug)} items`
            : getDuration(slug) !== undefined
              ? formatDuration(getDuration(slug)!)
              : ''}
        </span>
        {isPublished && (
          <span className='text-micro text-accent opacity-0 transition-opacity group-hover:opacity-100'>
            →
          </span>
        )}
      </div>
    </div>
  )

  if (!isPublished)
    return (
      <div>
        <Inner />
      </div>
    )

  return (
    <Link to={`/guides/${slug}`} className='group block h-full'>
      <Inner />
    </Link>
  )
}
