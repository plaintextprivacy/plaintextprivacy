interface ContextBoxProps {
  title: string
  body: string
  body2?: string
  variant?: 'info' | 'warning'
}

const variantStyles = {
  info: 'border-l-[var(--color-info)] bg-[var(--color-info-bg)] text-[#7ec8f8]',
  warning: 'border-l-[var(--color-warn)] bg-[var(--color-warn-bg)] text-[#c8905a]'
} as const

const titleStyles = {
  info: 'text-[var(--color-info)]',
  warning: 'text-[var(--color-warn)]'
} as const

export const ContextBox = ({ title, body, body2, variant = 'info' }: ContextBoxProps) => (
  <div
    className={`mb-7 rounded-lg border border-border-default border-l-[3px] p-4 text-body leading-relaxed ${variantStyles[variant]}`}
  >
    <p className={`mb-2 text-body font-medium ${titleStyles[variant]}`}>{title}</p>
    <p style={{ whiteSpace: 'pre-wrap' }}>{body}</p>
    {body2 && <p className='mt-2'>{body2}</p>}
  </div>
)
