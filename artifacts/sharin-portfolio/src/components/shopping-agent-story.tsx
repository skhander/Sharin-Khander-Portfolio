import { useState } from 'react';
import { ArrowLeft, Download, Play } from 'lucide-react';
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
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-[16px] text-muted-foreground" data-testid="link-back-shopping-agent">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="mt-14 md:mt-20">
          <p className="site-eyebrow mb-4 font-mono-archive text-accent">Shopping agent</p>
          <h1 id="shopping-agent-title" className="max-w-5xl text-[clamp(2rem,4vw,3.5rem)] leading-[1.2] tracking-[-.025em]" data-testid="text-project-title">
            <span className="block font-normal text-foreground">Traditional search understands <strong className="font-semibold">product attributes.</strong> Shoppers think in <strong className="font-semibold">occasions, aesthetics, and ideas.</strong></span>
            {' '}
            <span className="mt-3 block font-normal text-muted-foreground">I built a shopping agent that bridges the gap.</span>
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-labelledby="shopping-impact">
        <h2 id="shopping-impact" className="site-eyebrow mb-5 font-mono-archive text-muted-foreground">Impact</h2>
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map(({ value, label }) => (
            <div key={label} className="flex flex-col py-6 sm:px-6 sm:py-2 first:sm:pl-0 last:sm:pr-0">
              <dt className="order-2 mt-2 font-mono-archive text-[16px] text-muted-foreground">{label}</dt>
              <dd className="order-1 font-editorial text-[clamp(2rem,3vw,2.75rem)] font-semibold leading-none tracking-[-.035em]">{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-problem">
        <h2 id="shopping-problem" className="site-eyebrow font-mono-archive text-accent">01 — Problem</h2>
        <div className="shopping-agent-comparison mt-5 md:mt-6" role="group" aria-label="Traditional search and How shoppers think comparison">
          <div className="shopping-agent-comparison-heading shopping-agent-comparison-heading--traditional">
            <h3 className="font-editorial text-2xl font-normal">Traditional search</h3>
            <span className="shopping-agent-query-tag">“black silk dress”</span>
          </div>
          <div className="shopping-agent-comparison-media shopping-agent-comparison-media--traditional">
            <div className="shopping-agent-image-frame shopping-agent-image-frame--search" tabIndex={0} role="region" aria-label="Traditional Search screenshot; scroll to inspect">
              <img src={media('traditional-search.png')} alt="The RealReal traditional search results for black silk dress, showing a keyword search box, filters, and a grid of black dresses." loading="lazy" />
            </div>
            <p className="shopping-agent-comparison-hint mt-2 font-mono-archive text-[15px] text-muted-foreground">Scroll to inspect the screenshot</p>
          </div>
          <div className="shopping-agent-comparison-heading shopping-agent-comparison-heading--agent">
            <h3 className="font-editorial text-2xl font-normal">How shoppers think</h3>
            <span className="shopping-agent-query-tag">“90s minimalist Calvin Klein look for a winter wedding.”</span>
          </div>
          <div className="shopping-agent-comparison-media shopping-agent-comparison-media--agent">
            <div className="shopping-agent-image-frame shopping-agent-image-frame--agent" tabIndex={0} role="region" aria-label="Shopping Agent screenshot; scroll to inspect">
              <img src={media('agent-results.png')} alt="Ask TRR Shopping Agent responding to a request for a 90s minimalist Calvin Klein look for a winter wedding with a visual selection of dresses." loading="lazy" />
            </div>
            <p className="shopping-agent-comparison-hint mt-2 font-mono-archive text-[15px] text-muted-foreground">Swipe and scroll to inspect the screenshot</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-prototype">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:gap-12">
          <h2 id="shopping-prototype" className="site-eyebrow font-mono-archive text-accent">02 — Prototype</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p><strong className="font-semibold text-foreground">The MVP had three journeys: search, refine, compare.</strong></p>
            <p>The challenge: <strong className="font-semibold text-foreground">make the experience conversational without losing what makes shopping visual, contextual, and emotional.</strong></p>
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
        <div className="grid gap-5 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:gap-12">
          <h2 id="shopping-build" className="site-eyebrow font-mono-archive text-accent">03 — Build</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p><strong className="font-semibold text-foreground">I designed the interaction model, wrote the system instructions, shaped the agent's voice, and connected it to our shopping infrastructure.</strong></p>
            <p>
              <span className="block"><strong className="font-semibold text-foreground">Gemini</strong> handled the conversation.</span>
              <span className="block"><strong className="font-semibold text-foreground">Our intent layer</strong> translated shopper language into search queries.</span>
              <span className="block"><strong className="font-semibold text-foreground">Our APIs</strong> handled PDP, Add to Cart, and Wishlist actions.</span>
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-learning">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] lg:gap-12">
          <h2 id="shopping-learning" className="site-eyebrow font-mono-archive text-accent">04 — Learn</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p><strong className="font-semibold text-foreground">Teaching the agent how to shop</strong></p>
            <p>I built a library of representative shopping questions and expected behaviors to evaluate whether the agent was actually helping shoppers—not just generating convincing answers.</p>
            <figure className="pt-3">
              <a href={media('system-instructions-sample.png')} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                <img src={media('system-instructions-sample.png')} alt="Ask TRR spreadsheet showing system instructions, shopper questions, and assistant sample responses." width={1766} height={1168} loading="lazy" className="block h-auto w-full border border-border" />
              </a>
              <a href={media('ask-trr-agent-instructions.xlsx')} download="Ask_TRR_Agent_Instructions.xlsx" className="mt-4 inline-flex items-center gap-2 text-base font-medium text-accent underline underline-offset-4 hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                Download the Excel sheet <Download size={15} aria-hidden="true" />
              </a>
            </figure>
            <p>Natural language unlocked new kinds of shopping intent.</p>
            <p className="text-muted-foreground">The conversational interface showed fewer products and made comparison harder.</p>
            <p><strong className="font-semibold text-foreground">Chat is great for understanding. Feeds are great for shopping.</strong></p>
            <figure>
              <img src={media('customer-feedback.png')} alt="Customer feedback screenshot listing issues with responses, examples, AI search inventory, and the number of products shown." width={676} height={244} loading="lazy" className="block h-auto w-full border border-border" />
              <figcaption className="mt-3">Customer feedback pointed to the same thing: shoppers wanted more products, easier comparison, and a more visual way to explore.</figcaption>
            </figure>
            <p><strong className="font-semibold text-foreground">The future isn't a chatbot replacing a website. It's conversational intelligence embedded inside a visual shopping experience.</strong></p>
          </div>
        </div>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}