import { useState } from 'react'
import { Check } from 'lucide-react'
import type { ChecklistItem as ChecklistItemType } from '@/types/guide'
import { RiskBadge } from './RiskBadge'
import { RiskDots } from './RiskDots'
import { StepList } from './StepList'

interface ChecklistItemProps {
  item: ChecklistItemType
  initialChecked?: boolean
  onChange?: (checked: boolean) => void
}

export const ChecklistItem = ({ item, initialChecked = false, onChange }: ChecklistItemProps) => {
  const [open, setOpen] = useState(false)
  const [checked, setChecked] = useState(initialChecked)

  const { name, path, risk, why, steps, note, sources } = item
  const itemId = `checklist-item-${item.id}`

  const handleToggleOpen = () => setOpen((prev) => !prev)

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.checked
    setChecked(next)
    onChange?.(next)
  }

  // allow Space/Enter on the label to check without opening the drawer
  const handleLabelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const next = !checked
      setChecked(next)
      onChange?.(next)
    }
  }

  return (
    <div
      className={`overflow-hidden rounded-[9px] border transition-colors mb-2 ${
        checked ? 'border-[#1a3a1a] bg-[#0a1a0a]' : 'border-border-default bg-bg-secondary'
      }`}
    >
      <div className='flex w-full items-start gap-3 p-3 sm:p-[13px]'>
        <div className='relative mt-[1px] flex h-[18px] w-[18px] shrink-0 items-center justify-center'>
          <input
            type='checkbox'
            id={itemId}
            checked={checked}
            onChange={handleCheck}
            onKeyDown={handleLabelKeyDown}
            aria-label={`Mark '${name}' as complete`}
            className='absolute inset-0 h-full w-full cursor-pointer opacity-0 z-10'
          />
          <span
            aria-hidden='true'
            className={`flex h-[18px] w-[18px] items-center justify-center rounded border-[1.5px] transition-all pointer-events-none ${
              checked ? 'border-risk-low bg-risk-low' : 'border-border-strong bg-transparent'
            }`}
          >
            {checked && <Check size={10} className='text-[#0a1a0a]' strokeWidth={3} />}
          </span>
        </div>

        <button
          onClick={handleToggleOpen}
          aria-expanded={open}
          aria-controls={`checklist-panel-${item.id}`}
          className='flex flex-1 min-w-0 items-start gap-3 text-left'
        >
          <div className='flex-1 min-w-0'>
            <p
              className={`text-body font-medium leading-snug transition-colors ${
                checked ? 'text-risk-low' : 'text-text-primary'
              }`}
            >
              {name}
            </p>
            <p className='mt-0.5 font-mono text-caption text-text-tertiary break-words'>{path}</p>
            {!open && <p className='mt-0.5 text-caption text-text-tertiary'>Tap to expand steps</p>}
          </div>

          <div className='flex shrink-0 flex-col items-center gap-1.5'>
            <RiskBadge risk={risk} />
            <RiskDots risk={risk} />
          </div>
        </button>
      </div>

      {open && (
        <div
          id={`checklist-panel-${item.id}`}
          className='border-t border-border-default pb-3.5 pl-3 pr-3 sm:pl-[45px] sm:pr-4'
        >
          <div className='mt-3'>
            <h5 className='mb-1.5 text-caption font-medium uppercase tracking-widest text-text-primary'>
              Why it matters
            </h5>
            <p className='text-label leading-relaxed text-text-secondary'>{why}</p>
          </div>

          <div className='mt-2.5'>
            <h5 className='mb-1.5 text-caption font-medium uppercase tracking-widest text-text-primary'>
              Steps
            </h5>
            <StepList steps={steps} />
          </div>

          {note && (
            <p className='mt-3 rounded-md bg-bg-elevated px-3 py-2 text-label leading-relaxed text-text-secondary'>
              {note}
            </p>
          )}

          {sources && sources.length > 0 && (
            <div className='mt-3 flex flex-wrap gap-x-3 gap-y-1'>
              {sources.map(({ label, url }) => (
                <a
                  key={url}
                  href={url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-1 text-caption text-text-tertiary underline decoration-dotted underline-offset-2 transition-colors hover:text-accent'
                >
                  ↗ {label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
