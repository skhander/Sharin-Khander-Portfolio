import { useMemo, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Blocks, Braces, Search, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { publishedProjects } from '@/lib/projects';
import { usePageMeta } from '@/lib/use-page-meta';
import './editorial-work.css';

const filters = ['All', 'Discovery', 'Commerce', 'AI'];

const projectVisuals: Record<string, { src: string; alt: string; note: string; problem: string; move: string; label?: string; evidence?: string }> = {
  'elevated-experience': {
    src: '/media/browse-after.webp',
    alt: 'The RealReal luxury handbag browse interface, with a filter control and larger product imagery.',
    note: 'BROWSE / AFTER',
    problem: 'One-of-one luxury items needed a PDP that helped shoppers evaluate the product.',
    move: 'Tested grid against immersive scroll; reversed a save-button change the same day.',
    evidence: 'Winning PDP test: +5% orders / visitor',
  },
  'attribute-enrichment': {
    src: '/media/attribute-enrichment/chanel-top.webp',
    alt: 'A Chanel vintage top listing used to show how product images can be enriched with style attributes.',
    note: 'CATALOG INTELLIGENCE / SOURCE',
    problem: 'Shoppers could not search millions of listings naturally by trend, vibe or occasion.',
    move: 'Owned prompts, taxonomy, evaluation and UAT for AI-generated style attributes.',
    evidence: 'Baseline search test: no lift; measurement strategy changed',
  },
  'ai-discovery': {
    src: '/media/work/shopping-agent-comparison.png',
    alt: 'Ask TRR product comparison interface showing two diamond tennis bracelets.',
    note: 'SHOPPING AGENT / COMPARISON',
    problem: 'Keyword search made shoppers translate real shopping intent into catalog terms.',
    move: 'Defined agent behavior, core journeys, capabilities and measurement for a discovery MVP.',
    evidence: 'Learning rollout began with 5% of traffic',
  },
  'visual-search': {
    src: '/media/work/visual-search-ui.png',
    alt: 'Visual Search mobile interface with selectable regions in a reference photo.',
    note: 'VISUAL SEARCH / INTERFACE',
    problem: 'An inspiration photo needed a path into relevant inventory.',
    move: 'Select a region of a reference image to start a visual search.',
    label: 'INTERACTION SHOWN',
  },
  'similar-designers': {
    src: '/media/work/similar-designers-look.jpg',
    alt: 'An editorial designer look used to illustrate a path between fashion designers.',
    note: 'DESIGNER DISCOVERY / EXAMPLE',
    problem: 'Designer pages could be a dead end for shoppers looking for what to explore next.',
    move: 'Started the MVP with co-browsed designers, not an unproven visual similarity model.',
    evidence: 'Visual and personalized signals were later directions',
  },
  curation: {
    src: '/media/attribute-enrichment/vintage-bridal-lookbook.webp',
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

export default function Work() {
  const [filter, setFilter] = useState('All');
  usePageMeta('Sharin Khander — Product Builder', 'Product work across luxury marketplace browse, AI discovery, shopping agents, visual search, recommendations, and curation.');

  const visibleProjects = useMemo(
    () => publishedProjects.filter((project) => matchesFilter(project.category, filter)),
    [filter],
  );

  return (
    <div className="page-reveal editorial-work">
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
            <p className="work-thesis-copy">I build the product logic behind better ways to shop—not just the screen it lives on.</p>
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
              <Link
                href={`/work/${project.slug}`}
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
              </Link>
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
  );
}