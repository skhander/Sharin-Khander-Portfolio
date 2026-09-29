import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import { ProjectNavigation } from './project-content';
import './similar-designers-case-study.css';

const metrics = [
  { value: '$30M', label: 'GMV' },
  { value: '+3%', label: 'GMV per visitor' },
  { value: '↓10%', label: 'bounce rate' },
];

const phases = [
  {
    label: '01 — What shoppers bought together',
    name: 'Behavioral similarity',
    src: 'similar-designers-phase-1.png',
    alt: 'Customers Also Shop: Chanel, Christian Dior, Gucci, Prada, Fendi, Hermès',
  },
  {
    label: '02 — What looks and feels similar',
    name: 'Visual + attribute similarity',
    src: 'similar-designers-phase-2.png',
    alt: 'Similar Designers: Fendi, Gucci, Loewe, Celine, Ferragamo, Miu Miu',
  },
  {
    label: '03 — What you might like',
    name: 'Personalization',
    src: 'similar-designers-phase-3.png',
    alt: 'You may also like: Mulberry, Strathberry, DeMellier, Polène, Mansur Gavriel, APC',
  },
];

function StorySection({ id, heading, children }: { id: string; heading: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby={id}>
      <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
        <h2 id={id} className="max-w-[12ch] font-editorial text-[clamp(2.5rem,4.5vw,4.5rem)] leading-[.94] tracking-[-.04em]">{heading}</h2>
        <p className="max-w-2xl self-end text-base leading-[1.6] text-muted-foreground md:text-lg">{children}</p>
      </div>
      {id === 'similar-built' && (
        <div className="similar-designers-media mt-10 md:mt-14">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.14em] text-accent">Similar Designers progression</p>
          <div className="similar-designers-phases mt-8 md:mt-12">
            {phases.map((phase) => (
              <figure className="similar-designers-phase" key={phase.label}>
                <figcaption>
                  <span className="block font-mono-archive text-[11px] tracking-[.14em] text-accent">{phase.label}</span>
                  <span className="mt-2 block font-editorial text-[clamp(1.1rem,1.6vw,1.4rem)] leading-tight">{phase.name}</span>
                </figcaption>
                <img src={`${import.meta.env.BASE_URL}media/work/${phase.src}`} alt={phase.alt} width={684} height={1312} loading="lazy" />
              </figure>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export function SimilarDesignersStory({ nextProject }: { project: Project; nextProject: Project }) {
  return (
    <article className="page-reveal similar-designers-case-study">
      <header className="mx-auto max-w-[1440px] px-6 pb-12 pt-10 sm:px-10 md:pb-16 md:pt-14 lg:px-16">
        <Link href="/" className="inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground archive-link">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="mt-14 grid grid-cols-1 gap-7 md:mt-20 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:items-end md:gap-16">
          <div>
            <h1 className="max-w-3xl font-editorial text-[clamp(3.8rem,8vw,8rem)] leading-[.84] tracking-[-.05em]">Similar Designers</h1>
          </div>
          <p className="max-w-2xl text-lg leading-[1.4] text-muted-foreground sm:text-xl">Helping shoppers discover their next favorite designer.</p>
        </div>
      </header>

      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-label="Similar Designers metrics">
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col py-6 sm:px-6 sm:py-2 first:sm:pl-0 last:sm:pr-0">
              <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">{metric.label}</dt>
              <dd className="order-1 font-editorial text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-.04em]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <StorySection id="similar-problem" heading="The problem">
        <strong className="block font-semibold">80% of shoppers landing on Designer pages bounced.</strong>{' '}
        <span className="mt-5 block">I built a recommendation experience that turned Designer pages from a dead end into a starting point for discovery.</span>
      </StorySection>

      <StorySection id="similar-built" heading="What I built">
        <span className="block">I started with “Customers Also Shop” then evolved into a designer discovery engine.</span>{' '}
        <span className="mt-5 block">Next layering in <strong className="font-semibold">visual similarity → attribute similarity → personalized recommendations.</strong></span>
      </StorySection>

      <StorySection id="similar-hard-part" heading="The hard part">
        We had to speed-run from a basic recommendation model to something genuinely useful. We started with behavioral similarity, then layered in visual and attribute similarity, and finally personalization. Each phase was an experiment: learn what drives deeper exploration, then build on it.
      </StorySection>

      <StorySection id="similar-learned" heading="What I learned">
        Get to useful before you optimize for incrementality.
      </StorySection>

      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}