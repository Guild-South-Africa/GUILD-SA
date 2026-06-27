import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BRAND_COLORS = [
  '#000000',
  '#E1B43E',
  '#F4B12E',
  '#FFFFFF',
  '#FE980F',
  '#E37226',
  '#E1B43E',
  'rgba(225, 180, 62, 0)',
]

const KEYWORD_GRADIENTS = [
  'radial-gradient(circle, #000000 0%, #E1B43E 50%, transparent 100%)',
  'radial-gradient(circle, #E1B43E 0%, #F4B12E 50%, transparent 100%)',
  'radial-gradient(circle, #F4B12E 0%, #FE980F 50%, transparent 100%)',
  'radial-gradient(circle, #FE980F 0%, #FFFFFF 50%, transparent 100%)',
  'radial-gradient(circle, #E37226 0%, #E1B43E 50%, transparent 100%)',
  'radial-gradient(circle, #000000 0%, #E37226 50%, transparent 100%)',
  'radial-gradient(circle, #E1B43E 0%, #FFFFFF 50%, transparent 100%)',
  'radial-gradient(circle, #F4B12E 0%, #E37226 50%, transparent 100%)',
  'radial-gradient(circle, #FE980F 0%, #F4B12E 50%, transparent 100%)',
]

const KEYWORD_TRAIL_IMAGES = [
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998003/Hackathon_team_zrlwkj.jpg',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998032/Merch2_wolytc.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998035/Bottle_igeqzf.png',
  ],
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777211575/Founders_Table_rkvq1q.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245359/eben_nnhqep.jpg',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245360/thomas_amqlcl.jpg',
  ],
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998011/Billboard2_evpkx2.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998045/Merch1_gtfffy.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998037/hoodie1_pmtgqa.png',
  ],
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998022/Brand_Flags_izzch1.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998032/Guild_Hackathon_promotional_poster_on_window_su0yhg.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998003/Hackathon_team_zrlwkj.jpg',
  ],
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998037/hoodie1_pmtgqa.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998475/Totebag1_xlnarm.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998035/Bottle_igeqzf.png',
  ],
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998038/hack_poster_e6kyfr.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998032/Guild_Hackathon_promotional_poster_on_window_su0yhg.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998003/Hackathon_team_zrlwkj.jpg',
  ],
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998011/Billboard2_evpkx2.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998053/Poster_on_car_paozhi.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777211575/Founders_Table_rkvq1q.png',
  ],
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998475/Totebag1_xlnarm.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998032/Merch2_wolytc.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998037/hoodie1_pmtgqa.png',
  ],
  [
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777213445/Glass_Symbol_polfar.png',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245359/sombra_kuc0d4.jpg',
    'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998053/Poster_on_car_paozhi.png',
  ],
]

function isMobile() {
  return window.innerWidth <= 768
}

function splitIntoChars(element) {
  const text = element.textContent.trim()
  element.textContent = ''
  element.setAttribute('aria-label', text)
  const chars = []

  for (const char of text) {
    const span = document.createElement('span')
    span.className = 'guild-spectrum-char'
    span.textContent = char === ' ' ? '\u00A0' : char
    span.setAttribute('aria-hidden', 'true')
    element.appendChild(span)
    chars.push(span)
  }

  return chars
}

function splitIntoWords(element) {
  const text = element.textContent.trim()
  element.textContent = ''
  element.setAttribute('aria-label', text)
  const words = []

  text.split(/\s+/).forEach((word, index) => {
    if (index > 0) element.appendChild(document.createTextNode(' '))
    const span = document.createElement('span')
    span.className = 'guild-spectrum-word'
    span.textContent = word
    span.setAttribute('aria-hidden', 'true')
    element.appendChild(span)
    words.push(span)
  })

  return words
}

function getDisplayHeadingLabel(element) {
  return Array.from(element.querySelectorAll('.display-text'))
    .map((item) => item.textContent.trim())
    .join(' ')
}

function prepareDisplayHeading(element) {
  const fullText = getDisplayHeadingLabel(element)
  element.setAttribute('aria-label', fullText)

  if (isMobile()) {
    const lines = Array.from(element.querySelectorAll('.display-line'))
    const icons = Array.from(element.querySelectorAll('.display-icon'))
    lines.forEach((line) => line.setAttribute('aria-hidden', 'true'))
    return { mode: 'lines', lines, icons, chars: [] }
  }

  const chars = []
  element.querySelectorAll('.display-text').forEach((textEl) => {
    chars.push(...splitIntoChars(textEl))
  })
  const icons = Array.from(element.querySelectorAll('.display-icon'))
  return { mode: 'chars', chars, icons, lines: [] }
}

function splitIntoLines(element) {
  const parts = element.innerHTML.split(/<br\s*\/?>/i)
  element.innerHTML = ''
  const lines = []

  parts.forEach((part) => {
    const line = document.createElement('div')
    line.className = 'guild-spectrum-line'
    line.textContent = part.replace(/<[^>]*>/g, '').trim()
    element.appendChild(line)
    lines.push(line)
  })

  return lines
}

function blendColors(color1, color2, percentage) {
  const amount = Math.max(0, Math.min(1, percentage))
  const hexToRgb = (hex) => {
    const normalized = hex.replace('#', '')
    const bigint = Number.parseInt(normalized, 16)
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
  }
  const rgbToHex = ([r, g, b]) =>
    `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`

  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)
  return rgbToHex([
    Math.round(rgb1[0] * (1 - amount) + rgb2[0] * amount),
    Math.round(rgb1[1] * (1 - amount) + rgb2[1] * amount),
    Math.round(rgb1[2] * (1 - amount) + rgb2[2] * amount),
  ])
}

function revealFallback(root) {
  root.querySelectorAll(
    '.guild-spectrum-svg-wrap, .guild-spectrum-grid, .guild-spectrum-stage-title, .guild-spectrum-label, .guild-spectrum-char, .guild-spectrum-line, .guild-spectrum-word, .display-line, .display-icon'
  ).forEach((el) => {
    el.style.opacity = '1'
    el.style.visibility = 'visible'
    el.style.pointerEvents = 'auto'
  })
}

function initKeywordHover(keywords, overlay) {
  const list = Array.from(keywords)

  list[0]?.closest('.guild-spectrum-keywords')?.addEventListener('mouseleave', () => {
    list.forEach((item) => {
      item.style.opacity = '1'
      item.classList.remove('is-active')
    })
    overlay.style.opacity = '0'
  })

  list.forEach((item, index) => {
    item.addEventListener('mouseenter', () => {
      overlay.style.background = KEYWORD_GRADIENTS[index] || KEYWORD_GRADIENTS[0]
      overlay.style.opacity = '0.28'

      list.forEach((navItem, navIndex) => {
        navItem.classList.remove('is-active')
        const distance = Math.abs(index - navIndex)
        let opacity = 1

        if (navIndex === index) {
          navItem.classList.add('is-active')
        } else if (distance === 1) {
          opacity = 0.55
        } else if (distance === 2) {
          opacity = 0.35
        } else if (distance >= 3) {
          opacity = 0.2
        }

        navItem.style.opacity = String(opacity)
      })
    })
  })
}

function preloadTrailImages() {
  const seen = new Set()
  KEYWORD_TRAIL_IMAGES.flat().forEach((src) => {
    if (seen.has(src)) return
    seen.add(src)
    const img = new Image()
    img.src = src
  })
}

function spawnTrailImage(container, src, x, y) {
  const img = document.createElement('img')
  img.className = 'guild-spectrum-trail__img'
  img.src = src
  img.alt = ''
  img.decoding = 'async'
  img.draggable = false

  const offsetX = 72 + Math.random() * 48
  const offsetY = -72 + Math.random() * 48
  const rotation = (Math.random() - 0.5) * 18

  img.style.left = `${x + offsetX}px`
  img.style.top = `${y + offsetY}px`

  container.appendChild(img)

  gsap.fromTo(
    img,
    { autoAlpha: 0, scale: 0.55, rotation, xPercent: -50, yPercent: -50 },
    { autoAlpha: 1, scale: 1, duration: 0.32, ease: 'power2.out' }
  )

  gsap.to(img, {
    autoAlpha: 0,
    scale: 0.82,
    y: '-=28',
    rotation: rotation + (Math.random() - 0.5) * 10,
    duration: 0.85,
    delay: 0.12,
    ease: 'power2.in',
    onComplete: () => img.remove(),
  })
}

function initKeywordImageTrail(keywords) {
  if (!window.matchMedia('(hover: hover)').matches) return

  preloadTrailImages()

  const trail = document.createElement('div')
  trail.className = 'guild-spectrum-trail'
  trail.setAttribute('aria-hidden', 'true')
  document.body.appendChild(trail)

  const list = Array.from(keywords)
  let activeIndex = -1
  let imageIndex = 0
  let lastX = 0
  let lastY = 0
  const spawnDistance = 52

  const spawnAt = (index, x, y) => {
    const images = KEYWORD_TRAIL_IMAGES[index] || KEYWORD_TRAIL_IMAGES[0]
    spawnTrailImage(trail, images[imageIndex % images.length], x, y)
    imageIndex += 1
  }

  list.forEach((item, index) => {
    item.addEventListener('mouseenter', (event) => {
      activeIndex = index
      imageIndex = 0
      lastX = event.clientX
      lastY = event.clientY
      spawnAt(index, event.clientX, event.clientY)
    })

    item.addEventListener('mousemove', (event) => {
      if (activeIndex !== index) return

      const dx = event.clientX - lastX
      const dy = event.clientY - lastY
      if (Math.hypot(dx, dy) < spawnDistance) return

      lastX = event.clientX
      lastY = event.clientY
      spawnAt(index, event.clientX, event.clientY)
    })
  })

  list[0]?.closest('.guild-spectrum-keywords')?.addEventListener('mouseleave', () => {
    activeIndex = -1
  })
}

function createTitleWave(titleChars, defaultColor) {
  const waveLength = 6
  const fadeLength = 3
  const totalRange = titleChars.length + waveLength + fadeLength

  gsap.set(titleChars, { color: defaultColor, opacity: 1, filter: 'blur(0px)', x: 0 })

  gsap.to(
    { x: 0 },
    {
      x: totalRange,
      duration: 2.6,
      ease: 'none',
      onUpdate() {
        const wavePosition = this.targets()[0].x
        titleChars.forEach((char, index) => {
          const relative = wavePosition - index
          let color = defaultColor

          if (relative >= 0 && relative < totalRange) {
            if (relative < fadeLength) {
              color = blendColors(defaultColor, BRAND_COLORS[1], relative / fadeLength)
            } else if (relative < fadeLength + waveLength) {
              const progress = (relative - fadeLength) / waveLength
              const colorIndex = Math.min(BRAND_COLORS.length - 2, Math.floor(progress * BRAND_COLORS.length))
              color = BRAND_COLORS[colorIndex]
            } else if (relative < fadeLength + waveLength + fadeLength) {
              const progress = (relative - fadeLength - waveLength) / fadeLength
              color = blendColors(BRAND_COLORS[BRAND_COLORS.length - 2], defaultColor, progress)
            }
          }

          char.style.color = color
        })
      },
    }
  )
}

export function initGuildSpectrumHero() {
  const root = document.querySelector('.guild-spectrum-hero')
  if (!root || root.dataset.spectrumInit === 'true') return
  root.dataset.spectrumInit = 'true'

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealFallback(root)
    const metaTopReduced = root.querySelectorAll('.guild-spectrum-meta__tl, .guild-spectrum-meta__tr')
    ScrollTrigger.create({
      trigger: root,
      start: 'bottom top',
      onEnter: () => gsap.set(metaTopReduced, { autoAlpha: 0, pointerEvents: 'none' }),
      onLeaveBack: () => gsap.set(metaTopReduced, { autoAlpha: 1, pointerEvents: 'auto' }),
    })
    return
  }

  const title = root.querySelector('.guild-spectrum-title')
  const keywords = root.querySelectorAll('.guild-spectrum-keyword')
  const texts = root.querySelectorAll('.guild-spectrum-text')
  const overlay = root.querySelector('.guild-spectrum-gradient-overlay')
  const scrollHint = root.querySelector('.guild-spectrum-meta__bc')
  const stageTitle = root.querySelector('.guild-spectrum-stage-title')
  const labels = root.querySelectorAll('.guild-spectrum-label')
  const eyebrow = root.querySelector('.guild-spectrum-eyebrow')
  const defaultColor = getComputedStyle(root).getPropertyValue('--spectrum-text').trim() || '#111111'

  initKeywordHover(keywords, overlay)
  initKeywordImageTrail(keywords)

  const runAnimations = () => {
    try {
      const heroTimeline = gsap.timeline({ delay: 0.2 })

      if (eyebrow) {
        const eyebrowLines = splitIntoLines(eyebrow)
        heroTimeline.fromTo(eyebrowLines, {
          opacity: 0,
          y: 16,
          filter: 'blur(6px)',
        }, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          stagger: 0.08,
          ease: 'power2.out',
        }, 0)
      }

      let titleElements = []
      if (title) {
        if (title.classList.contains('display-heading')) {
          const prepared = prepareDisplayHeading(title)
          const iconTargets = prepared.icons

          if (iconTargets.length) {
            heroTimeline.fromTo(iconTargets, {
              opacity: 0,
              scale: 0.35,
              rotate: -18,
            }, {
              opacity: 1,
              scale: 1,
              rotate: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'back.out(1.7)',
            }, 0.18)
          }

          if (prepared.mode === 'lines') {
            titleElements = prepared.lines
            heroTimeline.fromTo(titleElements, {
              opacity: 0,
              filter: 'blur(8px)',
              y: 24,
            }, {
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
              duration: 0.85,
              stagger: 0.12,
              ease: 'power2.out',
            }, 0.1)
          } else {
            titleElements = prepared.chars
            heroTimeline.fromTo(titleElements, {
              opacity: 0,
              filter: 'blur(8px)',
              x: -18,
            }, {
              opacity: 1,
              filter: 'blur(0px)',
              x: 0,
              duration: 0.85,
              stagger: 0.028,
              ease: 'power2.out',
              onComplete: () => createTitleWave(titleElements, defaultColor),
            }, 0.1)
          }
        } else {
          titleElements = isMobile() ? splitIntoWords(title) : splitIntoChars(title)
          heroTimeline.fromTo(titleElements, {
            opacity: 0,
            filter: 'blur(8px)',
            x: -18,
          }, {
            opacity: 1,
            filter: 'blur(0px)',
            x: 0,
            duration: 0.85,
            stagger: isMobile() ? 0.08 : 0.028,
            ease: 'power2.out',
            onComplete: () => createTitleWave(titleElements, defaultColor),
          }, 0.1)
        }
      }

      keywords.forEach((item) => {
        const lines = splitIntoLines(item)
        heroTimeline.fromTo(lines, {
          opacity: 0,
          y: 24,
          filter: 'blur(8px)',
        }, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.06,
          ease: 'power2.out',
        }, 0.35)
      })

      texts.forEach((textEl, index) => {
        const lines = splitIntoLines(textEl)
        heroTimeline.fromTo(lines, {
          opacity: 0,
          y: 40,
          clipPath: 'inset(0 0 100% 0)',
        }, {
          opacity: 1,
          y: 0,
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
        }, 0.75 + index * 0.18)
      })

      if (scrollHint) {
        const hintChars = splitIntoChars(scrollHint)
        gsap.fromTo(hintChars, {
          opacity: 0.35,
          filter: 'blur(3px)',
        }, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.55,
          stagger: { each: 0.07, repeat: -1, yoyo: true },
          ease: 'sine.inOut',
          delay: 1.1,
        })
      }

      const scrollLines = []
      labels.forEach((label) => {
        scrollLines.push(...splitIntoLines(label))
      })
      if (stageTitle) scrollLines.push(...splitIntoLines(stageTitle))

      const animationSection = root.querySelector('.guild-spectrum-animation')
      const stage = root.querySelector('.guild-spectrum-stage')
      const svgWrap = root.querySelector('.guild-spectrum-svg-wrap')
      const grid = root.querySelector('.guild-spectrum-grid')
      const metaTop = root.querySelectorAll('.guild-spectrum-meta__tl, .guild-spectrum-meta__tr')
      const metaBottom = root.querySelectorAll('.guild-spectrum-meta__bl, .guild-spectrum-meta__br, .guild-spectrum-meta__bc')
      const metaChrome = [...metaTop, ...metaBottom]

      // Mount fixed stage on body so no ancestor transform can break viewport pinning.
      if (stage && stage.parentElement !== document.body) {
        document.body.appendChild(stage)
        stage.classList.add('guild-spectrum-stage--portaled')
      }

      gsap.set(svgWrap, {
        autoAlpha: 0,
        transformOrigin: 'bottom center',
        scaleY: 0.05,
        y: '100vh',
      })
      gsap.set([grid, stageTitle], { autoAlpha: 0 })
      gsap.set(scrollLines, { opacity: 0, y: 28, filter: 'blur(8px)' })

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: animationSection,
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
          onEnter: () => gsap.set(stage, { autoAlpha: 1 }),
          onLeave: () => {
            gsap.to(stage, { autoAlpha: 0, duration: 0.35, ease: 'power2.out' })
          },
          onEnterBack: () => {
            gsap.to(stage, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
          },
          onLeaveBack: () => {
            gsap.set(stage, { autoAlpha: 0 })
            gsap.set(svgWrap, { autoAlpha: 0, scaleY: 0.05, y: '100vh' })
            gsap.set([grid, stageTitle], { autoAlpha: 0 })
            gsap.set(metaChrome, { opacity: 1 })
          },
        },
      })

      scrollTimeline
        .to(svgWrap, { autoAlpha: 1, duration: 0.01 }, 0)
        .to(grid, { autoAlpha: 1, duration: 0.01 }, 0)
        .to(stageTitle, { autoAlpha: 1, duration: 0.01 }, 0)
        .to(svgWrap, {
          scaleY: 0.05,
          y: -30,
          duration: 0.3,
          ease: 'power2.out',
        }, 0)
        .to(svgWrap, {
          scaleY: 1,
          y: 0,
          duration: 1.2,
          ease: 'power2.out',
        }, 0.3)
        .to(metaChrome, {
          opacity: 0,
          duration: 0.55,
          ease: 'power2.out',
        }, 0.2)
        .to(scrollLines, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.75,
          stagger: 0.07,
          ease: 'power2.out',
        }, 0.85)
        .to('.guild-spectrum-label--5', { y: '-25vh', duration: 0.75, ease: 'power2.out' }, 0.85)
        .to('.guild-spectrum-label--4', { y: '-20vh', duration: 0.75, ease: 'power2.out' }, 0.85)
        .to('.guild-spectrum-label--3', { y: '-15vh', duration: 0.75, ease: 'power2.out' }, 0.85)
        .to('.guild-spectrum-label--2', { y: '-10vh', duration: 0.75, ease: 'power2.out' }, 0.85)
        .to('.guild-spectrum-label--1', { y: '-5vh', duration: 0.75, ease: 'power2.out' }, 0.85)

      ScrollTrigger.create({
        trigger: root,
        start: 'bottom top',
        onEnter: () => gsap.set(metaTop, { autoAlpha: 0, pointerEvents: 'none' }),
        onLeaveBack: () => gsap.set(metaTop, { autoAlpha: 1, pointerEvents: 'auto' }),
      })

      ScrollTrigger.refresh()
    } catch (error) {
      console.error('GUILD spectrum hero failed to initialize', error)
      revealFallback(root)
    }
  }

  if (document.fonts?.ready) {
    Promise.race([document.fonts.ready, new Promise((resolve) => window.setTimeout(resolve, 800))])
      .then(runAnimations)
      .catch(() => revealFallback(root))
  } else {
    window.setTimeout(runAnimations, 80)
  }

  window.addEventListener('resize', () => ScrollTrigger.refresh())
}

export function cleanupGuildSpectrumHero() {
  document.querySelectorAll('.guild-spectrum-stage--portaled').forEach((el) => {
    el.remove()
  })
  if (typeof ScrollTrigger !== 'undefined' && ScrollTrigger.getAll) {
    ScrollTrigger.getAll().forEach((trigger) => {
      trigger.kill()
    })
  }
}

window.cleanupGuildSpectrumHero = cleanupGuildSpectrumHero
