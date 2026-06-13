const SPECTRUM_TARGETS = [
  '.entry-card',
  '.panel',
  '.card',
  '.story-panel',
  '.join-entry-card',
  '.about-entry-card',
  '.timeline-row',
  '.home-flow-step',
  '.tool-card',
  '.system-node',
  '.waitlist-panel',
  '.compare-cell',
  '.pipeline-step',
  '.project-card',
  '.stat',
  '.form-panel',
].join(',')

const BAR_LAYOUT = [
  { x: 0, w: 0.11, top: 0.5 },
  { x: 0.11, w: 0.11, top: 0.18 },
  { x: 0.22, w: 0.11, top: 0.32 },
  { x: 0.33, w: 0.11, top: 0.09 },
  { x: 0.44, w: 0.11, top: 0.09 },
  { x: 0.55, w: 0.11, top: 0 },
  { x: 0.66, w: 0.11, top: 0.32 },
  { x: 0.77, w: 0.11, top: 0.5 },
  { x: 0.88, w: 0.12, top: 0.5 },
]

let spectrumId = 0

function readBarColors(element) {
  const style = getComputedStyle(element)
  const pick = (name, fallback) => style.getPropertyValue(name).trim() || fallback

  return {
    c1: pick('--spectrum-bar-1', '#000000'),
    c2: pick('--spectrum-bar-2', '#e1b43e'),
    c3: pick('--spectrum-bar-3', '#f4b12e'),
    c4: pick('--spectrum-bar-4', '#ffffff'),
    c5: pick('--spectrum-bar-5', '#fe980f'),
    c6: pick('--spectrum-bar-6', '#e37226'),
    c7: pick('--spectrum-bar-7', '#e1b43e'),
  }
}

function buildGradientStops(colors) {
  return `
    <stop stop-color="${colors.c1}" />
    <stop offset="0.18" stop-color="${colors.c2}" />
    <stop offset="0.28" stop-color="${colors.c3}" />
    <stop offset="0.41" stop-color="${colors.c4}" />
    <stop offset="0.59" stop-color="${colors.c5}" />
    <stop offset="0.68" stop-color="${colors.c6}" />
    <stop offset="0.8" stop-color="${colors.c7}" />
    <stop offset="1" stop-color="${colors.c7}" stop-opacity="0" />
  `
}

function createSpectrumBars(element) {
  const id = `guildSpectrumBars${spectrumId += 1}`
  const colors = readBarColors(element)
  const gradients = BAR_LAYOUT.map((_, index) => `
    <linearGradient id="${id}Grad${index}" x1="0" y1="320" x2="0" y2="0" gradientUnits="userSpaceOnUse">
      ${buildGradientStops(colors)}
    </linearGradient>
  `).join('')

  const bars = BAR_LAYOUT.map((bar, index) => {
    const x = bar.x * 900
    const width = bar.w * 900
    const y = bar.top * 320
    const height = 320 - y
    return `<rect x="${x}" y="${y}" width="${width}" height="${height}" fill="url(#${id}Grad${index})" />`
  }).join('')

  const wrap = document.createElement('div')
  wrap.className = 'guild-spectrum-bars'
  wrap.setAttribute('aria-hidden', 'true')
  wrap.innerHTML = `
    <svg viewBox="0 0 900 320" preserveAspectRatio="none" focusable="false">
      <defs>
        <filter id="${id}Blur" x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
          <feGaussianBlur stdDeviation="8" />
        </filter>
        ${gradients}
      </defs>
      <g filter="url(#${id}Blur)">${bars}</g>
    </svg>
  `
  return wrap
}

export function initSpectrumHover() {
  if (!window.matchMedia('(hover: hover)').matches) return

  document.querySelectorAll(SPECTRUM_TARGETS).forEach((element) => {
    if (element.querySelector('.guild-spectrum-bars')) return
    if (getComputedStyle(element).position === 'static') {
      element.style.position = 'relative'
    }
    element.classList.add('has-spectrum-hover')
    element.appendChild(createSpectrumBars(element))
  })
}
