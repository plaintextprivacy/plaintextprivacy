// run locally: npm run generate-guide-metadata
import { execSync } from 'node:child_process'
import { readdirSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const GUIDES_DIR = join(__dirname, '../src/data/guides')
const OUTPUT_PATH = join(__dirname, '../src/data/guideMeta.generated.json')

// runs a git command relative to the repo root, returns trimmed stdout
function git(args) {
  return execSync(`git ${args}`, { encoding: 'utf-8', cwd: join(__dirname, '..') }).trim()
}

function getUpdatedDate(relativePath) {
  const output = git(`log -1 --format=%cs -- "${relativePath}"`)
  return output || null
}

function getCreatedDate(relativePath) {
  const output = git(
    `log --follow --diff-filter=A --format=%cs -- "${relativePath}" | tail -1`
  )
  return output || null
}

// check whether "updated" and "created" are the same commit
function getUpdatedCommitHash(relativePath) {
  return git(`log -1 --format=%H -- "${relativePath}"`)
}

function getCreatedCommitHash(relativePath) {
  const output = git(
    `log --follow --diff-filter=A --format=%H -- "${relativePath}" | tail -1`
  )
  return output || null
}

function main() {
  const files = readdirSync(GUIDES_DIR).filter((f) => f.endsWith('.json'))

  const guides = {}
  let mostRecent = null // { slug, date, isNew }

  for (const file of files) {
    const slug = file.replace('.json', '')
    const relativePath = `src/data/guides/${file}`

    const updated = getUpdatedDate(relativePath)
    const created = getCreatedDate(relativePath)
    const updatedHash = getUpdatedCommitHash(relativePath)
    const createdHash = getCreatedCommitHash(relativePath)

    if (!updated || !created) {
      console.warn(`  ⚠ ${slug}: no git history found — skipping (uncommitted file?)`)
      continue
    }

    guides[slug] = { created, updated }

    const isNew = updatedHash === createdHash

    if (!mostRecent || updated > mostRecent.date) {
      mostRecent = { slug, date: updated, isNew }
    }
  }

  const output = {
    guides,
    featured: mostRecent
      ? {
        type: mostRecent.isNew ? 'new' : 'updated',
        slug: mostRecent.slug,
        date: mostRecent.date
      }
      : null
  }

    writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n')
    console.log(`✓ Wrote metadata for ${Object.keys(guides).length} guides`)
    console.log(`✓ Featured: ${output.featured?.type} — ${output.featured?.slug} (${output.featured?.date})`)
}

main()