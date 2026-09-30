import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import moduleScreenshot from '@assets/Screenshot_2026-09-30_at_6.38.46_AM_1790775534830.png';
import placementScreenshot from '@assets/Screenshot_2026-09-29_at_3.15.39_PM_1790775289060.png';
import { ProjectNavigation } from './project-content';
import './similar-designers-case-study.css';

const metrics = [
  { value: '$30M', label: 'GMV' },
  { value: '+3%', label: 'GMV per visitor' },
  { value: '↓10%', label: 'Bounce rate' },
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
    <section className="similar-story-section mx-auto max-w-[1440px] border-b border-border px-6 py-9 sm:px-10 md:py-11 lg:px-16" aria-labelledby={id}>
      <div className="similar-story-grid">
        <h2 id={id} className="similar-story-heading font-editorial">{heading}</h2>
        <div className="similar-story-copy text-muted-foreground">{children}</div>
      </div>
      {id === 'similar-built' && (
        <div className="similar-designers-media mt-8">
          <p className="site-eyebrow similar-progression-label text-muted-foreground">Similar Designers progression</p>
          <div className="similar-designers-phases mt-6">
            {phases.map((phase) => (
              <figure className="similar-designers-phase" key={phase.label}>
                <figcaption>
                  <span className="site-eyebrow similar-phase-label block text-muted-foreground">{phase.label}</span>
                  <span className="similar-phase-name mt-2 block font-editorial">{phase.name}</span>
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
      <header className="similar-case-header mx-auto max-w-[1440px] px-6 pb-9 pt-10 sm:px-10 md:pb-11 md:pt-12 lg:px-16">
        <Link href="/" className="similar-back-link inline-flex items-center gap-2 text-muted-foreground archive-link">
          <ArrowLeft size={14} aria-hidden="true" /> All work
        </Link>
        <div className="similar-case-intro mt-9">
          <h1 className="font-editorial">Similar Designers</h1>
          <p className="text-muted-foreground">Helping shoppers discover their next favorite designer.</p>
        </div>
      </header>

      <section className="similar-metrics mx-auto max-w-[1440px] border-y border-border px-6 py-5 sm:px-10 md:py-6 lg:px-16" aria-label="Similar Designers metrics">
        <dl className="grid grid-cols-1 divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {metrics.map((metric) => (
            <div key={metric.label} className="similar-metric flex flex-col py-4 sm:px-6 sm:py-1 first:sm:pl-0 last:sm:pr-0">
              <dt className="order-2 mt-1 text-muted-foreground">{metric.label}</dt>
              <dd className="order-1 font-editorial">{metric.value}</dd>
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

      <StorySection id="similar-tradeoffs" heading="Trade-offs">
        <div className="similar-tradeoff-block">
          <h3>Generic vs. personalized</h3>
          <p>Early recommendations were too generic. We invested further in personalization to make them more relevant.</p>
          <a href={moduleScreenshot} target="_blank" rel="noopener noreferrer" aria-label="View full-size Similar Designers module screenshot" data-testid="link-similar-designers-module">
            <img src={moduleScreenshot} alt="Similar Designers module with designer tabs above a row of product placeholders." loading="lazy" />
          </a>
        </div>
        <div className="similar-tradeoff-block">
          <h3>Visibility vs. screen real estate</h3>
          <p>Mid-page placement hurt funnel engagement. We moved the module lower and gave it enough space to show personalized products without disrupting browsing.</p>
          <a href={placementScreenshot} target="_blank" rel="noopener noreferrer" aria-label="View full-size placement comparison" data-testid="link-similar-designers-placement">
            <img src={placementScreenshot} alt="Three mobile page variants comparing the original, mid-page, and bottom placement of the recommendation module." loading="lazy" />
          </a>
        </div>
        <p className="similar-tradeoff-takeaway"><strong>Takeaway:</strong> Relevance and enough product context both mattered.</p>
      </StorySection>

      <StorySection id="similar-learned" heading="What I learned">
        <span className="block">Lower price didn’t mean lower value.</span>{' '}
        <span className="mt-5 block">Personalized recommendations drove the highest conversion without hurting GMV or AOV.</span>
      </StorySection>

      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}