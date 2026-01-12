export default function SupportPage() {
  return (
    <div>
      <h1>Tip Jar</h1>
      <p style={{ color: "#9ca3af", marginBottom: "0.75rem" }}>
        If Divergify helps you hold your brain together, you can toss a little fuel back in the tank.
      </p>

      <form action="/api/tip" method="POST" style={{ display: "grid", gap: "0.75rem", maxWidth: "320px" }}>
        <label>
          Amount
          <select name="amount" style={{ display: "block", marginTop: "0.25rem" }}>
            <option value="small">$3 – tiny dopamine</option>
            <option value="medium">$7 – solid boost</option>
            <option value="large">$15 – big signal</option>
          </select>
        </label>

        <button
          type="submit"
          style={{
            background: "#22c55e",
            color: "#000",
            padding: "0.5rem 1rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            fontWeight: 600
          }}
        >
          Send tip
        </button>
      </form>
    </div>
  );
}
