import {
  parseAirtableError,
  subscribeToMailingList,
  mailingListTableName,
} from './lib/mailingList.js';

function readEnv(name) {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function normalizeAirtableBaseId(value) {
  if (!value) return undefined;
  return value.replace(/\.+$/, '');
}

const AIRTABLE_TOKEN = readEnv('AIRTABLE_TOKEN') || readEnv('AIRTABLE_API_KEY');
const AIRTABLE_BASE_ID = normalizeAirtableBaseId(readEnv('AIRTABLE_BASE_ID'));

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

function escapeAirtableString(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function compactFields(fields) {
  return Object.fromEntries(
    Object.entries(fields).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === 'string' && !value.trim()) return false;
      if (Array.isArray(value) && !value.length) return false;
      return true;
    }),
  );
}

async function airtableRequest(table, method, records, tableName = table) {
  assertAirtableConfigured();

  const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(table)}`;
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ records, typecast: true }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('Airtable API Error:', errorText);
    throw new HttpError(response.status, parseAirtableError(errorText, tableName));
  }

  return response.json();
}

async function airtableFindByFormula(table, formula, tableName = table) {
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
    throw new HttpError(response.status, parseAirtableError(errorText, tableName));
  }

  return response.json();
}

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method Not Allowed' });
  }

  try {
    const body = JSON.parse(event.body || '{}');
    const email = body.email;
    const source = body.source;

    const result = await subscribeToMailingList({
      readEnv,
      airtableRequest,
      airtableFindByFormula,
      escapeAirtableString,
      compactFields,
      HttpError,
      email,
      source,
    });

    return jsonResponse(200, result);
  } catch (error) {
    console.error('Subscribe function error:', error);
    return jsonResponse(error.statusCode || 500, { error: error.message || 'Internal Server Error' });
  }
};

export { mailingListTableName };
