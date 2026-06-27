import { useState } from 'react'
import AppLink from './AppLink'
import { submitMailingList } from '../lib/submitMailingList'

export default function MailingListForm({ source = 'home' }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(event) {
    event.preventDefault()
    setStatus('loading')
    setMessage('')

    try {
      const result = await submitMailingList(email, source)
      setStatus('success')
      setMessage(
        result.alreadySubscribed
          ? 'You are already on the list. We will keep you posted.'
          : 'You are on the list. Watch your inbox for the next update.',
      )
      if (!result.alreadySubscribed) setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <form className="mailing-list-form reveal" onSubmit={handleSubmit} noValidate>
      <label className="mailing-list-form__label" htmlFor="mailing-list-email">
        Email address
      </label>
      <div className="mailing-list-form__row">
        <input
          id="mailing-list-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@university.ac.za"
          value={email}
          required
          disabled={status === 'loading'}
          className="mailing-list-form__input"
          onChange={(event) => setEmail(event.target.value)}
        />
        <button type="submit" className="button mailing-list-form__submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Joining…' : 'Join The List'}
        </button>
      </div>
      <p className="mailing-list-form__note">
        Updates on Buildathons, campus activations, and ecosystem news. See our{' '}
        <AppLink to="/privacy">privacy policy</AppLink>.
      </p>
      {message && (
        <p
          className={`mailing-list-form__feedback${status === 'error' ? ' is-error' : ' is-success'}`}
          role={status === 'error' ? 'alert' : 'status'}
        >
          {message}
        </p>
      )}
    </form>
  )
}
