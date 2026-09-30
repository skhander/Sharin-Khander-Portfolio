import { useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowUp, ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import './curation-story.css';

const media = (file: string) => `${import.meta.env.BASE_URL}media/curation/${file}`;

function BeatLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="curation-beat-label">
      <span className="curation-beat-number" aria-hidden="true">{number}</span>
      <span className="curation-beat-name">{children}</span>
    </div>
  );
}

function Walkthrough({
  video,
  poster,
  alt,
  caption,
}: {
  video: string;
  poster: string;
  alt: string;
  caption: string;
}) {
  const [started, setStarted] = useState(false);

  return (
    <figure className="curation-media">
      <figcaption className="curation-media-caption">{caption}</figcaption>
      {started ? (
        <video
          className="curation-prototype-video"
          controls
          autoPlay
          playsInline
          preload="metadata"
          poster={media(poster)}
          aria-label={alt}
        >
          <source src={media(video)} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <button
          type="button"
          className="curation-prototype-preview"
          onClick={() => setStarted(true)}
          aria-label={`Play ${alt}`}
        >
          <img src={media(poster)} alt={alt} loading="lazy" />
          <span className="curation-prototype-play">
            <Play size={14} fill="currentColor" aria-hidden="true" />
            Play prototype
          </span>
        </button>
      )}
    </figure>
  );
}

function CustomerPage({ image, alt, label }: { image: string; alt: string; label: string }) {
  return (
    <figure className="curation-media">
      <figcaption className="curation-media-caption curation-customer-caption">
        <span>{label}</span>
        <a href={media(image)} target="_blank" rel="noopener noreferrer">
          Open full image <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </figcaption>
      <div className="curation-customer-frame" tabIndex={0} role="region" aria-label={`${label}; scroll to inspect the full screenshot`}>
        <img src={media(image)} alt={alt} loading="lazy" />
      </div>
    </figure>
  );
}

function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="curation-bullets">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  );
}

export function CurationStory({ nextProject }: { project: Project; nextProject: Project }) {
  return (
    <main className="page-reveal curation-story">
      <section className="curation-beat curation-problem" aria-labelledby="curation-problem-title">
        <div className="curation-container">
          <Link href="/" className="curation-back archive-link">
            <ArrowLeft size={14} aria-hidden="true" /> All work
          </Link>
          <div className="curation-problem-top">
            <BeatLabel number="01">The Problem</BeatLabel>
          </div>
          <h1 id="curation-problem-title" className="curation-title curation-problem-title">
            Curation was manual, slow, and difficult to scale.
          </h1>
          <div className="curation-problem-bottom">
            <BulletList items={[
              <>Merchandisers spent <strong>weeks building assortments</strong> that might only live for a few days.</>,
              <>Switching between multiple tools.</>,
              <>Manually searching through the product catalog.</>,
              <>No recommendations to help decide what to pull.</>,
            ]} />
            <div className="curation-problem-evidence">
              <figure className="curation-problem-visual">
                <img
                  src={media('falls-best-bags.png')}
                  alt="Fall's Best Bags assortment showing editor-selected designer bags"
                  width={1043}
                  height={576}
                />
              </figure>
              <div className="curation-problem-numbers" aria-label="Median assortment production time: 2 weeks; shelf-life: 6 days. Production takes longer than the assortment stays live.">
                <div data-testid="stat-curation-production-time"><strong>2 weeks</strong><span>med assortment production time</span></div>
                <span className="curation-number-arrow" aria-hidden="true">→</span>
                <div data-testid="stat-curation-shelf-life"><strong>6 days</strong><span>shelf-life</span></div>
                <p className="curation-problem-comparison">Production time exceeds shelf-life.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="curation-beat curation-shift" aria-labelledby="curation-shift-title">
        <div className="curation-container curation-shift-layout">
          <BeatLabel number="02">The Shift</BeatLabel>
          <div>
            <h2 id="curation-shift-title" className="curation-title curation-shift-title">
              Merchandisers spend <strong>less time searching</strong> and <strong>more time using their taste</strong> to curate the assortment.
            </h2>
          </div>
        </div>
      </section>

      <section className="curation-beat curation-built" aria-labelledby="curation-built-title">
        <div className="curation-container">
          <div className="curation-heading-row">
            <BeatLabel number="03">What I Built</BeatLabel>
          </div>
          <div className="curation-built-layout">
            <div className="curation-built-copy">
              <h2 id="curation-built-title" className="curation-title curation-built-title">One place<br />to curate</h2>
              <BulletList items={[
                'Recommendations built into the workflow',
                'Less manual searching',
              ]} />
            </div>
            <Walkthrough
              video="curation-tool-prototype.mp4"
              poster="curation-tool-poster.jpg"
              alt="Curation Tool prototype showing the Create New Editorial interface"
              caption="The workflow · Click to play"
            />
          </div>
        </div>
      </section>

      <section className="curation-beat curation-owned" aria-labelledby="curation-owned-title">
        <div className="curation-container">
          <div className="curation-heading-row">
            <BeatLabel number="04">What I Owned</BeatLabel>
            <span className="curation-eyebrow">01 → 04 / end to end</span>
          </div>
          <h2 id="curation-owned-title" className="curation-title curation-owned-title">I owned it <em>end to end.</em></h2>
          <ol className="curation-ownership">
            <li>
              <span className="curation-ownership-number">01</span>
              <div><h3>Discovery</h3><p>Shadowed merchandisers across levels</p></div>
            </li>
            <li>
              <span className="curation-ownership-number">02</span>
              <div><h3>Definition</h3><p>Partnered with Engineering on scope, timelines, phased delivery</p></div>
            </li>
            <li>
              <span className="curation-ownership-number">03</span>
              <div><h3>Execution</h3><p>Owned workflow quality + recommendation quality</p></div>
            </li>
            <li>
              <span className="curation-ownership-number">04</span>
              <div><h3>Adoption</h3><p>Onboarding + change management as teams moved over</p></div>
            </li>
          </ol>
        </div>
      </section>

      <section className="curation-beat curation-goals" aria-labelledby="curation-goals-title">
        <div className="curation-container">
          <div className="curation-heading-row">
            <BeatLabel number="05">The Goals</BeatLabel>
          </div>
          <h2 id="curation-goals-title" className="curation-title curation-goals-title">Three measures of a better workflow</h2>
          <div className="curation-goal-list">
            <article className="curation-goal">
              <span>01</span>
              <div>
                <h3 className="curation-goal-with-trend">
                  Production time
                  <span className="curation-goal-trend" role="img" aria-label="decreasing">
                    <ArrowDown size={17} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </h3>
                <p>increased efficiency</p>
              </div>
            </article>
            <article className="curation-goal">
              <span>02</span>
              <div>
                <h3 className="curation-goal-with-trend">
                  More edits
                  <span className="curation-goal-trend" role="img" aria-label="increasing">
                    <ArrowUp size={17} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                </h3>
                <p>Increase assortment edits</p>
              </div>
            </article>
            <article className="curation-goal">
              <span>03</span><div><h3>Better edits</h3><p>Use recommendations to improve assortment quality</p></div>
            </article>
          </div>
        </div>
      </section>

      <section className="curation-beat curation-hard-part" aria-labelledby="curation-hard-title">
        <div className="curation-container">
          <div className="curation-heading-row">
            <BeatLabel number="06">The Hard Part</BeatLabel>
          </div>
          <div className="curation-hard-layout">
            <div className="curation-hard-story">
              <h2 id="curation-hard-title" className="curation-title curation-hard-title">Recs did not meet the <strong>quality bar</strong>.</h2>
              <div className="curation-contrast" aria-label="Machine recommendation: technically similar. Human curation: actually feels right.">
                <div><span>Machine recommendation</span><strong>“Technically similar”</strong></div>
                <ArrowDown size={17} aria-hidden="true" />
                <div className="curation-human"><span>Human curation</span><strong>“Actually feels right”</strong></div>
              </div>
              <p className="curation-realization">They looked similar.<br /><em>They didn't nail the taste.</em></p>
            </div>
            <div className="curation-hard-detail">
              <Walkthrough
                video="evergreen-tool-prototype.mp4"
                poster="evergreen-tool-poster.jpg"
                alt="Evergreen Sale prototype showing item criteria and editorial review controls"
                caption="Human review · Prototype"
              />
              <div className="curation-change">
                <h3>What we changed</h3>
                <BulletList items={[
                  <>Invested in <strong>richer product metadata</strong></>,
                  <>Added trend, aesthetic, occasion, silhouette</>,
                  <>Added human review + feedback loops</>,
                  <>Merchandiser judgment improved the system over time</>,
                ]} />
                <p className="curation-change-takeaway">Better recommendations needed better product understanding <i>and</i> human judgment.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="curation-beat curation-result" aria-labelledby="curation-result-title">
        <div className="curation-container">
          <div className="curation-heading-row">
            <BeatLabel number="07">The Result</BeatLabel>
            <span className="curation-eyebrow">A better workflow, in the edit</span>
          </div>
          <div className="curation-result-layout">
            <div className="curation-result-copy">
              <h2 id="curation-result-title" className="curation-title curation-result-title"><span>2×</span><br />More onsite<br />edits</h2>
              <BulletList items={[
                'Twice as many onsite edits vs. a year earlier',
                'Better assortment quality',
                'Fewer sold-out products',
              ]} />
              <div className="curation-secondary-metric"><strong>+30%</strong><span>more assortments per quarter</span></div>
            </div>
            <CustomerPage
              image="next-level-layers.png"
              alt="The RealReal Next-Level Layers customer browse page with a four-column edit of clothing, shoes, and accessories"
              label="The edit, live · Next-Level Layers"
            />
          </div>
        </div>
      </section>

      <section className="curation-beat curation-next" aria-labelledby="curation-next-title">
        <div className="curation-container">
          <div className="curation-heading-row">
            <BeatLabel number="08">What's Next</BeatLabel>
          </div>
          <div className="curation-agent">
            <h2 id="curation-next-title" className="curation-title curation-next-title">Agents</h2>
            <p>Pull → Rank → Optimize</p>
          </div>
          <div className="curation-human-role">
            <span className="curation-human-role-label">The human role</span>
            <div>
              <h3>Final arbiter<br /><em>of taste.</em></h3>
              <p>The system does more of the work. Humans define what “good” looks like — and their decisions continuously teach the system.</p>
            </div>
          </div>
          <nav className="curation-next-project" aria-label="Project navigation">
            <Link href={`/work/${nextProject.slug}`} className="archive-link">
              Next project: {nextProject.title} <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </section>
    </main>
  );
}