import crypto from 'node:crypto';

function readEnv(name) {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function normalizeAirtableBaseId(value) {
  if (!value) return undefined;
  return value.replace(/\.+$/, '');
}

function parseCloudinaryUrl(value) {
  if (!value) return {};

  try {
    const url = new URL(value);
    if (url.protocol !== 'cloudinary:') return {};

    return {
      apiKey: decodeURIComponent(url.username),
      apiSecret: decodeURIComponent(url.password),
      cloudName: url.hostname,
    };
  } catch {
    return {};
  }
}

const CLOUDINARY_URL_CONFIG = parseCloudinaryUrl(readEnv('CLOUDINARY_URL'));
const AIRTABLE_TOKEN = readEnv('AIRTABLE_TOKEN') || readEnv('AIRTABLE_API_KEY');
const AIRTABLE_BASE_ID = normalizeAirtableBaseId(readEnv('AIRTABLE_BASE_ID'));
const CLOUDINARY_CLOUD_NAME = readEnv('CLOUDINARY_CLOUD_NAME') || CLOUDINARY_URL_CONFIG.cloudName;
const CLOUDINARY_UPLOAD_PRESET = readEnv('CLOUDINARY_UPLOAD_PRESET');
const CLOUDINARY_API_KEY = readEnv('CLOUDINARY_API_KEY') || CLOUDINARY_URL_CONFIG.apiKey;
const CLOUDINARY_API_SECRET = readEnv('CLOUDINARY_API_SECRET') || CLOUDINARY_URL_CONFIG.apiSecret;
const CLOUDINARY_UPLOAD_FOLDER = readEnv('CLOUDINARY_UPLOAD_FOLDER') || 'guild-sa/join';
const MAX_UPLOAD_BYTES = Number(readEnv('MAX_UPLOAD_BYTES') || 5 * 1024 * 1024);

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

function jsonResponse(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

function assertAirtableConfigured() {
  if (!AIRTABLE_TOKEN || !AIRTABLE_BASE_ID) {
    throw new HttpError(500, 'Airtable is not configured. Set AIRTABLE_TOKEN and AIRTABLE_BASE_ID in Netlify.');
  }
}

async function airtableRequest(table, method, records) {
  assertAirtableConfigured();

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`;
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Airtable API Error:', errorText);
    throw new HttpError(response.status, 'Airtable rejected the submission. Check the table and field names.');
  }

  return response.json();
}

async function airtableFindByFormula(table, formula) {
  assertAirtableConfigured();

  const params = new URLSearchParams({
    filterByFormula: formula,
    maxRecords: '1',
  });
  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}?${params}`;
  const response = await fetch(url, {
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Airtable API Error:', errorText);
    throw new HttpError(response.status, 'Could not verify that invite code.');
  }

  return response.json();
}

function signCloudinaryParams(params, secret) {
  const signable = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return crypto.createHash('sha1').update(`${signable}${secret}`).digest('hex');
}

function assertUpload(upload) {
  if (!upload || typeof upload !== 'object') {
    throw new HttpError(400, 'Invalid upload payload.');
  }

  if (!upload.data || !String(upload.data).startsWith('data:')) {
    throw new HttpError(400, 'Uploads must be sent as data URLs.');
  }

  if (Number(upload.size || 0) > MAX_UPLOAD_BYTES) {
    throw new HttpError(400, 'Uploads must be 5 MB or smaller.');
  }
}

async function uploadToCloudinary(upload, joinType) {
  assertUpload(upload);

  const hasSignedCredentials = Boolean(CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);
  if (!CLOUDINARY_CLOUD_NAME || (!CLOUDINARY_UPLOAD_PRESET && !hasSignedCredentials)) {
    throw new HttpError(500, 'Cloudinary uploads are not configured. Set CLOUDINARY_URL or CLOUDINARY_API_KEY/CLOUDINARY_API_SECRET.');
  }

  const folder = `${CLOUDINARY_UPLOAD_FOLDER}/${joinType}`;
  const form = new FormData();
  form.append('file', upload.data);
  form.append('folder', folder);

  if (hasSignedCredentials) {
    const timestamp = Math.round(Date.now() / 1000);
    const signatureParams = { folder, timestamp };

    form.append('api_key', CLOUDINARY_API_KEY);
    form.append('timestamp', String(timestamp));
    form.append('signature', signCloudinaryParams(signatureParams, CLOUDINARY_API_SECRET));
  } else {
    form.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  }

  const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/auto/upload`, {
    method: 'POST',
    body: form,
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    console.error('Cloudinary API Error:', data);
    throw new HttpError(response.status, 'Cloudinary rejected the uploaded file.');
  }

  return {
    field: upload.field,
    filename: upload.filename,
    url: data.secure_url,
    publicId: data.public_id,
    resourceType: data.resource_type,
  };
}

async function uploadPayloadFiles(payload, joinType) {
  const uploads = Array.isArray(payload.uploads) ? payload.uploads : [];
  if (!uploads.length) return [];

  return Promise.all(uploads.map((upload) => uploadToCloudinary(upload, joinType)));
}

function cleanString(value) {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function uploadedUrl(uploadedFiles, field) {
  return uploadedFiles.find((upload) => upload.field === field)?.url;
}

function portfolioUrl(payload, uploadedFiles) {
  return cleanString(payload.portfolio) || uploadedUrl(uploadedFiles, 'portfolioFile');
}

function generateInviteCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

function inviteUrl(event, inviteCode) {
  const origin = event.headers.origin || event.headers.Origin || process.env.URL || '';
  return origin ? `${origin}/join/team/invite/${inviteCode}` : `/join/team/invite/${inviteCode}`;
}

function escapeAirtableString(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const { type, payload = {} } = body;
    const allowedTypes = new Set(['student', 'team', 'invite', 'mentor', 'partner', 'sponsor', 'campus']);

    if (!allowedTypes.has(type)) {
      return jsonResponse(400, { error: 'Invalid join type' });
    }

    if (!payload.consentAccepted || !payload.mediaConsent) {
      return jsonResponse(400, { error: 'Consent and Media Consent are required.' });
    }

    const uploadedFiles = await uploadPayloadFiles(payload, type);
    let result = {};

    switch (type) {
      case 'student': {
        const participantRecord = await airtableRequest('Participants', 'POST', [{
          fields: {
            'Full Name': payload.name,
            Email: payload.email,
            'Phone Number': payload.phone,
            City: payload.city,
            Institution: payload.institution,
            'Course / Degree': payload.course,
            'Year of Study': payload.year,
            Skills: payload.skills,
            'Preferred Role': payload.role,
            'GitHub URL': payload.github,
            'LinkedIn URL': payload.linkedin,
            'Portfolio URL': portfolioUrl(payload, uploadedFiles),
            'Looking for Team': payload.lookingForTeam === true || payload.lookingForTeam === 'true',
            'Consent Accepted': true,
            'Media Consent': true,
            Status: 'Applied',
            'Registration Date': new Date().toISOString(),
          },
        }]);
        result = { success: true, participantId: participantRecord.records[0].id, uploads: uploadedFiles };
        break;
      }

      case 'team': {
        const inviteCode = generateInviteCode();
        const leaderRecord = await airtableRequest('Participants', 'POST', [{
          fields: {
            'Full Name': payload.leaderName,
            Email: payload.leaderEmail,
            'Phone Number': payload.phone,
            Institution: payload.institution,
            Skills: payload.skills,
            'Preferred Role': payload.role,
            'GitHub URL': payload.github,
            'LinkedIn URL': payload.linkedin,
            'Portfolio URL': portfolioUrl(payload, uploadedFiles),
            'Consent Accepted': true,
            'Media Consent': true,
            Status: 'Applied',
            'Registration Date': new Date().toISOString(),
          },
        }]);
        const leaderId = leaderRecord.records[0].id;

        const teamRecord = await airtableRequest('Teams', 'POST', [{
          fields: {
            'Team Name': payload.teamName,
            'Team Capacity': parseInt(payload.capacity, 10),
            Event: payload.event,
            Track: payload.track,
            'Project Name': payload.projectName,
            'Problem Statement': payload.problemStatement,
            'Project Description': payload.projectDescription,
            'Invite Code': inviteCode,
            Status: 'Forming',
            'Submission Status': 'Pending',
            Leader: [leaderId],
            Members: [leaderId],
          },
        }]);

        const teamId = teamRecord.records[0].id;

        await airtableRequest('Participants', 'PATCH', [{
          id: leaderId,
          fields: { Team: [teamId] },
        }]);

        result = {
          success: true,
          teamId,
          inviteCode,
          inviteUrl: inviteUrl(event, inviteCode),
          uploads: uploadedFiles,
        };
        break;
      }

      case 'invite': {
        const inviteCode = cleanString(payload.inviteCode);
        if (!inviteCode || !/^[a-zA-Z0-9]{4,32}$/.test(inviteCode)) {
          return jsonResponse(400, { error: 'Invalid invite code.' });
        }

        const teamLookup = await airtableFindByFormula('Teams', `{Invite Code}='${escapeAirtableString(inviteCode)}'`);
        if (!teamLookup.records?.length) {
          return jsonResponse(404, { error: 'Invalid invite code.' });
        }

        const teamId = teamLookup.records[0].id;
        const participantRecord = await airtableRequest('Participants', 'POST', [{
          fields: {
            'Full Name': payload.name,
            Email: payload.email,
            'Phone Number': payload.phone,
            Institution: payload.institution,
            Skills: payload.skills,
            'Preferred Role': payload.role,
            'GitHub URL': payload.github,
            'LinkedIn URL': payload.linkedin,
            'Portfolio URL': portfolioUrl(payload, uploadedFiles),
            'Consent Accepted': true,
            'Media Consent': true,
            Status: 'Applied',
            'Registration Date': new Date().toISOString(),
            Team: [teamId],
          },
        }]);

        result = { success: true, participantId: participantRecord.records[0].id, teamId, uploads: uploadedFiles };
        break;
      }

      case 'mentor': {
        const mentorRecord = await airtableRequest('Mentors', 'POST', [{
          fields: {
            'Full Name': payload.name,
            Email: payload.email,
            Company: payload.company,
            Role: payload.role,
            Expertise: payload.expertise,
            LinkedIn: payload.linkedin,
            GitHub: payload.github,
            Bio: payload.bio,
            Availability: payload.availability,
            'Consent Accepted': true,
            'Media Consent': true,
            Status: 'Applied',
          },
        }]);
        result = { success: true, mentorId: mentorRecord.records[0].id, uploads: uploadedFiles };
        break;
      }

      case 'partner': {
        const partnerRecord = await airtableRequest('Partners', 'POST', [{
          fields: {
            'Organization Name': payload.organizationName,
            'Contact Person': payload.contactPerson,
            Email: payload.email,
            Website: payload.website,
            'Partnership Type': payload.partnershipType,
            'Support Type': payload.supportType,
            Notes: payload.notes,
            'Consent Accepted': true,
            'Media Consent': true,
            Status: 'Prospect',
          },
        }]);
        result = { success: true, partnerId: partnerRecord.records[0].id };
        break;
      }

      case 'sponsor': {
        const sponsorRecord = await airtableRequest('Sponsors', 'POST', [{
          fields: {
            'Company Name': payload.companyName,
            'Contact Person': payload.contactPerson,
            'Contact Email': payload.contactEmail,
            Website: payload.website,
            'Sponsor Type': payload.sponsorType,
            'Contribution Type': payload.contributionType,
            'Sponsorship Value': payload.sponsorshipValue,
            Notes: payload.notes,
            'Consent Accepted': true,
            'Media Consent': true,
            Status: 'Prospect',
          },
        }]);
        result = { success: true, sponsorId: sponsorRecord.records[0].id };
        break;
      }

      case 'campus': {
        const campusRecord = await airtableRequest('Campuses', 'POST', [{
          fields: {
            'Institution Name': payload.institutionName,
            'Campus Name': payload.campusName,
            Province: payload.province,
            City: payload.city,
            'Applicant Name': payload.applicantName,
            'Applicant Email': payload.applicantEmail,
            'Existing Community Size': payload.communitySize,
            'Why Start a Guild': payload.whyStart,
            'Consent Accepted': true,
            'Media Consent': true,
            Status: 'Prospect',
          },
        }]);
        result = { success: true, campusId: campusRecord.records[0].id };
        break;
      }

      default:
        return jsonResponse(400, { error: 'Invalid join type' });
    }

    return jsonResponse(200, result);
  } catch (error) {
    console.error('Join function error:', error);
    return jsonResponse(error.statusCode || 500, { error: error.message || 'Internal Server Error' });
  }
};
