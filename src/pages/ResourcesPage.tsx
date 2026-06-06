import { ExternalLink } from 'lucide-react'
import { PageLayout } from '@/components/layout/PageLayout'
import resourcesData from '@/data/resources.json'
import { PageHeader } from '@/components/layout/PageHeader.tsx'

interface Resource {
  id: string
  name: string
  url: string
  displayUrl: string
  blurb: string
  tags: string[]
}

interface ResourceCategory {
  id: string
  label: string
  description: string
  accentColor: string
  resources: Resource[]
}

interface SpotlightItemProps {
  resource: Resource
  accentColor: string
}

const SpotlightItem = ({ resource, accentColor }: SpotlightItemProps) => {
  const { name, url, displayUrl, blurb, tags } = resource

  return (
    <div className='grid grid-cols-[3px_1fr] gap-4 border-b border-default py-6 last:border-b-0'>
      <div className='rounded-full' style={{ background: accentColor }} />

      <div>
        <div className='mb-1.5 flex flex-wrap items-baseline gap-x-3 gap-y-1'>
          <h3 className='text-body-md font-medium text-text-primary'>{name}</h3>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1 font-mono text-caption text-teal transition-opacity hover:opacity-70'
            onClick={(e) => e.stopPropagation()}
          >
            {displayUrl}
            <ExternalLink size={10} />
          </a>
        </div>

        <p className='mb-3 text-body leading-relaxed text-text-secondary'>{blurb}</p>

        <div className='flex flex-wrap gap-1.5'>
          {tags.map((tag) => (
            <span
              key={tag}
              className='rounded bg-bg-elevated px-2 py-[3px] text-caption text-text-tertiary'
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

interface CategorySectionProps {
  category: ResourceCategory
}

const CategorySection = ({ category }: CategorySectionProps) => {
  const { label, description, accentColor, resources } = category

  return (
    <section className='mb-12'>
      <div className='mb-1 flex items-center gap-3'>
        <div
          className='h-2.5 w-2.5 rounded-full flex-shrink-0'
          style={{ background: accentColor }}
        />
        <h2 className='text-ui font-medium text-text-primary'>{label}</h2>
      </div>
      <p className='mb-6 ml-[22px] text-body leading-relaxed text-text-secondary'>{description}</p>

      <div className='rounded-xl border border-default bg-bg-secondary px-6'>
        {resources.map((resource) => (
          <SpotlightItem key={resource.id} resource={resource} accentColor={accentColor} />
        ))}
      </div>
    </section>
  )
}

const { categories } = resourcesData as { categories: ResourceCategory[] }

const totalResources = categories.reduce((sum, { resources }) => sum + resources.length, 0)

export const ResourcesPage = () => (
  <PageLayout>
    <PageHeader
      eyebrow='Resources'
      title='Trusted privacy resources'
      description={
        <>
          <p>
            {totalResources} organizations, tools, and guides for those who are interested in diving
            even deeper into the privacy and security world.
          </p>
        </>
      }
    />

    <main className='mx-auto max-w-5xl py-10'>
      {categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}

      <div className='rounded-lg border border-default bg-bg-secondary px-5 py-4'>
        <p className='text-label leading-relaxed text-text-tertiary'>
          We have no financial relationship with any resource listed here. Inclusion is based solely
          on quality, reliability, and demonstrated commitment to user privacy. Always research any
          tool before adopting it - including the ones we recommend.
        </p>
      </div>
    </main>
  </PageLayout>
)
