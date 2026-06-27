import AppLink from '../../components/AppLink'
import MailingListForm from '../../components/MailingListForm'
import WhatsAppCommunityLink from '../../components/WhatsAppCommunityLink'
import CinematicHero from '../../components/CinematicHero'
import PartnerGallery from '../../components/PartnerGallery'
import { EVENT_TIMELINE } from '../../lib/eventTimeline'

export default function IndexContent() {
  return (
    <>
      <CinematicHero />

      <section className="site-section dark home-statement-section">
            <div className="shell">
              <div className="section-header section-header--centered">
                <div className="section-number reveal">01</div>
                <div>
                  <p className="kicker reveal">Why this exists</p>
                  <h2 className="home-statement reveal" data-motion="scale">South Africa Has Talent.<br /><span className="home-statement-accent">Now It Needs Proof</span></h2>
                  <p className="section-intro reveal">The GUILD SA AI Buildathon exists to help students move beyond theory and demonstrate what they can actually build. In one day, teams will collaborate, prototype, test, and present working AI-powered solutions in front of mentors, judges, and ecosystem partners. This is not a lecture. This is execution.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">02</div>
                <div>
                  <p className="kicker reveal">What participants gain</p>
                  <h2 className="reveal">What You Leave With.</h2>
                  <p className="section-intro reveal">Five outcomes that turn one day of building into evidence, exposure, and future opportunity.</p>
                </div>
              </div>
              <div className="story-strip">
                <article className="story-panel reveal">
                  <span className="index">01</span>
                  <h3>Build A Real MVP</h3>
                  <p>Turn an idea into a working product in a single day.</p>
                </article>
                <article className="story-panel feature reveal">
                  <span className="index">02</span>
                  <h3>Gain Portfolio Evidence</h3>
                  <p>Leave with something tangible you can showcase to employers and partners.</p>
                </article>
                <article className="story-panel reveal">
                  <span className="index">03</span>
                  <h3>Receive Industry Feedback</h3>
                  <p>Present directly to mentors, judges, and ecosystem partners.</p>
                </article>
              </div>
              <div className="grid two">
                <article className="panel reveal"><span className="index">04</span><h3>Build With A Team</h3><p>Collaborate across product, design, development, and AI.</p></article>
                <article className="panel reveal"><span className="index">05</span><h3>Unlock Future Opportunities</h3><p>Selected teams may receive incubation, exposure, and pathway opportunities including WIL and career routes.</p></article>
              </div>
              <p className="section-intro reveal" style={{ marginTop: '2rem' }}><AppLink className="button" to="/join">Apply Now</AppLink></p>
            </div>
          </section>

          <PartnerGallery />

          <section id="build-day-schedule" className="site-section home-system-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">04</div>
                <div>
                  <p className="kicker reveal">Event experience</p>
                  <h2 className="reveal">What Happens On Build Day?</h2>
                  <p className="section-intro reveal">07:00–17:00 at Eduvos Menlyn. One journey: Plan → Build → Test → Demo → Launch.</p>
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

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">05</div>
                <div>
                  <p className="kicker reveal">The challenge</p>
                  <h2 className="reveal">One Day. One Team. One Working Solution.</h2>
                  <p className="section-intro reveal">Teams will identify a problem, define an MVP, build using modern AI tools, and present a live demonstration by the end of the day.</p>
                  <p className="section-intro reveal"><AppLink className="button" to="/join">Apply Now</AppLink></p>
                </div>
              </div>
            </div>
          </section>

          <section className="site-section dark">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">06</div>
                <div>
                  <p className="kicker reveal">Why GUILD SA</p>
                  <h2 className="reveal">Why GUILD SA Is Different</h2>
                </div>
              </div>
              <div className="grid four">
                <article className="card reveal"><span className="index">Build</span><h3>Execution over theory</h3><p>Measured by what ships, not what you claim to know.</p></article>
                <article className="card reveal"><span className="index">Ship</span><h3>Working products over ideas</h3><p>One day. One MVP. One live demo.</p></article>
                <article className="card reveal"><span className="index">Prove</span><h3>Public demonstration over assumptions</h3><p>Industry sees your work in the room.</p></article>
                <article className="card reveal"><span className="index">Launch</span><h3>Continuation over completion</h3><p>Strong teams move into incubation and partner pathways.</p></article>
              </div>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">07</div>
                <div>
                  <p className="kicker reveal">Future pathways</p>
                  <h2 className="reveal">Beyond The Buildathon</h2>
                  <p className="section-intro reveal">GUILD SA is not a single event. The Buildathon is the first step into a growing ecosystem of campus communities, future build sprints, project showcases, industry partnerships, mentorship opportunities, and incubation pathways.</p>
                </div>
              </div>
              <div className="guild-system-slider reveal" data-guild-system-slider tabIndex="0">
                <svg className="guild-system-slider__sprites" aria-hidden="true" focusable="false">
                  <defs>
                    <path id="guild-system-play" fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="48" d="M190.06 414l163.12-139.78a24 24 0 000-36.44L190.06 98c-15.57-13.34-39.62-2.28-39.62 18.22v279.6c0 20.5 24.05 31.56 39.62 18.18z" />
                    <path id="guild-system-pause" fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="32" d="M176 96h16v320h-16zM320 96h16v320h-16z" />
                  </defs>
                </svg>
                <div className="guild-system-slider__stage">
                  <ul className="guild-system-slider__list">
                    <li className="guild-system-slider__slide" data-shader-index="0">
                      <img className="guild-system-slider__cover" src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998022/Brand_Flags_izzch1.png" alt="" loading="lazy" decoding="async" aria-hidden="true" />
                      <div className="guild-system-slider__visual"></div>
                      <div className="guild-system-slider__content">
                        <p className="guild-system-slider__label">Master brand</p>
                        <h3 className="guild-system-slider__title">Guild SA</h3>
                        <p className="guild-system-slider__description">National authority, trust, positioning, and public credibility.</p>
                        <button type="button" className="guild-system-slider__play ripple" aria-label="Play layer animation">
                          <span className="guild-system-slider__icon"><svg viewBox="0 0 512 512"><use href="#guild-system-play"></use></svg></span>
                        </button>
                      </div>
                    </li>
                    <li className="guild-system-slider__slide" data-shader-index="1">
                      <img className="guild-system-slider__cover" src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998003/Hackathon_team_zrlwkj.jpg" alt="" loading="lazy" decoding="async" aria-hidden="true" />
                      <div className="guild-system-slider__visual"></div>
                      <div className="guild-system-slider__content">
                        <p className="guild-system-slider__label">Campus layer</p>
                        <h3 className="guild-system-slider__title">Campus Guild</h3>
                        <p className="guild-system-slider__description">The student-facing program inside each institution.</p>
                        <button type="button" className="guild-system-slider__play ripple" aria-label="Play layer animation">
                          <span className="guild-system-slider__icon"><svg viewBox="0 0 512 512"><use href="#guild-system-play"></use></svg></span>
                        </button>
                      </div>
                    </li>
                    <li className="guild-system-slider__slide" data-shader-index="2">
                      <img className="guild-system-slider__cover" src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777211575/Founders_Table_rkvq1q.png" alt="" loading="lazy" decoding="async" aria-hidden="true" />
                      <div className="guild-system-slider__visual"></div>
                      <div className="guild-system-slider__content">
                        <p className="guild-system-slider__label">Community</p>
                        <h3 className="guild-system-slider__title">Guilders</h3>
                        <p className="guild-system-slider__description">Members, identity, mentorship, talks, and peer momentum.</p>
                        <button type="button" className="guild-system-slider__play ripple" aria-label="Play layer animation">
                          <span className="guild-system-slider__icon"><svg viewBox="0 0 512 512"><use href="#guild-system-play"></use></svg></span>
                        </button>
                      </div>
                    </li>
                    <li className="guild-system-slider__slide" data-shader-index="3">
                      <img className="guild-system-slider__cover" src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998037/hoodie1_pmtgqa.png" alt="" loading="lazy" decoding="async" aria-hidden="true" />
                      <div className="guild-system-slider__visual"></div>
                      <div className="guild-system-slider__content">
                        <p className="guild-system-slider__label">Output</p>
                        <h3 className="guild-system-slider__title">Guild Labs</h3>
                        <p className="guild-system-slider__description">Structured support for MVPs with real promise.</p>
                        <button type="button" className="guild-system-slider__play ripple" aria-label="Play layer animation">
                          <span className="guild-system-slider__icon"><svg viewBox="0 0 512 512"><use href="#guild-system-play"></use></svg></span>
                        </button>
                      </div>
                    </li>
                    <li className="guild-system-slider__slide" data-shader-index="4">
                      <img className="guild-system-slider__cover" src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998053/Poster_on_car_paozhi.png" alt="" loading="lazy" decoding="async" aria-hidden="true" />
                      <div className="guild-system-slider__visual"></div>
                      <div className="guild-system-slider__content">
                        <p className="guild-system-slider__label">Industry</p>
                        <h3 className="guild-system-slider__title">Partners</h3>
                        <p className="guild-system-slider__description">Challenge briefs, sponsorship, judging, and talent access.</p>
                        <button type="button" className="guild-system-slider__play ripple" aria-label="Play layer animation">
                          <span className="guild-system-slider__icon"><svg viewBox="0 0 512 512"><use href="#guild-system-play"></use></svg></span>
                        </button>
                      </div>
                    </li>
                    <li className="guild-system-slider__slide" data-shader-index="5">
                      <img className="guild-system-slider__cover" src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998038/hack_poster_e6kyfr.png" alt="" loading="lazy" decoding="async" aria-hidden="true" />
                      <div className="guild-system-slider__visual"></div>
                      <div className="guild-system-slider__content">
                        <p className="guild-system-slider__label">Event</p>
                        <h3 className="guild-system-slider__title">Sprint</h3>
                        <p className="guild-system-slider__description">The pressure environment where teams build and prove.</p>
                        <button type="button" className="guild-system-slider__play ripple" aria-label="Play layer animation">
                          <span className="guild-system-slider__icon"><svg viewBox="0 0 512 512"><use href="#guild-system-play"></use></svg></span>
                        </button>
                      </div>
                    </li>
                  </ul>
                  <nav className="guild-system-slider__nav" aria-label="System tree layers">
                    <button type="button" className="guild-system-slider__btn ripple prev" aria-label="Previous layer">
                      <span className="guild-system-slider__icon"><svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="48" d="M244 400L100 256l144-144M120 256h292"></path></svg></span>
                    </button>
                    <button type="button" className="guild-system-slider__btn ripple next" aria-label="Next layer">
                      <span className="guild-system-slider__icon"><svg viewBox="0 0 512 512"><path fill="none" stroke="currentColor" stroke-linecap="round" strokeLinejoin="round" strokeWidth="48" d="M268 112l144 144-144 144M392 256H100"></path></svg></span>
                    </button>
                  </nav>
                </div>
                <script type="x-shader/x-fragment" data-title="Guild SA" dangerouslySetInnerHTML={{ __html: `#version 300 es
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      out vec4 O;
      uniform vec2 resolution;
      uniform float time;
      #define R resolution
      #define T mod(time,6.2831)
      #define S smoothstep
      #define rot(a) mat2(cos(a+vec4(0,11,33,0)))
      #define guildHue(a) mix(vec3(0.882,0.706,0.243), mix(vec3(0.996,0.596,0.059), vec3(0.890,0.447,0.149), sin(a*2.0)*0.5+0.5), cos(a*1.5)*0.5+0.5)
      void main(void) {
      	vec2 uv = (gl_FragCoord.xy-.5*R)/min(R.x,R.y), p=uv;
      	vec3 col = vec3(0);
      	uv *= 18.;
      	uv += vec2(sin(2.*T+uv.y), cos(2.*T+uv.x))*.42;
      	for (float i=.0; i<3.; i++) {
      		col[int(i)]=vec3(2.5/(i+1.)*cos(T+i+5.*atan(uv.x,uv.y)))[int(i)]*pow(S(1.,.0,length(p)),6.);
      	}
      	col = pow(col,vec3(.4545));
      	col = sqrt(col);
      	col = S(1.,.0,.55/col);
      	col = vec3(length(col));
      	col *= vec3(1,.95,.9);
      	col = guildHue(guildHue(1.1*sqrt(col)));
      	O = vec4(col,1);
      }` }} />
                <script type="x-shader/x-fragment" data-title="Campus Guild" dangerouslySetInnerHTML={{ __html: `#version 300 es
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      out vec4 O;
      uniform float time;
      uniform vec2 resolution;
      #define R resolution
      #define T mod(time,6.2831)
      #define S smoothstep
      #define guildHue(a) mix(vec3(0.957,0.694,0.180), mix(vec3(0.882,0.706,0.243), vec3(0.996,0.596,0.059), sin(a*2.0)*0.5+0.5), cos(a*1.5)*0.5+0.5)
      void main(void) {
      	vec2 uv = (gl_FragCoord.xy-.5*R)/min(R.x,R.y), p = uv*8.;
      	vec3 col = vec3(0);
      	for (float i=1.; i<4.; i++) {
      		p.x += sin(i*p.y+T);
      		p.y += sin(i*p.x+T);
      		col[int(i-1.)] += length(p)-abs(uv.x);
      	}
      	col = pow(col,vec3(.4545));
      	col = sqrt(col);
      	col = S(1.,.0,.5/col);
      	col = vec3(length(col));
      	col *= vec3(1,.95,.9);
      	col = guildHue(guildHue(1.5*sqrt(col)));
      	col.r=.0;
      	col *= 1.4;
      	O = vec4(col,1);
      }` }} />
                <script type="x-shader/x-fragment" data-title="Guilders" dangerouslySetInnerHTML={{ __html: `#version 300 es
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      out vec4 O;
      uniform vec2 resolution;
      uniform float time;
      #define R resolution
      #define T mod(time,12.56637)
      #define S smoothstep
      #define guildHue(a) mix(vec3(0.996,0.596,0.059), mix(vec3(0.957,0.694,0.180), vec3(0.882,0.706,0.243), sin(a*2.0)*0.5+0.5), cos(a*1.5)*0.5+0.5)
      void main(void) {
      	vec2 uv = (gl_FragCoord.xy-.5*R)/min(R.x,R.y), p=uv;
      	vec3 col = vec3(0);
      	uv *= 9.;
      	for (float i=.0; i<3.; i++) {
      		uv.x += sin(i*uv.y+T*.5)*.8;
      		uv.y += cos(1.2+sin(i*uv.x+T));
      		col[int(i)]+=1.2/distance(p,uv)-.9;
      	}
      	col = pow(col,vec3(.4545));
      	col = sqrt(col);
      	col = S(1.,.0,.35/col);
      	col = vec3(length(col));
      	col *= vec3(1,.95,.9);
      	col = guildHue(guildHue(1.8*sqrt(col)));
      	O = vec4(col,1);
      }` }} />
                <script type="x-shader/x-fragment" data-title="Guild Labs" dangerouslySetInnerHTML={{ __html: `#version 300 es
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      out vec4 O;
      uniform vec2 resolution;
      uniform float time;
      #define R resolution
      #define T mod(time,3.141892)
      #define S smoothstep
      #define guildHue(a) mix(vec3(0.890,0.447,0.149), mix(vec3(0.996,0.596,0.059), vec3(0.957,0.694,0.180), sin(a*2.0)*0.5+0.5), cos(a*1.5)*0.5+0.5)
      void main(void) {
      	vec2 uv = (gl_FragCoord.xy-.5*R)/min(R.x,R.y);
      	vec3 col = vec3(0);
      	uv *= 5.;
      	vec2 p = vec2(sin(T+uv.y), cos(T+uv.x))*.75;
      	for (float i=.0; i<3.; i++) {
      		col[int(i)]+=1./(i+1.)*cos(2.*i-sin(length(p)/(.55+length(uv))));
      	}
      	col = pow(col,vec3(.4545));
      	col = sqrt(col);
      	col.r=col.g;
      	col = guildHue(guildHue(1.9*sqrt(col)));
      	col = pow(col, vec3(1.2))*1.2;
      	O = vec4(col,1);
      }` }} />
                <script type="x-shader/x-fragment" data-title="Partners" dangerouslySetInnerHTML={{ __html: `#version 300 es
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      out vec4 O;
      uniform vec2 resolution;
      uniform float time;
      #define R resolution
      #define T mod(time,6.2831)
      #define S smoothstep
      #define guildHue(a) mix(vec3(0.882,0.706,0.243), mix(vec3(0.890,0.447,0.149), vec3(0.996,0.596,0.059), sin(a*2.0)*0.5+0.5), cos(a*1.5)*0.5+0.5)
      void main(void) {
      	vec2 uv=(gl_FragCoord.xy-.5*R)/min(R.x,R.y);
      	vec3 col=vec3(0);
      	uv *= 11.;
      	uv.x+=sin(uv.y+T);
      	uv.y+=cos(1.+sin(uv.x+T));
      	col.r+=.075*tan(2./floor(1.+2.*length(uv)));
      	col = pow(abs(col), vec3(.4545));
      	col = sqrt(col);
      	col = S(1.,.0,.375/col);
      	col = vec3(length(col));
      	col = pow(guildHue(guildHue(sqrt(col))),vec3(1.2))*1.2;
      	O = vec4(col,1);
      }` }} />
                <script type="x-shader/x-fragment" data-title="Sprint" dangerouslySetInnerHTML={{ __html: `#version 300 es
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      out vec4 O;
      uniform vec2 resolution;
      uniform float time;
      #define R resolution
      #define T mod(time,12.56637)
      #define S smoothstep
      #define guildHue(a) mix(vec3(0.996,0.596,0.059), mix(vec3(0.882,0.706,0.243), vec3(0.957,0.694,0.180), sin(a*2.0)*0.5+0.5), cos(a*1.5)*0.5+0.5)
      void main(void) {
      	vec2 uv = (gl_FragCoord.xy-.5*R)/min(R.x,R.y), p=uv;
      	vec3 col = vec3(0);
      	uv *= 2.;
      	for (float i=.0; i<3.; i++) {
      		uv += vec2(sin(i*uv.y+T*.5)*.8, cos(1.2+sin(i*uv.x+T)))*.12;
      		col[int(i)]+=cos(8.*atan(uv.x,uv.y))-length(1.4*uv);
      	}
      	col = pow(col,vec3(.4545));
      	col = sqrt(col);
      	col = S(1.,.0,.5/col);
      	col = vec3(length(col));
      	col *= vec3(1,.95,.9);
      	col = guildHue(guildHue(1.2*sqrt(col)));
      	O = vec4(col,1);
      }` }} />
              </div>
            </div>
          </section>

          <section className="site-section dark">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">08</div>
                <div>
                  <p className="kicker reveal">Founding operators</p>
                  <h2 className="reveal">The Team Building The Infrastructure.</h2>
                  <p className="section-intro reveal">GUILD SA is being built by a multidisciplinary founding team focused on creating the systems, partnerships, and environments that help student builders succeed.</p>
                </div>
              </div>
              <section className="founders-panel" aria-label="GUILD SA founding operators">
                <div className="founder-carousel">
                  <div className="founder-track">
                    <figure className="founder-card"><img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245359/sombra_kuc0d4.jpg" alt="Murunzi Tharaga" /><figcaption><strong>Murunzi Tharaga</strong><span>Co-Founder & Creative Director</span></figcaption></figure>
                    <figure className="founder-card"><img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245359/eben_nnhqep.jpg" alt="Eben Mwema" /><figcaption><strong>Eben Mwema</strong><span>Co-Founder & Product Lead</span></figcaption></figure>
                    <figure className="founder-card"><img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245360/thomas_amqlcl.jpg" alt="Thomas Murashidzi" /><figcaption><strong>Thomas Murashidzi</strong><span>Co-Founder & Technical Lead</span></figcaption></figure>
                    <figure className="founder-card"><img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245359/ati_bvoows.jpg" alt="Ratjatji Malatji" /><figcaption><strong>Ratjatji Malatji</strong><span>Co-Founder & Community Lead</span></figcaption></figure>
                    <figure className="founder-card"><img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245359/sombra_kuc0d4.jpg" alt="Murunzi Tharaga" /><figcaption><strong>Murunzi Tharaga</strong><span>Co-Founder & Creative Director</span></figcaption></figure>
                    <figure className="founder-card"><img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245359/eben_nnhqep.jpg" alt="Eben Mwema" /><figcaption><strong>Eben Mwema</strong><span>Co-Founder & Product Lead</span></figcaption></figure>
                    <figure className="founder-card"><img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245360/thomas_amqlcl.jpg" alt="Thomas Murashidzi" /><figcaption><strong>Thomas Murashidzi</strong><span>Co-Founder & Technical Lead</span></figcaption></figure>
                    <figure className="founder-card"><img src="https://res.cloudinary.com/dgwtaivvf/image/upload/v1778245359/ati_bvoows.jpg" alt="Ratjatji Malatji" /><figcaption><strong>Ratjatji Malatji</strong><span>Co-Founder & Community Lead</span></figcaption></figure>
                  </div>
                </div>
              </section>
            </div>
          </section>

          <section id="waitlist" className="site-section mailing-list-section">
            <div className="shell">
              <div className="section-header">
                <div className="section-number reveal">09</div>
                <div>
                  <p className="kicker reveal">Mailing list</p>
                  <h2 className="reveal">Get The Latest Updates.</h2>
                  <p className="section-intro reveal">Sprint dates, project drops, partner calls, and campus updates — delivered to your inbox.</p>
                  <p className="section-intro reveal">Want live builder chat? Join the Guild SA WhatsApp community for announcements, team formation, and sprint updates.</p>
                </div>
              </div>
              <MailingListForm source="home" />
              <div className="waitlist-actions reveal" style={{ marginTop: '1.5rem' }}>
                <WhatsAppCommunityLink className="button">Join WhatsApp Community</WhatsAppCommunityLink>
              </div>
            </div>
          </section>
    </>
  )
}
