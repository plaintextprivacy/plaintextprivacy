import { Link } from 'react-router-dom'
import type { RiskLevel } from '@/types/guide'

interface SidebarLink {
  id: string
  label: string
  risk: RiskLevel
}

interface RelatedLink {
  label: string
  href: string
}

interface SidebarProps {
  links: SidebarLink[]
  activeId: string
  relatedLinks: RelatedLink[]
  onLinkClick: (id: string) => void
}

const riskDotClass: Record<RiskLevel, string> = {
  critical: 'bg-risk-critical',
  high: 'bg-risk-high',
  medium: 'bg-risk-medium',
  low: 'bg-risk-low'
}

export const Sidebar = ({ links, activeId, relatedLinks, onLinkClick }: SidebarProps) => (
  <aside className='hidden lg:block w-[220px] shrink-0 border-r border-default bg-bg-secondary self-start sticky top-12'>
    <nav aria-label='On this guide' className='py-5 pl-2 max-h-[calc(100vh-48px)] overflow-y-auto'>
      <div className='mb-6'>
        <p className='mb-2 px-4 text-caption font-medium uppercase tracking-widest text-text-primary'>
          On this guide
        </p>
        {links.map(({ id, label, risk }) => (
          <button
            key={id}
            onClick={() => onLinkClick(id)}
            aria-label={`Go to section: ${label}`}
            className={[
              'flex w-full items-center gap-2 border-l-2 px-4 py-[7px] text-left text-body transition-all',
              activeId === id
                ? 'border-accent bg-bg-tertiary text-accent'
                : 'border-transparent text-text-secondary hover:bg-bg-tertiary hover:text-text-primary'
            ].join(' ')}
          >
            <span className={`h-[6px] w-[6px] shrink-0 rounded-full ${riskDotClass[risk]}`} />
            {label}
          </button>
        ))}
      </div>

      {relatedLinks.length > 0 && (
        <div>
          <p className='mb-2 px-4 text-caption font-medium uppercase tracking-widest text-text-primary'>
            Related guides
          </p>
          {relatedLinks.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              className='block border-l-2 border-transparent px-4 py-[7px] text-body text-text-secondary transition-all hover:bg-bg-tertiary hover:text-text-primary'
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  </aside>
)
