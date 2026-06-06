import { SearchX } from 'lucide-react'

interface EmptyStateProps {
  query: string
  onClear: () => void
}

export const EmptyState = ({ query, onClear }: EmptyStateProps) => (
  <div className='flex flex-col items-center gap-3 py-16 text-center'>
    <SearchX size={32} className='text-text-tertiary' strokeWidth={1.5} />
    <p className='text-body-lg font-medium text-text-primary'>
      No guides found for &ldquo;{query}&rdquo;
    </p>
    <p className='max-w-xs text-body-md leading-relaxed text-text-secondary'>
      Try a different search term - or browse by category using the filters above.
    </p>
    <button
      onClick={onClear}
      className='mt-1 rounded-full border border-border-default px-4 py-1.5 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent'
    >
      Clear search
    </button>
  </div>
)
