export default function EditorialSection({
  number,
  kicker,
  title,
  intro,
  dark = false,
  className = '',
  id,
  children,
  headerExtra,
}) {
  const sectionClass = ['site-section', dark ? 'dark' : '', className].filter(Boolean).join(' ')

  return (
    <section className={sectionClass} id={id}>
      <div className="shell">
        {(number || kicker || title || intro || headerExtra) && (
          <div className="section-header">
            {number && <div className="section-number reveal">{number}</div>}
            <div>
              {kicker && <p className="kicker reveal">{kicker}</p>}
              {title && <h2 className="reveal">{title}</h2>}
              {intro && (
                Array.isArray(intro)
                  ? intro.map((text) => <p key={text} className="section-intro reveal">{text}</p>)
                  : <p className="section-intro reveal">{intro}</p>
              )}
              {headerExtra}
            </div>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
