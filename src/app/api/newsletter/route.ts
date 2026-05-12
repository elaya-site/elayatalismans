import { NextRequest, NextResponse } from "next/server";

const PROMO_CODE = "BIENVENUE10";
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = "contact@elayatalismans.com";
const NOTIFY_EMAIL = "daydie.laura@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const { email, firstName } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Email invalide" }, { status: 400 });
    }

    const prenom = firstName?.trim() || "vous";

    // Email de bienvenue à la cliente
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `ELAYA Talismans <${FROM_EMAIL}>`,
        to: [email],
        subject: "Votre cadeau de bienvenue — 10% sur votre première commande",
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: auto; color: #1a1209; background: #faf7f2; padding: 48px 36px;">
            <p style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; color: #b5862a; margin: 0 0 32px;">ELAYA Talismans</p>

            <h1 style="font-size: 28px; font-weight: 400; margin: 0 0 24px; line-height: 1.3;">
              Bienvenue, <em>${prenom}.</em>
            </h1>

            <p style="font-size: 16px; line-height: 1.8; color: #3d2b00; margin: 0 0 32px;">
              Merci de rejoindre la communauté ELAYA.<br>
              Pour vous accueillir, voici votre cadeau de bienvenue :
            </p>

            <div style="background: #1a1209; color: #e8c97a; text-align: center; padding: 28px; border-radius: 4px; margin: 0 0 32px;">
              <p style="font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin: 0 0 12px; opacity: 0.7;">Votre code promo exclusif</p>
              <p style="font-size: 32px; letter-spacing: 6px; font-weight: 600; margin: 0 0 8px;">${PROMO_CODE}</p>
              <p style="font-size: 14px; margin: 0; opacity: 0.8;">— 10% de réduction sur votre première commande —</p>
            </div>

            <p style="font-size: 15px; line-height: 1.8; color: #3d2b00; margin: 0 0 8px;">
              Entrez ce code lors du paiement, dans le champ <strong>"Code promotionnel"</strong>.
            </p>
            <p style="font-size: 13px; color: #7a6240; margin: 0 0 40px;">
              Valable sur toutes les collections · Sans minimum d'achat · Un usage par personne.
            </p>

            <a href="https://www.elayatalismans.com" style="display: inline-block; background: #b5862a; color: #fff; text-decoration: none; padding: 14px 28px; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">
              Découvrir les collections →
            </a>

            <p style="font-size: 12px; color: #a0896a; margin: 48px 0 0; line-height: 1.6;">
              ELAYA Talismans · Laura Daydie · Lescar, France<br>
              Pour vous désabonner, répondez simplement à cet email.
            </p>
          </div>
        `,
      }),
    });

    // Notification interne
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `ELAYA Talismans <${FROM_EMAIL}>`,
        to: [NOTIFY_EMAIL],
        subject: `Nouvelle inscription newsletter — ${email}`,
        html: `<p>Nouvelle inscription : <strong>${email}</strong> (${prenom})</p>`,
      }),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
