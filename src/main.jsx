import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '../style.css'
import './styles/editorial-system.css'
import './lib/editorial-grid.js'
import '../app.js'
import '../scene.js'

const root = document.getElementById('root')

if (root) {
  const { pathname, search, hash } = window.location

  const legacyRedirects = {
    '/index.html': '/',
    '/about.html': '/about',
    '/pipeline.html': '/pipeline',
    '/campus.html': '/campus',
    '/events.html': '/events',
    '/partners.html': '/partners',
    '/privacy.html': '/privacy',
    '/join.html': '/join',
  }

  const redirect = legacyRedirects[pathname]
  if (redirect) {
    window.history.replaceState(null, '', `${redirect}${search}${hash}`)
  }

  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  )
}
