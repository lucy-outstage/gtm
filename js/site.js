/* Site-wide nav helpers */

(function () {
  // Mark the active nav link based on location
  function markActive() {
    const path = location.pathname.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
    document.querySelectorAll(".nav-links a, .footer-col a").forEach((a) => {
      const href = a.getAttribute("href") || "";
      const norm = href.replace(/index\.html$/, "").replace(/\/$/, "") || "/";
      if (norm === path || (norm !== "/" && path.startsWith(norm))) {
        a.classList.add("is-active");
      }
    });
  }

  // Inject footer year
  function setYear() {
    const el = document.querySelector("[data-year]");
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    markActive();
    setYear();
  });
})();
