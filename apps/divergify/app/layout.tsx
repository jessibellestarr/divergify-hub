import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Divergify",
  description: "Divergify. For brains that zig when the world zags.",
  themeColor: "#00466C",
  openGraph: {
    title: "Divergify",
    description: "Neurodivergent-friendly productivity.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ background: "white", fontFamily: "system-ui, sans-serif" }}>
        <nav
          style={{
            background: "#8BC34A",
            padding: "1rem",
            fontWeight: "bold",
            color: "#00466C",
          }}
        >
          Divergify Nav
        </nav>
        <main style={{ minHeight: "100vh" }}>{children}</main>
      </body>
    </html>
  );
}
