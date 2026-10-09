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
  preview: 'recordings' | 'video' | 'mockup' | 'coming-soon';
};

export const personalProjects: PersonalProject[] = [
  {
    slug: 'virtual-try-on',
    title: 'Virtual Try-On',
    description: 'Try clothes on yourself, in Chrome.',
    badges: ['Image Gen'],
    preview: 'recordings',
  },
  {
    slug: 'ai-advent-calendar',
    title: 'AI Advent Calendar',
    description: 'Learn the basics of AI in 9 days.',
    badges: ['Ed Tech'],
    preview: 'video',
  },
  {
    slug: 'dream-catcher',
    title: 'Dream Catcher',
    description: 'Record a dream. Get an AI read. See how it connects to your life.',
    badges: ['COMING SOON'],
    preview: 'mockup',
  },
  {
    slug: 'medigo',
    title: 'Medigo',
    description: 'Find and book a procedure abroad. 100+ accredited doctors and clinics.',
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
    description: '$60M in GMV. Add to cart up 10%.',
    thesis: 'Make the product bigger. Make the page calmer.',
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
    description: 'Labels on 6M+ products. We built a check for bad labels.',
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
    description: '$14M in GMV. Shoppers can search the way they talk.',
    status: 'published',
  },
  {
    slug: 'visual-search',
    title: 'Image Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
    description: '$14M in GMV. Keyword searches per visitor down 10%.',
    status: 'published',
  },
  {
    slug: 'similar-designers',
    title: 'Similar Designers',
    company: 'The RealReal',
    category: 'Discovery / Recommendations',
    description: '$30M in GMV. Bounce rate down 10%.',
    status: 'published',
  },
  {
    slug: 'curation',
    title: 'Curation Automation',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
    description: '2× more edits on the site. Sell-through up 30%.',
    status: 'published',
  },
];

export const publishedProjects = projects.filter((project) => project.status === 'published');
export const futureProjects = projects.filter((project) => project.status === 'future');

export function getProject(slug?: string) {
  return publishedProjects.find((project) => project.slug === slug);
}