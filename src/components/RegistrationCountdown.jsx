import { useEffect, useState } from 'react'

const REGISTRATION_OPENS = new Date('2026-07-01T00:00:00+02:00')

function getTimeLeft(target) {
  const diff = target.getTime() - Date.now()
  if (diff <= 0) return null

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function RegistrationCountdown() {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(REGISTRATION_OPENS))

  useEffect(() => {
    const tick = () => setTimeLeft(getTimeLeft(REGISTRATION_OPENS))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  if (!timeLeft) {
    return (
      <div className="guild-cinematic-hero__countdown" aria-live="polite">
        <p className="guild-cinematic-hero__countdown-open">Registrations are open</p>
        <span className="guild-cinematic-hero__countdown-label">Apply for the 01 Aug 2026 sprint floor</span>
      </div>
    )
  }

  const units = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ]

  return (
    <div className="guild-cinematic-hero__countdown" aria-live="polite" aria-label="Countdown to registration opening">
      <p className="guild-cinematic-hero__countdown-heading">Registrations open 01 July</p>
      <div className="guild-cinematic-hero__countdown-grid">
        {units.map((unit) => (
          <div key={unit.label} className="guild-cinematic-hero__countdown-unit">
            <span className="guild-cinematic-hero__countdown-value">{String(unit.value).padStart(2, '0')}</span>
            <span className="guild-cinematic-hero__countdown-label">{unit.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
