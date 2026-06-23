import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BUBBLE_COLORS = ['#E1B43E', '#E37226', '#F4B12E', '#FE980F', '#000000', '#E1B43E']
const NUM_POINTS = 120
const SPHERE_RADIUS = 150

let scrollTriggers = []

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

function trackScrollTrigger(config) {
  const trigger = ScrollTrigger.create(config)
  scrollTriggers.push(trigger)
  return trigger
}

export function destroyCinematicHero() {
  scrollTriggers.forEach((trigger) => trigger.kill())
  scrollTriggers = []
  document.getElementById('guild-globe-container')?.remove()
  gsap.killTweensOf('.guild-globe__wrapper')
  gsap.killTweensOf('[data-guild-globe-mount]')
  gsap.killTweensOf('.guild-cinematic-hero__sticky')
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

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('is-static')
    return
  }

  mountGlobe()

  const titles = root.querySelectorAll('.guild-cinematic-hero__title')
  const sticky = root.querySelector('.guild-cinematic-hero__sticky')
  const nextSection = root.nextElementSibling

  gsap.fromTo(
    titles,
    { opacity: 0, y: 50 },
    { opacity: 1, y: 0, stagger: 0.15, duration: 1.2, ease: 'power3.out', delay: 0.35 }
  )

  gsap.fromTo(
    root.querySelectorAll('.guild-cinematic-hero__lede, .guild-cinematic-hero__stat, .guild-cinematic-hero__actions'),
    { opacity: 0, y: 24 },
    { opacity: 1, y: 0, stagger: 0.08, duration: 0.9, ease: 'power2.out', delay: 0.7 }
  )

  trackScrollTrigger({
    id: 'cinematic-hero-zoom',
    trigger: root,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    animation: gsap.to('.guild-globe__wrapper', {
      scale: 20,
      ease: 'none',
    }),
  })

  trackScrollTrigger({
    id: 'cinematic-hero-fade-copy',
    trigger: root,
    start: 'top top',
    end: 'bottom top',
    scrub: true,
    animation: gsap.to(sticky, {
      opacity: 0,
      y: -50,
      ease: 'none',
    }),
  })

  if (nextSection) {
    trackScrollTrigger({
      id: 'cinematic-hero-fade-globe',
      trigger: nextSection,
      start: 'top bottom',
      end: 'top 50%',
      scrub: true,
      animation: gsap.to('[data-guild-globe-mount]', {
        opacity: 0,
        ease: 'none',
      }),
    })
  }

  ScrollTrigger.refresh()
}
