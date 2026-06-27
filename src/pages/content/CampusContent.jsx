import AppLink from '../../components/AppLink'
import EditorialCta from '../../components/EditorialCta'

export default function CampusContent() {
  return (
    <>
      <section className="page-hero compact">
            <div className="shell">
              <p className="eyebrow reveal">03 / Campus Guild</p>
              <h1 className="reveal" data-motion="left">The Local Home For Builders.</h1>
              <p className="hero-copy reveal">Campus Guilds are the student-facing layer of GUILD SA, bringing builders together inside institutions to collaborate, learn through execution, and ship real-world projects.</p>
              <p className="hero-copy reveal">Every Buildathon starts somewhere. Every team forms somewhere. Every project begins somewhere. Campus Guilds are where builders meet before the work begins.</p>
              <AppLink className="button reveal" to="/join">Join A Campus Guild</AppLink>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="editorial">
                <div className="copy">
                  <p className="kicker reveal">What is a Campus Guild?</p>
                  <h2 className="reveal">More Than A Club.<br />Built For Builders.</h2>
                  <p className="section-intro reveal">A Campus Guild is not a student society. It is not an event calendar. It is not a discussion group.</p>
                  <p className="section-intro reveal">A Campus Guild is an execution environment designed to help students find teammates, join projects, access mentors, participate in Buildathons, develop practical skills, and continue building beyond events.</p>
                  <p className="section-intro reveal">The purpose is simple: help builders find other builders.</p>
                </div>
                <div className="visual photo-campus reveal" data-caption="Eduvos Menlyn / first Campus Guild"></div>
              </div>
            </div>
          </section>

          <section className="campus-highlight-section" aria-labelledby="campus-highlights-title">
            <div className="campus-highlight-intro reveal" id="campus-highlights-title">
              <div className="campus-highlight-big" aria-hidden="true">
                <span>Eduvos</span>
                <span>Menlyn</span>
                <strong>pilot campus</strong>
              </div>
              <ul>
                <li>Explore moments from the pilot Campus Guild</li>
                <li>Open a card to see what happens inside</li>
                <li>Where the first builders meet before the work begins</li>
              </ul>
            </div>
            <div className="campus-highlight-board" data-campus-cards>
              <details className="campus-event-card reveal" style={{ '--tilt': '-5deg', '--x': '-6px', '--y': '10px' }}>
                <summary style={{ '--photo': 'url(\'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998003/Hackathon_team_zrlwkj.jpg\')' }}>
                  <div className="campus-card-title"><h3>Builders Arrive</h3></div>
                </summary>
                <div className="campus-card-detail"><h3>Where it starts</h3><p>Students enter the Campus Guild ready to collaborate, commit to building, and find people who want to ship real work.</p></div>
              </details>
              <details className="campus-event-card reveal" style={{ '--tilt': '4deg', '--x': '8px', '--y': '-8px' }}>
                <summary style={{ '--photo': 'url(\'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777211575/Founders_Table_rkvq1q.png\')' }}>
                  <div className="campus-card-title"><h3>Mentor Access</h3></div>
                </summary>
                <div className="campus-card-detail"><h3>Guidance from practitioners</h3><p>Mentors help teams sharpen scope, pressure-test ideas, and focus on what can actually ship.</p></div>
              </details>
              <details className="campus-event-card reveal" style={{ '--tilt': '-2deg', '--x': '2px', '--y': '12px' }}>
                <summary style={{ '--photo': 'url(\'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998032/Guild_Hackathon_promotional_poster_on_window_su0yhg.png\')' }}>
                  <div className="campus-card-title"><h3>Team Formation</h3></div>
                </summary>
                <div className="campus-card-detail"><h3>Builders find each other</h3><p>Students group around skills, urgency, and ideas — not passive attendance.</p></div>
              </details>
              <details className="campus-event-card reveal" style={{ '--tilt': '6deg', '--x': '-8px', '--y': '-4px' }}>
                <summary style={{ '--photo': 'url(\'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998038/hack_poster_e6kyfr.png\')' }}>
                  <div className="campus-card-title"><h3>Community</h3></div>
                </summary>
                <div className="campus-card-detail"><h3>Connected between events</h3><p>The Campus Guild keeps builders linked through projects, accountability, and momentum beyond a single sprint.</p></div>
              </details>
              <details className="campus-event-card reveal" style={{ '--tilt': '-7deg', '--x': '10px', '--y': '8px' }}>
                <summary style={{ '--photo': 'url(\'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998011/Billboard2_evpkx2.png\')' }}>
                  <div className="campus-card-title"><h3>Public Demo</h3></div>
                </summary>
                <div className="campus-card-detail"><h3>Work becomes visible</h3><p>Teams present what they built — turning effort into proof peers, mentors, and partners can evaluate.</p></div>
              </details>
              <details className="campus-event-card reveal" style={{ '--tilt': '3deg', '--x': '-2px', '--y': '-10px' }}>
                <summary style={{ '--photo': 'url(\'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998022/Brand_Flags_izzch1.png\')' }}>
                  <div className="campus-card-title"><h3>Partner Access</h3></div>
                </summary>
                <div className="campus-card-detail"><h3>Opportunity opens up</h3><p>Strong execution connects builders to industry feedback, showcases, and continuation pathways.</p></div>
              </details>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">03</div>
                <div>
                  <p className="kicker reveal">Pilot campus</p>
                  <h2 className="reveal">The First Guild Begins At Eduvos Menlyn.</h2>
                  <p className="section-intro reveal">Eduvos Menlyn serves as the pilot Campus Guild and the first live environment for testing, refining, and scaling the GUILD SA model.</p>
                  <p className="section-intro reveal">The inaugural AI Buildathon marks the beginning of a broader campus ecosystem designed to expand across South Africa.</p>
                </div>
              </div>
              <div className="stat-strip">
                <div className="stat reveal"><strong>~100</strong><span>Campus Pool</span></div>
                <div className="stat reveal"><strong>40</strong><span>Sprint Floor</span></div>
                <div className="stat reveal"><strong>1</strong><span>Pilot Campus</span></div>
                <div className="stat reveal"><strong>01 Aug</strong><span>2026</span></div>
                <div className="stat reveal"><strong>PTA</strong><span>Pretoria</span></div>
              </div>
            </div>
          </section>

          <section className="site-section about-depth-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">04</div>
                <div>
                  <p className="kicker reveal">Inside a Campus Guild</p>
                  <h2 className="reveal">Built Around Momentum.</h2>
                </div>
              </div>
              <div className="about-entry-grid">
                <article className="about-entry-card reveal"><span>Team Formation</span><p>Meet builders with complementary skills.</p></article>
                <article className="about-entry-card reveal"><span>Project Discovery</span><p>Find ideas, challenges, and opportunities worth solving.</p></article>
                <article className="about-entry-card reveal"><span>Mentorship</span><p>Access guidance from practitioners and ecosystem partners.</p></article>
                <article className="about-entry-card reveal"><span>Buildathons</span><p>Participate in execution-focused sprint environments.</p></article>
                <article className="about-entry-card reveal"><span>Community</span><p>Stay connected between events.</p></article>
                <article className="about-entry-card reveal"><span>Continuation</span><p>Keep building after the Buildathon ends.</p></article>
              </div>
            </div>
          </section>

          <section className="site-section dark">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">05</div>
                <div>
                  <p className="kicker reveal">The Guilder experience</p>
                  <h2 className="reveal">What It Means To Be A Guilder.</h2>
                  <p className="section-intro reveal">Guilders are not attendees. Guilders are active participants in a culture of execution. They contribute. They collaborate. They build.</p>
                  <p className="section-intro reveal">Membership represents both belonging and responsibility. A Guilder is expected to create, learn publicly, support others, and move projects forward.</p>
                </div>
              </div>
              <div className="grid four">
                <article className="card reveal"><span className="index">Contribute</span><h3>Show up with intent.</h3><p>Guilders bring skills, energy, and commitment — not passive presence.</p></article>
                <article className="card reveal"><span className="index">Collaborate</span><h3>Build with others.</h3><p>Strong projects happen when builders find teammates who push the work forward.</p></article>
                <article className="card reveal"><span className="index">Execute</span><h3>Ship real work.</h3><p>Learning happens through building, demoing, and improving in public.</p></article>
                <article className="card reveal"><span className="index">Continue</span><h3>Keep momentum alive.</h3><p>The best Guilders stay engaged between events and help others do the same.</p></article>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">06</div>
                <div>
                  <p className="kicker reveal">National connection</p>
                  <h2 className="reveal">One Ecosystem.<br />Many Campuses.</h2>
                  <p className="section-intro reveal">Each Campus Guild operates locally while remaining connected to a national network of builders. Students benefit from local communities while participating in something larger than a single institution.</p>
                </div>
              </div>
              <div className="about-entry-grid">
                <article className="about-entry-card reveal"><span>Standards</span><p>Shared expectations for how builders show up and ship work.</p></article>
                <article className="about-entry-card reveal"><span>Workflows</span><p>Clear paths from interest to team to project to demo.</p></article>
                <article className="about-entry-card reveal"><span>Events</span><p>Buildathons and activations that create execution pressure.</p></article>
                <article className="about-entry-card reveal"><span>Mentorship</span><p>Practitioner access across the network.</p></article>
                <article className="about-entry-card reveal"><span>Partner Access</span><p>Industry connections that open doors for strong builders.</p></article>
                <article className="about-entry-card reveal"><span>Project Visibility</span><p>Proof that travels beyond a single campus.</p></article>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">07</div>
                <div>
                  <p className="kicker reveal">Expansion roadmap</p>
                  <h2 className="reveal">Growing The Network.</h2>
                  <p className="section-intro reveal">The long-term vision is a connected network of Campus Guilds across universities and private institutions throughout South Africa.</p>
                  <p className="section-intro reveal">Expansion begins with Eduvos Menlyn and grows campus by campus through partnerships, student leadership, and demonstrated success.</p>
                </div>
              </div>
              <div className="grid four">
                <article className="card reveal">
                  <span className="index">01</span>
                  <h3>Eduvos Menlyn</h3>
                  <p style={{ color: 'var(--orange)', fontWeight: '600', marginBottom: '1rem' }}>01 August 2026</p>
                  <p>The pilot Campus Guild and first live environment where the GUILD SA model takes shape.</p>
                </article>
                <article className="card reveal">
                  <span className="index">02</span>
                  <h3>Future Partner Campus</h3>
                  <p style={{ color: 'var(--orange)', fontWeight: '600', marginBottom: '1rem' }}>Coming soon</p>
                  <p>The next Campus Guild activation as partnerships and student leadership scale the network.</p>
                </article>
                <article className="card reveal">
                  <span className="index">03</span>
                  <h3>Future Partner Campus</h3>
                  <p style={{ color: 'var(--orange)', fontWeight: '600', marginBottom: '1rem' }}>Coming soon</p>
                  <p>Additional institutions joining the national builder network as the model proves out.</p>
                </article>
                <article className="card reveal">
                  <span className="index">National</span>
                  <h3>South Africa</h3>
                  <p style={{ color: 'var(--orange)', fontWeight: '600', marginBottom: '1rem' }}>The vision</p>
                  <p>A distributed network of Campus Guilds connecting builders across the country.</p>
                </article>
              </div>
            </div>
          </section>

          <section className="campus-continuity-section">
            <div className="shell">
              <p className="kicker reveal">Why it matters</p>
              <h2 className="reveal">Strong Communities Create Strong Builders.</h2>
              <p className="hero-copy reveal">The best projects rarely happen in isolation. Builders need collaborators. Ideas need momentum. Teams need environments where progress compounds over time.</p>
              <p className="hero-copy reveal">Campus Guilds create those environments. The goal is not to create more events. The goal is to create more builders.</p>
            </div>
          </section>

          <section className="site-section dark">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">09</div>
                <div>
                  <p className="kicker reveal">From campus to opportunity</p>
                  <h2 className="reveal">How Opportunity Flows Through The Ecosystem.</h2>
                  <p className="section-intro reveal">Every layer exists to help builders move closer to visible opportunity.</p>
                  <div className="about-transform-list reveal">
                    <span>Campus Guild</span>
                    <span>Buildathon</span>
                    <span>Project</span>
                    <span>Demo</span>
                    <span>Visibility</span>
                    <span>Guild Labs</span>
                    <span>Industry Access</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <EditorialCta
            kicker="Get started"
            title="Start Building With Others."
            copy="Whether you're looking for teammates, projects, mentorship, or your next Buildathon, the Campus Guild is where the journey begins."
            primaryLabel="Join The Guild"
            secondaryLabel="Explore Events"
            secondaryTo="/events"
          />
    </>
  )
}
