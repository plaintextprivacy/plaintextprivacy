/**
 * build-time generate PDF script
 *
 * to test locally:
 *   npm run dev
 *   # in a second terminal:
 *   PREVIEW_URL=http://localhost:5173
 *
 * the PDFs populate in public/pdfs/
 */

import { chromium } from 'playwright'
import { PDFDocument } from 'pdf-lib'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PREVIEW_URL = process.env.PREVIEW_URL || 'http://localhost:5173'
const OUTPUT_DIR = join(__dirname, '../public/pdfs')

const index = JSON.parse(readFileSync(join(__dirname, '../src/data/index.json'), 'utf-8'))

const slugs = index.categories.flatMap((cat) =>
    cat.guides.filter((g) => g.status === 'published').map((g) => g.slug)
)

async function generatePdf(browser, slug) {
    const page = await browser.newPage()

    await page.route('**/*', (route) => {
        const url = new URL(route.request().url())
        const isLocal = url.hostname === 'localhost' || url.hostname === '127.0.0.1'
        if (isLocal) {
            route.continue()
        } else {
            console.warn(`  ⚠ Blocked unexpected external request: ${url.href}`)
            route.abort()
        }
    })

    await page.goto(`${PREVIEW_URL}/print/guides/${slug}`, { waitUntil: 'networkidle' })
    await page.emulateMedia({ media: 'print', colorScheme: 'light' })

    const pdfBuffer = await page.pdf({
        format: 'Letter',
        printBackground: true,
        margin: { top: '0.6in', bottom: '0.6in', left: '0.6in', right: '0.6in' }
    })

    await page.close()

    // strip/overwrite metadata
    const pdfDoc = await PDFDocument.load(pdfBuffer)
    pdfDoc.setTitle(`Plaintext Privacy - ${slug}`)
    pdfDoc.setAuthor('Plaintext Privacy')
    pdfDoc.setProducer('Plaintext Privacy')
    pdfDoc.setCreator('Plaintext Privacy')
    pdfDoc.setSubject('')
    pdfDoc.setKeywords([])

    const cleanedBytes = await pdfDoc.save()

    if (!existsSync(OUTPUT_DIR)) mkdirSync(OUTPUT_DIR, { recursive: true })
    writeFileSync(join(OUTPUT_DIR, `${slug}.pdf`), cleanedBytes)
    console.log(`  ✓ ${slug}.pdf`)
}

async function main() {
    console.log(`Generating PDFs for ${slugs.length} published guides...`)
    console.log(`Preview server: ${PREVIEW_URL}`)

    const browser = await chromium.launch()

    for (const slug of slugs) {
        try {
            await generatePdf(browser, slug)
        } catch (err) {
            console.error(`  ✗ ${slug} failed:`, err.message)
            process.exitCode = 1
        }
    }

    await browser.close()
    console.log('Done.')
}

main().catch((err) => {
    console.error(err)
    process.exit(1)
})