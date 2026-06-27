import chapterPoster from '../../shapes/Coming Soon Event Poster.png?url'

export const EDUVOS_PRETORIA_CHAPTER = {
  id: 'eduvos-pretoria-chapter',
  kicker: 'Inaugural chapter',
  title: 'Eduvos Pretoria Buildathon Chapter',
  subtitle: 'Buildathon 01 · Eduvos Menlyn Campus',
  lede: [
    'The first GUILD SA AI Buildathon chapter launches at Eduvos Menlyn in Pretoria — the physical home where campus registrations open, forty elite developers sprint, and working AI products get built in a single day.',
    'This chapter is the pilot execution environment for the national GUILD SA model: real teams, real tools, real demos, and real proof in front of mentors, judges, and ecosystem partners.',
  ],
  poster: chapterPoster,
  posterAlt: 'GUILD SA AI Buildathon 01 event poster — Eduvos Pretoria chapter',
  facts: [
    { label: 'Date', value: '01 August 2026' },
    { label: 'Venue', value: 'Eduvos Menlyn Campus' },
    { label: 'City', value: 'Pretoria, Gauteng' },
    { label: 'Format', value: 'One-day AI Buildathon' },
    { label: 'Campus Pool', value: '~100 Registrations' },
    { label: 'Sprint Floor', value: '40 Elite Developers' },
    { label: 'Eligibility', value: '2nd & 3rd Year IT Students' },
    { label: 'Team Size', value: '3–5 Participants' },
    { label: 'Duration', value: '10-Hour Live Sprint' },
    { label: 'Registrations', value: 'Open 01 July 2026' },
  ],
  highlights: [
    {
      title: 'Who this chapter is for',
      copy: 'Second- and third-year IT students at Eduvos who want to move beyond coursework and demonstrate what they can actually build under pressure.',
    },
    {
      title: 'What happens on the day',
      copy: 'Teams plan, build, test, and publicly demo AI-powered MVPs — from problem selection to live presentation in one continuous sprint.',
    },
    {
      title: 'What you leave with',
      copy: 'A working product, portfolio evidence, industry feedback, team experience, and a path into Guild Labs and partner continuation opportunities.',
    },
    {
      title: 'Powered by',
      copy: 'Eduvos hosts the chapter. Lovable supplies AI build tooling and credits. VelozTech and HLTC support mentorship, challenge framing, and talent pathways.',
    },
  ],
  scheduleAnchor: '#event-schedule',
  partners: [
    { name: 'Eduvos', slug: 'eduvos' },
    { name: 'Lovable', slug: 'lovable' },
    { name: 'VelozTech', slug: 'veloztech' },
    { name: 'HLTC', slug: 'hltc' },
  ],
}
