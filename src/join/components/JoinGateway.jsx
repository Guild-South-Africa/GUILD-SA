import { Link } from 'react-router-dom'
import { PATHWAY_CARDS } from '../lib/formConfigs'
import { useGuildPageEffects } from '../../hooks/useGuildPageEffects'
import EditorialCta from '../../components/EditorialCta'

const WHY_APPLY = [
  { title: 'Build A Real MVP', copy: 'Work with a team to create a functioning product.' },
  { title: 'Create Portfolio Proof', copy: 'Leave with evidence of capability.' },
  { title: 'Receive Industry Feedback', copy: 'Present directly to mentors and judges.' },
  { title: 'Build Your Network', copy: 'Meet builders, designers, founders, and innovators.' },
  { title: 'Get Seen', copy: 'Showcase your work publicly.' },
  { title: 'Unlock Future Opportunities', copy: 'Selected projects may receive incubation, mentorship, WIL, and continuation support.' },
]

const WHO_SHOULD_APPLY = [
  { title: 'Developers', copy: 'Build functional products and technical workflows.' },
  { title: 'Designers', copy: 'Shape usable experiences and clear product flows.' },
  { title: 'Product Thinkers', copy: 'Frame problems, scope MVPs, and guide team decisions.' },
  { title: 'AI Enthusiasts', copy: 'Turn modern tools into useful real-world solutions.' },
  { title: 'Entrepreneurs', copy: 'Bring urgency, ideas, and builder energy to the team.' },
  { title: 'Students Curious About Building', copy: 'Ready to learn by doing — no prior hackathon required.' },
]

const REQUIREMENTS = [
  { index: 'Student', title: 'Current student or recent graduate.', copy: 'Open to emerging builders connected to student communities.' },
  { index: 'Laptop', title: 'Laptop & charger.', copy: 'Your own machine for a full day of building.' },
  { index: 'Collaborate', title: 'Willingness to collaborate.', copy: 'Strong teams are built on communication and shared effort.' },
  { index: 'Build', title: 'Willingness to build.', copy: 'Show up ready to create something real in one day.' },
]

const SELECTION = [
  { index: 'Motivation', title: 'Ready to show up and build.', copy: 'We look for applicants who want to create, not just attend.' },
  { index: 'Skill diversity', title: 'Range across the cohort.', copy: 'Developers, designers, product thinkers, and AI builders in balance.' },
  { index: 'Team balance', title: 'Strong teams need different strengths.', copy: 'Individual applications are placed to form capable, complementary teams.' },
  { index: 'Execution mindset', title: 'Focus on shipping.', copy: 'The day rewards collaboration, clarity, and willingness to demo real work.' },
]

const AFTER_BUILDATHON = [
  { title: 'Guild Labs Invitations', copy: 'Continue building with structured support beyond event day.' },
  { title: 'Mentorship', copy: 'Ongoing guidance from practitioners who understand execution.' },
  { title: 'Project Showcases', copy: 'Public visibility that carries your proof beyond the room.' },
  { title: 'Industry Introductions', copy: 'Connections to employers, founders, and partners.' },
  { title: 'Incubation Pathways', copy: 'Routes for high-potential teams to deepen products and unlock opportunity.' },
  { title: 'Practical Exposure & WIL', copy: 'Practical exposure opportunities and work-integrated learning pathways.' },
]

const FAQ = [
  { index: 'Team', title: 'Do I need a team?', copy: 'No. Apply as an individual and we\'ll help place you in a balanced team — or bring your own existing team.' },
  { index: 'Experience', title: 'Do I need experience?', copy: 'No previous hackathon or advanced technical background required. Curiosity and commitment matter most.' },
  { index: 'Bring', title: 'What should I bring?', copy: 'Laptop, charger, student ID, and the energy to build for a full day.' },
  { index: 'Food', title: 'Will food be provided?', copy: 'Catering and logistics details are shared with confirmed builders before the event.' },
  { index: 'Cost', title: 'Is participation free?', copy: 'Yes. The inaugural Buildathon is free for selected builders.' },
  { index: 'After', title: 'What happens after the event?', copy: 'Selected teams may enter Guild Labs, mentorship, showcases, incubation, industry introductions, and WIL pathways.' },
  { index: 'Selection', title: 'How are teams selected?', copy: 'We review applications to build balanced teams across skills, roles, and motivation — not just experience level.' },
  { index: 'Graduates', title: 'Can recent graduates apply?', copy: 'Yes. Recent graduates connected to student communities are welcome to apply.' },
]

export default function JoinGateway() {
  useGuildPageEffects()

  return (
    <div className="join-gateway-view">
      <section className="page-hero compact join-hero">
        <div className="shell">
          <p className="eyebrow reveal">06 / Apply</p>
          <h1 className="reveal" data-motion="left">Apply To Join The Campus Pool.</h1>
          <p className="hero-copy reveal">Applications are now open for the inaugural GUILD SA AI Buildathon at Eduvos Menlyn. Campus registrations open to a ~100-student pool — forty elite second- and third-year developers will be selected for the 10-hour live sprint.</p>
          <div className="partner-hero-evidence reveal" aria-label="Buildathon availability">
            <span>~100 Campus Pool</span>
            <span>40 Sprint Floor</span>
            <span>01 August 2026</span>
            <span>Eduvos Menlyn</span>
          </div>
          <div className="waitlist-actions reveal">
            <Link className="button" to="/join/student">Apply Now</Link>
            <Link className="button secondary" to="/events">View Event Details</Link>
          </div>
        </div>
      </section>

      <section className="site-section join-section about-depth-section">
        <div className="shell">
          <div className="section-header">
            <div className="section-number reveal">02</div>
            <div>
              <p className="kicker reveal">Why apply?</p>
              <h2 className="reveal">Why Builders Are Joining.</h2>
            </div>
          </div>
          <div className="about-entry-grid">
            {WHY_APPLY.map((item) => (
              <article key={item.title} className="about-entry-card reveal">
                <span>{item.title}</span>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-section join-section">
        <div className="shell">
          <div className="section-header">
            <div className="section-number reveal">03</div>
            <div>
              <p className="kicker reveal">Who should apply</p>
              <h2 className="reveal">Built For Builders.</h2>
              <p className="section-intro reveal">The strongest teams combine multiple perspectives and skill sets.</p>
            </div>
          </div>
          <div className="about-entry-grid">
            {WHO_SHOULD_APPLY.map((item) => (
              <article key={item.title} className="about-entry-card reveal">
                <span>{item.title}</span>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="section-header" id="application-pathways">
            <div className="section-number reveal">04</div>
            <div>
              <p className="kicker reveal">Application pathways</p>
              <h2 className="reveal">Choose Your Entry Point.</h2>
            </div>
          </div>

          <div className="join-entry-grid reveal" data-motion="up">
            {PATHWAY_CARDS.map((card) => (
              <article key={card.index} className={`join-entry-card${card.wide ? ' is-wide' : ''}`}>
                <span className="index">{card.index}</span>
                <h3>{card.title}</h3>
                <p>{card.copy}</p>
                <Link className="button secondary" to={card.to}>
                  {card.index === '03' ? 'Join' : 'Apply'}
                </Link>
              </article>
            ))}
          </div>

          <div className="section-header">
            <div className="section-number reveal">05</div>
            <div>
              <p className="kicker reveal">What you need</p>
              <h2 className="reveal">Requirements.</h2>
              <p className="section-intro reveal">No previous hackathon experience required. No existing team required. No advanced technical background required. Curiosity and commitment matter most.</p>
            </div>
          </div>
          <div className="grid four">
            {REQUIREMENTS.map((item) => (
              <article key={item.index} className="panel reveal">
                <span className="index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="section-header">
            <div className="section-number reveal">06</div>
            <div>
              <p className="kicker reveal">How selection works</p>
              <h2 className="reveal">How We Select The Cohort.</h2>
              <p className="section-intro reveal">Campus registrations open to a ~100-student pool. Forty elite second- and third-year developers will be selected for the 10-hour live sprint. Applications are reviewed to create balanced teams with diverse skills and backgrounds.</p>
              <p className="section-intro reveal">The goal is not to select the most experienced people. The goal is to create the strongest possible collaborative environment.</p>
            </div>
          </div>
          <div className="grid four">
            {SELECTION.map((item) => (
              <article key={item.index} className="panel reveal">
                <span className="index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="section-header">
            <div className="section-number reveal">07</div>
            <div>
              <p className="kicker reveal">What happens after</p>
              <h2 className="reveal">The Buildathon Is Only The Beginning.</h2>
              <p className="section-intro reveal">The strongest projects do not disappear after demo day. The objective is not simply to participate. The objective is to build momentum.</p>
            </div>
          </div>
          <div className="about-entry-grid">
            {AFTER_BUILDATHON.map((item) => (
              <article key={item.title} className="about-entry-card reveal">
                <span>{item.title}</span>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>

          <div className="section-header">
            <div className="section-number reveal">FAQ</div>
            <div>
              <p className="kicker reveal">Questions</p>
              <h2 className="reveal">Before You Apply.</h2>
            </div>
          </div>
          <div className="grid three">
            {FAQ.map((item) => (
              <article key={item.index} className="panel reveal">
                <span className="index">{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EditorialCta
        anchor="40"
        kicker="Sprint floor selection"
        title="Forty Elite Developers. One Live Sprint."
        copy={[
          'Campus registrations open to a ~100-student pool. Forty elite second- and third-year developers will be selected for the 10-hour live sprint at Eduvos Menlyn.',
          'GUILD SA is building a national ecosystem of student builders, mentors, partners, and innovators. The inaugural AI Buildathon is the first step.',
        ]}
        primaryLabel="Apply Now"
        primaryTo="/join/student"
        secondaryLabel="Partner With Us"
        secondaryTo="/partners"
        dark={false}
      />
    </div>
  )
}
