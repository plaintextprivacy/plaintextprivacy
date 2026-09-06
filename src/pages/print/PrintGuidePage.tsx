import { useParams } from 'react-router-dom'
import type { AnyGuide, ChecklistSection, ChecklistItem } from '@/types/guide'
import { getGuideDates, formatMonthYear } from '@/lib/guideMeta'
import './print.css'

const guideModules = import.meta.glob<{ default: AnyGuide }>('../../data/guides/*.json', {
  eager: true
})

const buildGuideMap = (): Record<string, AnyGuide> => {
  const map: Record<string, AnyGuide> = {}
  for (const [path, mod] of Object.entries(guideModules)) {
    const slug = path.replace('../../data/guides/', '').replace('.json', '')
    map[slug] = mod.default
  }
  return map
}

const guideMap = buildGuideMap()

const riskLabel: Record<string, string> = {
  critical: 'Critical',
  high: 'High',
  medium: 'Medium',
  low: 'Low'
}

const renderStepText = (text: string) => {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <strong key={i}>{part.slice(1, -1)}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

const PrintItem = ({ item }: { item: ChecklistItem }) => (
  <div className='print-item'>
    <div className='print-item-header'>
      <h3>{item.name}</h3>
      <span className={`print-risk print-risk-${item.risk}`}>{riskLabel[item.risk]}</span>
    </div>
    <p className='print-path'>{item.path}</p>
    <p className='print-why'>
      <strong>Why it matters:</strong> {item.why}
    </p>
    <div className='print-steps'>
      <strong>Steps:</strong>
      <ol>
        {item.steps.map((step, i) => (
          <li key={i}>{renderStepText(step.text)}</li>
        ))}
      </ol>
    </div>
    {item.note && <p className='print-note'>{item.note}</p>}
    {item.sources && item.sources.length > 0 && (
      <p className='print-sources'>
        Sources: {item.sources.map((s) => `${s.label} (${s.url})`).join(' · ')}
      </p>
    )}
  </div>
)

const PrintSection = ({ section }: { section: ChecklistSection }) => (
  <section className='print-section'>
    <h2 className='print-section-title'>{section.label}</h2>
    {section.items.map((item) => (
      <PrintItem key={item.id} item={item} />
    ))}
  </section>
)

export const PrintGuidePage = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  const guide = guideMap[slug]

  if (!guide) return <p style={{ padding: 40 }}>Guide not found.</p>

  if (guide.layout === 'checklist') {
    const dates = getGuideDates(guide.slug)

    return (
      <div className='print-page'>
        <header className='print-header'>
          <p className='print-brand'>Plaintext Privacy</p>
          <h1>{guide.title}</h1>
          <p className='print-subtitle'>{guide.subtitle}</p>
          {dates?.updated && (
            <p className='print-meta'>Last updated: {formatMonthYear(dates.updated)}</p>
          )}
        </header>

        {guide.sections.map((section) => (
          <PrintSection key={section.id} section={section} />
        ))}

        <footer className='print-footer'>plaintextprivacy.org/guides/{guide.slug}</footer>
      </div>
    )
  }

  return <p style={{ padding: 40 }}>This guide format is not supported for printing.</p>
}
