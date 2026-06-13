import fs from 'node:fs'
import path from 'node:path'

const pages = ['index', 'about', 'pipeline', 'campus', 'events', 'partners', 'privacy']
const outDir = path.resolve('src/content')

fs.mkdirSync(outDir, { recursive: true })

for (const name of pages) {
  const filePath = path.resolve(`${name}.html`)
  const html = fs.readFileSync(filePath, 'utf8')
  const match = html.match(/<main>([\s\S]*?)<\/main>/i)

  if (!match) {
    console.error(`No <main> found in ${name}.html`)
    process.exitCode = 1
    continue
  }

  const content = match[1].trim()
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')

  const titleMatch = html.match(/<title>([^<]*)<\/title>/i)
  const descMatch = html.match(/<meta name="description" content="([^"]*)"/i)

  const module = `export const meta = {
  title: ${JSON.stringify(titleMatch?.[1] || 'GUILD SA')},
  description: ${JSON.stringify(descMatch?.[1] || '')},
}

export const html = \`${content}\`
`

  fs.writeFileSync(path.join(outDir, `${name}.content.js`), module)
  console.log(`Extracted ${name}.html -> src/content/${name}.content.js`)
}
