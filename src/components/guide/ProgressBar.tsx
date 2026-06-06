interface ProgressBarProps {
  completed: number
  total: number
}

export const ProgressBar = ({ completed, total }: ProgressBarProps) => {
  const pct = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className='mb-7'>
      <div className='mb-1.5 flex justify-between text-sm text-text-secondary'>
        <span id='progress-label'>Progress</span>
        <span aria-live='polite' aria-atomic='true'>
          {completed} of {total} complete
        </span>
      </div>
      <div
        role='progressbar'
        aria-valuenow={completed}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-labelledby='progress-label'
        aria-valuetext={`${completed} of ${total} items complete`}
        className='h-[5px] overflow-hidden rounded-full bg-bg-tertiary'
      >
        <div
          className='h-full rounded-full transition-all duration-300'
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, var(--color-accent), var(--color-teal))'
          }}
        />
      </div>
    </div>
  )
}
