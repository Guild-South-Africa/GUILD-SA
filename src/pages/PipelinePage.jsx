import PageShell from '../components/PageShell'
import PipelineContent from './content/PipelineContent'
import { meta } from '../content/pipeline.content'

export default function PipelinePage() {
  return (
    <PageShell meta={meta}>
      <PipelineContent />
    </PageShell>
  )
}
