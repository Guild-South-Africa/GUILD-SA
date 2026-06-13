import { Link } from 'react-router-dom'
import TypeformForm from './TypeformForm'
import { FORM_CONFIGS } from '../lib/formConfigs'
import { useGuildPageEffects } from '../../hooks/useGuildPageEffects'

export default function JoinFormPage({ formType, inviteCode }) {
  const config = FORM_CONFIGS[formType]
  useGuildPageEffects()

  if (!config) {
    return (
      <section className="site-section join-section">
        <div className="shell">
          <p className="form-note is-error">Unknown application type.</p>
          <Link className="button secondary" to="/join">
            Back to options
          </Link>
        </div>
      </section>
    )
  }

  const initialValues = inviteCode ? { inviteCode } : {}

  return (
    <div className="join-forms-view">
      <section className="site-section join-section">
        <div className="shell">
          <Link className="button secondary" to="/join">
            &larr; Back to Options
          </Link>
          <div className="join-application-intro mt-4">
            <p className="kicker">{config.kicker}</p>
            <h2>{config.title}</h2>
          </div>

          <div className="join-flow" data-join-flow>
            <TypeformForm type={formType} config={config} initialValues={initialValues} />
          </div>
        </div>
      </section>
    </div>
  )
}
