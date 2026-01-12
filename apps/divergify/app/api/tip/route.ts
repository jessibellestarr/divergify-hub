import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const amt = String(form.get("amount") || "small");
  const amountCents = amt === "large" ? 1500 : amt === "medium" ? 700 : 300;

  const key = process.env.STRIPE_SECRET_KEY || "";
  if (!key) return NextResponse.json({ error: "stripe key missing" }, { status: 500 });

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price_data: { currency: "usd", product_data: { name: "Tip" }, unit_amount: amountCents }, quantity: 1 }],
    success_url: (process.env.AUTH_URL || "http://localhost:3000") + "/support",
    cancel_url: (process.env.AUTH_URL || "http://localhost:3000") + "/support",
  });
  return NextResponse.redirect(session.url || "/support", { status: 303 });
}
