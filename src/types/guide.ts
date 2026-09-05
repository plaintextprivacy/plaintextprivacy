export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'

export type GuideLayout = 'checklist' | 'checklist-tabbed'

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
  layout: Extract<GuideLayout, 'checklist'>
  category: string
  title: string
  subtitle: string
  meta: GuideMeta
  context?: ContextBox
  warning?: WarningBox
  sections: ChecklistSection[]
}

export interface ChecklistTab {
  id: string
  label: string
  icon: string
  title: string
  subtitle: string
  meta: GuideMeta
  context?: ContextBox
  warning?: WarningBox
  sections: ChecklistSection[]
}

export interface ChecklistTabbedGuide {
  slug: string
  layout: Extract<GuideLayout, 'checklist-tabbed'>
  tabs: ChecklistTab[]
}

export type AnyGuide = ChecklistGuide | ChecklistTabbedGuide

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
