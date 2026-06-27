import AppLink from './AppLink'

export default function EditorialCta({
  anchor,
  kicker = 'Applications are now open',
  title = 'Applications Are Now Open.',
  copy,
  primaryLabel = 'Apply Now',
  primaryTo = '/join',
  secondaryLabel = 'Partner With Us',
  secondaryTo = '/partners',
  secondaryHref,
  dark = true,
  variant = 'join-final',
}) {
  const sectionClass = ['site-section', dark ? 'dark' : '', 'join-final-section'].filter(Boolean).join(' ')
  const blockClass = variant === 'join-final' ? 'join-final reveal' : 'about-cta'

  return (
    <section className={sectionClass}>
      <div className="shell">
        {anchor ? (
          <div className="editorial-cta-wrap">
            <div className="section-number section-number--cta reveal">{anchor}</div>
            <div className={blockClass} data-motion="scale">
              <p className="kicker reveal">{kicker}</p>
              <h2 className="reveal">{title}</h2>
              {copy && (
                Array.isArray(copy)
                  ? copy.map((text) => <p key={text}>{text}</p>)
                  : <p>{copy}</p>
              )}
              <div className="waitlist-actions">
                <AppLink className="button reveal" to={primaryTo}>{primaryLabel}</AppLink>
                {secondaryLabel && (secondaryHref || secondaryTo) && (
                  secondaryHref
                    ? <a className="button secondary reveal" href={secondaryHref}>{secondaryLabel}</a>
                    : <AppLink className="button secondary reveal" to={secondaryTo}>{secondaryLabel}</AppLink>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className={blockClass} data-motion="scale">
            <p className="kicker reveal">{kicker}</p>
            <h2 className="reveal">{title}</h2>
            {copy && (
              Array.isArray(copy)
                ? copy.map((text) => <p key={text}>{text}</p>)
                : <p>{copy}</p>
            )}
            <div className="waitlist-actions">
              <AppLink className="button reveal" to={primaryTo}>{primaryLabel}</AppLink>
              {secondaryLabel && (secondaryHref || secondaryTo) && (
                secondaryHref
                  ? <a className="button secondary reveal" href={secondaryHref}>{secondaryLabel}</a>
                  : <AppLink className="button secondary reveal" to={secondaryTo}>{secondaryLabel}</AppLink>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
