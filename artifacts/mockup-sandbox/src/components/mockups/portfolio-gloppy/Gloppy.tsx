import { useMemo, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import './_group.css';
import './Gloppy.css';

const projects = [
  { slug: 'elevated-experience', title: 'Elevated Experience', category: 'Browse + PDP', description: 'Reimagining shopping around luxury inventory.' },
  { slug: 'attribute-enrichment', title: 'Trend, Vibe, Occasion Discovery', category: 'AI / Discovery / Curation', description: 'Helping shoppers discover fashion by trend, vibe, and occasion.' },
  { slug: 'ai-discovery', title: 'Shopping Agent', category: 'AI / Discovery / Commerce', description: 'Multimodal search, product comparison, virtual try-on, and in-agent checkout.' },
  { slug: 'visual-search', title: 'Visual Search', category: 'AI / Discovery', description: 'Turning inspiration into product discovery.' },
  { slug: 'checkout', title: 'Checkout', category: 'Commerce', description: 'Improving the path from product discovery to purchase.' },
  { slug: 'curation', title: 'Curation', category: 'Discovery / Personalization', description: 'Scaling editorial taste into product discovery.' },
];

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

function matchesFilter(category: string, filter: string) {
  if (filter === 'All') return true;
  if (filter === 'Discovery') return category.includes('Discovery') || category.includes('Browse');
  if (filter === 'Commerce') return category.includes('Commerce') || category.includes('Browse');
  return category.includes('AI');
}

const noNavigate = (event: React.MouseEvent<HTMLAnchorElement>) => event.preventDefault();

export function Gloppy() {
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(() => projects.filter((project) => matchesFilter(project.category, filter)), [filter]);
  const links = ['Work', 'About', 'Contact'];

  return (
    <div className="gloppy">
      <header className="gloppy-topline">
        <a href="#" onClick={noNavigate} className="gloppy-brand" aria-label="Sharin Khander home">
          <span className="gloppy-brand-mark" aria-hidden="true" /> <span>Sharin Khander</span>
        </a>
        <nav className="gloppy-nav" aria-label="Primary navigation">
          {links.map((link) => <a key={link} href={link === 'Work' ? '#selected-work' : '#footer'} onClick={noNavigate}>{link}</a>)}
        </nav>
        <button className="gloppy-menu-button" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="gloppy-mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {menuOpen && <nav id="gloppy-mobile-navigation" className="gloppy-mobile-nav" aria-label="Mobile navigation">
          {links.map((link) => <a key={link} href={link === 'Work' ? '#selected-work' : '#footer'} onClick={() => setMenuOpen(false)}>{link}</a>)}
        </nav>}
      </header>
      <main>
        <section className="gloppy-hero" aria-labelledby="gloppy-title">
          <span className="gloppy-orbit" aria-hidden="true" />
          <p className="gloppy-eyebrow">Product work / 01—06 <span>·</span> The RealReal</p>
          <h1 id="gloppy-title" className="gloppy-display"><span>Sharin</span><span className="gloppy-second">Khander<span className="gloppy-dot">.</span></span></h1>
          <span className="gloppy-sticker">Good taste<br />is a system</span>
          <div className="gloppy-hero-note">
            <p className="role">Product builder · Shopping futures</p>
            <p>I build better ways to shop. Easier, more personal, and more fun.</p>
          </div>
        </section>
        <div className="gloppy-marquee" aria-hidden="true"><div className="gloppy-marquee-track">
          {Array.from({ length: 2 }, (_, index) => <span key={index}>SHOPPING, REWIRED <span>×</span> GOOD TASTE, AT SCALE <span>×</span> PRODUCT WORK / 2026 <span>×</span></span>)}
        </div></div>
        <section className="gloppy-work" id="selected-work" aria-labelledby="gloppy-work-heading">
          <div className="gloppy-work-head">
            <div><p className="gloppy-kicker">A point of view in six parts</p><h2 id="gloppy-work-heading" className="gloppy-display">Selected work<span>.</span></h2></div>
            <div className="gloppy-filter-wrap">
              <span className="gloppy-filter-label">Sort the signal</span>
              <div className="gloppy-filters" role="group" aria-label="Filter projects">
                {filters.map((item) => <button type="button" key={item} onClick={() => setFilter(item)} className="gloppy-filter" aria-pressed={filter === item}>{item}</button>)}
              </div>
            </div>
          </div>
          <div className="gloppy-indexline"><strong>The RealReal</strong><span aria-live="polite">{visibleProjects.length} projects / {filter}</span></div>
          <div className="gloppy-projects">
            {visibleProjects.map((project) => {
              const projectIndex = projects.findIndex((item) => item.slug === project.slug);
              return <a href="#" onClick={noNavigate} key={project.slug} className="gloppy-project">
                <span className="gloppy-number">{String(projectIndex + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="gloppy-display">{project.title}</h3>
                  <span className="gloppy-category">{project.category}</span>
                  <p className="gloppy-mobile-description">{project.description}</p>
                </div>
                <p className="gloppy-description">{project.description}</p>
                <span className="gloppy-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </a>;
            })}
          </div>
          {visibleProjects.length === 0 && <div className="gloppy-empty">No projects in this filter.<button type="button" onClick={() => setFilter('All')}>View all</button></div>}
        </section>
      </main>
      <footer className="gloppy-footer" id="footer"><span className="gloppy-footer-name">Sharin Khander</span><span>Product work · 2026</span><a href="#selected-work">Back to work ↑</a></footer>
    </div>
  );
}