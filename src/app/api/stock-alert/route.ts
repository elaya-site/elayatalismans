import { NextRequest, NextResponse } from "next/server";
import {
  createAlertRequest,
  getAllRequests,
} from "@/lib/stockAlerts";

/* ─────────────────────────────────────────────────────────
   POST /api/stock-alert
   Body: { email, productId, productName }
   ───────────────────────────────────────────────────────── */
export async function POST(req: NextRequest) {
  try {
    const { email, productId, productName } = await req.json();

    /* — validation — */
    if (!email || !productId || !productName) {
      return NextResponse.json(
        { error: "Champs manquants." },
        { status: 400 },
      );
    }

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRx.test(email)) {
      return NextResponse.json(
        { error: "Adresse e-mail invalide." },
        { status: 400 },
      );
    }

    /* — persist — */
    const entry = await createAlertRequest(email, productId, productName);

    /* — admin notification (optional, requires RESEND_API_KEY + ADMIN_EMAIL) — */
    await notifyAdmin(entry.email, productName).catch(() => {
      /* silently swallow — no email service configured */
    });

    return NextResponse.json({ ok: true, id: entry.id }, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.message === "DUPLICATE") {
      return NextResponse.json(
        { error: "DUPLICATE", message: "Vous êtes déjà inscrit(e) pour ce produit." },
        { status: 409 },
      );
    }
    console.error("[stock-alert] POST error:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

/* ─────────────────────────────────────────────────────────
   GET /api/stock-alert
   Returns all requests (admin view — add auth before going live).
   ───────────────────────────────────────────────────────── */
export async function GET() {
  try {
    const requests = await getAllRequests();
    return NextResponse.json({ requests });
  } catch (err) {
    console.error("[stock-alert] GET error:", err);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}

/* ─────────────────────────────────────────────────────────
   Admin notification via Resend (https://resend.com)
   Set env vars to activate:
     RESEND_API_KEY=re_xxxxxxxxxxxx
     ADMIN_EMAIL=hello@elaya.fr
   ───────────────────────────────────────────────────────── */
async function notifyAdmin(userEmail: string, productName: string) {
  const apiKey     = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!apiKey || !adminEmail) return; // not configured — skip

  await fetch("https://api.resend.com/emails", {
    method:  "POST",
    headers: {
      "Content-Type":  "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from:    "ELAYA Boutique <boutique@elaya.fr>",
      to:      [adminEmail],
      subject: `[ELAYA] Nouvelle alerte stock — ${productName}`,
      html: `
        <p>Une nouvelle demande d'alerte stock a été enregistrée.</p>
        <table>
          <tr><td><strong>Produit</strong></td><td>${productName}</td></tr>
          <tr><td><strong>Email</strong></td><td>${userEmail}</td></tr>
          <tr><td><strong>Date</strong></td><td>${new Date().toLocaleString("fr-FR")}</td></tr>
        </table>
        <p>Consultez toutes les demandes : <a href="${process.env.NEXT_PUBLIC_URL ?? ""}/api/stock-alert">voir les inscriptions</a></p>
      `,
    }),
  });
}
