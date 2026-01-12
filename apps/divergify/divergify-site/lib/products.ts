import raw from './products.json';

export type Product = {
  id: string;
  name: string;
  price?: number;
  priceCents?: number;
  currency?: string;
  stripePriceId?: string;
  description?: string;
  image?: string;
};

const normalize = (p: any): Product => ({
  id: p.id ?? p.sku ?? p.key,
  name: p.name ?? p.title ?? "Item",
  price: typeof p.price === "number"
    ? p.price
    : (typeof p.priceCents === "number" ? Math.round(p.priceCents / 100) : undefined),
  priceCents: typeof p.priceCents === "number"
    ? p.priceCents
    : (typeof p.price === "number" ? Math.round(p.price * 100) : undefined),
  currency: p.currency ?? "USD",
  stripePriceId: p.stripePriceId ?? p.stripe_price_id ?? undefined,
  description: p.description,
  image: p.image,
});

const arr = Array.isArray(raw)
  ? raw
  : Array.isArray((raw as any).products)
    ? (raw as any).products
    : Object.values(raw as any);

export const products: Product[] = (arr as any[]).map(normalize);
export const getProduct = (id: string) => products.find(p => p.id === id) || null;

// Default export for compatibility with `import products from ...`
export default products;
