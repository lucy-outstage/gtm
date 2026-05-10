/* Shared render helpers used across pages */

function escapeHtml(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function caseHref(slug) {
  return `/case-studies/case.html?slug=${encodeURIComponent(slug)}`;
}

function levelHref(slug) {
  return `/playbook/levels/level.html?slug=${encodeURIComponent(slug)}`;
}

function caseCard(c, opts = {}) {
  const tag = c.featured ? "Featured" : (c.industries[0] || "");
  const meta = [c.location, c.engagement].filter(Boolean).join(" · ");
  const metrics = (c.results || []).slice(0, 3).map(
    (r) => `<div class="case-card-metric"><strong>${escapeHtml(r.value)}</strong> <span>${escapeHtml(r.label)}</span></div>`
  ).join("");
  return `
    <a class="case-card${opts.featured ? " case-card-featured" : ""}" href="${caseHref(c.slug)}">
      <div class="case-card-top">
        <div class="case-card-name">${escapeHtml(c.name)}</div>
        <span class="case-card-tag">${escapeHtml(tag)}</span>
      </div>
      <div class="case-card-meta"><span>${escapeHtml(c.category)}</span>${meta ? `<span>${escapeHtml(meta)}</span>` : ""}</div>
      <p class="case-card-challenge">${escapeHtml(c.challenge)}</p>
      <div class="case-card-metrics">${metrics}</div>
      <span class="case-card-link">Read case study</span>
    </a>
  `;
}

function logoStrip(logos) {
  return logos.map((l) => `<span class="logo-item">${escapeHtml(l)}</span>`).join("");
}

if (typeof window !== "undefined") {
  window.escapeHtml = escapeHtml;
  window.caseHref = caseHref;
  window.levelHref = levelHref;
  window.caseCard = caseCard;
  window.logoStrip = logoStrip;
}
