import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import { ProjectNavigation } from './project-content';
import './similar-designers-case-study.css';

const metrics = [
  { value: '80%', label: 'bounce on designer pages' },
  { value: '+3%', label: 'GMV per visitor' },
  { value: '−10%', label: 'bounce rate' },
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
          <p className="font-mono-archive text-[10px] uppercase tracking-[.14em] text-accent">0 → 1 · PRODUCT + ML · RECOMMENDATIONS</p>
          <div className="similar-designers-placeholder similar-designers-prototype mt-8 md:mt-12" role="img" aria-label="Placeholder for the Similar Designers prototype or product visual">
            <span>Similar Designers prototype / product visual</span>
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
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">SIMILAR DESIGNERS</p>
            <h1 className="mt-5 max-w-3xl font-editorial text-[clamp(3.8rem,8vw,8rem)] leading-[.84] tracking-[-.05em]">Similar Designers</h1>
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
        80% of people landing on Designer pages bounced. We believed the products weren't resonating — and needed to give shoppers better paths to explore.
      </StorySection>

      <StorySection id="similar-built" heading="What I built">
        A recommendation experience that evolved from “customers also shop” into personalized designer discovery based on what you like, what looks similar, and what fits your price point.
      </StorySection>

      <StorySection id="similar-hard-part" heading="The hard part">
        We had to speed-run from a basic recommendation model to something genuinely useful. We started with behavioral similarity, then layered in visual and attribute similarity, and finally personalization. Each phase was an experiment: learn what drives deeper exploration, then build on it.
      </StorySection>

      <StorySection id="similar-learned" heading="What I learned">
        Get to useful before you optimize for incrementality.
      </StorySection>

      <section className="mx-auto max-w-[1440px] border-b border-border px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-label="Similar Designers progression">
        <div className="similar-designers-media">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.14em] text-accent">Similar Designers progression · Phase 1 → Phase 2 → Phase 3</p>
          <div className="similar-designers-phases mt-8 md:mt-12">
            {[1, 2, 3].map((phase) => (
              <div className="similar-designers-placeholder similar-designers-phase" role="img" aria-label={`Placeholder for Phase ${phase} screenshot`} key={phase}>
                <span>Phase {phase}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}