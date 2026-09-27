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

function Walkthrough({ video, poster, alt }: { video: string; poster: string; alt: string }) {
  const [started, setStarted] = useState(false);

  return (
    <figure className="curation-media mt-8 md:mt-12">
      {started ? (
        <video className="curation-prototype-video" controls autoPlay playsInline preload="metadata" poster={media(poster)} aria-label={alt}>
          <source src={media(video)} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <button type="button" className="curation-prototype-preview" onClick={() => setStarted(true)} aria-label="Play Curation Tool prototype">
          <img src={media(poster)} alt={alt} loading="lazy" />
          <span className="curation-prototype-play"><Play size={16} fill="currentColor" aria-hidden="true" /> Play</span>
        </button>
      )}
      <figcaption className="mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Prototype</figcaption>
    </figure>
  );
}

function CustomerPage({ image, alt, label, tall = false }: { image: string; alt: string; label: string; tall?: boolean }) {
  return (
    <figure className="curation-media mt-10 md:mt-14">
      <figcaption className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">
        <span>{label}</span>
        <a href={media(image)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent underline underline-offset-4 hover:text-foreground">
          Open full image <ArrowUpRight size={12} aria-hidden="true" />
        </a>
        <span className="w-full md:hidden">{tall ? 'Swipe and scroll to explore the page' : 'Swipe horizontally to explore the page'}</span>
        {tall && <span className="w-full hidden md:block">Scroll the image to explore the full assortment</span>}
      </figcaption>
      <div className={`curation-customer-frame${tall ? ' is-evergreen' : ''}`} tabIndex={0} role="region" aria-label={`${label}; scroll to inspect the full screenshot`}>
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
        <div className="mt-14 grid grid-cols-1 gap-7 md:mt-20 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:items-end md:gap-16">
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">CURATION TOOL</p>
            <h1 id="curation-title" className="mt-5 max-w-3xl font-editorial text-[clamp(3.8rem,8vw,8rem)] leading-[.84] tracking-[-.05em]">Curation Tool</h1>
          </div>
          <p className="max-w-2xl text-lg leading-[1.4] text-muted-foreground sm:text-xl">Making merchandisers faster.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-label="Curation Tool metrics">
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col py-6 sm:px-6 sm:py-2 first:sm:pl-0 last:sm:pr-0">
              <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">{metric.label}</dt>
              <dd className="order-1 font-editorial text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-.04em]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="curation-problem">
        <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <div>
            <h2 id="curation-problem" className="max-w-[12ch] font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">The problem</h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-[1.6] text-muted-foreground md:text-lg">Merchandisers were jumping between multiple tools to build a single assortment. Curation was manual, slow, and hard to scale.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="curation-built">
        <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <div>
            <h2 id="curation-built" className="max-w-[12ch] font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">What I built</h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-[1.6] text-muted-foreground md:text-lg">A new curation workflow that turned merchandiser expertise into scalable, programmatic assortments.</p>
        </div>
        <div className="curation-media mt-10 md:mt-14">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.14em] text-accent">0 → 1 · PRODUCT + AI · INTERNAL TOOL</p>
          <Walkthrough
            video="curation-tool-prototype.mp4"
            poster="curation-tool-poster.jpg"
            alt="Curation Tool prototype showing the Create New Editorial interface"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="curation-hard-part">
        <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="curation-hard-part" className="max-w-[12ch] font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">The hard part</h2>
          <p className="max-w-2xl self-end text-base leading-[1.6] text-muted-foreground md:text-lg">Our first AI-generated assortments looked right—but didn't feel right. The model could recognize similarity, but not taste. We invested in richer metadata and kept merchandisers in the loop.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="curation-learned">
        <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="curation-learned" className="max-w-[12ch] font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">What I learned</h2>
          <p className="max-w-2xl self-end text-base leading-[1.6] text-muted-foreground md:text-lg">AI is only as good as the data underneath it.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-label="Customer-facing curation screenshots">
        <CustomerPage
          image="next-level-layers.png"
          alt="The RealReal Next-Level Layers customer browse page with a four-column edit of clothing, shoes, and accessories"
          label="Next-Level Layers"
        />
        <CustomerPage
          image="shop-vintage-bridal.png"
          alt="The RealReal Shop Vintage Bridal page with an assortment of vintage bridal dresses and accessories"
          label="Shop Vintage Bridal"
          tall
        />
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </div>
  );
}