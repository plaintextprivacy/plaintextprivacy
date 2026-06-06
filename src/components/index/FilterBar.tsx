interface FilterBarProps {
  categories: string[]
  active: string
  onChange: (cat: string) => void
}

export const FilterBar = ({ categories, active, onChange }: FilterBarProps) => (
  <div className='flex gap-2 pb-1'>
    {['all', ...categories].map((cat) => (
      <button
        key={cat}
        onClick={() => onChange(cat)}
        className={[
          'shrink-0 rounded-full border px-3.5 py-1.5 text-label transition-all',
          active === cat
            ? 'border-accent bg-accent text-black'
            : 'border-border-default bg-transparent text-text-secondary hover:border-accent hover:text-accent'
        ].join(' ')}
      >
        {cat === 'all' ? 'All guides' : cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    ))}
  </div>
)
