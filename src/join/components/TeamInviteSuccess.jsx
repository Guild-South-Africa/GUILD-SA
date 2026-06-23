import { useState } from 'react'
import AppLink from '../../components/AppLink'

function resolveInviteUrl(inviteUrl) {
  if (!inviteUrl) return ''
  if (/^https?:\/\//i.test(inviteUrl)) return inviteUrl
  if (typeof window !== 'undefined') {
    return `${window.location.origin}${inviteUrl.startsWith('/') ? inviteUrl : `/${inviteUrl}`}`
  }
  return inviteUrl
}

async function copyText(text) {
  if (!text) return false
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text)
    return true
  }

  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.setAttribute('readonly', '')
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  document.body.appendChild(textarea)
  textarea.select()
  const copied = document.execCommand('copy')
  document.body.removeChild(textarea)
  return copied
}

export default function TeamInviteSuccess({ inviteCode, inviteUrl, emailSent, leaderEmail }) {
  const [copyState, setCopyState] = useState({ code: '', url: '' })
  const fullInviteUrl = resolveInviteUrl(inviteUrl)

  const handleCopy = async (kind, text) => {
    try {
      const copied = await copyText(text)
      setCopyState((prev) => ({ ...prev, [kind]: copied ? 'copied' : 'failed' }))
      window.setTimeout(() => {
        setCopyState((prev) => ({ ...prev, [kind]: '' }))
      }, 2000)
    } catch {
      setCopyState((prev) => ({ ...prev, [kind]: 'failed' }))
    }
  }

  return (
    <div className="join-success-panel" role="status" aria-live="polite">
      <p className="kicker">Team registered</p>
      <h2 className="join-success-panel__title">Share your invite link.</h2>
      <p className="join-success-panel__lede">
        Your team is in the system. Send the code or link below so teammates can join before the Buildathon.
      </p>

      <div className="join-invite-block">
        <p className="join-invite-block__label">Invite code</p>
        <div className="join-invite-copy-row">
          <code className="join-invite-block__value">{inviteCode}</code>
          <button
            type="button"
            className="button secondary join-invite-copy-btn"
            onClick={() => handleCopy('code', inviteCode)}
          >
            {copyState.code === 'copied' ? 'Copied' : copyState.code === 'failed' ? 'Copy failed' : 'Copy code'}
          </button>
        </div>
      </div>

      <div className="join-invite-block">
        <p className="join-invite-block__label">Invite link</p>
        <div className="join-invite-copy-row">
          <a className="join-invite-block__link" href={fullInviteUrl}>{fullInviteUrl}</a>
          <button
            type="button"
            className="button secondary join-invite-copy-btn"
            onClick={() => handleCopy('url', fullInviteUrl)}
          >
            {copyState.url === 'copied' ? 'Copied' : copyState.url === 'failed' ? 'Copy failed' : 'Copy link'}
          </button>
        </div>
      </div>

      {emailSent && leaderEmail && (
        <p className="join-success-panel__note is-success">
          We also emailed this invite to <strong>{leaderEmail}</strong>.
        </p>
      )}

      {!emailSent && leaderEmail && (
        <p className="join-success-panel__note">
          Save this code now — email delivery is not configured or could not be sent to <strong>{leaderEmail}</strong>.
        </p>
      )}

      <div className="join-success-panel__actions">
        <AppLink className="button" to="/join/team/invite">Open Team Invite Page</AppLink>
        <AppLink className="button secondary" to="/join">Back to Join Options</AppLink>
      </div>
    </div>
  )
}
