import { PageLayout } from '@/components/layout/PageLayout'
import { FilterBar } from '@/components/index/FilterBar'
import { SearchInput } from '@/components/index/SearchInput'
import { StatsStrip } from '@/components/index/StatsStrip'
import { CategorySection } from '@/components/index/CategorySection'
import { EmptyState } from '@/components/index/EmptyState'
import { useGuideSearch } from '@/components/index/useGuideSearch'
import indexData from '@/data/index.json'
import type { GuidesIndex } from '@/types/guide'
import { PageHeader } from '@/components/layout/PageHeader'

const { categories } = indexData as GuidesIndex

const categoryIds = categories.map(({ id }) => id)

export const GuidesIndexPage = () => {
  const {
    query,
    setQuery,
    activeCategory,
    setCategory,
    grouped,
    publishedCount,
    totalCount,
    criticalCount,
    totalMinutes,
    hasResults
  } = useGuideSearch(categories)

  return (
    <PageLayout>
      <PageHeader
        eyebrow='All guides'
        title='Digital privacy & security guides'
        description="In-depth guides for taking back control of your digital life. Every guide includes step-by-step
            instructions and a risk rating for each setting. It's not necessary to complete every single guide or action
            item to get some benefit."
      >
        <div className='overflow-x-auto -mx-6 px-6'>
          <FilterBar
            categories={categoryIds}
            active={activeCategory}
            onChange={(cat) => {
              setCategory(cat)
              if (query) setQuery('')
            }}
          />
        </div>
      </PageHeader>

      <main className='mx-auto max-w-5xl px-6 py-8'>
        <StatsStrip
          published={publishedCount}
          total={totalCount}
          totalMinutes={totalMinutes}
          criticalCount={criticalCount}
        />

        <SearchInput value={query} onChange={setQuery} />

        {hasResults ? (
          grouped.map((category) => <CategorySection key={category.id} category={category} />)
        ) : (
          <EmptyState query={query} onClear={() => setQuery('')} />
        )}
      </main>
    </PageLayout>
  )
}
