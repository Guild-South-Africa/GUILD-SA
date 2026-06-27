import eduvosLogo from '../../shapes/eduvos.png?url'
import lovableLogo from '../../shapes/lovable.png?url'
import velozLogo from '../../shapes/veloz.png?url'

export const ECOSYSTEM_PARTNERS = [
  {
    id: 'eduvos',
    name: 'Eduvos',
    role: 'Campus Host · Pilot Chapter',
    tags: ['Campus', 'Host', 'Pretoria'],
    website: 'https://www.eduvos.com/',
    logo: eduvosLogo,
    logoAlt: 'Eduvos logo',
    photo: 'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998011/Billboard2_evpkx2.png',
    photoCaption: 'Eduvos Menlyn / Pretoria chapter host',
    intro: [
      'Eduvos is the founding campus partner for GUILD SA — anchoring the inaugural Pretoria Buildathon chapter at Eduvos Menlyn and opening the door for the first ~100-student campus pool.',
      'As a private higher education institution with a strong Information Technology faculty, Eduvos provides the physical environment, student access, and institutional credibility that make a live build sprint possible at scale.',
    ],
    contributions: [
      { label: 'Campus Access', copy: 'Hosts the Buildathon at Eduvos Menlyn — lecture venues, IT labs, and sprint floor space.' },
      { label: 'Student Pipeline', copy: 'Connects second- and third-year IT developers into the campus registration pool.' },
      { label: 'Institutional Trust', copy: 'Accredited qualifications and industry-aligned programmes give the chapter academic legitimacy.' },
      { label: 'Pilot Expansion', copy: 'The Pretoria chapter tests the GUILD SA model before scaling to additional campuses nationwide.' },
    ],
  },
  {
    id: 'lovable',
    name: 'Lovable',
    role: 'Technology Partner · AI Build Platform',
    tags: ['AI Tools', 'Credits', 'MVP Velocity'],
    website: 'https://lovable.dev/',
    logo: lovableLogo,
    logoAlt: 'Lovable logo',
    photo: 'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998003/Hackathon_team_zrlwkj.jpg',
    photoCaption: 'Teams building with modern AI tooling',
    intro: [
      'Lovable is the AI development environment powering rapid MVP creation throughout the Buildathon — giving teams the speed to go from idea to working interface in hours, not weeks.',
      'As a technology partner, Lovable provides participant credits and platform access so builders can focus on product thinking and execution instead of setup friction.',
    ],
    contributions: [
      { label: 'AI Build Environment', copy: 'Teams prototype, iterate, and ship working frontends using Lovable throughout the sprint.' },
      { label: 'Participant Credits', copy: 'Credits remove cost barriers so every team can build at full velocity on demo day.' },
      { label: 'MVP Acceleration', copy: 'Compresses the distance between concept sketch and live, testable product.' },
      { label: 'Modern Stack Exposure', copy: 'Introduces students to the AI-assisted workflows shaping how products get built today.' },
    ],
  },
  {
    id: 'veloztech',
    name: 'VelozTech',
    role: 'Industry Partner · Mentorship & Pathways',
    tags: ['Mentorship', 'Incubation', 'Talent'],
    website: 'https://veloztech.co.za/',
    logo: velozLogo,
    logoAlt: 'VelozTech logo',
    photo: 'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777211575/Founders_Table_rkvq1q.png',
    photoCaption: 'Industry mentors and practitioners on the floor',
    intro: [
      'VelozTech brings industry context, technical mentorship, and continuation pathways to the Buildathon — connecting student execution to real-world problem spaces and employer expectations.',
      'Founded in 2021, VelozTech designs leading-edge technology solutions and supports the GUILD SA cohort with challenge framing, on-floor guidance, and talent development opportunities.',
    ],
    contributions: [
      { label: 'Challenge Framing', copy: 'Helps shape problem briefs that reflect genuine industry constraints and opportunities.' },
      { label: 'Live Mentorship', copy: 'Practitioners guide teams on scope, architecture, product decisions, and demo readiness.' },
      { label: 'Incubation Pathways', copy: 'Strong teams may receive structured support to continue building beyond demo day.' },
      { label: 'Talent Pipeline', copy: 'Creates early visibility into builders who perform under pressure — before the formal job market.' },
    ],
  },
  {
    id: 'hltc',
    name: 'HLTC',
    role: 'Ecosystem Partner · Talent & Industry Bridge',
    tags: ['Talent', 'Industry', 'Continuity'],
    website: null,
    logo: null,
    logoAlt: 'HLTC',
    photo: 'https://res.cloudinary.com/dgwtaivvf/image/upload/v1777998032/Guild_Hackathon_promotional_poster_on_window_su0yhg.png',
    photoCaption: 'GUILD SA ecosystem activation',
    intro: [
      'HLTC supports the GUILD SA ecosystem as a bridge between student builders, industry practitioners, and continuation opportunities beyond the sprint floor.',
      'The partnership strengthens talent visibility, operational support for chapter activations, and pathways that help strong teams stay connected to mentors, partners, and future work.',
    ],
    contributions: [
      { label: 'Talent Visibility', copy: 'Helps surface high-performing builders and teams to ecosystem partners and mentors.' },
      { label: 'Industry Connections', copy: 'Opens channels between demonstrated capability and real-world opportunity.' },
      { label: 'Chapter Support', copy: 'Contributes to the operational and community layer that keeps builders engaged between events.' },
      { label: 'Continuation Pathways', copy: 'Supports teams moving from one-day proof into longer-term project and career routes.' },
    ],
  },
]
