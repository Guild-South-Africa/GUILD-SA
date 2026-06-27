const ROLE_OPTIONS = [
  { value: '', label: 'Select' },
  { value: 'Developer', label: 'Developer' },
  { value: 'Designer', label: 'Designer' },
  { value: 'PM', label: 'PM' },
]

const CONSENT_STEPS = [
  {
    name: 'consentAccepted',
    label: 'Terms',
    type: 'checkbox',
    checkboxLabel: 'I accept the Terms & POPIA Consent',
    checkboxHref: '/privacy.html',
    required: true,
  },
  {
    name: 'mediaConsent',
    label: 'Media',
    type: 'checkbox',
    checkboxLabel: 'I provide Media Consent',
    required: true,
  },
]

function field(name, label, type = 'text', extra = {}) {
  return { name, label, type, required: true, ...extra }
}

function optional(name, label, type = 'text', extra = {}) {
  return { name, label, type, required: false, ...extra }
}

const BUILDATHON_EVENT = field('event', 'Event Selection', 'text', {
  defaultValue: 'GUILD SA AI BUILDATHON 01',
})

const PORTFOLIO_STEPS = [
  optional('github', 'GitHub URL', 'url'),
  optional('linkedin', 'LinkedIn URL', 'url'),
  optional('portfolio', 'Portfolio URL', 'url'),
  optional('portfolioFile', 'Portfolio / CV File', 'file', {
    accept: '.pdf,.doc,.docx,.png,.jpg,.jpeg,.webp',
  }),
]

function asSteps(fields) {
  return fields.map((f) => [f])
}

export const FORM_CONFIGS = {
  student: {
    title: 'Complete your profile.',
    kicker: 'Application',
    steps: asSteps([
      field('name', 'Full Name'),
      field('email', 'Email', 'email'),
      field('phone', 'Phone Number', 'tel'),
      field('city', 'City'),
      field('institution', 'Institution'),
      field('course', 'Course / Degree'),
      field('year', 'Year of Study'),
      field('skills', 'Skills', 'text', { placeholder: 'e.g. React, Node.js, Design' }),
      field('role', 'Preferred Role', 'select', { options: ROLE_OPTIONS }),
      ...PORTFOLIO_STEPS,
      field('lookingForTeam', 'Looking for Team?', 'select', {
        options: [
          { value: 'true', label: 'Yes' },
          { value: 'false', label: 'No' },
        ],
      }),
      BUILDATHON_EVENT,
      ...CONSENT_STEPS,
    ]),
  },

  team: {
    title: 'Complete your profile.',
    kicker: 'Application',
    steps: asSteps([
      field('teamName', 'Team Name'),
      field('capacity', 'Team Capacity', 'number', { min: 3, max: 5 }),
      field('event', 'Event', 'text', { defaultValue: 'GUILD SA AI BUILDATHON 01' }),
      field('track', 'Track'),
      field('projectName', 'Project Name'),
      field('problemStatement', 'Problem Statement', 'textarea'),
      field('projectDescription', 'Project Description', 'textarea'),
      field('leaderName', 'Team Leader Name'),
      field('leaderEmail', 'Team Leader Email', 'email'),
      field('phone', 'Phone Number', 'tel'),
      field('institution', 'Institution'),
      field('skills', 'Skills'),
      field('role', 'Preferred Role', 'select', { options: ROLE_OPTIONS }),
      optional('github', 'GitHub', 'url'),
      optional('linkedin', 'LinkedIn', 'url'),
      optional('portfolio', 'Portfolio', 'url'),
      optional('portfolioFile', 'Portfolio / CV File', 'file', {
        accept: '.pdf,.doc,.docx,.png,.jpg,.jpeg,.webp',
      }),
      ...CONSENT_STEPS,
    ]),
  },

  invite: {
    title: 'Complete your profile.',
    kicker: 'Application',
    steps: asSteps([
      field('inviteCode', 'Invite Code'),
      field('name', 'Full Name'),
      field('email', 'Email', 'email'),
      field('phone', 'Phone Number', 'tel'),
      field('institution', 'Institution'),
      field('skills', 'Skills'),
      field('role', 'Preferred Role', 'select', { options: ROLE_OPTIONS }),
      optional('github', 'GitHub', 'url'),
      optional('linkedin', 'LinkedIn', 'url'),
      optional('portfolio', 'Portfolio', 'url'),
      optional('portfolioFile', 'Portfolio / CV File', 'file', {
        accept: '.pdf,.doc,.docx,.png,.jpg,.jpeg,.webp',
      }),
      ...CONSENT_STEPS,
    ]),
  },

  mentor: {
    title: 'Complete your profile.',
    kicker: 'Application',
    steps: asSteps([
      field('name', 'Full Name'),
      field('email', 'Email', 'email'),
      field('company', 'Company'),
      field('role', 'Role'),
      field('expertise', 'Expertise'),
      field('linkedin', 'LinkedIn', 'url'),
      optional('github', 'GitHub', 'url'),
      field('bio', 'Bio', 'textarea'),
      field('availability', 'Availability'),
      ...CONSENT_STEPS,
    ]),
  },

  partner: {
    title: 'Complete your profile.',
    kicker: 'Application',
    steps: asSteps([
      field('organizationName', 'Organization Name'),
      field('contactPerson', 'Contact Person'),
      field('email', 'Email', 'email'),
      optional('website', 'Website', 'url'),
      field('partnershipType', 'Partnership Type'),
      field('supportType', 'Support Type'),
      optional('notes', 'Notes', 'textarea'),
      ...CONSENT_STEPS,
    ]),
  },

  sponsor: {
    title: 'Complete your profile.',
    kicker: 'Application',
    steps: asSteps([
      field('companyName', 'Company Name'),
      field('contactPerson', 'Contact Person'),
      field('contactEmail', 'Contact Email', 'email'),
      optional('website', 'Website', 'url'),
      field('sponsorType', 'Sponsor Type'),
      field('contributionType', 'Contribution Type'),
      field('sponsorshipValue', 'Sponsorship Value'),
      optional('notes', 'Notes', 'textarea'),
      ...CONSENT_STEPS,
    ]),
  },

  campus: {
    title: 'Complete your profile.',
    kicker: 'Application',
    steps: asSteps([
      field('institutionName', 'Institution Name'),
      field('campusName', 'Campus Name'),
      field('province', 'Province'),
      field('city', 'City'),
      field('applicantName', 'Applicant Name'),
      field('applicantEmail', 'Applicant Email', 'email'),
      field('communitySize', 'Existing Community Size'),
      field('whyStart', 'Why Start a Guild', 'textarea'),
      ...CONSENT_STEPS,
    ]),
  },
}

export const PATHWAY_CARDS = [
  { index: '01', title: 'Individual Builder', copy: 'Apply independently and we\'ll help form balanced teams.', to: '/join/student' },
  { index: '02', title: 'Existing Team', copy: 'Bring your own team and build together.', to: '/join/team' },
  { index: '03', title: 'Team Invite', copy: 'Join a team that\'s already forming with an invite code.', to: '/join/team/invite' },
  { index: '04', title: 'Mentor', copy: 'Support the next generation of builders.', to: '/join/mentor' },
  { index: '05', title: 'Partner', copy: 'Help create opportunities and pathways.', to: '/join/partner' },
  { index: '06', title: 'Sponsor', copy: 'Support the ecosystem and gain visibility into emerging talent.', to: '/join/sponsor' },
  { index: '07', title: 'Campus Guild Lead', copy: 'Help launch the next Campus Guild after the pilot.', to: '/join/campus', wide: true },
]
