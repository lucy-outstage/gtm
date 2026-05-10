/* Portfolio listing page: search + industry + work type filters */

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("portfolio-grid");
  const meta = document.getElementById("portfolio-meta");
  const industrySel = document.getElementById("filter-industry");
  const workSel = document.getElementById("filter-work");
  const search = document.getElementById("filter-search");
  if (!grid) return;

  // Populate filter selects
  function fillSelect(el, items) {
    el.innerHTML =
      `<option value="">All</option>` +
      items.map((i) => `<option value="${escapeHtml(i)}">${escapeHtml(i)}</option>`).join("");
  }
  fillSelect(industrySel, INDUSTRIES);
  fillSelect(workSel, WORK_TYPES);

  // Read URL param ?industry=Fintech etc.
  const params = new URLSearchParams(location.search);
  if (params.get("industry")) industrySel.value = params.get("industry");
  if (params.get("work")) workSel.value = params.get("work");
  if (params.get("q")) search.value = params.get("q");

  function render() {
    const ind = industrySel.value;
    const work = workSel.value;
    const q = (search.value || "").trim().toLowerCase();
    const filtered = CASES.filter((c) => {
      if (ind && !c.industries.includes(ind)) return false;
      if (work && !c.workTypes.includes(work)) return false;
      if (q) {
        const hay = [c.name, c.category, c.challenge, c.engagement, c.location, ...(c.industries || []), ...(c.workTypes || [])]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    // Featured first, then alpha
    filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || a.name.localeCompare(b.name));
    grid.innerHTML = filtered.length
      ? filtered.map((c, i) => caseCard(c, { featured: c.featured && i === 0 })).join("")
      : `<div class="no-results">No case studies match those filters.</div>`;
    meta.textContent = `${filtered.length} of ${CASES.length} case studies`;
  }

  industrySel.addEventListener("change", render);
  workSel.addEventListener("change", render);
  search.addEventListener("input", render);
  render();
});
