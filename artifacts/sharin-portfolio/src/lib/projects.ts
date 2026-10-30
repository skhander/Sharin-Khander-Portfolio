export type MediaAsset = {
  src: string;
  alt: string;
  caption?: string;
};

export type VideoAsset = {
  src: string;
  poster?: string;
  caption?: string;
};

export type PrototypeAsset = {
  src: string;
  title: string;
  caption?: string;
};

export type MetricItem = {
  value: string;
  label: string;
  context?: string;
};

export type DecisionItem = {
  title: string;
  rationale: string;
};

export type CaseSection = {
  heading: 'Problem' | 'Insight' | 'Bet' | 'Work' | 'Decisions' | 'Outcome' | 'Next';
  body?: string[];
  images?: MediaAsset[];
  beforeAfter?: { before: MediaAsset; after: MediaAsset };
  video?: VideoAsset;
  prototype?: PrototypeAsset;
  metrics?: MetricItem[];
  decisions?: DecisionItem[];
};

export type Project = {
  slug: string;
  title: string;
  company: string;
  category: string;
  description: string;
  thesis?: string;
  role?: string;
  team?: string | { name: string; role: string }[];
  scope?: string;
  cover?: MediaAsset;
  sections?: CaseSection[];
  status: 'published' | 'future';
};

// Personal work shown on the homepage; individual projects may have detail routes.
export type PersonalProject = {
  slug: string;
  title: string;
  description: string;
  badges: string[];
  preview: 'recordings' | 'mockup';
};

export const personalProjects: PersonalProject[] = [
  {
    slug: 'virtual-try-on',
    title: 'Virtual Try-On',
    description: 'A Chrome extension that lets you shop any site as an avatar of yourself.',
    badges: ['Image Gen'],
    preview: 'recordings',
  },
  {
    slug: 'dream-catcher',
    title: 'Dream Catcher',
    description: 'Learn more about yourself by recording your dreams with voice notes and interpreting them with AI.',
    badges: ['COMING SOON'],
    preview: 'mockup',
  },
];

// Add genuine media and case-study content here when available. Empty sections
// are intentionally not rendered as published research, decisions, or outcomes.
export const projects: Project[] = [
  {
    slug: 'elevated-experience',
    title: 'Site Redesign',
    company: 'The RealReal',
    category: 'Browse + PDP',
    description: 'Elevated the buying experience and increased revenue per visitor by 5%.',
    thesis: 'Make the product bigger. Make the page calmer.',
    role: 'Product strategy, product direction, execution',
    team: 'Design, Engineering, Research, Data',
    scope: 'Browse + PDP',
    status: 'published',
  },
  {
    slug: 'attribute-enrichment',
    title: 'Catalog Enrichment',
    company: 'The RealReal',
    category: 'AI / Discovery / Curation',
    description: 'Generated richer product descriptions with LLMs and increased search conversion by 5%.',
    thesis: 'People search for a vibe. The catalog only knew the color.',
    role: 'Prompts, taxonomy, evaluation, UAT, testing strategy',
    team: [
      { name: 'Leo Korman', role: 'EM' },
      { name: 'Beatrice Lynes', role: 'UXD' },
      { name: 'Dhaval Dholakia', role: 'ML' },
      { name: 'Alexis DeMan', role: 'AI Platform' },
    ],
    scope: 'Search, recommendations, curation',
    status: 'published',
  },
  {
    slug: 'ai-discovery',
    title: 'Shopping Agent',
    company: 'The RealReal',
    category: 'AI / Discovery / Commerce',
    description: 'Simplified product discovery and drove a 1% lift in conversion.',
    status: 'published',
  },
  {
    slug: 'visual-search',
    title: 'Image Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
    description: 'Let users shop their social media inspiration and converted at 2.5x the rate of keyword search.',
    status: 'published',
  },
  {
    slug: 'similar-designers',
    title: 'Similar Designer Recommendations',
    company: 'The RealReal',
    category: 'Discovery / Recommendations',
    description: 'Enabled deeper browsing and cut bounce rate by 6%.',
    status: 'published',
  },
  {
    slug: 'curation',
    title: 'Curation Enablement',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
    description: 'Automated manual curation to build look books 3x faster.',
    status: 'published',
  },
];

export const publishedProjects = projects.filter((project) => project.status === 'published');
export const futureProjects = projects.filter((project) => project.status === 'future');

export function getProject(slug?: string) {
  return publishedProjects.find((project) => project.slug === slug);
}