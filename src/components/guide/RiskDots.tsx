import type { RiskLevel } from '@/types/guide'

interface RiskDotsProps {
  risk: RiskLevel
}

const filledCount: Record<RiskLevel, number> = {
  critical: 5,
  high: 4,
  medium: 3,
  low: 2
}

const dotColor: Record<RiskLevel, string> = {
  critical: 'var(--color-risk-critical)',
  high: 'var(--color-risk-high)',
  medium: 'var(--color-risk-medium)',
  low: 'var(--color-risk-low)'
}

export const RiskDots = ({ risk }: RiskDotsProps) => {
  const filled = filledCount[risk]
  const color = dotColor[risk]

  return (
    <div className='flex justify-center gap-[3px]' aria-hidden='true'>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className='h-[7px] w-[7px] rounded-full'
          style={{
            background: i < filled ? color : 'var(--color-bg-elevated)'
          }}
        />
      ))}
    </div>
  )
}
