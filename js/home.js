/* Homepage renderer */

document.addEventListener("DOMContentLoaded", () => {
  // Logo strip
  const logoStripEl = document.getElementById("logo-strip");
  if (logoStripEl) logoStripEl.innerHTML = logoStrip(PROOF_LOGOS);

  // Portfolio groups
  const portfolio = document.getElementById("portfolio-groups");
  if (portfolio) {
    portfolio.innerHTML = HOME_GROUPS.map((g) => {
      const cards = g.slugs
        .map(getCase)
        .filter(Boolean)
        .map((c, i) => caseCard(c, { featured: false }))
        .join("");
      return `
        <div class="category-head">
          <h3>${escapeHtml(g.name)}</h3>
          <span class="count">${g.slugs.length} case studies</span>
        </div>
        <p class="category-blurb">${escapeHtml(g.blurb)}</p>
        <div class="case-grid">${cards}</div>
      `;
    }).join("");
  }

  // Problems grid
  const problems = document.getElementById("problems-grid");
  if (problems) {
    problems.innerHTML = PROBLEMS.map(
      (p, i) => `
      <div class="problem-card">
        <span class="problem-num">${String(i + 1).padStart(2, "0")}</span>
        <span class="problem-text">${escapeHtml(p)}</span>
      </div>
    `
    ).join("");
  }

  // Methodology
  const method = document.getElementById("method-grid");
  if (method) {
    method.innerHTML = METHODOLOGY.map(
      (s, i) => `
      <div class="method-step">
        <div class="method-step-num">${String(i + 1).padStart(2, "0")}</div>
        <div class="method-step-name">${escapeHtml(s.name)}</div>
        <div class="method-step-desc">${escapeHtml(s.desc)}</div>
      </div>
    `
    ).join("");
  }
});
