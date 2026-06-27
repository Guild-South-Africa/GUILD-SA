export async function submitMailingList(email, source = 'home') {
  const response = await fetch('/api/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'newsletter',
      payload: { email, source },
    }),
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Subscription failed')
  }

  return result
}
