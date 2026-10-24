import { useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play } from 'lucide-react';
import { Link } from 'wouter';
import type { Project } from '@/lib/projects';
import './curation-story.css';

const media = (file: string) => `${import.meta.env.BASE_URL}media/curation/${file}`;

function Frame({
  caption,
  children,
  action,
}: {
  caption: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <figure className="curation-frame">
      <div className="curation-frame-media">
        {children}
        {action}
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}

function Prototype({
  video,
  poster,
  alt,
  caption,
  playLabel,
}: {
  video: string;
  poster: string;
  alt: string;
  caption: string;
  playLabel: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  return (
    <Frame
      caption={caption}
      action={(
        <button
          type="button"
          className="curation-film-play"
          onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggle(); }}
          aria-label={playing ? `Pause ${playLabel}` : `Play ${playLabel}`}
        >
          {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
        </button>
      )}
    >
      <video
        ref={videoRef}
        poster={media(poster)}
        aria-label={alt}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source src={media(video)} type="video/mp4" />
      </video>
    </Frame>
  );
}

export function CurationStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  return (
    <div className="page-reveal curation-story">
      <div className="curation-wrap">
        <header className="curation-top">
          <Link href="/" className="curation-back archive-link">
            <ArrowLeft size={16} aria-hidden="true" /> All work
          </Link>
          <h1 className="curation-page-title">{project.title}</h1>
          <p className="curation-dek">
            I built a tool that uses recommendations to cut merchandising time by 30%.
          </p>
        </header>

        <section className="curation-section curation-section-problem" aria-labelledby="curation-problem-title">
          <div className="curation-copy">
            <p className="curation-label">01 · The problem</p>
            <h2 id="curation-problem-title" className="curation-headline">
              Curation was <span className="curation-accent">manual</span>, <span className="curation-accent">slow</span>, and didn&apos;t{' '}
              <span className="curation-accent">scale</span>.
            </h2>
            <p className="curation-body">Curating assortments meant:</p>
            <ul className="curation-chips" aria-label="Pain points">
              <li>Switching between multiple tools</li>
              <li>Spending hours searching for the right items</li>
            </ul>
            <div className="curation-result-callout">
              <p className="curation-body curation-body-follow">As a result:</p>
              <ul className="curation-chips" aria-label="Outcomes">
                <li>Curation presence onsite was minimal.</li>
              </ul>
            </div>
          </div>
          <div className="curation-media">
            <Frame caption="Curation onsite">
              <img
                src={media('falls-best-bags.png')}
                alt="Fall's Best Bags assortment showing editor-selected designer bags"
                width={1043}
                height={576}
              />
            </Frame>
          </div>
        </section>

        <section className="curation-section curation-section-opportunity" aria-labelledby="curation-insight-title">
          <div className="curation-copy">
            <p className="curation-label">02 · The opportunity</p>
            <h2 id="curation-insight-title" className="curation-headline">
              One end-to-end tool with <span className="curation-accent">ML-powered recommendations</span>.
            </h2>
            <p className="curation-takeaway">
              <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" />
              <span>
                Merchandisers spend <span className="curation-accent">less time searching</span> for products and{' '}
                <span className="curation-accent">more time curating</span>.
              </span>
            </p>
          </div>
          <div className="curation-media">
            <Prototype
              video="curation-tool-prototype.mp4"
              poster="curation-tool-poster.jpg"
              alt="Curation Enablement prototype showing the Create New Editorial interface"
              caption="Current workflow"
              playLabel="editorial creation workflow"
            />
          </div>
        </section>

        <section className="curation-section curation-section-role" aria-labelledby="curation-role-title">
          <div className="curation-copy">
            <p className="curation-label">03 · My role</p>
            <h2 id="curation-role-title" className="curation-role-title">Led a team of 20 across engineering, ML, and design.</h2>
            <ul className="curation-role-grid">
              <li className="curation-role-cell">
                <span className="curation-accent">Research</span>
                <span className="curation-role-detail">Shadowed merchandisers at every level.</span>
              </li>
              <li className="curation-role-cell">
                <span className="curation-accent">Scope</span>
                <span className="curation-role-detail">Defined the first release with Engineering.</span>
              </li>
              <li className="curation-role-cell">
                <span className="curation-accent">Delivery</span>
                <span className="curation-role-detail">Owned the workflow and recommendation quality.</span>
              </li>
              <li className="curation-role-cell">
                <span className="curation-accent">Adoption</span>
                <span className="curation-role-detail">Moved teams onto the tool.</span>
              </li>
            </ul>
          </div>
          <div className="curation-media">
            <Prototype
              video="Curation_Tool_AI_suggestions_flow_1.5x.mp4"
              poster="ai-suggestions-flow-poster.jpg"
              alt="Curation tool AI suggestions flow prototype"
              caption="Initial prototype"
              playLabel="initial prototype"
            />
          </div>
        </section>

        <section className="curation-section curation-section-solution" aria-labelledby="curation-solution-title">
          <div className="curation-solution-copy">
            <p className="curation-label">04 · The solution</p>
            <h2 id="curation-solution-title" className="curation-headline">
              Eliminate <span className="curation-accent">tool switching</span> and reduce{' '}
              <span className="curation-accent">manual searches</span>.
            </h2>
          </div>
          <ul className="curation-rows curation-solution-rows">
            <li>Builds the edit in one workflow</li>
            <li>Recommends products to add</li>
            <li>Suggestions improve over time with human feedback</li>
          </ul>
          <figure className="curation-scrollshot">
            <div className="curation-scrollshot-viewport" tabIndex={0} role="region" aria-label="Scrollable Create New Editorial screenshot">
              <img
                src={media('Add items Suggested tab@2x.png')}
                alt="Create New Editorial Add Items screen with Suggested tab, match scores, and approve or reject controls"
                width={2880}
                height={3886}
                loading="lazy"
                decoding="async"
              />
            </div>
            <figcaption>Suggested ML recommendations</figcaption>
          </figure>
        </section>

        <section className="curation-section curation-section-text" aria-labelledby="curation-decisions-title">
          <div className="curation-copy curation-copy-wide">
            <p className="curation-label">05 · Decisions &amp; Trade-offs</p>
            <h2 id="curation-decisions-title" className="curation-sr">Decisions &amp; Trade-offs</h2>
            <ol className="curation-decisions">
              <li className="curation-decision">
                <p className="curation-decision-lead">
                  <span className="curation-accent">1. Prioritize workflow centralization over easier product discovery.</span>
                </p>
                <p className="curation-decision-body">
                  The tradeoff was delayed discovery improvements in exchange for fewer dependencies and one system to maintain.
                </p>
              </li>
              <li className="curation-decision">
                <p className="curation-decision-lead">
                  <span className="curation-accent">2. Keep human review of AI.</span>
                </p>
                <p className="curation-decision-body">
                  The VP proposed automatically refreshing collections with recommended products. We kept merchandisers in control to catch irrelevant recommendations while we improved the models.
                </p>
              </li>
              <li className="curation-decision">
                <p className="curation-decision-lead">
                  <span className="curation-accent">3. Reuse existing models.</span>
                </p>
                <p className="curation-decision-body">
                  We explored whether shopper recommendations meet merchandising needs before building from scratch.
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section className="curation-section curation-section-results" aria-labelledby="curation-results-title">
          <div className="curation-results-intro">
            <p className="curation-label">06 · The results</p>
            <h2 id="curation-results-title" className="curation-sr">The results</h2>
          </div>
          <div className="curation-metrics-wrap">
            <table className="curation-metrics">
              <thead>
                <tr>
                  <th scope="col">Metric</th>
                  <th scope="col">Baseline</th>
                  <th scope="col">Target</th>
                  <th scope="col">Actual</th>
                  <th scope="col">Takeaway</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Recommendation acceptance</th>
                  <td>-</td>
                  <td>40%</td>
                  <td>20%</td>
                  <td>Models needed more human feedback to improve.</td>
                </tr>
                <tr>
                  <th scope="row">Edits per month</th>
                  <td>3</td>
                  <td>10</td>
                  <td>6</td>
                  <td>Campaign schedules and shifting capacity limited output.</td>
                </tr>
                <tr>
                  <th scope="row">Curation&apos;s share of GMV</th>
                  <td>10%</td>
                  <td>25%</td>
                  <td>22%</td>
                  <td>Better search shifted discovery away from curation, limiting GMV share.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="curation-section" aria-labelledby="curation-learnings-title">
          <div className="curation-copy">
            <p className="curation-label">07 · Learnings</p>
            <h2 id="curation-learnings-title" className="curation-sr">Learnings</h2>
            <ul className="curation-learnings">
              <li className="curation-learning">
                <p className="curation-learning-lead">
                  <span className="curation-accent">Similarity isn&apos;t taste.</span>
                </p>
                <p className="curation-learning-body">
                  Recommendations needed to reflect merchandisers&apos; judgment, not just product similarity.
                </p>
              </li>
              <li className="curation-learning">
                <p className="curation-learning-lead">
                  <span className="curation-accent">Faster tools don&apos;t mean more edits.</span>
                </p>
                <p className="curation-learning-body">
                  Campaign schedules and editorial capacity still limited output.
                </p>
              </li>
              <li className="curation-learning">
                <p className="curation-learning-lead">
                  <span className="curation-accent">More curation isn&apos;t the goal.</span>
                </p>
                <p className="curation-learning-body">
                  A larger curation presence didn&apos;t mean anything if it didn&apos;t contribute to a greater share of GMV over time.
                </p>
              </li>
            </ul>
          </div>
          <div className="curation-media">
            <Frame caption="The edit, live">
              <img
                src={media('next-level-layers.png')}
                alt="The RealReal Next-Level Layers customer browse page with a four-column edit of clothing, shoes, and accessories"
              />
            </Frame>
            <a className="curation-full" href={media('next-level-layers.png')} target="_blank" rel="noopener noreferrer">
              Open full image <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </div>
        </section>

        <nav className="curation-next-project" aria-label="Project navigation">
          <Link href={`/work/${nextProject.slug}`} className="archive-link">
            Next project: {nextProject.title} <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </div>
  );
}
