export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'

export type GuideStatus = 'published' | 'coming-soon'

export interface Step {
  text: string
}

export interface ContextBox {
  title: string
  body: string
  body2?: string
}

export interface WarningBox {
  body: string
}

export interface Setting {
  id: string
  name: string
  path: string
  risk: RiskLevel
  why: string
  steps: Step[]
  note?: string
}

export interface ComparisonColumn {
  id: string
  label: string
  recommended?: boolean
  url?: string
}

export interface ComparisonRow {
  label: string
  values: Record<string, string>
}

export interface ComparisonTable {
  title?: string
  note?: string
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
}

export interface GuideMeta {
  timeMinutes?: number
  platforms?: string[]
  topics?: number
}

export interface Source {
  label: string
  url: string
}

export interface ChecklistItem {
  id: string
  name: string
  path: string
  risk: RiskLevel
  why: string
  steps: Step[]
  note?: string
  sources?: Source[]
}

export interface ChecklistSection {
  id: string
  label: string
  risk: RiskLevel
  items: ChecklistItem[]
}

export interface ChecklistGuide {
  slug: string
  layout: 'checklist'
  category: string
  title: string
  subtitle: string
  meta: GuideMeta
  context?: ContextBox
  warning?: WarningBox
  comparisonTable?: ComparisonTable
  sections: ChecklistSection[]
}

export type AnyGuide = ChecklistGuide

export interface IndexGuideCard {
  slug: string
  title: string
  description: string
  icon: string
  risk: RiskLevel
  status: GuideStatus
  tags: string[]
  meta?: GuideMeta
}

export interface IndexCategory {
  id: string
  label: string
  icon: string
  guides: IndexGuideCard[]
}

export interface GuidesIndex {
  categories: IndexCategory[]
}
