import { useState } from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import { ProjectNavigation } from '@/components/project-content';
import './shopping-agent-story.css';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/shopping-agent/${filename}`;
const workMedia = (filename: string) => `${import.meta.env.BASE_URL}media/work/${filename}`;

const metrics = [
  { value: '+1%', label: 'visitor conversion' },
  { value: '+3%', label: 'Obsessions / visitor' },
  { value: '$14M', label: 'annualized GMV' },
];

export function ShoppingAgentStory({ nextProject }: { project: Project; nextProject: Project }) {
  const [prototypeStarted, setPrototypeStarted] = useState(false);

  return (
    <article className="page-reveal shopping-agent-story">
      <header className="mx-auto max-w-[1440px] px-6 pb-12 pt-10 sm:px-10 md:pb-16 md:pt-14 lg:px-16" aria-labelledby="shopping-agent-title">
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground" data-testid="link-back-shopping-agent">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="mt-14 grid gap-7 md:mt-20 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:items-end md:gap-16">
          <div>
            <p className="mb-6 font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">SHOPPING AGENT</p>
            <h1 id="shopping-agent-title" className="font-editorial text-[clamp(2.75rem,5vw,5.5rem)] leading-[.98] tracking-[-.05em]" data-testid="text-project-title">Next-gen product discovery</h1>
          </div>
          <p className="max-w-2xl text-base leading-[1.65] text-muted-foreground md:text-xl">Traditional search only works if you know exactly how to describe what you want. I built a shopping agent that lets users search in their own words, compare products, and get styling advice.</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-labelledby="shopping-impact">
        <h2 id="shopping-impact" className="mb-7 font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Impact</h2>
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map(({ value, label }) => (
            <div key={label} className="flex flex-col py-6 sm:px-6 sm:py-2 first:sm:pl-0 last:sm:pr-0">
              <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">{label}</dt>
              <dd className="order-1 font-editorial text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-.04em]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-problem">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="shopping-problem" className="font-mono-archive text-xs font-semibold uppercase tracking-[.14em] text-accent">01 — PROBLEM</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p>Traditional search only understood structured product attributes. It understands the words you type in, but not what you meant.</p>
          </div>
        </div>
        <h3 className="mx-auto mt-8 max-w-[1100px] font-mono-archive text-sm font-medium tracking-[.02em] text-accent md:mt-10">From → To</h3>
        <div className="shopping-agent-comparison-wrap mt-4" tabIndex={0} role="region" aria-label="Search comparison table; scroll horizontally to view both columns">
          <table className="shopping-agent-comparison" aria-label="Traditional search and Shopping Agent comparison">
            <thead>
              <tr>
                <th scope="col">
                  <span className="block font-editorial text-2xl font-normal">Traditional search</span>
                  <span className="mt-1 block font-normal text-muted-foreground">“black silk dress”</span>
                </th>
                <th scope="col">
                  <span className="block font-editorial text-2xl font-normal">Shopping Agent</span>
                  <span className="mt-1 block font-normal text-muted-foreground">“90s minimalist Calvin Klein look for a winter wedding.”</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className="shopping-agent-image-frame shopping-agent-image-frame--search" tabIndex={0} role="region" aria-label="Traditional Search screenshot; scroll to inspect">
                    <img src={media('traditional-search.png')} alt="The RealReal traditional search results for black silk dress, showing a keyword search box, filters, and a grid of black dresses." loading="lazy" />
                  </div>
                  <p className="mt-2 font-mono-archive text-[10px] text-muted-foreground sm:hidden">Scroll to inspect the screenshot</p>
                </td>
                <td>
                  <div className="shopping-agent-image-frame shopping-agent-image-frame--agent" tabIndex={0} role="region" aria-label="Shopping Agent screenshot; scroll to inspect">
                    <img src={media('agent-results.png')} alt="Ask TRR Shopping Agent responding to a request for a 90s minimalist Calvin Klein look for a winter wedding with a visual selection of dresses." loading="lazy" />
                  </div>
                  <p className="mt-2 font-mono-archive text-[10px] text-muted-foreground sm:hidden">Swipe and scroll to inspect the screenshot</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-prototype">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="shopping-prototype" className="font-mono-archive text-xs font-semibold uppercase tracking-[.14em] text-accent">02 — PROTOTYPE</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p>I designed 3 paths for MVP: searching with an image and/or prompt, refining results with dialogue, and comparing items side-by-side.</p>
          </div>
        </div>
        <div className="shopping-agent-prototype-player mt-10 md:mt-14">
          {prototypeStarted ? (
            <video controls autoPlay playsInline preload="metadata" poster={workMedia('shopping-agent-prototype-poster.webp')} aria-label="Ask TRR prototype walkthrough">
              <source src={workMedia('shopping-agent-prototype.mp4')} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            <button type="button" className="shopping-agent-prototype-preview" onClick={() => setPrototypeStarted(true)} aria-label="Play Ask TRR prototype walkthrough">
              <img src={workMedia('shopping-agent-prototype-poster.webp')} alt="" loading="lazy" />
              <span className="shopping-agent-prototype-play"><Play size={22} fill="currentColor" aria-hidden="true" /></span>
            </button>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-build">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="shopping-build" className="font-mono-archive text-xs font-semibold uppercase tracking-[.14em] text-accent">03 — BUILD</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p>I shaped the experience and brand voice: how the agent recommends products, answers questions, and helps shoppers decide.</p>
            <p>With ML and Engineering, I brought it to our 6M+ catalog and made it possible for returning shoppers to pick up where they left off across visits and devices.</p>
            <p className="font-mono-archive text-sm font-medium tracking-[.02em] text-accent">Prototype → Product</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-learning">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="shopping-learning" className="font-mono-archive text-xs font-semibold uppercase tracking-[.14em] text-accent">04 — LEARN</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p>Natural language unlocked new kinds of shopping intent. But shopping is visual.</p>
            <p className="text-muted-foreground">The conversational interface showed fewer products and made comparison harder.</p>
            <p className="border-t-2 border-accent pt-5 font-editorial text-[clamp(2.5rem,4vw,4.5rem)] leading-[1.05] tracking-[-.04em]">Search needs conversation. Shopping needs browsing.</p>
          </div>
        </div>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}