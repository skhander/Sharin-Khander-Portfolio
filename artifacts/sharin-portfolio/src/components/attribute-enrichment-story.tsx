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
    <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-8 text-left sm:px-10 md:py-10 lg:px-16" aria-labelledby={id}>
      <div className="grid gap-4 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-10">
        <h2 id={id} className="max-w-[16ch] font-editorial text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.2] tracking-[-.025em]">{title}</h2>
        <div className="max-w-2xl self-start space-y-4 text-base leading-[1.7] text-muted-foreground md:text-[17px]">{children}</div>
      </div>
    </section>
  );
}

export function AttributeEnrichmentStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <div className="page-reveal">
      <header className="mx-auto max-w-[1440px] px-6 pb-8 pt-8 text-left sm:px-10 md:pb-10 md:pt-10 lg:px-16">
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-[15px] leading-relaxed text-muted-foreground">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="mt-9 grid gap-4 md:mt-12 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:items-start md:gap-10">
          <div>
            <p className="site-eyebrow font-mono-archive leading-relaxed text-accent">{project.company} / {project.title}</p>
            <h1 id="catalog-title" className="mt-3 font-editorial text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.12] tracking-[-.035em]" data-testid="text-project-title">{project.title}</h1>
          </div>
          <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-[18px]">{project.description}</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-5 text-left sm:px-10 md:py-6 lg:px-16" aria-label={`${project.title} at a glance`}>
        <dl className="grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex flex-col justify-start py-4 text-left sm:px-5 sm:py-2 sm:first:pl-0">
            <dt className="order-2 mt-2 font-mono-archive text-[15px] leading-relaxed text-muted-foreground">Approach</dt>
            <dd className="order-1 font-editorial text-[clamp(1.2rem,2vw,1.75rem)] font-semibold leading-tight tracking-[-.02em]">LLM + computer vision</dd>
          </div>
          <div className="flex flex-col justify-start py-4 text-left sm:px-5 sm:py-2">
            <dt className="order-2 mt-2 font-mono-archive text-[15px] leading-relaxed text-muted-foreground">Products</dt>
            <dd className="order-1 font-editorial text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-.03em]">6m+</dd>
          </div>
          <div className="flex flex-col justify-start py-4 text-left sm:px-5 sm:py-2 sm:last:pr-0">
            <dt className="order-2 mt-2 font-mono-archive text-[15px] leading-relaxed text-muted-foreground">Experiences</dt>
            <dd className="order-1 font-editorial text-[clamp(1.2rem,2vw,1.75rem)] font-semibold leading-tight tracking-[-.02em]">Search · Browse · Recommendations</dd>
          </div>
        </dl>
      </section>

      <StorySection id="catalog-problem" title="The problem">
        <p>People search for a vibe. The catalog only knew the color. A query like <strong className="font-medium text-foreground">“’90s minimalist dress for a black-tie wedding”</strong> had nowhere to land.</p>
      </StorySection>

      <StorySection id="catalog-built" title="What I built">
        <p>It reads a product photo and predicts trend, occasion, and style.</p>
        <p>I defined the labels and the test. Then I worked with the AI team on the prompts, and on where the new data shows up: search, browse, and recommendations.</p>
      </StorySection>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="catalog-examples">
        <div className="flex flex-col items-start gap-2">
          <h2 id="catalog-examples" className="font-editorial text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.2] tracking-[-.025em]">Inside the catalog</h2>
          <p className="site-eyebrow font-mono-archive leading-relaxed text-muted-foreground">Product images → richer attributes</p>
        </div>
        <div className="mt-5 grid gap-6 md:mt-7 md:grid-cols-2 md:gap-5">
          {examples.map(({ image, title, alt }) => (
            <figure key={image} className="min-w-0">
              <a href={media(image)} target="_blank" rel="noopener noreferrer" className="block overflow-hidden border border-border bg-white transition-opacity hover:opacity-90" aria-label={`Open full image: ${title}`}>
                <img src={media(image)} alt={alt} loading="lazy" className="block aspect-[1030/583] w-full object-contain" />
              </a>
              <figcaption className="mt-2 flex flex-col items-start gap-2 font-mono-archive text-[15px] leading-relaxed text-muted-foreground">
                <span>{title} / Attribute example</span>
                <a href={media(image)} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-1 text-[15px] leading-relaxed text-accent underline underline-offset-4 hover:text-foreground">Open full image <ArrowUpRight size={12} aria-hidden="true" /></a>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <StorySection id="catalog-hard-part" title="The hard part">
        <p>The first labels were wrong. I built a test, found the worst misses, and worked with the AI team to fix the prompts.</p>
      </StorySection>

      <StorySection id="catalog-learned" title="What I learned">
        <p className="font-editorial text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.2] text-foreground">The model is only as good as the test you run on it.</p>
      </StorySection>

      <ProjectNavigation nextProject={nextProject} />
    </div>
  );
}