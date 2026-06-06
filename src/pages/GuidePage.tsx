import { useParams, Navigate } from 'react-router-dom'
import type { AnyGuide } from '@/types/guide'
import { ChecklistLayout } from '@/components/guide/ChecklistLayout'
import { ChecklistTabbedLayout } from '@/components/guide/ChecklistTabbedLayout'
import { PageLayout } from '@/components/layout/PageLayout'

/**
 * eager import all guide JSON files
 * the key is the slug used in the url: /guides/[slug]
 */
const guideModules = import.meta.glob<{ default: AnyGuide }>('../data/guides/*.json', {
  eager: true
})

const buildGuideMap = (): Record<string, AnyGuide> => {
  const map: Record<string, AnyGuide> = {}
  for (const [path, mod] of Object.entries(guideModules)) {
    const slug = path.replace('../data/guides/', '').replace('.json', '')
    map[slug] = mod.default
  }
  return map
}

const guideMap = buildGuideMap()

export const GuidePage = () => {
  const { slug = '' } = useParams<{ slug: string }>()
  const guide = guideMap[slug]

  if (!guide) return <Navigate to='/guides' replace />

  return (
    <PageLayout>
      {guide.layout === 'checklist' && <ChecklistLayout guide={guide} />}
      {guide.layout === 'checklist-tabbed' && <ChecklistTabbedLayout guide={guide} />}
    </PageLayout>
  )
}
