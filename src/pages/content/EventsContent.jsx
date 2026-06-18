import AppLink from '../../components/AppLink'
import EditorialCta from '../../components/EditorialCta'
import { EVENT_TIMELINE } from '../../lib/eventTimeline'

export default function EventsContent() {
  return (
    <>
      <section className="page-hero compact">
            <div className="shell">
              <p className="eyebrow reveal">04 / GUILD SA AI Buildathon 01</p>
              <h1 className="reveal" data-motion="left">Build A Real Product.<br />Present It To Industry.</h1>
              <p className="hero-copy reveal">Join 100 student builders at Eduvos Menlyn for a one-day AI Buildathon focused on execution, collaboration, and real-world problem solving.</p>
              <p className="activation-meta reveal">Powered by Eduvos • Lovable • VelozTech</p>
              <div className="partner-hero-evidence reveal" aria-label="Buildathon facts">
                <span>100 Builders</span>
                <span>3–5 Per Team</span>
                <span>01 August 2026</span>
                <span>07:00–17:00</span>
              </div>
              <div className="waitlist-actions reveal">
                <AppLink className="button" to="/join">Apply Now</AppLink>
                <a className="button secondary" href="#event-schedule">View Schedule</a>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">02</div>
                <div>
                  <p className="kicker reveal">Why this event exists</p>
                  <h2 className="reveal">South Africa Has Talent.<br />This Is Where It Becomes Visible.</h2>
                  <p className="section-intro reveal">The GUILD SA AI Buildathon was created to help students move beyond theory and demonstrate what they can actually build.</p>
                  <p className="section-intro reveal">Participants work in teams to design, build, test, and publicly demonstrate AI-powered solutions in a single day.</p>
                  <p className="section-intro reveal">The objective is not participation. The objective is proof.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="site-section about-depth-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">03</div>
                <div>
                  <p className="kicker reveal">What you leave with</p>
                  <h2 className="reveal">More Than A Certificate.</h2>
                </div>
              </div>
              <div className="about-entry-grid">
                <article className="about-entry-card reveal"><span>Build A Real MVP</span><p>Leave with a working product.</p></article>
                <article className="about-entry-card reveal"><span>Portfolio Evidence</span><p>Demonstrate what you can actually build.</p></article>
                <article className="about-entry-card reveal"><span>Industry Feedback</span><p>Receive guidance from mentors and practitioners.</p></article>
                <article className="about-entry-card reveal"><span>Public Demo</span><p>Present your work in front of judges and partners.</p></article>
                <article className="about-entry-card reveal"><span>Team Experience</span><p>Collaborate across technical and product roles.</p></article>
                <article className="about-entry-card reveal"><span>Future Opportunities</span><p>Selected teams may receive incubation, visibility, and continuation pathways.</p></article>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">04</div>
                <div>
                  <p className="kicker reveal">Event details</p>
                  <h2 className="reveal">Buildathon 01</h2>
                </div>
              </div>
              <div className="about-entry-grid">
                <article className="about-entry-card reveal"><span>Date</span><p>01 August 2026</p></article>
                <article className="about-entry-card reveal"><span>Venue</span><p>Eduvos Menlyn Campus</p></article>
                <article className="about-entry-card reveal"><span>Location</span><p>Pretoria</p></article>
                <article className="about-entry-card reveal"><span>Format</span><p>One-Day AI Buildathon</p></article>
                <article className="about-entry-card reveal"><span>Capacity</span><p>100 Builders</p></article>
                <article className="about-entry-card reveal"><span>Team Size</span><p>3–5 Participants</p></article>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">05</div>
                <div>
                  <p className="kicker reveal">The challenge</p>
                  <h2 className="reveal">One Day.<br />One Team.<br />One Working Product.</h2>
                  <p className="section-intro reveal">Teams will identify a real-world problem, define a practical MVP, build using modern AI tools, prepare a live demonstration, and present publicly.</p>
                  <p className="section-intro reveal">The focus is not slides. The focus is execution.</p>
                </div>
              </div>
              <div className="grid five">
                <article className="panel reveal"><span className="index">01</span><h3>Identify a real-world problem.</h3><p>Start with a challenge worth solving.</p></article>
                <article className="panel reveal"><span className="index">02</span><h3>Define a practical MVP.</h3><p>Choose the smallest useful product you can demonstrate.</p></article>
                <article className="panel reveal"><span className="index">03</span><h3>Build using modern AI tools.</h3><p>Accelerate development with the tools powering the cohort.</p></article>
                <article className="panel reveal"><span className="index">04</span><h3>Prepare a live demonstration.</h3><p>Make the product understandable, testable, and real.</p></article>
                <article className="panel reveal"><span className="index">05</span><h3>Present publicly.</h3><p>Defend your decisions in front of judges and partners.</p></article>
              </div>
            </div>
          </section>

          <section className="site-section events-command-section" id="event-schedule">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">06</div>
                <div>
                  <p className="kicker reveal">Event journey</p>
                  <h2 className="reveal">How The Day Works.</h2>
                  <p className="section-intro reveal">The day is built for momentum — from planning to public demonstration in a single push.</p>
                  <div className="about-transform-list reveal">
                    <span>Plan</span>
                    <span>Build</span>
                    <span>Test</span>
                    <span>Demo</span>
                    <span>Launch</span>
                  </div>
                </div>
              </div>
              <div className="timeline">
                {EVENT_TIMELINE.map((row) => (
                  <div key={row.time} className="timeline-row event-timeline-row reveal">
                    <span className="time">{row.time}</span>
                    <h3>{row.title}</h3>
                    <p>{row.copy}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="site-section dark">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">07</div>
                <div>
                  <p className="kicker reveal">Judging criteria</p>
                  <h2 className="reveal">What Judges Look For.</h2>
                  <p className="section-intro reveal">Projects are evaluated on execution quality — not presentation polish alone.</p>
                </div>
              </div>
              <div className="about-entry-grid">
                <article className="about-entry-card reveal"><span>Problem Relevance</span><p>Does the solution address a meaningful real-world challenge?</p></article>
                <article className="about-entry-card reveal"><span>Technical Execution</span><p>Does the MVP work, and can the team explain how it was built?</p></article>
                <article className="about-entry-card reveal"><span>Product Thinking</span><p>Is the solution practical, focused, and clearly scoped?</p></article>
                <article className="about-entry-card reveal"><span>User Experience</span><p>Is the product usable and understandable for its intended audience?</p></article>
                <article className="about-entry-card reveal"><span>Innovation</span><p>Does the team bring fresh thinking to the problem space?</p></article>
                <article className="about-entry-card reveal"><span>Feasibility</span><p>Is there a credible path for the product beyond demo day?</p></article>
                <article className="about-entry-card reveal"><span>Demo Quality</span><p>Can the team present, defend, and demonstrate their work with confidence?</p></article>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">08</div>
                <div>
                  <p className="kicker reveal">Partners & opportunities</p>
                  <h2 className="reveal">Built With Partners Who Believe In Builders.</h2>
                  <p className="section-intro reveal">VelozTech supports challenge framing, mentorship, incubation pathways, practical exposure opportunities, and future talent development initiatives.</p>
                </div>
              </div>
              <div className="grid three partner-signal-grid">
                <article className="card reveal"><span className="index">01</span><h3>Eduvos</h3><p>Eduvos Menlyn anchors the inaugural Buildathon — the physical home where 100 builders meet, collaborate, and ship.</p><div className="tags"><span>Campus</span><span>Host</span></div></article>
                <article className="card reveal"><span className="index">02</span><h3>Lovable</h3><p>Lovable provides the AI development environment and participant credits to accelerate MVP creation throughout the day.</p><div className="tags"><span>AI tools</span><span>Credits</span></div></article>
                <article className="card reveal"><span className="index">03</span><h3>VelozTech</h3><p>VelozTech brings industry context, mentorship, incubation pathways, and talent development opportunities to the cohort.</p><div className="tags"><span>Mentorship</span><span>Pathways</span></div></article>
              </div>
            </div>
          </section>

          <section className="site-section home-proof-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">09</div>
                <div>
                  <p className="kicker reveal">Build stack</p>
                  <h2 className="reveal">Build With Modern AI Tools.</h2>
                  <p className="section-intro reveal">Tools that compress the distance between idea, prototype, demo, and deployment.</p>
                </div>
              </div>
              <div className="tool-grid">
                <article className="tool-card reveal"><span>Cursor</span><p>Ship faster with AI-assisted development.</p></article>
                <article className="tool-card reveal"><span>Lovable</span><p>Turn ideas into working interfaces in hours.</p></article>
                <article className="tool-card reveal"><span>GitHub</span><p>Version, collaborate, and show your build history.</p></article>
                <article className="tool-card reveal"><span>Figma</span><p>Design before you ship.</p></article>
                <article className="tool-card reveal"><span>Netlify</span><p>Deploy demos that are live and shareable.</p></article>
                <article className="tool-card reveal"><span>Render</span><p>Run backends that make MVPs real.</p></article>
              </div>
            </div>
          </section>

          <section className="site-section dark">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">10</div>
                <div>
                  <p className="kicker reveal">Beyond the event</p>
                  <h2 className="reveal">The Event Ends.<br />The Momentum Doesn't.</h2>
                  <p className="section-intro reveal">The strongest projects do not disappear after demo day. The Buildathon is the beginning of the journey, not the destination.</p>
                </div>
              </div>
              <div className="about-entry-grid">
                <article className="about-entry-card reveal"><span>Guild Labs</span><p>Structured continuation for teams ready to keep building.</p></article>
                <article className="about-entry-card reveal"><span>Mentorship</span><p>Ongoing guidance from practitioners who understand execution.</p></article>
                <article className="about-entry-card reveal"><span>Project Showcases</span><p>Public visibility that carries proof beyond the room.</p></article>
                <article className="about-entry-card reveal"><span>Partner Reviews</span><p>Industry conversations sparked by demonstrated capability.</p></article>
                <article className="about-entry-card reveal"><span>Industry Introductions</span><p>Connections to employers, founders, and sponsors.</p></article>
                <article className="about-entry-card reveal"><span>Incubation Pathways</span><p>Routes for high-potential teams to deepen products and unlock opportunity.</p></article>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">11</div>
                <div>
                  <p className="kicker reveal">Why GUILD SA events are different</p>
                  <h2 className="reveal">Built For Execution.</h2>
                </div>
              </div>
              <div className="grid three">
                <article className="card reveal"><span className="index">Output</span><h3>Most events reward attendance.</h3><p>GUILD SA rewards output — what you ship, demo, and defend publicly.</p></article>
                <article className="card reveal"><span className="index">Demonstration</span><h3>Most events end with presentations.</h3><p>GUILD SA begins with demonstrations — working products, not slide decks.</p></article>
                <article className="card reveal"><span className="index">Evidence</span><h3>Most events measure participation.</h3><p>GUILD SA measures what gets built — and what that proves about you.</p></article>
              </div>
            </div>
          </section>

          <EditorialCta
            copy="100 builders. One campus. One day. Join the inaugural GUILD SA AI Buildathon and help launch a new generation of builders."
          />
    </>
  )
}
