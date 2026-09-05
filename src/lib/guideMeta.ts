import guideMetaData from '@/data/guideMeta.generated.json'

export interface GuideDates {
  created: string
  updated: string
}

export interface FeaturedGuide {
  type: 'new' | 'updated'
  slug: string
  date: string
}

interface GuideMetaFile {
  guides: Record<string, GuideDates>
  featured: FeaturedGuide | null
}

const data = guideMetaData as GuideMetaFile

export const getGuideDates = (slug: string): GuideDates | undefined => data.guides[slug]

export const getFeaturedGuide = (): FeaturedGuide | null => data.featured

export const formatMonthYear = (isoDate: string): string => {
  const [year, month] = isoDate.split('-').map(Number)
  const date = new Date(year, month - 1)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}
