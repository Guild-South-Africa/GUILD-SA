import gsap from 'gsap'

const BUBBLE_COLORS = ['#E1B43E', '#E37226', '#F4B12E', '#FE980F', '#000000', '#E1B43E']
const NUM_POINTS = 120
const SPHERE_RADIUS = 150
const MOBILE_GLOBE_QUERY = '(max-width: 640px)'

function isMobileGlobeViewport() {
  return window.matchMedia(MOBILE_GLOBE_QUERY).matches
}

function sphere(samples, radius) {
  const points = []
  const phi = Math.PI * (3 - Math.sqrt(5))

  for (let i = 0; i < samples; i += 1) {
    const y = 1 - (i / (samples - 1)) * 2
    const radiusAtY = Math.sqrt(1 - y * y)
    const theta = phi * i
    const x = Math.cos(theta) * radiusAtY
    const z = Math.sin(theta) * radiusAtY
    points.push({ x: x * radius, y: y * radius, z: z * radius, index: i })
  }

  return points
}

function createPoint(x, y, z, index) {
  const point = document.createElement('i')
  const pushFactor = 2 + Math.random() * 2
  const rx = x * pushFactor + (Math.random() - 0.5) * 200
  const ry = y * pushFactor + (Math.random() - 0.5) * 200
  const rz = z * pushFactor + (Math.random() - 0.5) * 200

  point.style.setProperty('--x', x)
  point.style.setProperty('--y', y)
  point.style.setProperty('--z', z)
  point.style.setProperty('--rx', rx)
  point.style.setProperty('--ry', ry)
  point.style.setProperty('--rz', rz)
  point.style.setProperty('--dot-color', BUBBLE_COLORS[index % BUBBLE_COLORS.length])

  return point
}

function mountGlobe() {
  const mount = document.querySelector('[data-guild-globe-mount]')
  if (!mount) return null

  if (mount.querySelector('.guild-globe__scene')) {
    return mount.querySelector('.guild-globe__scene')
  }

  mount.innerHTML = `
    <div class="guild-globe__wrapper">
      <div class="guild-globe__scene"></div>
    </div>
  `

  const scene = mount.querySelector('.guild-globe__scene')
  sphere(NUM_POINTS, SPHERE_RADIUS).forEach((point) => {
    scene.appendChild(createPoint(point.x, point.y, point.z, point.index))
  })

  scene.addEventListener('mouseenter', () => {
    scene.style.setProperty('--guild-globe-spread', '1')
  })
  scene.addEventListener('mouseleave', () => {
    scene.style.setProperty('--guild-globe-spread', '0')
  })

  return scene
}

export function destroyCinematicHero() {
  gsap.killTweensOf('.guild-globe__wrapper')
  gsap.killTweensOf('[data-guild-globe-mount]')
  gsap.killTweensOf('.guild-cinematic-hero__content > *')
  gsap.set('.guild-globe__wrapper', { clearProps: 'all' })
  gsap.set('[data-guild-globe-mount]', { clearProps: 'all' })
  document.querySelector('[data-guild-globe-mount]')?.replaceChildren()
  document.querySelector('[data-guild-cinematic-hero]')?.removeAttribute('data-cinematic-init')
}

export function initCinematicHero() {
  const root = document.querySelector('[data-guild-cinematic-hero]')
  if (!root) return
  if (root.dataset.cinematicInit === 'true') return

  destroyCinematicHero()
  root.dataset.cinematicInit = 'true'

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || isMobileGlobeViewport()) {
    root.classList.add('is-static')
    return
  }

  mountGlobe()

  const lines = root.querySelectorAll('.guild-cinematic-hero__headline-line')
  const copy = root.querySelectorAll(
    '.guild-cinematic-hero__lede, .guild-cinematic-hero__note, .guild-cinematic-hero__actions, .guild-cinematic-hero__countdown'
  )

  gsap.fromTo(
    lines,
    { opacity: 0, y: 36 },
    { opacity: 1, y: 0, stagger: 0.12, duration: 1, ease: 'power3.out', delay: 0.25 }
  )

  gsap.fromTo(
    copy,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.85, ease: 'power2.out', delay: 0.55 }
  )

  if (!isMobileGlobeViewport()) {
    gsap.fromTo(
      '[data-guild-globe-mount]',
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 1.1, ease: 'power2.out', delay: 0.4 }
    )
  }
}
