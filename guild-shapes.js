import gsap from 'gsap'

import shape1 from './shapes/shape1.png?url'
import shape2 from './shapes/shape2.png?url'
import shape3 from './shapes/shape3.png?url'
import shape4 from './shapes/shape4.png?url'

const GUILD_SHAPES = [shape1, shape2, shape3, shape4]
const SHAPE_COLORS = ['#e1b43e', '#f4b12e', '#fe980f', '#e37226']

const GRAVITY = 0.58
const AIR_DRAG = 0.988
const SHAPE_BOUNCE = 0.18
const FLOOR_BOUNCE = 0.2
const LETTER_HIT_SCALE = 0.32
const LETTER_SPRING = 0.16
const LETTER_DAMPING = 0.8
const SHAPE_LIFETIME_MS = 6800
const STUCK_FRAME_LIMIT = 28
const SLEEP_SPEED = 0.42
const SLEEP_ROT = 0.55
const SLEEP_FRAMES = 6
const FORCE_FIELD_RADIUS = 148
const STOMACH_DROP_THRESHOLD = 7
const STOMACH_DROP_COOLDOWN_MS = 48

let shapeUid = 0

const THROW_TARGETS = '.display-icon'

let shapePortal = null
let runningSimulations = 0
let dragState = null
const letterStates = new Map()
const letterTintMap = new Map()
const liveShapes = new Set()

let scrollDropLoopId = 0
let lastScrollSampleY = window.scrollY
let lastStomachDropAt = 0
let scrollDropEnabled = true

function getShapePortal() {
  if (shapePortal) return shapePortal

  shapePortal = document.createElement('div')
  shapePortal.className = 'guild-shape-portal'
  shapePortal.setAttribute('aria-hidden', 'true')
  document.body.appendChild(shapePortal)
  return shapePortal
}

function splitIntoShapeHitChars(element) {
  const text = element.textContent.trim()
  if (!text) return []

  element.textContent = ''
  const chars = []

  for (const char of text) {
    const span = document.createElement('span')
    span.className = 'shape-hit-char'
    span.textContent = char === ' ' ? '\u00A0' : char
    span.setAttribute('aria-hidden', 'true')
    element.appendChild(span)
    chars.push(span)
  }

  return chars
}

function prepareHeadingCollisionTargets() {
  document.querySelectorAll('.display-heading').forEach((heading) => {
    heading.querySelectorAll('.display-text').forEach((textEl) => {
      if (textEl.querySelector('.guild-spectrum-char, .shape-hit-char')) return
      splitIntoShapeHitChars(textEl)
    })
  })
}

function getCollisionTargets(heading) {
  if (!heading) return []

  if (window.innerWidth <= 768) {
    return [...heading.querySelectorAll('.display-text')]
  }

  const chars = heading.querySelectorAll('.guild-spectrum-char, .shape-hit-char')
  if (chars.length) return [...chars]

  return [...heading.querySelectorAll('.display-text')]
}

function getLetterState(element) {
  if (!letterStates.has(element)) {
    letterStates.set(element, {
      x: 0,
      y: 0,
      rot: 0,
      vx: 0,
      vy: 0,
      vr: 0,
      hit: false,
    })
    gsap.set(element, {
      x: 0,
      y: 0,
      rotation: 0,
      transformOrigin: '50% 85%',
    })
  }

  return letterStates.get(element)
}

function getShapeSize() {
  return 68
}

function getShapeScale() {
  return 1.35
}

function circleRectCollision(cx, cy, radius, rect) {
  const closestX = Math.max(rect.left, Math.min(cx, rect.right))
  const closestY = Math.max(rect.top, Math.min(cy, rect.bottom))
  const dx = cx - closestX
  const dy = cy - closestY
  const distSq = dx * dx + dy * dy

  if (distSq >= radius * radius) {
    return null
  }

  const dist = Math.sqrt(distSq) || 0.001
  return {
    nx: dx / dist,
    ny: dy / dist,
    overlap: radius - dist,
  }
}

function wakeShape(shape) {
  shape.sleeping = false
  shape.sleepFrames = 0
  shape.touchingLetter = false
}

function getHalfFontSize(fontSize) {
  const px = parseFloat(fontSize)
  if (!Number.isFinite(px)) return fontSize
  const unit = fontSize.slice(String(px).length) || 'px'
  return `${px * 0.5}${unit}`
}

function tintLetter(letter, shape) {
  if (!letterTintMap.has(letter)) {
    const styles = getComputedStyle(letter)
    letterTintMap.set(letter, {
      original: styles.color,
      originalFontSize: styles.fontSize,
      sources: new Set(),
    })
  }

  const entry = letterTintMap.get(letter)
  entry.sources.add(shape.uid)
  shape.touchedLetters.add(letter)

  gsap.to(letter, {
    color: shape.color,
    fontSize: getHalfFontSize(entry.originalFontSize),
    duration: 0.22,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

function releaseShapeTints(shape) {
  shape.touchedLetters?.forEach((letter) => {
    const entry = letterTintMap.get(letter)
    if (!entry) return

    entry.sources.delete(shape.uid)

    if (entry.sources.size === 0) {
      gsap.to(letter, {
        color: entry.original,
        fontSize: entry.originalFontSize,
        duration: 0.5,
        ease: 'power2.inOut',
        overwrite: 'auto',
      })
      letterTintMap.delete(letter)
    }
  })

  shape.touchedLetters?.clear()
}

function applyForceField(iconX, iconY, letters) {
  letters.forEach((letter) => {
    const rect = letter.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = cx - iconX
    const dy = cy - iconY
    const dist = Math.hypot(dx, dy)

    if (dist > FORCE_FIELD_RADIUS || dist < 1) return

    const strength = (1 - dist / FORCE_FIELD_RADIUS) ** 1.6
    const pushX = (dx / dist) * strength * 22
    const pushY = (dy / dist) * strength * 10
    const state = getLetterState(letter)

    state.hit = true
    state.x = pushX
    state.y = pushY
    state.rot = (dx / dist) * strength * 7
    state.vx = pushX * 0.04
    state.vy = pushY * 0.04
    state.vr = state.rot * 0.05

    gsap.to(letter, {
      x: pushX,
      y: pushY,
      rotation: state.rot,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    })
  })
}

function spawnForceFieldRing(iconX, iconY) {
  const portal = getShapePortal()
  const ring = document.createElement('div')
  ring.className = 'guild-shape-forcefield'
  portal.appendChild(ring)

  gsap.set(ring, {
    position: 'fixed',
    left: iconX,
    top: iconY,
    xPercent: -50,
    yPercent: -50,
  })

  gsap.fromTo(ring, {
    scale: 0.35,
    opacity: 0.55,
  }, {
    scale: 2.4,
    opacity: 0,
    duration: 0.75,
    ease: 'power2.out',
    onComplete: () => ring.remove(),
  })
}

function resolveShapePair(a, b) {
  if (a.sleeping && b.sleeping) return

  const dx = b.x - a.x
  const dy = b.y - a.y
  const dist = Math.hypot(dx, dy) || 0.001
  const minDist = a.radius + b.radius

  if (dist >= minDist) return

  const nx = dx / dist
  const ny = dy / dist
  const overlap = minDist - dist

  if (a.sleeping) wakeShape(a)
  if (b.sleeping) wakeShape(b)

  a.x -= nx * overlap * 0.5
  a.y -= ny * overlap * 0.5
  b.x += nx * overlap * 0.5
  b.y += ny * overlap * 0.5

  const relVn = (a.vx - b.vx) * nx + (a.vy - b.vy) * ny
  if (relVn > 0) return

  const impulse = relVn * 0.28
  a.vx -= nx * impulse
  a.vy -= ny * impulse
  b.vx += nx * impulse
  b.vy += ny * impulse
}

function settleShapeOnLetter(shape, letter, collision) {
  shape.x += collision.nx * (collision.overlap + 1)
  shape.y += collision.ny * (collision.overlap + 1)
  shape.vx = 0
  shape.vy = 0
  shape.vr = 0
  shape.sleeping = true
  shape.touchingLetter = true
  shape.sleepFrames = SLEEP_FRAMES
  tintLetter(letter, shape)
}

function applyLetterSlide(shape, letter, collision) {
  if (shape.sleeping) return

  const speed = Math.hypot(shape.vx, shape.vy)
  tintLetter(letter, shape)

  if (speed < SLEEP_SPEED && shape.vy >= 0) {
    settleShapeOnLetter(shape, letter, collision)

    const state = getLetterState(letter)
    const impact = Math.min(8, speed + 1.5)

    state.hit = true
    state.vx += collision.nx * impact * LETTER_HIT_SCALE
    state.vy += collision.ny * impact * LETTER_HIT_SCALE * 0.45
    state.vr += collision.nx * 2.5
    return
  }

  const approach = shape.vx * collision.nx + shape.vy * collision.ny
  const tangentX = -collision.ny
  const tangentY = collision.nx
  const tangentSpeed = shape.vx * tangentX + shape.vy * tangentY

  shape.x += collision.nx * (collision.overlap + 2)
  shape.y += collision.ny * (collision.overlap + 2)

  if (approach < 0.15) {
    shape.vx -= collision.nx * approach * (1 + SHAPE_BOUNCE)
    shape.vy -= collision.ny * approach * (1 + SHAPE_BOUNCE)
  }

  shape.vx = tangentX * tangentSpeed * 0.9
  shape.vy = tangentY * tangentSpeed * 0.9 + GRAVITY * 0.4

  const now = performance.now()
  if (!shape.letterHits) shape.letterHits = new Map()
  if (shape.letterHits.get(letter) > now - 160) return
  shape.letterHits.set(letter, now)

  if (speed < 2.8) return

  const state = getLetterState(letter)
  const impact = Math.min(9, speed)

  state.hit = true
  state.vx += collision.nx * impact * LETTER_HIT_SCALE + shape.vx * 0.12
  state.vy += collision.ny * impact * LETTER_HIT_SCALE * 0.5
  state.vr += shape.vx * 0.28
}

function trySleepShape(shape, onFloor) {
  if (shape.dragging || shape.dissolving) return

  const speed = Math.hypot(shape.vx, shape.vy)
  const rotSpeed = Math.abs(shape.vr)

  if (speed < SLEEP_SPEED && rotSpeed < SLEEP_ROT && (onFloor || shape.touchingLetter)) {
    shape.sleepFrames += 1

    if (shape.sleepFrames >= SLEEP_FRAMES) {
      shape.sleeping = true
      shape.vx = 0
      shape.vy = 0
      shape.vr = 0
    }
  } else if (!shape.sleeping) {
    shape.sleepFrames = 0
  }
}

function resolveLetterCollisions(shape, collisionTargets, spawnImmunity) {
  if (spawnImmunity) return

  const hits = []

  collisionTargets.forEach((letter) => {
    const rect = letter.getBoundingClientRect()
    if (!rect.width || !rect.height) return

    const collision = circleRectCollision(shape.x, shape.y, shape.radius, rect)
    if (!collision) return

    hits.push({ letter, collision, depth: collision.overlap })
  })

  hits.sort((a, b) => b.depth - a.depth)

  shape.touchingLetter = hits.length > 0

  hits.slice(0, 2).forEach(({ letter, collision }) => {
    applyLetterSlide(shape, letter, collision)
  })
}

function stepLetters(letters) {
  letters.forEach((letter) => {
    const state = letterStates.get(letter)
    if (!state) return

    state.vx += -state.x * LETTER_SPRING
    state.vy += -state.y * LETTER_SPRING
    state.vr += -state.rot * LETTER_SPRING * 1.15

    state.vx *= LETTER_DAMPING
    state.vy *= LETTER_DAMPING
    state.vr *= LETTER_DAMPING

    state.x += state.vx
    state.y += state.vy
    state.rot += state.vr

    gsap.set(letter, {
      x: state.x,
      y: state.y,
      rotation: state.rot,
      overwrite: 'auto',
    })
  })
}

function lettersAreSettled(letters) {
  return letters.every((letter) => {
    const state = letterStates.get(letter)
    if (!state || !state.hit) return true

    return (
      Math.abs(state.x) < 0.35
      && Math.abs(state.y) < 0.35
      && Math.abs(state.rot) < 0.35
      && Math.abs(state.vx) < 0.08
      && Math.abs(state.vy) < 0.08
      && Math.abs(state.vr) < 0.08
    )
  })
}

function settleLetters(letters) {
  letters.forEach((letter) => {
    const state = letterStates.get(letter)
    if (!state?.hit) return

    gsap.to(letter, {
      x: 0,
      y: 0,
      rotation: 0,
      duration: 0.95,
      ease: 'elastic.out(1, 0.55)',
      overwrite: 'auto',
      onComplete: () => {
        state.x = 0
        state.y = 0
        state.rot = 0
        state.vx = 0
        state.vy = 0
        state.vr = 0
        state.hit = false
      },
    })
  })
}

function updateShapeElement(shape) {
  if (shape.dissolving) return

  gsap.set(shape.el, {
    left: shape.x,
    top: shape.y + (shape.dropOffsetY || 0),
    xPercent: -50,
    yPercent: -50,
    rotation: shape.rot,
    scaleX: shape.scale * (shape.dropScaleX || 1),
    scaleY: shape.scale * (shape.dropScaleY || 1),
    opacity: shape.opacity,
    overwrite: 'auto',
  })
}

function registerLiveShape(shape) {
  liveShapes.add(shape)
  startScrollDropMonitor()
}

function unregisterLiveShape(shape) {
  liveShapes.delete(shape)
}

function applyStomachDrop(scrollDelta) {
  const now = performance.now()
  if (now - lastStomachDropAt < STOMACH_DROP_COOLDOWN_MS) return
  if (Math.abs(scrollDelta) < STOMACH_DROP_THRESHOLD) return

  lastStomachDropAt = now

  const intensity = Math.min(Math.abs(scrollDelta) / 16, 4.8)
  const direction = Math.sign(scrollDelta)

  liveShapes.forEach((shape) => {
    if (!shape.active || shape.dissolving || shape.dragging || shape.age < shape.spawnDelay) return

    wakeShape(shape)

    shape.vy += direction * intensity * 4.4
    shape.vx += direction * intensity * 0.55 + gsap.utils.random(-1, 1) * intensity * 0.2
    shape.vr += direction * intensity * 2.2
    shape.dropOffsetY += scrollDelta * 0.26

    const squashY = direction > 0 ? 0.76 : 1.16
    const squashX = direction > 0 ? 1.12 : 0.9

    gsap.killTweensOf(shape)

    shape.dropScaleX = squashX
    shape.dropScaleY = squashY

    gsap.to(shape, {
      dropScaleX: 1,
      dropScaleY: 1,
      duration: 0.46,
      ease: 'power3.out',
      onUpdate: () => updateShapeElement(shape),
    })
  })
}

function startScrollDropMonitor() {
  if (!scrollDropEnabled || scrollDropLoopId) return

  const sample = () => {
    if (liveShapes.size === 0) {
      scrollDropLoopId = 0
      lastScrollSampleY = window.scrollY
      return
    }

    const scrollY = window.scrollY
    const delta = scrollY - lastScrollSampleY
    lastScrollSampleY = scrollY

    if (Math.abs(delta) >= STOMACH_DROP_THRESHOLD) {
      applyStomachDrop(delta)
    }

    liveShapes.forEach((shape) => {
      if (!shape.dropOffsetY) return
      shape.dropOffsetY *= 0.84

      if (Math.abs(shape.dropOffsetY) < 0.25) {
        shape.dropOffsetY = 0
      }
    })

    scrollDropLoopId = window.requestAnimationFrame(sample)
  }

  scrollDropLoopId = window.requestAnimationFrame(sample)
}

function dissolveShape(shape, onComplete) {
  if (!shape.active || shape.dissolving) return

  shape.active = false
  shape.dissolving = true
  shape.dragging = false
  unregisterLiveShape(shape)
  gsap.killTweensOf(shape)
  releaseShapeTints(shape)

  const el = shape.el
  if (!el?.isConnected) {
    onComplete?.()
    return
  }

  const rect = el.getBoundingClientRect()
  const src = el.src
  const portal = getShapePortal()
  const cols = 5
  const rows = 4
  const pieceW = rect.width / cols
  const pieceH = rect.height / rows
  const originX = shape.x
  const originY = shape.y

  el.style.visibility = 'hidden'
  el.style.pointerEvents = 'none'

  const particles = []

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const piece = document.createElement('div')
      piece.className = 'guild-shape-dust'
      piece.style.width = `${pieceW}px`
      piece.style.height = `${pieceH}px`
      piece.style.backgroundImage = `url(${src})`
      piece.style.backgroundSize = `${rect.width}px ${rect.height}px`
      piece.style.backgroundPosition = `-${col * pieceW}px -${row * pieceH}px`
      portal.appendChild(piece)
      particles.push(piece)

      const offsetX = (col - cols / 2) * pieceW * 0.35
      const offsetY = (row - rows / 2) * pieceH * 0.35

      gsap.set(piece, {
        position: 'fixed',
        left: originX + offsetX,
        top: originY + offsetY,
        xPercent: -50,
        yPercent: -50,
        rotation: shape.rot + gsap.utils.random(-18, 18),
        scale: shape.scale,
        opacity: 1,
      })
    }
  }

  const stagger = 0.018

  particles.forEach((piece, index) => {
    const col = index % cols
    const driftX = gsap.utils.random(-48, 48)
    const driftY = gsap.utils.random(-92, -28)

    gsap.to(piece, {
      x: driftX,
      y: driftY,
      rotation: `+=${gsap.utils.random(-120, 120)}`,
      scale: gsap.utils.random(0.05, 0.25),
      opacity: 0,
      filter: 'blur(10px)',
      duration: gsap.utils.random(0.55, 0.95),
      delay: col * stagger + gsap.utils.random(0, 0.08),
      ease: 'power2.in',
      onComplete: () => piece.remove(),
    })
  })

  window.setTimeout(() => {
    el.remove()
    onComplete?.()
  }, 1100)
}

function bindGlobalDragHandlers() {
  if (bindGlobalDragHandlers.ready) return
  bindGlobalDragHandlers.ready = true

  window.addEventListener('pointermove', (event) => {
    if (!dragState) return

    const { shape, lastX, lastY } = dragState
    const dx = event.clientX - lastX
    const dy = event.clientY - lastY

    shape.x += dx
    shape.y += dy
    shape.vx = dx * 0.55
    shape.vy = dy * 0.55
    shape.vr = dx * 0.08
    shape.stuckFrames = 0
    shape.lastMotion = performance.now()

    dragState.lastX = event.clientX
    dragState.lastY = event.clientY
    dragState.velX = dx
    dragState.velY = dy

    updateShapeElement(shape)
  }, { passive: true })

  const endDrag = (event) => {
    if (!dragState) return

    const { shape, pointerId, velX, velY } = dragState

    shape.dragging = false
    shape.el.style.cursor = 'grab'
    shape.vx = velX * 0.75
    shape.vy = velY * 0.75

    if (shape.el.hasPointerCapture(pointerId)) {
      shape.el.releasePointerCapture(pointerId)
    }

    dragState = null
  }

  window.addEventListener('pointerup', endDrag)
  window.addEventListener('pointercancel', endDrag)
}

function enableShapeDrag(shape) {
  bindGlobalDragHandlers()

  shape.el.classList.add('guild-shape-throw--draggable')
  shape.el.style.pointerEvents = 'auto'
  shape.el.style.touchAction = 'none'

  shape.el.addEventListener('pointerdown', (event) => {
    if (!shape.active || shape.dissolving) return

    event.preventDefault()
    event.stopPropagation()

    wakeShape(shape)
    shape.dragging = true
    shape.stuckFrames = 0
    shape.el.style.cursor = 'grabbing'
    shape.el.setPointerCapture(event.pointerId)

    dragState = {
      shape,
      pointerId: event.pointerId,
      lastX: event.clientX,
      lastY: event.clientY,
      velX: 0,
      velY: 0,
    }
  })
}

function spawnShape(portal, originX, originY, src, size, scale, index, color) {
  const img = document.createElement('img')
  img.className = 'guild-shape-throw'
  img.src = src
  img.alt = ''
  img.draggable = false
  portal.appendChild(img)

  const spread = 42
  const x = originX + gsap.utils.random(-spread, spread)
  const y = originY - 28 - index * 10

  gsap.set(img, {
    position: 'fixed',
    width: size,
    height: 'auto',
  })

  const shape = {
    el: img,
    uid: `shape-${shapeUid += 1}`,
    color,
    x,
    y,
    vx: gsap.utils.random(-1.8, 1.8),
    vy: gsap.utils.random(0.4, 2.2),
    rot: gsap.utils.random(-24, 24),
    vr: gsap.utils.random(-3, 3),
    radius: size * scale * 0.4,
    scale: 0.2,
    opacity: 0,
    active: true,
    dissolving: false,
    dragging: false,
    sleeping: false,
    touchingLetter: false,
    sleepFrames: 0,
    spawnDelay: index * 0.08,
    age: 0,
    stuckFrames: 0,
    lastMotion: performance.now(),
    letterHits: new Map(),
    touchedLetters: new Set(),
    bornAt: performance.now(),
    dropScaleX: 1,
    dropScaleY: 1,
    dropOffsetY: 0,
  }

  enableShapeDrag(shape)
  registerLiveShape(shape)
  return shape
}

function unstuckShape(shape) {
  if (shape.sleeping) return

  wakeShape(shape)
  shape.vy += 1.4
  shape.vx += gsap.utils.random(-2.8, 2.8)
  shape.y += 10
  shape.stuckFrames = 0
}

function runGravitySimulation({
  originX,
  originY,
  trigger,
  collisionTargets = [],
  useCollisions = true,
}) {
  const portal = getShapePortal()
  const size = getShapeSize()
  const peakScale = getShapeScale()
  const floor = window.innerHeight + 100
  const shapes = GUILD_SHAPES.map((src, index) => spawnShape(
    portal,
    originX,
    originY,
    src,
    size,
    peakScale,
    index,
    SHAPE_COLORS[index % SHAPE_COLORS.length],
  ))
  const startedAt = performance.now()

  collisionTargets.forEach((letter) => {
    gsap.killTweensOf(letter)
  })

  runningSimulations += 1
  let rafId = 0
  let lastTime = performance.now()
  let settleQueued = false
  let cleanedUp = false

  const cleanup = (forceSnap = true) => {
    if (cleanedUp) return
    cleanedUp = true
    window.cancelAnimationFrame(rafId)

    let pending = 0

    shapes.forEach((shape) => {
      if (!shape.active || shape.dissolving) return

      pending += 1
      dissolveShape(shape, () => {
        pending -= 1
        if (pending === 0) {
          runningSimulations = Math.max(0, runningSimulations - 1)
        }
      })
    })

    if (pending === 0) {
      runningSimulations = Math.max(0, runningSimulations - 1)
    }

    if (useCollisions && forceSnap) settleLetters(collisionTargets)
  }

  const tick = (now) => {
    if (cleanedUp) return

    const dt = Math.min(0.05, (now - lastTime) / 1000)
    const delta = dt * 60
    lastTime = now

    let activeCount = 0

    shapes.forEach((shape) => {
      if (!shape.active || shape.dissolving) return

      shape.age += dt

      if (shape.age < shape.spawnDelay) {
        shape.opacity = gsap.utils.mapRange(0, shape.spawnDelay, 0, 1, shape.age)
        shape.scale = gsap.utils.mapRange(0, shape.spawnDelay, 0.2, peakScale, shape.age)
        updateShapeElement(shape)
        activeCount += 1
        return
      }

      if (shape.dragging) {
        shape.opacity = 1
        shape.scale = peakScale
        updateShapeElement(shape)

        if (useCollisions && collisionTargets.length) {
          collisionTargets.forEach((letter) => {
            const rect = letter.getBoundingClientRect()
            const collision = circleRectCollision(shape.x, shape.y, shape.radius, rect)
            if (collision) tintLetter(letter, shape)
          })
        }

        activeCount += 1
        return
      }

      if (shape.sleeping) {
        shape.opacity = 1
        shape.scale = peakScale
        updateShapeElement(shape)
        activeCount += 1
        return
      }

      const spawnImmunity = shape.age < 0.22
      const prevX = shape.x
      const prevY = shape.y
      let onFloor = false

      shape.opacity = 1
      shape.scale = peakScale
      shape.vy += GRAVITY * delta
      shape.vx *= AIR_DRAG
      shape.vy *= AIR_DRAG
      shape.vr *= 0.986

      shape.x += shape.vx * delta
      shape.y += shape.vy * delta
      shape.rot += shape.vr * delta

      if (useCollisions && collisionTargets.length) {
        resolveLetterCollisions(shape, collisionTargets, spawnImmunity)
      }

      for (let i = 0; i < shapes.length; i += 1) {
        for (let j = i + 1; j < shapes.length; j += 1) {
          const a = shapes[i]
          const b = shapes[j]
          if (!a.active || !b.active || a.dissolving || b.dissolving) continue
          if (a.age < a.spawnDelay || b.age < b.spawnDelay) continue
          if (a.dragging && b.dragging) continue
          resolveShapePair(a, b)
        }
      }

      const moved = Math.hypot(shape.x - prevX, shape.y - prevY)
      if (moved > 0.35) {
        shape.lastMotion = now
        shape.stuckFrames = 0
      } else if (Math.hypot(shape.vx, shape.vy) < 0.55) {
        shape.stuckFrames += 1
      }

      if (shape.stuckFrames > STUCK_FRAME_LIMIT) {
        unstuckShape(shape)
      }

      if (now - shape.bornAt > SHAPE_LIFETIME_MS) {
        dissolveShape(shape, () => {
          if (shapes.every((item) => !item.active || item.dissolving)) {
            runningSimulations = Math.max(0, runningSimulations - 1)
          }
        })
      } else if (shape.y - shape.radius > floor) {
        dissolveShape(shape)
      } else if (shape.y + shape.radius > window.innerHeight - 10) {
        shape.y = window.innerHeight - 10 - shape.radius
        onFloor = true

        if (Math.abs(shape.vy) > 1.2) {
          shape.vy *= -FLOOR_BOUNCE
          shape.vx *= 0.82
        } else {
          shape.vy = 0
          shape.vx *= 0.72
          shape.vr *= 0.5
        }
      }

      if (shape.x < shape.radius) {
        shape.x = shape.radius
        shape.vx = Math.abs(shape.vx) * SHAPE_BOUNCE
      } else if (shape.x > window.innerWidth - shape.radius) {
        shape.x = window.innerWidth - shape.radius
        shape.vx = -Math.abs(shape.vx) * SHAPE_BOUNCE
      }

      trySleepShape(shape, onFloor)

      updateShapeElement(shape)
      activeCount += 1
    })

    if (useCollisions && collisionTargets.length) {
      stepLetters(collisionTargets)
    }

    const shapesDone = activeCount === 0
    const lettersDone = !useCollisions || lettersAreSettled(collisionTargets)

    if (shapesDone && lettersDone) {
      if (!settleQueued && useCollisions) {
        settleQueued = true
        settleLetters(collisionTargets)
      }

      if (shapes.every((shape) => !shape.active || shape.dissolving)) {
        runningSimulations = Math.max(0, runningSimulations - 1)
      }
      return
    }

    if (shapesDone && useCollisions && !lettersDone && !settleQueued) {
      settleQueued = true
      window.setTimeout(() => settleLetters(collisionTargets), 180)
    }

    if (now - startedAt > SHAPE_LIFETIME_MS + 1200) {
      cleanup(true)
      return
    }

    rafId = window.requestAnimationFrame(tick)
  }

  rafId = window.requestAnimationFrame(tick)

  window.setTimeout(() => cleanup(true), SHAPE_LIFETIME_MS + 400)
}

function playShapeThrow(trigger, reducedMotion) {
  if (reducedMotion || runningSimulations >= 2) return

  const rect = trigger.getBoundingClientRect()
  if (!rect.width || !rect.height) return

  const originX = rect.left + rect.width / 2
  const originY = rect.top + rect.height / 2
  const heading = trigger.closest('.display-heading')
  const useCollisions = Boolean(heading)
  const collisionTargets = useCollisions ? getCollisionTargets(heading) : []

  if (useCollisions && collisionTargets.length) {
    spawnForceFieldRing(originX, originY)
    applyForceField(originX, originY, collisionTargets)
  }

  runGravitySimulation({
    originX,
    originY,
    trigger,
    collisionTargets,
    useCollisions,
  })

  gsap.fromTo(trigger, {
    scale: 1,
  }, {
    scale: 1.1,
    duration: 0.14,
    yoyo: true,
    repeat: 1,
    ease: 'power2.out',
    overwrite: 'auto',
  })
}

function bindShapeThrow(trigger, reducedMotion) {
  if (trigger.dataset.shapeThrowBound === 'true') return
  trigger.dataset.shapeThrowBound = 'true'

  trigger.classList.add('display-icon--shape-ready')

  const run = () => playShapeThrow(trigger, reducedMotion)

  trigger.addEventListener('mouseenter', run)

  if (!trigger.getAttribute('aria-hidden')) {
    trigger.addEventListener('focusin', run)
  }

  if ('ontouchstart' in window) {
    trigger.addEventListener('touchstart', (event) => {
      if (event.touches.length !== 1) return
      run()
    }, { passive: true })
  }
}

function initSectionShapeDrift(reducedMotion) {
  const sections = document.querySelectorAll('.site-section, .guild-partner-gallery')

  sections.forEach((section, sectionIndex) => {
    if (section.querySelector('.guild-shape-drift')) return

    const drift = document.createElement('div')
    drift.className = 'guild-shape-drift'
    drift.setAttribute('aria-hidden', 'true')

    const placements = [
      { top: '8%', left: '4%', shape: 0, size: 108 },
      { top: '18%', right: '6%', shape: 1, size: 88 },
      { bottom: '12%', left: '10%', shape: 2, size: 76 },
      { bottom: '8%', right: '8%', shape: 3, size: 96 },
    ]

    placements.forEach((place, placeIndex) => {
      if ((sectionIndex + placeIndex) % 3 !== 0) return

      const img = document.createElement('img')
      img.className = 'guild-shape-drift__item'
      img.src = GUILD_SHAPES[place.shape]
      img.alt = ''
      img.draggable = false
      img.style.width = `${place.size}px`

      if (place.top) img.style.top = place.top
      if (place.left) img.style.left = place.left
      if (place.right) img.style.right = place.right
      if (place.bottom) img.style.bottom = place.bottom

      drift.appendChild(img)
    })

    if (!drift.children.length) return

    section.classList.add('has-shape-drift')
    section.appendChild(drift)

    if (reducedMotion) return

    gsap.to(drift.querySelectorAll('.guild-shape-drift__item'), {
      y: '+=14',
      rotation: '+=8',
      duration: gsap.utils.random(5, 8),
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.45,
    })
  })
}

export function initGuildShapes() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  scrollDropEnabled = !reducedMotion

  prepareHeadingCollisionTargets()

  document.querySelectorAll(THROW_TARGETS).forEach((trigger) => {
    bindShapeThrow(trigger, reducedMotion)
  })

  initSectionShapeDrift(reducedMotion)
}
