import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function normalizeInternalHref(href) {
  if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
    return href
  }

  if (href.endsWith('.html')) {
    const clean = href.replace(/\.html$/, '')
    return clean === '/index' ? '/' : clean
  }

  return href
}

function patchInternalLinks(root) {
  if (!root) return

  root.querySelectorAll('a[href]').forEach((anchor) => {
    const href = anchor.getAttribute('href')
    const next = normalizeInternalHref(href)
    if (next && next !== href) {
      anchor.setAttribute('href', next)
    }
  })
}

export function useGuildPageEffects({ bodyClass = '' } = {}) {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.body.classList.toggle('has-cinematic-hero', bodyClass === 'has-cinematic-hero')

    const root = document.getElementById('root')
    patchInternalLinks(root)

    window.guildInitRoute?.(location.pathname)
    window.guildRefreshPageUI?.(root)
    window.guildInitChrome?.()
    window.guildInitEditorialGrid?.()

    return () => {
      window.cleanupGuildSpectrumHero?.()
    }
  }, [location.pathname, bodyClass])

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.replace('#', '')
    const target = document.getElementById(id)
    if (!target) return

    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: 'auto', block: 'start' })
    })
  }, [location.pathname, location.hash])

  useEffect(() => {
    const handleClick = (event) => {
      const anchor = event.target.closest('a[href]')
      if (!anchor || anchor.target === '_blank' || event.metaKey || event.ctrlKey || event.shiftKey) {
        return
      }

      const href = normalizeInternalHref(anchor.getAttribute('href'))
      if (!href || !href.startsWith('/') || href.startsWith('//')) {
        return
      }

      event.preventDefault()
      navigate(href)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [navigate])
}
