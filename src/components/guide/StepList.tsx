import type { Step } from '@/types/guide'

interface StepListProps {
  steps: Step[]
}

/**
 * parses step text and converts backtick-wrapped tokens into <code> elements.
 * e.g. 'Open `Settings → Privacy`' → 'Open ' + <code>Settings → Privacy</code>
 */
const parseStepText = (text: string): React.ReactNode[] => {
  const parts = text.split(/(`[^`]+`)/g)
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return <code key={i}>{part.slice(1, -1)}</code>
    }
    return part
  })
}

export const StepList = ({ steps }: StepListProps) => (
  <ol className='flex flex-col gap-1.5'>
    {steps.map(({ text }, i) => (
      <li key={i} className='flex items-start gap-2.5 text-body leading-relaxed text-text-primary'>
        <span className='mt-[3px] flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-accent text-tiny font-medium text-black'>
          {i + 1}
        </span>
        <span className='min-w-0 break-words'>{parseStepText(text)}</span>
      </li>
    ))}
  </ol>
)
