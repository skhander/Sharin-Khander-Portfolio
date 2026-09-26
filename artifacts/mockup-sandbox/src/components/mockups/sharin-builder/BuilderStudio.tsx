import { useMemo, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import './_group.css';
import './BuilderStudio.css';

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

const projects = [
  {
    slug: 'elevated-experience',
    title: 'Elevated Experience',
    company: 'The RealReal',
    category: 'Browse + PDP',
    description: 'Reimagining shopping around luxury inventory.',
    type: 'browse',
    note: 'BROWSE → PRODUCT DETAIL',
    phase: 'PRODUCT DIRECTION',
  },
  {
    slug: 'attribute-enrichment',
    title: 'Trend, Vibe, Occasion Discovery',
    company: 'The RealReal',
    category: 'AI / Discovery / Curation',
    description: 'Helping shoppers discover fashion by trend, vibe, and occasion.',
    type: 'taxonomy',
    note: 'STYLE LANGUAGE → DISCOVERY',
    phase: 'PROMPTS / TAXONOMY / EVALUATION',
  },
  {
    slug: 'ai-discovery',
    title: 'Shopping Agent',
    company: 'The RealReal',
    category: 'AI / Discovery / Commerce',
    description: 'MVP: multimodal search and product comparison. Later explorations: virtual try-on and in-agent checkout.',
    type: 'agent',
    note: 'ASK → COMPARE → DECIDE',
    phase: 'MVP + LATER EXPLORATIONS',
  },
  {
    slug: 'visual-search',
    title: 'Visual Search',
    company: 'The RealReal',
    category: 'AI / Discovery',
    description: 'Turning inspiration into product discovery.',
    type: 'visual',
    note: 'IMAGE → MATCHING ITEMS',
    phase: 'RETRIEVAL PATH',
  },
  {
    slug: 'similar-designers',
    title: 'Similar Designers',
    company: 'The RealReal',
    category: 'Discovery / Recommendations',
    description: 'Making a designer page a doorway to the next designer someone might love.',
    type: 'designers',
    note: 'DESIGNER → NEXT DESIGNER',
    phase: 'CO-BROWSE MVP / NEXT DIRECTIONS',
  },
  {
    slug: 'curation',
    title: 'Curation',
    company: 'The RealReal',
    category: 'Discovery / Personalization',
    description: 'Scaling editorial taste into product discovery.',
    type: 'curation',
    note: 'EDITORIAL SIGNAL → FEED',
    phase: 'CURATION SYSTEM',
  },
];

function matchesFilter(category: string, filter: string) {
  if (filter === 'All') return true;
  if (filter === 'Discovery') return category.includes('Discovery') || category.includes('Browse');
  if (filter === 'Commerce') return category.includes('Commerce') || category.includes('Browse');
  return category.includes('AI');
}

function Artifact({ type }: { type: string }) {
  if (type === 'browse') {
    return (
      <div className="bs-art bs-art-browse" aria-label="A genuine browse interface excerpt from Elevated Experience">
        <div className="bs-browse-top"><span>THE REALREAL</span><span>WOMEN / CLOTHING</span></div>
        <img src="/__mockup/images/browse-after.webp" alt="Genuine browse interface excerpt from the Elevated Experience project" />
        <span className="bs-image-caption">PRODUCT INTERFACE · SOURCE MATERIAL</span>
      </div>
    );
  }
  if (type === 'taxonomy') {
    return (
      <div className="bs-art bs-taxonomy" aria-label="Diagram of style words flowing into discovery">
        <div className="bs-art-head"><span>STYLE INPUT</span><span>01—03</span></div>
        <div className="bs-word-cloud"><span>90s</span><span>occasion</span><span>romantic</span><span>tailored</span><span>color</span></div>
        <div className="bs-flow-rule"><i /><i /><i /></div>
        <div className="bs-tax-output"><span>taxonomy</span><ArrowRight size={13} /><span>search<br />curation<br />recommendations</span></div>
        <span className="bs-pencil-note">a richer language for style ↗</span>
      </div>
    );
  }
  if (type === 'agent') {
    return (
      <div className="bs-art bs-agent" aria-label="Illustrative fashion image alongside a product comparison sketch">
        <img src="/__mockup/images/shopping-agent-look-01.jpg" alt="Illustrative fashion image used in the Shopping Agent guided simulation, not a product screenshot" />
        <div className="bs-agent-sheet">
          <span className="bs-mini-kicker">QUERY / MULTIMODAL</span>
          <p>“Something like this,<br />but softer.”</p>
          <div className="bs-comparison"><b>01</b><i /><span>compare<br />details</span></div>
          <div className="bs-comparison"><b>02</b><i /><span>refine<br />the choice</span></div>
        </div>
        <span className="bs-image-caption">ILLUSTRATIVE IMAGE · NOT PRODUCT UI</span>
      </div>
    );
  }
  if (type === 'visual') {
    return (
      <div className="bs-art bs-visual" aria-label="Visual search retrieval diagram">
        <div className="bs-search-image"><span>INSPIRATION</span><div className="bs-dress-shape" /></div>
        <div className="bs-search-route"><span /><span /><span /><ArrowDown size={14} /></div>
        <div className="bs-match-stack"><span className="bs-match-label">CANDIDATE MATCHES</span><i /><i /><i /></div>
        <span className="bs-pencil-note">signal, not exact duplicate</span>
      </div>
    );
  }
  if (type === 'designers') {
    return (
      <div className="bs-art bs-designer-map" aria-label="Designer recommendation relationship sketch">
        <span className="bs-designer-tag">A DESIGNER PAGE</span>
        <div className="bs-designer-orbit"><i /><i /><i /><b>ROW</b><span>similarity<br />space</span></div>
        <div className="bs-next-designers"><span>LEMAIRE</span><span>TOTEME</span><span>JIL SANDER</span></div>
        <span className="bs-image-caption">EXPLORATION MAP · NOT RANKED RESULTS</span>
      </div>
    );
  }
  return (
    <div className="bs-art bs-curation" aria-label="Editorial to product curation system sketch">
      <div className="bs-curation-editor"><span>EDITORIAL EYE</span><i /><i /><i /></div>
      <div className="bs-curation-connector"><ArrowRight size={15} /><span>selection<br />signals</span><ArrowRight size={15} /></div>
      <div className="bs-curation-feed"><span>DISCOVERY FEED</span><div><i /><i /><i /><i /></div></div>
      <span className="bs-pencil-note">taste, made legible</span>
    </div>
  );
}

export function BuilderStudio() {
  const [filter, setFilter] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const visibleProjects = useMemo(() => projects.filter((project) => matchesFilter(project.category, filter)), [filter]);

  return (
    <div className="sharin-current builder-studio archive-noise">
      <header className="bs-header">
        <a className="bs-wordmark" href="#top" aria-label="Sharin Khander home"><span>Sharin Khander</span></a>
        <div className="bs-header-note">FASHION COMMERCE <span>·</span> PRODUCT WORK</div>
        <button className="bs-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`bs-nav${menuOpen ? ' is-open' : ''}`} aria-label="Page navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work <sup>06</sup></a>
          <a href="#practice" onClick={() => setMenuOpen(false)}>Practice</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        </nav>
      </header>

      <main id="top">
        <section className="bs-hero">
          <div className="bs-hero-copy">
            <p className="bs-eyebrow"><span>PRODUCT WORK</span><span className="bs-eyebrow-rule" /> 01—06</p>
            <h1>Sharin<br />Khander<span className="bs-period">.</span></h1>
            <p className="bs-hero-sub">Fashion-minded product work<br />from first question to the thing in hand.</p>
            <a href="#work" className="bs-scroll-cue"><span>OPEN THE WORK TABLE</span><ArrowDown size={13} /></a>
          </div>
          <div className="bs-workbench">
            <div className="bs-benchtop-label"><span>FIELD NOTE 001</span><span>BUILD / TEST / REFINE</span></div>
            <article className="bs-statement">
              <span className="bs-statement-tape" aria-hidden="true" />
              <div className="bs-statement-meta"><span>01 / POINT OF VIEW</span><span>PRODUCT BUILDER</span></div>
              <h2>Product<br /><em>builder.</em></h2>
              <p>I build better ways to shop.<br />Easier, more personal, more fun.</p>
              <div className="bs-mini-system">
                <div className="bs-system-node"><span>01</span><b>SHOPPER<br />NEED</b></div>
                <i className="bs-system-link" />
                <div className="bs-system-node bs-node-highlight"><span>02</span><b>PRODUCT<br />BET</b></div>
                <i className="bs-system-link" />
                <div className="bs-system-node"><span>03</span><b>IN THE<br />WORLD</b></div>
              </div>
              <span className="bs-statement-foot">FROM OBSERVATION TO WORKING SYSTEM ↗</span>
            </article>
            <div className="bs-workbench-note"><span className="bs-note-pin" />NOT JUST THE PICTURE OF THE DRESS.<br />THE SYSTEM THAT HELPS YOU FIND IT.</div>
            <div className="bs-foil-tab">MADE<br />WITH<br />INTENT</div>
            <div className="bs-bench-index">STUDIO INDEX<br /><b>01—06</b></div>
          </div>
        </section>

        <section id="work" className="bs-work-section">
          <div className="bs-section-heading">
            <div><p className="bs-eyebrow"><span>THE REALREAL</span><span className="bs-eyebrow-rule" /> SELECTED WORK</p><h2>From the<br /><em>work table.</em></h2></div>
            <p className="bs-work-intro">Six ways into a better shopping experience: browse, language, visual signals, and the systems that bring them together.</p>
          </div>
          <div className="bs-work-control">
            <div className="bs-control-label"><span>SPECIMEN INDEX</span><span>{String(visibleProjects.length).padStart(2, '0')} / 06 VISIBLE</span></div>
            <div className="bs-filters" role="group" aria-label="Filter projects">
              {filters.map((item) => (
                <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} data-testid={`button-filter-${item.toLowerCase()}`}>
                  {item}<span>{item === 'All' ? '06' : String(projects.filter((project) => matchesFilter(project.category, item)).length).padStart(2, '0')}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="bs-project-list" aria-live="polite">
            {visibleProjects.map((project) => {
              const index = projects.findIndex((entry) => entry.slug === project.slug) + 1;
              return (
                <article className="bs-project" key={project.slug} data-testid={`project-${project.slug}`}>
                  <div className="bs-project-index"><span>{String(index).padStart(2, '0')}</span><i /></div>
                  <div className="bs-project-story">
                    <div className="bs-project-title-line"><p className="bs-project-kicker">{project.company} <span> / </span>{project.phase}</p><span className="bs-project-direction" aria-hidden="true"><ArrowUpRight size={18} /></span></div>
                    <h3>{project.title}</h3>
                    <p className="bs-project-description">{project.description}</p>
                    <div className="bs-project-tags"><span>{project.category}</span><span>{project.note}</span></div>
                  </div>
                  <div className={`bs-project-art bs-art-${project.type}`}>
                    <Artifact type={project.type} />
                    <span className="bs-art-ref">FIG. {String(index).padStart(2, '0')} <i /> PRODUCT SPECIMEN</span>
                  </div>
                </article>
              );
            })}
            {visibleProjects.length === 0 && <div className="bs-empty"><p>No specimens under this tab.</p><button type="button" onClick={() => setFilter('All')}>Return to all work <ArrowRight size={14} /></button></div>}
          </div>
        </section>

        <section id="practice" className="bs-practice">
          <div className="bs-practice-top"><p className="bs-eyebrow"><span>BUILD NOTES</span><span className="bs-eyebrow-rule" /> A WAY OF WORKING</p><span className="bs-practice-side">NO MAGIC MOMENT.<br />JUST GOOD QUESTIONS, FOLLOWED THROUGH.</span></div>
          <h2>Make the invisible<br /><em>work visible.</em></h2>
          <div className="bs-process">
            {[
              ['01', 'Notice', 'Find the friction hiding inside a familiar ritual.'],
              ['02', 'Frame', 'Give the problem a shape people can act on.'],
              ['03', 'Prototype', 'Put a real interaction in front of someone.'],
              ['04', 'Learn', 'Use what happens to make the next decision.'],
              ['05', 'Ship', 'Carry the details through to the lived product.'],
            ].map(([number, name, copy]) => (
              <div className="bs-process-step" key={number}><span>{number}</span><h3>{name}</h3><p>{copy}</p></div>
            ))}
          </div>
          <div className="bs-material-note"><span className="bs-foil-mark" />THE FOIL MARKS A JOIN: THE POINT WHERE AN IDEA BECOMES SOMETHING SOMEONE CAN USE.</div>
        </section>

        <section id="about" className="bs-about">
          <div className="bs-about-label"><span>ON THE TABLE</span><i /></div>
          <p className="bs-about-statement">Taste gets someone<br />to <em>look closer.</em><br />Good product work gives<br />them a reason to stay.</p>
          <div className="bs-about-aside"><span>SHARIN KHANDER</span><p>Product strategy, direction, and execution for the way people discover and shop fashion.</p><a href="#top">BACK TO THE TOP <ArrowUpRight size={14} /></a></div>
        </section>
      </main>

      <footer className="bs-footer"><span className="bs-footer-name">Sharin Khander</span><span>PRODUCT WORK · {new Date().getFullYear()}</span><a href="#top">INDEX ↑</a></footer>
    </div>
  );
}