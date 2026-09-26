import { useMemo, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { publishedProjects } from '@/lib/projects';
import { usePageMeta } from '@/lib/use-page-meta';

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

function matchesFilter(category: string, filter: string) {
  if (filter === 'All') return true;
  if (filter === 'Discovery') return category.includes('Discovery') || category.includes('Browse');
  if (filter === 'Commerce') return category.includes('Commerce') || category.includes('Browse');
  return category.includes('AI');
}

export default function Work() {
  const [filter, setFilter] = useState('All');
  usePageMeta('Work — Sharin Khander', 'Explore Sharin Khander’s product work across luxury marketplaces, AI discovery, visual search, checkout, and personalization.');

  const visibleProjects = useMemo(
    () => publishedProjects.filter((project) => matchesFilter(project.category, filter)),
    [filter],
  );

  return (
    <div className="page-reveal">
      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 pb-16 pt-14 sm:px-10 md:grid-cols-[1.2fr_.8fr] md:items-end md:gap-12 md:pb-20 md:pt-20 lg:px-16">
        <div>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">Product work / 01—{String(publishedProjects.length).padStart(2, '0')}</p>
          <h1 className="mt-6 font-editorial text-[clamp(4.3rem,9vw,8.8rem)] leading-[.83] tracking-[-.055em]">Sharin<br />Khander<span className="text-accent">.</span></h1>
        </div>
        <div className="relative max-w-md bg-[hsl(var(--rose-surface))] px-6 py-7 sm:px-8 sm:py-9 md:max-w-none md:px-9 md:py-11">
          <p className="font-editorial text-[clamp(2.2rem,3.4vw,3.5rem)] italic leading-none tracking-[-.025em]">Product builder.</p>
          <p className="mt-6 text-balance text-[clamp(1.2rem,1.9vw,1.75rem)] font-medium leading-[1.25] tracking-[-.02em]">
            I build habit-forming consumer products people love.
          </p>
        </div>
      </section>

      <section id="selected-work" className="mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-28 lg:px-16" aria-labelledby="work-heading">
        <div className="flex flex-col gap-5 bg-[hsl(var(--olive-surface))] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
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

        <div className="border-t border-border">
          <div className="flex items-center justify-between gap-3 py-4 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground">
            <span className="bg-muted px-2.5 py-1 text-foreground">The RealReal</span><span>{visibleProjects.length} projects</span>
          </div>
          {visibleProjects.map((project) => {
            const projectIndex = publishedProjects.findIndex((item) => item.slug === project.slug);
            return (
              <Link
                href={`/work/${project.slug}`}
                key={project.slug}
                className="project-row group grid min-w-0 grid-cols-[2rem_1fr_auto] items-start gap-3 border-t border-border py-5 sm:grid-cols-[3rem_minmax(0,1fr)_minmax(12rem,.8fr)_auto] sm:items-center sm:gap-6 sm:py-6"
                data-testid={`link-project-${project.slug}`}
              >
                <span className="pt-1 font-mono-archive text-[10px] text-accent">{String(projectIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="font-editorial text-[clamp(2rem,3.25vw,3.4rem)] leading-[.95] tracking-[-.035em] transition-colors group-hover:text-accent">{project.title}</h3>
                  <p className="mt-2 text-sm leading-snug text-muted-foreground sm:hidden">{project.description}</p>
                </div>
                <p className="hidden max-w-[22rem] text-sm leading-snug text-muted-foreground sm:block">{project.description}</p>
                <ArrowUpRight size={19} strokeWidth={1.5} className="project-arrow mt-1 text-accent sm:mt-0" aria-hidden="true" />
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