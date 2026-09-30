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
  { value: '$60m', label: 'Annualized GMV' },
  { value: '+10%', label: 'Add to cart rate' },
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
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-xs text-muted-foreground" data-testid="link-back-archive">
          <ArrowLeft size={14} /> All work
        </Link>
        <div className="mt-10 border-t border-border pt-5 md:mt-12">
          <p className="font-mono-archive text-xs text-accent">
            {project.company} <span className="mx-2 text-border">/</span> {project.category}
          </p>
          <h1 className="mt-4 max-w-5xl font-editorial text-[clamp(2.5rem,5vw,4rem)] font-semibold leading-[1.08] tracking-[-.04em]" data-testid="text-project-title">
            Site Redesign
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-[1.65] text-muted-foreground">{project.description}</p>
        </div>
      </header>
      <section className="mx-auto max-w-[1440px] border-y border-border px-6 py-5 text-left sm:px-10 md:py-6 lg:px-16" aria-label="Site Redesign metrics">
        <dl className="grid gap-x-8 sm:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="flex flex-col border-t border-border py-5">
              <dt className="order-2 mt-2 font-mono-archive text-xs text-muted-foreground">{metric.label}</dt>
              <dd className="order-1 font-editorial text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-.03em]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </section>
      <ProjectMeta project={project} />

      <div>
        <section className="mx-auto max-w-[1440px] px-6 pb-12 pt-12 sm:px-10 md:pb-16 md:pt-16 lg:px-16" aria-labelledby="elevated-start">
          <div className="mb-5 flex flex-col items-start gap-1 border-t border-border pt-3 md:mb-7">
            <span className="font-mono-archive text-xs text-accent">01 / Before</span>
            <span className="font-mono-archive text-xs text-muted-foreground">PDP</span>
          </div>
          <figure>
            <div className="elevated-frame max-w-[1120px]">
              <img
                src={media('pdp-before.webp')}
                alt="Original watch product detail page with a relatively small product image surrounded by generous white space and product information on the right."
                fetchPriority="high"
                data-testid="img-pdp-before"
              />
            </div>
            <figcaption className="mt-5 grid gap-2 md:grid-cols-[1fr_1fr] md:items-start md:gap-8">
              <h2 id="elevated-start" className="max-w-[720px] font-editorial text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-.03em]">
                The PDP felt anything but <em className="font-normal text-accent">luxurious.</em>
              </h2>
              <p className="max-w-[350px] text-sm leading-[1.55] text-muted-foreground md:justify-self-start md:text-base">
                Small imagery. Too much whitespace. Not enough product.
              </p>
            </figcaption>
          </figure>

          <div className="mt-12 border-t border-border pt-6 md:mt-16">
            <h3 className="max-w-3xl font-editorial text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.2] tracking-[-.025em]">
              We tested two ways to make the product more immersive.
            </h3>
            <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-5">
              <figure>
                <figcaption className="mb-2 font-mono-archive text-xs text-accent">A — Grid</figcaption>
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
                <figcaption className="mb-2 font-mono-archive text-xs text-accent">B — Immersive scroll</figcaption>
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

        <section className="bg-background py-10 md:py-12" aria-labelledby="elevated-lesson">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
            <p className="border-t border-foreground/20 pt-3 font-mono-archive text-xs text-accent">02 / A small change. A big lesson.</p>
            <div className="mt-6 grid gap-7 md:grid-cols-[1.15fr_.85fr] md:items-start md:gap-10">
              <figure>
                <div className="elevated-frame">
                  <img src={media('pdp-heart.webp')} alt="Crop of the original watch PDP showing the Obsessions heart immediately to the left of the product details and Rolex title." loading="lazy" data-testid="img-pdp-heart-crop" />
                </div>
                <figcaption className="mt-2 font-mono-archive text-xs leading-relaxed text-muted-foreground">
                  Heart-left placement, cropped from the supplied PDP.
                </figcaption>
              </figure>
              <div>
                <h2 id="elevated-lesson" className="font-editorial text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-.03em]">
                  Don&apos;t make users look for <em className="font-normal text-accent">muscle memory.</em>
                </h2>
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-foreground/20 pt-4 md:mt-8">
                  <div>
                    <p className="font-editorial text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-.03em] text-accent" data-testid="text-obsessions-result">−15%</p>
                    <p className="mt-2 text-sm leading-tight">Obsessions</p>
                  </div>
                  <div>
                    <p className="font-editorial text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-.03em] text-accent" data-testid="text-orders-visitor-negative">−10%</p>
                    <p className="mt-2 text-sm leading-tight">Orders / visitor</p>
                  </div>
                </div>
                <p className="mt-6 max-w-sm text-sm leading-[1.55] md:text-base">We moved the heart. Users stopped using it. We shipped the fix the same day.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-background py-10 text-foreground md:py-12" aria-labelledby="elevated-winner">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
            <p className="border-t border-current/30 pt-3 font-mono-archive text-xs opacity-75">03 / The winning experience</p>
            <div className="mt-6 grid gap-6 md:grid-cols-[1fr_auto] md:items-start md:gap-10">
              <div>
                <h2 id="elevated-winner" className="max-w-[850px] font-editorial text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-.03em]">
                  Good friction can still be <em className="font-normal text-accent">good UX.</em>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-[1.55] opacity-85 md:text-base">
                  The third image took an extra scroll to reach—but the more immersive experience won.
                </p>
              </div>
              <div className="border-t border-current/35 pt-3 text-left md:min-w-[150px]">
                <p className="font-editorial text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-.03em]" data-testid="text-orders-visitor-positive">+5%</p>
                <p className="mt-1 font-mono-archive text-xs">Orders / visitor</p>
              </div>
            </div>
            <figure className="mt-7 md:mt-9">
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
              <figcaption className="mt-2 font-mono-archive text-xs opacity-70">B — Immersive scroll · Play the product experience</figcaption>
            </figure>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-6 py-12 sm:px-10 md:py-16 lg:px-16" aria-labelledby="elevated-browse">
          <p className="border-t border-border pt-3 font-mono-archive text-xs text-accent">04 / Browse</p>
          <h2 id="elevated-browse" className="mt-5 max-w-4xl font-editorial text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-.03em]">
            Next, we brought the same thinking to <em className="font-normal text-accent">PLPs.</em>
          </h2>
          <div className="mt-7 grid gap-7 md:mt-9 md:grid-cols-2 md:gap-5">
            {([
              { key: 'before' as const, label: 'Before', description: 'Cluttered filters. Tiny product images.' },
              { key: 'after' as const, label: 'After', description: 'Filters behind a drawer. Larger product imagery. More visual breathing room.' },
            ]).map(({ key, label, description }) => (
              <figure key={key} className="min-w-0">
                <figcaption className="mb-2 flex flex-col items-start gap-1 font-mono-archive text-xs text-accent">
                  <span>{label}</span>
                  {key === 'before' && <ArrowUpRight size={14} className="rotate-45 opacity-50" aria-hidden="true" />}
                  {key === 'after' && <span className="text-muted-foreground">→</span>}
                </figcaption>
                <div className="elevated-frame elevated-browse-scroll">
                  <img src={browseImages[key].src} alt={browseImages[key].alt} loading="lazy" data-testid={`img-browse-${key}`} />
                </div>
                <div className="mt-4 flex flex-col items-start gap-3">
                  <p className="max-w-md text-sm leading-[1.5] text-muted-foreground md:text-base">{description}</p>
                  <button type="button" onClick={() => setZoomedImage(key)} className="archive-link inline-flex shrink-0 items-center gap-1.5 font-mono-archive text-xs text-accent" aria-label={`Enlarge Browse ${label.toLowerCase()} image`} data-testid={`button-enlarge-browse-${key}`}>
                    <Maximize2 size={14} /> Enlarge
                  </button>
                </div>
                <p className="mt-2 font-mono-archive text-xs text-muted-foreground md:hidden">Swipe image to inspect</p>
              </figure>
            ))}
          </div>
        </section>

        <section className="bg-background py-10 md:py-12" aria-labelledby="elevated-risk">
          <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
            <p className="border-t border-foreground/20 pt-3 font-mono-archive text-xs text-accent">05 / The risk</p>
            <div className="mt-6 grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:gap-10">
              <h2 id="elevated-risk" className="max-w-xl font-editorial text-[clamp(1.75rem,3.2vw,2.75rem)] font-semibold leading-[1.15] tracking-[-.03em]">
                This could have <em className="font-normal text-accent">backfired.</em>
              </h2>
              <div className="border-t border-foreground/25">
                {[
                  ['More clicks', 'Filtering now required an extra tap.'],
                  ['6m+ items', 'Shoppers rely on filters to find what they want.'],
                  ['Bigger images', 'More visual browsing could slow high-throughput shoppers.'],
                ].map(([title, detail]) => (
                  <div key={title} className="grid gap-1 border-b border-foreground/25 py-4 sm:grid-cols-[.38fr_.62fr] sm:gap-6">
                    <h3 className="font-editorial text-lg font-semibold leading-tight md:text-xl">{title}</h3>
                    <p className="max-w-sm text-sm leading-[1.5] text-muted-foreground md:text-base">{detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-10 grid gap-5 border-t border-foreground/25 pt-5 md:mt-14 md:grid-cols-[.45fr_.55fr] md:items-start md:gap-10">
              <div>
                <p className="font-mono-archive text-xs text-accent">The result</p>
                <p className="mt-2 font-editorial text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-tight tracking-[-.04em] text-accent" data-testid="text-conversion-result">+10%</p>
                <p className="mt-1 text-base">Conversion</p>
              </div>
              <p className="max-w-[700px] font-editorial text-[clamp(1.5rem,2.8vw,2.25rem)] font-semibold leading-[1.2] tracking-[-.025em]">
                More immersive browsing beat <em className="font-normal text-accent">faster browsing.</em>
              </p>
            </div>
          </div>
        </section>
      </div>
      <div className="h-8 md:h-12" aria-hidden="true" />
      <ProjectNavigation nextProject={nextProject} />

      {zoomedImage && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[hsl(var(--background))] p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`Browse ${zoomedImage} enlarged image`}
          onClick={() => setZoomedImage(null)}
          data-testid="dialog-browse-enlarged"
        >
          <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-3 border-b border-border pb-4">
            <p className="font-mono-archive text-xs text-accent">Browse / {zoomedImage}</p>
            <button type="button" ref={closeZoomRef} onClick={() => setZoomedImage(null)} className="archive-link inline-flex items-center gap-2 font-mono-archive text-xs text-accent" data-testid="button-close-browse-enlarged">
              Close <X size={18} />
            </button>
          </div>
          <div className="mx-auto mt-5 w-full max-w-[1280px] flex-1 overflow-auto" onClick={(event) => event.stopPropagation()}>
            <img src={browseImages[zoomedImage].src} alt={browseImages[zoomedImage].alt} className="mx-auto h-auto w-full min-w-[900px] object-contain" data-testid="img-browse-enlarged" />
          </div>
          <p className="mx-auto mt-3 w-full max-w-[1280px] font-mono-archive text-xs text-muted-foreground sm:hidden">Swipe to inspect the full image</p>
        </div>
      )}
    </div>
  );
}