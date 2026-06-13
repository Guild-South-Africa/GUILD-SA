import AppLink from '../../components/AppLink'

export default function PrivacyContent() {
  return (
    <>
      <section className="page-hero compact">
            <div className="shell">
              <p className="eyebrow reveal">Governance / Legal</p>
              <h1 className="reveal" data-motion="left">Data & POPIA Framework.</h1>
              <p className="hero-copy reveal">Student Data Governance & POPIA Compliance Framework for GUILD SA.</p>
            </div>
          </section>

          <section className="site-section">
            <div className="shell">
              <div className="legal-content">
                <div className="legal-header">
                  <div className="legal-meta">
                    <span><strong>Version:</strong> 1.1</span>
                    <span><strong>Date:</strong> 13 May 2026</span>
                    <span><strong>Classification:</strong> CONFIDENTIAL</span>
                    <span><strong>Contact:</strong> guildsagroup@gmail.com</span>
                  </div>
                  <p style={{ marginTop: '1.5rem' }}><em>Prepared for the Guild SA x Eduvos Buildathon Partnership</em></p>
                </div>

                <h2>1. Introduction and Scope</h2>
                <p>This document establishes the Student Data Governance and POPIA Compliance Framework for Guild SA (hereinafter 'Guild SA' or 'the Organisation'). It governs all personal information collected, processed, stored, and destroyed in connection with the Guild SA Buildathon event hosted at Eduvos Menlyn on 01 August 2026.</p>
                <p>This framework has been prepared to satisfy the requirements of the Protection of Personal Information Act 4 of 2013 (POPIA), which came into full effect on 01 July 2021. It is intended for inclusion in the formal partnership request submitted to Eduvos and serves as a binding internal policy document for Guild SA.</p>
                
                <h3>1.1 Organisations Covered</h3>
                <table className="legal-table">
                  <thead>
                    <tr><th>Party</th><th>Role Under This Framework</th></tr>
                  </thead>
                  <tbody>
                    <tr><td><strong>Guild SA</strong></td><td>Responsible Party (data controller) for all student personal information collected via the Guild SA registration platform and event operations.</td></tr>
                    <tr><td><strong>Eduvos</strong></td><td>Institutional Partner. Eduvos does not collect student data on behalf of Guild SA. Eduvos staff may receive anonymised event reports only.</td></tr>
                    <tr><td><strong>Lovable (Sponsor)</strong></td><td>Third-party tool provider. Participant interactions with Lovable's platform are governed by Lovable's own privacy policy. Guild SA does not transfer personal data to Lovable.</td></tr>
                  </tbody>
                </table>

                <h3>1.2 Data Subjects Covered</h3>
                <ul>
                  <li>Student participants who register for and attend the Buildathon</li>
                  <li>Team members who submit project information during the event</li>
                  <li>Individuals who appear in event photographs or video recordings</li>
                </ul>

                <h3>1.3 Legal Framework</h3>
                <p>Guild SA's obligations arise from the following instruments:</p>
                <ul>
                  <li>Protection of Personal Information Act 4 of 2013 (POPIA) - primary statute</li>
                  <li>POPIA Conditions for Lawful Processing (Sections 9-25)</li>
                  <li>Information Regulator of South Africa - Guidance Notes</li>
                  <li>Electronic Communications and Transactions Act 25 of 2002 (ECTA) - data security obligations</li>
                </ul>

                <h2>2. Personal Information Collected</h2>
                <p>Guild SA collects personal information in two distinct categories: registration data collected before the event, and event-day data collected during operations. Each category is subject to specific handling rules defined in this framework.</p>

                <h3>2.1 Registration Data</h3>
                <table className="legal-table">
                  <thead>
                    <tr><th>Data Element</th><th>Purpose</th><th>POPIA Lawful Basis</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Full name</td><td>Participant identification, badge production, certificates</td><td>Section 11(1)(a): Consent</td></tr>
                    <tr><td>Email address</td><td>Event communications, confirmation, post-event follow-up</td><td>Section 11(1)(a): Consent</td></tr>
                    <tr><td>Institution name</td><td>Eligibility verification; event cohort reporting (aggregated)</td><td>Section 11(1)(a): Consent</td></tr>
                    <tr><td>Course/programme</td><td>Cohort reporting (aggregated, anonymised)</td><td>Section 11(1)(a): Consent</td></tr>
                    <tr><td>GitHub username (optional)</td><td>Portfolio linkage and Guild Network profile</td><td>Section 11(1)(a): Consent</td></tr>
                    <tr><td>LinkedIn URL (optional)</td><td>Guild Network profile and employer visibility (opt-in only)</td><td>Section 11(1)(a): Consent</td></tr>
                    <tr><td>Team name</td><td>Event logistics and judging administration</td><td>Section 11(1)(a): Consent</td></tr>
                    <tr><td>Dietary requirements</td><td>Catering logistics; destroyed within 24 hours after the event</td><td>Section 11(1)(c): Legitimate interest</td></tr>
                  </tbody>
                </table>
                <p>No sensitive personal information as defined under Section 26 of POPIA (including race, health information, biometric data, or political views) is collected at any point.</p>

                <h3>2.2 Event-Day Data</h3>
                <ul>
                  <li>Photographs and video recordings of participants, teams, and the event environment</li>
                  <li>Project submission metadata (team name, project title, description, GitHub repository link)</li>
                  <li>Judge scoring records (anonymised prior to storage)</li>
                  <li>Attendance confirmation records</li>
                </ul>

                <h3>2.3 Data Not Collected</h3>
                <p>Guild SA explicitly does not collect the following:</p>
                <ul>
                  <li>National identity numbers or passport numbers</li>
                  <li>Financial account information</li>
                  <li>Medical or biometric information</li>
                  <li>Precise geolocation data</li>
                  <li>Device identifiers or IP addresses beyond standard web server logs</li>
                </ul>

                <h2>3. Consent and Transparency</h2>
                <h3>3.1 Consent Mechanism</h3>
                <p>All participants must provide explicit, informed, and voluntary consent before any personal information is processed. Consent is obtained through a dedicated consent section on the Guild SA registration form, in compliance with Section 11 of POPIA.</p>
                <p>The registration form presents the following as separate, individually acknowledged items:</p>
                <ol>
                  <li>Consent to collect and process registration data for event administration</li>
                  <li>Consent to store contact details for Guild Network communications (opt-in, with easy opt-out)</li>
                  <li>Consent to be photographed during the event, with a separate checkbox for social media usage</li>
                  <li>Consent to have project information included in the Guild SA portfolio and shared with registered sponsor and partner organisations</li>
                </ol>

                <h3>3.2 Right to Withdraw Consent</h3>
                <p>Participants may withdraw consent at any time by emailing guildsagroup@gmail.com. Upon receipt of a withdrawal request, Guild SA will cease processing within 3 business days and remove the participant's information within 7 business days.</p>

                <h3>3.3 Consent for Minors</h3>
                <p>Where a registered participant is under the age of 18, written consent must be obtained from a parent or legal guardian before registration is finalised. No minor's personal information will be processed without documented guardian consent, in compliance with Section 35 of POPIA.</p>

                <h2>4. Data Storage Architecture and Security</h2>
                <h3>4.1 Storage Infrastructure</h3>
                <p>Guild SA uses third-party cloud infrastructure for all data storage. All platforms are selected based on their documented POPIA or GDPR compliance posture.</p>

                <h3>4.2 Access Controls</h3>
                <p>Personal information is accessible only to authorised Guild SA team members on a strict need-to-know basis. The Information Officer (Thomas Murashidzi) holds full access for compliance. Sponsors and Eduvos staff have no access to Guild SA-held personal data.</p>

                <h3>4.3 Security Measures</h3>
                <ul>
                  <li>Two-factor authentication (2FA) is mandatory on all Airtable and Slack accounts.</li>
                  <li>Passwords are stored in a password manager with strong credentials.</li>
                  <li>Local photography storage is encrypted using VeraCrypt (AES-256).</li>
                  <li>Role-based access is strictly enforced via Airtable.</li>
                </ul>

                <h2>5. Photography and Visual Media Policy</h2>
                <p>Photography is treated as personal information under POPIA. Participants provide explicit consent for photography via the registration form. Participants who decline all photography are issued a discreet identifier to be excluded from all shots.</p>
                
                <h2>13. Participant Indemnity and General Waiver</h2>
                <p>The provisions of this section constitute the indemnity and waiver agreement between Guild SA, Eduvos, and participating students. By registering, participants accept these terms.</p>
                <h3>13.1 Health, Safety, and Physical Well-being</h3>
                <p>Participants are responsible for their own physical health. Guild SA and Eduvos are not liable for physical injury or illness except where harm results directly from gross negligence.</p>
                
                <h3>13.4 Intellectual Property</h3>
                <p>Participants retain full ownership of all intellectual property created during the Buildathon. Participants grant Guild SA a non-exclusive license to display project metadata for showcasing student talent.</p>

                <h3>13.7 Participant Declaration</h3>
                <p>By ticking the 'I Accept' checkbox on the registration form, the participant declares that they have read and understood this indemnity, the POPIA framework, and agree to be legally bound by them.</p>

                <div style={{ marginTop: '4rem', paddingTop: '2rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                  <p><strong>Information Officer:</strong> Thomas Murashidzi<br />
                  <strong>Date:</strong> 13 May 2026<br />
                  <strong>Email:</strong> guildsagroup@gmail.com</p>
                </div>
              </div>
            </div>
          </section>
    </>
  )
}
