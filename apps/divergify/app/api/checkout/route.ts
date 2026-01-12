import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import products from "@/lib/products.json";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const slug = String(form.get("slug") || "");
  const product = products.find(p => p.slug === slug);
  if (!product) return NextResponse.json({ error: "not found" }, { status: 404 });

  const key = process.env.STRIPE_SECRET_KEY || "";
  if (!key) return NextResponse.json({ error: "stripe key missing" }, { status: 500 });

  const stripe = new Stripe(key, { apiVersion: "2024-06-20" });
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price_data: { currency: "usd", product_data: { name: product.title }, unit_amount: product.priceCents }, quantity: 1 }],
    success_url: (process.env.AUTH_URL || "http://localhost:3000") + "/store",
    cancel_url: (process.env.AUTH_URL || "http://localhost:3000") + "/store",
  });
  return NextResponse.redirect(session.url || "/store", { status: 303 });
}
