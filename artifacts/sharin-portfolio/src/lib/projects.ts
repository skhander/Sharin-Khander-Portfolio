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
    description: 'A more elevated shopping experience, driving 5% lift in GMV per visitor.',
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
    description: 'AI tags items with trend, occasion, and vibe labels to power more natural discovery.',
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
    description: 'Lets users search naturally, compare products, and style outfits, driving 1% lift in conversion.',
    status: 'published',
  },
  {
    slug: 'visual-search',
    title: 'Image Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
    description: 'Lets users shop their social media inspiration, driving 2.5x higher conversion vs. traditional search.',
    status: 'published',
  },
  {
    slug: 'similar-designers',
    title: 'Similar Designers',
    company: 'The RealReal',
    category: 'Discovery / Recommendations',
    description: "Designer recommendations based on users' taste and budget, enabling deeper discovery and 10% lift in browse page engagement.",
    status: 'published',
  },
  {
    slug: 'curation',
    title: 'Curation Enablement',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
    description: 'Automates manual curation for 3X the editorial output and 30% higher lookbook engagement.',
    status: 'published',
  },
];

export const publishedProjects = projects.filter((project) => project.status === 'published');
export const futureProjects = projects.filter((project) => project.status === 'future');

export function getProject(slug?: string) {
  return publishedProjects.find((project) => project.slug === slug);
}