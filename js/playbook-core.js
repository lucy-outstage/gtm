/* Playbook core: content loader, audit state, scoring, reading path.
   Shared by all /playbook/* pages. */

const PB = {
  config: null,
  levels: null,
  dimensions: null,
  byId: {},
  byLayer: {}, // 1..7 -> [dimension]
  ready: null,
};

PB.ready = (async function () {
  const base = location.pathname.startsWith("/playbook/levels/") ? "../../content/" : location.pathname.startsWith("/playbook/") ? "../content/" : "content/";
  const [config, levels, dimensions] = await Promise.all([
    fetch(base + "playbook-config.json").then((r) => r.json()),
    fetch(base + "levels.json").then((r) => r.json()),
    fetch(base + "audit-dimensions.json").then((r) => r.json()),
  ]);
  PB.config = config;
  PB.levels = levels;
  PB.dimensions = dimensions;
  PB.byId = Object.fromEntries(dimensions.map((d) => [d.id, d]));
  PB.byLayer = {};
  for (let i = 1; i <= 7; i++) PB.byLayer[i] = [];
  dimensions.forEach((d) => PB.byLayer[d.layer].push(d));
  return PB;
})();

/* ---------- localStorage state ---------- */

PB.loadState = function () {
  try {
    const raw = localStorage.getItem(PB.config?.storageKey || "outstage-playbook-v1");
    if (!raw) return PB.emptyState();
    const s = JSON.parse(raw);
    if (s.version !== (PB.config?.version || 1)) return PB.emptyState();
    return s;
  } catch (e) {
    return PB.emptyState();
  }
};

PB.emptyState = function () {
  return {
    version: PB.config?.version || 1,
    startedAt: null,
    updatedAt: null,
    answers: {},
    quants: {},
    completedAt: null,
  };
};

PB.saveState = function (s) {
  s.updatedAt = new Date().toISOString();
  if (!s.startedAt) s.startedAt = s.updatedAt;
  localStorage.setItem(PB.config.storageKey, JSON.stringify(s));
};

PB.clearState = function () {
  localStorage.removeItem(PB.config.storageKey);
};

PB.isComplete = function (state) {
  if (!state || !state.answers) return false;
  return PB.dimensions.every((d) => Number.isInteger(state.answers[d.id]));
};

PB.answerCount = function (state) {
  if (!state || !state.answers) return 0;
  return PB.dimensions.filter((d) => Number.isInteger(state.answers[d.id])).length;
};

/* ---------- scoring ---------- */

PB.score = function (state) {
  const answers = (state && state.answers) || {};
  const layerScore = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  const layerAnswered = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
  PB.dimensions.forEach((d) => {
    const v = answers[d.id];
    if (Number.isInteger(v)) {
      layerScore[d.layer] += v;
      layerAnswered[d.layer] += 1;
    }
  });
  const total = Object.values(layerScore).reduce((a, b) => a + b, 0);
  const band = (PB.config.bands || []).find((b) => total >= b.min && total <= b.max) || PB.config.bands[0];
  return {
    total,
    max: 224,
    layerScore,
    layerAnswered,
    layerMax: 32,
    band,
    pct: Math.round((total / 224) * 100),
  };
};

/* ---------- headline takeaways ---------- */

PB.takeaways = function (state) {
  const answers = (state && state.answers) || {};
  const answered = PB.dimensions.filter((d) => Number.isInteger(answers[d.id]));
  const sortedAsc = [...answered].sort((a, b) => answers[a.id] - answers[b.id] || a.id.localeCompare(b.id));
  const sortedDesc = [...answered].sort((a, b) => answers[b.id] - answers[a.id] || a.id.localeCompare(b.id));

  const top3Strengths = sortedDesc.slice(0, 3);
  const top3Gaps = sortedAsc.slice(0, 3);

  const allowList = PB.config.quickWinAllowList || [];
  const quickWins = sortedAsc.filter((d) => allowList.includes(d.id)).slice(0, 3);

  const layerScores = PB.score(state).layerScore;
  const twoWeakestLayers = Object.entries(layerScores)
    .map(([k, v]) => ({ layer: +k, score: v }))
    .sort((a, b) => a.score - b.score || a.layer - b.layer)
    .slice(0, 2)
    .map((x) => x.layer);
  const strategicMoves = sortedAsc.filter((d) => twoWeakestLayers.includes(d.layer)).slice(0, 3);

  return { top3Strengths, top3Gaps, quickWins, strategicMoves, twoWeakestLayers };
};

/* ---------- reading path ---------- */

PB.readingPath = function (state) {
  const layerScores = PB.score(state).layerScore;
  const twoWeakest = Object.entries(layerScores)
    .map(([k, v]) => ({ layer: +k, score: v }))
    .sort((a, b) => a.score - b.score || a.layer - b.layer)
    .slice(0, 2)
    .map((x) => x.layer);

  const map = PB.config.layerToLevels || {};
  const priority = [];
  twoWeakest.forEach((L) => (map[String(L)] || []).forEach((n) => { if (!priority.includes(n)) priority.push(n); }));

  const all = PB.levels.map((l) => l.number);
  const recommended = priority.concat(all.filter((n) => !priority.includes(n)));

  return {
    recommended,
    linear: all.slice(),
    priority,
    twoWeakest,
  };
};

/* ---------- helpers ---------- */

PB.layerName = function (n) {
  const sample = PB.byLayer[n] && PB.byLayer[n][0];
  return sample ? sample.layerName : `Layer ${n}`;
};

PB.levelByNumber = function (n) {
  return PB.levels.find((l) => l.number === n);
};

PB.levelBySlug = function (slug) {
  return PB.levels.find((l) => l.slug === slug);
};

if (typeof window !== "undefined") window.PB = PB;
