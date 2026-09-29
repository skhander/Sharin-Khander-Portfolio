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
  preview: 'recordings' | 'video' | 'coming-soon';
};

export const personalProjects: PersonalProject[] = [
  {
    slug: 'virtual-try-on',
    title: 'Virtual Try-On',
    description: 'Chrome Extension',
    badges: ['Image Gen'],
    preview: 'recordings',
  },
  {
    slug: 'ai-advent-calendar',
    title: 'AI Advent Calendar',
    description: 'Master fundamental AI concepts in 9 days.',
    badges: ['AI Education', '9 Days'],
    preview: 'video',
  },
  {
    slug: 'medigo',
    title: 'Medigo',
    description: 'A marketplace for medical tourism. Find and book procedures abroad from 100+ accredited doctors and clinics.',
    badges: [],
    preview: 'coming-soon',
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
    description: 'Reimagining shopping around luxury inventory.',
    thesis: 'Make luxury browsing feel considered, not like a treasure hunt.',
    role: 'Product strategy, product direction, execution',
    team: 'Design, Engineering, Research, Data',
    scope: 'Browse + PDP',
    status: 'published',
  },
  {
    slug: 'attribute-enrichment',
    title: 'Attribute Prediction',
    company: 'The RealReal',
    category: 'AI / Discovery / Curation',
    description: 'Predict trend, occasion, and vibe from a photo to power search.',
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
    description: 'An AI shopping agent that lets shoppers search by intent, connected to a 6M+ product catalog.',
    status: 'published',
  },
  {
    slug: 'visual-search',
    title: 'Visual Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
    description: 'Letting users shop their social media or IRL inspiration.',
    status: 'published',
  },
  {
    slug: 'similar-designers',
    title: 'Similar Designers',
    company: 'The RealReal',
    category: 'Discovery / Recommendations',
    description: 'Helping shoppers discover their next favorite designer.',
    status: 'published',
  },
  {
    slug: 'curation',
    title: 'Curation Tool',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
    description: 'build an entire assortment in minutes',
    status: 'published',
  },
];

export const publishedProjects = projects.filter((project) => project.status === 'published');
export const futureProjects = projects.filter((project) => project.status === 'future');

export function getProject(slug?: string) {
  return publishedProjects.find((project) => project.slug === slug);
}