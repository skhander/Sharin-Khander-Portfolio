import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, SlidersHorizontal } from 'lucide-react';
import { Link } from 'wouter';
import { projects } from '@/lib/projects';

const filters = ['All work', 'Discovery', 'Commerce', 'AI'];

function matchesFilter(category: string, filter: string) {
  if (filter === 'All work') return true;
  if (filter === 'Discovery') return category.includes('Discovery') || category.includes('Browse');
  if (filter === 'Commerce') return category.includes('Commerce') || category.includes('Browse');
  return category.includes('AI');
}

export default function Work() {
  const [filter, setFilter] = useState('All work');
  useEffect(() => {
    document.title = 'Work — Sharin Khander';
    return () => { document.title = 'Sharin Khander — Product archive'; };
  }, []);
  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project.category, filter)),
    [filter],
  );

  return (
    <div className="page-reveal">
      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-14 px-6 pb-24 pt-20 sm:px-10 md:grid-cols-[1.1fr_.9fr] md:gap-10 md:pb-36 md:pt-32 lg:px-16">
        <div>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">Selected work / 01—05</p>
          <h1 className="mt-8 max-w-3xl font-editorial text-[clamp(4.4rem,11vw,10.5rem)] leading-[.82] tracking-[-.055em]">
            Products for<br /><em>real life.</em>
          </h1>
        </div>
        <div className="flex max-w-sm flex-col justify-end md:pb-2">
          <p className="text-balance text-lg leading-[1.45] text-muted-foreground sm:text-xl">
            I build habit-forming consumer products where discovery, decision-making, and delight meet.
          </p>
          <div className="mt-10 flex items-center gap-2 font-mono-archive text-[9px] uppercase tracking-[.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" /> An archive of product thinking
          </div>
        </div>
      </section>

      <section id="work" className="mx-auto w-full max-w-[1440px] scroll-mt-8 px-6 sm:px-10 lg:px-16" aria-labelledby="work-heading">
        <div className="flex flex-col justify-between gap-6 border-t border-border py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={13} strokeWidth={1.4} className="text-muted-foreground" />
            <h2 id="work-heading" className="font-mono-archive text-[10px] uppercase tracking-[.18em]">Archive index</h2>
          </div>
          <div className="flex flex-wrap gap-1" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                type="button"
                key={item}
                onClick={() => setFilter(item)}
                className={`border px-3 py-2 font-mono-archive text-[9px] uppercase tracking-[.12em] transition-colors ${filter === item ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'}`}
                aria-pressed={filter === item}
                data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-border">
          {visibleProjects.map((project, index) => (
            <Link
              href={`/work/${project.slug}`}
              key={project.slug}
              className="project-row group grid grid-cols-[38px_1fr_auto] gap-4 border-b border-border py-7 sm:grid-cols-[64px_1.2fr_1fr_28px] sm:gap-6 sm:py-9"
              data-testid={`link-project-${project.slug}`}
            >
              <span className="font-mono-archive text-[10px] text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-editorial text-[2.1rem] leading-[.96] tracking-[-.025em] sm:text-[3rem]">{project.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-[1.45] text-muted-foreground sm:text-base">{project.description}</p>
              </div>
              <div className="hidden self-center sm:block">
                <p className="font-mono-archive text-[9px] uppercase tracking-[.12em] text-muted-foreground">{project.company}</p>
                <p className="mt-2 text-sm text-foreground/75">{project.category}</p>
              </div>
              <ArrowUpRight size={17} strokeWidth={1.3} className="project-arrow mt-1 justify-self-end text-muted-foreground" />
            </Link>
          ))}
        </div>
        {visibleProjects.length === 0 && (
          <div className="border-b border-border py-20 text-center">
            <p className="font-editorial text-3xl">Nothing filed here yet.</p>
            <button type="button" onClick={() => setFilter('All work')} className="mt-5 border-b border-accent pb-1 font-mono-archive text-[10px] uppercase tracking-[.14em] text-accent" data-testid="button-reset-filter">View all work</button>
          </div>
        )}
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 pb-12 pt-24 sm:px-10 md:grid-cols-[1fr_1.4fr] md:pb-28 md:pt-40 lg:px-16">
        <div>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">Archive note</p>
          <ArrowDown className="mt-8 text-muted-foreground" size={18} strokeWidth={1.2} />
        </div>
        <p className="max-w-2xl font-editorial text-[clamp(2.3rem,4.5vw,4.5rem)] leading-[.95] tracking-[-.03em]">
          The best product work is often invisible. This archive makes the thinking legible.
        </p>
      </section>
    </div>
  );
}