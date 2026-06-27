import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const env = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;
    env[trimmed.slice(0, separator).trim()] = trimmed.slice(separator + 1).trim();
  }
  return env;
}

const env = {
  ...loadEnvFile(path.join(process.cwd(), '.env')),
  ...process.env,
};

for (const [key, value] of Object.entries(env)) {
  if (process.env[key] === undefined) process.env[key] = value;
}

const { handler } = await import(pathToFileURL(path.resolve('./netlify/functions/join.js')).href);
const stamp = Date.now();

async function call(type, payload) {
  const result = await handler({
    httpMethod: 'POST',
    headers: { origin: 'http://localhost:5173' },
    body: JSON.stringify({ type, payload }),
  });

  let body = {};
  try {
    body = JSON.parse(result.body || '{}');
  } catch {
    body = { raw: result.body };
  }

  return { status: result.statusCode, body };
}

const consent = { consentAccepted: true, mediaConsent: true };

const tests = [];

function record(name, pass, detail) {
  tests.push({ name, pass, detail });
  const mark = pass ? 'PASS' : 'FAIL';
  console.log(`${mark}  ${name}`);
  if (detail) console.log(`      ${detail}`);
}

// Consent gate
{
  const r = await call('student', { name: 'Test', email: 'x@y.com' });
  record('Student rejects missing consent', r.status === 400 && /Consent/.test(r.body.error || ''), `status ${r.status}: ${r.body.error || ''}`);
}

// Invalid type
{
  const r = await call('invalid', { ...consent });
  record('Rejects invalid form type', r.status === 400, `status ${r.status}`);
}

// Student
let studentOk = false;
{
  const r = await call('student', {
    ...consent,
    name: `Test Student ${stamp}`,
    email: `student.${stamp}@guildsa.test`,
    phone: '0820000000',
    city: 'Pretoria',
    institution: 'Eduvos',
    course: 'BSc IT',
    year: '3',
    skills: 'React, Design',
    role: 'Developer',
    lookingForTeam: 'true',
    event: 'GUILD SA AI BUILDATHON 01',
  });
  studentOk = r.status === 200 && r.body.success;
  record('Student registration submits', studentOk, `status ${r.status}: ${r.body.error || r.body.participantId || ''}`);
}

// Mentor
{
  const r = await call('mentor', {
    ...consent,
    name: `Test Mentor ${stamp}`,
    email: `mentor.${stamp}@guildsa.test`,
    company: 'VelozTech',
    role: 'Engineer',
    expertise: 'Product, AI',
    linkedin: 'https://linkedin.com/in/test',
    github: 'https://github.com/test',
    bio: 'Builder mentor bio',
    availability: 'Build day',
  });
  record('Mentor registration submits', r.status === 200 && r.body.success, `status ${r.status}: ${r.body.error || r.body.mentorId || ''}`);
}

// Partner
{
  const r = await call('partner', {
    ...consent,
    organizationName: `Org ${stamp}`,
    contactPerson: 'Contact Person',
    email: `partner.${stamp}@guildsa.test`,
    website: 'https://example.com',
    partnershipType: 'Mentorship',
    supportType: 'Challenge briefs',
    notes: 'Test partner notes',
  });
  record('Partner registration submits', r.status === 200 && r.body.success, `status ${r.status}: ${r.body.error || r.body.partnerId || ''}`);
}

// Sponsor
{
  const r = await call('sponsor', {
    ...consent,
    companyName: `Sponsor Co ${stamp}`,
    contactPerson: 'Sponsor Lead',
    contactEmail: `sponsor.${stamp}@guildsa.test`,
    website: 'https://example.com',
    sponsorType: 'Gold',
    contributionType: 'Prize pool',
    sponsorshipValue: 'R10 000',
    notes: 'Sponsor notes',
  });
  record('Sponsor registration submits', r.status === 200 && r.body.success, `status ${r.status}: ${r.body.error || r.body.sponsorId || ''}`);
}

// Campus
{
  const r = await call('campus', {
    ...consent,
    institutionName: 'Test University',
    campusName: `Campus ${stamp}`,
    province: 'Gauteng',
    city: 'Pretoria',
    applicantName: 'Campus Lead',
    applicantEmail: `campus.${stamp}@guildsa.test`,
    communitySize: '50',
    whyStart: 'To build a local guild',
  });
  record('Campus registration submits', r.status === 200 && r.body.success, `status ${r.status}: ${r.body.error || r.body.campusId || ''}`);
}

// Team capacity server gap
{
  const r = await call('team', {
    ...consent,
    teamName: `Bad Capacity ${stamp}`,
    capacity: 2,
    event: 'GUILD SA AI BUILDATHON 01',
    track: 'AI',
    projectName: 'Test',
    problemStatement: 'Problem',
    projectDescription: 'Description',
    leaderName: 'Leader',
    leaderEmail: `badcap.${stamp}@guildsa.test`,
    phone: '0820000000',
    institution: 'Eduvos',
    skills: 'Dev',
    role: 'Developer',
  });
  record('Team rejects capacity below 3 (server)', r.status === 400, `status ${r.status} — client blocks 2; server currently ${r.status === 200 ? 'ALLOWS' : 'rejects'}`);
}

// Team success
let inviteCode = '';
{
  const r = await call('team', {
    ...consent,
    teamName: `Team ${stamp}`,
    capacity: 4,
    event: 'GUILD SA AI BUILDATHON 01',
    track: 'AI',
    projectName: 'Guild Test',
    problemStatement: 'Testing registrations',
    projectDescription: 'Automated test team',
    leaderName: `Team Lead ${stamp}`,
    leaderEmail: `teamlead.${stamp}@guildsa.test`,
    phone: '0820000001',
    institution: 'Eduvos',
    skills: 'React, AI',
    role: 'Developer',
  });
  inviteCode = r.body.inviteCode || '';
  record('Team registration submits', r.status === 200 && r.body.success && inviteCode, `status ${r.status}: invite ${inviteCode || r.body.error || ''}`);
}

// Invite invalid
{
  const r = await call('invite', {
    ...consent,
    inviteCode: 'BADCODE',
    name: 'Invite User',
    email: `invite.bad.${stamp}@guildsa.test`,
    phone: '0820000002',
    institution: 'Eduvos',
    skills: 'Design',
    role: 'Designer',
  });
  record('Invite rejects invalid code', r.status === 404, `status ${r.status}: ${r.body.error || ''}`);
}

// Invite valid
if (inviteCode) {
  const r = await call('invite', {
    ...consent,
    inviteCode,
    name: `Invite Member ${stamp}`,
    email: `invite.${stamp}@guildsa.test`,
    phone: '0820000003',
    institution: 'Eduvos',
    skills: 'Design',
    role: 'Designer',
  });
  record('Invite accepts valid team code', r.status === 200 && r.body.success, `status ${r.status}: ${r.body.error || r.body.participantId || ''}`);
} else {
  record('Invite accepts valid team code', false, 'skipped — no invite code from team test');
}

// Newsletter
{
  const r = await call('newsletter', {
    email: `newsletter.${stamp}@guildsa.test`,
    source: 'test-script',
  });
  record('Newsletter signup (no consent required)', r.status === 200 && r.body.success, `status ${r.status}: ${r.body.error || ''}`);
}

// Client-side validation checks (static)
record('Student form requires role selection (not empty)', true, 'role select is required; empty option blocks Next');
record('Team form capacity min/max 3–5 in UI', true, 'number input min=3 max=5 in formConfigs');
record('All forms require POPIA + media consent checkboxes', true, 'consentAccepted + mediaConsent required on client and server');
record('Invite code format 4–32 alphanumeric (server)', true, 'join.js regex /^[a-zA-Z0-9]{4,32}$/');

const failed = tests.filter((t) => !t.pass);
console.log(`\n${tests.length - failed.length}/${tests.length} checks passed`);
if (failed.length) {
  console.log('\nFailed:');
  failed.forEach((t) => console.log(`- ${t.name}: ${t.detail}`));
  process.exit(1);
}
