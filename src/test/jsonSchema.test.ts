import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const guidesDir = join(__dirname, '../../src/data/guides')

const guideFiles = readdirSync(guidesDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => ({
    file: f,
    slug: f.replace('.json', ''),
    data: JSON.parse(readFileSync(join(guidesDir, f), 'utf-8'))
  }))

const validRisk = new Set(['critical', 'high', 'medium', 'low'])

const validLayouts = new Set(['checklist'])

const validateItem = (item: Record<string, unknown>, path: string) => {
  expect(typeof item.id, `${path}.id`).toBe('string')
  expect(typeof item.name, `${path}.name`).toBe('string')
  expect(typeof item.path, `${path}.path`).toBe('string')
  expect(typeof item.why, `${path}.why`).toBe('string')
  expect(validRisk.has(item.risk as string), `${path}.risk="${item.risk}" is invalid`).toBe(true)
  expect(Array.isArray(item.steps), `${path}.steps must be array`).toBe(true)
  ;(item.steps as Array<{ text: string }>).forEach((s, i) => {
    expect(typeof s.text, `${path}.steps[${i}].text`).toBe('string')
  })
  if (item.sources !== undefined) {
    expect(Array.isArray(item.sources), `${path}.sources must be array`).toBe(true)
    ;(item.sources as Array<{ label: string; url: string }>).forEach((src, i) => {
      expect(typeof src.label, `${path}.sources[${i}].label`).toBe('string')
      expect(typeof src.url, `${path}.sources[${i}].url`).toBe('string')
      expect(src.url.startsWith('http'), `${path}.sources[${i}].url must be absolute`).toBe(true)
    })
  }
  if (item.image !== undefined) {
    expect(typeof item.image, `${path}.image`).toBe('string')
    expect((item.image as string).length, `${path}.image must not be empty`).toBeGreaterThan(0)
  }
}

const validateSection = (section: Record<string, unknown>, path: string) => {
  expect(typeof section.id, `${path}.id`).toBe('string')
  expect(typeof section.label, `${path}.label`).toBe('string')
  expect(validRisk.has(section.risk as string), `${path}.risk="${section.risk}" invalid`).toBe(true)
  expect(Array.isArray(section.items), `${path}.items must be array`).toBe(true)
  ;(section.items as Array<Record<string, unknown>>).forEach((item, i) =>
    validateItem(item, `${path}.items[${i}]`)
  )
}

const validateComparisonTable = (table: Record<string, unknown>, path: string) => {
  const columns = table.columns as Array<Record<string, unknown>>
  const rows = table.rows as Array<Record<string, unknown>>

  expect(Array.isArray(columns), `${path}.columns must be array`).toBe(true)
  expect(columns.length, `${path}.columns must have at least 1 column`).toBeGreaterThan(0)
  expect(columns.length, `${path}.columns must have at most 4 columns`).toBeLessThanOrEqual(4)

  const columnIds = new Set<string>()
  columns.forEach((col, i) => {
    expect(typeof col.id, `${path}.columns[${i}].id`).toBe('string')
    expect(typeof col.label, `${path}.columns[${i}].label`).toBe('string')
    if (col.url !== undefined) {
      expect(typeof col.url, `${path}.columns[${i}].url`).toBe('string')
      expect(
        (col.url as string).startsWith('http'),
        `${path}.columns[${i}].url must be absolute`
      ).toBe(true)
    }
    columnIds.add(col.id as string)
  })
  expect(columnIds.size, `${path}.columns must have unique ids`).toBe(columns.length)

  expect(Array.isArray(rows), `${path}.rows must be array`).toBe(true)
  rows.forEach((row, i) => {
    expect(typeof row.label, `${path}.rows[${i}].label`).toBe('string')
    const values = row.values as Record<string, string>
    expect(typeof values, `${path}.rows[${i}].values must be an object`).toBe('object')
    Object.keys(values).forEach((key) => {
      expect(
        columnIds.has(key),
        `${path}.rows[${i}].values has key "${key}" with no matching column id`
      ).toBe(true)
    })
  })
}

describe('Guide JSON schema', () => {
  it('all guide files are valid JSON', () => {
    // if any file fails to parse, the readFileSync above would have thrown
    expect(guideFiles.length).toBeGreaterThan(0)
  })

  it('each guide has a valid layout field', () => {
    for (const { file, data } of guideFiles) {
      expect(validLayouts.has(data.layout), `${file}: layout="${data.layout}" is not valid`).toBe(
        true
      )
    }
  })

  it('each guide slug matches its filename', () => {
    for (const { file, slug, data } of guideFiles) {
      expect(data.slug, `${file}: slug mismatch`).toBe(slug)
    }
  })

  describe.each(guideFiles)('checklist guide: $file', ({ file, data }) => {
    it('has required top-level fields', () => {
      expect(typeof data.category, `${file}: category`).toBe('string')
      expect(typeof data.title, `${file}: title`).toBe('string')
      expect(typeof data.subtitle, `${file}: subtitle`).toBe('string')
      expect(typeof data.meta, `${file}: meta`).toBe('object')
    })

    it('has at least one section', () => {
      expect(Array.isArray(data.sections), `${file}: sections must be array`).toBe(true)
      expect(data.sections.length, `${file}: must have ≥1 section`).toBeGreaterThan(0)
    })

    it('all sections have valid schema', () => {
      data.sections.forEach((section: Record<string, unknown>, i: number) => {
        validateSection(section, `${file}.sections[${i}]`)
      })
    })

    it('no section uses legacy "title" or "settings" fields', () => {
      data.sections.forEach((section: Record<string, unknown>, i: number) => {
        expect('title' in section, `${file}.sections[${i}] has legacy "title" field`).toBe(false)
        expect('settings' in section, `${file}.sections[${i}] has legacy "settings" field`).toBe(
          false
        )
      })
    })

    it('all item IDs are unique within the guide', () => {
      const ids: string[] = data.sections.flatMap((s: { items: Array<{ id: string }> }) =>
        s.items.map((item) => item.id)
      )
      const unique = new Set(ids)
      expect(unique.size, `${file}: duplicate item IDs found`).toBe(ids.length)
    })

    it('comparisonTable, if present, has a valid schema', () => {
      if (data.comparisonTable) {
        validateComparisonTable(data.comparisonTable, `${file}.comparisonTable`)
      }
    })
  })
})

// index.json validation
describe('index.json', () => {
  const indexPath = join(__dirname, '../../src/data/index.json')
  const index = JSON.parse(readFileSync(indexPath, 'utf-8'))
  const validStatuses = new Set(['published', 'coming-soon'])

  it('has a categories array', () => {
    expect(Array.isArray(index.categories)).toBe(true)
    expect(index.categories.length).toBeGreaterThan(0)
  })

  it('every guide card has required fields', () => {
    for (const cat of index.categories) {
      for (const guide of cat.guides) {
        expect(typeof guide.slug, `${guide.slug}: slug`).toBe('string')
        expect(typeof guide.title, `${guide.slug}: title`).toBe('string')
        expect(typeof guide.description, `${guide.slug}: description`).toBe('string')
        expect(typeof guide.icon, `${guide.slug}: icon`).toBe('string')
        expect(validRisk.has(guide.risk), `${guide.slug}: risk="${guide.risk}" invalid`).toBe(true)
        expect(validStatuses.has(guide.status), `${guide.slug}: status invalid`).toBe(true)
      }
    }
  })

  it('every published guide has a corresponding JSON file', () => {
    const existingSlugs = new Set(guideFiles.map((g) => g.slug))
    for (const cat of index.categories) {
      for (const guide of cat.guides) {
        if (guide.status === 'published') {
          expect(
            existingSlugs.has(guide.slug),
            `index.json: published guide "${guide.slug}" has no matching JSON file`
          ).toBe(true)
        }
      }
    }
  })

  it('every guide JSON file has an entry in index.json', () => {
    const indexedSlugs = new Set(
      index.categories.flatMap((cat: { guides: Array<{ slug: string }> }) =>
        cat.guides.map((g) => g.slug)
      )
    )
    for (const { slug } of guideFiles) {
      expect(indexedSlugs.has(slug), `guide file "${slug}.json" has no entry in index.json`).toBe(
        true
      )
    }
  })
})
