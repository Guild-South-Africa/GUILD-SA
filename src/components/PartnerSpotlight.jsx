import AppLink from './AppLink'

export default function PartnerSpotlight({ partner, index, dark = false }) {
  const reverse = index % 2 === 1

  return (
    <section
      className={[
        'partner-spotlight',
        'site-section',
        dark ? 'dark' : 'about-depth-section',
        reverse ? 'partner-spotlight--reverse' : '',
      ].filter(Boolean).join(' ')}
      id={`partner-${partner.id}`}
      aria-labelledby={`partner-${partner.id}-title`}
    >
      <div className="shell">
        <div className="partner-spotlight__top">
          <div className="section-number reveal">{String(index + 1).padStart(2, '0')}</div>
          <div className="partner-spotlight__brand reveal">
            {partner.logo ? (
              <img
                className="partner-spotlight__logo"
                src={partner.logo}
                alt={partner.logoAlt}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <span className="partner-spotlight__wordmark" aria-hidden="true">{partner.name}</span>
            )}
            <div>
              <p className="kicker">{partner.role}</p>
              <h2 className="reveal" id={`partner-${partner.id}-title`}>{partner.name}</h2>
            </div>
          </div>
        </div>

        <div className="editorial reveal">
          <div className="copy">
            {partner.intro.map((text) => (
              <p key={text} className="section-intro">{text}</p>
            ))}
            <div className="tags partner-spotlight__tags">
              {partner.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            {partner.website && (
              <a className="button secondary partner-spotlight__link" href={partner.website} target="_blank" rel="noreferrer">
                Visit {partner.name}
              </a>
            )}
          </div>
          <div
            className="visual color"
            style={{ '--photo': `url('${partner.photo}')` }}
            data-caption={partner.photoCaption}
            aria-hidden="true"
          />
        </div>

        <div className="about-entry-grid partner-spotlight__contributions">
          {partner.contributions.map((item) => (
            <article key={item.label} className="about-entry-card reveal">
              <span>{item.label}</span>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PartnerDirectoryNav({ partners }) {
  return (
    <nav className="partner-directory-nav reveal" aria-label="Ecosystem partner sections">
      {partners.map((partner) => (
        <a key={partner.id} className="partner-directory-nav__link" href={`#partner-${partner.id}`}>
          {partner.name}
        </a>
      ))}
    </nav>
  )
}
