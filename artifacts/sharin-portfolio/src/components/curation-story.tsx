import { useState } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import type { Project } from '@/lib/projects';
import { ProjectHero, ProjectNavigation } from './project-content';
import './curation-story.css';

const media = (file: string) => `${import.meta.env.BASE_URL}media/curation/${file}`;

function Walkthrough({ video, poster, alt, label, playLabel }: { video: string; poster: string; alt: string; label: string; playLabel: string }) {
  const [started, setStarted] = useState(false);

  return (
    <figure className="mt-10 md:mt-14">
      {started ? (
        <video className="curation-prototype-video" controls autoPlay playsInline preload="metadata" poster={media(poster)} aria-label={alt}>
          <source src={media(video)} type="video/mp4" />
          Your browser does not support video playback.
        </video>
      ) : (
        <button type="button" className="curation-prototype-preview" onClick={() => setStarted(true)} aria-label={`Play ${playLabel}`}>
          <img src={media(poster)} alt={alt} loading="lazy" />
          <span className="curation-prototype-play"><Play size={16} fill="currentColor" aria-hidden="true" /> Play prototype</span>
        </button>
      )}
      <figcaption className="mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">{label}</figcaption>
    </figure>
  );
}

function CustomerPage({ image, alt, label, tall = false }: { image: string; alt: string; label: string; tall?: boolean }) {
  return (
    <figure className="mt-10 md:mt-14">
      <figcaption className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">
        <span>{label}</span>
        <a href={media(image)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent underline underline-offset-4 hover:text-foreground">
          Open full image <ArrowUpRight size={12} aria-hidden="true" />
        </a>
        <span className="w-full md:hidden">{tall ? 'Swipe and scroll to explore the page' : 'Swipe horizontally to explore the page'}</span>
        {tall && <span className="w-full hidden md:block">Scroll the image to explore the full assortment</span>}
      </figcaption>
      <div className={`curation-customer-frame${tall ? ' is-evergreen' : ''}`} tabIndex={0} role="region" aria-label={`${label}; scroll to inspect the full screenshot`}>
        <img src={media(image)} alt={alt} loading="lazy" />
      </div>
    </figure>
  );
}

export function CurationStory({ project, nextProject }: { project: Project; nextProject: Project }) {

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
        <Walkthrough
          video="curation-tool-prototype.mp4"
          poster="curation-tool-poster.jpg"
          alt="Curation Tool prototype showing the Create New Editorial interface"
          label="Curation Tool / prototype walkthrough"
          playLabel="the Curation Tool prototype walkthrough"
        />
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
        <CustomerPage
          image="next-level-layers.png"
          alt="The RealReal Next-Level Layers customer browse page with a four-column edit of clothing, shoes, and accessories"
          label="Next-Level Layers / customer-facing page"
        />
      </section>

      <section className="mx-auto max-w-[1440px] border-t border-border px-6 py-12 sm:px-10 md:py-20 lg:px-16" aria-labelledby="curation-evergreen">
        <div className="grid gap-6 md:grid-cols-[minmax(0,.75fr)_minmax(0,1.25fr)] md:gap-16">
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">03 / Evergreens</p>
            <h2 id="curation-evergreen" className="mt-5 max-w-[12ch] font-editorial text-[clamp(2.8rem,5vw,5.5rem)] leading-[.92] tracking-[-.04em]">Scaling taste, not the manual work.</h2>
          </div>
          <p className="max-w-2xl self-end text-base leading-[1.6] text-muted-foreground md:text-lg">
            A merchandiser starts with an intentional product pull. The evergreen assortment then programmatically refreshes with similar items as inventory changes, keeping the edit current without rebuilding it by hand.
          </p>
        </div>
        <Walkthrough
          video="evergreen-tool-prototype.mp4"
          poster="evergreen-tool-poster.jpg"
          alt="Curation Tool prototype showing the Create Evergreen Sale workflow"
          label="Evergreen Curation Tool / prototype walkthrough"
          playLabel="the Evergreen Curation Tool prototype walkthrough"
        />
        <div className="mt-14 border-t border-border pt-10 md:mt-20 md:pt-14">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">The customer experience</p>
          <h3 className="mt-4 font-editorial text-[clamp(2.5rem,4vw,4.5rem)] leading-[.95] tracking-[-.04em]">Shop Vintage Bridal.</h3>
          <p className="mt-5 max-w-2xl text-base leading-[1.6] text-muted-foreground md:text-lg">
            A customer-facing evergreen assortment built around a specific point of view, with fresh inventory continuing the edit.
          </p>
          <CustomerPage
            image="shop-vintage-bridal.png"
            alt="The RealReal Shop Vintage Bridal page with an assortment of vintage bridal dresses and accessories"
            label="Shop Vintage Bridal / customer-facing evergreen"
            tall
          />
        </div>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </div>
  );
}