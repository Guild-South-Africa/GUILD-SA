import { useEffect } from 'react'
import { useGuildPageEffects } from '../hooks/useGuildPageEffects'

export default function PageShell({ meta, bodyClass = '', children }) {
  useGuildPageEffects({ bodyClass })

  useEffect(() => {
    if (meta?.title) document.title = meta.title

    const description = document.querySelector('meta[name="description"]')
    if (description && meta?.description) {
      description.setAttribute('content', meta.description)
    }
  }, [meta])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [meta?.title])

  return <main>{children}</main>
}
