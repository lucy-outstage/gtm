/* /playbook/levels/level.html — single Level page driven by ?slug= */

document.addEventListener("DOMContentLoaded", async () => {
  await PB.ready;

  const root = document.getElementById("level-root");
  const params = new URLSearchParams(location.search);
  const slug = params.get("slug");
  let level = PB.levelBySlug(slug);
  // Allow ?n=1..10 too
  if (!level && params.get("n")) level = PB.levelByNumber(parseInt(params.get("n"), 10));
  if (!level) {
    root.innerHTML = `<section class="cs-header"><div class="container"><a class="cs-back" href="playbook/">All Levels</a><h1>Level not found</h1></div></section>`;
    return;
  }
  document.title = `Level ${level.number}: ${level.name} · Outstage Playbook`;

  const state = PB.loadState();
  const score = PB.score(state);

  // Diagnostic view
  const dims = (level.feedingAuditDimensions || []).map((id) => PB.byId[id]).filter(Boolean);
  let diagnosticHtml = "";
  if (dims.length === 0) {
    diagnosticHtml = `
      <div class="level-diagnostic">
        <h3>Your diagnostic view</h3>
        <p class="muted">${escapeHtml(level.auditNote || "No audit dimensions feed this level.")}</p>
      </div>`;
  } else {
    const answeredDims = dims.filter((d) => Number.isInteger(state.answers[d.id]));
    if (answeredDims.length === 0) {
      diagnosticHtml = `
        <div class="level-diagnostic">
          <h3>Your diagnostic view</h3>
          <p class="muted">Take the audit to see your scores for ${dims.length} dimensions feeding this level.</p>
          <a class="btn btn-secondary" href="playbook/audit.html">Take the audit</a>
        </div>`;
    } else {
      const subtotal = answeredDims.reduce((s, d) => s + state.answers[d.id], 0);
      const subMax = answeredDims.length * 4;
      const rows = dims.map((d) => {
        const v = state.answers[d.id];
        const has = Number.isInteger(v);
        return `
          <div class="diagnostic-row${has ? "" : " is-empty"}">
            <span class="diagnostic-id">${escapeHtml(d.id)}</span>
            <div class="diagnostic-mid">
              <div class="diagnostic-name">${escapeHtml(d.name)}</div>
              <div class="diagnostic-bar"><div style="width:${has ? (v / 4) * 100 : 0}%"></div></div>
            </div>
            <span class="diagnostic-score">${has ? `L${v}` : "—"}</span>
          </div>`;
      }).join("");
      diagnosticHtml = `
        <div class="level-diagnostic">
          <h3>Your diagnostic view</h3>
          <p class="muted">Your scores for the ${dims.length} dimensions feeding this level. Subtotal ${subtotal}/${subMax}.</p>
          ${rows}
        </div>`;
    }
  }

  // What good looks like (Level 4 description of feeding dimensions)
  const goodHtml = dims.length
    ? `<h2>What good looks like</h2>
       <ul class="level-good">${dims.map((d) => `<li><strong>${escapeHtml(d.name)}.</strong> ${escapeHtml(d.levels[4].description)}</li>`).join("")}</ul>`
    : "";

  const inside = (level.whatSitsInside || [])
    .map((i) => `<li><strong>${escapeHtml(i.title)}.</strong>${i.detail ? ` ${escapeHtml(i.detail)}` : ""}</li>`)
    .join("");

  const outputs = (level.keyOutputs || []).map((k) => `<li>${escapeHtml(k)}</li>`).join("");

  // Case studies
  const cases = (level.caseStudySlugs || []).map(getCase).filter(Boolean).map((c) => caseCard(c)).join("");

  // Continue link
  const next = PB.levelByNumber(level.number + 1);
  const continueHtml = next
    ? `<a class="level-continue" href="playbook/levels/level.html?slug=${encodeURIComponent(next.slug)}">Continue to Level ${next.number}: ${escapeHtml(next.name)} →</a>`
    : `<a class="level-continue" href="playbook/results.html">Back to your results →</a>`;

  // Sidebar facts
  const sideHtml = `
    <aside class="cs-side">
      <h4>Level facts</h4>
      <dl>
        <div><dt>Number</dt><dd>L${level.number} of 10</dd></div>
        <div><dt>Distillation</dt><dd>${escapeHtml(level.oneLineDistillation)}</dd></div>
        ${dims.length ? `<div><dt>Audit dimensions feeding this level</dt><dd><div class="cs-tags">${dims.map((d) => `<span class="cs-tag">${escapeHtml(d.id)}</span>`).join("")}</div></dd></div>` : ""}
        <div><dt>Audit subtotal</dt><dd>${dims.length ? renderSubtotal(state, dims) : "Pre-audit"}</dd></div>
      </dl>
      <div style="margin-top:16px"><a class="arrow-link" href="playbook/audit.html">Take or resume audit</a></div>
    </aside>`;

  function renderSubtotal(state, dims) {
    const answered = dims.filter((d) => Number.isInteger(state.answers[d.id]));
    if (!answered.length) return `0 / ${dims.length * 4}`;
    const sum = answered.reduce((s, d) => s + state.answers[d.id], 0);
    return `${sum} / ${answered.length * 4}${answered.length < dims.length ? ` (${answered.length} of ${dims.length} answered)` : ""}`;
  }

  root.innerHTML = `
    <section class="cs-header level-header">
      <div class="container">
        <a class="cs-back" href="playbook/">All Levels</a>
        <div class="cs-eyebrow">Level ${level.number}</div>
        <h1>${escapeHtml(level.name)}</h1>
        <p class="cs-lead">${escapeHtml(level.headline)}</p>
      </div>
    </section>

    <section class="container">
      <div class="cs-body">
        <div class="cs-main">
          <h2>Why this level matters</h2>
          <p>${escapeHtml(level.whyItMatters)}</p>

          <h2>What sits inside this level</h2>
          <ul class="level-inside">${inside}</ul>

          ${goodHtml}

          ${diagnosticHtml}

          <h2>Key outputs</h2>
          <ul class="level-outputs">${outputs}</ul>

          <h2>See this in practice</h2>
          ${cases ? `<div class="case-grid">${cases}</div>` : `<p class="muted">No case studies linked yet.</p>`}

          <div class="level-continue-row">${continueHtml}</div>
        </div>
        ${sideHtml}
      </div>
    </section>
  `;
});
