import fs from 'node:fs';
import path from 'node:path';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};

  const env = {};
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separator = trimmed.indexOf('=');
    if (separator === -1) continue;
    const key = trimmed.slice(0, separator).trim();
    const value = trimmed.slice(separator + 1).trim();
    env[key] = value;
  }

  return env;
}

const env = {
  ...loadEnvFile(path.join(process.cwd(), '.env')),
  ...loadEnvFile(path.join(process.cwd(), '.env.local')),
  ...process.env,
};

const token = env.AIRTABLE_TOKEN || env.AIRTABLE_API_KEY;
const baseId = (env.AIRTABLE_BASE_ID || '').replace(/\.+$/, '');
const tableName = env.AIRTABLE_MAILING_LIST_TABLE || 'Mailing List';

if (!token || !baseId) {
  console.error('Missing AIRTABLE_TOKEN and AIRTABLE_BASE_ID in .env');
  process.exit(1);
}

const metaHeaders = {
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
};

const tablesResponse = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
  headers: metaHeaders,
});

if (!tablesResponse.ok) {
  const errorText = await tablesResponse.text();
  console.error('Could not read Airtable base schema:', errorText);
  console.error('Ensure your token has schema.bases:read and schema.bases:write scopes.');
  process.exit(1);
}

const tablesData = await tablesResponse.json();
const existing = tablesData.tables?.find((table) => table.name === tableName);

if (existing) {
  console.log(`Table "${tableName}" already exists (${existing.id}).`);
  process.exit(0);
}

const createResponse = await fetch(`https://api.airtable.com/v0/meta/bases/${baseId}/tables`, {
  method: 'POST',
  headers: metaHeaders,
  body: JSON.stringify({
    name: tableName,
    fields: [
      { name: 'Email', type: 'email' },
      { name: 'Source', type: 'singleLineText' },
      {
        name: 'Status',
        type: 'singleSelect',
        options: {
          choices: [{ name: 'Subscribed', color: 'greenBright' }],
        },
      },
    ],
  }),
});

if (!createResponse.ok) {
  const errorText = await createResponse.text();
  console.error('Could not create mailing list table:', errorText);
  process.exit(1);
}

const created = await createResponse.json();
console.log(`Created table "${tableName}" (${created.id}).`);
