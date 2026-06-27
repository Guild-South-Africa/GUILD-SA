import PageShell from '../components/PageShell'
import EventsContent from './content/EventsContent'
import { meta } from '../content/events.content'

export default function EventsPage() {
  return (
    <PageShell meta={meta}>
      <EventsContent />
    </PageShell>
  )
}
