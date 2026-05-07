const footerMounts = document.querySelectorAll('[data-guild-footer]')
const isHomePage = /(^\/$|\/index\.html$)/.test(window.location.pathname)

const guildFooterHTML = `
  <div class="footer-shell">
    <section class="founders-panel" aria-label="GUILD SA founders">
      <div class="footer-heading">
        <div>
          <p class="kicker">Co-founder circle</p>
          <h2>Meet the people building the system.</h2>
        </div>
        <div class="footer-social">
          <img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777213445/Glass_Symbol_polfar.png" alt="" aria-hidden="true">
          <div><strong>@guild.sa</strong><span>Follow the build</span></div>
        </div>
      </div>
      <div class="founder-carousel">
        <div class="founder-track">
          <figure class="founder-card"><img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=82" alt="Murunzi Tharaga portrait"><figcaption><strong>Murunzi Tharaga</strong><span>Co-Founder & Creative Director</span></figcaption></figure>
          <figure class="founder-card"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=82" alt="Thomas Murashidzi portrait"><figcaption><strong>Thomas Murashidzi</strong><span>Co-Founder & Technical Lead</span></figcaption></figure>
          <figure class="founder-card"><img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=82" alt="Eben Mwema portrait"><figcaption><strong>Eben Mwema</strong><span>Co-Founder & Product Lead</span></figcaption></figure>
          <figure class="founder-card"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=82" alt="Ratjatji Malatji portrait"><figcaption><strong>Ratjatji Malatji</strong><span>Co-Founder & Community Lead</span></figcaption></figure>
          <figure class="founder-card"><img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=700&q=82" alt="Murunzi Tharaga portrait"><figcaption><strong>Murunzi Tharaga</strong><span>Co-Founder & Creative Director</span></figcaption></figure>
          <figure class="founder-card"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=82" alt="Thomas Murashidzi portrait"><figcaption><strong>Thomas Murashidzi</strong><span>Co-Founder & Technical Lead</span></figcaption></figure>
          <figure class="founder-card"><img src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=700&q=82" alt="Eben Mwema portrait"><figcaption><strong>Eben Mwema</strong><span>Co-Founder & Product Lead</span></figcaption></figure>
          <figure class="founder-card"><img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=700&q=82" alt="Ratjatji Malatji portrait"><figcaption><strong>Ratjatji Malatji</strong><span>Co-Founder & Community Lead</span></figcaption></figure>
        </div>
      </div>
    </section>
    <section class="footer-categories" aria-label="GUILD SA pathways">
      <h2>Choose your entry point</h2>
      <div class="footer-chips"><a href="/join.html">Students</a><a href="/join.html">Teams</a><a href="/partners.html">Mentors</a><a href="/partners.html">Partners</a><a href="/campus.html">Campus Guild</a><a href="/pipeline.html">Guild Labs</a></div>
    </section>
    <section class="footer-main">
      <div class="footer-contact"><h3>Stay in the loop.</h3><p>Get sprint dates, project drops, partner calls, and campus updates.</p><a href="mailto:guildsagroup@gmail.com">guildsagroup@gmail.com</a></div>
      <div class="footer-links"><div><h3>About</h3><a href="/about.html">Vision</a><a href="/pipeline.html">Pipeline</a><a href="/events.html">Events</a></div><div><h3>Network</h3><a href="/campus.html">Campus Guild</a><a href="/partners.html">Partners</a><a href="/join.html">Join</a></div><div><h3>Signal</h3><a href="/partners.html">Projects</a><a href="/events.html">Demo Day</a><a href="/join.html">Contact</a></div></div>
    </section>
    <div class="footer-wordmark">Guild SA</div>
    <div class="footer-bottom"><span>Build & ship real-world solutions</span><span>Website developed by Occxlnce. (c) GUILD SA. All rights reserved.</span></div>
  </div>
`

footerMounts.forEach((footer) => {
  footer.innerHTML = guildFooterHTML
})

function lerp(start, end, factor) {
  return start + (end - start) * factor
}

function initScrollVelocitySkew() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const main = document.querySelector('main')
  const footer = document.querySelector('footer[data-guild-footer]')
  if (!main || !footer || document.getElementById('scroll-content')) return

  const scrollContent = document.createElement('div')
  scrollContent.id = 'scroll-content'
  scrollContent.className = 'scroll-content'
  main.before(scrollContent)
  scrollContent.append(main, footer)

  let skew = 0
  let lastScrollTop = window.scrollY

  function scrollLoop() {
    const scrollTop = window.scrollY
    const velocity = scrollTop - lastScrollTop
    lastScrollTop = scrollTop
    const maxSkew = 5
    const targetSkew = Math.min(Math.max(velocity * 0.1, -maxSkew), maxSkew)

    skew = lerp(skew, targetSkew, 0.1)
    if (Math.abs(skew) > 0.01) {
      scrollContent.style.transform = `skewY(${skew.toFixed(3)}deg)`
    } else {
      skew = 0
      scrollContent.style.transform = 'skewY(0deg)'
    }

    requestAnimationFrame(scrollLoop)
  }

  scrollLoop()
}

initScrollVelocitySkew()

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

function playAnimation(targets, keyframes, options) {
  const elements = Array.from(targets).filter(Boolean)
  if (!elements.length) return Promise.resolve()

  const animations = elements.map((element, index) => element.animate(keyframes, {
    fill: 'both',
    ...options,
    delay: typeof options.delay === 'function' ? options.delay(element, index) : options.delay,
  }))

  return Promise.all(animations.map((animation) => animation.finished.catch(() => undefined)))
}

async function initGuildLoadingAnimation() {
  const loader = document.querySelector('.guild-loader')
  if (!loader) {
    document.body.classList.remove('is-loading')
    return
  }

  if (!isHomePage || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    loader.classList.add('is-hidden')
    document.body.classList.remove('is-loading')
    return
  }

  const letters = loader.querySelectorAll('.guild-loader__letter')
  const box = loader.querySelector('.guild-loader__box')
  const growingImage = loader.querySelector('.guild-loader__image')
  const wordStart = loader.querySelector('.guild-loader__word-start')
  const wordEnd = loader.querySelector('.guild-loader__word-end')
  const extraImages = loader.querySelectorAll('.guild-loader__image-extra')
  const whiteLetters = loader.querySelectorAll('.guild-loader__white-letter')
  const metaItems = loader.querySelectorAll('.guild-loader__top span, .guild-loader__credit')
  const loaderImages = Array.from(loader.querySelectorAll('img'))

  await Promise.race([
    Promise.all(loaderImages.map((image) => {
      if (image.complete) return Promise.resolve()
      return image.decode ? image.decode().catch(() => undefined) : new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true })
        image.addEventListener('error', resolve, { once: true })
      })
    })),
    wait(900),
  ])

  if (document.fonts?.ready) {
    await Promise.race([document.fonts.ready, wait(700)])
  }

  const easeInOut = 'cubic-bezier(0.87, 0, 0.13, 1)'
  const easeOut = 'cubic-bezier(0.16, 1, 0.3, 1)'

  await Promise.all([
    playAnimation(letters, [
      { transform: 'translateY(105%)' },
      { transform: 'translateY(0)' },
    ], { duration: 1050, easing: easeInOut, delay: (_, index) => index * 28 }),
    playAnimation([box], [
      { width: '0em' },
      { width: '0.92em' },
    ], { duration: 1050, easing: easeInOut, delay: 550 }),
    playAnimation([growingImage], [
      { width: '0%' },
      { width: '100%' },
    ], { duration: 1050, easing: easeInOut, delay: 550 }),
    playAnimation([wordStart], [
      { transform: 'translateX(0em)' },
      { transform: 'translateX(-0.045em)' },
    ], { duration: 1050, easing: easeInOut, delay: 550 }),
    playAnimation([wordEnd], [
      { transform: 'translateX(0em)' },
      { transform: 'translateX(0.045em)' },
    ], { duration: 1050, easing: easeInOut, delay: 550 }),
  ])

  extraImages.forEach((image, index) => {
    image.animate([
      { opacity: 1 },
      { opacity: 0 },
    ], {
      duration: 70,
      delay: index * 390,
      easing: 'linear',
      fill: 'both',
    })
  })

  await wait(860)

  await Promise.all([
    playAnimation([growingImage], [
      { width: '100%', height: '100%' },
      { width: '100vw', height: '100dvh' },
    ], { duration: 1650, easing: easeInOut }),
    playAnimation([box], [
      { width: '0.92em' },
      { width: '112vw' },
    ], { duration: 1650, easing: easeInOut }),
    playAnimation(whiteLetters, [
      { transform: 'translateY(105%)' },
      { transform: 'translateY(0)' },
    ], { duration: 1050, easing: easeOut, delay: (_, index) => 720 + index * 32 }),
    playAnimation(metaItems, [
      { transform: 'translateY(110%)' },
      { transform: 'translateY(0)' },
    ], { duration: 1050, easing: easeOut, delay: (_, index) => 760 + index * 95 }),
  ])

  await playAnimation([loader], [
    { opacity: 1 },
    { opacity: 0 },
  ], { duration: 520, easing: 'ease', delay: 160 })

  loader.classList.add('is-hidden')
  document.body.classList.remove('is-loading')
}

initGuildLoadingAnimation()

function initGuildMenu() {
  const nav = document.querySelector('.site-nav')
  const navInner = document.querySelector('.nav-inner')

  if (!nav || !navInner || nav.querySelector('.guild-menu-button')) return

  const menuId = 'guild-side-menu'
  const menuItems = [
    { href: '/about.html', label: 'About', number: '01' },
    { href: '/pipeline.html', label: 'Pipeline', number: '02' },
    { href: '/campus.html', label: 'Campus', number: '03' },
    { href: '/events.html', label: 'Events', number: '04' },
    { href: '/partners.html', label: 'Partners', number: '05' },
    { href: '/join.html', label: 'Join', number: '06' },
  ]

  const toggle = document.createElement('button')
  toggle.className = 'guild-menu-button'
  toggle.type = 'button'
  toggle.setAttribute('aria-label', 'Open navigation')
  toggle.setAttribute('aria-expanded', 'false')
  toggle.setAttribute('aria-controls', menuId)
  toggle.innerHTML = `
    <span class="guild-menu-button__text" aria-hidden="true">
      <span>Menu</span>
      <span>Close</span>
    </span>
    <span class="guild-menu-button__icon" aria-hidden="true">
      <span></span>
      <span></span>
    </span>
  `

  const menu = document.createElement('div')
  menu.className = 'guild-side-menu'
  menu.id = menuId
  menu.dataset.nav = 'closed'
  menu.hidden = true
  menu.innerHTML = `
    <button class="guild-menu-overlay" type="button" data-menu-close aria-label="Close navigation"></button>
    <aside class="guild-menu-panel" aria-label="Expanded navigation">
      <button class="guild-menu-close" type="button" data-menu-close aria-label="Close navigation">
        <span></span>
        <span></span>
      </button>
      <div class="guild-menu-bg" aria-hidden="true">
        <div class="guild-menu-bg-panel is-orange"></div>
        <div class="guild-menu-bg-panel is-soft"></div>
        <div class="guild-menu-bg-panel is-paper"></div>
      </div>
      <div class="guild-menu-inner">
        <ul class="guild-menu-list">
          ${menuItems.map((item) => `
            <li class="guild-menu-list-item">
              <a class="guild-menu-link" href="${item.href}">
                <span class="guild-menu-link__label">${item.label}</span>
                <span class="guild-menu-link__number">${item.number}</span>
                <span class="guild-menu-link__bg" aria-hidden="true"></span>
              </a>
            </li>
          `).join('')}
        </ul>
        <div class="guild-menu-details">
          <p data-menu-fade>Connect</p>
          <div class="guild-menu-socials">
            <a data-menu-fade href="mailto:guildsagroup@gmail.com">Email</a>
            <a data-menu-fade href="/partners.html">Partner</a>
            <a data-menu-fade href="/events.html">Demo Day</a>
          </div>
        </div>
      </div>
    </aside>
  `

  navInner.appendChild(toggle)
  document.body.appendChild(menu)

  const overlay = menu.querySelector('.guild-menu-overlay')
  const panel = menu.querySelector('.guild-menu-panel')
  const panels = menu.querySelectorAll('.guild-menu-bg-panel')
  const links = menu.querySelectorAll('.guild-menu-link')
  const fadeTargets = menu.querySelectorAll('[data-menu-fade]')
  const buttonText = toggle.querySelector('.guild-menu-button__text')
  const buttonIcon = toggle.querySelector('.guild-menu-button__icon')

  let isAnimating = false

  function cancelMenuAnimations() {
    menu.getAnimations({ subtree: true }).forEach((animation) => animation.cancel())
    toggle.getAnimations({ subtree: true }).forEach((animation) => animation.cancel())
  }

  function setButton(open) {
    nav.classList.toggle('is-menu-open', open)
    document.body.classList.toggle('menu-open', open)
    toggle.setAttribute('aria-expanded', String(open))
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation')
  }

  async function openMenu() {
    if (isAnimating || menu.dataset.nav === 'open') return
    isAnimating = true
    cancelMenuAnimations()
    menu.hidden = false
    menu.dataset.nav = 'open'
    setButton(true)

    await Promise.all([
      playAnimation([buttonText], [
        { transform: 'translateY(0)' },
        { transform: 'translateY(-50%)' },
      ], { duration: 420, easing: 'cubic-bezier(.65,.05,0,1)' }),
      playAnimation([buttonIcon], [
        { transform: 'rotate(0deg)' },
        { transform: 'rotate(315deg)' },
      ], { duration: 520, easing: 'cubic-bezier(.65,.05,0,1)' }),
      playAnimation([overlay], [
        { opacity: 0 },
        { opacity: 1 },
      ], { duration: 520, easing: 'ease' }),
      playAnimation(panels, [
        { transform: 'translateX(104%)' },
        { transform: 'translateX(0)' },
      ], { duration: 640, easing: 'cubic-bezier(.65,.01,.05,.99)', delay: (_, index) => index * 90 }),
      playAnimation(links, [
        { transform: 'translateY(135%) rotate(7deg)' },
        { transform: 'translateY(0) rotate(0deg)' },
      ], { duration: 720, easing: 'cubic-bezier(.16,1,.3,1)', delay: (_, index) => 310 + index * 55 }),
      playAnimation(fadeTargets, [
        { opacity: 0, transform: 'translateY(24px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ], { duration: 560, easing: 'cubic-bezier(.16,1,.3,1)', delay: (_, index) => 470 + index * 55 }),
    ])

    isAnimating = false
  }

  async function closeMenu() {
    if (menu.dataset.nav === 'closed') return
    isAnimating = true
    cancelMenuAnimations()
    menu.dataset.nav = 'closed'
    setButton(false)

    await Promise.all([
      playAnimation([overlay], [
        { opacity: 1 },
        { opacity: 0 },
      ], { duration: 360, easing: 'ease' }),
      playAnimation([panel], [
        { transform: 'translateX(0)' },
        { transform: 'translateX(112%)' },
      ], { duration: 560, easing: 'cubic-bezier(.65,.01,.05,.99)' }),
      playAnimation([buttonText], [
        { transform: 'translateY(-50%)' },
        { transform: 'translateY(0)' },
      ], { duration: 420, easing: 'cubic-bezier(.65,.05,0,1)' }),
      playAnimation([buttonIcon], [
        { transform: 'rotate(315deg)' },
        { transform: 'rotate(0deg)' },
      ], { duration: 420, easing: 'cubic-bezier(.65,.05,0,1)' }),
    ])

    menu.hidden = true
    panel.style.transform = ''
    cancelMenuAnimations()
    isAnimating = false
  }

  toggle.addEventListener('click', () => {
    if (menu.dataset.nav === 'open') {
      closeMenu()
    } else {
      openMenu()
    }
  })

  menu.addEventListener('click', (event) => {
    if (event.target.closest('[data-menu-close]') || event.target.closest('a')) closeMenu()
  })

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu()
  })
}

initGuildMenu()

function initJoinForms() {
  const flow = document.querySelector('[data-join-flow]')
  if (!flow) return

  const tabs = Array.from(flow.querySelectorAll('[data-join-tab]'))
  const forms = Array.from(flow.querySelectorAll('[data-join-form]'))

  const getSteps = (form) => Array.from(form.querySelectorAll('[data-step]'))

  function updateForm(form) {
    const steps = getSteps(form)
    const activeIndex = Number(form.dataset.activeStep || 0)
    const progress = `${((activeIndex + 1) / steps.length) * 100}%`
    const progressBar = form.querySelector('.form-progress span')

    steps.forEach((step, index) => {
      step.classList.toggle('is-active', index === activeIndex)
    })

    form.classList.toggle('is-first-step', activeIndex === 0)
    form.classList.toggle('is-final-step', activeIndex === steps.length - 1)
    if (progressBar) progressBar.style.setProperty('--progress', progress)
  }

  function setActiveForm(type) {
    tabs.forEach((tab) => {
      const selected = tab.dataset.joinTab === type
      tab.classList.toggle('is-active', selected)
      tab.setAttribute('aria-selected', String(selected))
    })

    forms.forEach((form) => {
      const selected = form.dataset.joinForm === type
      form.hidden = !selected
      form.classList.toggle('is-active', selected)
      if (selected) {
        updateForm(form)
        const firstField = form.querySelector('.typeform-step.is-active input, .typeform-step.is-active textarea, .typeform-step.is-active select')
        window.setTimeout(() => firstField?.focus({ preventScroll: true }), 80)
      }
    })
  }

  function validateStep(step) {
    const fields = Array.from(step.querySelectorAll('input, textarea, select'))
    const invalidField = fields.find((field) => !field.checkValidity())

    fields.forEach((field) => field.classList.add('is-touched'))

    if (invalidField) {
      invalidField.reportValidity()
      return false
    }

    return true
  }

  function moveStep(form, direction) {
    const steps = getSteps(form)
    const activeIndex = Number(form.dataset.activeStep || 0)
    const nextIndex = Math.min(Math.max(activeIndex + direction, 0), steps.length - 1)
    const status = form.querySelector('[data-form-status]')

    if (direction > 0 && !validateStep(steps[activeIndex])) {
      if (status) {
        status.textContent = 'Fill this one in, then keep moving.'
        status.className = 'form-note is-error'
      }
      return
    }

    if (status) {
      status.textContent = ''
      status.className = 'form-note'
    }

    form.dataset.activeStep = String(nextIndex)
    updateForm(form)

    const activeField = steps[nextIndex].querySelector('input:not([type="radio"]), textarea, select')
    window.setTimeout(() => activeField?.focus({ preventScroll: true }), 120)
  }

  function submitForm(form) {
    const steps = getSteps(form)
    const activeIndex = Number(form.dataset.activeStep || 0)
    const status = form.querySelector('[data-form-status]')

    if (!validateStep(steps[activeIndex]) || !form.checkValidity()) {
      if (status) {
        status.textContent = 'One answer still needs attention.'
        status.className = 'form-note is-error'
      }
      return
    }

    const data = new FormData(form)
    const lines = Array.from(data.entries())
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key}: ${value}`)

    const recipient = form.dataset.recipient
    const subject = form.dataset.subject
    const body = [
      subject,
      '',
      ...lines,
      '',
      'Sent from the GUILD SA join page.',
    ].join('\n')

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    if (status) {
      status.textContent = 'Your email draft is ready. Send it to complete the signup.'
      status.className = 'form-note is-success'
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => setActiveForm(tab.dataset.joinTab))
  })

  document.querySelectorAll('[data-join-open]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const type = trigger.dataset.joinOpen || 'student'
      setActiveForm(type)
      document.getElementById('application-flow')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    })
  })

  forms.forEach((form) => {
    form.dataset.activeStep = '0'
    updateForm(form)

    form.addEventListener('click', (event) => {
      if (event.target.closest('[data-form-next]')) moveStep(form, 1)
      if (event.target.closest('[data-form-back]')) moveStep(form, -1)
    })

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      submitForm(form)
    })

    form.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' || event.target.matches('textarea')) return
      event.preventDefault()
      if (form.classList.contains('is-final-step')) {
        submitForm(form)
      } else {
        moveStep(form, 1)
      }
    })

    form.querySelectorAll('.choice-grid input').forEach((input) => {
      input.addEventListener('change', () => {
        window.setTimeout(() => {
          if (!form.classList.contains('is-final-step')) moveStep(form, 1)
        }, 180)
      })
    })
  })
}

initJoinForms()

function initCampusHighlightCards() {
  const board = document.querySelector('[data-campus-cards]')
  if (!board || !window.matchMedia('(pointer: fine)').matches) return

  const cards = Array.from(document.querySelectorAll('.campus-event-card'))
  let topLayer = 30

  cards.forEach((card) => {
    let startX = 0
    let startY = 0
    let baseX = Number(card.dataset.offsetX || 0)
    let baseY = Number(card.dataset.offsetY || 0)
    let targetX = baseX
    let targetY = baseY
    let currentX = baseX
    let currentY = baseY
    let previousX = baseX
    let previousY = baseY
    let tilt = 0
    let targetTilt = 0
    let frame = null
    let dragging = false
    let moved = false

    const render = () => {
      const follow = dragging ? 0.58 : 0.24
      previousX = currentX
      previousY = currentY
      currentX += (targetX - currentX) * follow
      currentY += (targetY - currentY) * follow

      const velocityX = currentX - previousX
      const velocityY = currentY - previousY
      const velocityTilt = Math.max(Math.min(velocityX * 0.42 + velocityY * 0.08, 13), -13)
      targetTilt = dragging ? velocityTilt : 0
      tilt += (targetTilt - tilt) * 0.22

      card.style.setProperty('--drag-x', `${currentX.toFixed(2)}px`)
      card.style.setProperty('--drag-y', `${currentY.toFixed(2)}px`)
      card.style.setProperty('--paper-tilt', `${tilt.toFixed(2)}deg`)

      if (
        dragging ||
        Math.abs(targetX - currentX) > 0.08 ||
        Math.abs(targetY - currentY) > 0.08 ||
        Math.abs(tilt) > 0.08
      ) {
        frame = requestAnimationFrame(render)
      } else {
        currentX = targetX
        currentY = targetY
        tilt = 0
        card.style.setProperty('--x', `${currentX.toFixed(2)}px`)
        card.style.setProperty('--y', `${currentY.toFixed(2)}px`)
        card.style.removeProperty('--drag-x')
        card.style.removeProperty('--drag-y')
        card.style.removeProperty('--paper-tilt')
        card.classList.remove('is-settling')
        frame = null
      }
    }

    const startRender = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    card.addEventListener('pointerdown', (event) => {
      if (event.button !== 0) return
      startX = event.clientX
      startY = event.clientY
      baseX = Number(card.dataset.offsetX || 0)
      baseY = Number(card.dataset.offsetY || 0)
      targetX = baseX
      targetY = baseY
      currentX = baseX
      currentY = baseY
      previousX = baseX
      previousY = baseY
      dragging = true
      moved = false
      card.style.setProperty('--drag-x', `${currentX.toFixed(2)}px`)
      card.style.setProperty('--drag-y', `${currentY.toFixed(2)}px`)
      card.style.setProperty('--paper-tilt', '0deg')
      card.style.zIndex = String(topLayer++)
      card.classList.add('is-dragging')
      card.classList.remove('is-settling')
      card.setPointerCapture(event.pointerId)
      startRender()
    })

    card.addEventListener('pointermove', (event) => {
      if (!card.hasPointerCapture(event.pointerId)) return
      const x = baseX + event.clientX - startX
      const y = baseY + event.clientY - startY
      if (Math.abs(event.clientX - startX) + Math.abs(event.clientY - startY) > 6) moved = true
      targetX = x
      targetY = y
      startRender()
    })

    card.addEventListener('pointerup', (event) => {
      if (!card.hasPointerCapture(event.pointerId)) return
      card.releasePointerCapture(event.pointerId)
      const x = baseX + event.clientX - startX
      const y = baseY + event.clientY - startY
      dragging = false
      targetX = x
      targetY = y
      card.dataset.offsetX = String(x)
      card.dataset.offsetY = String(y)
      card.style.setProperty('--x', `${x}px`)
      card.style.setProperty('--y', `${y}px`)
      card.classList.remove('is-dragging')
      card.classList.add('is-settling')
      startRender()

      if (moved) {
        event.preventDefault()
        card.dataset.justDragged = 'true'
        window.setTimeout(() => {
          delete card.dataset.justDragged
        }, 0)
      }
    })

    card.addEventListener('pointercancel', () => {
      dragging = false
      card.classList.remove('is-dragging')
      card.classList.add('is-settling')
      startRender()
    })

    card.addEventListener('click', (event) => {
      if (card.dataset.justDragged === 'true') event.preventDefault()
    })
  })
}

initCampusHighlightCards()

function splitWaveText(element) {
  if (element.dataset.waveSplit === 'true') return Array.from(element.querySelectorAll('.char'))

  const chars = []
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      return node.nodeValue ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
    },
  })
  const textNodes = []

  while (walker.nextNode()) {
    textNodes.push(walker.currentNode)
  }

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment()
    node.nodeValue.split('').forEach((char) => {
      const span = document.createElement('span')
      span.className = 'char'
      span.style.setProperty('--char-index', chars.length)
      span.textContent = char
      fragment.appendChild(span)
      chars.push(span)
    })
    node.parentNode.replaceChild(fragment, node)
  })

  element.classList.add('wave-text')
  element.dataset.waveSplit = 'true'
  return chars
}

function initHeadingWave() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const waveTargets = document.querySelectorAll([
    'h1',
    'h2',
    'h3',
    '.eyebrow',
    '.kicker',
    '.index',
    '.nav-links a',
    '.nav-cta',
    '.mobile-nav a',
    '.button',
    '.system-node strong',
    '.pipeline-step span',
    '.quote-block p',
    '.footer-wordmark',
    '.footer-chips a',
    '.footer-social strong',
    '.footer-social span',
    '.founder-card figcaption strong',
    '.founder-card figcaption span',
  ].join(','))

  waveTargets.forEach((target) => {
    splitWaveText(target)
  })
}

initHeadingWave()

if (!isHomePage) {
  const cursorFollower = document.createElement('div')
  cursorFollower.className = 'cursor-symbol'
  cursorFollower.setAttribute('aria-hidden', 'true')
  cursorFollower.innerHTML = '<img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777213445/Glass_Symbol_polfar.png" alt="">'
  document.body.appendChild(cursorFollower)

  let cursorX = window.innerWidth / 2
  let cursorY = window.innerHeight / 2
  let followerX = cursorX
  let followerY = cursorY
  let cursorActive = false

  function animateCursorFollower() {
    followerX += (cursorX - followerX) * 0.18
    followerY += (cursorY - followerY) * 0.18
    cursorFollower.style.transform = `translate3d(${followerX.toFixed(2)}px, ${followerY.toFixed(2)}px, 0) translate(-50%, -50%)`
    requestAnimationFrame(animateCursorFollower)
  }

  window.addEventListener('pointermove', (event) => {
    if (event.pointerType === 'touch') return
    cursorX = event.clientX
    cursorY = event.clientY
    if (!cursorActive) {
      cursorActive = true
      cursorFollower.classList.add('is-active')
    }
  }, { passive: true })

  window.addEventListener('pointerleave', () => {
    cursorActive = false
    cursorFollower.classList.remove('is-active')
  })

  animateCursorFollower()
}

const revealItems = document.querySelectorAll('.reveal')

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    }
  })
}, {
  threshold: 0.18,
  rootMargin: '0px 0px -8% 0px',
})

revealItems.forEach((item, index) => {
  item.style.setProperty('--stagger', index % 5)
  observer.observe(item)
})

function initSurfaceTilt() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const surfaces = document.querySelectorAll([
    '.card',
    '.panel',
    '.project-card',
    '.compare-cell',
    '.timeline-row',
    '.quote-block',
    '.story-panel',
  ].join(','))

  surfaces.forEach((surface) => {
    surface.classList.add('is-tilting')

    surface.addEventListener('pointermove', (event) => {
      const rect = surface.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      surface.style.setProperty('--tilt-x', `${(x * 4).toFixed(2)}deg`)
      surface.style.setProperty('--tilt-y', `${(y * -4).toFixed(2)}deg`)
    }, { passive: true })

    surface.addEventListener('pointerleave', () => {
      surface.style.setProperty('--tilt-x', '0deg')
      surface.style.setProperty('--tilt-y', '0deg')
    })
  })
}

initSurfaceTilt()

function initCardHoverPreviews() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const previewTarget = [
    '.compare-cell.positive',
    '.story-panel.feature',
    '.project-card',
    '.pipeline-step',
    '.system-node',
    '.card',
    '.panel',
  ].map((selector) => document.querySelector(selector)).find(Boolean)

  if (!previewTarget || document.querySelector('.hover-preview-plane')) return

  const previewImages = [
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=82',
    'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?auto=format&fit=crop&w=900&q=82',
  ]

  const preview = document.createElement('div')
  preview.className = 'hover-preview-plane'
  preview.setAttribute('aria-hidden', 'true')
  preview.innerHTML = `
    <img class="hover-preview-img is-red" alt="">
    <img class="hover-preview-img is-main" alt="">
    <img class="hover-preview-img is-blue" alt="">
  `
  document.body.appendChild(preview)

  const previewLayers = Array.from(preview.querySelectorAll('img'))
  const state = {
    targetX: window.innerWidth / 2,
    targetY: window.innerHeight / 2,
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
    previousX: window.innerWidth / 2,
    previousY: window.innerHeight / 2,
    visible: false,
    activeTarget: null,
  }

  function setPreviewImage(src) {
    previewLayers.forEach((image) => {
      if (image.src !== src) image.src = src
    })
  }

  previewTarget.classList.add('has-hover-preview')
  if (!previewTarget.dataset.previewImage) {
    previewTarget.dataset.previewImage = previewImages[0]
  }

  previewTarget.addEventListener('pointerenter', (event) => {
    state.visible = true
    state.activeTarget = previewTarget
    state.targetX = event.clientX
    state.targetY = event.clientY
    setPreviewImage(previewTarget.dataset.previewImage)
    preview.classList.add('is-visible')
    previewTarget.classList.add('is-preview-active')
  })

  previewTarget.addEventListener('pointermove', (event) => {
    state.targetX = event.clientX
    state.targetY = event.clientY
  }, { passive: true })

  previewTarget.addEventListener('pointerleave', () => {
    state.visible = false
    previewTarget.classList.remove('is-preview-active')
    preview.classList.remove('is-visible')
    state.activeTarget = null
  })

  function animatePreview() {
    state.previousX = state.x
    state.previousY = state.y
    state.x += (state.targetX - state.x) * 0.18
    state.y += (state.targetY - state.y) * 0.18

    const velocityX = state.x - state.previousX
    const velocityY = state.y - state.previousY
    const speed = Math.min(Math.hypot(velocityX, velocityY), 34)
    const skew = Math.max(Math.min(velocityX * 0.16, 8), -8)
    const lift = Math.max(Math.min(velocityY * -0.08, 6), -6)
    const split = (state.visible ? 2.5 : 0) + speed * 0.12

    preview.style.setProperty('--preview-x', `${state.x.toFixed(2)}px`)
    preview.style.setProperty('--preview-y', `${state.y.toFixed(2)}px`)
    preview.style.setProperty('--preview-skew', `${skew.toFixed(2)}deg`)
    preview.style.setProperty('--preview-lift', `${lift.toFixed(2)}deg`)
    preview.style.setProperty('--preview-split', `${split.toFixed(2)}px`)
    preview.style.setProperty('--preview-scale', state.visible ? '1' : '0.92')

    requestAnimationFrame(animatePreview)
  }

  animatePreview()
}

initCardHoverPreviews()

const floatingItems = document.querySelectorAll('.float-on-scroll')

function updateScrollMotion() {
  const viewport = window.innerHeight || 1
  floatingItems.forEach((item) => {
    const rect = item.getBoundingClientRect()
    const progress = Math.min(Math.max((viewport - rect.top) / (viewport + rect.height), 0), 1)
    item.style.setProperty('--scroll-shift', progress.toFixed(3))
  })
}

window.addEventListener('scroll', updateScrollMotion, { passive: true })
window.addEventListener('resize', updateScrollMotion)
updateScrollMotion()

const symbolCard = document.querySelector('.hero-symbol-card')

if (symbolCard && window.matchMedia('(pointer: fine)').matches) {
  const homeCursorSymbol = document.createElement('div')
  homeCursorSymbol.className = 'cursor-symbol home-symbol-cursor'
  homeCursorSymbol.setAttribute('aria-hidden', 'true')
  homeCursorSymbol.innerHTML = '<img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777213445/Glass_Symbol_polfar.png" alt="">'
  document.body.appendChild(homeCursorSymbol)

  const state = {
    targetX: window.innerWidth * 0.72,
    targetY: window.innerHeight * 0.48,
    x: window.innerWidth * 0.72,
    y: window.innerHeight * 0.48,
    previousX: window.innerWidth * 0.72,
    previousY: window.innerHeight * 0.48,
    size: 0,
    active: false,
    pointerSeen: false,
  }

  const setTargetFromPointer = (event) => {
    if (event.pointerType === 'touch') return
    state.targetX = event.clientX
    state.targetY = event.clientY
    state.pointerSeen = true
  }

  const updateSymbolSize = () => {
    const viewport = window.innerHeight || 1
    const hero = document.querySelector('.page-hero')
    const heroRect = hero ? hero.getBoundingClientRect() : { bottom: viewport }
    const progress = Math.min(Math.max((viewport * 0.74 - heroRect.bottom) / (viewport * 0.82), 0), 1)
    const maxSize = Math.min(Math.max(window.innerWidth * 0.28, 260), 520)
    const minSize = window.innerWidth < 760 ? 86 : 118
    state.size = Math.round(maxSize - (maxSize - minSize) * progress)
    state.active = progress > 0.02
    document.body.classList.toggle('symbol-following', state.active)
    homeCursorSymbol.classList.toggle('is-active', state.active)
    homeCursorSymbol.style.setProperty('--symbol-size', `${state.size}px`)
  }

  const animateSymbol = () => {
    state.previousX = state.x
    state.previousY = state.y
    const followStrength = state.active ? 0.18 : 0.12
    state.x += (state.targetX - state.x) * followStrength
    state.y += (state.targetY - state.y) * followStrength
    const velocityX = state.x - state.previousX
    const velocityY = state.y - state.previousY
    const tilt = Math.max(Math.min(velocityX * 0.12, 10), -10)
    const travel = Math.min(Math.hypot(velocityX, velocityY), 28)
    const scale = state.active ? 1 + travel * 0.0018 : 1
    homeCursorSymbol.style.setProperty('--symbol-x', `${state.x.toFixed(2)}px`)
    homeCursorSymbol.style.setProperty('--symbol-y', `${state.y.toFixed(2)}px`)
    homeCursorSymbol.style.setProperty('--symbol-tilt', `${tilt.toFixed(2)}deg`)
    homeCursorSymbol.style.setProperty('--symbol-follow-scale', scale.toFixed(3))
    requestAnimationFrame(animateSymbol)
  }

  window.addEventListener('pointermove', setTargetFromPointer, { passive: true })
  window.addEventListener('scroll', updateSymbolSize, { passive: true })
  window.addEventListener('resize', updateSymbolSize)
  updateSymbolSize()
  animateSymbol()
}
