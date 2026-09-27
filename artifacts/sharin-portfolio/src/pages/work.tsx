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
    badges: ['Experiments'],
  },
  'attribute-enrichment': {
    src: '/media/attribute-enrichment/chanel-top.webp',
    alt: 'Chanel vintage top used in the attribute-enrichment project',
    note: 'ATTRIBUTE ENRICHMENT / SOURCE VISUAL',
    badges: ['LLMs', 'Computer Vision', '0→1'],
  },
  'ai-discovery': {
    src: '/media/work/shopping-agent-demo.mp4',
    alt: 'Ask TRR shopping agent demo video',
    badges: ['Agents', 'Computer Vision', '0→1'],
  },
  'visual-search': {
    src: '/media/work/visual-search-ui.png',
    alt: 'Visual Search mobile camera interface with selectable regions in a photo',
    badges: ['Computer Vision', '0→1'],
  },
  'similar-designers': {
    src: '/media/work/similar-designers-customers-also-shop.png',
    alt: 'Customers also shop recommendations for Chanel, Christian Dior, Gucci, Prada, Fendi, and Hermès',
    badges: ['Machine Learning', 'Computer Vision', '0→1'],
  },
  curation: {
    src: '/media/work/curation-vacation-shop.mp4',
    alt: 'The RealReal Vacation Shop product browse video',
    badges: ['Agents', 'Machine Learning', 'Computer Vision', '0→1 BUILD'],
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
      <section className="work-hero mx-auto w-full max-w-[1440px] px-6 pb-10 pt-10 sm:px-10 md:pb-12 md:pt-10 lg:px-[5%]">
        <h1 className="work-hero-name font-editorial" data-testid="text-work-name">Sharin<br />Khander<span className="text-accent">.</span></h1>
        <p className="work-hero-role font-editorial">Product builder and former engineer.</p>
        <div className="work-proof" aria-label="Track record">
          <div className="work-proof-item">
            <strong className="work-proof-number font-editorial" data-testid="text-products-count">7</strong>
            <span className="work-proof-label">0→1 products</span>
          </div>
          <div className="work-proof-item">
            <strong className="work-proof-number font-editorial" data-testid="text-experiments-count">150+</strong>
            <span className="work-proof-label">experiments</span>
          </div>
          <div className="work-proof-item">
            <strong className="work-proof-number font-editorial" data-testid="text-gmv-impact">$340M</strong>
            <span className="work-proof-label">GMV impact</span>
          </div>
        </div>
      </section>
      <section id="selected-work" className="mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-28 lg:px-[5%]" aria-labelledby="work-heading">
        <div className="work-band flex flex-col gap-5 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <h2 id="work-heading" className="font-editorial text-[clamp(2.3rem,4vw,3.8rem)] leading-none tracking-[-.035em]">Selected work</h2>
          <div className="work-filters flex flex-wrap gap-1" role="group" aria-label="Filter projects">
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
            const cardTitle = project.slug === 'curation' ? 'Curation Tool' : project.slug === 'attribute-enrichment' ? 'Metadata Enrichment' : project.slug === 'visual-search' ? 'Image Search' : project.slug === 'elevated-experience' ? 'Site Redesign' : project.title;
            const visual = projectVisuals[project.slug];
            if (!visual) throw new Error(`Missing homepage visual for ${project.slug}`);
            return (
              <Link
                href={`/work/${project.slug}`}
                key={project.slug}
                className={`editorial-project group${project.slug === 'curation' ? ' is-curation' : ''}${project.slug === 'ai-discovery' ? ' is-shopping-agent' : ''}${project.slug === 'similar-designers' ? ' is-similar-designers' : ''}${project.slug === 'visual-search' ? ' is-visual-search' : ''}${projectIndex % 2 === 1 && project.slug !== 'ai-discovery' ? ' is-reversed' : ''}${projectIndex % 3 === 2 && project.slug !== 'similar-designers' ? ' is-wide' : ''}`}
                data-testid={`link-project-${project.slug}`}
              >
                <div className="editorial-project-copy">
                  <div className="editorial-project-kicker font-mono-archive text-accent">
                      <span className="text-[10px]">{projectNumber}</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className="project-arrow" aria-hidden="true" />
                  </div>
                  <h3 className="font-editorial">{cardTitle}</h3>
                  <p className="editorial-project-description text-muted-foreground">{project.slug === 'curation' ? 'Making editorial taste scalable.' : project.slug === 'ai-discovery' ? 'Search, compare, and buy with natural language.' : project.slug === 'similar-designers' ? 'Helping shoppers discover their next favorite designer.' : project.slug === 'attribute-enrichment' ? 'Making 6M products discoverable by trend, vibe, and occasion.' : project.slug === 'visual-search' ? 'Turn inspiration into something you can shop.' : project.slug === 'elevated-experience' ? 'Elevating the shopping experience for improved discovery and conversion.' : project.description}</p>
                  <div className="editorial-project-badges" aria-label={`${cardTitle} categories`}>
                    {visual.badges.map((badge) => <span key={badge}>{badge}</span>)}
                  </div>
                </div>
                <figure className="editorial-project-visual" data-project={project.slug}>
                  <div className="editorial-project-artwork">
                    {project.slug === 'curation' || project.slug === 'ai-discovery' ? (
                      <video
                        src={visual.src}
                        poster={project.slug === 'curation' ? '/media/work/curation-vacation-shop-poster.jpg' : '/media/work/shopping-agent-poster.jpg'}
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
                  {project.slug !== 'curation' && project.slug !== 'ai-discovery' && project.slug !== 'similar-designers' && project.slug !== 'visual-search' && (
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