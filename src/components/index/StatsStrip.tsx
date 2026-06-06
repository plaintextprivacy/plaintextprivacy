interface Stat {
  value: string | number
  label: string
  accent?: boolean
}

interface StatsStripProps {
  published: number
  total: number
  totalMinutes: number
  criticalCount: number
}

const formatTime = (minutes: number): string => {
  if (minutes === 0) return '—'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h === 0) return `~${m}m`
  if (m === 0) return `~${h}h`
  return `~${h}h ${m}m`
}

export const StatsStrip = ({ published, total, totalMinutes, criticalCount }: StatsStripProps) => {
  const inProgress = total - published

  const stats: Stat[] = [
    { value: published, label: 'Guides published', accent: true },
    { value: inProgress, label: 'In progress' },
    { value: criticalCount, label: 'Critical priority guides' },
    { value: formatTime(totalMinutes), label: 'To complete all published' }
  ]

  return (
    <div className='mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4'>
      {stats.map(({ value, label, accent }) => (
        <div
          key={label}
          className='rounded-lg border border-default bg-bg-secondary px-4 py-3.5 text-center'
        >
          <p
            className={`text-heading-lg font-medium ${accent ? 'text-risk-low' : 'text-text-primary'}`}
          >
            {value}
          </p>
          <p className='mt-0.5 text-caption text-text-secondary'>{label}</p>
        </div>
      ))}
    </div>
  )
}
