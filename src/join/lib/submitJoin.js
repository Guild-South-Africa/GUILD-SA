const MAX_UPLOAD_BYTES = 5 * 1024 * 1024

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => resolve(reader.result))
    reader.addEventListener('error', () => reject(reader.error || new Error('Could not read upload.')))
    reader.readAsDataURL(file)
  })
}

export async function buildJoinPayload(formData) {
  const payload = {}
  const uploads = []

  for (const [name, value] of Object.entries(formData)) {
    if (value instanceof File) {
      if (!value.size) continue
      if (value.size > MAX_UPLOAD_BYTES) {
        throw new Error('Uploads must be 5 MB or smaller.')
      }

      uploads.push({
        field: name,
        filename: value.name,
        contentType: value.type || 'application/octet-stream',
        size: value.size,
        data: await fileToDataUrl(value),
      })
      continue
    }

    if (typeof value === 'boolean') {
      payload[name] = value
      continue
    }

    if (value !== undefined && value !== null && value !== '') {
      payload[name] = value
    }
  }

  if (uploads.length) payload.uploads = uploads
  return payload
}

export async function submitJoin(type, formData) {
  const payload = await buildJoinPayload(formData)

  const response = await fetch('/api/join', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type, payload }),
  })

  const result = await response.json()
  if (!response.ok) {
    throw new Error(result.error || 'Submission failed')
  }

  return result
}
