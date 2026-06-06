import { Link } from 'react-router-dom'
import { RiskBadge } from '@/components/guide/RiskBadge'
import { getIcon, formatDuration } from '@/lib/iconMap'
import { FEATURED_SLUGS } from '@/lib/Featuredslugs'
import { getItemCount, getDuration } from '@/lib/guideItemCounts'
import type { GuidesIndex, IndexGuideCard } from '@/types/guide'
import indexData from '@/data/index.json'

const { categories } = indexData as GuidesIndex

const allGuides: IndexGuideCard[] = categories.flatMap(({ guides }) => guides)

const featured: IndexGuideCard[] = FEATURED_SLUGS.map((slug) =>
  allGuides.find((g) => g.slug === slug)
).filter((g): g is IndexGuideCard => g !== undefined)

export const FeaturedGuides = () => (
  <section className='border-default px-6 py-6'>
    <div className='mx-auto max-w-5xl'>
      <div className='mb-6 flex items-end justify-between'>
        <h2 className='text-body-lg font-medium uppercase tracking-widest text-accent'>
          Featured Guides
        </h2>
        <Link
          to='/guides'
          className='text-label text-text-secondary transition-colors hover:text-accent'
        >
          See all guides →
        </Link>
      </div>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {featured.map(({ slug, icon, title, description, risk }) => (
          <Link
            key={slug}
            to={`/guides/${slug}`}
            className='group flex flex-col gap-2.5 rounded-[10px] border border-default bg-bg-secondary p-4 transition-all hover:-translate-y-px hover:border-accent'
          >
            <div className='flex items-start justify-between gap-2'>
              <span className='flex w-6 items-center justify-center'>
                {getIcon(icon, { size: 18 })}
              </span>
              <p className='grow text-body-md font-medium leading-snug text-text-primary transition-colors group-hover:text-accent'>
                {title}
              </p>
              <RiskBadge risk={risk} />
            </div>
            <p className='flex-1 text-label leading-relaxed text-text-secondary'>{description}</p>
            {(getItemCount(slug) !== undefined || getDuration(slug) !== undefined) && (
              <p className='text-caption text-text-tertiary'>
                {getItemCount(slug) !== undefined
                  ? `${getItemCount(slug)} items covered`
                  : formatDuration(getDuration(slug)!)}
              </p>
            )}
          </Link>
        ))}
      </div>

      {/* risk assessment prompt */}
      <Link
        to='/risk-profile'
        className='group mt-4 flex items-center justify-between gap-4 rounded-[10px] border border-dashed border-default bg-bg-secondary px-5 py-4 transition-all hover:border-accent'
      >
        <div>
          <p className='text-body font-medium text-text-primary transition-colors group-hover:text-accent'>
            Not sure where to start?
          </p>
          <p className='mt-0.5 text-label text-text-secondary'>
            Take the 5-question risk assessment to determine your risk profile
          </p>
        </div>
        <span className='shrink-0 text-body text-text-tertiary transition-colors group-hover:text-accent'>
          Start →
        </span>
      </Link>
    </div>
  </section>
)
