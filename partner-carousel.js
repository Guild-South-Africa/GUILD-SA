import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function initGuildPartnerCarousel() {
  const components = document.querySelectorAll('[data-guild-partner-carousel]')
  if (!components.length) return

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  components.forEach((componentEl) => {
    const stage = componentEl.querySelector('[data-carousel-stage]')
    const figures = [...componentEl.querySelectorAll('[data-carousel-figure]')]
    const panels = [...componentEl.querySelectorAll('[data-carousel-panel]')]

    if (!stage || !figures.length || !panels.length || figures.length !== panels.length) return

    const copyParts = panels.flatMap((panel) => {
      const copy = panel.querySelector('[data-carousel-copy]')
      if (!copy) return []
      return [...copy.querySelectorAll('.guild-partner-carousel__index, h3, p')]
    })

    function rectsOverlap(a, b) {
      return a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top
    }

    function updateImageOverlap() {
      const stageRect = stage.getBoundingClientRect()

      copyParts.forEach((part) => {
        const overlaps = rectsOverlap(stageRect, part.getBoundingClientRect())
        part.classList.toggle('is-over-image', overlaps)
      })
    }

    let activeIndex = -1

    function animatePanelCopy(panel, isEntering) {
      const copy = panel.querySelector('[data-carousel-copy]')
      const cta = panel.querySelector('.guild-partner-carousel__cta')
      if (!copy) return

      if (reducedMotion) {
        gsap.set(copy, { opacity: isEntering ? 1 : 0.35, y: 0 })
        if (cta) gsap.set(cta, { opacity: isEntering ? 1 : 0.6, y: 0 })
        return
      }

      if (isEntering) {
        gsap.fromTo(copy, {
          opacity: 0,
          filter: 'blur(8px)',
        }, {
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          overwrite: 'auto',
        })

        if (cta) {
          gsap.fromTo(cta, {
            opacity: 0,
            y: 14,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.75,
            delay: 0.1,
            ease: 'power3.out',
            overwrite: 'auto',
          })
        }
      } else {
        gsap.to(copy, {
          opacity: 0.22,
          filter: 'blur(3px)',
          duration: 0.6,
          ease: 'power2.inOut',
          overwrite: 'auto',
        })

        if (cta) {
          gsap.to(cta, {
            opacity: 0.4,
            duration: 0.6,
            ease: 'power2.inOut',
            overwrite: 'auto',
          })
        }
      }
    }

    function setActiveIndex(index) {
      if (index === activeIndex) return

      panels.forEach((panel, panelIndex) => {
        const isActive = panelIndex === index
        panel.classList.toggle('is-active', isActive)
        animatePanelCopy(panel, isActive)
      })

      figures.forEach((figure, figureIndex) => {
        const isActive = figureIndex === index
        figure.classList.toggle('is-active', isActive)

        if (reducedMotion) {
          figure.style.opacity = isActive ? '1' : '0'
          return
        }

        gsap.to(figure, {
          opacity: isActive ? 1 : 0,
          scale: isActive ? 1 : 1.03,
          duration: 0.85,
          ease: 'power3.inOut',
          overwrite: true,
        })
      })

      activeIndex = index
    }

    gsap.set(figures, { opacity: 0, scale: 1.03 })
    gsap.set(figures[0], { opacity: 1, scale: 1 })
    setActiveIndex(0)

    const panelCount = Math.max(panels.length - 1, 1)

    ScrollTrigger.create({
      trigger: componentEl,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: updateImageOverlap,
      onRefresh: updateImageOverlap,
      snap: reducedMotion ? false : {
        snapTo: 1 / panelCount,
        duration: { min: 0.35, max: 0.75 },
        delay: 0.06,
        ease: 'power3.inOut',
      },
    })

    window.addEventListener('resize', updateImageOverlap, { passive: true })
    updateImageOverlap()

    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        start: 'top 52%',
        end: 'bottom 48%',
        onToggle: ({ isActive }) => {
          if (isActive) setActiveIndex(index)
        },
      })

      const copy = panel.querySelector('[data-carousel-copy]')
      if (!copy || reducedMotion) return

      gsap.fromTo(copy, {
        y: 28,
      }, {
        y: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: panel,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.55,
          onUpdate: updateImageOverlap,
        },
      })
    })
  })

  ScrollTrigger.refresh()
}
