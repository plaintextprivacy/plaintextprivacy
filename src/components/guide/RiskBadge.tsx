import type { RiskLevel } from '@/types/guide'

interface RiskBadgeProps {
  risk: RiskLevel
}

const config: Record<RiskLevel, { label: string; classes: string }> = {
  critical: { label: 'Critical', classes: 'bg-[#3d1515] text-risk-critical' },
  high: { label: 'High', classes: 'bg-[#3d2010] text-risk-high' },
  medium: { label: 'Medium', classes: 'bg-accent-muted text-risk-medium' },
  low: { label: 'Low', classes: 'bg-[#0f2e1a] text-risk-low' }
}

export const RiskBadge = ({ risk }: RiskBadgeProps) => {
  const { label, classes } = config[risk]
  return (
    <span
      className={`min-w-[56px] rounded text-center text-caption font-medium px-2 py-[3px] ${classes}`}
    >
      {label}
    </span>
  )
}
