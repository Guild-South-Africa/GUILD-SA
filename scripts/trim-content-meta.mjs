import fs from 'node:fs'
import path from 'node:path'

const pages = ['index', 'about', 'pipeline', 'campus', 'events', 'partners', 'privacy']
const contentDir = path.resolve('src/content')

for (const page of pages) {
  const modulePath = path.join(contentDir, `${page}.content.js`)
  const source = fs.readFileSync(modulePath, 'utf8')
  const metaMatch = source.match(/export const meta = (\{[\s\S]*?\})\s*\n/)

  if (!metaMatch) {
    console.error(`No meta export in ${page}.content.js`)
    process.exitCode = 1
    continue
  }

  fs.writeFileSync(modulePath, `export const meta = ${metaMatch[1]}\n`)
  console.log(`Trimmed ${page}.content.js to meta only`)
}
