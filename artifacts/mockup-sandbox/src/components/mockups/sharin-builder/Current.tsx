import { useMemo, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './_group.css';

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

const publishedProjects = [
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
    description: 'MVP: multimodal search and product comparison. Later explorations: virtual try-on and in-agent checkout.',
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
    slug: 'similar-designers',
    title: 'Similar Designers',
    company: 'The RealReal',
    category: 'Discovery / Recommendations',
    description: 'Making a designer page a doorway to the next designer someone might love.',
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

function matchesFilter(category: string, filter: string) {
  if (filter === 'All') return true;
  if (filter === 'Discovery') return category.includes('Discovery') || category.includes('Browse');
  if (filter === 'Commerce') return category.includes('Commerce') || category.includes('Browse');
  return category.includes('AI');
}

export function Current() {
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(
    () => publishedProjects.filter((project) => matchesFilter(project.category, filter)),
    [filter],
  );
  const closeMenu = () => setMenuOpen(false);
  const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="sharin-current archive-noise min-h-screen min-h-[100dvh] bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-border px-6 py-5 sm:px-10 lg:px-16">
        <a href="/" onClick={(event) => { event.preventDefault(); closeMenu(); }} className="archive-link group flex items-baseline gap-2" data-testid="link-home">
          <span className="font-editorial text-[1.5rem] leading-none tracking-[-.03em]">Sharin Khander</span>
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-30 flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          data-testid="button-toggle-navigation"
        >
          {menuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => event.preventDefault()}
              className={`archive-link font-mono-archive text-[10px] uppercase tracking-[.18em] ${link.href === '/' ? 'text-accent' : 'text-muted-foreground'}`}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </header>
      {menuOpen && (
        <nav id="mobile-navigation" className="absolute inset-x-0 top-[65px] z-20 border-y border-border bg-background px-6 py-6 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => { event.preventDefault(); closeMenu(); }}
                className={`font-editorial text-3xl ${link.href === '/' ? 'text-accent' : 'text-foreground'}`}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
      <main>
        <div className="page-reveal">
          <section className="work-hero mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-8 px-6 pb-16 pt-14 sm:px-10 md:grid-cols-[1.2fr_.8fr] md:items-end md:gap-12 md:pb-20 md:pt-20 lg:px-16">
            <div>
              <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">Product work / 01—{String(publishedProjects.length).padStart(2, '0')}</p>
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

            <div className="work-list border-t border-border">
              <div className="flex items-center justify-between gap-3 py-4 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground">
                <span className="bg-muted px-2.5 py-1 text-foreground">The RealReal</span><span>{visibleProjects.length} projects</span>
              </div>
              {visibleProjects.map((project) => {
                const projectIndex = publishedProjects.findIndex((item) => item.slug === project.slug);
                return (
                  <a
                    href={`/work/${project.slug}`}
                    onClick={(event) => event.preventDefault()}
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
                  </a>
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
      </main>
      <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 border-t border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <p className="font-editorial text-xl leading-none">Sharin Khander</p>
        <p className="font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Product work · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}