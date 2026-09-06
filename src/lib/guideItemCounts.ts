import type { AnyGuide } from '@/types/guide'

/**
 * eager import all guide JSON files
 * returns a map of slug → item count derived from the guide's sections
 */
const guideModules = import.meta.glob<AnyGuide>('../data/guides/*.json', {
  eager: true,
  import: 'default'
})

const buildItemCountMap = (): Record<string, number> => {
  const map: Record<string, number> = {}

  for (const [path, guide] of Object.entries(guideModules)) {
    const slug = path.replace('../data/guides/', '').replace('.json', '')
    map[slug] = guide.sections.reduce((sum, s) => sum + s.items.length, 0)
  }

  return map
}

/** map of guide slug → total checklist item count */
export const guideItemCounts: Record<string, number> = buildItemCountMap()

/** returns the item count for a given slug, or undefined if the guide isn't found */
export const getItemCount = (slug: string): number | undefined => guideItemCounts[slug]

const buildDurationMap = (): Record<string, number> => {
  const map: Record<string, number> = {}

  for (const [path, guide] of Object.entries(guideModules)) {
    const slug = path.replace('../data/guides/', '').replace('.json', '')
    const t = guide.meta?.timeMinutes
    if (t) map[slug] = t
  }

  return map
}

/** map of guide slug → timeMinutes from the guide's own JSON */
export const guideDurations: Record<string, number> = buildDurationMap()

/** returns the timeMinutes for a given slug, or undefined if not set */
export const getDuration = (slug: string): number | undefined => guideDurations[slug]
