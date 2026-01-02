document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const footer = document.getElementById("site-footer");

  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <div class="site-shell">
        <a class="site-brand" href="/">Divergify</a>
        <nav class="site-nav" aria-label="Primary">
          <a href="/">Home</a>
          <a href="/app">App</a>
          <a href="/legal/privacy">Privacy</a>
        </nav>
      </div>
    `;
  }

  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="site-shell">
        <div class="footer-meta">Productivity support only. Not medical advice.</div>
        <div class="footer-links">
          <a href="/legal/privacy">Privacy</a>
        </div>
      </div>
    `;
  }
});
