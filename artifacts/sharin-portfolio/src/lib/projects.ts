export type ProjectSectionKey = 'Problem' | 'Insight' | 'Bet' | 'Work' | 'Decisions' | 'Outcome' | 'Next';

export type Project = {
  slug: string;
  title: string;
  company: string;
  category: string;
  description: string;
  thesis?: string;
  role?: string;
  team?: string;
  scope?: string;
  status?: 'published' | 'future';
  sections: ProjectSectionKey[];
};

export const projects: Project[] = [
  {
    slug: 'elevated-experience',
    title: 'Elevated Experience',
    company: 'The RealReal',
    category: 'Browse + PDP',
    description: 'Reimagining shopping around luxury inventory.',
    thesis: 'Making The RealReal feel like a luxury marketplace—not a treasure hunt.',
    role: 'Product strategy, product direction, execution',
    team: 'Design, Engineering, Research, Data',
    scope: 'Browse + PDP',
    status: 'published',
    sections: ['Problem', 'Insight', 'Bet', 'Work', 'Decisions', 'Outcome', 'Next'],
  },
  {
    slug: 'ai-discovery',
    title: 'AI Discovery',
    company: 'The RealReal',
    category: 'AI / Search / Discovery',
    description: 'Conversational and visual product discovery.',
    status: 'published',
    sections: ['Problem', 'Insight', 'Bet', 'Work', 'Decisions', 'Outcome'],
  },
  {
    slug: 'visual-search',
    title: 'Visual Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
    description: 'Turning inspiration into product discovery.',
    status: 'published',
    sections: ['Problem', 'Insight', 'Bet', 'Work', 'Decisions', 'Outcome'],
  },
  {
    slug: 'checkout',
    title: 'Checkout',
    company: 'The RealReal',
    category: 'Commerce',
    description: 'Improving the path from product discovery to purchase.',
    status: 'published',
    sections: ['Problem', 'Insight', 'Bet', 'Work', 'Decisions', 'Outcome'],
  },
  {
    slug: 'curation',
    title: 'Curation',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
    description: 'Scaling editorial taste into product discovery.',
    status: 'published',
    sections: ['Problem', 'Insight', 'Bet', 'Work', 'Decisions', 'Outcome'],
  },
  {
    slug: 'future-project',
    title: 'Future project',
    company: 'In progress',
    category: 'Archive slot',
    description: 'A place for the next piece of work.',
    status: 'future',
    sections: ['Problem', 'Insight', 'Bet', 'Work', 'Decisions', 'Outcome'],
  },
];

export const publishedProjects = projects.filter((project) => project.status !== 'future');

export function getProject(slug?: string) {
  return projects.find((project) => project.slug === slug);
}