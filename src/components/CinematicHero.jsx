import RegistrationCountdown from './RegistrationCountdown'

export default function CinematicHero() {
  return (
    <section className="guild-cinematic-hero" data-guild-cinematic-hero aria-label="GUILD SA introduction">
      <div className="guild-cinematic-hero__inner shell">
        <div className="guild-cinematic-hero__content">
          <h1 className="guild-cinematic-hero__headline">
            <span className="guild-cinematic-hero__headline-line">Stop Writing Code.</span>
            <span className="guild-cinematic-hero__headline-line">Start Building Ventures.</span>
          </h1>

          <p className="guild-cinematic-hero__lede">
            Bring your skills, your ideas, and your drive. Join top IT students for a 10-hour sprint to solve real problems and build AI-powered solutions.
          </p>

          <p className="guild-cinematic-hero__note">
            Registrations open 01 July — 40 seats only. Secure your spot and get selected for the sprint floor.
          </p>

          <div className="guild-cinematic-hero__actions">
            <a href="#waitlist" className="button">Join Waitlist</a>
            <a href="#build-day-schedule" className="button secondary">How The Sprint Works</a>
          </div>

          <RegistrationCountdown />
        </div>

        <div className="guild-cinematic-hero__visual">
          <div className="guild-cinematic-hero__globe" data-guild-globe-mount aria-hidden="true" />
        </div>
      </div>
    </section>
  )
}
