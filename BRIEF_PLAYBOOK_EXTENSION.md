# OUTSTAGE — GTM PLAYBOOK EXTENSION BRIEF

A build brief for extending the existing Outstage portfolio site (https://outstage.vercel.app) with an interactive GTM Playbook microsite — the 10 GTM Levels framework plus an embedded 56-dimension diagnostic audit.

---

## 1. Context

The Outstage portfolio site is built and live. Next.js, React, Tailwind, TypeScript, Framer Motion (minimal), MDX/JSON content layer. Three top-level routes today: Work, Approach, About. The site reads as a Stripe-grade case-study-led portfolio with editorial restraint.

This brief adds a fourth top-level surface: **GTM Playbook** — an interactive learning experience teaching the Outstage 10 GTM Levels operating system, with an embedded audit that scores the reader across 7 layers and routes them to the levels most relevant to their current state.

**This is an extension, not a redesign.** Reuse the existing design system, components, typography, colour, motion, and content patterns. Add new routes, new components, and new content. Do not modify existing pages except the navigation and footer to add Playbook entry points.

## 2. Strategic role — how the Playbook relates to Work and Approach

The site already has two surfaces that explain Outstage:

- **Work** — what we did for clients (proof)
- **Approach** — the five-stage methodology, *Diagnose · Position · Activate · Amplify · Operationalise* (executive summary of method)

The Playbook becomes the third:

- **GTM Playbook** — the underlying operating system in full, taught as a learning experience, with a diagnostic that scores the reader (operating manual)

**The relationship to internalise and surface in the writing:**

The five-stage methodology on /approach is the *executive summary*. The 10 GTM Levels in the Playbook are the *operating manual*. They are not two competing frameworks. They are the same system at two zoom levels. The Approach page tells a prospect what Outstage does. The Playbook teaches them how the underlying system works.

This relationship must be made explicit:

- The Approach page gets a single new section at the bottom: a link to the Playbook framed as "Go deeper into the operating system, take the 10 Levels diagnostic."
- The Playbook intro page opens with a short bridge paragraph naming the five-stage methodology and explaining that the 10 Levels are the operational depth underneath it.

## 3. Top nav and footer changes

**Nav:** Add *GTM Playbook* as a single new nav item. Final order: **Work · GTM Playbook · Approach · About**.

**Footer:** Add a new column titled *Playbook* with three links: *Take the audit · The 10 Levels · Download summary*. Mirror the existing footer column style.

No other changes to nav or footer.

## 4. Source material

Two source files. Both are in /source/ in the repo. Read both completely before writing anything.

**File 1: `10_GTM_Levels_Framework.txt`**
The strategic narrative spine. Each Level has Core Focus, "What sits inside this level," Strategic Areas, Key Outputs, and explicit cross-references to audit layers. This is the *map*.

**File 2: `Frontal_Audit_v2.xlsx`**
The diagnostic instrument. 7 layers, 56 dimensions, each with a probe question, 5 maturity descriptions (Level 0–4), and quant metrics where applicable. **Every reference to "Frontal" in this file is the old brand name and must be replaced with "Outstage."** This is the *terrain*.

**Layer-to-Level mapping, non-negotiable, drives the reading-path logic:**

| Level | Audit layers feeding it |
|---|---|
| L1 Revenue Architecture | Pre-audit thinking, no direct layer |
| L2 Market Understanding | Brand B1, B2, B8 |
| L3 Ecosystem Mapping | Data D1–D8 (full layer) |
| L4 Signals & Intel | Signal S1–S8 (full layer) |
| L5 Demand Creation | Brand B4, B6 + Sales SP2, SP3, SP8 |
| L6 Distribution & Activation | Brand B5 + Outbound O2–O5, O7 |
| L7 Paid Acquisition | Ads A1–A8 (full layer) |
| L8 Revenue Orchestration | RevOps R1–R8 + Sales SP1–SP8 |
| L9 Ecosystem Expansion | RevOps R7 |
| L10 Operating System | RevOps R5, R6, R8 + Outbound O8 + Sales SP5, SP7 |

The reader's audit results drive their reading path. Lowest-scoring layers route to the levels that fix them.

## 5. New routes

```
/playbook                    → Intro + entry point (audit start, Levels index)
/playbook/audit              → 56-question diagnostic, 7 layer pages
/playbook/results            → Score, band, personalised reading path (post-audit only)
/playbook/levels/[1..10]     → Ten Level pages, dynamic route
```

## 6. New components

Build these alongside existing components in the current library. Each named below as `NewComponent → extends ExistingPattern` where applicable.

- `PlaybookIntro`, landing page, new pattern
- `AuditDimensionCard` → extends the existing problem card pattern, adds 5 selectable maturity-level states (0–4) and optional quant input
- `AuditProgressBar`, new, simple
- `LayerSection`, wraps 8 dimension cards with a layer header, new
- `ScoreBand`, number + band label + restrained colour token, new
- `ResultsHeader`, total score, band, headline takeaways auto-generated from lowest-scoring dimensions, new
- `ReadingPathList`, re-ordered list of Levels based on results, new
- `LevelPageTemplate` → extends the existing case study page template; adds a *Diagnostic view* section that surfaces the reader's own scores for the dimensions feeding that level
- `RelatedCaseStudies` → extends the existing related-case-study pattern; surfaces case studies inside Level pages using the existing taxonomy (see §7)
- `GlossaryTerm`, inline hover/tap definition for terms like TAM, ABM, MEDDIC, CPQ, GEO

State persists in `localStorage`. No backend, no auth, for v1.

## 7. Cross-linking case studies into Level pages

The site's case study taxonomy is already structured into five categories: *Infrastructure & Payments GTM · Enterprise & AI Enablement · LinkedIn & Employee Advocacy · Event-Led GTM Activations · Startup GTM Foundations*.

Map case study categories to Levels so each Level page surfaces 2–4 relevant case studies as live proof, using the existing related-case-study component pattern. Suggested mapping below. Claude Code should propose final mapping in the build plan and await sign-off.

| Level | Case study category to surface |
|---|---|
| L1 Revenue Architecture | Startup GTM Foundations |
| L2 Market Understanding | Startup GTM Foundations + Infrastructure & Payments GTM |
| L3 Ecosystem Mapping | Infrastructure & Payments GTM |
| L4 Signals & Intel | Enterprise & AI Enablement |
| L5 Demand Creation | LinkedIn & Employee Advocacy |
| L6 Distribution & Activation | LinkedIn & Employee Advocacy |
| L7 Paid Acquisition | LinkedIn & Employee Advocacy (Kiin specifically) |
| L8 Revenue Orchestration | Enterprise & AI Enablement |
| L9 Ecosystem Expansion | Infrastructure & Payments GTM |
| L10 Operating System | Enterprise & AI Enablement |

Each Level page ends with: "**See this in practice**" → 2–4 case study cards from the relevant category.

## 8. Page structures

**`/playbook` (intro)**
1. Hero: "An operating system for B2B GTM." Single-line subhead bridging the five-stage methodology to the 10 Levels.
2. How this works: 3 short blocks, *Take the audit · Get your reading path · Work through the Levels*
3. The 10 Levels at a glance: index grid, each card showing Level number, name, one-line distillation
4. CTA: *Take the audit (20 min)*

**`/playbook/audit`**
- Single flow across 7 layer pages, 8 dimensions each (Brand has 8)
- Each dimension: probe question, 5 maturity-level cards (0–4), optional quant input
- Progress bar across all 7 layers
- Save & resume via localStorage
- Final submit → /playbook/results

**`/playbook/results`** (post-audit only)
1. Total score, maturity band, layer-by-layer breakdown
2. Headline takeaways: top 3 strengths, top 3 gaps, auto-generated from highest and lowest dimensions
3. Personalised reading path: Levels re-ordered by lowest-scoring layers
4. Download summary CTA (PDF of results)

**`/playbook/levels/[n]`**, each follows the same structure:
1. Headline + one-line distillation (e.g. L1: "Understanding how the business makes money")
2. **Why this level matters**, 3–4 sentences, editorial prose
3. **What sits inside this level**, operational checklist, drawn from framework's "What sits inside" section, expandable items
4. **What good looks like**, drawn from Level 4 ("Compounding") descriptions of the audit dimensions feeding this Level
5. **Your diagnostic view**, live: shows the reader's own scores for the audit dimensions feeding this level (only after audit taken)
6. **Key outputs**, artefacts list from the framework
7. **See this in practice**, 2–4 case studies from the mapped category (§7)
8. *Continue to Level X →*

## 9. Audit logic

**Scoring:**
- Each dimension scored 0–4. Layer total = sum of dimension scores. Layer max = 32.
- Total score = sum of all 7 layers. Total max = 224.
- Maturity bands (from source): 0–56 Foundation · 57–112 Building · 113–168 Scaling · 169–224 Compounding.

**Headline takeaways auto-generation:**
- Top 3 strengths = three highest-scoring dimensions (across all layers)
- Top 3 gaps = three lowest-scoring dimensions
- Quick wins (30 days) = lowest-scoring dimensions where Level 1 → Level 2 jump is operationally light (Claude Code to flag candidates, present logic for sign-off)
- Strategic moves (90 days) = lowest-scoring dimensions in the two weakest layers

**Reading path:**
- Default reading order is L1 → L10
- Personalised path: identify the two lowest-scoring layers → bump the Levels tied to those layers to the top of the reading path → remaining Levels follow in framework order
- Show both options: *Recommended path* (personalised) and *Linear path* (L1 → L10)

## 10. Content schema

Two JSON files, kept simple and editable by a non-technical editor.

**`content/levels.json`**, array of 10 Level objects:
```
{
  number: 1-10,
  slug: "revenue-architecture",
  name: "Revenue Architecture",
  oneLineDistillation: "...",
  whyItMatters: "...",      // editorial prose, 3-4 sentences
  whatSitsInside: [...],     // array of items, each with title + optional detail
  keyOutputs: [...],
  feedingAuditDimensions: ["B1", "B2", "B8"],  // for diagnostic view
  caseStudyCategory: "infrastructure-payments-gtm",
  caseStudySlugs: ["conferma", "visa-commercial-pay"]
}
```

**`content/audit-dimensions.json`**, array of 56 dimension objects:
```
{
  id: "B1",
  layer: 1,
  layerName: "Brand & Positioning",
  number: 1,
  name: "ICP Definition Clarity",
  probe: "How clearly defined is the Ideal Customer Profile?",
  levels: [
    { score: 0, description: "..." },
    { score: 1, description: "..." },
    { score: 2, description: "..." },
    { score: 3, description: "..." },
    { score: 4, description: "..." }
  ],
  quantMetric: "..." | null,
  quantBenchmark: "..." | null
}
```

All Level prose and all audit dimension text comes directly from the source files. Where source content is thin (notably L1 *Why It Matters*, there's no audit layer feeding it), write less, not more. Do not invent content.

## 11. Voice and editorial rules, strict

The Playbook must read like Lucy Koleva wrote it.

**Banned constructions:**
- Em dashes (use commas, semicolons, or full stops)
- Negative parallelisms ("not just X, but Y")
- Copulative avoidance ("isn't merely a tool, it's a system")
- Banned vocabulary: "actually," "authentic," "show up," "candid," "delve," "navigate the landscape," "ever-evolving," "in today's fast-paced world"

**Required tone:**
- Sharp, direct, no filler
- Specificity over abstraction
- Warm but not stiff
- Short sentences load-bearing; longer sentences earn their length

**Register note, important:**

The existing Work and Approach pages lean composed and credentialled. The Playbook leans direct and instructive. Same voice family, different register. Both follow the rules above. Do not flatten the Playbook into marketing-page voice.

**Source-fidelity rule:**

Every claim about what each Level contains, what audit dimensions test, what maturity levels look like, comes from the source files. Do not invent frameworks, dimensions, or examples. If source content is thin, write less.

## 12. What to reuse, what to leave alone

**Reuse (do not duplicate):**
- All typography tokens, font families, weights, line-heights
- All colour tokens
- All spacing scale
- Existing button, link, and CTA styles
- Existing card patterns (extend, don't fork)
- Existing motion conventions (Framer Motion, minimal)
- Existing footer column style and homepage logo strip
- Existing case study card and related-case-study components

**Leave alone (do not modify):**
- All existing pages except `/approach` (single new section at bottom linking to Playbook) and the global nav and footer
- Any existing component's API or styling, extend via composition, don't rewrite

**New additions allowed:**
- New routes under `/playbook/*`
- New components in the existing component library directory
- New JSON content files in the existing content directory
- New colour tokens *only* for maturity bands (Foundation / Building / Scaling / Compounding), restrained, not traffic-light

## 13. Build sequence

Do not start coding yet.

**Step 1, Confirm comprehension.** Summarise back: what's being added, how it relates to existing surfaces, the role of the framework vs the audit, the reading-path logic. Ask any clarifying questions.

**Step 2, Propose the build plan.** Document covering:
- File/folder additions to the existing repo
- Component inventory with which existing components each extends
- Final case-study-to-Level mapping for sign-off
- Audit scoring and reading-path algorithm in pseudocode
- Open questions

**Step 3, Wait for sign-off** before any code.

**Step 4, Build in passes:**
1. Scaffold (routes, layout shells, content JSON files populated from source)
2. Audit interface (dimension cards, layer flow, progress, localStorage)
3. Results view (scoring, banding, reading path)
4. Level page template (one Level fully built, reviewed, then replicated)
5. Cross-link case studies into Level pages
6. Polish, accessibility pass, PDF export, deploy

After each pass, stop, summarise what was built, and wait for review.

## 14. Acceptance criteria

The extension is done when:

- A reader can take the full 56-dimension audit, get a score, a band, and a personalised reading path
- All 10 Level pages are populated from source files with editorial prose that follows the voice rules
- The diagnostic view on each Level page surfaces the reader's own scores for the relevant audit dimensions
- Each Level page surfaces 2–4 relevant case studies via the existing related-case-study component
- Nav and footer include Playbook entry points
- The Approach page links forward to the Playbook
- A non-technical editor can update Level content or audit text by editing JSON files
- Existing pages are visually and functionally unchanged
- The whole thing reads like Outstage, not like a framework dump
