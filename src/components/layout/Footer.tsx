import { Link } from 'react-router-dom'
import { FEATURED_SLUGS } from '@/lib/featuredSlugs.tsx'
import type { GuidesIndex } from '@/types/guide.ts'
import indexData from '@/data/index.json'

const { categories } = indexData as GuidesIndex
const allGuides = categories.flatMap(({ guides }) => guides)

const topGuideLinks = FEATURED_SLUGS.map((slug) => allGuides.find((g) => g.slug === slug))
  .filter((g) => g !== undefined)
  .map((g) => ({ label: g!.title, href: `/guides/${g!.slug}` }))

const navColumns = [
  {
    label: 'Navigation',
    links: [
      { label: 'Home', href: '/' },
      { label: 'All guides', href: '/guides' },
      { label: 'Risk assessment', href: '/risk-profile' },
      { label: 'About', href: '/about' },
      {
        label: 'Github',
        href: 'https://github.com/plaintextprivacy/plaintextprivacy'
      }
    ]
  },
  {
    label: 'Top guides',
    links: topGuideLinks
  },
  {
    label: 'External resources',
    links: [
      { label: 'Electronic Frontier Foundation', href: 'https://eff.org' },
      { label: 'Privacy Guides', href: 'https://privacyguides.org' },
      { label: 'EFF Security Starter Pack', href: 'https://ssd.eff.org' },
      { label: 'Have I Been Pwned', href: 'https://haveibeenpwned.com' },
      { label: 'IntelTechniques', href: 'https://inteltechniques.com' },
      {
        label: "Hitchhiker's Guide to Anonymity",
        href: 'https://anonymousplanet.org'
      }
    ]
  }
]

export const Footer = () => (
  <footer className='border-t border-default px-6 py-12'>
    <div className='mx-auto max-w-5xl'>
      <div className='mb-8 flex items-center gap-2'>
        <span className='text-body-lg font-medium text-text-primary'>Plaintext</span>
        <span className='text-body-lg font-medium text-text-accent'>Privacy</span>
        <span className='ml-1 text-body-md text-text-tertiary'>
          / take back control of your privacy
        </span>
      </div>

      <div className='mb-8 grid grid-cols-2 gap-8 sm:grid-cols-3'>
        {navColumns.map(({ label, links }) => (
          <div key={label}>
            <p className='mb-3 text-caption font-medium uppercase tracking-widest text-text-elevated'>
              {label}
            </p>
            <ul className='flex flex-col gap-2'>
              {links.map(({ label: linkLabel, href }) => {
                const isExternal = href.startsWith('http')
                return (
                  <li key={href}>
                    {isExternal ? (
                      <a
                        href={href}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-body text-text-secondary transition-colors hover:text-text-primary'
                      >
                        {linkLabel}
                      </a>
                    ) : (
                      <Link
                        to={href}
                        className='text-body text-text-secondary transition-colors hover:text-text-primary'
                      >
                        {linkLabel}
                      </Link>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className='border-t border-default pt-6 flex flex-wrap items-start justify-between gap-4'>
        <p className='text-label leading-relaxed text-text-tertiary'>
          We provide information and resources, not legal advice. Be sure to research any privacy or
          security measures you implement. Don't just take an internet stranger's word for it!
        </p>
        <Link
          to='/privacy'
          className='shrink-0 text-label text-text-tertiary transition-colors hover:text-accent'
        >
          Privacy policy
        </Link>
      </div>
    </div>
  </footer>
)
