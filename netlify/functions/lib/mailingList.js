import { sendMailingListWelcomeEmail } from './resend.js';

export function mailingListTableName(readEnv) {
  return readEnv('AIRTABLE_MAILING_LIST_TABLE') || 'Mailing List';
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function mailingListNotFoundMessage(tableName) {
  return `Mailing list table "${tableName}" was not found in Airtable. Create it with fields Email, Source, and Status — or run: npm run airtable:mailing-list-setup`;
}

export function parseAirtableError(errorText, tableName) {
  try {
    const data = JSON.parse(errorText);
    if (data.error?.type === 'INVALID_PERMISSIONS_OR_MODEL_NOT_FOUND') {
      return mailingListNotFoundMessage(tableName);
    }
    return data.error?.message || 'Airtable rejected the subscription.';
  } catch {
    return 'Airtable rejected the subscription.';
  }
}

export async function subscribeToMailingList({
  readEnv,
  airtableRequest,
  airtableFindByFormula,
  escapeAirtableString,
  compactFields,
  HttpError,
  email,
  source = 'home',
}) {
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const normalizedSource = typeof source === 'string' && source.trim() ? source.trim() : 'home';
  const table = mailingListTableName(readEnv);

  if (!normalizedEmail || !isValidEmail(normalizedEmail)) {
    throw new HttpError(400, 'Enter a valid email address.');
  }

  const existing = await airtableFindByFormula(
    table,
    `{Email}='${escapeAirtableString(normalizedEmail)}'`,
    table,
  );

  if (existing.records?.length) {
    return { success: true, alreadySubscribed: true };
  }

  const record = await airtableRequest(table, 'POST', [{
    fields: compactFields({
      Email: normalizedEmail,
      Source: normalizedSource,
      Status: 'Subscribed',
    }),
  }], table);

  const welcomeEmail = await sendMailingListWelcomeEmail({
    readEnv,
    email: normalizedEmail,
  });

  return {
    success: true,
    id: record.records?.[0]?.id,
    welcomeEmail,
  };
}
