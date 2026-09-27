import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { publishedProjects } from '@/lib/projects';
import { usePageMeta } from '@/lib/use-page-meta';
import './editorial-work.css';

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

const homepageProjectSlugs = [
  'curation',
  'ai-discovery',
  'similar-designers',
  'attribute-enrichment',
  'visual-search',
  'elevated-experience',
] as const;

const homepageProjects = homepageProjectSlugs.map((slug) => {
  const project = publishedProjects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing published homepage project: ${slug}`);
  return project;
});

if (homepageProjects.length !== publishedProjects.length) {
  throw new Error('Homepage project order must include every published project');
}

const projectVisuals: Record<string, { src: string; alt: string; note?: string; badges: string[] }> = {
  'elevated-experience': {
    src: '/media/browse-after.webp',
    alt: 'The RealReal luxury handbag browse interface',
    note: 'PRODUCT INTERFACE',
    badges: ['Redesigns'],
  },
  'attribute-enrichment': {
    src: '/media/attribute-enrichment/chanel-top.webp',
    alt: 'Chanel vintage top used in the attribute-enrichment project',
    note: 'ATTRIBUTE ENRICHMENT / SOURCE VISUAL',
    badges: ['0 → 1', 'Machine Learning', 'LLMs'],
  },
  'ai-discovery': {
    src: '/media/work/shopping-agent-comparison.png',
    alt: 'Ask TRR mobile product comparison interface showing two diamond tennis bracelets',
    note: 'ASK TRR / PRODUCT COMPARISON',
    badges: ['Machine Learning', '0 → 1'],
  },
  'visual-search': {
    src: '/media/work/visual-search-ui.png',
    alt: 'Visual Search mobile camera interface with selectable regions in a photo',
    note: 'VISUAL SEARCH / SOURCE INTERFACE',
    badges: ['Machine Learning', '0 → 1'],
  },
  'similar-designers': {
    src: '/media/work/similar-designers-look.jpg',
    alt: 'Designer look used for designer discovery',
    note: 'DESIGNER LOOKBOOK',
    badges: ['Recommendations'],
  },
  curation: {
    src: '/media/work/curation-vacation-shop.mp4',
    alt: 'The RealReal Vacation Shop product browse video',
    badges: ['Machine Learning', 'Internal Tools', '0→1 BUILD'],
  },
};

function matchesFilter(category: string, filter: string) {
  if (filter === 'All') return true;
  if (filter === 'Discovery') return category.includes('Discovery') || category.includes('Browse');
  if (filter === 'Commerce') return category.includes('Commerce') || category.includes('Browse');
  return category.includes('AI');
}

export default function Work() {
  const [filter, setFilter] = useState('All');
  usePageMeta('Work — Sharin Khander', 'Explore Sharin Khander’s product work across luxury marketplaces, shopping agents, visual search, designer discovery, and personalization.');

  const visibleProjects = useMemo(
    () => homepageProjects.filter((project) => matchesFilter(project.category, filter)),
    [filter],
  );

  return (
    <div className="page-reveal editorial-work">
      <section className="work-hero mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 pb-16 pt-14 sm:px-10 md:grid-cols-[1.2fr_.8fr] md:items-end md:gap-12 md:pb-20 md:pt-20 lg:px-16">
        <div>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">7 zero→one products · 150+ experiments · $340M GMV impact · ML + AI · former engineer</p>
          <h1 className="mt-6 font-editorial text-[clamp(4.3rem,9vw,8.8rem)] leading-[.83] tracking-[-.055em]">Sharin<br />Khander<span className="text-accent">.</span></h1>
        </div>
        <div className="work-intro max-w-md bg-[hsl(var(--rose-surface))] px-6 py-7 sm:px-8 sm:py-9 md:max-w-none md:px-9 md:py-11">
          <p className="font-editorial text-[clamp(2.2rem,3.4vw,3.5rem)] italic leading-none tracking-[-.025em]">Product builder.</p>
          <p className="mt-6 text-balance text-[clamp(1.2rem,1.9vw,1.75rem)] font-medium leading-[1.25] tracking-[-.02em]">
            I build better ways to shop. Easier, more personal, and more fun.
          </p>
        </div>
      </section>
      <section id="selected-work" className="mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-28 lg:px-16" aria-labelledby="work-heading">
        <div className="work-band flex flex-col gap-5 bg-[hsl(var(--olive-surface))] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <h2 id="work-heading" className="font-editorial text-[clamp(2.3rem,4vw,3.8rem)] leading-none tracking-[-.035em]">Selected work</h2>
          <div className="flex flex-wrap gap-1" role="group" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                className={`min-h-9 border px-3 py-2 font-mono-archive text-[10px] uppercase tracking-[.1em] transition-colors ${filter === item ? 'border-accent bg-accent text-accent-foreground' : 'border-transparent text-foreground hover:border-foreground/50'}`}
                aria-pressed={filter === item}
                data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="work-list editorial-project-list border-t border-border" aria-live="polite">
          <div className="flex items-center justify-between gap-3 py-4 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground">
            <span className="bg-muted px-2.5 py-1 text-foreground">The RealReal</span><span>{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</span>
          </div>
          {visibleProjects.map((project) => {
            const projectIndex = homepageProjects.findIndex((item) => item.slug === project.slug);
            const projectNumber = String(projectIndex + 1).padStart(2, '0');
            const visual = projectVisuals[project.slug];
            if (!visual) throw new Error(`Missing homepage visual for ${project.slug}`);
            return (
              <Link
                href={`/work/${project.slug}`}
                key={project.slug}
                className={`editorial-project group${project.slug === 'curation' ? ' is-curation' : ''}${projectIndex % 2 === 1 ? ' is-reversed' : ''}${projectIndex % 3 === 2 ? ' is-wide' : ''}`}
                data-testid={`link-project-${project.slug}`}
              >
                <div className="editorial-project-copy">
                  <div className="editorial-project-kicker font-mono-archive text-accent">
                    <span className="text-[10px]">{project.slug === 'curation' ? `${projectNumber} · DISCOVERY · AI` : `${projectNumber} / ${project.slug === 'elevated-experience' ? 'DISCOVERY · ML · 0→1' : project.category}`}</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className="project-arrow" aria-hidden="true" />
                  </div>
                  <h3 className="font-editorial">{project.title}</h3>
                  <p className="editorial-project-description text-muted-foreground">{project.slug === 'curation' ? 'Making editorial taste scalable.' : project.description}</p>
                  <div className="editorial-project-badges" aria-label={`${project.title} categories`}>
                    {visual.badges.map((badge) => <span key={badge}>{badge}</span>)}
                  </div>
                </div>
                <figure className="editorial-project-visual" data-project={project.slug}>
                  <div className="editorial-project-artwork">
                    {project.slug === 'curation' ? (
                      <video
                        src={visual.src}
                        poster="/media/work/curation-vacation-shop-poster.jpg"
                        aria-label={visual.alt}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img src={visual.src} alt={visual.alt} loading={projectIndex < 2 ? 'eager' : 'lazy'} />
                    )}
                  </div>
                  {project.slug !== 'curation' && (
                    <figcaption className="font-mono-archive">
                      <span>{visual.note}</span><span>FIG. {projectNumber}</span>
                    </figcaption>
                  )}
                </figure>
              </Link>
            );
          })}
        </div>

        {visibleProjects.length === 0 && (
          <div className="border-b border-border py-20 text-center">
            <p className="font-editorial text-3xl">No projects in this filter.</p>
            <button type="button" onClick={() => setFilter('All')} className="mt-5 border-b border-accent pb-1 font-mono-archive text-[10px] uppercase tracking-[.14em] text-accent" data-testid="button-reset-filter">View all</button>
          </div>
        )}
      </section>
    </div>
  );
}