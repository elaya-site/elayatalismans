import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.elayatalismans.com";

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  if (!items?.length) {
    return NextResponse.json({ error: "Panier vide" }, { status: 400 });
  }

  const line_items = items.map((item: { name: string; price: number; image: string; quantity: number }) => ({
    price_data: {
      currency: "eur",
      product_data: {
        name: item.name,
        images: item.image.startsWith("http") ? [item.image] : [],
      },
      unit_amount: Math.round(item.price * 100),
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    shipping_address_collection: { allowed_countries: ["FR", "BE", "CH", "LU", "MC"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 490, currency: "eur" },
          display_name: "Livraison standard",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "eur" },
          display_name: "Livraison offerte",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 3 },
            maximum: { unit: "business_day", value: 5 },
          },
        },
      },
    ],
    success_url: `${siteUrl}/commande/succes?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/panier`,
    locale: "fr",
  });

  return NextResponse.json({ url: session.url });
}
