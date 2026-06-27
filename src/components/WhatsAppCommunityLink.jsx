import { WHATSAPP_COMMUNITY_URL } from '../lib/siteLinks'

export default function WhatsAppCommunityLink({
  className = 'button secondary',
  children = 'Join WhatsApp Community',
}) {
  return (
    <a
      className={className}
      href={WHATSAPP_COMMUNITY_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  )
}
