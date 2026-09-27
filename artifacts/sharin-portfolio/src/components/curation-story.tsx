import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { ProjectHero, ProjectNavigation } from './project-content';
import './curation-story.css';

const media = (file: string) => `${import.meta.env.BASE_URL}media/curation/${file}`;

export function CurationStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  const [prototypeStarted, setPrototypeStarted] = useState(false);

  return (
    <div className="page-reveal curation-story">
      <ProjectHero project={project} />

      <section className="mx-auto max-w-[1440px] border-t border-border px-6 py-12 sm:px-10 md:py-20 lg:px-16" aria-labelledby="curation-prototype">
        <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">01 / The tool</p>
            <h2 id="curation-prototype" className="mt-5 max-w-[12ch] font-editorial text-[clamp(2.8rem,5vw,5.5rem)] leading-[.92] tracking-[-.04em]">Editorial taste, made scalable.</h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-[1.6] text-muted-foreground md:text-lg">
            A working prototype of the Curation Tool: create an editorial, define the assortment, and select the products that bring a point of view to life.
          </p>
        </div>
        <figure className="mt-10 md:mt-14">
          {prototypeStarted ? (
            <video
              className="curation-prototype-video"
              controls
              autoPlay
              playsInline
              preload="metadata"
              poster={media('curation-tool-poster.jpg')}
              aria-label="Curation Tool prototype showing how an editorial assortment is created"
            >
              <source src={media('curation-tool-prototype.mp4')} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            <button type="button" className="curation-prototype-preview" onClick={() => setPrototypeStarted(true)} aria-label="Play the Curation Tool prototype walkthrough">
              <img src={media('curation-tool-poster.jpg')} alt="Curation Tool prototype showing the Create New Editorial interface" />
              <span className="curation-prototype-play"><Play size={16} fill="currentColor" aria-hidden="true" /> Play prototype</span>
            </button>
          )}
          <figcaption className="mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">
            Curation Tool / prototype walkthrough
          </figcaption>
        </figure>
      </section>

      <section className="mx-auto max-w-[1440px] border-t border-border px-6 py-12 sm:px-10 md:py-20 lg:px-16" aria-labelledby="curation-customer">
        <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">02 / The customer experience</p>
            <h2 id="curation-customer" className="mt-5 max-w-[12ch] font-editorial text-[clamp(2.8rem,5vw,5.5rem)] leading-[.92] tracking-[-.04em]">The edit, in the wild.</h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-[1.6] text-muted-foreground md:text-lg">
            Next-Level Layers shows the other side of the workflow: a shoppable editorial experience for customers on The RealReal.
          </p>
        </div>
        <figure className="mt-10 md:mt-14">
          <figcaption className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">
            <span>Next-Level Layers / customer-facing page</span>
            <a href={media('next-level-layers.png')} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent underline underline-offset-4 hover:text-foreground">
              Open full image <ArrowUpRight size={12} aria-hidden="true" />
            </a>
            <span className="w-full md:hidden">Swipe horizontally to explore the page</span>
          </figcaption>
          <div className="curation-customer-frame" tabIndex={0} role="region" aria-label="Next-Level Layers customer experience screenshot; scroll horizontally to inspect on narrow screens">
            <img
              src={media('next-level-layers.png')}
              alt="The RealReal Next-Level Layers customer browse page with a four-column edit of clothing, shoes, and accessories"
              loading="lazy"
            />
          </div>
        </figure>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </div>
  );
}