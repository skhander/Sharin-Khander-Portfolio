import { useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Compass, MoveUpRight } from 'lucide-react';
import './systems-atlas.css';

const projects = [
  { id: 'browse', number: '01', title: 'Elevated Experience', lane: 'Commerce', tags: ['Discovery', 'Commerce'], category: 'Browse + PDP', label: 'BROWSE → PRODUCT DETAIL', phase: 'PRODUCT DIRECTION', description: 'Reimagining shopping around luxury inventory.', position: 'p-browse', mark: 'THE REALREAL / WOMEN', motif: 'browse' },
  { id: 'language', number: '02', title: 'Trend, Vibe, Occasion Discovery', lane: 'Discovery', tags: ['AI', 'Discovery'], category: 'AI / Discovery / Curation', label: 'STYLE LANGUAGE → DISCOVERY', phase: 'PROMPTS / TAXONOMY / EVALUATION', description: 'Helping shoppers discover fashion by trend, vibe, and occasion.', position: 'p-language', mark: '90s · ROMANTIC · TAILORED', motif: 'language' },
  { id: 'agent', number: '03', title: 'Shopping Agent', lane: 'AI', tags: ['AI', 'Discovery', 'Commerce'], category: 'AI / Discovery / Commerce', label: 'ASK → COMPARE → DECIDE', phase: 'MVP + LATER EXPLORATIONS', description: 'MVP: multimodal search and product comparison. Later explorations: virtual try-on and in-agent checkout.', position: 'p-agent', mark: 'QUERY / MULTIMODAL', motif: 'agent' },
  { id: 'visual', number: '04', title: 'Visual Search', lane: 'AI', tags: ['AI', 'Discovery'], category: 'AI / Discovery', label: 'IMAGE → MATCHING ITEMS', phase: 'RETRIEVAL PATH', description: 'Turning inspiration into product discovery.', position: 'p-visual', mark: 'INSPIRATION / SIGNAL', motif: 'visual' },
  { id: 'designers', number: '05', title: 'Similar Designers', lane: 'Discovery', tags: ['Discovery'], category: 'Discovery / Recommendations', label: 'DESIGNER → NEXT DESIGNER', phase: 'CO-BROWSE MVP / NEXT DIRECTIONS', description: 'Making a designer page a doorway to the next designer someone might love.', position: 'p-designers', mark: 'ROW / SIMILARITY SPACE', motif: 'designers' },
  { id: 'curation', number: '06', title: 'Curation', lane: 'Discovery', tags: ['Discovery'], category: 'Discovery / Personalization', label: 'EDITORIAL SIGNAL → FEED', phase: 'CURATION SYSTEM', description: 'Scaling editorial taste into product discovery.', position: 'p-curation', mark: 'EDITORIAL EYE / FEED', motif: 'curation' },
];

const lanes = ['All pathways', 'Discovery', 'Commerce', 'AI'];
const pathway = ['Shopper need', 'Product bet', 'Prototype', 'In the world'];

function Motif({ type }: { type: string }) {
  if (type === 'browse') return <div className="sa-motif sa-motif-browse"><div className="sa-motif-bar">THE REALREAL <span>WOMEN / CLOTHING</span></div><div className="sa-browse-tiles"><i /><i /><i /><i /></div><span>PRODUCT INTERFACE · SOURCE MATERIAL</span></div>;
  if (type === 'language') return <div className="sa-motif sa-motif-language"><span>90s</span><i>occasion</i><b>romantic</b><em>tailored</em><small>color</small><div>STYLE WORDS <ArrowRight size={12} /> DISCOVERY</div></div>;
  if (type === 'agent') return <div className="sa-motif sa-motif-agent"><span className="sa-micro">QUERY / MULTIMODAL</span><p>“Something like this,<br />but softer.”</p><div><b>01</b><i /> compare details</div><div><b>02</b><i /> refine the choice</div><small>CONCEPTUAL FLOW · NOT PRODUCT UI</small></div>;
  if (type === 'visual') return <div className="sa-motif sa-motif-visual"><div className="sa-inspo"><span>INSPIRATION</span><i /></div><ArrowDownRight /><div className="sa-matches"><span>CANDIDATE MATCHES</span><i /><i /><i /></div><small>signal, not exact duplicate</small></div>;
  if (type === 'designers') return <div className="sa-motif sa-motif-designers"><div className="sa-orbit"><i /><i /><i /><b>ROW</b><span>similarity<br />space</span></div><div className="sa-designer-list"><span>LEMAIRE</span><span>TOTEME</span><span>JIL SANDER</span></div><small>EXPLORATION MAP · NOT RANKED RESULTS</small></div>;
  return <div className="sa-motif sa-motif-curation"><div><span>EDITORIAL EYE</span><i /><i /><i /></div><ArrowRight /><div><span>DISCOVERY FEED</span><section><i /><i /><i /><i /></section></div><small>taste, made legible</small></div>;
}

export function SystemsAtlas() {
  const [lane, setLane] = useState('All pathways');
  const [selected, setSelected] = useState('agent');
  const [activeStep, setActiveStep] = useState(2);
  const visible = projects.filter((project) => lane === 'All pathways' || project.tags.includes(lane));
  const current = projects.find((project) => project.id === selected) ?? projects[0];

  return (
    <div className="systems-atlas">
      <header className="sa-header">
        <a className="sa-wordmark" href="#atlas-top">Sharin Khander</a>
        <div className="sa-header-center">PRODUCT WORK <i /> FASHION COMMERCE</div>
        <a className="sa-index-link" href="#pathway">THE METHOD <ArrowUpRight size={13} /></a>
      </header>

      <main id="atlas-top">
        <section className="sa-opening">
          <div className="sa-opening-copy">
            <p className="sa-eyebrow"><span>PRODUCT SYSTEMS / 001—006</span><i /></p>
            <h1>Good taste.<br /><em>Good systems.</em></h1>
            <div className="sa-opening-bottom"><p>Fashion-minded product work, seen as a connected whole: the signals, decisions, and prototypes that make discovery feel personal.</p><a href="#atlas"><span>ENTER THE ATLAS</span><ArrowDownRight size={16} /></a></div>
          </div>
          <aside className="sa-opening-stamp">
            <div className="sa-stamp-orbit"><Compass size={30} strokeWidth={1} /><span>FIELD<br />NOTES</span></div>
            <span>AN INTERACTIVE<br />PRODUCT ATLAS</span><i>PORTFOLIO / FIELD NOTES</i>
          </aside>
          <div className="sa-opening-index"><span>FIG. 00</span><b>FROM OBSERVATION<br />TO WORKING SYSTEM</b><ArrowUpRight size={14} /></div>
        </section>

        <section className="sa-atlas-section" id="atlas">
          <div className="sa-section-top"><div><p className="sa-eyebrow"><span>THE REALREAL / SELECTED WORK</span><i /></p><h2>Follow the<br /><em>connections.</em></h2></div><p className="sa-section-aside">A working map of six product explorations. Select a specimen to follow its pathway through the system.</p></div>
          <div className="sa-atlas-toolbar"><span>ATLAS / 01</span><div className="sa-filters" role="group" aria-label="Filter product pathways">{lanes.map((item) => <button type="button" key={item} onClick={() => { setLane(item); if (item !== 'All pathways' && !current.tags.includes(item)) setSelected(projects.find((p) => p.tags.includes(item))?.id ?? selected); }} aria-pressed={lane === item}>{item}<sup>{item === 'All pathways' ? '06' : String(projects.filter((p) => p.tags.includes(item)).length).padStart(2, '0')}</sup></button>)}</div><span>{String(visible.length).padStart(2, '0')} / 06 IN VIEW</span></div>

          <div className="sa-atlas-layout">
            <div className="sa-map" aria-label="Interactive map of connected product projects">
              <div className="sa-map-coordinate">DISCOVERY SYSTEM <span>37°46′ N — 122°25′ W</span></div>
              <svg className="sa-connections" viewBox="0 0 900 580" preserveAspectRatio="none" aria-hidden="true">
                <path d="M180 155 C260 155 300 260 390 275 S540 260 680 150" />
                <path d="M390 275 C325 360 270 420 175 450" />
                <path d="M390 275 C500 370 580 430 710 450" />
                <path d="M180 155 C165 275 160 345 175 450" />
                <path d="M680 150 C720 240 740 350 710 450" />
                <path className="sa-connection-dash" d="M180 155 C375 30 510 42 680 150" />
              </svg>
              {visible.map((project) => <button className={`sa-map-node ${project.position}${selected === project.id ? ' is-selected' : ''}`} key={project.id} type="button" onClick={() => setSelected(project.id)} aria-pressed={selected === project.id}>
                <span className="sa-node-no">{project.number}</span><span className="sa-node-title">{project.title}</span><span className="sa-node-category">{project.category}</span><i className={`sa-node-seal seal-${project.motif}`} />
              </button>)}
              <span className="sa-map-legend"><i /> SHARED DISCOVERY SIGNAL <i /> PROTOTYPE PATH</span>
              <div className="sa-map-edge">SYSTEMS ARE CONNECTED<br />BY SHOPPER INTENT, NOT A CLAIM OF RESULTS.</div>
            </div>
            <aside className="sa-specimen" aria-live="polite">
              <div className="sa-specimen-meta"><span>SPECIMEN {current.number}</span><span>{current.tags.join(' · ')}</span></div>
              <h3>{current.title}<span>.</span></h3>
              <p className="sa-specimen-desc">{current.description}</p>
              <div className="sa-specimen-art"><Motif type={current.motif} /><span>ARTIFACT / {current.number}</span></div>
              <div className="sa-path-caption"><span>PATHWAY</span><b>{current.label}</b></div>
              <p className="sa-phase"><span>WORKING SCOPE</span>{current.phase}</p>
              <button className="sa-next" type="button" onClick={() => { const index = projects.findIndex((p) => p.id === current.id); const next = projects[(index + 1) % projects.length]; setSelected(next.id); setLane('All pathways'); }}><span>FOLLOW NEXT THREAD</span><MoveUpRight size={15} /></button>
            </aside>
          </div>
          <div className="sa-connection-note"><span>THE THROUGHLINE</span><p>Browse, language, image, and editorial signals are different doors into a more considered way to discover fashion.</p><span>01—06 / FIELD MAP</span></div>
        </section>

        <section className="sa-pathway-section" id="pathway">
          <div className="sa-pathway-heading"><p className="sa-eyebrow"><span>BUILD NOTES / A WAY OF WORKING</span><i /></p><h2>From the first<br /><em>question onward.</em></h2></div>
          <div className="sa-pathway-content">
            <p className="sa-pathway-intro">The route is rarely a straight line. Each step makes the next decision more tangible.</p>
            <div className="sa-steps">{pathway.map((step, index) => <button type="button" key={step} className={`sa-step${activeStep === index ? ' is-active' : ''}`} onClick={() => setActiveStep(index)} aria-pressed={activeStep === index}><span>0{index + 1}</span><b>{step}</b><i>{index < pathway.length - 1 ? '↗' : '↗'}</i></button>)}</div>
            <div className="sa-step-note"><span>0{activeStep + 1} / IN PRACTICE</span><p>{['Notice the friction hiding inside a familiar ritual.', 'Give the problem a shape people can act on.', 'Put a real interaction in front of someone.', 'Carry the details through to the lived product.'][activeStep]}</p><span>NO MAGIC MOMENT. GOOD QUESTIONS, FOLLOWED THROUGH.</span></div>
          </div>
        </section>

        <section className="sa-closing"><span>SHARIN KHANDER / PRODUCT WORK</span><p>Taste gets someone<br />to <em>look closer.</em><br />Good systems give them<br />a reason to stay.</p><a href="#atlas-top">BACK TO THE ATLAS <ArrowUpRight size={14} /></a></section>
      </main>
      <footer className="sa-footer"><span>SHARIN KHANDER</span><span>FASHION COMMERCE / PRODUCT SYSTEMS</span><a href="#atlas-top">INDEX ↑</a></footer>
    </div>
  );
}