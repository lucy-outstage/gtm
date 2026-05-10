/* /playbook/index.html — intro + Levels at a glance */

document.addEventListener("DOMContentLoaded", async () => {
  await PB.ready;

  const grid = document.getElementById("levels-grid");
  if (grid) {
    grid.innerHTML = PB.levels
      .map(
        (l) => `
      <a class="level-card" href="levels/level.html?slug=${encodeURIComponent(l.slug)}">
        <div class="level-card-num">L${l.number}</div>
        <div class="level-card-name">${escapeHtml(l.name)}</div>
        <div class="level-card-line">${escapeHtml(l.oneLineDistillation)}</div>
        <span class="level-card-link">Open level</span>
      </a>`
      )
      .join("");
  }

  // Resume state
  const state = PB.loadState();
  const answered = PB.answerCount(state);
  const resumeEl = document.getElementById("resume-state");
  if (resumeEl) {
    if (PB.isComplete(state)) {
      resumeEl.innerHTML = `<a class="btn btn-secondary" href="results.html">View your results</a>`;
    } else if (answered > 0) {
      resumeEl.innerHTML = `<a class="btn btn-secondary" href="audit.html">Resume audit (${answered}/56)</a>`;
    }
  }
});
