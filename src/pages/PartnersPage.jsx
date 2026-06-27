import PageShell from '../components/PageShell'
import PartnersContent from './content/PartnersContent'
import { meta } from '../content/partners.content'

export default function PartnersPage() {
  return (
    <PageShell meta={meta}>
      <PartnersContent />
    </PageShell>
  )
}
