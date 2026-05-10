/* /playbook/results.html — score, band, layer breakdown, takeaways, reading path */

document.addEventListener("DOMContentLoaded", async () => {
  await PB.ready;

  const root = document.getElementById("results-root");
  const state = PB.loadState();
  const answered = PB.answerCount(state);

  if (answered === 0) {
    root.innerHTML = `
      <section class="page-header"><div class="container">
        <h1>No audit results yet</h1>
        <p>Take the audit to see your score, band, and personalised reading path.</p>
        <div class="btn-row" style="margin-top:24px"><a class="btn btn-primary" href="audit.html">Take the audit</a></div>
      </div></section>`;
    return;
  }
  if (!PB.isComplete(state)) {
    const remaining = 56 - answered;
    root.innerHTML = `
      <section class="page-header"><div class="container">
        <h1>Audit in progress</h1>
        <p>${answered} of 56 answered. ${remaining} to go before we generate results.</p>
        <div class="btn-row" style="margin-top:24px"><a class="btn btn-primary" href="audit.html">Resume audit</a></div>
      </div></section>`;
    return;
  }

  const score = PB.score(state);
  const tk = PB.takeaways(state);
  const path = PB.readingPath(state);

  // Header
  const headerHtml = `
    <section class="results-header">
      <div class="container">
        <div class="results-header-grid">
          <div>
            <div class="cs-eyebrow">Your GTM maturity</div>
            <div class="results-score" data-band="${escapeHtml(score.band.id)}">
              <span class="results-score-num">${score.total}</span>
              <span class="results-score-max">/ 224</span>
            </div>
            <div class="score-band" data-band="${escapeHtml(score.band.id)}">
              <strong>${escapeHtml(score.band.label)}</strong>
              <span>${escapeHtml(score.band.blurb)}</span>
            </div>
          </div>
          <div class="results-layers">
            ${[1,2,3,4,5,6,7].map((n) => {
              const ls = score.layerScore[n];
              const pct = Math.round((ls / 32) * 100);
              return `
                <div class="results-layer">
                  <div class="results-layer-top">
                    <span class="results-layer-name">${n}. ${escapeHtml(PB.layerName(n))}</span>
                    <span class="results-layer-score">${ls} / 32</span>
                  </div>
                  <div class="results-layer-bar"><div style="width:${pct}%"></div></div>
                </div>`;
            }).join("")}
          </div>
        </div>
        <div class="btn-row results-actions">
          <a class="btn btn-primary" href="#reading-path">See your reading path</a>
          <button class="btn btn-secondary" type="button" onclick="window.print()">Download summary</button>
          <a class="btn btn-ghost" href="audit.html?layer=1">Edit answers</a>
        </div>
      </div>
    </section>
  `;

  // Takeaways
  function dimItem(d) {
    return `<li><strong>${escapeHtml(d.id)} ${escapeHtml(d.name)}</strong> <span class="muted">L${state.answers[d.id]}</span><span class="dim-probe">${escapeHtml(d.probe)}</span></li>`;
  }
  const takeawaysHtml = `
    <section class="results-takeaways">
      <div class="container">
        <div class="takeaways-grid">
          <div class="takeaway-card">
            <h3>Top strengths</h3>
            <ol>${tk.top3Strengths.map(dimItem).join("")}</ol>
          </div>
          <div class="takeaway-card">
            <h3>Top gaps</h3>
            <ol>${tk.top3Gaps.map(dimItem).join("")}</ol>
          </div>
          <div class="takeaway-card">
            <h3>Quick wins (30 days)</h3>
            ${tk.quickWins.length ? `<ol>${tk.quickWins.map(dimItem).join("")}</ol>` : `<p class="muted">No quick wins flagged. Move directly to strategic moves.</p>`}
          </div>
          <div class="takeaway-card">
            <h3>Strategic moves (90 days)</h3>
            <p class="muted">From your two weakest layers: ${tk.twoWeakestLayers.map((n) => `${n}. ${escapeHtml(PB.layerName(n))}`).join(", ")}.</p>
            <ol>${tk.strategicMoves.map(dimItem).join("")}</ol>
          </div>
        </div>
      </div>
    </section>
  `;

  // Reading path
  function levelRow(n, badge) {
    const l = PB.levelByNumber(n);
    return `
      <a class="reading-path-row" href="levels/level.html?slug=${encodeURIComponent(l.slug)}">
        <span class="reading-path-num">L${l.number}</span>
        <div>
          <div class="reading-path-name">${escapeHtml(l.name)}</div>
          <div class="reading-path-line">${escapeHtml(l.oneLineDistillation)}</div>
        </div>
        ${badge ? `<span class="reading-path-badge">${escapeHtml(badge)}</span>` : ""}
        <span class="reading-path-arrow">→</span>
      </a>
    `;
  }
  const recommended = path.recommended.map((n) => levelRow(n, path.priority.includes(n) ? "Priority" : null)).join("");
  const linear = path.linear.map((n) => levelRow(n, null)).join("");

  const readingHtml = `
    <section class="results-reading" id="reading-path">
      <div class="container">
        <div class="section-head"><div class="cs-eyebrow">Personalised reading path</div><h2>Where to read first</h2><p>Your two weakest layers (${tk.twoWeakestLayers.map((n) => `${n}. ${escapeHtml(PB.layerName(n))}`).join(", ")}) drive this order. Linear path follows L1 to L10.</p></div>
        <div class="reading-tabs"><button class="reading-tab is-active" data-tab="recommended">Recommended</button><button class="reading-tab" data-tab="linear">Linear</button></div>
        <div class="reading-list" data-tab="recommended">${recommended}</div>
        <div class="reading-list" data-tab="linear" hidden>${linear}</div>
      </div>
    </section>
  `;

  root.innerHTML = headerHtml + takeawaysHtml + readingHtml;

  // Tabs
  root.addEventListener("click", (e) => {
    const tab = e.target.closest(".reading-tab");
    if (!tab) return;
    root.querySelectorAll(".reading-tab").forEach((t) => t.classList.toggle("is-active", t === tab));
    root.querySelectorAll(".reading-list").forEach((l) => (l.hidden = l.dataset.tab !== tab.dataset.tab));
  });
});
