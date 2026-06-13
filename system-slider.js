const VERTEX_SOURCE = `#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

in vec4 position;

void main(void) {
  gl_Position = position;
}
`

const AUTO_PLAY_MS = 5000

function compileShader(gl, shader, source) {
  gl.shaderSource(shader, source)
  gl.compileShader(shader)

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader))
  }
}

function createAutoPlay(root, stage, shouldSkip) {
  let timer = null
  let paused = false

  const tick = () => {
    if (paused || shouldSkip()) return
    root.querySelector('.guild-system-slider__btn.next')?.click()
  }

  const reset = () => {
    clearInterval(timer)
    timer = window.setInterval(tick, AUTO_PLAY_MS)
  }

  const stop = () => {
    clearInterval(timer)
    timer = null
  }

  root.addEventListener('mouseenter', () => {
    paused = true
  })
  root.addEventListener('mouseleave', () => {
    paused = false
  })

  const observer = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) reset()
    else stop()
  }, { threshold: 0.25 })

  observer.observe(stage)

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop()
    else reset()
  })

  reset()

  return { reset, stop }
}

function hookStaticSlider(root) {
  const stage = root.querySelector('.guild-system-slider__stage')
  const list = root.querySelector('.guild-system-slider__list')
  if (!stage || !list) return

  const setXOff = (value) => {
    list.style.setProperty('--x-off', `${value}%`)
  }

  const rotate = (direction) => {
    const items = root.querySelectorAll('.guild-system-slider__slide')
    setXOff(0)
    if (direction === 'next') list.append(items[0])
    else list.prepend(items[items.length - 1])
  }

  const autoPlay = createAutoPlay(root, stage, () => false)

  root.addEventListener('click', (event) => {
    if (!event.target.closest('.guild-system-slider__nav')) return
    if (event.target.closest('.guild-system-slider__btn.next')) rotate('next')
    else if (event.target.closest('.guild-system-slider__btn.prev')) rotate('prev')
    autoPlay.reset()
  })

  let sliding = false
  let originX = 0

  stage.addEventListener('touchstart', (event) => {
    sliding = true
    originX = event.touches[0].screenX
  }, { passive: true })

  stage.addEventListener('touchmove', (event) => {
    if (!sliding) return
    const touch = event.touches[0]
    const delta = touch.screenX - originX
    setXOff(Math.max(-50, Math.min(50, delta)))

    if (delta < -50) {
      sliding = false
      setXOff(0)
      rotate('next')
      autoPlay.reset()
    } else if (delta > 50) {
      sliding = false
      setXOff(0)
      rotate('prev')
      autoPlay.reset()
    }
  }, { passive: true })

  stage.addEventListener('touchend', () => {
    sliding = false
    setXOff(0)
  })
}

export function initGuildSystemSlider() {
  const root = document.querySelector('[data-guild-system-slider]')
  if (!root || root.dataset.sliderInit === 'true') return
  root.dataset.sliderInit = 'true'

  const stage = root.querySelector('.guild-system-slider__stage')
  const list = root.querySelector('.guild-system-slider__list')
  const shaderScripts = root.querySelectorAll('script[type="x-shader/x-fragment"]')

  if (!stage || !list) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    root.classList.add('is-static')
    hookStaticSlider(root)
    return
  }

  if (!shaderScripts.length) return

  let dpr = Math.max(1, window.devicePixelRatio)
  let canvas
  let gl
  let programs = []
  let vertices
  let buffer
  let running = false
  let then = 0
  let animationFrame = null

  function setupWebGL() {
    canvas = document.createElement('canvas')
    gl = canvas.getContext('webgl2')
    if (!gl) {
      root.classList.add('is-static')
      hookStaticSlider(root)
      return false
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)
    compileShader(gl, vertexShader, VERTEX_SOURCE)

    programs = Array.from(shaderScripts).map(() => gl.createProgram())

    shaderScripts.forEach((script, index) => {
      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)
      const program = programs[index]

      compileShader(gl, fragmentShader, script.textContent)
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program))
      }
    })

    vertices = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]
    buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW)

    programs.forEach((program) => {
      const position = gl.getAttribLocation(program, 'position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      program.resolution = gl.getUniformLocation(program, 'resolution')
      program.time = gl.getUniformLocation(program, 'time')
    })

    return true
  }

  function setCanvasSize(width, height) {
    canvas.width = width
    canvas.height = height
    gl.viewport(0, 0, width, height)
  }

  function getStageSize() {
    const rect = stage.getBoundingClientRect()
    return {
      width: Math.max(320, Math.round(rect.width)),
      height: Math.max(420, Math.round(rect.height)),
    }
  }

  function resizeForPlayback() {
    setCanvasSize(window.innerWidth * dpr, window.innerHeight * dpr)
  }

  function draw(now, program) {
    gl.clearColor(0, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.useProgram(program)
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.uniform2f(program.resolution, canvas.width, canvas.height)
    gl.uniform1f(program.time, now * 1e-3)
    gl.drawArrays(gl.TRIANGLES, 0, vertices.length * 0.5)
  }

  function loop(now, index) {
    if (!running) return
    draw(now + then, programs[index])
    animationFrame = requestAnimationFrame((time) => loop(time, index))
  }

  function removeCanvas() {
    running = false
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
      animationFrame = null
    }
    canvas?.remove()
  }

  function setXOff(value) {
    list.style.setProperty('--x-off', `${value}%`)
  }

  function animateSlide(slide) {
    const shaderIndex = Number(slide.dataset.shaderIndex)
    const visual = slide.querySelector('.guild-system-slider__visual')

    resizeForPlayback()
    running = true
    loop(0, shaderIndex)
    visual.append(canvas)
  }

  function hookEvents(autoPlay) {
    function activate(event) {
      const items = root.querySelectorAll('.guild-system-slider__slide')
      if (!event.target.closest('.guild-system-slider__nav')) return

      setXOff(0)

      window.setTimeout(() => {
        if (event.target.closest('.guild-system-slider__btn.next')) {
          list.append(items[0])
        } else if (event.target.closest('.guild-system-slider__btn.prev')) {
          list.prepend(items[items.length - 1])
        }

        removeCanvas()
        root.querySelectorAll('.guild-system-slider__play use').forEach((icon) => {
          icon.setAttribute('href', '#guild-system-play')
        })
        autoPlay.reset()
      }, running ? 1000 : 0)
    }

    let sliding = false
    let originX = 0

    function onTouchMove(event) {
      if (!sliding || running) return

      const touch = event.touches[0]
      const delta = touch.screenX - originX
      setXOff(Math.max(-50, Math.min(50, delta)))

      if (delta < -50) {
        sliding = false
        setXOff(0)
        root.querySelector('.guild-system-slider__btn.next')?.click()
      } else if (delta > 50) {
        sliding = false
        setXOff(0)
        root.querySelector('.guild-system-slider__btn.prev')?.click()
      }
    }

    root.addEventListener('click', activate)
    stage.addEventListener('touchmove', onTouchMove, { passive: true })
    stage.addEventListener('touchstart', (event) => {
      if (running) return
      sliding = true
      originX = event.touches[0].screenX
    }, { passive: true })
    stage.addEventListener('touchend', () => {
      if (running) return
      sliding = false
      setXOff(0)
    })

    root.addEventListener('click', () => root.focus())
    root.addEventListener('keydown', (event) => {
      if (!root.contains(document.activeElement) && document.activeElement !== document.body) return

      if (event.key === 'ArrowRight') {
        root.querySelector('.guild-system-slider__btn.next')?.click()
      } else if (event.key === 'ArrowLeft') {
        root.querySelector('.guild-system-slider__btn.prev')?.click()
      } else if (event.key === ' ') {
        event.preventDefault()
        root.querySelectorAll('.guild-system-slider__slide')[1]?.querySelector('.guild-system-slider__play')?.click()
      }
    })

    root.querySelectorAll('.guild-system-slider__play').forEach((button) => {
      button.addEventListener('click', (event) => {
        const slide = event.currentTarget.closest('.guild-system-slider__slide')
        running = !running

        button.querySelector('use')?.setAttribute(
          'href',
          running ? '#guild-system-pause' : '#guild-system-play'
        )

        if (!running) {
          setXOff(0)
          removeCanvas()
          autoPlay.reset()
          return
        }

        autoPlay.stop()
        setXOff(100)

        if (slide.querySelector('canvas')) {
          running = true
          loop(0, Number(slide.dataset.shaderIndex))
          return
        }

        animateSlide(slide)
      })
    })
  }

  async function initSlider() {
    if (!setupWebGL()) return

    const autoPlay = createAutoPlay(root, stage, () => running)
    hookEvents(autoPlay)

    root.querySelectorAll('.guild-system-slider__slide').forEach((slide, index) => {
      slide.dataset.shaderIndex = String(index)
    })
  }

  const onResize = () => {
    if (running) {
      resizeForPlayback()
      return
    }

    root.querySelectorAll('.guild-system-slider__slide').forEach((slide) => {
      if (slide.querySelector('canvas')) {
        running = true
        loop(0, Number(slide.dataset.shaderIndex))
        running = false
      }
    })
  }

  window.addEventListener('resize', onResize)

  initSlider()
}
