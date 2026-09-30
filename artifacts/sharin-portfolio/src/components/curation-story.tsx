import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import './curation-story.css';

const media = (file: string) => `${import.meta.env.BASE_URL}media/curation/${file}`;

const metrics = [
  { value: '2×', label: 'faster assortment creation' },
  { value: '+30%', label: 'assortments per quarter' },
  { value: '+8%', label: 'share of Curation GMV YoY' },
];

function Walkthrough({ video, poster, alt, caption }: { video: string; poster: string; alt: string; caption: string }) {
  const [started, setStarted] = useState(false);

  return (
    <figure className="curation-media">
      <figcaption className="mb-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">{caption}</figcaption>
      {started ? (
        <video className="curation-prototype-video" controls autoPlay playsInline preload="metadata" poster={media(poster)} aria-label={alt}>
          <source src={media(video)} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <button type="button" className="curation-prototype-preview" onClick={() => setStarted(true)} aria-label={`Play ${alt}`}>
          <img src={media(poster)} alt={alt} loading="lazy" />
          <span className="curation-prototype-play"><Play size={16} fill="currentColor" aria-hidden="true" /> Play</span>
        </button>
      )}
    </figure>
  );
}

function CustomerPage({ image, alt, label }: { image: string; alt: string; label: string }) {
  return (
    <figure className="curation-media">
      <figcaption className="mb-3 flex min-h-4 flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">
        <span>{label}</span>
        <a href={media(image)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent underline underline-offset-4 hover:text-foreground">
          Open full image <ArrowUpRight size={12} aria-hidden="true" />
        </a>
        <span className="w-full md:hidden">Scroll to explore the page</span>
      </figcaption>
      <div className="curation-customer-frame" tabIndex={0} role="region" aria-label={`${label}; scroll to inspect the full screenshot`}>
        <img src={media(image)} alt={alt} loading="lazy" />
      </div>
    </figure>
  );
}

export function CurationStory({ nextProject }: { project: Project; nextProject: Project }) {
  return (
    <div className="page-reveal curation-story">
      <section className="curation-container" aria-labelledby="curation-title">
        <div className="curation-panel">
          <Link href="/" className="inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground archive-link">
            <ArrowLeft size={14} aria-hidden="true" /> All work
          </Link>
          <div className="curation-grid curation-hero-content">
            <p className="curation-full font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">CURATION</p>
            <h1 id="curation-title" className="curation-full curation-hero-title max-w-[17ch] font-editorial text-[clamp(2.75rem,6vw,6.5rem)] leading-[.98] tracking-[-.05em]">Scaling editorial taste</h1>
            <p className="curation-full curation-hero-intro text-base leading-[1.65] text-muted-foreground md:text-xl">
              <span className="block">Merchandisers used <strong className="font-semibold">several tools to build one assortment</strong>.</span>{' '}
              <span className="mt-5 block">I <strong className="font-semibold">shadowed the team</strong>, prototyped a more efficient <strong className="font-semibold">workflow</strong>, and led the 0→1 build.</span>{' '}
              <span className="mt-5 block">Then automated the repetitive work—so merchandisers can spend <strong className="font-semibold">more time exercising their judgement.</strong></span>
            </p>
          </div>
        </div>
      </section>

      <section className="curation-container" aria-labelledby="curation-impact">
        <div className="curation-panel curation-grid">
          <h2 id="curation-impact" className="curation-full font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Impact</h2>
          <dl className="curation-full curation-metrics">
            {metrics.map((metric) => (
              <div key={metric.label} className="curation-metric flex flex-col">
                <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">{metric.label}</dt>
                <dd className="order-1 font-editorial text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-.04em]">{metric.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="curation-container" aria-labelledby="curation-prototype">
        <div className="curation-panel curation-grid">
          <h2 id="curation-prototype" className="curation-rail font-mono-archive text-xs font-semibold uppercase tracking-[.14em] text-accent">01 — PROTOTYPE</h2>
          <div className="curation-body">
            <p className="text-base leading-[1.6] md:text-lg"><strong className="font-semibold text-foreground">From five tools to one workflow.</strong></p>
            <p className="mt-4 text-base leading-[1.6] md:text-lg">I mapped the end-to-end workflow with merchandisers, identified the highest-friction steps, and turned them into a working prototype.</p>
          </div>
          <div className="curation-full">
            <Walkthrough
              video="curation-tool-prototype.mp4"
              poster="curation-tool-poster.jpg"
              alt="Curation Tool prototype showing the Create New Editorial interface"
              caption="The workflow · Prototype"
            />
          </div>
        </div>
      </section>

      <section className="curation-container" aria-labelledby="curation-ship">
        <div className="curation-panel curation-grid">
          <h2 id="curation-ship" className="curation-rail font-mono-archive text-xs font-semibold uppercase tracking-[.14em] text-accent">02 — BUILD</h2>
          <div className="curation-body">
            <p className="text-base leading-[1.6] md:text-lg">I turned a fragmented workflow into one place to build, preview, and publish an assortment.</p>
            <p className="mt-4 text-base leading-[1.6] md:text-lg">I led Design, Engineering, and ML from prototype to production.</p>
            <p className="mt-4 font-mono-archive text-sm font-medium tracking-[.02em] text-accent">Prototype → Product</p>
          </div>
          <div className="curation-full">
            <CustomerPage
              image="next-level-layers.png"
              alt="The RealReal Next-Level Layers customer browse page with a four-column edit of clothing, shoes, and accessories"
              label="Customer view · Next-Level Layers"
            />
          </div>
        </div>
      </section>

      <section className="curation-container" aria-labelledby="curation-automate">
        <div className="curation-panel curation-grid">
          <h2 id="curation-automate" className="curation-rail font-mono-archive text-xs font-semibold uppercase tracking-[.14em] text-accent">03 — AUTOMATE</h2>
          <div className="curation-body">
            <p className="text-base leading-[1.6] md:text-lg">We automated repetitive work while keeping editors in the loop.</p>
            <p className="mt-4 font-mono-archive text-sm font-medium tracking-[.02em] text-accent">Rules → ML → Human review</p>
            <p className="mt-4 text-base leading-[1.6] md:text-lg">We started with rules for predictable criteria, introduced ML where patterns were harder to encode, and kept editors in control of the final assortment.</p>
          </div>
          <div className="curation-full">
            <Walkthrough
              video="evergreen-tool-prototype.mp4"
              poster="evergreen-tool-poster.jpg"
              alt="Evergreen Sale prototype showing item criteria and editorial review controls"
              caption="Programmatic curation · Prototype"
            />
          </div>
        </div>
      </section>

      <section className="curation-container" aria-labelledby="curation-learn">
        <div className="curation-panel curation-grid">
          <h2 id="curation-learn" className="curation-rail font-mono-archive text-xs font-semibold uppercase tracking-[.14em] text-accent">04 — LEARN</h2>
          <div className="curation-body">
            <h3 className="font-editorial text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] tracking-[-.04em]">Similarity isn't taste.</h3>
            <p className="mt-8 text-base leading-[1.6] md:text-lg">Our first model could find products that looked alike.</p>
            <p className="mt-5 text-base leading-[1.6] md:text-lg">But merchandisers weren't simply looking for similarity. They were making editorial choices—what belonged together, what told a story, and what felt right for the customer.</p>
          </div>
          <div className="curation-body curation-lesson font-editorial text-[clamp(1.75rem,2.8vw,2.75rem)] leading-[1.15] tracking-[-.03em]">
            <p>The lesson: automation could scale the mechanics of curation.<br />Taste still needed a human in the loop.</p>
          </div>
        </div>
      </section>

      <div className="curation-container">
        <nav className="curation-grid curation-next-project" aria-label="Project navigation">
          <p className="curation-rail font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground">Next project</p>
          <Link href={`/work/${nextProject.slug}`} className="curation-body group inline-flex items-center gap-3 font-editorial text-3xl archive-link" data-testid="link-next-project">
            {nextProject.title} <ArrowUpRight size={18} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </nav>
      </div>
    </div>
  );
}