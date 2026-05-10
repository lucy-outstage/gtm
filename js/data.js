/* ============================================================
   Outstage — single source of truth for portfolio data.
   Add a new entry to CASES[] to publish a new case study.
   ============================================================ */

const SITE = {
  name: "Outstage",
  tagline: "GTM systems for complex B2B companies.",
  description:
    "Outstage helps fintech, SaaS, telecom, AI, and infrastructure companies turn complex products, people, and ecosystems into visible, trusted, pipeline-generating GTM systems.",
  email: "hello@outstage.com",
  bookCall: "#contact",
};

const PROOF_LOGOS = [
  "Visa", "Mastercard", "Conferma", "Bitpanda", "Vonage", "Ericsson",
  "HotelHub", "Metaco", "Ripple", "vaibe", "Körber", "Kiin",
  "Web Summit", "MWC", "Vercel", "Atlassian", "Oracle", "Mailchimp",
];

const PROBLEMS = [
  "Strong product, unclear story",
  "Founder-led growth is not scaling",
  "Team invisible on LinkedIn",
  "Outbound feels random",
  "Technical product hard to explain",
  "Events do not compound",
  "Sales and marketing disconnected",
  "AI usage is chaotic",
  "Partnerships are not activating",
  "Fast growth created messy GTM",
];

const METHODOLOGY = [
  { name: "Diagnose", desc: "Audit GTM, positioning, ecosystem, and visibility gaps end-to-end." },
  { name: "Position", desc: "Sharpen narrative, segmentation, and messaging for technical and commercial buyers." },
  { name: "Activate", desc: "Stand up outbound, partner, and event motions that compound." },
  { name: "Amplify", desc: "Turn founders, sellers, and operators into a visible LinkedIn-led system." },
  { name: "Operationalise", desc: "Embed AI workflows, sales enablement, and a repeatable GTM cadence." },
];

const HOME_GROUPS = [
  {
    id: "infra-payments",
    name: "Infrastructure & Payments GTM",
    blurb: "Commercialising invisible payment, banking, and digital-asset infrastructure across global ecosystems.",
    slugs: ["conferma", "visa-commercial-pay", "bitpanda", "metaco"],
  },
  {
    id: "enterprise-ai",
    name: "Enterprise & AI Enablement",
    blurb: "Helping enterprise sales orgs simplify complex products and embed AI into outbound and research workflows.",
    slugs: ["vonage-ericsson", "mailchimp", "outrun"],
  },
  {
    id: "linkedin-advocacy",
    name: "LinkedIn & Employee Advocacy",
    blurb: "Turning teams into visible operators with positioning, posting systems, and thought leadership coaching.",
    slugs: ["vaibe", "kiin"],
  },
  {
    id: "event-led",
    name: "Event-Led GTM Activations",
    blurb: "Compounding conference activity into long-tail visibility, pipeline, and reusable GTM assets.",
    slugs: ["web-summit", "mwc-barcelona"],
  },
  {
    id: "startup-foundations",
    name: "Startup GTM Foundations",
    blurb: "Building first repeatable GTM, outbound, and retention systems for early-stage and scaling teams.",
    slugs: ["credissimo", "kintec-just-accounts", "hotelhub", "iwoca", "grapevine"],
  },
];

const INDUSTRIES = [
  "Fintech", "Payments", "Telecom", "AI", "SaaS",
  "Travel Tech", "Digital Assets", "Workforce Software",
];

const WORK_TYPES = [
  "GTM Foundations", "Ecosystem GTM", "Employee Advocacy",
  "Event-Led GTM", "AI Enablement", "Outbound Systems", "Thought Leadership",
];

/* ------------------------------------------------------------
   Case studies
   ------------------------------------------------------------ */

const CASES = [
  {
    slug: "credissimo",
    name: "Credissimo",
    category: "Consumer Lending Fintech",
    industries: ["Fintech"],
    workTypes: ["GTM Foundations", "Outbound Systems"],
    location: "Sofia, Bulgaria",
    engagement: "Early-stage GTM support",
    featured: false,
    snapshot: [
      "Founded 2007",
      "Seed-stage at time",
      "~5 employees at time",
      "One of Bulgaria's earliest online-first consumer lending platforms",
    ],
    audience: [
      "Underbanked consumers",
      "Digitally native borrowers",
      "Consumers rejected by traditional banks",
    ],
    context:
      "Bulgaria's lending market in the late 2000s was branch-heavy and trust came from physical presence. Credissimo set out to prove that a digitally native borrower experience could replace a paper-and-branch model.",
    challenge:
      "Prove that consumers would trust and adopt online-first lending in a branch-heavy financial market.",
    methodology: [
      "Landing pages and conversion-led funnels",
      "Paid acquisition across multiple channels",
      "SEO foundations and digital-first positioning",
      "Conversion messaging tuned for first-time online borrowers",
    ],
    results: [
      { value: "100K+", label: "Loan applications scaled toward" },
      { value: "~60%", label: "YoY growth supported" },
      { value: "Foundational", label: "Marketing frameworks adopted by the growing team" },
    ],
    related: ["kintec-just-accounts", "iwoca", "hotelhub"],
  },
  {
    slug: "kintec-just-accounts",
    name: "Kintec / Just Accounts",
    category: "Cloud Accounting & Payroll SaaS",
    industries: ["Fintech", "SaaS"],
    workTypes: ["GTM Foundations", "Outbound Systems"],
    location: "Manchester / North of England, UK",
    engagement: "Hands-on GTM build",
    featured: false,
    snapshot: [
      "~10 employees at time",
      "Revenue scaled ~£300K → £1M+ ARR",
      "Founded by former Sage employees",
    ],
    audience: [
      "Umbrella companies",
      "Payroll operators",
      "Contractor accountants",
      "SME finance teams",
    ],
    context:
      "Founded by ex-Sage operators, Kintec / Just Accounts had a technically strong payroll and accounting product but lacked the GTM foundations to translate it into a trusted B2B brand for finance teams.",
    challenge:
      "Translate a technical payroll/accounting product into a trusted B2B solution and build the first GTM foundations.",
    methodology: [
      "Messaging architecture for payroll and accounting buyers",
      "HubSpot CRM rollout and sales enablement",
      "Website rebuild with conversion-led structure",
      "Customer focus groups and retention feedback loops",
      "Industry events and trade activation",
    ],
    results: [
      { value: "£300K → £1M+", label: "ARR growth supported" },
      { value: "1st", label: "Repeatable GTM and marketing systems" },
      { value: "Sales + retention", label: "Frameworks introduced" },
    ],
    related: ["credissimo", "iwoca", "hotelhub"],
  },
  {
    slug: "conferma",
    name: "Conferma",
    category: "Virtual Payments Infrastructure",
    industries: ["Fintech", "Payments"],
    workTypes: ["Ecosystem GTM", "GTM Foundations", "Thought Leadership"],
    location: "Manchester, UK",
    engagement: "Enterprise ecosystem GTM",
    featured: true,
    snapshot: [
      "Team grew ~40 → 250+ employees",
      "Acquired by Mastercard",
      "Issuer ecosystem ~30 → 60 banking partners",
      "TMC relationships ~100 → 400",
    ],
    audience: [
      "Global banks",
      "Card issuers",
      "Payment schemes",
      "TMCs",
      "CFOs and enterprise finance teams",
      "Corporate travel leaders",
    ],
    context:
      "Conferma sits at the centre of a B2B2B ecosystem connecting banks, card schemes, TMCs and enterprise buyers. The product itself is invisible infrastructure — virtual payments rails — and that invisibility is the GTM problem.",
    challenge:
      "Commercialise invisible virtual payment infrastructure inside a fragmented B2B2B ecosystem.",
    methodology: [
      "Issuer and partner launches with co-branded GTM",
      "White-label activation and banking enablement",
      "Sales enablement across schemes, banks, and TMCs",
      "PR, events, and category thought leadership",
      "Repeatable launch playbooks for issuer rollouts",
    ],
    results: [
      { value: "30 → 60", label: "Issuer banking partners" },
      { value: "100 → 400", label: "TMC relationships" },
      { value: "~$3M", label: "GTM activation tied to Visa launches" },
      { value: "Mastercard", label: "Acquired before transition" },
    ],
    related: ["visa-commercial-pay", "bitpanda", "hotelhub"],
  },
  {
    slug: "visa-commercial-pay",
    name: "Visa Commercial Pay",
    category: "Enterprise Payments GTM",
    industries: ["Fintech", "Payments"],
    workTypes: ["Ecosystem GTM", "GTM Foundations"],
    location: "Global — embedded via Conferma",
    engagement: "Embedded GTM leadership via Conferma",
    featured: true,
    snapshot: [
      "Visa Commercial Pay portfolio powered by Conferma technology",
      "Virtual commercial payments for issuer banks and enterprise customers",
      "Global rollout across issuing banks",
    ],
    audience: [
      "Issuer banks",
      "Commercial banking teams",
      "CFO organisations",
      "Enterprise finance teams",
      "Corporate travel programmes",
    ],
    context:
      "Visa Commercial Pay is the brand under which Conferma's virtual commercial payments capabilities are delivered to issuing banks and their enterprise customers. The GTM challenge is shaping a co-branded story that issuer banks can pick up and run.",
    challenge:
      "Help Visa position and commercialise Conferma's virtual payments portfolio to issuing banks under the Visa Commercial Pay brand.",
    methodology: [
      "Positioning, messaging, targeting, segmentation",
      "Issuer enablement assets and outreach strategy",
      "Sales training across Visa commercial teams",
      "Marketing support for issuer go-live programmes",
    ],
    results: [
      { value: "Global", label: "Rollout to issuing banks supported" },
      { value: "Full stack", label: "Positioning, messaging, sales enablement" },
      { value: "~$3M", label: "GTM activation programme contribution" },
    ],
    related: ["conferma", "bitpanda", "metaco"],
  },
  {
    slug: "bitpanda",
    name: "Bitpanda Technology Solutions",
    category: "Digital Assets Infrastructure",
    industries: ["Fintech", "Payments", "Digital Assets"],
    workTypes: ["GTM Foundations", "Ecosystem GTM", "Employee Advocacy", "Thought Leadership"],
    location: "Vienna, Austria",
    engagement: "Strategic GTM support",
    featured: true,
    snapshot: [
      "Team cycle ~700 → 1,400 → 700 during restructuring",
      "Multi-billion euro fintech scale",
      "White-label infrastructure for banks and fintechs",
    ],
    audience: [
      "Banks",
      "Neobanks",
      "Fintechs",
      "Wealth platforms",
      "Innovation leaders",
      "Regulated financial institutions",
    ],
    context:
      "Bitpanda Technology Solutions (BTS) is the B2B arm of Bitpanda, providing white-label digital asset infrastructure. The category was dominated by speculative crypto narratives that didn't fit how regulated banks needed to buy.",
    challenge:
      "Move beyond speculative crypto narratives and reposition BTS as regulated digital assets infrastructure.",
    methodology: [
      "White-label banking enablement and partner activation",
      "Executive positioning on LinkedIn",
      "Fintech ecosystem storytelling",
      "Multi-asset infrastructure narrative beyond crypto",
    ],
    results: [
      { value: "Repositioned", label: "Towards regulated digital assets infrastructure" },
      { value: "N26 · Lydia · Plum", label: "Partner enablement supported" },
      { value: "Multi-asset", label: "GTM narrative expanded beyond crypto" },
    ],
    related: ["metaco", "conferma", "outrun"],
  },
  {
    slug: "vonage-ericsson",
    name: "Vonage / Ericsson",
    category: "Telecom Infrastructure & AI Enablement",
    industries: ["Telecom", "AI"],
    workTypes: ["AI Enablement", "Outbound Systems", "Employee Advocacy", "Event-Led GTM"],
    location: "Global — enterprise sales org",
    engagement: "Fractional GTM and enablement advisory",
    featured: true,
    snapshot: [
      "Vonage acquired by Ericsson for ~$6.2B",
      "300+ seller organisation supported",
      "Spans CPaaS, Network APIs, verification, AI",
    ],
    audience: [
      "Enterprise IT leaders",
      "CX leaders",
      "Telecom operators",
      "Security teams",
      "Product leaders",
      "Customer engagement teams",
    ],
    context:
      "Post-Ericsson acquisition, Vonage's enterprise sellers had to carry an unusually wide solution set — communications APIs, network APIs, verification, AI — into already-busy enterprise accounts. Sellers needed clarity, not more product training.",
    challenge:
      "Simplify a broad technical solution set across CPaaS, Network APIs, verification and AI for a large enterprise sales organisation.",
    methodology: [
      "Enterprise outbound and segmentation frameworks",
      "LinkedIn-led GTM and seller positioning",
      "AI-assisted sales enablement and Glean workflows",
      "Workshops and seller activation programmes",
      "SKO Barcelona event activation with photography and positioning",
    ],
    results: [
      { value: "300+", label: "Sellers supported with enablement" },
      { value: "AI-assisted", label: "Outbound and research workflows introduced" },
      { value: "LinkedIn", label: "Visibility systems activated for enterprise sellers" },
      { value: "SKO Barcelona", label: "Event activation delivered" },
    ],
    related: ["mailchimp", "vaibe", "mwc-barcelona"],
  },
  {
    slug: "hotelhub",
    name: "HotelHub",
    category: "Corporate Travel Tech",
    industries: ["SaaS", "Travel Tech"],
    workTypes: ["GTM Foundations", "Outbound Systems", "Ecosystem GTM", "Thought Leadership"],
    location: "London, UK",
    engagement: "Fractional GTM and PR advisory",
    featured: false,
    snapshot: [
      "Corporate hotel distribution infrastructure",
      "Acquired by S4BT",
      "Operating across a fragmented TMC ecosystem",
    ],
    audience: [
      "TMCs",
      "Corporate travel leaders",
      "OBT providers",
      "Hotel distribution teams",
      "Procurement teams",
    ],
    context:
      "HotelHub is infrastructure for corporate hotel distribution, sitting between TMCs, online booking tools and hotel content sources. The market is fragmented and visibility against larger incumbents was limited.",
    challenge:
      "Strengthen market visibility and positioning inside a fragmented hotel distribution ecosystem.",
    methodology: [
      "Outbound strategy and TMC ecosystem mapping",
      "PR distribution across business travel and trade media",
      "Industry positioning and category education",
      "Content strategy and sales enablement",
    ],
    results: [
      { value: "12+", label: "Strategic meetings per month" },
      { value: "50+", label: "Business travel and trade media placements" },
      { value: "S4BT", label: "Acquisition period positioning supported" },
    ],
    related: ["grapevine", "conferma", "kintec-just-accounts"],
  },
  {
    slug: "vaibe",
    name: "vaibe",
    category: "Workforce Engagement SaaS",
    industries: ["SaaS", "Workforce Software"],
    workTypes: ["Employee Advocacy", "Outbound Systems", "GTM Foundations"],
    location: "Körber ecosystem / venture",
    engagement: "Fractional growth leadership + employee advocacy",
    featured: false,
    snapshot: [
      "Workforce engagement SaaS",
      "Venture inside the Körber ecosystem",
      "5-person outbound and growth team",
    ],
    audience: [
      "Warehouse operators",
      "Logistics providers",
      "Supply chain software companies",
      "Operations leaders",
      "HR leaders",
    ],
    context:
      "vaibe is a workforce engagement product targeting operational buyers in logistics, warehousing and supply chain. The team had strong product but needed to translate engagement into commercial relevance — and become visible operators on LinkedIn.",
    challenge:
      "Make workforce engagement commercially relevant to operational buyers and activate the team as visible LinkedIn operators.",
    methodology: [
      "SDR enablement and outbound frameworks",
      "Segmentation across warehousing, logistics and supply chain",
      "Employee advocacy and LinkedIn positioning",
      "Professional photography and content systems",
      "Thought leadership coaching for operators",
    ],
    results: [
      { value: "5-person", label: "Outbound and growth team led" },
      { value: "~11", label: "Meetings per rep per month" },
      { value: "0 → consistent", label: "LinkedIn posting cadence built" },
      { value: "4/week", label: "Posting cadence target established" },
    ],
    related: ["kiin", "vonage-ericsson", "kintec-just-accounts"],
  },
  {
    slug: "kiin",
    name: "Kiin",
    category: "LinkedIn Ads & GTM Systems",
    industries: ["SaaS"],
    workTypes: ["Employee Advocacy", "Thought Leadership"],
    location: "Portugal",
    engagement: "Advisory support",
    featured: false,
    snapshot: [
      "Startup agency",
      "Grew 0 → 20 clients in first year",
      "B2B SaaS focus",
    ],
    audience: [
      "B2B SaaS founders",
      "Growth teams",
      "Demand generation leaders",
      "Revenue teams",
    ],
    context:
      "Kiin scaled fast off founder-led growth but needed to convert the rest of the team into visible LinkedIn operators to support the next stage. Founder-led can't carry everything past the first 20 clients.",
    challenge:
      "Scale beyond founder-led growth by turning the whole team into visible LinkedIn operators.",
    methodology: [
      "Team-wide LinkedIn positioning framework",
      "Profile optimisation across the team",
      "Employee-generated content and posting systems",
      "Thought leadership coaching",
    ],
    results: [
      { value: "Team-wide", label: "LinkedIn positioning framework built" },
      { value: "~4", label: "Inbound leads per profile per month (target)" },
      { value: "0 → 20", label: "Clients supported through year one" },
    ],
    related: ["vaibe", "bitpanda", "outrun"],
  },
  {
    slug: "metaco",
    name: "Metaco",
    category: "Institutional Digital Asset Infrastructure",
    industries: ["Fintech", "Digital Assets"],
    workTypes: ["Thought Leadership", "GTM Foundations"],
    location: "Switzerland",
    engagement: "Advisory and thought leadership support",
    featured: false,
    snapshot: [
      "Institutional digital asset infrastructure",
      "Acquired by Ripple",
    ],
    audience: [
      "Banks",
      "Institutional investors",
      "Custody providers",
      "Digital asset infrastructure teams",
    ],
    context:
      "Metaco operated at the institutional edge of digital assets — custody, stablecoins, regulated infrastructure for banks. Ahead of the Ripple acquisition, the priority was sharper executive positioning and category education.",
    challenge:
      "Strengthen executive positioning and category education around stablecoins, custody and institutional crypto infrastructure ahead of Ripple acquisition.",
    methodology: [
      "Stablecoin-focused thought leadership library",
      "Long-form ghostwritten institutional infrastructure articles",
      "Executive positioning programme",
      "Institutional buyer education",
    ],
    results: [
      { value: "15+", label: "Long-form institutional articles ghostwritten" },
      { value: "Stablecoin", label: "Thought leadership library built" },
      { value: "Ripple", label: "Acquisition positioning supported" },
    ],
    related: ["bitpanda", "outrun", "visa-commercial-pay"],
  },
  {
    slug: "iwoca",
    name: "iwoca",
    category: "SME Lending Fintech",
    industries: ["Fintech"],
    workTypes: ["Outbound Systems"],
    location: "London, UK",
    engagement: "Project-based outbound support",
    featured: false,
    snapshot: [
      "SME lending fintech",
      "Project engagement focused on outbound pipeline",
    ],
    audience: [
      "SME founders",
      "Small business operators",
      "SMB finance teams",
    ],
    context:
      "iwoca operates in a competitive SME lending market where trust and relevance matter as much as the product. The brief was a focused outbound project to generate qualified lending conversations.",
    challenge:
      "Generate qualified lending conversations in a competitive SME finance market.",
    methodology: [
      "Cold outbound sequencing and segmentation",
      "Trust-based messaging tuned to financing pain points",
      "Targeting frameworks for SME operators",
    ],
    results: [
      { value: "~40", label: "Qualified meetings per month" },
    ],
    related: ["credissimo", "kintec-just-accounts", "grapevine"],
  },
  {
    slug: "mailchimp",
    name: "Mailchimp",
    category: "SMB SaaS",
    industries: ["SaaS"],
    workTypes: ["Outbound Systems", "GTM Foundations"],
    location: "Global — Intuit",
    engagement: "Customer activation project",
    featured: false,
    snapshot: [
      "SMB SaaS",
      "Parent company: Intuit",
      "Activation project across managed cohort",
    ],
    audience: [
      "SMB owners",
      "Ecommerce businesses",
      "Small business marketing teams",
    ],
    context:
      "Mailchimp's SMB cohorts often signed up faster than they activated. The project tightened the loop between signup, customer health and active platform usage.",
    challenge:
      "Improve post-signup engagement and product activation across SMB accounts.",
    methodology: [
      "Customer health checks across managed accounts",
      "Activation and adoption analysis",
      "Onboarding support and intervention",
    ],
    results: [
      { value: "50+", label: "SMB accounts managed" },
      { value: "~50%", label: "Increase in active platform usage" },
    ],
    related: ["vonage-ericsson", "kintec-just-accounts", "kiin"],
  },
  {
    slug: "grapevine",
    name: "Grapevine",
    category: "Conversational AI & Corporate Travel Tech",
    industries: ["AI", "Travel Tech"],
    workTypes: ["AI Enablement", "Outbound Systems"],
    location: "Global",
    engagement: "Advisory support",
    featured: false,
    snapshot: [
      "Conversational AI for corporate travel",
      "Founder-led GTM motion",
    ],
    audience: [
      "TMCs",
      "Corporate travel leaders",
      "Hotel programme managers",
      "Travel operations teams",
    ],
    context:
      "Grapevine sits at the intersection of conversational AI and corporate travel. Cold outbound was less suited to the founder's strengths than relationship-led, conversation-first prospecting.",
    challenge:
      "Create stronger founder-led outreach and relationship-building inside corporate travel.",
    methodology: [
      "Podcast-style founder outreach",
      "Founder positioning and conversation-led GTM",
      "Relationship-based prospecting frameworks",
    ],
    results: [
      { value: "10", label: "Meetings generated in one week" },
      { value: "Founder-led", label: "GTM positioning strengthened" },
    ],
    related: ["hotelhub", "iwoca", "outrun"],
  },
  {
    slug: "outrun",
    name: "Outrun",
    category: "Stablecoin Advisory",
    industries: ["Fintech", "Digital Assets"],
    workTypes: ["GTM Foundations", "Thought Leadership"],
    location: "Global",
    engagement: "Advisory support",
    featured: false,
    snapshot: [
      "Stablecoin advisory",
      "Early-stage GTM and positioning",
    ],
    audience: [
      "Fintech founders",
      "Payments leaders",
      "Digital asset operators",
      "Banking innovation teams",
    ],
    context:
      "Outrun's brief was sharpening positioning and market education around stablecoin advisory — translating regulated digital asset narratives into commercial language fintech and banking buyers can act on.",
    challenge:
      "Clarify positioning and market education for stablecoin advisory services.",
    methodology: [
      "Infrastructure positioning",
      "Fintech storytelling and commercial narratives",
      "Early GTM frameworks",
    ],
    results: [
      { value: "Early GTM", label: "Positioning frameworks shaped" },
      { value: "Stablecoin", label: "Commercial narratives clarified" },
    ],
    related: ["metaco", "bitpanda", "kiin"],
  },
  {
    slug: "web-summit",
    name: "Web Summit GTM Activation",
    category: "Event-Led GTM",
    industries: ["SaaS", "Fintech", "AI"],
    workTypes: ["Event-Led GTM", "Employee Advocacy", "Thought Leadership"],
    location: "Lisbon, Portugal",
    engagement: "Multi-company event activation",
    featured: true,
    snapshot: [
      "20+ companies supported",
      "Live content capture and post-event amplification",
      "Founder visibility and meeting storytelling",
    ],
    audience: [
      "Founders",
      "Investors",
      "Enterprise buyers",
      "Strategic partners",
      "Media",
      "GTM leaders",
    ],
    context:
      "Web Summit is one of the highest-density GTM moments of the year. Most teams treat it as a series of meetings; we treat it as a content engine that compounds for months afterwards.",
    challenge:
      "Turn event attendance into long-tail visibility, relationship acceleration and post-event GTM assets.",
    companies: [
      "Oracle", "Vercel", "Atlassian", "Amplemarket", "SendPulse", "Make",
      "SoftBees", "Orchestr", "Delancia", "Social.plus", "Epidemic Sound",
      "Yatta", "Smart Family Office", "Branded", "Maria/Ludovica", "+ others",
    ],
    methodology: [
      "Live content capture and executive photography",
      "Founder visibility programme on LinkedIn",
      "Meeting storytelling and ABM amplification",
      "Post-event relationship nurturing motions",
    ],
    results: [
      { value: "20+", label: "Companies activated" },
      { value: "Long-tail", label: "Visibility past the event window" },
      { value: "Reusable", label: "GTM assets created from one week of conference activity" },
    ],
    related: ["mwc-barcelona", "vonage-ericsson", "vaibe"],
  },
  {
    slug: "mwc-barcelona",
    name: "MWC Barcelona GTM Activation",
    category: "Event-Led GTM",
    industries: ["Telecom", "AI", "SaaS"],
    workTypes: ["Event-Led GTM", "Employee Advocacy", "Thought Leadership"],
    location: "Barcelona, Spain",
    engagement: "Multi-company event activation",
    featured: true,
    snapshot: [
      "Multi-company activation across MWC",
      "Founder and team photography",
      "Strategic meeting visibility",
    ],
    audience: [
      "Telecom operators",
      "Enterprise buyers",
      "Innovation teams",
      "Strategic partners",
      "Investors",
      "GTM leaders",
    ],
    context:
      "MWC concentrates the most strategic relationships in telecom and infrastructure into four days. The brief was to convert that density into enterprise credibility and post-event momentum, not just badge scans.",
    challenge:
      "Turn high-value conference activity into strategic visibility, enterprise credibility and post-event relationship momentum.",
    companies: [
      "Stripe", "Spendbase", "GetVocal AI", "Untile",
      "Teknasyon", "Outstage", "Kate Curry",
    ],
    methodology: [
      "Founder and team photography",
      "Live content capture across booth and meetings",
      "Account-based storytelling",
      "LinkedIn amplification and post-event sequences",
    ],
    results: [
      { value: "Multi-company", label: "MWC visibility activation" },
      { value: "Strategic", label: "Meeting and ecosystem capture" },
      { value: "Reusable", label: "LinkedIn and outbound assets" },
    ],
    related: ["web-summit", "vonage-ericsson", "bitpanda"],
  },
];

/* Helper to find a case by slug */
function getCase(slug) {
  return CASES.find((c) => c.slug === slug);
}

/* Make available to non-module scripts */
if (typeof window !== "undefined") {
  window.SITE = SITE;
  window.PROOF_LOGOS = PROOF_LOGOS;
  window.PROBLEMS = PROBLEMS;
  window.METHODOLOGY = METHODOLOGY;
  window.HOME_GROUPS = HOME_GROUPS;
  window.INDUSTRIES = INDUSTRIES;
  window.WORK_TYPES = WORK_TYPES;
  window.CASES = CASES;
  window.getCase = getCase;
}
