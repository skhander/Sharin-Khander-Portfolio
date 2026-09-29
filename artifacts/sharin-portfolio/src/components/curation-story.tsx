import { useState } from 'react';
import { ArrowLeft, ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import { ProjectNavigation } from './project-content';
import './curation-story.css';

const media = (file: string) => `${import.meta.env.BASE_URL}media/curation/${file}`;

const metrics = [
  { value: '30%', label: 'faster assortment creation' },
  { value: '2×', label: 'assortments per quarter' },
  { value: '+8%', label: 'share of GMV from curation YoY' },
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
      <section className="mx-auto max-w-[1440px] px-6 pb-12 pt-10 sm:px-10 md:pb-16 md:pt-14 lg:px-16" aria-labelledby="curation-title">
        <Link href="/" className="inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground archive-link">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="mt-14 md:mt-20">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">CURATION</p>
          <h1 id="curation-title" className="mt-5 max-w-[17ch] font-editorial text-[clamp(2.75rem,6vw,6.5rem)] leading-[.98] tracking-[-.05em]">How do you scale human taste without losing the human?</h1>
          <p className="mt-8 max-w-3xl text-base leading-[1.65] text-muted-foreground md:mt-10 md:text-xl">Merchandisers were jumping between multiple tools to build a single assortment. I prototyped and led the 0→1 build of a new curation platform, then worked with ML to automate parts of the workflow without losing the editorial judgment behind each selection.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-labelledby="curation-impact">
        <h2 id="curation-impact" className="mb-5 font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Impact</h2>
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col py-6 sm:px-6 sm:py-2 first:sm:pl-0 last:sm:pr-0">
              <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">{metric.label}</dt>
              <dd className="order-1 font-editorial text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-.04em]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-10 sm:px-10 md:py-14 lg:px-16" aria-labelledby="curation-prototype">
        <div className="grid gap-5 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="curation-prototype" className="font-mono-archive text-[11px] uppercase tracking-[.14em] text-accent">01 — PROTOTYPE</h2>
          <p className="max-w-2xl text-base leading-[1.6] md:text-lg">I sat with everyone from the assistants doing the work to the CMO defining the operating model. Then I turned the workflow into a working prototype.</p>
        </div>
        <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-2 md:items-start md:gap-6 lg:gap-10">
          <Walkthrough
            video="curation-tool-prototype.mp4"
            poster="curation-tool-poster.jpg"
            alt="Curation Tool prototype showing the Create New Editorial interface"
            caption="The workflow · Prototype"
          />
          <CustomerPage
            image="next-level-layers.png"
            alt="The RealReal Next-Level Layers customer browse page with a four-column edit of clothing, shoes, and accessories"
            label="Customer view · Next-Level Layers"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-10 sm:px-10 md:py-14 lg:px-16" aria-labelledby="curation-ship">
        <div className="grid gap-5 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="curation-ship" className="font-mono-archive text-[11px] uppercase tracking-[.14em] text-accent">02 — SHIP</h2>
          <p className="max-w-2xl text-base leading-[1.6] md:text-lg">I led Design, Engineering, and ML through the build.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-10 sm:px-10 md:py-14 lg:px-16" aria-labelledby="curation-automate">
        <div className="grid gap-5 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="curation-automate" className="font-mono-archive text-[11px] uppercase tracking-[.14em] text-accent">03 — AUTOMATE</h2>
          <div>
            <p className="max-w-2xl text-base leading-[1.6] md:text-lg">We layered in programmatic assortments, human-in-the-loop review, and eventually agentic curation.</p>
            <div className="mt-8 max-w-[760px] md:mt-10">
              <Walkthrough
                video="evergreen-tool-prototype.mp4"
                poster="evergreen-tool-poster.jpg"
                alt="Evergreen Sale prototype showing item criteria and editorial review controls"
                caption="Programmatic curation · Prototype"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-10 sm:px-10 md:py-14 lg:px-16" aria-labelledby="curation-learn">
        <div className="grid gap-5 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="curation-learn" className="font-mono-archive text-[11px] uppercase tracking-[.14em] text-accent">04 — LEARN</h2>
          <p className="max-w-2xl text-base leading-[1.6] md:text-lg">Our first automation could find products that looked similar. It couldn't understand why an editor chose them.</p>
        </div>
        <div className="mt-10 border-l-2 border-accent pl-5 md:ml-[40%] md:mt-12 md:pl-7">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.14em] text-accent">The lesson:</p>
          <p className="mt-3 font-editorial text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] tracking-[-.04em]">Similarity isn't taste.</p>
        </div>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </div>
  );
}