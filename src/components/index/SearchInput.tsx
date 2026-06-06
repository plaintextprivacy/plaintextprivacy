import { Search, X } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => (
  <div className='relative mb-7'>
    <Search
      size={14}
      className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary'
    />
    <input
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder='Search guides...'
      className='w-full rounded-lg border border-default bg-bg-secondary py-2.5 pl-9 pr-9 text-body text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none transition-colors'
    />
    {value && (
      <button
        onClick={() => onChange('')}
        className='absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors'
        aria-label='Clear search'
      >
        <X size={14} />
      </button>
    )}
  </div>
)
