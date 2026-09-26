import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import './_group.css';
import './Current.css';
import './GalleryIndex.css';

const filters = ['All', 'Redesigns', 'Machine Learning', '0 → 1', 'LLMs', 'Internal Tools'];

const publishedProjects = [
  {
    slug: 'elevated-experience',
    title: 'Elevated Experience',
    company: 'The RealReal',
    category: 'Browse + PDP',
    description: 'Reimagining shopping around luxury inventory.',
    badges: ['Redesigns'],
    image: '/__mockup/images/current-elevated-browse.webp',
    imageAlt: 'The RealReal luxury handbag browse interface',
    imageNote: 'PRODUCT INTERFACE',
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
    badges: ['0 → 1', 'Machine Learning', 'LLMs'],
    image: '/__mockup/images/current-attribute-enrichment-chanel-top.webp',
    imageAlt: 'Chanel vintage top product visual used in the attribute-enrichment project',
    imageNote: 'ATTRIBUTE ENRICHMENT / SOURCE VISUAL',
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
    badges: ['Machine Learning', '0 → 1'],
    image: '/__mockup/images/current-shopping-agent-comparison.png',
    imageAlt: 'Ask TRR mobile comparison interface showing two lab-grown diamond tennis bracelets and product details',
    imageNote: 'ASK TRR / PRODUCT COMPARISON',
    status: 'published',
  },
  {
    slug: 'visual-search',
    title: 'Visual Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
    description: 'Turning inspiration into product discovery.',
    badges: ['Machine Learning', '0 → 1'],
    image: '/__mockup/images/current-visual-search-ui.png',
    imageAlt: 'Visual Search mobile camera interface showing selectable regions in a photo',
    imageNote: 'VISUAL SEARCH / SOURCE INTERFACE',
    status: 'published',
  },
  {
    slug: 'similar-designers',
    title: 'Similar Designers',
    company: 'The RealReal',
    category: 'Discovery / Recommendations',
    description: 'Making a designer page a doorway to the next designer someone might love.',
    badges: ['Recommendations'],
    image: '/__mockup/images/current-similar-designers-look.jpg',
    imageAlt: 'A minimal designer look used for a designer-discovery visual',
    imageNote: 'DESIGNER LOOKBOOK',
    status: 'published',
  },
  {
    slug: 'curation',
    title: 'Curation',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
    description: 'Scaling editorial taste into product discovery.',
    badges: ['Machine Learning', 'Internal Tools'],
    image: '/__mockup/images/current-curation-vintage-bridal-lookbook.webp',
    imageAlt: 'The RealReal customer-facing vintage bridal lookbook',
    imageNote: 'ACTUAL CUSTOMER-FACING LOOKBOOK',
    status: 'published',
  },
];

function matchesFilter(badges: string[], filter: string) {
  if (filter === 'All') return true;
  return badges.includes(filter);
}

export function GalleryIndex() {
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const visibleProjects = useMemo(
    () => publishedProjects.filter((project) => matchesFilter(project.badges, filter)),
    [filter],
  );
  const closeMenu = () => setMenuOpen(false);
  const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  useEffect(() => {
    setActiveSlide(0);
    galleryRef.current?.scrollTo({ left: 0, behavior: 'smooth' });
  }, [filter]);

  const goToSlide = (index: number) => {
    const safeIndex = Math.max(0, Math.min(index, visibleProjects.length - 1));
    slideRefs.current[safeIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    setActiveSlide(safeIndex);
  };

  const updateActiveSlide = () => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    const galleryStart = gallery.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;
    slideRefs.current.slice(0, visibleProjects.length).forEach((slide, index) => {
      if (!slide) return;
      const distance = Math.abs(slide.getBoundingClientRect().left - galleryStart);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setActiveSlide(closestIndex);
  };

  return (
    <div className="sharin-current sharin-gallery-index min-h-screen min-h-[100dvh] bg-background text-foreground">
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
            <div className="work-band current-work-band flex flex-col gap-5 bg-[hsl(var(--olive-surface))] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div>
                <p className="font-mono-archive text-[9px] uppercase tracking-[.16em] text-muted-foreground">Project index / 01—06</p>
                <h2 id="work-heading" className="mt-2 font-editorial text-[clamp(2.3rem,4vw,3.8rem)] leading-none tracking-[-.035em]">Selected work</h2>
              </div>
              <div className="current-filters" role="group" aria-label="Filter projects">
                {filters.map((item) => {
                  const count = item === 'All'
                    ? publishedProjects.length
                    : publishedProjects.filter((project) => matchesFilter(project.badges, item)).length;
                  return (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`current-filter${filter === item ? ' is-active' : ''}`}
                      aria-pressed={filter === item}
                      data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}
                    >
                      <span>{item}</span><small>{String(count).padStart(2, '0')}</small>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="current-project-header">
              <span>The RealReal / Product work</span>
              <span>{visibleProjects.length} {visibleProjects.length === 1 ? 'project' : 'projects'}</span>
            </div>

            {visibleProjects.length > 0 && (
              <>
                <nav className="gallery-index-nav" aria-label="Jump to a project">
                  <span className="gallery-index-label">Browse the work</span>
                  <div className="gallery-index-items">
                    {visibleProjects.map((project, index) => {
                      const projectIndex = publishedProjects.findIndex((item) => item.slug === project.slug);
                      return (
                        <button
                          type="button"
                          key={project.slug}
                          onClick={() => goToSlide(index)}
                          aria-current={activeSlide === index ? 'true' : undefined}
                          aria-label={`View ${project.title}`}
                          className="gallery-index-item"
                        >
                          <span>{String(projectIndex + 1).padStart(2, '0')}</span>
                          <span>{project.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </nav>

                <div className="gallery-rail-shell">
                  <div className="gallery-controls" aria-label="Gallery controls">
                    <span className="gallery-position"><span>{String(activeSlide + 1).padStart(2, '0')}</span> / {String(visibleProjects.length).padStart(2, '0')}</span>
                    <div className="gallery-control-buttons">
                      <button type="button" onClick={() => goToSlide(activeSlide - 1)} disabled={activeSlide === 0} aria-label="Previous project">
                        <ArrowLeft size={17} strokeWidth={1.5} />
                      </button>
                      <button type="button" onClick={() => goToSlide(activeSlide + 1)} disabled={activeSlide >= visibleProjects.length - 1} aria-label="Next project">
                        <ArrowRight size={17} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  <div className="gallery-rail" ref={galleryRef} onScroll={updateActiveSlide} aria-live="polite">
                    {visibleProjects.map((project) => {
                      const projectIndex = publishedProjects.findIndex((item) => item.slug === project.slug);
                      return (
                        <article
                          key={project.slug}
                          className="gallery-slide"
                          ref={(element) => { slideRefs.current[visibleProjects.indexOf(project)] = element; }}
                          data-testid={`project-${project.slug}`}
                        >
                          <figure className="gallery-visual" data-project={project.slug}>
                            <div className="gallery-artwork">
                              <img
                                src={project.image}
                                alt={project.imageAlt}
                                loading={projectIndex < 2 ? 'eager' : 'lazy'}
                              />
                              <span className="gallery-image-index" aria-hidden="true">{String(projectIndex + 1).padStart(2, '0')}</span>
                            </div>
                            <figcaption><span>{project.imageNote}</span><span>FIG. {String(projectIndex + 1).padStart(2, '0')}</span></figcaption>
                          </figure>
                          <div className="gallery-caption">
                            <div className="gallery-caption-heading">
                              <div className="gallery-caption-title">
                                <p className="gallery-category">{project.category}</p>
                                <h3>{project.title}</h3>
                              </div>
                              <ArrowUpRight size={19} strokeWidth={1.5} aria-hidden="true" />
                            </div>
                            <p className="gallery-description">{project.description}</p>
                            <div className="current-project-badges" aria-label={`${project.title} badges`}>
                              {project.badges.map((badge) => <span key={badge}>{badge}</span>)}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {visibleProjects.length === 0 && (
              <div className="current-project-empty">
                <p className="font-editorial text-3xl">No projects in this filter.</p>
                <button type="button" onClick={() => setFilter('All')} data-testid="button-reset-filter">View all work <ArrowUpRight size={14} /></button>
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