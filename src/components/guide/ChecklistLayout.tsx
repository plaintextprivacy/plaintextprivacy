import { Link } from 'react-router-dom'
import type { ChecklistGuide, GuidesIndex } from '@/types/guide'
import { Sidebar } from '@/components/layout/Sidebar'
import { ProgressBar } from './ProgressBar'
import { ContextBox } from './ContextBox'
import { ChecklistItem } from './ChecklistItem'
import { useActiveSection } from './useActiveSection'
import { useProgress } from './useProgress'
import { getCategoryIcon, formatDuration } from '@/lib/iconMap'
import indexData from '@/data/index.json'
import { Download } from 'lucide-react'

const { categories } = indexData as GuidesIndex

const getRelatedGuides = (slug: string, category: string) => {
  const cat = categories.find((c) => c.id === category)
  if (!cat) return []
  return cat.guides
    .filter((g) => g.slug !== slug && g.status === 'published')
    .map((g) => ({ label: g.title, href: `/guides/${g.slug}` }))
}

interface ChecklistLayoutProps {
  guide: ChecklistGuide
}

const sectionRiskColor: Record<string, string> = {
  critical: 'text-risk-critical',
  high: 'text-risk-high',
  medium: 'text-risk-medium',
  low: 'text-risk-low'
}

export const ChecklistLayout = ({ guide }: ChecklistLayoutProps) => {
  const { title, subtitle, meta, context, warning, sections } = guide

  const allItems = sections.flatMap(({ items }) => items)
  const total = allItems.length

  const { checkedIds, isChecked, setChecked } = useProgress(guide.slug)

  const sectionIds = sections.map(({ id }) => id)
  const activeSectionId = useActiveSection(sectionIds)

  const handleCheck = (id: string, checked: boolean) => {
    setChecked(id, checked)
  }

  const sidebarLinks = sections.map(({ id, label, risk }) => ({ id, label, risk }))

  const scrollToSection = (id: string) => {
    document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className='mx-auto w-full max-w-6xl'>
      <div className='flex min-h-[calc(100vh-48px)] items-start'>
        <Sidebar
          links={sidebarLinks}
          activeId={activeSectionId}
          relatedLinks={getRelatedGuides(guide.slug, guide.category)}
          onLinkClick={scrollToSection}
        />

        <main className='flex-1 min-w-0 px-4 sm:px-8 pb-16 pt-8'>
          <div className='w-full max-w-[700px] mx-auto'>
            <Link
              to='/guides'
              className='mb-4 inline-flex items-center gap-1 text-micro text-text-secondary hover:text-accent transition-colors'
            >
              ← All guides
            </Link>

            {/* mobile nav — hidden on lg+ where sidebar is visible */}
            {sidebarLinks.length > 0 && (
              <div className='lg:hidden mb-6 overflow-x-auto'>
                <div className='flex gap-2 pb-2'>
                  {sidebarLinks.map(({ id, label, risk }) => (
                    <button
                      key={id}
                      onClick={() => scrollToSection(id)}
                      className={[
                        'flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-caption transition-all',
                        activeSectionId === id
                          ? 'border-accent bg-accent-muted text-accent'
                          : 'border-default text-text-secondary hover:border-accent hover:text-accent'
                      ].join(' ')}
                    >
                      <span
                        className={`h-[5px] w-[5px] rounded-full bg-${risk === 'critical' ? 'risk-critical' : risk === 'high' ? 'risk-high' : risk === 'medium' ? 'accent' : 'risk-low'}`}
                      />
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className='mb-8 border-b border-default pb-6'>
              <span className='mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-muted px-2.5 py-1 text-caption font-medium text-accent'>
                {getCategoryIcon(guide.category)}{' '}
                {guide.category.charAt(0).toUpperCase() + guide.category.slice(1)}
              </span>
              <h1 className='mb-2.5 text-heading-sm font-medium text-text-primary'>{title}</h1>
              <p className='mb-4 text-label leading-relaxed text-text-secondary'>{subtitle}</p>
              <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-micro text-text-primary'>
                <a
                  href={`/pdfs/${guide.slug}.pdf`}
                  download
                  className='inline-flex items-center gap-1.5 rounded-lg border border-border-default px-3 py-1.5 text-caption transition-colors hover:border-accent hover:text-accent'
                >
                  <Download size={13} />
                  Download as PDF
                </a>
                {meta.timeMinutes && <span>{formatDuration(meta.timeMinutes)}</span>}
                {total > 0 && (
                  <>
                    <span aria-hidden='true'>·</span>
                    <span>{total} items</span>
                  </>
                )}
                {meta.updated && (
                  <>
                    <span aria-hidden='true'>·</span>
                    <span>Last updated: {meta.updated}</span>
                  </>
                )}
                {meta.platforms?.map((p) => (
                  <span key={p} className='flex items-center gap-2'>
                    <span aria-hidden='true'>·</span>
                    <span>{p}</span>
                  </span>
                ))}
              </div>
            </div>

            <ProgressBar completed={checkedIds.size} total={total} />
            {context && (
              <ContextBox title={context.title} body={context.body} body2={context.body2} />
            )}
            {warning && <ContextBox title='Important' body={warning.body} variant='warning' />}

            {sections.map(({ id, label, risk, items }) => (
              <section key={id} id={`section-${id}`} className='mb-7'>
                <div className='mb-2.5 flex items-center gap-2'>
                  <span
                    className={`text-body font-medium uppercase tracking-wide ${sectionRiskColor[risk]}`}
                  >
                    ●
                  </span>
                  <h2 className='text-body font-medium uppercase tracking-wide text-text-secondary'>
                    {label}
                  </h2>
                  <div className='h-px flex-1 bg-border-default' />
                </div>

                {items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    item={item}
                    initialChecked={isChecked(item.id)}
                    onChange={(checked) => handleCheck(item.id, checked)}
                  />
                ))}
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
