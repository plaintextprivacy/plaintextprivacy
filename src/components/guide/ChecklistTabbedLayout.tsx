// TODO no guides use this layout

import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { ChecklistTabbedGuide, ChecklistTab } from '@/types/guide'
import { ProgressBar } from './ProgressBar'
import { ContextBox } from './ContextBox'
import { formatDuration } from '@/lib/iconMap'
import { ChecklistItem } from './ChecklistItem'
import { useTabbedProgress } from './useProgress'

interface ChecklistTabbedLayoutProps {
  guide: ChecklistTabbedGuide
}

// per-tab checked state: tabId → set of item ids
const sectionRiskColor: Record<string, string> = {
  critical: 'text-risk-critical',
  high: 'text-risk-high',
  medium: 'text-accent',
  low: 'text-risk-low'
}

const TabPanel = ({
  tab,
  checkedIds,
  isChecked,
  onCheck
}: {
  tab: ChecklistTab
  checkedIds: Set<string>
  isChecked: (id: string) => boolean
  onCheck: (id: string, checked: boolean) => void
}) => {
  const total = tab.sections.flatMap(({ items }) => items).length

  return (
    <div className='mx-auto w-full max-w-6xl px-4 sm:px-6 pb-16 pt-7'>
      <div className='mx-auto max-w-[700px]'>
        {/* Tab header */}
        <div className='mb-7 border-b border-default pb-5'>
          <h2 className='mb-2 text-heading-lg font-medium text-text-primary'>{tab.title}</h2>
          <p className='mb-3 text-body leading-relaxed text-text-secondary'>{tab.subtitle}</p>
          <div className='flex flex-wrap items-center gap-x-2 gap-y-1 text-micro text-text-primary'>
            {/* TODO add pdf download */}
            {tab.meta.timeMinutes && <span>{formatDuration(tab.meta.timeMinutes)}</span>}
            {total > 0 && (
              <>
                <span aria-hidden='true'>·</span>
                <span>{total} items</span>
              </>
            )}
            {tab.meta.updated && (
              <>
                <span aria-hidden='true'>·</span>
                <span>Last updated: {tab.meta.updated}</span>
              </>
            )}
            {tab.meta.platforms?.map((p) => (
              <span key={p} className='flex items-center gap-2'>
                <span aria-hidden='true'>·</span>
                <span>{p}</span>
              </span>
            ))}
          </div>
        </div>

        <ProgressBar completed={checkedIds.size} total={total} />

        {tab.context && (
          <ContextBox title={tab.context.title} body={tab.context.body} body2={tab.context.body2} />
        )}
        {tab.warning && <ContextBox title='Important' body={tab.warning.body} variant='warning' />}

        {tab.sections.map(({ id, label, risk, items }) => (
          <section key={id} className='mb-7'>
            <div className='mb-2.5 flex items-center gap-2'>
              <span className={`text-body ${sectionRiskColor[risk]}`}>●</span>
              <h3 className='text-body font-medium uppercase tracking-wide text-text-secondary'>
                {label}
              </h3>
              <div className='h-px flex-1 bg-border-default' />
            </div>

            {items.map((item) => (
              <ChecklistItem
                key={item.id}
                item={item}
                initialChecked={isChecked(item.id)}
                onChange={(checked) => onCheck(item.id, checked)}
              />
            ))}
          </section>
        ))}
      </div>
    </div>
  )
}

export const ChecklistTabbedLayout = ({ guide }: ChecklistTabbedLayoutProps) => {
  const [activeTabId, setActiveTabId] = useState(guide.tabs[0]?.id ?? '')

  const { getCheckedIds, isChecked, setChecked } = useTabbedProgress(guide.slug)

  const handleCheck = (tabId: string, itemId: string, checked: boolean) => {
    setChecked(tabId, itemId, checked)
  }

  const getTotal = (tab: ChecklistTab) => tab.sections.flatMap(({ items }) => items).length

  const activeTab = guide.tabs.find(({ id }) => id === activeTabId) ?? guide.tabs[0]

  return (
    <div className='min-h-[calc(100vh-48px)]'>
      {/* Back link */}
      <div className='border-b border-default bg-bg-secondary px-4 sm:px-6 pt-4 pb-0'>
        <div className='mx-auto max-w-6xl'>
          <Link
            to='/guides'
            className='mb-3 inline-flex items-center gap-1 text-micro text-text-secondary hover:text-accent transition-colors'
          >
            ← All guides
          </Link>

          {/* tab bar */}
          <div className='flex gap-0 overflow-x-auto'>
            {guide.tabs.map((tab) => {
              const done = getCheckedIds(tab.id).size
              const total = getTotal(tab)
              const isActive = tab.id === activeTabId
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabId(tab.id)}
                  className={[
                    'flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-body transition-all',
                    isActive
                      ? 'border-accent text-accent'
                      : 'border-transparent text-text-secondary hover:text-text-primary'
                  ].join(' ')}
                >
                  <span>{tab.icon}</span>
                  <span className='hidden sm:inline'>{tab.label}</span>
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-micro ${
                      isActive ? 'bg-accent-muted text-accent' : 'bg-bg-tertiary text-text-tertiary'
                    }`}
                  >
                    {done}/{total}
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* active tab content */}
      {activeTab && (
        <TabPanel
          tab={activeTab}
          checkedIds={getCheckedIds(activeTab.id)}
          isChecked={(id) => isChecked(activeTab.id, id)}
          onCheck={(itemId, checked) => handleCheck(activeTab.id, itemId, checked)}
        />
      )}
    </div>
  )
}
