const ICON_SVGS = {
  gold: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v16M4 12h16" stroke-linecap="round" /></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="8" /><path d="M12 8v8M8 12h8" stroke-linecap="round" /></svg>`,
  clay: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l10 10-10 10L2 12 12 2z" /></svg>`,
}

const DISPLAY_HEADING_SELECTORS = '.page-hero h1'

function createDisplayIcon(variant) {
  const icon = document.createElement('span')
  icon.className = `display-icon display-icon--${variant}`
  icon.setAttribute('aria-hidden', 'true')
  icon.innerHTML = ICON_SVGS[variant]
  return icon
}

function splitByBreaks(heading) {
  const lines = []
  let buffer = ''

  heading.childNodes.forEach((node) => {
    if (node.nodeName === 'BR') {
      const trimmed = buffer.trim()
      if (trimmed) lines.push(trimmed)
      buffer = ''
      return
    }

    buffer += node.textContent || ''
  })

  const trimmed = buffer.trim()
  if (trimmed) lines.push(trimmed)
  return lines.length ? lines : [heading.textContent.trim()]
}

function parseHeadingLines(heading) {
  if (heading.querySelector('br')) {
    return splitByBreaks(heading)
  }

  const text = heading.textContent.trim()
  if (!text) return []

  const segments = text.split(/\.\s+/).filter(Boolean)
  if (segments.length > 1 && segments.every((segment) => segment.replace(/\.$/, '').length <= 52)) {
    return segments.map((segment, index) => {
      const trimmed = segment.trim()
      if (trimmed.endsWith('.')) return trimmed
      return index < segments.length - 1 ? `${trimmed}.` : `${trimmed}${text.endsWith('.') ? '.' : ''}`
    })
  }

  return [text]
}

function shouldSkipHeading(heading) {
  if (!heading || heading.querySelector('.display-icon')) return true
  if (heading.id === 'form-title') return true
  if (heading.closest('.legal-content, [data-guild-system-slider]')) return true
  return false
}

function enhanceDisplayHeading(heading) {
  if (shouldSkipHeading(heading)) return false

  const lines = parseHeadingLines(heading)
  if (!lines.length) return false

  const ariaLabel = heading.getAttribute('aria-label') || lines.join(' ')
  const isMultiLine = lines.length > 1
  const endVariant = isMultiLine ? 'clay' : 'sun'

  heading.classList.add('display-heading')
  heading.setAttribute('aria-label', ariaLabel.replace(/\s+/g, ' ').trim())
  heading.replaceChildren()

  lines.forEach((lineText, index) => {
    const line = document.createElement('span')
    line.className = 'display-line'
    if (isMultiLine && index === lines.length - 1) {
      line.classList.add('display-line--accent')
    }

    if (index === 0) {
      line.appendChild(createDisplayIcon('gold'))
    }

    const text = document.createElement('span')
    text.className = 'display-text'
    text.textContent = lineText
    line.appendChild(text)

    if (index === lines.length - 1) {
      line.appendChild(createDisplayIcon(endVariant))
    }

    heading.appendChild(line)
  })

  return true
}

export function initDisplayHeadingIcons(root = document) {
  const seen = new Set()

  root.querySelectorAll(DISPLAY_HEADING_SELECTORS).forEach((heading) => {
    if (seen.has(heading)) return
    seen.add(heading)
    enhanceDisplayHeading(heading)
  })
}
