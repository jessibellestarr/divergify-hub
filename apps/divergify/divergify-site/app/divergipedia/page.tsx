import fs from "node:fs";
import path from "node:path";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

const markdownSource = fs.readFileSync(
  path.join(process.cwd(), "content", "divergipedia.md"),
  "utf8"
);

const components: Components = {
  h1: (props) => (
    <h1
      style={{
        fontSize: "2.5rem",
        marginBottom: "1rem",
        color: "#fff",
      }}
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      style={{
        marginTop: "2.5rem",
        marginBottom: "0.75rem",
        color: "#a855f7",
        fontSize: "1.5rem",
      }}
      {...props}
    />
  ),
  p: (props) => (
    <p
      style={{
        lineHeight: 1.7,
        color: "#d1d5db",
        marginBottom: "1rem",
      }}
      {...props}
    />
  ),
  img: ({ alt, src }) => {
    const reference = typeof src === "string" ? src : "";

    return (
      <figure
        style={{
          border: "1px dashed #27272a",
          borderRadius: "0.75rem",
          padding: "1rem",
          margin: "1.5rem 0",
          background: "#111",
        }}
      >
        <div style={{ fontWeight: 600, marginBottom: "0.5rem" }}>{alt}</div>
        {reference ? (
          <p style={{ color: "#9ca3af", margin: 0 }}>Image reference: {reference}</p>
        ) : null}
      </figure>
    );
  },
  ul: (props) => (
    <ul
      style={{
        paddingLeft: "1.25rem",
        marginBottom: "1rem",
        color: "#d1d5db",
      }}
      {...props}
    />
  ),
};

export default function DivergipediaPage() {
  return (
    <main
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "2.5rem 1rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div
        style={{
          background: "#111827",
          border: "1px solid #1f2937",
          borderRadius: "1.25rem",
          padding: "2rem",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
        }}
      >
        <ReactMarkdown components={components}>{markdownSource}</ReactMarkdown>
      </div>
    </main>
  );
}
