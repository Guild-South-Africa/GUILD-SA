import { initCinematicHero, destroyCinematicHero } from './cinematic-hero.js'
import { initGuildPartnerCarousel } from './partner-carousel.js'
import { initGuildShapes } from './guild-shapes.js'
import { initSpectrumHover } from './spectrum-hover.js'
import { initGuildSystemSlider } from './system-slider.js'
import { initDisplayHeadingIcons } from './display-icons.js'


const isHomePage = window.location.pathname === '/'

const guildFooterHTML = `
  <div class="footer-shell">
    <section class="footer-categories" aria-label="GUILD SA pathways">
      <h2>Choose your entry point</h2>
      <div class="footer-chips"><a href="/join">Students</a><a href="/join">Teams</a><a href="/partners">Mentors</a><a href="/partners">Partners</a><a href="/campus">Campus Guild</a><a href="/pipeline">Guild Labs</a></div>
    </section>
    <section class="footer-main">
      <div class="footer-contact"><h3>Stay in the loop.</h3><p>Get sprint dates, project drops, partner calls, and campus updates.</p><a href="mailto:guildsagroup@gmail.com">guildsagroup@gmail.com</a></div>
      <div class="footer-links"><div><h3>About</h3><a href="/about">Vision</a><a href="/pipeline">Pipeline</a><a href="/events">Events</a></div><div><h3>Network</h3><a href="/campus">Campus Guild</a><a href="/partners">Partners</a><a href="/join">Join</a></div><div><h3>Signal</h3><a href="/partners">Projects</a><a href="/events">Demo Day</a><a href="/join">Contact</a></div></div>
    </section>
    <div class="footer-wordmark">Guild SA</div>
    <div class="footer-bottom"><span>Build & ship real-world solutions</span><span>Website developed by Occxlnce. (c) GUILD SA. All rights reserved.</span></div>
  </div>
`

function mountGuildFooter() {
  document.querySelectorAll('[data-guild-footer]').forEach((footer) => {
    if (footer.dataset.footerMounted === 'true') return
    footer.innerHTML = guildFooterHTML
    footer.dataset.footerMounted = 'true'
  })
}

mountGuildFooter()

const guildLoaderHTML = `
  <section class="guild-loader" aria-label="Loading GUILD SA">
    <div class="guild-loader__stage">
      <div class="guild-loader__word" aria-hidden="true">
        <div class="guild-loader__word-start">
          <span class="guild-loader__letter">G</span>
          <span class="guild-loader__letter">u</span>
          <span class="guild-loader__letter">i</span>
        </div>
        <div class="guild-loader__box">
          <div class="guild-loader__box-inner">
            <div class="guild-loader__image">
              <div class="guild-loader__image-wrap">
                <video
                  class="guild-loader__video"
                  autoplay
                  muted
                  loop
                  playsinline
                  webkit-playsinline
                  preload="auto"
                  poster="https://res.cloudinary.com/dgwtaivvf/video/upload/so_0,f_jpg,q_auto:good,w_1200/v1778581653/GUILD_BC_vlf6cv.mp4"
                >
                  <source src="https://res.cloudinary.com/dgwtaivvf/video/upload/f_mp4,vc_h264,ac_none,q_auto:good/v1778581653/GUILD_BC_vlf6cv.mp4" type="video/mp4">
                  <source src="https://res.cloudinary.com/dgwtaivvf/video/upload/f_webm,vc_vp9,ac_none,q_auto:good/v1778581653/GUILD_BC_vlf6cv.mp4" type="video/webm">
                </video>
              </div>
            </div>
          </div>
        </div>
        <div class="guild-loader__word-end">
          <span class="guild-loader__letter">l</span>
          <span class="guild-loader__letter">d</span>
        </div>
      </div>
    </div>
    <div class="guild-loader__content" aria-hidden="true">
      <div class="guild-loader__top">
        <span>Guild SA</span>
        <span>Build & ship real-world solutions</span>
      </div>
      <div class="guild-loader__bottom">
        <div class="guild-loader__brand">
          <span class="guild-loader__white-letter">G</span>
          <span class="guild-loader__white-letter">u</span>
          <span class="guild-loader__white-letter">i</span>
          <span class="guild-loader__white-letter">l</span>
          <span class="guild-loader__white-letter">d</span>
          <span class="guild-loader__white-letter is-space">S</span>
          <span class="guild-loader__white-letter">A</span>
        </div>
        <span class="guild-loader__credit">Execution becomes signal.</span>
      </div>
    </div>
  </section>
`

function mountGuildLoader() {
  if (!document.querySelector('link[data-guild-loader-preload]')) {
    const preload = document.createElement('link')
    preload.rel = 'preload'
    preload.as = 'video'
    preload.href = 'https://res.cloudinary.com/dgwtaivvf/video/upload/f_mp4,vc_h264,ac_none,q_auto:good/v1778581653/GUILD_BC_vlf6cv.mp4'
    preload.type = 'video/mp4'
    preload.dataset.guildLoaderPreload = 'true'
    document.head.appendChild(preload)
  }

  document.body.classList.add('is-loading')

  if (document.querySelector('.guild-loader')) return

  document.body.insertAdjacentHTML('afterbegin', guildLoaderHTML)

  const video = document.querySelector('.guild-loader__video')
  if (!video) return

  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.play().catch(() => undefined)
}

mountGuildLoader()

initDisplayHeadingIcons()

function initActivationBanner() {
  const nav = document.querySelector('.site-nav')
  if (!nav || document.querySelector('.guild-activation-banner')) return

  const bannerItems = `
    <strong>GUILD SA AI BUILDATHON 01</strong>
    <span>August 1, 2026 / Eduvos Menlyn Campus / Pretoria</span>
    <em>~100 Campus Pool / 40 Sprint Floor / 10-Hour Live Build</em>
    <b>Applications Now Open</b>
  `
  const banner = document.createElement('aside')
  banner.className = 'guild-activation-banner'
  banner.setAttribute('aria-label', 'GUILD SA AI Buildathon announcement')
  banner.innerHTML = `
    <a href="/join" class="guild-activation-banner__link">
      <span class="guild-activation-banner__track">
        <span class="guild-activation-banner__group">${bannerItems}</span>
        <span class="guild-activation-banner__group" aria-hidden="true">${bannerItems}</span>
      </span>
    </a>
  `

  nav.after(banner)
}

initActivationBanner()

function initHeroPrismCanvas() {
  if (document.querySelector('[data-guild-cinematic-hero]')) return
  const canvas = document.querySelector('[data-hero-prism]')
  if (!canvas) return

  const gl = canvas.getContext('webgl', { antialias: false, alpha: false })
    || canvas.getContext('experimental-webgl', { antialias: false, alpha: false })
  if (!gl) {
    canvas.classList.add('is-unsupported')
    return
  }

  const vertexSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `

  const fragmentSource = `
    precision highp float;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;

    #define PI 3.14159265359
    #define TAU 6.28318530718
    #define MAX_STEPS 74
    #define MAX_DIST 42.0
    #define SURF_DIST 0.001

    float hash(float n) {
      return fract(sin(n) * 43758.5453123);
    }

    mat2 rot(float a) {
      float s = sin(a);
      float c = cos(a);
      return mat2(c, -s, s, c);
    }

    float sdBox(vec3 p, vec3 b) {
      vec3 q = abs(p) - b;
      return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
    }

    float sdSphere(vec3 p, float r) {
      return length(p) - r;
    }

    float sdExtrude(float d2, float z, float h) {
      vec2 w = vec2(d2, abs(z) - h);
      return min(max(w.x, w.y), 0.0) + length(max(w, 0.0));
    }

    float sdBrandAsterisk(vec3 p) {
      float d = 999.0;
      for (int i = 0; i < 3; i++) {
        float angle = float(i) * PI / 3.0;
        vec3 q = p;
        q.xy = rot(angle) * q.xy;
        d = min(d, sdBox(q, vec3(0.2, 1.05, 0.2)));
      }
      return d;
    }

    float sdBrandSemicircle(vec3 p) {
      vec2 q = p.xy;
      float halfDisk = max(length(q) - 1.02, q.y);
      return sdExtrude(halfDisk, p.z, 0.2);
    }

    float sdBrandWave(vec3 p) {
      vec3 q = p;
      q.x = clamp(q.x, -1.55, 1.55);
      float center = 0.17 * sin(q.x * PI * 1.45);
      float ribbon = abs(p.y - center) - 0.16;
      float span = abs(p.x) - 1.55;
      float d2 = max(ribbon, span);
      return sdExtrude(d2, p.z, 0.16);
    }

    float map(vec3 p) {
      vec2 m = (uMouse - 0.5) * 2.0;
      p.xy += m * 0.22;
      p.xz *= rot(sin(uTime * 0.18) * 0.08);
      p.yz *= rot(cos(uTime * 0.14) * 0.06);

      vec3 asterisk = p - vec3(2.75, 1.32 + sin(uTime * 0.55) * 0.11, -0.2);
      asterisk.xy *= rot(uTime * 0.22);
      asterisk.xz *= rot(0.16 + sin(uTime * 0.3) * 0.12);

      vec3 circle = p - vec3(4.55, 1.03 + cos(uTime * 0.48) * 0.09, 0.1);
      circle.xy *= rot(-0.18 + uTime * 0.08);

      vec3 semicircle = p - vec3(2.82, -1.34 + cos(uTime * 0.42) * 0.1, 0.02);
      semicircle.xy *= rot(-0.06 + sin(uTime * 0.28) * 0.08);

      vec3 wave = p - vec3(4.65, -1.4 + sin(uTime * 0.5) * 0.1, -0.08);
      wave.xy *= rot(0.04 + sin(uTime * 0.26) * 0.08);

      float d = sdBrandAsterisk(asterisk);
      d = min(d, sdSphere(circle, 0.94));
      d = min(d, sdBrandSemicircle(semicircle));
      d = min(d, sdBrandWave(wave));
      return d;
    }

    vec3 getNormal(vec3 p) {
      vec2 e = vec2(0.001, 0.0);
      return normalize(vec3(
        map(p + e.xyy) - map(p - e.xyy),
        map(p + e.yxy) - map(p - e.yxy),
        map(p + e.yyx) - map(p - e.yyx)
      ));
    }

    float raymarch(vec3 ro, vec3 rd) {
      float t = 0.0;
      for (int i = 0; i < MAX_STEPS; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        if (abs(d) < SURF_DIST || t > MAX_DIST) break;
        t += d * 0.72;
      }
      return t;
    }

    vec3 getBackground(vec3 rd) {
      vec3 black = vec3(0.0);
      float grain = hash(dot(rd * 120.0, vec3(12.9898, 78.233, 54.53)));
      float stars = step(0.985, grain) * pow(grain, 18.0) * 0.55;
      float amberBand = pow(max(0.0, sin(rd.x * 2.4 + rd.y * 1.6 + uTime * 0.08)), 4.0);
      float emberBand = pow(max(0.0, sin(rd.y * 2.9 - uTime * 0.05)), 3.0);
      return black + vec3(1.0, 0.42, 0.03) * amberBand * 0.11 + vec3(1.0, 0.16, 0.0) * emberBand * 0.07 + vec3(stars);
    }

    vec3 getBrandShapeColor(vec3 p) {
      vec3 yellow = vec3(1.0, 0.82, 0.02);
      vec3 orange = vec3(1.0, 0.43, 0.05);
      if (p.x < 3.65 && p.y > 0.0) return yellow;
      if (p.x < 3.65 && p.y <= 0.0) return orange;
      if (p.x >= 3.65 && p.y <= 0.0) return yellow;
      return orange;
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / min(uResolution.x, uResolution.y);
      uv.x += 0.34;

      vec2 m = (uMouse - 0.5) * 0.46;
      vec3 ro = vec3(m.x * 1.55, m.y * 1.55, 5.35);
      vec3 rd = normalize(vec3(uv, -1.0));
      rd.xy *= rot(m.x * 0.18);
      rd.yz *= rot(m.y * 0.16);

      float t = raymarch(ro, rd);
      vec3 color = vec3(0.0);

      if (t < MAX_DIST) {
        vec3 p = ro + rd * t;
        vec3 normal = getNormal(p);
        vec3 viewDir = normalize(ro - p);
        float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.0);
        vec3 lightDir = normalize(vec3(1.0, 1.0, -0.8));
        vec3 halfDir = normalize(lightDir + viewDir);
        float spec = pow(max(dot(normal, halfDir), 0.0), 130.0);
        float edge = pow(1.0 - abs(dot(viewDir, normal)), 4.0);
        vec3 brandColor = getBrandShapeColor(p);
        vec3 gold = vec3(1.0, 0.78, 0.35);
        vec3 whiteHot = vec3(1.0, 0.95, 0.84);
        float diffuse = max(dot(normal, lightDir), 0.0);
        color += getBackground(reflect(rd, normal)) * 2.8;
        color += brandColor * (0.34 + diffuse * 1.15);
        color += spec * whiteHot * 3.2;
        color += fresnel * mix(brandColor, gold, 0.42 + 0.4 * sin(uTime + fresnel * TAU)) * 1.55;
        color += edge * brandColor * 0.86;
      } else {
        color = getBackground(rd);
      }

      float vignette = 1.0 - length(uv) * 0.42;
      color *= smoothstep(0.16, 1.0, vignette);
      color = pow(color * 1.18, vec3(0.88));
      gl_FragColor = vec4(color, 1.0);
    }
  `

  function createShader(type, source) {
    const shader = gl.createShader(type)
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('Hero shader compile failed:', gl.getShaderInfoLog(shader))
      gl.deleteShader(shader)
      return null
    }
    return shader
  }

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource)
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource)
  if (!vertexShader || !fragmentShader) return

  const program = gl.createProgram()
  gl.attachShader(program, vertexShader)
  gl.attachShader(program, fragmentShader)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('Hero shader link failed:', gl.getProgramInfoLog(program))
    return
  }

  const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

  const positionLocation = gl.getAttribLocation(program, 'position')
  const uTime = gl.getUniformLocation(program, 'uTime')
  const uResolution = gl.getUniformLocation(program, 'uResolution')
  const uMouse = gl.getUniformLocation(program, 'uMouse')
  const mouse = { x: 0.5, y: 0.5, targetX: 0.44, targetY: 0.54 }
  let frame = null
  let startTime = performance.now()

  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 1.75)
    const width = Math.max(1, Math.floor(canvas.clientWidth * ratio))
    const height = Math.max(1, Math.floor(canvas.clientHeight * ratio))
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width
      canvas.height = height
      gl.viewport(0, 0, width, height)
    }
  }

  function render(now) {
    resizeCanvas()
    mouse.x += (mouse.targetX - mouse.x) * 0.045
    mouse.y += (mouse.targetY - mouse.y) * 0.045
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.uniform1f(uTime, (now - startTime) * 0.001)
    gl.uniform2f(uResolution, canvas.width, canvas.height)
    gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.enableVertexAttribArray(positionLocation)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    frame = requestAnimationFrame(render)
  }

  canvas.addEventListener('pointermove', (event) => {
    const rect = canvas.getBoundingClientRect()
    mouse.targetX = (event.clientX - rect.left) / Math.max(rect.width, 1)
    mouse.targetY = 1 - (event.clientY - rect.top) / Math.max(rect.height, 1)
  }, { passive: true })

  window.addEventListener('resize', resizeCanvas)
  window.addEventListener('pagehide', () => {
    if (frame) cancelAnimationFrame(frame)
  }, { once: true })

  frame = requestAnimationFrame(render)
}

initHeroPrismCanvas()

function lerp(start, end, factor) {
  return start + (end - start) * factor
}

function initScrollVelocitySkew() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const scrollContent = document.getElementById('scroll-content')
  if (!scrollContent || scrollContent.dataset.skewInit === 'true') return
  scrollContent.dataset.skewInit = 'true'

  let skew = 0
  let lastScrollTop = window.scrollY

  function scrollLoop() {
    if (!document.getElementById('scroll-content')) {
      // If elements are fully destroyed / route changes and it unmounts
      return
    }
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

async function waitForLoaderVideo(video) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.setAttribute('playsinline', '')
  video.setAttribute('webkit-playsinline', '')

  const tryPlay = () => video.play().catch(() => undefined)

  if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
    tryPlay()
    return
  }

  await new Promise((resolve) => {
    let settled = false
    const finish = () => {
      if (settled) return
      settled = true
      tryPlay()
      resolve()
    }

    const timeout = window.setTimeout(finish, 5000)
    const done = () => {
      window.clearTimeout(timeout)
      finish()
    }

    video.addEventListener('canplaythrough', done, { once: true })
    video.addEventListener('canplay', tryPlay, { once: true })
    video.addEventListener('loadeddata', tryPlay, { once: true })
    video.addEventListener('error', done, { once: true })
    video.load()
  })
}

async function initGuildLoadingAnimation() {
  const loader = document.querySelector('.guild-loader')
  if (!loader) {
    document.body.classList.remove('is-loading')
    return
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
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
  const loaderVideos = Array.from(loader.querySelectorAll('video'))

  loaderVideos.forEach((video) => {
    video.muted = true
    video.play().catch(() => undefined)
  })

  await Promise.race([
    Promise.all([
      ...loaderImages.map((image) => {
        if (image.complete) return Promise.resolve()
        return image.decode ? image.decode().catch(() => undefined) : new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true })
          image.addEventListener('error', resolve, { once: true })
        })
      }),
      ...loaderVideos.map((video) => waitForLoaderVideo(video)),
    ]),
    wait(5000),
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

function resetHorizontalScroll() {
  document.documentElement.scrollLeft = 0
  document.body.scrollLeft = 0
}

resetHorizontalScroll()
window.addEventListener('load', resetHorizontalScroll, { once: true })
window.addEventListener('resize', resetHorizontalScroll)

initGuildLoadingAnimation().then(() => {
  if (isHomePage) {
    initCinematicHero()
    initGuildPartnerCarousel()
  }
  initGuildSystemSlider()
  initGuildShapes()
  resetHorizontalScroll()
})

function initGuildMenu() {
  const nav = document.querySelector('.site-nav')
  const navInner = document.querySelector('.nav-inner')

  if (!nav || !navInner || nav.querySelector('.guild-menu-button')) return

  const menuId = 'guild-side-menu'
  const menuItems = [
    { href: '/about', label: 'About', number: '01' },
    { href: '/pipeline', label: 'Pipeline', number: '02' },
    { href: '/campus', label: 'Campus', number: '03' },
    { href: '/events', label: 'Events', number: '04' },
    { href: '/partners', label: 'Partners', number: '05' },
    { href: '/join', label: 'Join', number: '06' },
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
            <a data-menu-fade href="/partners">Partner</a>
            <a data-menu-fade href="/events">Demo Day</a>
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

window.guildInitChrome = () => {
  mountGuildFooter()
  initActivationBanner()
  initGuildMenu()
  initScrollVelocitySkew()
  window.guildInitEditorialGrid?.()
}

initGuildMenu()

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
    if (target.closest('[data-guild-system-slider]')) return
    if (target.classList.contains('display-heading') || target.closest('.display-heading')) return
    splitWaveText(target)
  })
}

initHeadingWave()

function initCursorFollower() {
  if (document.querySelector('.cursor-symbol')) return

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

initCursorFollower()

let revealObserver

function initRevealAnimations(root = document) {
  if (!revealObserver) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px',
    })
  }

  const revealItems = root.querySelectorAll('.reveal:not([data-reveal-bound])')

  revealItems.forEach((item, index) => {
    item.setAttribute('data-reveal-bound', 'true')
    item.style.setProperty('--stagger', index % 5)
    revealObserver.observe(item)
  })
}

initRevealAnimations()

window.guildInitRoute = (pathname) => {
  const isHome = pathname === '/'

  if (isHome) {
    initCinematicHero()
    initGuildPartnerCarousel()
  } else {
    destroyCinematicHero()
  }

  initGuildSystemSlider()
  initGuildShapes()
  initCampusHighlightCards()
  initSurfaceTilt()
}

window.guildRefreshPageUI = (root = document.getElementById('root')) => {
  if (!root) return
  initDisplayHeadingIcons(root)
  initRevealAnimations(root)
}

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

initSpectrumHover()

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
