import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, RotateCcw } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import { ProjectNavigation } from '@/components/project-content';
import './similar-designers-story.css';

type DesignerId = 'row' | 'lemaire' | 'jil' | 'toteme';
type Designer = {
  name: string;
  products: { name: string; detail: string; image: string }[];
  next: DesignerId[];
};
const image = (name: string) => `${import.meta.env.BASE_URL}media/sd-${name}.jpg`;
const designers: Record<DesignerId, Designer> = {
  row: {
    name: 'The Row',
    products: [
      { name: 'The sculptural coat', detail: 'Wool / charcoal', image: image('row-01') },
      { name: 'The fluid shirt', detail: 'Silk / ivory', image: image('row-02') },
    ],
    next: ['lemaire', 'jil', 'toteme'],
  },
  lemaire: {
    name: 'Lemaire',
    products: [
      { name: 'The draped trench', detail: 'Cotton / clay', image: image('lemaire-01') },
      { name: 'The easy layer', detail: 'Cotton / olive', image: image('lemaire-02') },
    ],
    next: ['jil', 'toteme', 'row'],
  },
  jil: {
    name: 'Jil Sander',
    products: [
      { name: 'The column coat', detail: 'Wool / ivory', image: image('jil-01') },
      { name: 'The sharp blazer', detail: 'Tailoring / butter', image: image('jil-02') },
    ],
    next: ['toteme', 'lemaire', 'row'],
  },
  toteme: {
    name: 'Toteme',
    products: [
      { name: 'The scarf coat', detail: 'Wool / camel', image: image('toteme-01') },
      { name: 'The long line', detail: 'Tailoring / black', image: image('toteme-02') },
    ],
    next: ['row', 'lemaire', 'jil'],
  },
};

function Product({ item, id }: { item: Designer['products'][number]; id: string }) {
  return <figure className="sd-product" data-testid={`card-designer-product-${id}`}>
    <div className="sd-product-image"><img src={item.image} alt={`Illustrative editorial look: ${item.name.toLowerCase()}`} loading="lazy" /></div>
    <figcaption><span>{item.name}</span><span>{item.detail}</span></figcaption>
  </figure>;
}

function DesignerJourney() {
  const [current, setCurrent] = useState<DesignerId>('row');
  const [path, setPath] = useState<DesignerId[]>(['row']);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasInteracted = useRef(false);
  const designer = designers[current];
  const select = (id: DesignerId) => { hasInteracted.current = true; setCurrent(id); setPath((previous) => [...previous, id]); };
  const reset = () => { hasInteracted.current = true; setCurrent('row'); setPath(['row']); };
  useEffect(() => {
    if (!hasInteracted.current) return;
    const frame = requestAnimationFrame(() => {
      headingRef.current?.focus({ preventScroll: true });
      if (window.matchMedia('(max-width: 800px)').matches) {
        headingRef.current?.scrollIntoView({
          block: 'start',
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        });
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [path]);

  return <section className="sd-loop" id="journey" aria-labelledby="sd-loop-title">
    <div className="sd-wrap">
      <div className="sd-loop-head">
        <div><p className="sd-kicker">05 / EXPERIENCE THE LOOP</p><h2 id="sd-loop-title">Follow the thread.</h2></div>
        <p>Choose a designer. See a different edit. Then choose where to go next. This is a guided portfolio simulation, not a live recommendation service.</p>
      </div>
      <div className="sd-demo">
        <div className="sd-demo-top"><span className="sd-small">DESIGNER DISCOVERY / INTERACTIVE SIMULATION</span><button type="button" onClick={reset} data-testid="button-reset-designer-journey"><RotateCcw size={14} /> Start over</button></div>
        <p className="sr-only" role="status" aria-live="polite" data-testid="status-current-designer">Now exploring {designer.name}. Path: {path.map((id) => designers[id].name).join(' to ')}.</p>
        <div className="sd-demo-body">
          <div className="sd-demo-main" key={current}>
            <div className="sd-demo-breadcrumb sd-small">DESIGNERS <ArrowRight size={13} /> {designer.name.toUpperCase()}</div>
            <h3 ref={headingRef} tabIndex={-1} data-testid="text-current-designer">{designer.name}</h3>
            <div className="sd-demo-products">{designer.products.map((item, index) => <Product key={item.image} item={item} id={`${current}-${index + 1}`} />)}</div>
          </div>
          <aside className="sd-demo-aside" aria-label="Explore other designers">
            <span className="sd-small">A NEW NEXT STEP</span>
            <h4>Customers also shop</h4>
            <p>Not seeing your thing? Try another designer instead of starting your search over.</p>
            <div>{designer.next.map((id, index) => <button key={id} type="button" className="sd-designer-button" onClick={() => select(id)} data-testid={`button-explore-designer-${id}`} aria-label={`Explore ${designers[id].name} from ${designer.name}`}><span>{designers[id].name}<ArrowUpRight size={18} strokeWidth={1.3} /></span><small>EXPLORE DESIGNER 0{index + 1}</small></button>)}</div>
            <div className="sd-demo-path sd-small">YOUR PATH SO FAR<strong data-testid="text-designer-path">{path.map((id) => designers[id].name).join(' → ')}</strong></div>
          </aside>
        </div>
        <div className="sd-demo-foot sd-small">Illustrative editorial imagery and sample products · Not actual inventory, model output, or marketplace recommendations.</div>
      </div>
    </div>
  </section>;
}

type EvolutionStage = 'behavior' | 'look' | 'feel' | 'you';
const evolutionStages: { id: EvolutionStage; label: string; status: string; question: string; note: string }[] = [
  { id: 'behavior', label: 'Behavior', status: 'MVP STARTING SIGNAL', question: 'Who browses these designers together?', note: 'The first related-designer approach used co-browse relationships. These names only illustrate how that relationship could be shown; they are not actual co-browse data.' },
  { id: 'look', label: 'Look', status: 'PLANNED DIRECTION', question: 'What looks alike?', note: 'A later direction: connect visual characteristics such as silhouette, material, color, and shape. This comparison is illustrative, not an output of a shipped visual similarity model.' },
  { id: 'feel', label: 'Feel', status: 'PLANNED DIRECTION', question: 'What feels alike?', note: 'A later direction: let occasion, trend, and aesthetic create another route between designers. These affinity words are editorial examples, not live classifications.' },
  { id: 'you', label: 'You', status: 'PLANNED DIRECTION', question: 'What might this shopper love next?', note: 'A later direction: use individual browsing and purchase history to adapt the recommendation. This sample history and suggested designer are fictional, not customer data or a real result.' },
];

function Evolution() {
  const [stage, setStage] = useState<EvolutionStage>('behavior');
  const [history, setHistory] = useState<'a' | 'b'>('a');
  const active = evolutionStages.find((item) => item.id === stage)!;
  const sample = history === 'a'
    ? { browsed: ['The Row', 'Jil Sander', 'Lemaire'], next: 'Toteme', image: image('toteme-01') }
    : { browsed: ['The Row', 'Toteme', 'Lemaire'], next: 'Jil Sander', image: image('jil-02') };
  const activeSignals = evolutionStages.slice(0, evolutionStages.findIndex((item) => item.id === stage) + 1);
  const suggested = stage === 'behavior' ? 'Lemaire' : stage === 'look' ? 'Jil Sander' : stage === 'feel' ? 'Toteme' : sample.next;
  return <section className="sd-roadmap" aria-labelledby="sd-roadmap-title"><div className="sd-wrap">
    <div className="sd-roadmap-head"><div><p className="sd-kicker">BEYOND THE MVP / THE DIRECTION</p><h2 id="sd-roadmap-title">First, a connection.<br />Then, a better one.</h2></div><p>Move through the signals. Behavior was the MVP starting point; Look, Feel, and You were later roadmap ideas, not shipped capabilities.</p></div>
    <div className="sd-evolution">
      <div className="sd-evolution-steps" role="group" aria-label="Explore recommendation signals">
        {evolutionStages.map((item, index) => <button key={item.id} className="sd-evolution-step" type="button" aria-pressed={stage === item.id} onClick={() => setStage(item.id)} data-testid={`button-signal-${item.id}`}><span className="sd-small">0{index + 1} / {item.status}</span><strong>{item.label}</strong><small>{stage === item.id ? 'VIEWING SIGNAL' : 'EXPLORE SIGNAL →'}</small></button>)}
      </div>
      <p className="sr-only" role="status" aria-live="polite">Showing {active.label}: {active.status.toLowerCase()}. Illustrative next designer: {suggested}.</p>
      <div className="sd-evolution-canvas" data-testid={`panel-signal-${stage}`}>
        <span className="sd-small sd-evolution-status">{active.status} / {active.label.toUpperCase()}</span>
        <h3>{active.question}</h3>
        <div className="sd-evolution-stack" aria-label="Illustrative accumulation of recommendation signals">
          <div className="sd-evolution-source"><span className="sd-small">START WITH</span><strong>The Row</strong></div>
          <ArrowRight size={20} aria-hidden="true" />
          <div className="sd-evolution-signals">{activeSignals.map((item) => <span key={item.id}><strong>{item.label}</strong><small>{item.id === 'behavior' ? 'MVP' : 'PLANNED'}</small></span>)}</div>
          <ArrowRight size={20} aria-hidden="true" />
          <div className="sd-evolution-destination"><span className="sd-small">ILLUSTRATIVE NEXT DESIGNER</span><strong>{suggested}</strong></div>
        </div>
        {stage === 'behavior' && <div className="sd-evolution-visual sd-behavior-visual" aria-label="Illustrative co-browse connections"><span>The Row</span><span>Lemaire</span><span>Toteme</span></div>}
        {stage === 'look' && <div className="sd-evolution-visual"><div className="sd-look-visual"><figure><img src={image('row-01')} alt="Illustrative long dark tailored coat" loading="lazy" /><figcaption>THE ROW / ILLUSTRATIVE</figcaption></figure><figure><img src={image('jil-01')} alt="Illustrative long ivory tailored coat" loading="lazy" /><figcaption>JIL SANDER / ILLUSTRATIVE</figcaption></figure></div><div className="sd-affinities" aria-label="Illustrative shared visual characteristics"><span>Long silhouette</span><span>Structured wool</span><span>Restrained palette</span></div></div>}
        {stage === 'feel' && <div className="sd-evolution-visual sd-feel-visual"><img src={image('lemaire-02')} alt="Illustrative relaxed layered look" loading="lazy" /><div className="sd-feel-tags" aria-label="Illustrative aesthetic affinities"><span>90s minimal</span><span>tailored</span><span>quiet</span><span>black tie</span><span>summer</span></div></div>}
        {stage === 'you' && <div className="sd-evolution-visual sd-you-visual"><div><span className="sd-small">SAMPLE BROWSING HISTORY</span><div className="sd-you-history">{sample.browsed.map((name) => <span key={name}>{name}</span>)}</div><div className="sd-you-switch" role="group" aria-label="Choose fictional browsing history"><button type="button" aria-pressed={history === 'a'} onClick={() => setHistory('a')} data-testid="button-sample-history-a">Sample A</button><button type="button" aria-pressed={history === 'b'} onClick={() => setHistory('b')} data-testid="button-sample-history-b">Sample B</button></div></div><div><span className="sd-small">ILLUSTRATIVE NEXT DESIGNER →</span><div className="sd-you-result"><img src={sample.image} alt={`Illustrative editorial look for ${sample.next}`} loading="lazy" /><strong data-testid="text-sample-recommendation">{sample.next}</strong></div></div></div>}
        <p>{active.note}</p>
      </div>
    </div>
    <p className="sd-evolution-disclaimer sd-small">BEHAVIOR [MVP] + LOOK [LATER] + FEEL [LATER] + YOU [LATER] → MORE RELEVANT DESIGNER DISCOVERY</p>
  </div></section>;
}

export function SimilarDesignersStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  const networkRef = useRef<HTMLDivElement>(null);
  const [networkVisible, setNetworkVisible] = useState(false);
  useEffect(() => {
    const element = networkRef.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) { setNetworkVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNetworkVisible(true); observer.disconnect(); }
    }, { threshold: .25 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <article className="sd-story page-reveal">
    <header className="sd-wrap sd-page-head">
      <Link href="/" data-testid="link-back-similar-designers"><ArrowLeft size={14} /> <span className="sd-small">ALL WORK</span></Link>
      <span className="sd-small">THE REALREAL <i>/</i> DISCOVERY · RECOMMENDATIONS</span>
    </header>

    <section className="sd-opening sd-wrap" id="dead-end" aria-labelledby="sd-title">
      <div className="sd-opening-top"><div><p className="sd-kicker">DESIGNER PAGE / THE REALREAL</p><h1 id="sd-title">The Row</h1></div><div className="sd-opening-observation"><strong>80% of visitors leave without clicking a product.</strong><span className="sd-small">THE REALREAL DESIGNER-PLP OBSERVATION</span></div></div>
      <div className="sd-plp-grid">
        <Product item={designers.row.products[0]} id="opening-1" />
        <Product item={designers.row.products[1]} id="opening-2" />
        <Product item={{ name: 'The quiet silhouette', detail: 'Cashmere / black', image: image('row-03') }} id="opening-3" />
        <Product item={{ name: 'The soft structure', detail: 'Wool / oatmeal', image: image('row-04') }} id="opening-4" />
      </div>
      <div className="sd-opening-footer sd-small"><span>AN ILLUSTRATIVE BROWSE / ORIGINAL EDITORIAL IMAGERY, NOT ACTUAL INVENTORY</span><span>SCROLL TO THE END OF THE PAGE ↓</span></div>
      <div className="sd-endcap"><strong>That’s everything<br />on this page.</strong><span className="sd-small">END OF DESIGNER LISTINGS<br />NO MEANINGFUL NEXT STEP</span></div>
    </section>

    <section className="sd-blackout" aria-labelledby="sd-stop-title"><div className="sd-wrap sd-blackout-inner"><p className="sd-kicker">01 / THE DEAD END</p><h2 id="sd-stop-title">They’re <em>done.</em></h2><p>But did they actually stop shopping?</p></div></section>

    <section className="sd-insight sd-wrap" aria-labelledby="sd-insight-title">
      <p className="sd-kicker">02 / THE PRODUCT INSIGHT</p>
      <h2 id="sd-insight-title">Maybe they didn’t want another product from this designer.<br /><em>Maybe they wanted another designer.</em></h2>
      <div className="sd-insight-flow">
        <div className="sd-flow-cell"><span className="sd-small">THE PAGE AS A DEAD END</span><p>The Row <ArrowRight size={24} strokeWidth={1} /> <span>Nothing here.</span></p></div>
        <div className="sd-flow-cell"><span className="sd-small">THE PAGE AS A DOORWAY</span><p>The Row <ArrowRight size={24} strokeWidth={1} /> What else might I like?</p></div>
      </div>
    </section>

    <section className="sd-analogy" aria-labelledby="sd-analogy-title"><div className="sd-wrap">
      <p className="sd-kicker">03 / A DIFFERENT WAY TO BROWSE</p><h2 id="sd-analogy-title">From a familiar name to the next one.</h2>
      <div className="sd-chain"><span className="sd-small">SPOTIFY / MUSIC</span><div>Radiohead <ArrowRight /> The Smile <ArrowRight /> Thom Yorke <ArrowRight /> Portishead</div></div>
      <div className="sd-chain"><span className="sd-small">THE REALREAL / FASHION</span><div>The Row <ArrowRight /> Lemaire <ArrowRight /> Jil Sander <ArrowRight /> Toteme</div></div>
      <p className="sd-analogy-foot">Turn something you already like into a path toward something new. <span className="sd-small" style={{ display: 'block', marginTop: 15 }}>DESIGNER CHAIN IS AN ILLUSTRATIVE PORTFOLIO SIMULATION</span></p>
    </div></section>

    <section className="sd-mvp sd-wrap" aria-labelledby="sd-mvp-title">
      <div className="sd-mvp-header"><div><p className="sd-kicker">04 / START WITH WHAT WE KNOW</p><h2 id="sd-mvp-title">We didn’t start with a perfect taste model.</h2></div><p>People who browsed one designer often browsed another. So we started there.</p></div>
      <div ref={networkRef} className={`sd-network ${networkVisible ? 'sd-network--visible' : ''}`} aria-label="Illustration of one designer connected to four other designers, not actual recommendation data">
        <svg viewBox="0 0 1000 440" preserveAspectRatio="none" aria-hidden="true"><line x1="430" y1="190" x2="150" y2="80" /><line x1="430" y1="190" x2="805" y2="105" /><line x1="430" y1="190" x2="245" y2="365" /><line x1="430" y1="190" x2="795" y2="365" /></svg>
        <span className="sd-node center">The Row</span><span className="sd-node n1">Lemaire</span><span className="sd-node n2">Toteme</span><span className="sd-node n3">Jil Sander</span><span className="sd-node n4">Khaite</span>
      </div>
      <div className="sd-network-caption"><strong>Behavior was the starting signal: designers customers browsed together.</strong><span className="sd-small">NETWORK IS AN ILLUSTRATION, NOT ACTUAL CO-BROWSE DATA</span></div>
      <div className="sd-module-intro"><div><span className="sd-kicker">THE MVP ON THE PAGE</span><h3>Customers also shop</h3></div><p>A way out of a single-designer dead end. The MVP used co-browsed designers and surfaced the first ten products from each designer’s browse page; no visual or personalized model yet.</p></div>
      <div className="sd-module"><div className="sd-module-header"><strong>Customers also shop</strong><span className="sd-small">EXPLORE DESIGNERS</span></div><div className="sd-module-cards">{(['lemaire', 'toteme', 'jil'] as DesignerId[]).map((id) => <div className="sd-module-card" key={id}><img src={designers[id].products[0].image} alt={`Illustrative editorial look for ${designers[id].name}`} loading="lazy" /><strong>{designers[id].name}</strong><span>ILLUSTRATIVE DESIGNER EDIT</span></div>)}</div><p className="sd-module-note sd-small">MODULE RECONSTRUCTION / NOT A LIVE MARKETPLACE CAPTURE OR ACTUAL RECOMMENDATION RESULT</p></div>
    </section>

    <Evolution />

    <DesignerJourney />

    <section className="sd-experiment" aria-labelledby="sd-experiment-title"><div className="sd-wrap">
      <p className="sd-kicker">06 / THE TEST DESIGN</p><h2 id="sd-experiment-title">The hypothesis was simple:</h2><p>If designer pages offer a relevant path to another designer, will people keep exploring and engage with more products?</p>
      <div className="sd-test-note sd-small">CONTROL + TWO PLACEMENT VARIANTS IN THE SOURCE PLAN · NO OUTCOME DATA PROVIDED</div>
      <div className="sd-variants" aria-label="Experiment configurations">
        <div className="sd-variant"><span className="sd-small">CONTROL</span><strong>The original page.</strong><div className="sd-mini-page" aria-hidden="true"><i /><i className="sd-mini-grid"><i /><i /><i /><i /></i><i /></div></div>
        <div className="sd-variant"><span className="sd-small">VARIANT 01</span><strong>Module mid-page.</strong><div className="sd-mini-page" aria-hidden="true"><i /><i className="sd-mini-module mid" /><i className="sd-mini-grid"><i /><i /><i /><i /></i></div></div>
        <div className="sd-variant"><span className="sd-small">VARIANT 02</span><strong>Module at bottom.</strong><div className="sd-mini-page" aria-hidden="true"><i /><i className="sd-mini-grid"><i /><i /><i /><i /></i><i className="sd-mini-module" /></div></div>
      </div>
      <div className="sd-metrics">
        <div><span className="sd-small">PRIMARY SIGNAL</span><strong>Related Designer Click-Through Rate</strong></div>
        <div><span className="sd-small">SECONDARY SIGNAL</span><strong>Designer PLPs viewed / session</strong></div>
        <div><span className="sd-small">SECONDARY SIGNAL</span><strong>PDP views after interaction</strong></div>
      </div>
      <div className="sd-monitor sd-small">ALSO MONITOR <strong>Obsessions · Add to Cart · Conversion</strong></div>
    </div></section>

    <section className="sd-outro sd-wrap" aria-labelledby="sd-outro-title"><p className="sd-kicker">ONE SMALL CHANGE TO THE JOURNEY</p><h2 id="sd-outro-title">A designer page doesn’t have to be the end.<br /><em>It can be the beginning.</em></h2><div className="sd-outro-bottom"><span className="sd-small">{project.title.toUpperCase()} / THE REALREAL</span><Link href="/" className="sd-small" data-testid="link-back-work-similar-ending">BACK TO ALL WORK <ArrowUpRight size={16} /></Link></div></section>
    <ProjectNavigation nextProject={nextProject} />
  </article>;
}