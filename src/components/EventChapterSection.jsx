import AppLink from './AppLink'
import { EDUVOS_PRETORIA_CHAPTER } from '../lib/eventChapters'

export default function EventChapterSection() {
  const chapter = EDUVOS_PRETORIA_CHAPTER

  return (
    <section
      className="event-chapter-section site-section about-depth-section"
      id={chapter.id}
      aria-labelledby={`${chapter.id}-title`}
    >
      <div className="shell">
        <div className="event-chapter-section__badge reveal">Chapter 01 · Pretoria</div>

        <div className="section-header">
          <div className="section-number reveal">02</div>
          <div>
            <p className="kicker reveal">{chapter.kicker}</p>
            <h2 className="reveal" id={`${chapter.id}-title`}>{chapter.title}</h2>
            <p className="section-intro reveal"><strong>{chapter.subtitle}</strong></p>
            {chapter.lede.map((text) => (
              <p key={text} className="section-intro reveal">{text}</p>
            ))}
          </div>
        </div>

        <div className="event-chapter-section__hero editorial reveal">
          <div className="copy">
            <p className="kicker">Everything about this chapter</p>
            <h3>Learn, View &amp; Register.</h3>
            <p className="section-intro">
              Use this section as the single source for the Eduvos Pretoria Buildathon — event facts, who it is for, what you will build, and how to secure a sprint-floor seat.
            </p>
            <div className="waitlist-actions">
              <AppLink className="button" to="/join">Apply For This Chapter</AppLink>
              <a className="button secondary" href={chapter.scheduleAnchor}>View Full Schedule</a>
            </div>
          </div>
          <figure className="event-chapter-section__poster">
            <img src={chapter.poster} alt={chapter.posterAlt} loading="lazy" decoding="async" />
          </figure>
        </div>

        <div className="about-entry-grid event-chapter-section__facts">
          {chapter.facts.map((fact) => (
            <article key={fact.label} className="about-entry-card reveal">
              <span>{fact.label}</span>
              <p>{fact.value}</p>
            </article>
          ))}
        </div>

        <div className="event-chapter-section__highlights">
          {chapter.highlights.map((item, index) => (
            <article key={item.title} className="event-chapter-section__highlight reveal">
              <span className="event-chapter-section__highlight-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="event-chapter-section__partners reveal">
          <p className="kicker">Chapter partners</p>
          <div className="event-chapter-section__partner-tags">
            {chapter.partners.map((partner) => (
              <AppLink
                key={partner.slug}
                className="event-chapter-section__partner-tag"
                to={`/partners#partner-${partner.slug}`}
              >
                {partner.name}
              </AppLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
