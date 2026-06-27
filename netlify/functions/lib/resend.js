function welcomeEmailHtml(siteUrl) {
  const joinUrl = `${siteUrl.replace(/\/$/, '')}/join`;
  return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f6f1e8;font-family:Inter,Helvetica Neue,Arial,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f1e8;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #d9d2c3;">
            <tr>
              <td style="padding:40px 32px 24px;">
                <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#8a8175;">GUILD SA</p>
                <h1 style="margin:0 0 16px;font-size:32px;line-height:1.1;font-weight:900;letter-spacing:-0.02em;">You&rsquo;re on the list.</h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#5c574f;">
                  Thanks for joining the GUILD SA mailing list. You&rsquo;ll receive updates on Buildathons, campus activations, partner opportunities, and the builder ecosystem as it grows.
                </p>
                <p style="margin:0 0 24px;font-size:16px;line-height:1.6;color:#5c574f;">
                  The inaugural AI Buildathon is <strong>01 August 2026</strong> at <strong>Eduvos Menlyn</strong> — 100 builders. One day. One working product.
                </p>
                <a href="${joinUrl}" style="display:inline-block;padding:14px 20px;background:#111111;color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Apply To Build</a>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 32px;border-top:1px solid #e8e2d6;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#8a8175;">
                  Build &amp; ship real-world solutions.<br />
                  <a href="mailto:guildsagroup@gmail.com" style="color:#8a8175;">guildsagroup@gmail.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}

export async function sendMailingListWelcomeEmail({ readEnv, email }) {
  const apiKey = readEnv('RESEND_API_KEY');
  const from = readEnv('RESEND_FROM_EMAIL') || 'GUILD SA <onboarding@resend.dev>';
  const replyTo = readEnv('RESEND_REPLY_TO') || 'guildsagroup@gmail.com';
  const siteUrl = readEnv('SITE_URL') || readEnv('URL') || 'https://guildsa.co.za';

  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured; skipping welcome email.');
    return { sent: false, skipped: true };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      reply_to: replyTo,
      to: email,
      subject: "You're on the GUILD SA list",
      html: welcomeEmailHtml(siteUrl),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error('Resend API error:', data);
    return {
      sent: false,
      error: data.message || data.error || 'Resend request failed',
    };
  }

  return { sent: true, id: data.id };
}

function teamInviteEmailHtml({ leaderName, teamName, inviteCode, inviteUrl }) {
  const greeting = leaderName ? `Hi ${leaderName},` : 'Hi,';
  return `
<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f6f1e8;font-family:Inter,Helvetica Neue,Arial,sans-serif;color:#111111;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f1e8;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border:1px solid #d9d2c3;">
            <tr>
              <td style="padding:40px 32px 24px;">
                <p style="margin:0 0 12px;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#8a8175;">GUILD SA</p>
                <h1 style="margin:0 0 16px;font-size:32px;line-height:1.1;font-weight:900;letter-spacing:-0.02em;">Your team is registered.</h1>
                <p style="margin:0 0 16px;font-size:16px;line-height:1.6;color:#5c574f;">
                  ${greeting} <strong>${teamName || 'Your team'}</strong> is in the system. Share the invite link below so teammates can join before the Buildathon.
                </p>
                <p style="margin:0 0 8px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#8a8175;">Invite code</p>
                <p style="margin:0 0 20px;font-size:28px;line-height:1.2;font-weight:700;letter-spacing:0.08em;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;">${inviteCode}</p>
                <a href="${inviteUrl}" style="display:inline-block;padding:14px 20px;background:#111111;color:#ffffff;text-decoration:none;font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;">Share Invite Link</a>
                <p style="margin:20px 0 0;font-size:14px;line-height:1.6;color:#8a8175;word-break:break-all;">${inviteUrl}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px 32px;border-top:1px solid #e8e2d6;">
                <p style="margin:0;font-size:13px;line-height:1.6;color:#8a8175;">
                  Teammates can also enter the code at your site&rsquo;s Team Invite page.<br />
                  <a href="mailto:guildsagroup@gmail.com" style="color:#8a8175;">guildsagroup@gmail.com</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`.trim();
}

export async function sendTeamInviteEmail({ readEnv, email, leaderName, teamName, inviteCode, inviteUrl }) {
  const apiKey = readEnv('RESEND_API_KEY');
  const from = readEnv('RESEND_FROM_EMAIL') || 'GUILD SA <onboarding@resend.dev>';
  const replyTo = readEnv('RESEND_REPLY_TO') || 'guildsagroup@gmail.com';

  if (!apiKey) {
    console.warn('RESEND_API_KEY not configured; skipping team invite email.');
    return { sent: false, skipped: true };
  }

  if (!email) {
    return { sent: false, skipped: true, error: 'No team leader email provided.' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      reply_to: replyTo,
      to: email,
      subject: `GUILD SA team invite — ${teamName || 'your team'}`,
      html: teamInviteEmailHtml({ leaderName, teamName, inviteCode, inviteUrl }),
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    console.error('Resend team invite email error:', data);
    return {
      sent: false,
      error: data.message || data.error || 'Resend request failed',
    };
  }

  return { sent: true, id: data.id };
}
