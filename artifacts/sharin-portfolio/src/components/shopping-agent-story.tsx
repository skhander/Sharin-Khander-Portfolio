import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import { ProjectNavigation } from '@/components/project-content';
import './shopping-agent-story.css';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/shopping-agent/${filename}`;

const metrics = [
  { value: '+1%', label: 'Conversion' },
  { value: '+3%', label: 'Obsessions / visitor' },
  { value: '$14M', label: 'Annualized GMV' },
];

export function ShoppingAgentStory({ nextProject }: { project: Project; nextProject: Project }) {
  return (
    <article className="page-reveal shopping-agent-story">
      <header className="mx-auto max-w-[1440px] px-6 pb-12 pt-10 sm:px-10 md:pb-16 md:pt-14 lg:px-16" aria-labelledby="shopping-agent-title">
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground" data-testid="link-back-shopping-agent">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="mt-14 grid gap-7 md:mt-20 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:items-end md:gap-16">
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">The RealReal / Shopping Agent</p>
            <h1 id="shopping-agent-title" className="mt-5 font-editorial text-[clamp(3.8rem,8vw,8rem)] leading-[.84] tracking-[-.05em]" data-testid="text-project-title">Shopping Agent</h1>
          </div>
          <p className="max-w-2xl text-lg leading-[1.4] text-muted-foreground sm:text-xl">Search shouldn&apos;t require shoppers to speak in catalog.</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-label="Shopping Agent metrics">
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
          <h2 id="shopping-problem" className="font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">The problem</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p className="font-medium">People think in intent. Search thinks in attributes.</p>
            <p className="text-muted-foreground">Traditional search works when you know what a product is called.</p>
            <p className="text-muted-foreground">But shoppers actually think:</p>
            <blockquote className="border-l-2 border-accent pl-5 font-editorial text-[clamp(1.9rem,3vw,3rem)] leading-[1.06] tracking-[-.025em]">“90s minimalist Calvin Klein look for a winter wedding.”</blockquote>
          </div>
        </div>
        <figure className="shopping-agent-media mt-10 md:mt-14">
          <div className="shopping-agent-image-frame shopping-agent-image-frame--search" tabIndex={0} role="region" aria-label="Traditional Search screenshot; scroll to inspect">
            <img src={media('traditional-search.png')} alt="The RealReal traditional search results for black silk dress, showing a keyword search box, filters, and a grid of black dresses." loading="lazy" />
          </div>
          <figcaption className="mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Traditional Search / “black silk dress”</figcaption>
          <p className="mt-2 font-mono-archive text-[10px] text-muted-foreground sm:hidden">Scroll to inspect the screenshot</p>
        </figure>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-build">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="shopping-build" className="font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">The build</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p className="font-medium">I built an AI shopping agent that lets shoppers search the way they think.</p>
            <p className="text-muted-foreground">Powered by Gemini and connected to our <strong className="font-medium text-foreground">6M+ product catalog, search, and cart APIs.</strong></p>
            <p className="text-muted-foreground">I owned the <strong className="font-medium text-foreground">product experience, agent behavior, and brand voice</strong>, partnering with ML + Engineering to take it from prototype → production.</p>
          </div>
        </div>
        <figure className="shopping-agent-media mt-10 md:mt-14">
          <div className="shopping-agent-image-frame shopping-agent-image-frame--agent" tabIndex={0} role="region" aria-label="Shopping Agent screenshot; scroll to inspect">
            <img src={media('agent-results.png')} alt="Ask TRR Shopping Agent responding to a request for a 90s minimalist Calvin Klein look for a winter wedding with a visual selection of dresses." loading="lazy" />
          </div>
          <figcaption className="mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Shopping Agent / “90s minimalist Calvin Klein look for a winter wedding.”</figcaption>
          <p className="mt-2 font-mono-archive text-[10px] text-muted-foreground sm:hidden">Swipe and scroll to inspect the screenshot</p>
        </figure>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-learning">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="shopping-learning" className="font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">What we learned</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p className="font-medium">Natural language solved the search problem.<br />Chat created a new one.</p>
            <p className="text-muted-foreground">The agent could understand much richer intent — but the experience was still too <strong className="font-medium text-foreground">text-heavy and narrow for visual shopping.</strong></p>
            <p className="text-muted-foreground">People wanted to see more products, compare options, and explore.</p>
            <p className="border-l-2 border-accent pl-5 font-editorial text-[clamp(1.9rem,3vw,3rem)] leading-[1.06] tracking-[-.025em]">The next opportunity: combine conversational intent with a visual-first shopping experience.</p>
          </div>
        </div>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}