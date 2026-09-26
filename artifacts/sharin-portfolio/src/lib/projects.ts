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

// Add genuine media and case-study content here when available. Empty sections
// are intentionally not rendered as published research, decisions, or outcomes.
export const projects: Project[] = [
  {
    slug: 'elevated-experience',
    title: 'Elevated Experience',
    company: 'The RealReal',
    category: 'Browse + PDP',
    description: 'Reimagining shopping around luxury inventory.',
    thesis: 'Make luxury browsing feel considered, not like a treasure hunt.',
    role: 'Product strategy, product direction, execution',
    team: 'Design, Engineering, Research, Data',
    scope: 'Browse + PDP',
    status: 'published',
  },
  {
    slug: 'attribute-enrichment',
    title: 'Trend, Vibe, Occasion Discovery',
    company: 'The RealReal',
    category: 'AI / Discovery / Curation',
    description: 'Helping shoppers discover fashion by trend, vibe, and occasion.',
    thesis: 'Give the marketplace a richer language for understanding style.',
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
    description: 'Multimodal search, product comparison, virtual try-on, and in-agent checkout.',
    status: 'published',
  },
  {
    slug: 'visual-search',
    title: 'Visual Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
    description: 'Turning inspiration into product discovery.',
    status: 'published',
  },
  {
    slug: 'checkout',
    title: 'Checkout',
    company: 'The RealReal',
    category: 'Commerce',
    description: 'Improving the path from product discovery to purchase.',
    status: 'published',
  },
  {
    slug: 'curation',
    title: 'Curation',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
    description: 'Scaling editorial taste into product discovery.',
    status: 'published',
  },
];

export const publishedProjects = projects.filter((project) => project.status === 'published');
export const futureProjects = projects.filter((project) => project.status === 'future');

export function getProject(slug?: string) {
  return publishedProjects.find((project) => project.slug === slug);
}