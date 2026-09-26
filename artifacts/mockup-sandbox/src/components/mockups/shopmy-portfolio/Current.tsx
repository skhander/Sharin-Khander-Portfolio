import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Blocks, Braces, Menu, Search, Sparkles, X } from 'lucide-react';
import './_group.css';
import './Current.css';

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

const publishedProjects = [
  {
    slug: 'elevated-experience',
    title: 'Elevated Experience',
    company: 'The RealReal',
    category: 'Browse + PDP',
    description: 'Reimagining shopping around luxury inventory.',
    status: 'published',
  },
  {
    slug: 'attribute-enrichment',
    title: 'Trend, Vibe, Occasion Discovery',
    company: 'The RealReal',
    category: 'AI / Discovery / Curation',
    description: 'Helping shoppers discover fashion by trend, vibe, and occasion.',
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

const projectVisuals: Record<string, {
  src: string;
  alt: string;
  note: string;
  problem: string;
  move: string;
  label?: string;
  evidence?: string;
}> = {
  'elevated-experience': {
    src: '/__mockup/images/shopmy-portfolio-browse-after.webp',
    alt: 'The RealReal luxury handbag browse interface, with a filter control and larger product imagery.',
    note: 'BROWSE / AFTER',
    problem: 'One-of-one luxury items needed a PDP that helped shoppers evaluate the product.',
    move: 'Tested grid against immersive scroll; reversed a save-button change the same day.',
    evidence: 'Winning PDP test: +5% orders / visitor',
  },
  'attribute-enrichment': {
    src: '/__mockup/images/shopmy-portfolio-chanel-top.webp',
    alt: 'A Chanel vintage top listing used to show how product images can be enriched with style attributes.',
    note: 'CATALOG INTELLIGENCE / SOURCE',
    problem: 'Shoppers could not search millions of listings naturally by trend, vibe or occasion.',
    move: 'Owned prompts, taxonomy, evaluation and UAT for AI-generated style attributes.',
    evidence: 'Baseline search test: no lift; measurement strategy changed',
  },
  'ai-discovery': {
    src: '/__mockup/images/shopmy-portfolio-shopping-agent-comparison.png',
    alt: 'Ask TRR product comparison interface showing two diamond tennis bracelets.',
    note: 'SHOPPING AGENT / COMPARISON',
    problem: 'Keyword search made shoppers translate real shopping intent into catalog terms.',
    move: 'Defined agent behavior, core journeys, capabilities and measurement for a discovery MVP.',
    evidence: 'Learning rollout began with 5% of traffic',
  },
  'visual-search': {
    src: '/__mockup/images/shopmy-portfolio-visual-search-ui.png',
    alt: 'Visual Search mobile interface with selectable regions in a reference photo.',
    note: 'VISUAL SEARCH / INTERFACE',
    problem: 'An inspiration photo needed a path into relevant inventory.',
    move: 'Select a region of a reference image to start a visual search.',
    label: 'INTERACTION SHOWN',
  },
  'similar-designers': {
    src: '/__mockup/images/shopmy-portfolio-similar-designers-look.jpg',
    alt: 'An editorial designer look used to illustrate a path between fashion designers.',
    note: 'DESIGNER DISCOVERY / EXAMPLE',
    problem: 'Designer pages could be a dead end for shoppers looking for what to explore next.',
    move: 'Started the MVP with co-browsed designers, not an unproven visual similarity model.',
    evidence: 'Visual and personalized signals were later directions',
  },
  curation: {
    src: '/__mockup/images/shopmy-portfolio-vintage-bridal-lookbook.webp',
    alt: 'The RealReal customer-facing Shop Vintage Bridal lookbook and product grid.',
    note: 'CUSTOMER-FACING LOOKBOOK',
    problem: 'Editorial taste needed a way to connect shoppers with discoverable assortments.',
    move: 'The customer-facing Vintage Bridal lookbook shows one curated shopping experience.',
    label: 'EXPERIENCE SHOWN',
  },
};

function matchesFilter(category: string, filter: string) {
  if (filter === 'All') return true;
  if (filter === 'Discovery') return category.includes('Discovery') || category.includes('Browse');
  if (filter === 'Commerce') return category.includes('Commerce') || category.includes('Browse');
  return category.includes('AI');
}

const navigation = [
  { href: '/', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Current() {
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(
    () => publishedProjects.filter((project) => matchesFilter(project.category, filter)),
    [filter],
  );
  const stopNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault();

  return (
    <div className="shopmy-portfolio-current archive-noise min-h-[100dvh] bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-border px-6 py-5 sm:px-10 lg:px-16">
        <a href="/" onClick={(event) => { stopNavigation(event); setMenuOpen(false); }} className="archive-link group flex items-baseline gap-2" data-testid="link-home">
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
          {navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={stopNavigation}
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
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => { stopNavigation(event); setMenuOpen(false); }}
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
          <div className="editorial-work">
            <section className="work-hero mx-auto w-full max-w-[1440px] px-6 pb-12 pt-10 sm:px-10 md:px-12 md:pb-16 md:pt-16 lg:px-16" aria-labelledby="work-title">
              <div className="work-hero-top">
                <p className="work-eyebrow"><span className="work-status-dot" aria-hidden="true" /> Product portfolio <span>/</span> The RealReal</p>
                <a className="work-scroll-link" href="#selected-work" data-testid="link-explore-selected-work">Explore selected work <ArrowDownRight size={15} aria-hidden="true" /></a>
              </div>
              <div className="work-hero-main">
                <div className="work-hero-title">
                  <p className="work-overline">Strategy <i>×</i> systems <i>×</i> experiences</p>
                  <h1 id="work-title">Product<br />builder<span>.</span></h1>
                  <p className="work-byline">Sharin Khander <span>—</span> product builder with an engineering background.</p>
                </div>
                <div className="work-thesis">
                  <p className="work-thesis-label"><Braces size={14} aria-hidden="true" /> How I think about the work</p>
                  <p className="work-thesis-copy">I build habit-formint experiences people love.</p>
                  <p className="work-thesis-note">A few decisions, tests and rollout signals from the work below.</p>
                  <div className="work-system-map" aria-label="Selected product evidence from the case studies">
                    <span><b>+5%</b> orders / visitor · winning PDP test</span>
                    <span><b>No lift</b> first AI-search test · measurement rethought</span>
                    <span><b>5% traffic</b> shopping agent learning rollout</span>
                  </div>
                </div>
              </div>
              <div className="work-hero-foot">
                <span>Product thinking, scope and trade-offs</span>
                <span className="work-index">SELECTED WORK <b>{String(publishedProjects.length).padStart(2, '0')}</b></span>
              </div>
            </section>
            <section id="selected-work" className="mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:px-12 md:pb-28 lg:px-16" aria-labelledby="work-heading">
              <div className="work-section-head">
                <div>
                  <p className="work-eyebrow"><span>01</span> / Selected product work</p>
                  <h2 id="work-heading">Different problems.<br /><em>Connected systems.</em></h2>
                </div>
                <p className="work-section-intro">From catalog foundations to shopping experiences: the problems, product approaches, and work behind better discovery.</p>
              </div>

              <div className="work-filter-bar">
                <div className="work-filter-label"><Search size={14} aria-hidden="true" /><span>Filter by product area</span></div>
                <div className="work-filters" role="group" aria-label="Filter projects by product area">
                  {filters.map((item) => (
                    <button
                      type="button"
                      key={item}
                      onClick={() => setFilter(item)}
                      className={`work-filter${filter === item ? ' is-active' : ''}`}
                      aria-pressed={filter === item}
                      data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
                <p className="work-result-count" aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? 'case study' : 'case studies'}</p>
              </div>

              <div className="editorial-project-list" aria-live="polite">
                {visibleProjects.map((project) => {
                  const projectIndex = publishedProjects.findIndex((item) => item.slug === project.slug);
                  const visual = projectVisuals[project.slug];
                  if (!visual) throw new Error(`Missing homepage visual for ${project.slug}`);
                  return (
                    <a
                      href={`/work/${project.slug}`}
                      onClick={stopNavigation}
                      key={project.slug}
                      className={`editorial-project project-layout-${projectIndex + 1}`}
                      data-testid={`link-project-${project.slug}`}
                      aria-label={`${project.title}: ${visual.move}. Read case study.`}
                    >
                      <div className="editorial-project-copy">
                        <div className="editorial-project-kicker">
                          <span>{String(projectIndex + 1).padStart(2, '0')} <i>/</i> {project.category}</span>
                          <ArrowUpRight size={17} strokeWidth={1.5} className="project-arrow" aria-hidden="true" />
                        </div>
                        <h3>{project.title}</h3>
                        <p className="editorial-project-description">{visual.problem}</p>
                        <div className="project-work-note"><span className="project-note-icon"><Blocks size={13} aria-hidden="true" /></span><div><small>{visual.label ?? 'PRODUCT WORK'}</small><strong>{visual.move}</strong></div></div>
                        {visual.evidence && <div className="editorial-project-badges"><Sparkles size={12} aria-hidden="true" /><span>{visual.evidence}</span></div>}
                        <span className="project-open">Read case study <ArrowUpRight size={14} aria-hidden="true" /></span>
                      </div>
                      <figure className="editorial-project-visual" data-project={project.slug}>
                        <div className="editorial-project-artwork">
                          <img src={visual.src} alt={visual.alt} loading={projectIndex < 2 ? 'eager' : 'lazy'} />
                          <span className="project-visual-index" aria-hidden="true">{String(projectIndex + 1).padStart(2, '0')}</span>
                        </div>
                        <figcaption><span>{visual.note}</span><span>THE REALREAL</span></figcaption>
                      </figure>
                    </a>
                  );
                })}
              </div>

              {visibleProjects.length === 0 && (
                <div className="work-empty-state">
                  <p>No case studies in this area yet.</p>
                  <button type="button" onClick={() => setFilter('All')} data-testid="button-reset-filter">Show all work</button>
                </div>
              )}
              <div className="work-endnote"><span>06 / PRODUCT SYSTEMS</span><p>Commerce is more than the transaction. It’s the whole path to a confident choice.</p></div>
            </section>
          </div>
        </div>
      </main>
      <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 border-t border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <p className="font-editorial text-xl leading-none">Sharin Khander</p>
        <p className="font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Product work · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}