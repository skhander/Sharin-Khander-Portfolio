import { useState, type FormEvent } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, CornerDownLeft, RotateCcw } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import { ProjectNavigation } from '@/components/project-content';
import './shopping-agent-story.css';

type Stage = 0 | 1 | 2 | 3;
type Look = { id: string; name: string; note: string; image: string };
const lookImage = (number: string) => `${import.meta.env.BASE_URL}media/shopping-agent-look-${number}.jpg`;

const looks: Look[] = [
  { id: '01', name: 'The silk slip', note: 'Fluid · understated', image: lookImage('01') },
  { id: '02', name: 'The draped midi', note: 'Soft structure · occasion', image: lookImage('02') },
  { id: '03', name: 'The printed dress', note: 'Airy · expressive', image: lookImage('03') },
  { id: '04', name: 'The bias-cut dress', note: 'Easy movement · versatile', image: lookImage('04') },
  { id: '05', name: 'The floral cotton', note: 'Lightweight · daytime', image: lookImage('05') },
  { id: '06', name: 'The linen midi', note: 'Relaxed · warm weather', image: lookImage('06') },
];

const prompts = [
  'Dresses for a summer wedding in Napa',
  'Less formal. Something I could wear with sandals.',
  'Which one is easiest to dress up later?',
  'What would you wear with it?',
] as const;

const responses = [
  'For an outdoor summer wedding, start with breathable silhouettes that feel at home in the setting. Here are a few different directions.',
  'Let’s loosen the formality. These lighter pieces would feel natural with flat sandals, without losing the sense of occasion.',
  'The bias-cut dress has the most range: understated with sandals now, and easy to elevate with jewelry and a sharper shoe later.',
  'With the bias-cut dress: a low leather sandal and a small woven bag for the wedding. Later, try a sculptural earring and a heeled mule.',
] as const;

const stageLabels = ['Discover', 'Refine', 'Compare', 'Style'] as const;

function ProductCard({ look, compact = false }: { look: Look; compact?: boolean }) {
  return (
    <figure className={`sa-product ${compact ? 'sa-product--compact' : ''}`} data-testid={`card-illustrative-look-${look.id}`}>
      <div className="sa-product-image"><img src={look.image} alt={`Illustrative editorial photograph for ${look.name.toLowerCase()}`} loading="lazy" /></div>
      <figcaption>
        <span className="sa-product-number">LOOK {look.id}</span>
        <strong>{look.name}</strong>
        <span>{look.note}</span>
      </figcaption>
    </figure>
  );
}

function ShoppingDemo() {
  const [stage, setStage] = useState<Stage>(0);
  const [input, setInput] = useState('');
  const [hint, setHint] = useState('');
  const normalized = (value: string) => value.toLowerCase().replace(/[?.!,]/g, '').replace(/\s+/g, ' ').trim();
  const setDemoStage = (next: Stage) => {
    setStage(next);
    setHint('');
    setInput('');
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    const match = prompts.findIndex((prompt) => normalized(prompt) === normalized(input));
    if (match >= 0) setDemoStage(match as Stage);
    else setHint('This is a guided simulation, not a live shopping agent. Choose a suggested prompt or enter one of the four sample phrases exactly.');
  };
  const visible = stage === 0 ? looks : stage === 1 ? [looks[4], looks[5], looks[3], looks[2]] : [looks[3], looks[4], looks[5]];

  return (
    <section className="sa-demo-section" id="experience" aria-labelledby="sa-demo-heading">
      <div className="sa-wrap">
        <div className="sa-demo-intro">
          <div><p className="sa-eyebrow">04 / THE EXPERIENCE</p><h2 id="sa-demo-heading">Try the conversation.</h2></div>
          <p>From a half-formed idea to a more confident decision. Follow the prompts, or type the sample phrases yourself.</p>
        </div>
        <div className="sa-demo">
          <div className="sa-demo-bar"><span>SHOPPING AGENT <i> / </i> GUIDED CONCEPT</span><button type="button" onClick={() => setDemoStage(0)} data-testid="button-reset-shopping-demo"><RotateCcw size={13} /> Start over</button></div>
          <p className="sr-only" role="status" aria-live="polite">{stageLabels[stage]}: showing {visible.length} illustrative looks. Step {stage + 1} of four.</p>
          <div className="sa-demo-body">
            <aside className="sa-dialogue" aria-label="Simulated shopping conversation">
              <div className="sa-step-indicator">A CONVERSATION IN FOUR MOVES <span>0{stage + 1} / 04</span></div>
              <div className="sa-stage-list" aria-label="Demo stages">
                {stageLabels.map((label, index) => <button key={label} type="button" className={stage === index ? 'active' : ''} onClick={() => setDemoStage(index as Stage)} aria-current={stage === index ? 'step' : undefined} data-testid={`button-demo-stage-${label.toLowerCase()}`}>{String(index + 1).padStart(2, '0')} <span>{label}</span></button>)}
              </div>
              <div className="sa-conversation" key={stage}>
                <p className="sa-speaker">YOU ASKED</p>
                <blockquote>“{prompts[stage]}”</blockquote>
                <p className="sa-speaker sa-speaker-agent">THE AGENT MIGHT SAY</p>
                <p className="sa-agent-response">{responses[stage]}</p>
                {stage === 2 && <div className="sa-comparison"><div><b>Most versatile</b><span>Bias-cut dress</span></div><div><b>Most relaxed</b><span>Floral cotton</span></div><div><b>Best for heat</b><span>Linen midi</span></div></div>}
                {stage === 3 && <div className="sa-styling"><span>FOR NAPA</span><b>Flat leather sandals <em>+</em> woven bag</b><span>FOR LATER</span><b>Sculptural earrings <em>+</em> heeled mule</b></div>}
              </div>
              <div className="sa-demo-actions">
                {stage < 3 && <button type="button" className="sa-next-prompt" onClick={() => setDemoStage((stage + 1) as Stage)} data-testid="button-next-demo-prompt"><span>ASK NEXT</span>{prompts[stage + 1]}<ArrowRight size={16} /></button>}
                <form onSubmit={submit} className="sa-demo-form">
                  <label htmlFor="shopping-demo-input">OR TYPE A SAMPLE PHRASE</label>
                  <div><input id="shopping-demo-input" value={input} onChange={(event) => { setInput(event.target.value); setHint(''); }} placeholder="Type a sample phrase…" data-testid="input-shopping-demo-prompt" /><button type="submit" aria-label="Submit sample phrase" data-testid="button-submit-shopping-demo"><CornerDownLeft size={17} /></button></div>
                  {hint && <p role="status" className="sa-guided-hint" data-testid="status-shopping-demo-hint">{hint}</p>}
                </form>
                <details className="sa-samples">
                  <summary>See all sample phrases</summary>
                  <ul>{prompts.map((prompt, index) => <li key={prompt}><button type="button" onClick={() => setDemoStage(index as Stage)}>{prompt}</button></li>)}</ul>
                </details>
              </div>
            </aside>
            <div className="sa-results" key={`results-${stage}`}>
              <div className="sa-results-heading"><div><span>AN EDIT OF POSSIBILITIES</span><h3>{stage === 0 ? 'For the occasion' : stage === 1 ? 'A little more ease' : stage === 2 ? 'Options, in context' : 'One look, more lives'}</h3></div><span>{String(visible.length).padStart(2, '0')} LOOKS</span></div>
              <div className={`sa-product-grid ${stage > 1 ? 'sa-product-grid--three' : ''}`}>{visible.map((look) => <ProductCard key={look.id} look={look} compact={stage > 1} />)}</div>
              <p className="sa-simulation-note">Illustrative simulation · Conceptual images and descriptions, not live listings or actual product results.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShoppingAgentStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <article className="sa-story page-reveal">
      <header className="sa-wrap sa-page-head"><Link href="/" className="sa-back archive-link" data-testid="link-back-shopping-agent"><ArrowLeft size={14} /> ALL WORK</Link><span>THE REALREAL <i> / </i> AI · DISCOVERY · COMMERCE</span></header>
      <section className="sa-hero" aria-labelledby="sa-title">
        <div className="sa-inventory" aria-hidden="true">{Array.from({ length: 48 }, (_, index) => <div key={index} className="sa-inventory-tile"><img src={looks[(index * 7 + Math.floor(index / 6)) % looks.length].image} alt="" /></div>)}</div>
        <div className="sa-hero-copy"><p className="sa-eyebrow">SHOPPING AGENT / PRODUCT CASE STUDY</p><h1 id="sa-title"><span>6M+ products.</span><br /><em>Finding the right one</em><br /> is the hard part.</h1><p>Traditional search makes shoppers describe what they want in the language of the catalog.</p><a href="#friction" className="sa-scroll-link" data-testid="link-explore-story">THE STORY <ArrowDown size={14} /></a></div>
        <span className="sa-inventory-caption">6M+ PRODUCTS ACROSS THE BROADER CATALOG</span>
      </section>

      <section className="sa-keyword sa-wrap" id="friction" aria-labelledby="sa-keyword-title"><div className="sa-section-index">01 / THE FRICTION</div><div className="sa-keyword-content"><h2 id="sa-keyword-title">A search box asks you<br />to <em>speak catalog.</em></h2><div className="sa-search-example"><span className="sa-example-label">KEYWORD SEARCH</span><div className="sa-faux-search"><span className="sa-typed-keyword">black silk dress</span><ArrowRight size={19} /></div><div className="sa-token-row"><span>black</span><span>silk</span><span>dress</span></div><div className="sa-keyword-results" aria-label="Illustrative keyword matches">{looks.slice(0, 3).map((look) => <img key={look.id} src={look.image} alt="" loading="lazy" />)}</div><p>Illustrative matches. Useful when you know exactly what you’re looking for.</p></div></div></section>

      <section className="sa-intent" aria-labelledby="sa-intent-title"><div className="sa-wrap sa-intent-layout"><div><p className="sa-eyebrow">02 / THE SHIFT</p><h2 id="sa-intent-title">People don’t shop<br />in <em>attributes.</em></h2></div><div className="sa-intent-quote"><span>AN ACTUAL SHOPPING THOUGHT</span><blockquote>“Dresses for a summer wedding in Napa.”</blockquote><div className="sa-translation"><span>THE SHOPPER SAYS IT NATURALLY</span><ArrowDown size={18} /><span>THE SYSTEM DOES THE TRANSLATION</span></div><div className="sa-intent-tags"><span>occasion</span><span>setting</span><span>season</span><span>style</span><span>formality</span></div></div></div></section>

      <section className="sa-shift sa-wrap" aria-labelledby="sa-shift-title"><div className="sa-section-index">03 / BEFORE → AFTER</div><h2 id="sa-shift-title">From matching words<br />to understanding <em>intent.</em></h2><div className="sa-shift-columns"><div><span>TRADITIONAL SEARCH</span><p>Guess the right terms.<br />Run another search.<br />Scroll and start over.</p><div className="sa-shift-small">PRECISE KEYWORDS</div></div><div><span>CONVERSATIONAL DISCOVERY</span><p>Bring an image, an occasion,<br />a trend, or a half-baked idea.<br />Refine, compare, decide.</p><div className="sa-shift-small">GUIDED DISCOVERY</div></div></div><a href="#experience" className="sa-text-link" data-testid="link-try-shopping-demo">See how it works <ArrowDown size={16} /></a></section>

      <ShoppingDemo />

      <section className="sa-role sa-wrap" aria-labelledby="sa-role-title"><div className="sa-section-index">05 / THE PRODUCT WORK</div><div className="sa-role-title"><h2 id="sa-role-title">I built the system<br />behind the <em>conversation.</em></h2><p>Not just a chat surface. A set of decisions about what the agent should do, what it could know, and where it should stop.</p></div><div className="sa-role-list">{[
        ['01', 'Agent behavior', 'Instructions, guardrails, and a voice appropriate for luxury discovery.'],
        ['02', 'Product intelligence', 'The APIs and capabilities needed to search, filter, compare, and recommend.'],
        ['03', 'Core journeys', 'Natural-language and image search, refinement, comparison, and styling toward PDP and add to cart.'],
        ['04', 'Feedback loop', 'Surveys, conversation summaries, and analysis to learn from real usage.'],
        ['05', 'Measurement', 'Entry → engagement → PDP → Obsess / Add to Cart → conversion; with AOV, ASP, and GMV considered.'],
      ].map(([number, title, body]) => <div className="sa-role-row" key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></div>)}</div><p className="sa-scope-note">In-agent checkout was a later exploration, not part of the launched MVP. Virtual try-on is not represented here as an MVP delivery.</p></section>

      <section className="sa-boundary" aria-labelledby="sa-boundary-title"><div className="sa-wrap"><p className="sa-eyebrow">06 / THE BOUNDARY</p><h2 id="sa-boundary-title">The useful constraint:<br /><em>this was not customer service.</em></h2><div className="sa-boundary-grid"><div><span>IN SCOPE / DISCOVERY</span><p>Search <b>·</b> Refine <b>·</b> Compare <b>·</b> Style</p></div><div><span>OUT OF SCOPE / SUPPORT</span><p>Orders <b>·</b> Returns <b>·</b> Account issues</p></div></div><p className="sa-boundary-end">The agent could help you decide what to buy — not answer every question about your order.</p></div></section>

      <section className="sa-learning sa-wrap" aria-labelledby="sa-learning-title"><div className="sa-section-index">07 / THE LEARNING ROLLOUT</div><div className="sa-learning-layout"><div><h2 id="sa-learning-title">Start small.<br /><em>Watch the whole journey.</em></h2><p>The rollout plan began with 5% of traffic. Without a traditional control in the initial learning phase, the question was whether the experience could add useful shopping activity without harming the funnel — not a causal A/B claim.</p></div><div className="sa-funnel" aria-label="Measurement journey">{['Exposure', 'Agent engagement', 'Product discovery', 'PDP', 'Obsess / Add to Cart', 'Order'].map((step, index) => <div key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong>{index < 5 && <ArrowDown size={15} />}</div>)}</div></div><p className="sa-learning-question">The question: <em>Does conversation create more meaningful discovery without hurting conversion?</em></p></section>

      <section className="sa-ending" aria-labelledby="sa-ending-title"><div className="sa-wrap"><p className="sa-eyebrow">08 / THE LESSON</p><div className="sa-asktrr">AskTRR<span>THE NAME WAS THE INTERFACE.</span></div><h2 id="sa-ending-title">What we built and what people expected<br /><em>were two different things.</em></h2><div className="sa-mismatch"><div><span>WHAT WE BUILT</span><p>Discovery. Comparison.<br />Styling. Exploration.</p></div><div><span>WHAT THE NAME SUGGESTED</span><p>Orders. Returns.<br />Customer support.</p></div></div><p className="sa-adoption">Adoption was low. The name led shoppers to read a discovery agent as a support assistant.</p><blockquote>AI products are not just model experiences.<br /><em>The product has to teach people what it is.</em></blockquote><div className="sa-final"><span>{project.title.toUpperCase()} / THE REALREAL</span><Link href="/" className="archive-link" data-testid="link-back-work-ending">BACK TO ALL WORK <ArrowUpRight size={15} /></Link></div></div></section>
      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}