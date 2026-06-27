import eduvosPartner from '../../shapes/eduvos.png?url'
import lovablePartner from '../../shapes/lovable.png?url'
import velozPartner from '../../shapes/veloz.png?url'

const PARTNERS = [
  {
    name: 'Eduvos',
    src: eduvosPartner,
    alt: 'Eduvos Menlyn campus host',
  },
  {
    name: 'Lovable',
    src: lovablePartner,
    alt: 'Lovable AI build platform partner',
  },
  {
    name: 'VelozTech',
    src: velozPartner,
    alt: 'VelozTech industry innovation partner',
  },
]

function PartnerLogo({ partner, hidden = false }) {
  return (
    <div
      className="guild-partner-gallery__item"
      role="listitem"
      aria-hidden={hidden || undefined}
    >
      <img src={partner.src} alt={hidden ? '' : partner.alt} loading="lazy" draggable="false" />
    </div>
  )
}

export default function PartnerGallery() {
  return (
    <section className="guild-partner-gallery" aria-label="GUILD SA ecosystem partners">
      <p className="guild-partner-gallery__display-title" aria-hidden="true">Partners</p>

      <div className="guild-partner-gallery__details reveal">
        <p className="kicker">Ecosystem partners</p>
        <h2>Built With Partners Who Believe In Builders.</h2>
        <p className="guild-partner-gallery__lead">
          Eduvos, Lovable, VelozTech, and HLTC — campus access, AI build tooling, industry mentorship, and talent pathways for the inaugural Buildathon.
        </p>
      </div>

      <div className="guild-partner-gallery__page">
        <div className="guild-partner-gallery__track" role="list" aria-label="Partner logos">
          {PARTNERS.map((partner) => (
            <PartnerLogo key={partner.name} partner={partner} />
          ))}
          {PARTNERS.map((partner) => (
            <PartnerLogo key={`${partner.name}-clone`} partner={partner} hidden />
          ))}
        </div>
      </div>
    </section>
  )
}
