import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import shape1 from './shapes/shape1.png?url'
import shape2 from './shapes/shape2.png?url'
import shape3 from './shapes/shape3.png?url'
import shape4 from './shapes/shape4.png?url'

gsap.registerPlugin(ScrollTrigger)

const SHAPE_IMAGES = [shape1, shape2, shape3, shape4]

const HEADING_SELECTOR = 'main h2'

const SKIP_SELECTOR = [
  '.join-success-panel h2',
  '.guild-cinematic-hero h2',
  'footer h2',
  '.legal-content h2',
].join(', ')

let scrollTriggers = []
let imageCursor = 0

function nextShapeImage() {
  const src = SHAPE_IMAGES[imageCursor % SHAPE_IMAGES.length]
  imageCursor += 1
  return src
}

function tokenizeHeading(heading) {
  const tokens = []

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parts = node.textContent.split(/(\s+)/)
      parts.forEach((part) => {
        if (!part) return
        if (/^\s+$/.test(part)) tokens.push({ type: 'space', value: part })
        else tokens.push({ type: 'word', value: part })
      })
      return
    }

    if (node.nodeName === 'BR') {
      tokens.push({ type: 'br' })
      return
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      ;[...node.childNodes].forEach(walk)
    }
  }

  ;[...heading.childNodes].forEach(walk)
  return tokens
}

function createCharSpan(char) {
  const span = document.createElement('span')
  span.className = 'guild-scroll-fill-char'
  span.textContent = char === ' ' ? '\u00A0' : char
  span.setAttribute('aria-hidden', 'true')
  return span
}

function appendChars(container, text) {
  const chars = []
  for (const char of text) {
    const span = createCharSpan(char)
    container.appendChild(span)
    chars.push(span)
  }
  return chars
}

function appendWordChars(container, text) {
  const token = document.createElement('span')
  token.className = 'guild-scroll-fill-token'
  const chars = appendChars(token, text)
  container.appendChild(token)
  return chars
}

function appendSpace(container, value) {
  container.appendChild(document.createTextNode(value))
}

function createImageWord(imageSrc, wordText) {
  const word = document.createElement('span')
  word.className = 'guild-scroll-fill-word'

  const blur = document.createElement('span')
  blur.className = 'guild-scroll-fill-blur'

  const slot = document.createElement('span')
  slot.className = 'guild-scroll-fill-slot'

  const slotInner = document.createElement('span')
  slotInner.className = 'guild-scroll-fill-slot-inner'

  const img = document.createElement('img')
  img.className = 'guild-scroll-fill-img'
  img.src = imageSrc
  img.alt = ''
  img.loading = 'lazy'
  img.decoding = 'async'

  const revealLeft = document.createElement('span')
  revealLeft.className = 'guild-scroll-fill-reveal guild-scroll-fill-reveal--left'
  revealLeft.setAttribute('aria-hidden', 'true')

  const revealRight = document.createElement('span')
  revealRight.className = 'guild-scroll-fill-reveal guild-scroll-fill-reveal--right'
  revealRight.setAttribute('aria-hidden', 'true')

  slotInner.append(img, revealLeft, revealRight)
  slot.append(slotInner)
  blur.append(slot)

  const textPart = document.createElement('span')
  textPart.className = 'guild-scroll-fill-word-text'

  word.append(blur, textPart)

  const chars = appendChars(textPart, wordText)

  return { word, slot, revealLeft, revealRight, chars }
}

function pickImageWordIndex(tokens) {
  const brIndex = tokens.findIndex((token) => token.type === 'br')
  if (brIndex >= 0) {
    const nextWordIndex = tokens.findIndex((token, index) => index > brIndex && token.type === 'word')
    if (nextWordIndex >= 0) return nextWordIndex
  }

  const wordIndexes = tokens
    .map((token, index) => (token.type === 'word' ? index : -1))
    .filter((index) => index >= 0)

  if (wordIndexes.length < 3) return -1
  return wordIndexes[Math.floor(wordIndexes.length / 2)]
}

function nextMeaningfulToken(tokens, startIndex) {
  for (let index = startIndex; index < tokens.length; index += 1) {
    if (tokens[index].type === 'word' || tokens[index].type === 'br') return tokens[index]
  }
  return null
}

function createLine() {
  const line = document.createElement('span')
  line.className = 'guild-scroll-fill-line'
  return line
}

function buildHeading(heading, tokens, imageSrc) {
  const imageWordIndex = pickImageWordIndex(tokens)
  const chars = []
  const imageWords = []

  heading.replaceChildren()
  heading.classList.add('guild-scroll-fill-heading')

  let line = createLine()
  heading.appendChild(line)

  tokens.forEach((token, index) => {
    if (token.type === 'br') {
      line = createLine()
      heading.appendChild(line)
      return
    }

    if (token.type === 'space') return

    if (index === imageWordIndex) {
      const built = createImageWord(imageSrc, token.value)
      line.appendChild(built.word)
      chars.push(...built.chars)
      imageWords.push(built)
    } else {
      chars.push(...appendWordChars(line, token.value))
    }

    if (nextMeaningfulToken(tokens, index + 1)?.type === 'word') {
      appendSpace(line, ' ')
    }
  })

  return { chars, imageWords }
}

function getFillColors(heading) {
  const onDark = heading.closest('.site-section.dark, .page-hero.dark, .founders-panel')
  if (onDark) {
    return {
      from: 'rgba(255, 255, 255, 0.28)',
      to: 'var(--brand-sun)',
    }
  }

  return {
    from: 'rgba(17, 17, 17, 0.2)',
    to: 'var(--brand-amber)',
  }
}

function trackScrollTrigger(config) {
  const trigger = ScrollTrigger.create(config)
  scrollTriggers.push(trigger)
  return trigger
}

function animateImageWord({ word, slot, revealLeft, revealRight }) {
  const slotWidth = getComputedStyle(slot).getPropertyValue('--guild-scroll-fill-slot-size').trim()
    || (window.matchMedia('(max-width: 640px)').matches ? 'clamp(2.75rem, 22vw, 4rem)' : 'clamp(3.5rem, 14vw, 5.5rem)')

  gsap.set(slot, { width: 0 })
  gsap.set([revealLeft, revealRight], { xPercent: 0 })

  trackScrollTrigger({
    trigger: word,
    start: 'top 82%',
    end: 'bottom 18%',
    onEnter: () => {
      gsap.to(slot, { width: slotWidth, duration: 0.55, ease: 'power2.out' })
      gsap.to(revealLeft, { xPercent: -100, duration: 0.55, ease: 'power2.out' })
      gsap.to(revealRight, { xPercent: 100, duration: 0.55, ease: 'power2.out', delay: 0.04 })
    },
    onLeaveBack: () => {
      gsap.to(slot, { width: 0, duration: 0.45, ease: 'power2.inOut' })
      gsap.to(revealLeft, { xPercent: 0, duration: 0.45, ease: 'power2.inOut' })
      gsap.to(revealRight, { xPercent: 0, duration: 0.45, ease: 'power2.inOut', delay: 0.04 })
    },
  })
}

function enhanceHeading(heading) {
  if (heading.dataset.guildScrollFill === 'true') return
  if (heading.closest(SKIP_SELECTOR)) return

  const plainText = heading.textContent.replace(/\s+/g, ' ').trim()
  if (!plainText) return

  heading.dataset.guildScrollFillOriginal = heading.innerHTML
  heading.dataset.guildScrollFill = 'true'

  if (!heading.getAttribute('aria-label')) {
    heading.setAttribute('aria-label', plainText)
  }

  const tokens = tokenizeHeading(heading)
  const imageSrc = nextShapeImage()
  const { chars, imageWords } = buildHeading(heading, tokens, imageSrc)

  if (!chars.length) return

  const { from, to } = getFillColors(heading)

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    gsap.set(chars, { color: to })
    return
  }

  gsap.set(chars, { color: from })

  const fillTween = gsap.fromTo(
    chars,
    { color: from },
    {
      color: to,
      stagger: 0.04,
      ease: 'none',
      scrollTrigger: {
        trigger: heading,
        start: 'top bottom',
        end: 'bottom center',
        scrub: 0.85,
      },
    },
  )

  if (fillTween.scrollTrigger) scrollTriggers.push(fillTween.scrollTrigger)

  imageWords.forEach(animateImageWord)
}

export function destroyGuildScrollFill() {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []

  document.querySelectorAll('[data-guild-scroll-fill="true"]').forEach((heading) => {
    const original = heading.dataset.guildScrollFillOriginal
    if (original != null) heading.innerHTML = original
    heading.classList.remove('guild-scroll-fill-heading')
    heading.removeAttribute('data-guild-scroll-fill')
    heading.removeAttribute('data-guild-scroll-fill-original')
  })

  gsap.killTweensOf('.guild-scroll-fill-char')
  gsap.killTweensOf('.guild-scroll-fill-slot')
  gsap.killTweensOf('.guild-scroll-fill-reveal')
  gsap.killTweensOf('.guild-scroll-fill-word')
}

export function initGuildScrollFill(root = document.getElementById('root')) {
  if (!root) return

  destroyGuildScrollFill()

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.querySelectorAll(HEADING_SELECTOR).forEach((heading) => {
      if (!heading.closest(SKIP_SELECTOR)) {
        heading.classList.add('guild-scroll-fill-heading')
      }
    })
    return
  }

  root.querySelectorAll(HEADING_SELECTOR).forEach(enhanceHeading)
  ScrollTrigger.refresh()
}
