import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Blocks, Menu, Search, Sparkles, X } from 'lucide-react';
import './_group.css';
import './ShopMyDirection.css';

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

const publishedProjects = [
  {
    slug: 'elevated-experience',
    title: 'Elevated Experience',
    company: 'The RealReal',
    category: 'Browse + PDP',
  },
  {
    slug: 'attribute-enrichment',
    title: 'Trend, Vibe, Occasion Discovery',
    company: 'The RealReal',
    category: 'AI / Discovery / Curation',
  },
  {
    slug: 'ai-discovery',
    title: 'Shopping Agent',
    company: 'The RealReal',
    category: 'AI / Discovery / Commerce',
  },
  {
    slug: 'visual-search',
    title: 'Visual Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
  },
  {
    slug: 'similar-designers',
    title: 'Similar Designers',
    company: 'The RealReal',
    category: 'Discovery / Recommendations',
  },
  {
    slug: 'curation',
    title: 'Curation',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
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
    problem: 'One-of-one luxury items needed a product page that helped shoppers evaluate a piece.',
    move: 'Tested grid against immersive scroll; reversed a save-button change the same day.',
    evidence: 'Winning PDP test: +5% orders / visitor',
  },
  'attribute-enrichment': {
    src: '/__mockup/images/shopmy-portfolio-chanel-top.webp',
    alt: 'A Chanel vintage top listing used to show how product images can be enriched with style attributes.',
    note: 'CATALOG INTELLIGENCE / SOURCE',
    problem: 'Shoppers needed more natural ways to search listings by trend, vibe or occasion.',
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
    problem: 'A reference image can be a starting point for product discovery.',
    move: 'The interface shows selectable regions within a reference photo.',
    label: 'INTERFACE SHOWN',
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
    problem: 'The Shop Vintage Bridal lookbook connects an editorial theme with shoppable inventory.',
    move: 'Customer-facing Vintage Bridal lookbook and product grid shown.',
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
          <small>Product · discovery · commerce</small>
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
            <p className="direction-eyebrow"><span className="direction-dot" aria-hidden="true" /> Product portfolio <b>/</b> The RealReal</p>
            <a className="direction-hero-link" href="#selected-work" data-testid="link-explore-selected-work">
              Explore selected work <ArrowDownRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="direction-hero-grid">
            <div className="direction-hero-copy">
              <p className="direction-title-overline">Strategy <span>×</span> systems <span>×</span> experiences</p>
              <h1 id="direction-title" className="direction-title">Product<br /><em>builder.</em></h1>
              <p className="direction-byline"><b>Sharin Khander</b> — product builder with an engineering background, working at the intersection of luxury discovery and commerce.</p>
            </div>
            <figure className="direction-feature-visual">
              <div className="direction-feature-image">
                <img
                  src={projectVisuals['similar-designers'].src}
                  alt={projectVisuals['similar-designers'].alt}
                  fetchPriority="high"
                />
                <span className="direction-feature-index" aria-hidden="true">02</span>
              </div>
              <figcaption>
                <span><small>FROM THE WORK</small><strong>Similar Designers</strong></span>
                <span className="direction-feature-caption">DESIGNER DISCOVERY / EXAMPLE</span>
              </figcaption>
            </figure>
          </div>
          <div className="direction-proof-strip" aria-label="Selected product evidence from the case studies">
            <div className="direction-proof-intro">
              <Blocks size={14} aria-hidden="true" />
              <span>Human taste,<br />measured in product.</span>
            </div>
            <p><small>Winning PDP test</small><strong>+5%</strong><span>orders / visitor</span></p>
            <p><small>First AI-search test</small><strong>No lift</strong><span>measurement strategy changed</span></p>
            <p><small>Shopping agent</small><strong>5%</strong><span>traffic learning rollout</span></p>
          </div>
          <div className="direction-hero-footer">
            <span>Product thinking, scope and trade-offs</span>
            <span>SELECTED WORK <strong>{String(publishedProjects.length).padStart(2, '0')}</strong></span>
          </div>
        </section>

        <section id="selected-work" className="direction-work direction-shell" aria-labelledby="direction-work-heading">
          <div className="direction-section-head">
            <div>
              <p className="direction-section-index"><b>01</b> / Selected product work</p>
              <h2 id="direction-work-heading">Human taste.<br /><em>Product rigor.</em></h2>
            </div>
            <p className="direction-section-intro">A closer look at the decisions, tests and systems behind luxury discovery—from richer catalog foundations to more confident ways to shop.</p>
          </div>

          <div className="direction-filter-bar">
            <div className="direction-filter-label"><Search size={14} aria-hidden="true" /><span>Filter by product area</span></div>
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
                  aria-label={`${project.title}: ${visual.move}. Read case study.`}
                >
                  <div className="direction-project-copy">
                    <div className="direction-project-kicker">
                      <span>{String(projectIndex + 1).padStart(2, '0')} <i>/</i> {project.category}</span>
                      <ArrowUpRight size={17} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                    <h3>{project.title}</h3>
                    <p className="direction-project-description">{visual.problem}</p>
                    <div className="direction-work-note">
                      <span className="direction-work-icon"><Blocks size={13} aria-hidden="true" /></span>
                      <div><small>{visual.label ?? 'PRODUCT WORK'}</small><strong>{visual.move}</strong></div>
                    </div>
                    {visual.evidence && <p className="direction-evidence"><Sparkles size={12} aria-hidden="true" /><span>{visual.evidence}</span></p>}
                    <span className="direction-open">Read case study <ArrowUpRight size={14} aria-hidden="true" /></span>
                  </div>
                  <figure className="direction-visual" data-project={project.slug}>
                    <div className="direction-artwork">
                      <img src={visual.src} alt={visual.alt} loading={projectIndex < 2 ? 'eager' : 'lazy'} />
                      <span className="direction-image-index" aria-hidden="true">{String(projectIndex + 1).padStart(2, '0')}</span>
                    </div>
                    <figcaption><span>{visual.note}</span><span>{project.company}</span></figcaption>
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
          <div className="direction-endnote">
            <span className="direction-endnote-label">06 / Product systems</span>
            <p>Commerce is more than the transaction. It’s the whole path to a confident choice.</p>
          </div>
        </section>
      </main>

      <footer className="direction-footer">
        <p className="direction-footer-name">Sharin Khander</p>
        <p className="direction-footer-note">Product work · {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}