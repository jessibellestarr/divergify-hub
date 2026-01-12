import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { notFound } from "next/navigation";

export default function Post(props: any) {
  const slug = String(props?.params?.slug || "");
  const filePath = path.join(process.cwd(), "content", "blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return notFound();
  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return (
    <article>
      <h1>{String(data?.title || slug)}</h1>
      <p style={{ color: "#9ca3af", fontSize: 12 }}>
        {new Date(String(data?.date || Date.now())).toDateString()}
      </p>
      <pre style={{ whiteSpace: "pre-wrap" }}>{content}</pre>
    </article>
  );
}
