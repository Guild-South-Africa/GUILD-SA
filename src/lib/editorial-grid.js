const OPTICAL_SELECTORS = [
  '.page-hero h1',
  '.section-header h2',
  '.section-number',
  '.timeline-row .time',
  '.guild-partner-gallery__details h2',
  '.join-final h2',
  '.home-statement',
  '.guild-cinematic-hero__title',
  '.display-heading',
].join(', ')

function populateGuideColumns(container) {
  const cols = getComputedStyle(document.documentElement).getPropertyValue('--cols').trim() || '12'
  const count = parseInt(cols, 10)

  for (let i = 1; i <= count; i += 1) {
    const col = document.createElement('div')
    col.className = 'editorial-guides__col'
    const label = document.createElement('span')
    label.textContent = String(i)
    col.appendChild(label)
    container.appendChild(col)
  }
}

function mountShellGuides() {
  document.querySelectorAll('.shell').forEach((shell) => {
    if (shell.querySelector('.editorial-guides')) return

    const guides = document.createElement('div')
    guides.className = 'editorial-guides'
    guides.setAttribute('aria-hidden', 'true')
    guides.innerHTML = `
      <div class="editorial-guides__cols"></div>
      <div class="editorial-guides__rows"></div>
    `

    populateGuideColumns(guides.querySelector('.editorial-guides__cols'))
    shell.appendChild(guides)
  })
}

function alignDisplayInk() {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  document.querySelectorAll(OPTICAL_SELECTORS).forEach((el) => {
    el.style.marginLeft = '0px'

    const styles = getComputedStyle(el)
    let char = (el.textContent || '').trim().charAt(0)
    if (!char) return
    if (styles.textTransform === 'uppercase') char = char.toUpperCase()

    ctx.font = `${styles.fontStyle} ${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`
    ctx.textAlign = 'left'

    const abl = ctx.measureText(char).actualBoundingBoxLeft
    if (Number.isFinite(abl)) {
      el.style.marginLeft = `${abl.toFixed(2)}px`
    }
  })
}

function scheduleOpticalAlignment() {
  if (document.fonts?.ready) {
    document.fonts.ready.then(alignDisplayInk)
  }
  alignDisplayInk()

  let timer
  window.addEventListener('resize', () => {
    clearTimeout(timer)
    timer = window.setTimeout(alignDisplayInk, 120)
  })
}

export function initEditorialGrid() {
  document.getElementById('editorialGridToggle')?.remove()
  document.body.classList.remove('grid-on')
  mountShellGuides()
  scheduleOpticalAlignment()
}

window.guildInitEditorialGrid = initEditorialGrid
