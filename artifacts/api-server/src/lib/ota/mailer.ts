/**
 * Nodemailer wrapper for OTA magic links.
 * Connects to the configured Mailinabox (or any SMTP) server.
 * If SMTP env vars are missing, logs the link to console (dev convenience).
 */
import nodemailer, { type Transporter } from "nodemailer";
import { logger } from "../logger";

let _transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (_transporter) return _transporter;
  const host = process.env.OTA_SMTP_HOST;
  const port = Number(process.env.OTA_SMTP_PORT ?? "587");
  const user = process.env.OTA_SMTP_USER;
  const pass = process.env.OTA_SMTP_PASS;
  if (!host || !user || !pass) {
    logger.warn(
      "OTA SMTP not configured — magic links will be logged to console only",
    );
    return null;
  }
  _transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
  return _transporter;
}

export interface MagicLinkEmail {
  to: string;
  token: string;
  baseUrl: string;
}

export async function sendMagicLink({
  to,
  token,
  baseUrl,
}: MagicLinkEmail): Promise<{ delivered: boolean; previewLink: string }> {
  // Link points to the SPA route under the artifact's base path `/ota/`,
  // which then POSTs to /api/ota/owner/verify on mount.
  const link = `${baseUrl.replace(/\/$/, "")}/ota/owner/verify?token=${encodeURIComponent(token)}`;
  const t = getTransporter();
  const from = process.env.OTA_SMTP_FROM ?? process.env.OTA_SMTP_USER ?? "noreply@on-the-avenue";

  if (!t) {
    logger.info({ to, link }, "OTA magic link (no SMTP)");
    return { delivered: false, previewLink: link };
  }

  const text = `Hi,

You requested an edit link for your listing on On the Avenue.

Click the link below to manage your listing. It expires in 15 minutes
and can only be used once.

${link}

If you didn't request this, you can safely ignore this email.

— On the Avenue
Presented by Mint on the Avenue
`;

  const html = `<!doctype html>
<html><body style="font-family:Georgia,serif;background:#faf8f4;color:#1a1a1a;padding:32px;">
  <table cellpadding="0" cellspacing="0" border="0" style="max-width:520px;margin:0 auto;background:#ffffff;border:1px solid #ece8df;border-radius:12px;overflow:hidden">
    <tr><td style="padding:32px 32px 16px 32px;">
      <div style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#7a8a82;">On the Avenue</div>
      <h1 style="font-family:Georgia,serif;font-weight:400;font-size:26px;margin:8px 0 16px 0;color:#0d1f1c;">Manage your listing</h1>
      <p style="font-family:Georgia,serif;font-size:16px;line-height:1.55;color:#3a3a3a;margin:0 0 24px 0;">
        Use the link below to edit your listing. It expires in 15&nbsp;minutes and can only be used once.
      </p>
      <p><a href="${link}" style="display:inline-block;background:#0d1f1c;color:#ffffff;text-decoration:none;padding:14px 22px;border-radius:999px;font-family:'Helvetica Neue',Arial,sans-serif;font-size:14px;letter-spacing:.04em;">Open my listing &rarr;</a></p>
      <p style="font-family:'Helvetica Neue',Arial,sans-serif;font-size:12px;color:#7a8a82;margin-top:24px;word-break:break-all;">Or paste this URL: ${link}</p>
    </td></tr>
    <tr><td style="padding:16px 32px 24px 32px;border-top:1px solid #ece8df;font-family:'Helvetica Neue',Arial,sans-serif;font-size:11px;color:#7a8a82;">
      Presented by Mint on the Avenue · An Aveda salon
    </td></tr>
  </table>
</body></html>`;

  try {
    await t.sendMail({ from, to, subject: "Your On the Avenue edit link", text, html });
    logger.info({ to }, "magic link sent");
    return { delivered: true, previewLink: link };
  } catch (err) {
    logger.error({ err, to }, "magic link send failed");
    return { delivered: false, previewLink: link };
  }
}
