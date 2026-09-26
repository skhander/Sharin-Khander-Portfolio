import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Menu, Search, X } from 'lucide-react';
import './_group.css';
import './ShopMyDirection.css';

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

const publishedProjects = [
  {
    slug: 'elevated-experience',
    title: 'Elevated Experience',
    category: 'Browse + PDP',
  },
  {
    slug: 'attribute-enrichment',
    title: 'Trend, Vibe, Occasion Discovery',
    category: 'AI / Discovery / Curation',
  },
  {
    slug: 'ai-discovery',
    title: 'Shopping Agent',
    category: 'AI / Discovery / Commerce',
  },
  {
    slug: 'visual-search',
    title: 'Visual Search',
    category: 'AI / Discovery',
  },
  {
    slug: 'similar-designers',
    title: 'Similar Designers',
    category: 'Discovery / Recommendations',
  },
  {
    slug: 'curation',
    title: 'Curation',
    category: 'Discovery / Personalization',
  },
];

const projectVisuals: Record<string, {
  src: string;
  alt: string;
  note: string;
  problem: string;
  move?: string;
}> = {
  'elevated-experience': {
    src: '/__mockup/images/shopmy-portfolio-browse-after.webp',
    alt: 'The RealReal luxury handbag browse interface, with a filter control and larger product imagery.',
    note: 'BROWSE / AFTER',
    problem: 'One-of-one pieces are harder to judge in a product grid.',
    move: 'Tested grid vs. immersive PDP; restored the save control the same day.',
  },
  'attribute-enrichment': {
    src: '/__mockup/images/shopmy-portfolio-chanel-top.webp',
    alt: 'A Chanel vintage top listing used to show how product images can be enriched with style attributes.',
    note: 'CATALOG INTELLIGENCE / SOURCE',
    problem: 'Millions of listings. Shoppers search by trend, vibe and occasion.',
    move: 'Owned prompt design, taxonomy, evaluation and UAT.',
  },
  'ai-discovery': {
    src: '/__mockup/images/shopmy-portfolio-shopping-agent-comparison.png',
    alt: 'Ask TRR product comparison interface showing two diamond tennis bracelets.',
    note: 'SHOPPING AGENT / COMPARISON',
    problem: 'Keyword search makes shoppers translate intent into catalog terms.',
    move: 'Defined agent behavior, core journeys, capabilities and measurement.',
  },
  'visual-search': {
    src: '/__mockup/images/shopmy-portfolio-visual-search-ui.png',
    alt: 'Visual Search mobile interface with selectable regions in a reference photo.',
    note: 'SELECTABLE IMAGE REGIONS',
    problem: 'Find a product inside a reference photo.',
  },
  'similar-designers': {
    src: '/__mockup/images/shopmy-portfolio-similar-designers-look.jpg',
    alt: 'An editorial designer look used to illustrate a path between fashion designers.',
    note: 'RECOMMENDATIONS / EXAMPLE',
    problem: 'A designer page could end the browse journey.',
    move: 'MVP signal: designers shopped together—not visual similarity.',
  },
  curation: {
    src: '/__mockup/images/shopmy-portfolio-vintage-bridal-lookbook.webp',
    alt: 'The RealReal customer-facing Shop Vintage Bridal lookbook and product grid.',
    note: 'SHOP VINTAGE BRIDAL',
    problem: 'Editorial theme linked to shoppable inventory.',
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

export function ShopMyDirection() {
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(
    () => publishedProjects.filter((project) => matchesFilter(project.category, filter)),
    [filter],
  );
  const stopNavigation = (event: { preventDefault: () => void }) => event.preventDefault();

  return (
    <div className="shopmy-portfolio-current shopmy-portfolio-direction archive-noise min-h-[100dvh]">
      <header className="direction-header direction-shell">
        <a
          href="/"
          onClick={(event) => { stopNavigation(event); setMenuOpen(false); }}
          className="direction-wordmark"
          data-testid="link-home"
          aria-label="Sharin Khander, selected work"
        >
          Sharin Khander
        </a>
        <nav className="direction-nav" aria-label="Primary navigation">
          {navigation.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={stopNavigation}
              aria-current={link.href === '/' ? 'page' : undefined}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="direction-menu"
          aria-expanded={menuOpen}
          aria-controls="shopmy-mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          data-testid="button-toggle-navigation"
        >
          {menuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>
        {menuOpen && (
          <nav id="shopmy-mobile-navigation" className="direction-mobile-nav" aria-label="Mobile navigation">
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(event) => { stopNavigation(event); setMenuOpen(false); }}
                aria-current={link.href === '/' ? 'page' : undefined}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main className="direction-reveal">
        <section className="direction-hero direction-shell" aria-labelledby="direction-title">
          <div className="direction-hero-meta">
            <a className="direction-hero-link" href="#selected-work" data-testid="link-explore-selected-work">
              Projects <ArrowDownRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="direction-hero-grid">
            <div className="direction-hero-copy">
              <h1 id="direction-title" className="direction-title">Luxury discovery<span>.</span></h1>
              <p className="direction-byline">Engineering-led products at The RealReal, from browse to AI agents.</p>
            </div>
            <figure className="direction-feature-visual">
              <div className="direction-feature-image">
                <img
                  src={projectVisuals['similar-designers'].src}
                  alt={projectVisuals['similar-designers'].alt}
                  fetchPriority="high"
                />
              </div>
              <figcaption>
                <strong>Similar Designers</strong>
              </figcaption>
            </figure>
          </div>
          <div className="direction-proof-strip" aria-label="Selected product evidence from the case studies">
              <p><small>PDP test</small><strong>+5%</strong><span>orders / visitor</span></p>
              <p><small>AI search test</small><strong>No lift</strong><span>measurement revised</span></p>
              <p><small>Agent rollout plan</small><strong>5%</strong><span>of traffic</span></p>
          </div>
        </section>

        <section id="selected-work" className="direction-work direction-shell" aria-labelledby="direction-work-heading">
          <div className="direction-section-head">
            <h2 id="direction-work-heading">Selected work</h2>
          </div>

          <div className="direction-filter-bar">
            <div className="direction-filter-label"><Search size={14} aria-hidden="true" /><span>Filter</span></div>
            <div className="direction-filters" role="group" aria-label="Filter projects by product area">
              {filters.map((item) => (
                <button
                  type="button"
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`direction-filter${filter === item ? ' is-active' : ''}`}
                  aria-pressed={filter === item}
                  data-testid={`button-filter-${item.toLowerCase().replaceAll(' ', '-')}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <p className="direction-count" aria-live="polite">{visibleProjects.length} {visibleProjects.length === 1 ? 'case study' : 'case studies'}</p>
          </div>

          <div className="direction-project-list" aria-live="polite">
            {visibleProjects.map((project) => {
              const projectIndex = publishedProjects.findIndex((item) => item.slug === project.slug);
              const visual = projectVisuals[project.slug];
              if (!visual) throw new Error(`Missing homepage visual for ${project.slug}`);
              return (
                <a
                  href={`/work/${project.slug}`}
                  onClick={stopNavigation}
                  key={project.slug}
                  className={`direction-project layout-${projectIndex + 1}`}
                  data-testid={`link-project-${project.slug}`}
                  aria-label={`${project.title}: ${visual.problem}${visual.move ? ` ${visual.move}` : ''} Read case study.`}
                >
                  <div className="direction-project-copy">
                    <div className="direction-project-kicker">
                      <span>{String(projectIndex + 1).padStart(2, '0')} <i>/</i> {project.category}</span>
                      <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3>{project.title}</h3>
                    <p className="direction-project-description">{visual.problem}</p>
                    {visual.move && <div className="direction-work-note"><strong>{visual.move}</strong></div>}
                  </div>
                  <figure className="direction-visual" data-project={project.slug}>
                    <div className="direction-artwork">
                      <img src={visual.src} alt={visual.alt} loading={projectIndex < 2 ? 'eager' : 'lazy'} />
                    </div>
                    <figcaption><span>{visual.note}</span></figcaption>
                  </figure>
                </a>
              );
            })}
          </div>

          {visibleProjects.length === 0 && (
            <div className="direction-empty">
              <p>No case studies in this area yet.</p>
              <button type="button" onClick={() => setFilter('All')} data-testid="button-reset-filter">Show all work</button>
            </div>
          )}
        </section>
      </main>

      <footer className="direction-footer">
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}