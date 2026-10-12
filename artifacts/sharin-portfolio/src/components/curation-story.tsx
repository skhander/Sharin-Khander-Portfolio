import { useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
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
}: {
  video: string;
  poster: string;
  alt: string;
  caption: string;
}) {
  const [started, setStarted] = useState(false);

  return (
    <Frame
      caption={caption}
      action={started ? null : (
        <button type="button" className="curation-play" onClick={() => setStarted(true)}>
          Play prototype
        </button>
      )}
    >
      {started ? (
        <video controls autoPlay playsInline preload="metadata" poster={media(poster)} aria-label={alt}>
          <source src={media(video)} type="video/mp4" />
        </video>
      ) : (
        <img src={media(poster)} alt={alt} />
      )}
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
          <p className="curation-dek">{project.description}</p>
        </header>

        <section className="curation-section" aria-labelledby="curation-problem-title">
          <div className="curation-copy">
            <p className="curation-label">01 · The problem</p>
            <h2 id="curation-problem-title" className="curation-headline">Building an edit took two weeks.</h2>
            <p className="curation-body">Merchandisers searched the catalog item by item for every edit.</p>
          </div>
          <div className="curation-media">
            <Frame caption="Example assortment">
              <img
                src={media('falls-best-bags.png')}
                alt="Fall's Best Bags assortment showing editor-selected designer bags"
                width={1043}
                height={576}
              />
            </Frame>
          </div>
        </section>

        <section className="curation-section curation-section-text" aria-labelledby="curation-insight-title">
          <div className="curation-copy curation-copy-wide">
            <p className="curation-label">02 · The insight</p>
            <h2 id="curation-insight-title" className="curation-headline">Merchandisers should spend their time on taste, not search.</h2>
          </div>
        </section>

        <section className="curation-section" aria-labelledby="curation-solution-title">
          <div className="curation-copy">
            <p className="curation-label">03 · The solution</p>
            <h2 id="curation-solution-title" className="curation-headline">One tool, from search to published edit.</h2>
            <ul className="curation-rows">
              <li>Recommends products to add to each edit</li>
              <li>Builds the edit in one workflow</li>
              <li>Turns approved edits into discovery feeds</li>
            </ul>
          </div>
          <div className="curation-media">
            <Prototype
              video="curation-tool-prototype.mp4"
              poster="curation-tool-poster.jpg"
              alt="Curation Enablement prototype showing the Create New Editorial interface"
              caption="The workflow"
            />
          </div>
        </section>

        <section className="curation-section" aria-labelledby="curation-role-title">
          <div className="curation-copy">
            <p className="curation-label">04 · My role</p>
            <h2 id="curation-role-title" className="curation-sr">My role</h2>
            <ul className="curation-rows">
              <li>Research: interviewed merchandisers at every level.</li>
              <li>Scope: defined the first release with Engineering.</li>
              <li>Delivery: owned the workflow and recommendation quality.</li>
              <li>Adoption: moved teams onto the tool.</li>
            </ul>
          </div>
          <div className="curation-media">
            <ul className="curation-chips" aria-label="Goals">
              <li>Faster production</li>
              <li>More edits</li>
              <li>Higher sell-through</li>
            </ul>
          </div>
        </section>

        <section className="curation-section" aria-labelledby="curation-challenge-title">
          <div className="curation-copy">
            <p className="curation-label">05 · The challenge</p>
            <h2 id="curation-challenge-title" className="curation-headline">Early recommendations were too similar.</h2>
            <p className="curation-body">We added richer product data, including trend, style, occasion, and silhouette. We added human review. Merchandiser choices now improve each round.</p>
          </div>
          <div className="curation-media">
            <Prototype
              video="evergreen-tool-prototype.mp4"
              poster="evergreen-tool-poster.jpg"
              alt="Evergreen Sale prototype showing item criteria and editorial review controls"
              caption="Human review"
            />
          </div>
        </section>

        <section className="curation-section" aria-labelledby="curation-results-title">
          <div className="curation-copy">
            <p className="curation-label">06 · The results</p>
            <h2 id="curation-results-title" className="curation-headline">2× more edits on the site. Sell-through up 30%.</h2>
            <ul className="curation-rows">
              <li>[X%] faster production</li>
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

        <section className="curation-section curation-section-text" aria-labelledby="curation-next-title">
          <div className="curation-copy curation-copy-wide">
            <p className="curation-label">07 · What&apos;s next</p>
            <h2 id="curation-next-title" className="curation-headline">Agents will handle more of the pull, rank, and optimize steps.</h2>
            <p className="curation-body">A person still makes the final call.</p>
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
