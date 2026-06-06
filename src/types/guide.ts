// ─── Risk level ──────────────────────────────────────────────────────────────

export type RiskLevel = 'critical' | 'high' | 'medium' | 'low'

// ─── Guide layout variants ────────────────────────────────────────────────────

export type GuideLayout = 'checklist' | 'checklist-tabbed'

// ─── Guide status ─────────────────────────────────────────────────────────────

export type GuideStatus = 'published' | 'coming-soon'

// ─── Shared building blocks ───────────────────────────────────────────────────

export interface Step {
  text: string
}

export interface ContextBox {
  title: string
  body: string
  /** Optional second paragraph */
  body2?: string
}

export interface WarningBox {
  body: string
}

// ─── Guide layout: expandable card ───────────────────────────────────────────

export interface Setting {
  id: string
  name: string
  /** Formatted as "Settings → Section → Sub" */
  path: string
  risk: RiskLevel
  why: string
  steps: Step[]
  /** Optional extra note rendered below steps */
  note?: string
}

export interface GuideMeta {
  reviewed?: string
  timeMinutes?: number
  platforms?: string[]
  topics?: number
}

// ─── Checklist layout: single tab ─────────────────────────────────────────────

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
  /** Risk level used to colour the section dot */
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

// ─── Checklist layout: tabbed (multiple guides in one) ───────────────────────

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

// ─── Union of all guide types ─────────────────────────────────────────────────

export type AnyGuide = ChecklistGuide | ChecklistTabbedGuide

// ─── Guides index ─────────────────────────────────────────────────────────────

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
