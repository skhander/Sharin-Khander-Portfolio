import { useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react';
import './mobile-index.css';

const filters = ['All', 'Redesigns', 'Machine Learning', '0 → 1', 'LLMs', 'Internal Tools'];

const projects = [
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
  },
];

function matchesFilter(badges: string[], filter: string) {
  return filter === 'All' || badges.includes(filter);
}

export function MobileIndex() {
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(
    () => projects.filter((project) => matchesFilter(project.badges, filter)),
    [filter],
  );
  const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="mi-shell">
      <header className="mi-header">
        <a href="/" onClick={(event) => event.preventDefault()} className="mi-wordmark">Sharin Khander<span>.</span></a>
        <button
          className="mi-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`mi-nav${menuOpen ? ' mi-nav-open' : ''}`} aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={(event) => { event.preventDefault(); setMenuOpen(false); }}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="mi-intro">
          <p className="mi-eyebrow"><span>Independent product builder</span><span>New York · 2025</span></p>
          <h1>I make the<br /><em>next thing</em><br />feel obvious.</h1>
          <div className="mi-intro-bottom">
            <p>Better ways to shop: easier, more personal, and more fun.</p>
            <a href="#mi-work" className="mi-scroll-link">Explore the work <ArrowDown size={15} /></a>
          </div>
          <div className="mi-rule"><span>Selected product work</span><span>01 — 06</span></div>
        </section>

        <section id="mi-work" className="mi-work" aria-label="Selected project work">
          <div className="mi-filter-head">
            <div>
              <p className="mi-eyebrow">The RealReal / Product work</p>
              <h2>Interfaces<br className="mi-mobile-break" /> in the wild.</h2>
            </div>
            <p className="mi-result-count" aria-live="polite">{String(visibleProjects.length).padStart(2, '0')} projects</p>
          </div>
          <div className="mi-filter-row" role="group" aria-label="Filter projects">
            {filters.map((item) => {
              const count = item === 'All'
                ? projects.length
                : projects.filter((project) => matchesFilter(project.badges, item)).length;
              return (
                <button
                  key={item}
                  type="button"
                  className={`mi-filter${filter === item ? ' mi-filter-active' : ''}`}
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                >
                  {item}<sup>{String(count).padStart(2, '0')}</sup>
                </button>
              );
            })}
          </div>

          <div className="mi-project-grid" aria-live="polite">
            {visibleProjects.map((project) => {
              const index = projects.findIndex((item) => item.slug === project.slug);
              return (
                <article key={project.slug} className={`mi-project mi-project-${index + 1}`}>
                  <figure className="mi-figure">
                    <div className="mi-image-wrap">
                      <img src={project.image} alt={project.imageAlt} loading={index < 2 ? 'eager' : 'lazy'} />
                      <span className="mi-image-number">0{index + 1}</span>
                      <span className="mi-open-mark" aria-hidden="true"><ArrowUpRight size={19} /></span>
                    </div>
                    <figcaption><span>{project.imageNote}</span><span>FIG. 0{index + 1}</span></figcaption>
                  </figure>
                  <div className="mi-project-copy">
                    <p className="mi-project-meta">{project.company}<span> / </span>{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="mi-project-description">{project.description}</p>
                    <div className="mi-badges" aria-label={`${project.title} categories`}>
                      {project.badges.map((badge) => <span key={badge}>{badge}</span>)}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
          {visibleProjects.length === 0 && (
            <div className="mi-empty">
              <p>No projects filed here yet.</p>
              <button type="button" onClick={() => setFilter('All')}>Return to all work <ArrowUpRight size={15} /></button>
            </div>
          )}
        </section>
      </main>

      <footer className="mi-footer">
        <a href="/" onClick={(event) => event.preventDefault()} className="mi-wordmark">Sharin Khander<span>.</span></a>
        <p>Product work · {new Date().getFullYear()}</p>
        <a href="#mi-work" className="mi-back-top">Back to work ↑</a>
      </footer>
    </div>
  );
}