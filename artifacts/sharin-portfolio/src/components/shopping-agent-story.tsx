import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import { ProjectNavigation } from '@/components/project-content';
import './shopping-agent-story.css';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/shopping-agent/${filename}`;

const metrics = [
  { value: '+1%', label: 'Visitor conversion' },
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
          <h1 id="shopping-agent-title" className="font-editorial text-[clamp(3.8rem,8vw,8rem)] leading-[.84] tracking-[-.05em]" data-testid="text-project-title">Shopping Agent</h1>
          <div className="max-w-2xl space-y-5">
            <p className="text-lg leading-[1.4] sm:text-xl">Expanding search beyond structured product attributes.</p>
            <p className="text-base leading-[1.6] text-muted-foreground md:text-lg">I led the 0→1 build of an AI shopping agent that allowed shoppers to search using natural language. I owned the product experience, agent behavior, and brand voice, partnering with ML and Engineering to take it from prototype to production.</p>
          </div>
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
          <h2 id="shopping-problem" className="font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">The problem</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p className="font-medium">Traditional search was limited by product attributes.</p>
            <p className="text-muted-foreground">The RealReal has 6M+ products, but traditional search relies heavily on the language used to describe those products.</p>
            <p className="text-muted-foreground">Shoppers often search using a combination of style, occasion, aesthetic, brand, and other contextual signals that aren&apos;t captured by a simple keyword query.</p>
            <blockquote className="border-l-2 border-accent pl-5 font-editorial text-[clamp(1.9rem,3vw,3rem)] leading-[1.06] tracking-[-.025em]">“90s minimalist Calvin Klein look for a winter wedding.”</blockquote>
          </div>
        </div>
        <figure className="shopping-agent-media mt-10 md:mt-14">
          <figcaption className="mb-4 space-y-1">
            <span className="block font-editorial text-2xl">Traditional search</span>
            <span className="block text-muted-foreground">“black silk dress”</span>
          </figcaption>
          <div className="shopping-agent-image-frame shopping-agent-image-frame--search" tabIndex={0} role="region" aria-label="Traditional Search screenshot; scroll to inspect">
            <img src={media('traditional-search.png')} alt="The RealReal traditional search results for black silk dress, showing a keyword search box, filters, and a grid of black dresses." loading="lazy" />
          </div>
          <p className="mt-2 font-mono-archive text-[10px] text-muted-foreground sm:hidden">Scroll to inspect the screenshot</p>
        </figure>
        <figure className="shopping-agent-media mt-10 md:mt-14">
          <figcaption className="mb-4 space-y-1">
            <span className="block font-editorial text-2xl">Shopping Agent</span>
            <span className="block text-muted-foreground">“90s minimalist Calvin Klein look for a winter wedding”</span>
          </figcaption>
          <div className="shopping-agent-image-frame shopping-agent-image-frame--agent" tabIndex={0} role="region" aria-label="Shopping Agent screenshot; scroll to inspect">
            <img src={media('agent-results.png')} alt="Ask TRR Shopping Agent responding to a request for a 90s minimalist Calvin Klein look for a winter wedding with a visual selection of dresses." loading="lazy" />
          </div>
          <p className="mt-2 font-mono-archive text-[10px] text-muted-foreground sm:hidden">Swipe and scroll to inspect the screenshot</p>
        </figure>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-build">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="shopping-build" className="font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">The build</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p className="font-medium">I prototyped a natural-language search experience.</p>
            <p className="text-muted-foreground">I started with the shopper experience and defined how the agent should interpret requests, retrieve products, and respond.</p>
            <p>I owned:</p>
            <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
              <li>Product experience</li>
              <li>Agent behavior and instructions</li>
              <li>Brand voice</li>
              <li>Shopper journeys</li>
              <li>Evaluation and testing</li>
            </ul>
            <p className="text-muted-foreground">I partnered with ML and Engineering to connect the agent to our 6M+ product catalog, search, and cart APIs, taking the experience from prototype → production.</p>
          </div>
        </div>
        <figure className="shopping-agent-media mt-10 md:mt-14">
          <img className="mx-auto block w-full max-w-[460px]" src={`${import.meta.env.BASE_URL}media/work/shopping-agent-comparison.png`} alt="Mobile Shopping Agent comparing two diamond bracelets, with product details shown side by side." loading="lazy" />
        </figure>
      </section>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="shopping-learning">
        <div className="grid gap-8 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <h2 id="shopping-learning" className="font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">What we learned</h2>
          <div className="max-w-2xl space-y-5 text-base leading-[1.6] md:text-lg">
            <p className="font-medium">Natural-language search expanded the types of intent we could support.</p>
            <p className="text-muted-foreground">The agent could interpret more contextual requests than traditional keyword search.</p>
            <p className="text-muted-foreground">But the experience also surfaced a limitation: shopping is highly visual.</p>
            <p className="text-muted-foreground">The conversational interface presented fewer products at a time and made it harder for shoppers to compare and explore.</p>
            <p className="text-muted-foreground">This shifted the product direction toward combining natural-language intent with a more visual shopping experience.</p>
          </div>
        </div>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}