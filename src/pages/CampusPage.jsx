import PageShell from '../components/PageShell'
import CampusContent from './content/CampusContent'
import { meta } from '../content/campus.content'

export default function CampusPage() {
  return (
    <PageShell meta={meta}>
      <CampusContent />
    </PageShell>
  )
}
