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
const validLayouts = new Set(['guide', 'checklist', 'checklist-tabbed'])

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

  describe.each(guideFiles.filter((g) => g.data.layout === 'checklist'))(
    'checklist guide: $file',
    ({ file, data }) => {
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
    }
  )

  describe.each(guideFiles.filter((g) => g.data.layout === 'checklist-tabbed'))(
    'checklist-tabbed guide: $file',
    ({ file, data }) => {
      it('has a tabs array with at least one tab', () => {
        expect(Array.isArray(data.tabs), `${file}: tabs must be array`).toBe(true)
        expect(data.tabs.length, `${file}: must have ≥1 tab`).toBeGreaterThan(0)
      })

      it('each tab has required fields', () => {
        data.tabs.forEach((tab: Record<string, unknown>, i: number) => {
          const path = `${file}.tabs[${i}]`
          expect(typeof tab.id, `${path}.id`).toBe('string')
          expect(typeof tab.label, `${path}.label`).toBe('string')
          expect(typeof tab.title, `${path}.title`).toBe('string')
          expect(typeof tab.subtitle, `${path}.subtitle`).toBe('string')
          expect(Array.isArray(tab.sections), `${path}.sections must be array`).toBe(true)
        })
      })

      it('all sections and items within tabs have valid schema', () => {
        data.tabs.forEach(
          (tab: { id: string; sections: Array<Record<string, unknown>> }, ti: number) => {
            tab.sections.forEach((section, si) => {
              validateSection(section, `${file}.tabs[${ti}].sections[${si}]`)
            })
          }
        )
      })
    }
  )
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
