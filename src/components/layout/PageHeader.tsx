import type { ReactNode } from 'react'

interface PageHeaderProps {
  /** Small uppercase label above the title e.g. "All guides" */
  eyebrow: string
  title: string
  description: string | ReactNode
  /** Optional content rendered below the description e.g. FilterBar */
  children?: ReactNode
}

export const PageHeader = ({ eyebrow, title, description, children }: PageHeaderProps) => (
  <div className='border-b border-default px-6 pb-7 pt-10'>
    <div className='mx-auto max-w-5xl'>
      <p className='mb-2.5 text-caption font-medium uppercase tracking-widest text-accent'>
        {eyebrow}
      </p>
      <h1 className='mb-3 text-title-md font-medium text-text-primary'>{title}</h1>
      <div className='text-body-md leading-relaxed text-text-secondary'>
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>
      {children && <div className='mt-6'>{children}</div>}
    </div>
  </div>
)
