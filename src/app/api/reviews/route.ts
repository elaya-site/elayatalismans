import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { productId, productName, author, rating, text } = await req.json();

  if (!author || !rating || !text || !productId) {
    return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Config manquante" }, { status: 500 });
  }

  const stars = "★".repeat(rating) + "☆".repeat(5 - rating);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.RESEND_FROM ?? "ELAYA <onboarding@resend.dev>",
      to: "daydie.laura@gmail.com",
      subject: `⭐ Nouvel avis — ${productName}`,
      html: `
        <h2>Nouvel avis client</h2>
        <p><strong>Produit :</strong> ${productName} (${productId})</p>
        <p><strong>Auteur :</strong> ${author}</p>
        <p><strong>Note :</strong> ${stars} (${rating}/5)</p>
        <p><strong>Avis :</strong><br/>${text}</p>
        <hr/>
        <p style="color:#999;font-size:12px;">
          Pour publier cet avis, ajoute-le dans <code>src/data/reviews.ts</code> :<br/><br/>
          <code>{ id: "${Date.now()}", productId: "${productId}", author: "${author}", rating: ${rating}, text: "${text.replace(/"/g, '\\"')}", date: "${new Date().toISOString().split("T")[0]}" }</code>
        </p>
      `,
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Erreur envoi email" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
