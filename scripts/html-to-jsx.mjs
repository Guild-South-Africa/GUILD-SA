import fs from 'node:fs'
import path from 'node:path'

const pages = ['about', 'pipeline', 'campus', 'events', 'partners', 'privacy', 'index']
const contentDir = path.resolve('src/content')
const outDir = path.resolve('src/pages/content')

fs.mkdirSync(outDir, { recursive: true })

function decodeEntities(text) {
  return text
    .replace(/&bull;/g, '•')
    .replace(/&ndash;/g, '–')
    .replace(/&rarr;/g, '→')
    .replace(/&mdash;/g, '—')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, '\u00a0')
}

function styleToJsx(style) {
  const entries = style
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => {
      const colon = part.indexOf(':')
      const key = part.slice(0, colon).trim()
      const value = part.slice(colon + 1).trim().replace(/'/g, "\\'")
      const prop = key.startsWith('--')
        ? `'${key}'`
        : key.replace(/-([a-z])/g, (_, char) => char.toUpperCase())
      return `${prop}: '${value}'`
    })

  return entries.join(', ')
}

function normalizeHref(href) {
  if (!href) return href
  if (href.endsWith('.html')) {
    const clean = href.replace(/\.html$/, '')
    return clean === '/index' ? '/' : clean
  }
  return href
}

function convertAttributes(attrs) {
  if (!attrs || attrs.includes('className=') || attrs.includes('style={{')) {
    return attrs
  }

  return attrs
    .replace(/\bclass=/g, 'className=')
    .replace(/\bfor=/g, 'htmlFor=')
    .replace(/\btabindex=/g, 'tabIndex=')
    .replace(/\breadonly=/g, 'readOnly=')
    .replace(/\bautoplay\b/g, 'autoPlay')
    .replace(/\bplaysinline\b/g, 'playsInline')
    .replace(/\bwebkit-playsinline\b/g, 'webkit-playsinline')
    .replace(/\bclip-path=/g, 'clipPath=')
    .replace(/\bstop-color=/g, 'stopColor=')
    .replace(/\bstop-opacity=/g, 'stopOpacity=')
    .replace(/\bflood-opacity=/g, 'floodOpacity=')
    .replace(/\bcolor-interpolation-filters=/g, 'colorInterpolationFilters=')
    .replace(/\bstroke-width=/g, 'strokeWidth=')
    .replace(/\bstroke-linejoin=/g, 'strokeLinejoin=')
    .replace(/\bfill-rule=/g, 'fillRule=')
    .replace(/\bpreserveAspectRatio=/g, 'preserveAspectRatio=')
    .replace(/\bviewBox=/g, 'viewBox=')
    .replace(/\bxmlns:xlink=/g, 'xmlnsXlink=')
    .replace(/\baria-hidden=/g, 'aria-hidden=')
    .replace(/\baria-label=/g, 'aria-label=')
    .replace(/\baria-live=/g, 'aria-live=')
    .replace(/style="([^"]*)"/g, (_, style) => `style={{ ${styleToJsx(decodeEntities(style))} }}`)
    .replace(/href="([^"]*)"/g, (_, href) => {
      const next = normalizeHref(href)
      if (next.startsWith('/') && !next.startsWith('//') && !next.startsWith('/http')) {
        return `to="${next}"`
      }
      return `href="${href}"`
    })
}

function convertAnchors(jsx) {
  const parts = []
  let last = 0
  const regex = /<\/?a\b[^>]*>/gi
  const stack = []
  let match

  while ((match = regex.exec(jsx)) !== null) {
    parts.push(jsx.slice(last, match.index))
    const tag = match[0]

    if (tag.startsWith('</')) {
      const kind = stack.pop() || 'a'
      parts.push(kind === 'AppLink' ? '</AppLink>' : '</a>')
    } else {
      const attrs = tag.replace(/^<a\b/i, '').replace(/\/?>$/, '')
      const converted = convertAttributes(attrs)
      if (converted.includes('to="')) {
        stack.push('AppLink')
        parts.push(`<AppLink${converted}>`)
      } else {
        stack.push('a')
        parts.push(`<a${converted}>`)
      }
    }

    last = regex.lastIndex
  }

  parts.push(jsx.slice(last))
  return parts.join('')
}

function convertScriptTags(jsx) {
  return jsx.replace(/<script([^>]*)>([\s\S]*?)<\/script>/gi, (_, attrs, content) => {
    const convertedAttrs = convertAttributes(attrs)
    const escaped = content
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$\{/g, '\\${')
    return `<script${convertedAttrs} dangerouslySetInnerHTML={{ __html: \`${escaped}\` }} />`
  })
}

function convertHtmlToJsx(html) {
  let jsx = decodeEntities(html.trim())

  jsx = jsx.replace(/<\s*br\s*\/?>/gi, '<br />')
  jsx = convertScriptTags(jsx)
  jsx = convertAnchors(jsx)

  jsx = jsx.replace(/<(?!\/?(?:a|AppLink)\b|!--)([a-zA-Z][\w:-]*)([^>]*?)(\s*\/)?>/g, (full, name, rawAttrs, selfClose) => {
    const attrs = convertAttributes(rawAttrs)
    const voidTags = new Set(['br', 'hr', 'img', 'input', 'meta', 'link', 'source', 'area', 'base', 'col', 'embed', 'param', 'track', 'wbr'])

    if (voidTags.has(name.toLowerCase()) || selfClose) {
      return `<${name}${attrs} />`
    }

    return `<${name}${attrs}>`
  })

  return jsx
}

function componentName(page) {
  return `${page.charAt(0).toUpperCase()}${page.slice(1)}Content`
}

for (const page of pages) {
  const modulePath = path.join(contentDir, `${page}.content.js`)
  const source = fs.readFileSync(modulePath, 'utf8')
  const htmlMatch = source.match(/export const html = `([\s\S]*)`\s*$/)

  if (!htmlMatch) {
    console.error(`Could not parse html export in ${page}.content.js`)
    process.exitCode = 1
    continue
  }

  const jsxBody = convertHtmlToJsx(htmlMatch[1])
  const name = componentName(page)

  const file = `import AppLink from '../../components/AppLink'

export default function ${name}() {
  return (
    <>
${jsxBody.split('\n').map((line) => (line ? `      ${line}` : '')).join('\n')}
    </>
  )
}
`

  fs.writeFileSync(path.join(outDir, `${name}.jsx`), file)
  console.log(`Wrote src/pages/content/${name}.jsx`)
}
