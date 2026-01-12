import Link from "next/link";

export default function HomePage() {
  return (
    <main
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>Divergify</h1>
      <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>
        For brains that zig when the world zags.
      </p>

      <section style={{ display: "grid", gap: "1rem" }}>
        <Link href="/divergipedia">
          <div style={{ border: "1px solid #27272a", padding: "1rem", borderRadius: "0.75rem" }}>
            <h2>Divergipedia</h2>
            <p style={{ color: "#9ca3af" }}>
              Our living glossary and guide for neurospicy humans.
            </p>
          </div>
        </Link>

        <Link href="/community">
          <div style={{ border: "1px solid #27272a", padding: "1rem", borderRadius: "0.75rem" }}>
            <h2>Community Hub</h2>
            <p style={{ color: "#9ca3af" }}>
              Meet other brains that refuse the factory settings.
            </p>
          </div>
        </Link>

        <Link href="/store">
          <div style={{ border: "1px solid #27272a", padding: "1rem", borderRadius: "0.75rem" }}>
            <h2>Store & Merch</h2>
            <p style={{ color: "#9ca3af" }}>
              Shirts, stickers, and chaos armor built from our own sayings.
            </p>
          </div>
        </Link>

        <Link href="/support">
          <div style={{ border: "1px solid #27272a", padding: "1rem", borderRadius: "0.75rem" }}>
            <h2>Tip Jar</h2>
            <p style={{ color: "#9ca3af" }}>
              If this helps you, you can help keep it online.
            </p>
          </div>
        </Link>
      </section>
    </main>
  );
}
