import products from "@/lib/products.json"; import Link from "next/link";
export default function Store(){ return (<div><h1>Store</h1><ul>{products.map(p=>(<li key={p.slug}><strong>{p.title}</strong> — ${(p.priceCents/100).toFixed(2)} <Link href={`/store/${p.slug}`}>Buy</Link></li>))}</ul></div>); }
