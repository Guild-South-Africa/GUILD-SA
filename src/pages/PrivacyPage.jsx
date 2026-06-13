import PageShell from '../components/PageShell'
import PrivacyContent from './content/PrivacyContent'
import { meta } from '../content/privacy.content'

export default function PrivacyPage() {
  return (
    <PageShell meta={meta}>
      <PrivacyContent />
    </PageShell>
  )
}
