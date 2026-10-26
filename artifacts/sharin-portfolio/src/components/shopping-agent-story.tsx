import { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import './shopping-agent-story.css';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/shopping-agent/${filename}`;
const workMedia = (filename: string) => `${import.meta.env.BASE_URL}media/work/${filename}`;
const prototypePoster = workMedia('shopping-agent-prototype-poster.webp');
const prototypeMask = workMedia('shopping-agent-prototype-mask.webp');

const metrics = [
  { value: '+1%', label: 'visitor conversion' },
  { value: '$14M', label: 'annualized GMV' },
];

const solutions = [
  {
    title: 'Semantic search',
    src: 'semantic-search.jpg',
    width: 474,
    height: 1024,
    alt: "Ask TRR answering “I'm looking for fall colored gemstone jewelry” with Golden Citrine Jewels.",
  },
  {
    title: 'Product comparison',
    src: 'product-comparison.jpg',
    width: 469,
    height: 1024,
    alt: 'Ask TRR comparing two citrine necklaces and explaining why the first costs more.',
  },
  {
    title: 'Style',
    src: 'style.jpg',
    width: 477,
    height: 1024,
    alt: 'Ask TRR showing layering options with multi-strand yellow gold necklaces.',
  },
];

const owned = [
  {
    title: 'Agent behavior',
    body: 'Mapped core shopper intents. Wrote the system prompt and guardrails for each.',
  },
  {
    title: 'Prototype to production',
    body: 'Built the first working prototype. Led research and final design with UXR and design.',
  },
  {
    title: 'Evals',
    body: 'Defined what a good answer looks like. Built a test set to score the agent before and after launch.',
  },
  {
    title: 'A/B test',
    body: 'Ran an online experiment against search. Tracked conversion impact plus qualitative shopper feedback.',
  },
];

const lessons = [
  {
    title: 'Name it clearly',
    body: 'People thought AskTRR was customer service. Marketing fixed it, and adoption grew.',
  },
  {
    title: 'Hallucinations are real',
    body: 'The agent made up product details. Evals caught it before launch.',
  },
  {
    title: 'Show more products',
    body: 'A few results made people leave. V2 added a full feed.',
  },
];

export function ShoppingAgentStory(_props: { project: Project; nextProject: Project }) {
  const [prototypeStarted, setPrototypeStarted] = useState(false);

  return (
    <article className="page-reveal shopping-agent-story">
      <header className="mx-auto max-w-[1440px] px-6 pb-12 pt-10 sm:px-10 md:pb-16 md:pt-14 lg:px-16" aria-labelledby="shopping-agent-title">
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-[16px] text-muted-foreground" data-testid="link-back-shopping-agent">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="shopping-agent-hero">
          <div className="shopping-agent-hero-copy">
            <p className="site-eyebrow mb-4 font-mono-archive text-accent">Shopping agent</p>
            <h1 id="shopping-agent-title" className="font-editorial text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.2] tracking-[-.025em] text-foreground" data-testid="text-project-title">
              Search in your own words, compare products, and get styling tips.
            </h1>
            <div className="shopping-agent-impact">
              <h2 id="shopping-impact" className="site-eyebrow font-mono-archive text-accent">Impact</h2>
              <dl aria-labelledby="shopping-impact">
                {metrics.map(({ value, label }) => (
                  <div key={label}>
                    <dt>{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div
            className="shopping-agent-prototype-player"
            style={{
              ['--sa-device-mask' as string]: `url("${prototypeMask}")`,
              ['--sa-device-poster' as string]: `url("${prototypePoster}")`,
            }}
          >
            {prototypeStarted ? (
              <video controls autoPlay playsInline preload="metadata" poster={prototypePoster} aria-label="Ask TRR prototype walkthrough">
                <source src={workMedia('shopping-agent-prototype.mp4')} type="video/mp4" />
                Your browser does not support video playback.
              </video>
            ) : (
              <button type="button" className="shopping-agent-prototype-preview" onClick={() => setPrototypeStarted(true)} aria-label="Play Ask TRR prototype walkthrough">
                <img src={prototypePoster} alt="" loading="lazy" />
                <span className="shopping-agent-prototype-play"><Play size={22} fill="currentColor" aria-hidden="true" /></span>
              </button>
            )}
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-problem">
        <div className="shopping-agent-problem-layout">
          <div className="shopping-agent-comparison" role="group" aria-label="Traditional search and How shoppers think comparison">
            <figure className="shopping-agent-comparison-pane">
              <figcaption>
                <h3>Traditional search</h3>
                <span className="shopping-agent-query-tag">“black silk dress”</span>
              </figcaption>
              <img src={media('traditional-search.png')} alt="The RealReal traditional search results for black silk dress, showing a keyword search box, filters, and a grid of black dresses." width={1024} height={655} loading="lazy" />
            </figure>
            <figure className="shopping-agent-comparison-pane shopping-agent-comparison-pane--agent">
              <figcaption>
                <h3>How shoppers think</h3>
                <span className="shopping-agent-query-tag">“90s minimalist Calvin Klein look for a winter wedding.”</span>
              </figcaption>
              <img src={media('agent-results.png')} alt="Ask TRR Shopping Agent responding to a request for a 90s minimalist Calvin Klein look for a winter wedding with a visual selection of dresses." width={1698} height={1892} loading="lazy" />
            </figure>
          </div>
          <div className="shopping-agent-problem-copy">
            <h2 id="shopping-problem" className="site-eyebrow font-mono-archive text-accent">01 — Problem</h2>
            <div className="shopping-agent-problem">
              <p className="shopping-agent-problem-punch">Buyers think in terms of</p>
              <p className="shopping-agent-problem-intent">
                <span className="shopping-agent-problem-wants">
                  <span>silhouettes</span>
                  <span>eras</span>
                  <span>occasions</span>
                </span>
                but traditional search only understands flat descriptors.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-labelledby="shopping-solution">
        <div className="shopping-agent-solution-layout">
          <div className="shopping-agent-solution" role="list">
            {solutions.map((item, index) => (
              <figure className="shopping-agent-comparison-pane shopping-agent-solution-pane" role="listitem" key={item.title}>
                <figcaption>
                  <h3>{String(index + 1).padStart(2, '0')} {item.title}</h3>
                </figcaption>
                <img src={media(item.src)} alt={item.alt} width={item.width} height={item.height} loading="lazy" />
              </figure>
            ))}
          </div>
          <div className="shopping-agent-solution-copy">
            <h2 id="shopping-solution" className="site-eyebrow font-mono-archive text-accent">02 — Solution</h2>
            <div className="shopping-agent-solution-prose">
              <p className="shopping-agent-problem-punch">A shopping agent detects intent and helps you decide confidently.</p>
              <p>It's a personal shopper who knows your taste.</p>
              <p>Gemini handles language understanding. We built the product layer: search across live inventory, personalization, add to cart, and a brand voice tuned to The RealReal.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-labelledby="shopping-owned">
        <h2 id="shopping-owned" className="site-eyebrow font-mono-archive text-accent">03 — What I Owned</h2>
        <ol className="shopping-agent-owned">
          {owned.map((item, index) => (
            <li key={item.title}>
              <span className="shopping-agent-owned-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-lessons">
        <h2 id="shopping-lessons" className="site-eyebrow font-mono-archive text-accent">04 — Lessons</h2>
        <ol className="shopping-agent-owned shopping-agent-owned--three">
          {lessons.map((item, index) => (
            <li key={item.title}>
              <span className="shopping-agent-owned-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
