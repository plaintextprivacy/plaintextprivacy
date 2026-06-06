import type { IndexCategory } from '@/types/guide'
import { GuideCard } from './GuideCard'
import { getCategoryIcon } from '@/lib/iconMap'

interface CategorySectionProps {
  category: IndexCategory
}

export const CategorySection = ({ category }: CategorySectionProps) => {
  const { id, label, guides } = category
  const published = guides.filter(({ status }) => status === 'published').length

  return (
    <section className='mb-10'>
      <div className='mb-4 flex items-center gap-2.5'>
        <div className='flex h-8 w-8 items-center justify-center rounded-lg bg-bg-tertiary text-accent'>
          {getCategoryIcon(id, { size: 15 })}
        </div>
        <h2 className='text-ui font-medium text-text-primary'>{label}</h2>
        <span className='ml-auto text-label text-text-tertiary'>
          {published} of {guides.length} published
        </span>
      </div>

      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3'>
        {guides.map((card) => (
          <GuideCard key={card.slug} card={card} />
        ))}
      </div>
    </section>
  )
}
