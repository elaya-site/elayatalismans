import { NextResponse } from "next/server";

/**
 * POST /api/contact
 * Sends the contact form to CONTACT_EMAIL via the Resend REST API.
 * Environment variables required (set in Vercel dashboard):
 *   RESEND_API_KEY  — your Resend API key
 *   CONTACT_EMAIL   — the email address that receives messages
 *   RESEND_FROM     — sender address (e.g. "ELAYA <noreply@votredomaine.com>")
 *                     Falls back to Resend's test address if not set.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Honeypot: bots fill hidden fields, real users don't
    if (body._hp) {
      // Silent success — don't reveal the filter to bots
      return NextResponse.json({ ok: true });
    }

    const { prenom, nom, email, sujet, message } = body as Record<string, string>;

    // Basic server-side validation
    if (!prenom?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Champs obligatoires manquants." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Adresse email invalide." },
        { status: 400 }
      );
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const CONTACT_EMAIL  = process.env.CONTACT_EMAIL ?? "daydie.laura@gmail.com";
    const RESEND_FROM    = process.env.RESEND_FROM ?? "ELAYA <onboarding@resend.dev>";

    if (!RESEND_API_KEY) {
      console.error("[contact] Missing env var: RESEND_API_KEY");
      return NextResponse.json(
        { error: "Configuration serveur incomplète. Veuillez réessayer plus tard." },
        { status: 500 }
      );
    }

    const fullName = `${prenom.trim()} ${nom?.trim() ?? ""}`.trim();
    const subject  = sujet?.trim()
      ? `[ELAYA] ${sujet.trim()}`
      : `[ELAYA] Nouveau message de ${fullName}`;

    const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><style>
  body  { font-family: Georgia, serif; background: #14100C; color: #F4ECDF; margin: 0; padding: 0; }
  .wrap { max-width: 580px; margin: 0 auto; padding: 48px 32px; }
  .brand{ font-size: 13px; letter-spacing: 0.32em; text-transform: uppercase; color: #C49A5C; margin-bottom: 40px; }
  h2   { font-size: 24px; font-weight: 300; margin: 0 0 32px; letter-spacing: 0.04em; }
  .row { margin-bottom: 20px; }
  .lbl { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: #C49A5C; margin-bottom: 4px; }
  .val { font-size: 16px; line-height: 1.6; color: #F4ECDF; }
  .msg { white-space: pre-wrap; border-top: 1px solid rgba(244,236,223,0.12); padding-top: 24px; margin-top: 24px; }
  .foot{ margin-top: 48px; font-size: 11px; letter-spacing: 0.2em; color: rgba(244,236,223,0.4); text-transform: uppercase; }
</style></head>
<body>
<div class="wrap">
  <div class="brand">✦ ELAYA Talismans</div>
  <h2>Nouveau message via elaya-talismans.com</h2>
  <div class="row"><div class="lbl">De</div><div class="val">${escapeHtml(fullName)}</div></div>
  <div class="row"><div class="lbl">Email</div><div class="val"><a href="mailto:${escapeHtml(email)}" style="color:#C49A5C;">${escapeHtml(email)}</a></div></div>
  ${sujet?.trim() ? `<div class="row"><div class="lbl">Sujet</div><div class="val">${escapeHtml(sujet.trim())}</div></div>` : ""}
  <div class="row msg"><div class="lbl">Message</div><div class="val" style="margin-top:8px;">${escapeHtml(message.trim())}</div></div>
  <div class="foot">© ELAYA Talismans — message reçu via le formulaire de contact</div>
</div>
</body>
</html>`;

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:     RESEND_FROM,
        to:       [CONTACT_EMAIL],
        reply_to: email,
        subject,
        html,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text().catch(() => "");
      console.error("[contact] Resend error:", resendRes.status, err);
      return NextResponse.json(
        { error: "L'envoi a échoué. Veuillez réessayer dans quelques instants." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Une erreur inattendue est survenue." },
      { status: 500 }
    );
  }
}

/** Escape HTML special characters to prevent injection in the email body. */
function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
