import PageShell from '../components/PageShell'
import AboutContent from './content/AboutContent'
import { meta } from '../content/about.content'

export default function AboutPage() {
  return (
    <PageShell meta={meta}>
      <AboutContent />
    </PageShell>
  )
}
