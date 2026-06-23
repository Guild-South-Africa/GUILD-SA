import AppLink from './AppLink'

export default function CinematicHero() {
  return (
    <section className="guild-cinematic-hero" data-guild-cinematic-hero aria-label="GUILD SA introduction">
      <div className="guild-cinematic-hero__sticky">
        <div className="guild-cinematic-hero__globe" data-guild-globe-mount aria-hidden="true" />
        <div className="guild-cinematic-hero__copy">
          <h1 className="guild-cinematic-hero__title guild-cinematic-hero__title--1">Build.</h1>
          <h1 className="guild-cinematic-hero__title guild-cinematic-hero__title--2">Ship.</h1>
          <h1 className="guild-cinematic-hero__title guild-cinematic-hero__title--3">Prove.</h1>

          <p className="guild-cinematic-hero__lede">
            Not everyone builds. Only 40 ship.
            <br /><br />
            South Africa&apos;s student execution layer.
            <br />
            ~100 builders enter the campus pool.
            <br />
            40 are selected for the live sprint.
            <br /><br />
            Build AI products. Demo publicly. Prove your capability.
            <br /><br />
            <span className="guild-cinematic-hero__location">First node: Eduvos<br />~100 builders shortlisted<br />40 selected for the 10-hour sprint</span>
          </p>

          <div className="guild-cinematic-hero__stat guild-cinematic-hero__stat--builders">
            <div className="guild-cinematic-hero__stat-row">
              <span className="guild-cinematic-hero__stat-line" aria-hidden="true" />
              <span className="guild-cinematic-hero__stat-value guild-cinematic-hero__stat-value--sm">~100</span>
            </div>
            <span className="guild-cinematic-hero__stat-label">Builder Pool (~100)</span>
          </div>

          <div className="guild-cinematic-hero__stat guild-cinematic-hero__stat--day">
            <div className="guild-cinematic-hero__stat-row">
              <span className="guild-cinematic-hero__stat-value">40</span>
              <span className="guild-cinematic-hero__stat-line" aria-hidden="true" />
            </div>
            <span className="guild-cinematic-hero__stat-label">Builders<br />Live Sprint Floor</span>
          </div>

          <div className="guild-cinematic-hero__stat guild-cinematic-hero__stat--mvp">
            <div className="guild-cinematic-hero__stat-row">
              <span className="guild-cinematic-hero__stat-line" aria-hidden="true" />
              <span className="guild-cinematic-hero__stat-value guild-cinematic-hero__stat-value--sm">10 Hours</span>
            </div>
            <span className="guild-cinematic-hero__stat-label">Live Sprint</span>
          </div>

          <div className="guild-cinematic-hero__actions">
            <AppLink className="button" to="/join">Apply to enter the builder pool</AppLink>
            <AppLink className="button secondary" to="/events">Event Details</AppLink>
          </div>
        </div>

        <div className="guild-cinematic-hero__fade" aria-hidden="true" />
      </div>
    </section>
  )
}
