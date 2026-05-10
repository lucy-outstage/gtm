/* /playbook/audit.html — 7-layer flow, 8 dimensions per layer (L1 has 8) */

document.addEventListener("DOMContentLoaded", async () => {
  await PB.ready;

  const params = new URLSearchParams(location.search);
  let layer = parseInt(params.get("layer") || "1", 10);
  if (!(layer >= 1 && layer <= 7)) layer = 1;

  const state = PB.loadState();

  const root = document.getElementById("audit-root");
  const progressEl = document.getElementById("audit-progress");
  const titleEl = document.getElementById("audit-title");
  const subtitleEl = document.getElementById("audit-subtitle");

  const layerName = PB.layerName(layer);
  const dims = PB.byLayer[layer] || [];

  document.title = `Audit · Layer ${layer}: ${layerName} · Outstage`;
  titleEl.textContent = `Layer ${layer}. ${layerName}`;
  subtitleEl.textContent = `Score each dimension on the maturity ladder. ${dims.length} dimensions.`;

  // Progress bar across all 7 layers
  const totalAnswered = PB.answerCount(state);
  progressEl.innerHTML = `
    <div class="audit-progress-bar"><div class="audit-progress-fill" style="width:${(totalAnswered / 56) * 100}%"></div></div>
    <div class="audit-progress-meta"><span>${totalAnswered} of 56 answered</span><span>Layer ${layer} of 7</span></div>
    <div class="audit-layer-pips">${[1,2,3,4,5,6,7].map((n) => {
      const lDims = PB.byLayer[n];
      const lDone = lDims.filter((d) => Number.isInteger(state.answers[d.id])).length;
      const cls = n === layer ? " is-active" : (lDone === lDims.length ? " is-done" : "");
      return `<a class="audit-pip${cls}" href="?layer=${n}" title="${escapeHtml(PB.layerName(n))}">${n}</a>`;
    }).join("")}</div>
  `;

  // Render each dimension card
  root.innerHTML = dims.map((d) => renderDimCard(d, state.answers[d.id], state.quants[d.id] || "")).join("");

  // Wire up score selection
  root.addEventListener("click", (e) => {
    const btn = e.target.closest(".audit-level");
    if (!btn) return;
    const card = btn.closest(".audit-card");
    const id = card.dataset.id;
    const score = parseInt(btn.dataset.score, 10);
    state.answers[id] = score;
    PB.saveState(state);
    card.querySelectorAll(".audit-level").forEach((b) => b.classList.toggle("is-selected", parseInt(b.dataset.score, 10) === score));
    card.classList.add("is-answered");
    refreshProgress();
  });

  // Wire up quant input
  root.addEventListener("input", (e) => {
    const inp = e.target.closest(".audit-quant-input");
    if (!inp) return;
    const id = inp.closest(".audit-card").dataset.id;
    state.quants[id] = inp.value;
    PB.saveState(state);
  });

  function refreshProgress() {
    const answered = PB.answerCount(state);
    progressEl.querySelector(".audit-progress-fill").style.width = `${(answered / 56) * 100}%`;
    progressEl.querySelector(".audit-progress-meta span").textContent = `${answered} of 56 answered`;
    // Update pips
    progressEl.querySelectorAll(".audit-pip").forEach((pip, i) => {
      const n = i + 1;
      const lDims = PB.byLayer[n];
      const lDone = lDims.filter((d) => Number.isInteger(state.answers[d.id])).length;
      pip.classList.toggle("is-done", lDone === lDims.length && n !== layer);
    });
  }

  // Footer nav
  const footer = document.getElementById("audit-footer");
  const allLayerDone = dims.every((d) => Number.isInteger(state.answers[d.id]));
  const isLast = layer === 7;
  const prev = layer > 1 ? `<a class="btn btn-secondary" href="?layer=${layer - 1}">← Layer ${layer - 1}</a>` : `<a class="btn btn-secondary" href="index.html">← Playbook</a>`;
  const next = isLast
    ? `<a class="btn btn-primary" id="audit-finish" href="results.html">See results →</a>`
    : `<a class="btn btn-primary" href="?layer=${layer + 1}">Layer ${layer + 1} →</a>`;
  footer.innerHTML = `${prev}${next}`;

  function renderDimCard(d, currentScore, quantVal) {
    const levelsHtml = d.levels.map((L) => {
      const sel = L.score === currentScore ? " is-selected" : "";
      return `<button class="audit-level${sel}" data-score="${L.score}" type="button">
        <span class="audit-level-num">L${L.score}</span>
        <span class="audit-level-text">${escapeHtml(L.description)}</span>
      </button>`;
    }).join("");
    const quant = d.quantMetric
      ? `<div class="audit-quant"><label>${escapeHtml(d.quantMetric)}<input class="audit-quant-input" type="text" placeholder="Optional" value="${escapeHtml(quantVal)}"></label></div>`
      : "";
    const answeredCls = Number.isInteger(currentScore) ? " is-answered" : "";
    return `
      <article class="audit-card${answeredCls}" data-id="${escapeHtml(d.id)}">
        <header class="audit-card-head">
          <span class="audit-card-id">${escapeHtml(d.id)}</span>
          <h3>${escapeHtml(d.name)}</h3>
          <p class="audit-card-probe">${escapeHtml(d.probe)}</p>
        </header>
        <div class="audit-levels">${levelsHtml}</div>
        ${quant}
      </article>
    `;
  }
});
