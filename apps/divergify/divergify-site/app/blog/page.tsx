import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import Link from "next/link";

export default function Blog() {
  const dir = path.join(process.cwd(), "content", "blog");
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];

  const posts: any[] = files
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = fs.readFileSync(path.join(dir, f), "utf8");
      const { data } = matter(raw);
      return { slug: f.replace(/\.md$/, ""), ...(data as any) };
    });

  return (
    <div>
      <h1>Blog</h1>
      {posts.map((p) => (
        <article key={p.slug}>
          <h3>
            <Link href={`/blog/${p.slug}`}>{p.title ?? p.slug}</Link>
          </h3>
          <p style={{ color: "#9ca3af", fontSize: 12 }}>
            {new Date(p.date ?? Date.now()).toDateString()}
          </p>
        </article>
      ))}
    </div>
  );
}
