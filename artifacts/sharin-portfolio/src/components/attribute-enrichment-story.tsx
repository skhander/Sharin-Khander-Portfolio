import type { ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { ProjectNavigation } from './project-content';
import type { Project } from '@/lib/projects';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/attribute-enrichment/${filename}`;

const examples = [
  {
    image: 'chanel-attribute-taxonomy.png',
    title: 'Chanel vintage top',
    alt: 'Chanel vintage top shown alongside predicted aesthetic, colorway, occasion, target customer, and body-shape attributes.',
  },
  {
    image: 'marni-attribute-taxonomy.png',
    title: 'Marni striped shirt',
    alt: 'Marni striped shirt shown alongside predicted aesthetic, colorway, occasion, target customer, and body-shape attributes.',
  },
];

function StorySection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby={id}>
      <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
        <h2 id={id} className="max-w-[12ch] font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">{title}</h2>
        <div className="max-w-2xl self-end space-y-5 text-base leading-[1.6] text-muted-foreground md:text-lg">{children}</div>
      </div>
    </section>
  );
}

export function AttributeEnrichmentStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <div className="page-reveal">
      <header className="mx-auto max-w-[1440px] px-6 pb-12 pt-10 sm:px-10 md:pb-16 md:pt-14 lg:px-16">
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="mt-14 grid gap-7 md:mt-20 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:items-end md:gap-16">
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">{project.company} / Catalog Enrichment</p>
            <h1 id="catalog-title" className="mt-5 font-editorial text-[clamp(3.8rem,7vw,7rem)] leading-[.84] tracking-[-.05em]" data-testid="text-project-title">Catalog Enrichment</h1>
          </div>
          <p className="max-w-2xl text-lg leading-[1.4] text-muted-foreground sm:text-xl">Teaching a 6M-item catalog to understand how people actually shop.</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-label="Catalog Enrichment at a glance">
        <dl className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex flex-col justify-center py-6 sm:px-6 sm:py-2 sm:first:pl-0">
            <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Approach</dt>
            <dd className="order-1 font-editorial text-[clamp(1.8rem,2.9vw,3.2rem)] leading-none tracking-[-.03em]">LLM + Computer Vision</dd>
          </div>
          <div className="flex flex-col justify-center py-6 sm:px-6 sm:py-2">
            <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Products</dt>
            <dd className="order-1 font-editorial text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-.04em]">6M+</dd>
          </div>
          <div className="flex flex-col justify-center py-6 sm:px-6 sm:py-2 sm:last:pr-0">
            <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Experiences</dt>
            <dd className="order-1 font-editorial text-[clamp(1.8rem,2.9vw,3.2rem)] leading-none tracking-[-.03em]">Search · Browse · Recommendations</dd>
          </div>
        </dl>
      </section>

      <StorySection id="catalog-problem" title="The problem">
        <p>Our catalog understood basic attributes like color, category, and silhouette. But customers search for things like <strong className="font-medium text-foreground">“’90s minimalist dress for a black-tie wedding.”</strong> Our data couldn&apos;t understand that.</p>
      </StorySection>

      <StorySection id="catalog-built" title="What I built">
        <p>An AI-powered enrichment system that predicts <strong className="font-medium text-foreground">trends, occasions, and aesthetics</strong> from product images.</p>
        <p>I owned the product end to end—from defining the attributes and evaluation framework to working with the AI team on prompts, quality, and how the new data would power search, browse, and recommendations.</p>
      </StorySection>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="catalog-examples">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="catalog-examples" className="font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">Inside the catalog</h2>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Product images → richer attributes</p>
        </div>
        <div className="mt-8 grid gap-8 md:mt-12 md:grid-cols-2 md:gap-6">
          {examples.map(({ image, title, alt }) => (
            <figure key={image} className="min-w-0">
              <a href={media(image)} target="_blank" rel="noopener noreferrer" className="block overflow-hidden border border-border bg-[hsl(var(--olive-surface)/.3)] transition-opacity hover:opacity-90" aria-label={`Open full image: ${title}`}>
                <img src={media(image)} alt={alt} loading="lazy" className="block aspect-[1030/583] w-full object-contain" />
              </a>
              <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">
                <span>{title} / Attribute example</span>
                <a href={media(image)} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-accent underline underline-offset-4 hover:text-foreground">Open full image <ArrowUpRight size={12} aria-hidden="true" /></a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <StorySection id="catalog-hard-part" title="The hard part">
        <p><strong className="font-medium text-foreground">Quality.</strong> Early versions produced false labels and inconsistent results. I built an evaluation framework, identified the biggest failure patterns, and worked with the AI team to improve the prompts and model output.</p>
      </StorySection>

      <StorySection id="catalog-learned" title="What I learned">
        <p className="font-editorial text-[clamp(2rem,3vw,3rem)] leading-[1.12] text-foreground">AI products are only as good as the evaluation behind them.</p>
      </StorySection>

      <ProjectNavigation nextProject={nextProject} />
    </div>
  );
}