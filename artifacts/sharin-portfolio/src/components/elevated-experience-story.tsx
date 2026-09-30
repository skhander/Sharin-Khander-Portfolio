import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Maximize2, Play, X } from 'lucide-react';
import { Link } from 'wouter';
import { ProjectMeta, ProjectNavigation } from '@/components/project-content';
import type { Project } from '@/lib/projects';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/${filename}`;

const browseImages = {
  before: {
    src: media('browse-before.webp'),
    alt: 'Before Browse page for Louis Vuitton handbags, with a long filter sidebar and small handbag images in a dense product grid.',
  },
  after: {
    src: media('browse-after.webp'),
    alt: 'After Browse page for Louis Vuitton handbags, with an All Filters control and larger handbag images across the grid.',
  },
};

const metrics = [
  { value: '$60M', label: 'Annualized GMV' },
  { value: '+10%', label: 'Add to Cart Rate' },
  { value: '+8%', label: 'Orders' },
];

export function ElevatedExperienceStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  const [zoomedImage, setZoomedImage] = useState<keyof typeof browseImages | null>(null);
  const [gridVideoStarted, setGridVideoStarted] = useState(false);
  const [immersiveVideoStarted, setImmersiveVideoStarted] = useState(false);
  const closeZoomRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!zoomedImage) return;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeZoomRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setZoomedImage(null);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeZoomRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [zoomedImage]);

  return (
    <div className="page-reveal">
      <header className="mx-auto w-full max-w-[1440px] px-6 pb-10 pt-10 sm:px-10 md:pb-14 md:pt-14 lg:px-16">
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground" data-testid="link-back-archive">
          <ArrowLeft size={14} /> All work
        </Link>
        <div className="mt-14 border-t border-border pt-6 md:mt-20">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">
            {project.company} <span className="mx-2 text-border">/</span> {project.category}
          </p>
          <h1 className="mt-6 max-w-5xl font-editorial text-[clamp(4rem,10vw,10rem)] leading-[.83] tracking-[-.055em]" data-testid="text-project-title">
            Site<br className="hidden sm:block" /> Redesign
          </h1>
        </div>
      </header>
      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-label="Site Redesign metrics">
        <dl className="grid gap-x-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col border-t border-border py-5">
              <dt className="order-2 mt-3 font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">{metric.label}</dt>
              <dd className="order-1 font-editorial text-[clamp(3rem,5vw,5rem)] leading-none tracking-[-.04em]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <ProjectMeta project={project} />

      <div>
        <section className="mx-auto max-w-[1440px] px-6 pb-20 pt-20 sm:px-10 md:pb-28 md:pt-28 lg:px-16" aria-labelledby="elevated-start">
          <div className="mb-7 flex items-baseline justify-between gap-4 border-t border-border pt-4 md:mb-10">
            <span className="font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">01 / Before</span>
            <span className="font-mono-archive text-[10px] uppercase tracking-[.17em] text-muted-foreground">PDP</span>
          </div>
          <figure>
            <div className="elevated-frame mx-auto max-w-[1120px]">
              <img
                src={media('pdp-before.webp')}
                alt="Original watch product detail page with a relatively small product image surrounded by generous white space and product information on the right."
                fetchPriority="high"
                data-testid="img-pdp-before"
              />
            </div>
            <figcaption className="mt-7 grid gap-2 md:grid-cols-[1fr_1fr] md:items-end md:gap-12">
              <h2 id="elevated-start" className="max-w-[720px] font-editorial text-[clamp(2.7rem,5.2vw,5.8rem)] leading-[.95] tracking-[-.035em]">
                The PDP felt anything but <em className="font-normal text-accent">luxurious.</em>
              </h2>
              <p className="max-w-[350px] text-base leading-[1.5] text-muted-foreground md:justify-self-end md:text-lg">
                Small imagery. Too much whitespace. Not enough product.
              </p>
            </figcaption>
          </figure>

          <div className="mt-20 border-t border-border pt-9 md:mt-28">
            <h3 className="max-w-3xl font-editorial text-[clamp(2.25rem,4.6vw,4.8rem)] leading-[.97] tracking-[-.025em]">
              We tested two ways to make the product more immersive.
            </h3>
            <div className="mt-9 grid gap-8 md:mt-12 md:grid-cols-2 md:gap-5">
              <figure>
                <figcaption className="mb-3 font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">A — Grid</figcaption>
                <div className="elevated-frame">
                  {gridVideoStarted ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      poster={media('pdp-grid-prototype-poster.webp')}
                      aria-label="A — Grid prototype walkthrough showing the watch product page and its enlarged image gallery"
                      data-testid="video-pdp-grid"
                    >
                      <source src={media('pdp-grid-prototype.mp4')} type="video/mp4" />
                      Your browser does not support this video.
                    </video>
                  ) : (
                    <button
                      type="button"
                      className="group relative block w-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                      onClick={() => setGridVideoStarted(true)}
                      aria-label="Play A — Grid prototype walkthrough"
                      data-testid="button-play-pdp-grid"
                    >
                      <img src={media('pdp-grid-prototype-poster.webp')} alt="" loading="lazy" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-transform group-hover:scale-105">
                          <Play size={22} fill="currentColor" aria-hidden="true" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </figure>
              <figure>
                <figcaption className="mb-3 font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">B — Immersive scroll</figcaption>
                <div className="elevated-frame">
                  {immersiveVideoStarted ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      poster={media('pdp-immersive-prototype-poster.webp')}
                      aria-label="B — Immersive scroll prototype walkthrough showing the watch product page as its imagery scrolls"
                      data-testid="video-pdp-immersive-comparison"
                    >
                      <source src={media('pdp-immersive-prototype.mp4')} type="video/mp4" />
                      Your browser does not support this video.
                    </video>
                  ) : (
                    <button
                      type="button"
                      className="group relative block w-full focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
                      onClick={() => setImmersiveVideoStarted(true)}
                      aria-label="Play B — Immersive scroll prototype walkthrough"
                      data-testid="button-play-pdp-immersive-comparison"
                    >
                      <img src={media('pdp-immersive-prototype-poster.webp')} alt="" loading="lazy" />
                      <span className="absolute inset-0 flex items-center justify-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 text-foreground shadow-md transition-transform group-hover:scale-105">
                          <Play size={22} fill="currentColor" aria-hidden="true" />
                        </span>
                      </span>
                    </button>
                  )}
                </div>
              </figure>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--rose-surface)/.36)] py-20 md:py-28" aria-labelledby="elevated-lesson">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
            <p className="border-t border-foreground/20 pt-4 font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">02 / A small change. A big lesson.</p>
            <div className="mt-8 grid gap-10 md:grid-cols-[1.15fr_.85fr] md:items-center md:gap-12 xl:gap-20">
              <figure>
                <div className="elevated-frame">
                  <img src={media('pdp-heart.webp')} alt="Crop of the original watch PDP showing the Obsessions heart immediately to the left of the product details and Rolex title." loading="lazy" data-testid="img-pdp-heart-crop" />
                </div>
                <figcaption className="mt-3 font-mono-archive text-[10px] leading-relaxed text-muted-foreground">
                  Heart-left placement, cropped from the supplied PDP.
                </figcaption>
              </figure>
              <div>
                <h2 id="elevated-lesson" className="font-editorial text-[clamp(2.6rem,4.5vw,5rem)] leading-[.95] tracking-[-.035em]">
                  Don&apos;t make users look for <em className="font-normal text-accent">muscle memory.</em>
                </h2>
                <div className="mt-9 grid grid-cols-2 gap-4 border-t border-foreground/20 pt-6 md:mt-12">
                  <div>
                    <p className="font-editorial text-[clamp(3.2rem,5.4vw,6.5rem)] leading-none tracking-[-.045em] text-accent" data-testid="text-obsessions-result">−15%</p>
                    <p className="mt-2 text-sm leading-tight">Obsessions</p>
                  </div>
                  <div>
                    <p className="font-editorial text-[clamp(3.2rem,5.4vw,6.5rem)] leading-none tracking-[-.045em] text-accent" data-testid="text-orders-visitor-negative">−10%</p>
                    <p className="mt-2 text-sm leading-tight">Orders / visitor</p>
                  </div>
                </div>
                <p className="mt-9 max-w-sm text-base leading-[1.55] md:text-lg">We moved the heart. Users stopped using it. We shipped the fix the same day.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[hsl(var(--primary))] py-20 text-[hsl(var(--primary-foreground))] md:py-28" aria-labelledby="elevated-winner">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
            <p className="border-t border-current/30 pt-4 font-mono-archive text-[10px] uppercase tracking-[.17em] opacity-75">03 / The winning experience</p>
            <div className="mt-8 grid gap-7 md:grid-cols-[1fr_auto] md:items-end md:gap-14">
              <div>
                <h2 id="elevated-winner" className="max-w-[850px] font-editorial text-[clamp(3.5rem,7vw,8rem)] leading-[.9] tracking-[-.045em]">
                  Good friction can still be <em className="font-normal text-[hsl(var(--rose-surface))]">good UX.</em>
                </h2>
                <p className="mt-6 max-w-xl text-base leading-[1.5] opacity-85 md:text-lg">
                  The third image took an extra scroll to reach—but the more immersive experience won.
                </p>
              </div>
              <div className="border-t border-current/35 pt-4 md:min-w-[205px]">
                <p className="font-editorial text-[clamp(4.5rem,7vw,8rem)] leading-none tracking-[-.05em]" data-testid="text-orders-visitor-positive">+5%</p>
                <p className="mt-2 font-mono-archive text-[10px] uppercase tracking-[.13em]">Orders / visitor</p>
              </div>
            </div>
            <figure className="mt-10 md:mt-14">
              <video
                controls
                playsInline
                preload="metadata"
                poster={media('pdp-immersive-prototype-poster.webp')}
                className="block aspect-[2290/1526] w-full bg-[hsl(var(--foreground))]"
                aria-label="Recording of the immersive-scroll A. Lange & Söhne watch product detail page"
                data-testid="video-pdp-immersive"
              >
                <source src={media('pdp-immersive-prototype.mp4')} type="video/mp4" />
                Your browser does not support this video.
              </video>
              <figcaption className="mt-3 font-mono-archive text-[10px] uppercase tracking-[.13em] opacity-70">B — Immersive scroll · Play the product experience</figcaption>
            </figure>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16" aria-labelledby="elevated-browse">
          <p className="border-t border-border pt-4 font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">04 / Browse</p>
          <h2 id="elevated-browse" className="mt-8 max-w-4xl font-editorial text-[clamp(3.3rem,6.5vw,7.4rem)] leading-[.92] tracking-[-.04em]">
            Next, we brought the same thinking to <em className="font-normal text-accent">PLPs.</em>
          </h2>
          <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-2 md:gap-5">
            {([
              { key: 'before' as const, label: 'Before', description: 'Cluttered filters. Tiny product images.' },
              { key: 'after' as const, label: 'After', description: 'Filters behind a drawer. Larger product imagery. More visual breathing room.' },
            ]).map(({ key, label, description }) => (
              <figure key={key} className="min-w-0">
                <figcaption className="mb-3 flex items-center justify-between gap-3 font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">
                  <span>{label}</span>
                  {key === 'before' && <ArrowUpRight size={14} className="rotate-45 opacity-50" aria-hidden="true" />}
                  {key === 'after' && <span className="text-muted-foreground">→</span>}
                </figcaption>
                <div className="elevated-frame elevated-browse-scroll">
                  <img src={browseImages[key].src} alt={browseImages[key].alt} loading="lazy" data-testid={`img-browse-${key}`} />
                </div>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <p className="max-w-md text-sm leading-[1.5] text-muted-foreground md:text-base">{description}</p>
                  <button type="button" onClick={() => setZoomedImage(key)} className="archive-link inline-flex shrink-0 items-center gap-1.5 font-mono-archive text-[10px] uppercase tracking-[.1em] text-accent" aria-label={`Enlarge Browse ${label.toLowerCase()} image`} data-testid={`button-enlarge-browse-${key}`}>
                    <Maximize2 size={14} /> Enlarge
                  </button>
                </div>
                <p className="mt-2 font-mono-archive text-[10px] text-muted-foreground md:hidden">Swipe image to inspect</p>
              </figure>
            ))}
          </div>
        </section>

        <section className="bg-[hsl(var(--olive-surface)/.32)] py-20 md:py-28" aria-labelledby="elevated-risk">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
            <p className="border-t border-foreground/20 pt-4 font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">05 / The risk</p>
            <div className="mt-8 grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
              <h2 id="elevated-risk" className="max-w-xl font-editorial text-[clamp(3.6rem,6.7vw,8rem)] leading-[.9] tracking-[-.045em]">
                This could have <em className="font-normal text-accent">backfired.</em>
              </h2>
              <div className="border-t border-foreground/25">
                {[
                  ['More clicks', 'Filtering now required an extra tap.'],
                  ['6M+ items', 'Shoppers rely on filters to find what they want.'],
                  ['Bigger images', 'More visual browsing could slow high-throughput shoppers.'],
                ].map(([title, detail]) => (
                  <div key={title} className="grid gap-1 border-b border-foreground/25 py-5 sm:grid-cols-[.38fr_.62fr] sm:gap-6">
                    <h3 className="font-editorial text-2xl leading-tight md:text-3xl">{title}</h3>
                    <p className="max-w-sm text-sm leading-[1.5] text-muted-foreground md:text-base">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-20 grid gap-6 border-t border-foreground/25 pt-7 md:mt-28 md:grid-cols-[.45fr_.55fr] md:items-end md:gap-12">
              <div>
                <p className="font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">The result</p>
                <p className="mt-3 font-editorial text-[clamp(5.5rem,11vw,12rem)] leading-[.85] tracking-[-.06em] text-accent" data-testid="text-conversion-result">+10%</p>
                <p className="mt-3 text-lg">Conversion</p>
              </div>
              <p className="max-w-[700px] font-editorial text-[clamp(2.7rem,5vw,5.8rem)] leading-[.99] tracking-[-.025em]">
                More immersive browsing beat <em className="font-normal text-accent">faster browsing.</em>
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="h-14 md:h-20" aria-hidden="true" />
      <ProjectNavigation nextProject={nextProject} />

      {zoomedImage && (
        <div
          className="elevated-zoom fixed inset-0 z-50 flex flex-col bg-[hsl(var(--background))] p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Browse ${zoomedImage} enlarged image`}
          onClick={() => setZoomedImage(null)}
          data-testid="dialog-browse-enlarged"
        >
          <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between border-b border-border pb-4">
            <p className="font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">Browse / {zoomedImage}</p>
            <button type="button" ref={closeZoomRef} onClick={() => setZoomedImage(null)} className="archive-link inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.13em] text-accent" data-testid="button-close-browse-enlarged">
              Close <X size={18} />
            </button>
          </div>
          <div className="mx-auto mt-5 w-full max-w-[1280px] flex-1 overflow-auto" onClick={(event) => event.stopPropagation()}>
            <img src={browseImages[zoomedImage].src} alt={browseImages[zoomedImage].alt} className="mx-auto h-auto w-full min-w-[900px] object-contain" data-testid="img-browse-enlarged" />
          </div>
          <p className="mx-auto mt-3 w-full max-w-[1280px] font-mono-archive text-[10px] text-muted-foreground sm:hidden">Swipe to inspect the full image</p>
        </div>
      )}
    </div>
  );
}