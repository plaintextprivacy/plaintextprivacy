import { Check, X } from 'lucide-react'
import type { ComparisonTable as ComparisonTableType } from '@/types/guide'

interface ComparisonTableProps {
  table: ComparisonTableType
}

const renderCellValue = (value: string) => {
  const normalized = value.trim().toLowerCase()
  if (normalized === 'yes') {
    return <Check size={14} className='text-risk-low' aria-label='Yes' />
  }
  if (normalized === 'no') {
    return <X size={14} className='text-text-tertiary' aria-label='No' />
  }
  return <span>{value}</span>
}

export const ComparisonTable = ({ table }: ComparisonTableProps) => {
  const { title, note, columns, rows } = table

  if (columns.length > 4 && import.meta.env.DEV) {
    console.warn(
      `ComparisonTable: "${title ?? 'untitled table'}" has ${columns.length} columns - this component is designed for a maximum of 4. Consider splitting into two tables or trimming columns.`
    )
  }

  return (
    <div className='mb-8'>
      {title && <h2 className='mb-3 text-heading-sm font-medium text-text-primary'>{title}</h2>}

      {/* mobile: side-scroll wrapper */}
      <div className='overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0'>
        <table className='w-full min-w-[560px] border-collapse text-label'>
          <thead>
            <tr>
              <th className='w-40 shrink-0 border-b border-border-default pb-3 pr-3 text-left text-caption font-medium uppercase tracking-wide text-text-tertiary'>
                {/* empty corner cell above the row labels */}
              </th>
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={[
                    'shrink-0 border-b pb-3 px-3 text-left align-bottom',
                    col.recommended ? 'border-accent' : 'border-border-default'
                  ].join(' ')}
                >
                  {col.url ? (
                    <a
                      href={col.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='font-medium text-text-primary underline decoration-dotted underline-offset-2 hover:text-accent'
                    >
                      {col.label}
                    </a>
                  ) : (
                    <span className='font-medium text-text-primary'>{col.label}</span>
                  )}
                  {col.recommended && (
                    <span className='mt-1 block text-caption font-medium text-accent'>
                      Recommended
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className='border-b border-border-subtle'>
                <td className='py-2.5 pr-3 text-text-secondary'>{row.label}</td>
                {columns.map((col) => (
                  <td key={col.id} className='py-2.5 px-3 text-text-primary'>
                    {renderCellValue(row.values[col.id] ?? '—')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note && <p className='mt-3 text-caption text-text-tertiary'>{note}</p>}
    </div>
  )
}
