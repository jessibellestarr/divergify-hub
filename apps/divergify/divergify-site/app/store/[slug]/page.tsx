import products from "../../../lib/products.json";
import { notFound } from "next/navigation";

export default function Product(props: any) {
  const slug = String(props?.params?.slug || "");
  const p: any = (products as any[]).find((x: any) => x.slug === slug);
  if (!p) return notFound();

  return (
    <div>
      <h1>{p.title}</h1>
      <p>{p.description}</p>
      <p>${(p.priceCents / 100).toFixed(2)}</p>
      <form action="/api/checkout" method="POST">
        <input type="hidden" name="slug" value={p.slug} />
        <button type="submit">Buy</button>
      </form>
    </div>
  );
}
