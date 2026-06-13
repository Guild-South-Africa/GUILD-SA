import PageShell from '../components/PageShell'
import IndexContent from './content/IndexContent'
import { meta } from '../content/index.content'

export default function HomePage() {
  return (
    <PageShell meta={meta} bodyClass="has-spectrum-hero">
      <IndexContent />
    </PageShell>
  )
}
