import { Link } from 'react-router-dom'

interface TldrAction {
  text: string
  href: string
}

const actions: TldrAction[] = [
  {
    text: 'Switch to a privacy-focused browser and search engine',
    href: '/guides/browsers'
  },
  {
    text: 'Use a password manager with a unique password for every account',
    href: '/guides/passwords-mfa'
  },
  {
    text: 'Enable MFA on everything, especially for important accounts',
    href: '/guides/passwords-mfa'
  },
  {
    text: 'Audit and restrict app permissions on your phone',
    href: '/guides/iphone'
  },
  {
    text: 'Remove your data from data broker databases',
    href: '/guides/data-brokers'
  },
  {
    text: 'Reject non-essential cookies on websites you visit',
    href: '/guides/browsers'
  }
]

export const TldrStrip = () => (
  <section className='px-6 py-6'>
    <div className='mx-auto max-w-5xl'>
      <div className='mb-5 flex items-center gap-3'>
        <h2 className='text-body-lg font-medium uppercase tracking-widest text-accent'>TL;DR</h2>
        <div className='h-px flex-1 bg-border-default' />
      </div>

      <div className='grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3'>
        {actions.map(({ text, href }) => (
          <Link
            key={text}
            to={href}
            className='flex items-start gap-2.5 rounded-lg border border-default bg-bg-secondary px-3.5 py-3 text-body-lg leading-relaxed text-text-secondary transition-colors hover:border-accent hover:text-text-primary'
          >
            <span className='shrink-0 text-accent'>›</span>
            {text}
          </Link>
        ))}
      </div>
    </div>
  </section>
)
