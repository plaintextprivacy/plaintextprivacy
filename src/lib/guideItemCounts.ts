import type { AnyGuide } from '@/types/guide'

/**
 * eager import all guide JSON files
 * Returns a map of slug → item count derived from the guide's sections/tabs
 */
const guideModules = import.meta.glob<AnyGuide>('../data/guides/*.json', {
  eager: true,
  import: 'default'
})

const buildItemCountMap = (): Record<string, number> => {
  const map: Record<string, number> = {}

  for (const [path, guide] of Object.entries(guideModules)) {
    const slug = path.replace('../data/guides/', '').replace('.json', '')

    if (guide.layout === 'checklist') {
      map[slug] = guide.sections.reduce((sum, s) => sum + s.items.length, 0)
    }
    /* TODO leave off unless brining back tabbed checklists */
    /*else if (guide.layout === 'checklist-tabbed') {
      map[slug] = guide.tabs.reduce(
        (sum, tab) => sum + tab.sections.reduce((s2, s) => s2 + s.items.length, 0),
        0
      )
    }*/
  }

  return map
}

/** map of guide slug → total checklist item count */
export const guideItemCounts: Record<string, number> = buildItemCountMap()

/** returns the item count for a given slug, or undefined if the guide isn't found */
export const getItemCount = (slug: string): number | undefined => guideItemCounts[slug]

// ─── Duration map ─────────────────────────────────────────────────────────────

const buildDurationMap = (): Record<string, number> => {
  const map: Record<string, number> = {}

  for (const [path, guide] of Object.entries(guideModules)) {
    const slug = path.replace('../data/guides/', '').replace('.json', '')

    if (guide.layout === 'checklist') {
      const t = guide.meta?.timeMinutes
      if (t) map[slug] = t
    } else if (guide.layout === 'checklist-tabbed') {
      const t = guide.tabs[0]?.meta?.timeMinutes
      if (t) map[slug] = t
    }
  }

  return map
}

/** Map of guide slug → timeMinutes from the guide's own JSON */
export const guideDurations: Record<string, number> = buildDurationMap()

/** Returns the timeMinutes for a given slug, or undefined if not set */
export const getDuration = (slug: string): number | undefined =>
  guideDurations[slug]
