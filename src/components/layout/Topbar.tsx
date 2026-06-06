import { useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Search, X, Menu } from 'lucide-react'
import { useTopbarSearch } from './useTopbarSearch'
import type { TopbarSearchResult } from './useTopbarSearch'
import { getIcon } from '@/lib/iconMap'

// ─── Nav links ────────────────────────────────────────────────────────────────

const navLinks = [
  { label: 'Guides', href: '/guides' },
  { label: 'Risk Profile', href: '/risk-profile' },
  { label: 'Get Help', href: '/help' },
  { label: 'Resources', href: '/resources' },
  { label: 'About', href: '/about' }
] as const

// ─── Single search result row ─────────────────────────────────────────────────

interface ResultRowProps {
  result: TopbarSearchResult
  isActive: boolean
  id: string
  onClick: () => void
}

const ResultRow = ({ result, isActive, id, onClick }: ResultRowProps) => (
  <Link
    id={id}
    to={`/guides/${result.slug}`}
    onClick={onClick}
    role='option'
    aria-selected={isActive}
    className={`flex items-start gap-3 px-3 py-2.5 transition-colors ${
      isActive ? 'bg-bg-tertiary' : 'hover:bg-bg-tertiary'
    }`}
  >
    <span className='mt-px flex h-5 w-5 items-center justify-center text-accent' aria-hidden='true'>
      {getIcon(result.icon, { size: 14 })}
    </span>
    <div className='min-w-0 flex-1'>
      <p className='truncate text-body font-medium text-text-primary'>{result.title}</p>
      <p className='truncate text-caption text-text-tertiary'>{result.categoryLabel}</p>
    </div>
  </Link>
)

// ─── Search bar + dropdown ────────────────────────────────────────────────────

interface TopbarSearchProps {
  fullWidth?: boolean
}

const TopbarSearch = ({ fullWidth = false }: TopbarSearchProps) => {
  const navigate = useNavigate()
  const [activeIdx, setActiveIdx] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const { query, setQuery, results, open, containerRef, handleClear, handleResultClick } =
    useTopbarSearch()

  const listboxId = 'topbar-search-listbox'
  const getOptionId = (i: number) => `topbar-search-option-${i}`

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setActiveIdx(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      handleClear()
      setActiveIdx(-1)
      return
    }
    if (e.key === 'ArrowDown' && open && results.length > 0) {
      e.preventDefault()
      setActiveIdx((prev) => Math.min(prev + 1, results.length - 1))
      return
    }
    if (e.key === 'ArrowUp' && open && results.length > 0) {
      e.preventDefault()
      setActiveIdx((prev) => Math.max(prev - 1, -1))
      return
    }
    if (e.key === 'Enter') {
      if (activeIdx >= 0 && results[activeIdx]) {
        navigate(`/guides/${results[activeIdx].slug}`)
        handleResultClick()
        setActiveIdx(-1)
      } else if (results.length > 0) {
        navigate(`/guides/${results[0].slug}`)
        handleResultClick()
        setActiveIdx(-1)
      } else if (query.trim().length >= 2) {
        navigate('/guides')
        handleClear()
      }
    }
  }

  return (
    <div ref={containerRef} className={`relative ${fullWidth ? 'w-full' : ''}`}>
      <div className='relative flex items-center'>
        <Search
          size={13}
          className='pointer-events-none absolute left-2.5 text-text-tertiary'
          aria-hidden='true'
        />
        <input
          ref={inputRef}
          type='text'
          role='combobox'
          aria-label='Search guides'
          aria-expanded={open}
          aria-autocomplete='list'
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={activeIdx >= 0 ? getOptionId(activeIdx) : undefined}
          value={query}
          onChange={handleQueryChange}
          onKeyDown={handleKeyDown}
          placeholder='Search guides...'
          className={[
            'h-9 rounded-md border border-default bg-bg-tertiary pl-7 pr-7',
            'text-label text-text-primary placeholder:text-text-tertiary',
            'focus:border-accent focus:outline-none transition-all duration-200',
            fullWidth ? 'w-full' : 'w-44 focus:w-56'
          ].join(' ')}
        />
        {query && (
          <button
            onClick={() => {
              handleClear()
              setActiveIdx(-1)
            }}
            aria-label='Clear search'
            className='absolute right-2 text-text-tertiary transition-colors hover:text-text-primary'
          >
            <X size={11} />
          </button>
        )}
      </div>

      {open && (
        <div
          className={[
            'absolute top-full z-50 mt-1.5 overflow-hidden',
            'rounded-lg border border-default bg-bg-secondary shadow-lg',
            fullWidth ? 'left-0 right-0 w-full' : 'right-0 w-72'
          ].join(' ')}
        >
          {results.length > 0 ? (
            <>
              <div
                id={listboxId}
                role='listbox'
                aria-label='Search results'
                className='divide-y divide-border-default'
              >
                {results.map((result, i) => (
                  <ResultRow
                    key={result.slug}
                    id={getOptionId(i)}
                    result={result}
                    isActive={i === activeIdx}
                    onClick={() => {
                      handleResultClick()
                      setActiveIdx(-1)
                    }}
                  />
                ))}
              </div>
              <div className='border-t border-default px-3 py-2'>
                <Link
                  to='/guides'
                  onClick={() => {
                    handleResultClick()
                    setActiveIdx(-1)
                  }}
                  className='text-caption text-text-tertiary transition-colors hover:text-accent'
                >
                  Browse all guides →
                </Link>
              </div>
            </>
          ) : (
            <div className='px-4 py-5 text-center' role='status'>
              <p className='text-body text-text-secondary'>
                No guides found for &ldquo;{query}&rdquo;
              </p>
              <p className='mt-1 text-caption text-text-tertiary'>Try a different keyword</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─── Topbar ───────────────────────────────────────────────────────────────────

export const Topbar = () => {
  const { pathname } = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className='sticky top-0 z-50 border-b border-default bg-[#09090b]'>
      <div className='mx-auto flex h-12 max-w-7xl items-center gap-3 px-6'>
        <Link to='/' aria-label='Plaintext Privacy — home' className='flex items-center gap-2'>
          <span className='text-label text-title-sm font-medium text-text-primary'>Plaintext</span>
          <span className='text-label text-title-sm font-medium text-text-elevated'>Privacy</span>
        </Link>

        {/* Desktop nav + search */}
        <nav className='ml-auto hidden sm:flex items-center gap-5' aria-label='Main navigation'>
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              to={href}
              aria-current={pathname.startsWith(href) ? 'page' : undefined}
              className={[
                'text-body-md transition-colors',
                pathname.startsWith(href)
                  ? 'text-accent'
                  : 'text-text-secondary hover:text-text-primary'
              ].join(' ')}
            >
              {label}
            </Link>
          ))}
          <TopbarSearch />
        </nav>

        {/* mobile hamburger */}
        <div className='ml-auto flex items-center sm:hidden'>
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className='text-text-secondary hover:text-text-primary transition-colors'
          >
            {mobileMenuOpen ? <X size={27} /> : <Menu size={27} />}
          </button>
        </div>
      </div>

      {/* mobile nav drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label='Main navigation'
          className='sm:hidden border-t border-default bg-[#09090b] px-6 py-4'
        >
          <div className='mb-4'>
            <TopbarSearch fullWidth />
          </div>
          <ul className='flex flex-col gap-4'>
            {navLinks.map(({ label, href }) => (
              <li key={href}>
                <Link
                  to={href}
                  aria-current={pathname.startsWith(href) ? 'page' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                  className={[
                    'text-label transition-colors',
                    pathname.startsWith(href)
                      ? 'text-accent'
                      : 'text-text-secondary hover:text-text-primary'
                  ].join(' ')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
