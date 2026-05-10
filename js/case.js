/* Case study page renderer. Loads case by ?slug=... */

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  const root = document.getElementById("case-root");
  if (!root) return;

  const c = getCase(slug);
  if (!c) {
    root.innerHTML = `
      <section class="cs-header">
        <div class="container">
          <a class="cs-back" href="work.html">All case studies</a>
          <h1>Case study not found</h1>
          <p class="cs-lead">We couldn't find a case study with that slug. <a href="work.html">Back to portfolio</a>.</p>
        </div>
      </section>`;
    document.title = "Case study not found · Outstage";
    return;
  }
  document.title = `${c.name} · Outstage`;

  const tags = [...new Set([...c.industries, ...c.workTypes])];
  const sideHtml = `
    <aside class="cs-side">
      <h4>Engagement facts</h4>
      <dl>
        <div><dt>Industry</dt><dd>${escapeHtml(c.category)}</dd></div>
        ${c.location ? `<div><dt>Location</dt><dd>${escapeHtml(c.location)}</dd></div>` : ""}
        <div><dt>Engagement</dt><dd>${escapeHtml(c.engagement)}</dd></div>
        <div><dt>Tags</dt><dd><div class="cs-tags">${tags.map((t) => `<span class="cs-tag">${escapeHtml(t)}</span>`).join("")}</div></dd></div>
      </dl>
    </aside>`;

  const metricsHtml = c.results.map(
    (r) => `<div class="cs-metric"><div class="cs-metric-value">${escapeHtml(r.value)}</div><div class="cs-metric-label">${escapeHtml(r.label)}</div></div>`
  ).join("");

  const snapshot = (c.snapshot || []).map((s) => `<li>${escapeHtml(s)}</li>`).join("");
  const audience = (c.audience || []).map((a) => `<li>${escapeHtml(a)}</li>`).join("");
  const method = (c.methodology || []).map((m) => `<li>${escapeHtml(m)}</li>`).join("");
  const companies = (c.companies || []).map((co) => `<span class="cs-tag">${escapeHtml(co)}</span>`).join("");

  const related = (c.related || [])
    .map(getCase)
    .filter(Boolean)
    .map((rc) => caseCard(rc))
    .join("");

  root.innerHTML = `
    <section class="cs-header">
      <div class="container">
        <a class="cs-back" href="work.html">All case studies</a>
        <div class="cs-eyebrow">${escapeHtml(c.category)}</div>
        <h1>${escapeHtml(c.name)}</h1>
        <p class="cs-lead">${escapeHtml(c.challenge)}</p>
      </div>
    </section>

    <section class="container">
      <div class="cs-body">
        <div class="cs-main">
          <h2>Key results</h2>
          <div class="cs-metrics">${metricsHtml}</div>

          ${snapshot ? `<h2>Company snapshot</h2><ul>${snapshot}</ul>` : ""}

          <h2>Target audience</h2>
          <ul>${audience}</ul>

          <h2>Context</h2>
          <p>${escapeHtml(c.context)}</p>

          <h2>Challenge</h2>
          <p>${escapeHtml(c.challenge)}</p>

          <h2>Methodology</h2>
          <ul>${method}</ul>

          ${companies ? `<h2>Companies activated</h2><div class="cs-tags">${companies}</div>` : ""}
        </div>
        ${sideHtml}
      </div>
    </section>

    ${related
      ? `<section class="cs-related"><div class="container"><h2>Related case studies</h2><div class="case-grid">${related}</div></div></section>`
      : ""}
  `;
});
