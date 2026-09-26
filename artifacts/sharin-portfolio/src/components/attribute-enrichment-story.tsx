import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Maximize2, X } from 'lucide-react';
import { Link } from 'wouter';
import { ProjectMeta, ProjectNavigation } from '@/components/project-content';
import type { Project } from '@/lib/projects';

const media = (filename: string) => `${import.meta.env.BASE_URL}media/attribute-enrichment/${filename}`;

const chanel = media('chanel-top.webp');
const marni = media('marni-shirt.webp');
const lookbook = media('vintage-bridal-lookbook.webp');

function Eyebrow({ number, children, aside }: { number: string; children: string; aside?: string }) {
  return (
    <div className="attribute-rule mb-8 flex items-start justify-between gap-4 pt-4 font-mono-archive text-[10px] uppercase tracking-[.17em] md:mb-12">
      <span className="text-accent">{number} / {children}</span>
      {aside && <span className="text-right text-muted-foreground">{aside}</span>}
    </div>
  );
}

function Attribute({ name, value }: { name: string; value: string }) {
  return (
    <div className="grid grid-cols-[6.5rem_1fr] gap-4 border-b border-foreground/20 py-3.5 sm:grid-cols-[9rem_1fr]">
      <dt className="font-mono-archive text-[10px] uppercase tracking-[.1em] text-accent">{name}</dt>
      <dd className="text-sm leading-[1.45] md:text-base">{value}</dd>
    </div>
  );
}

export function AttributeEnrichmentStory({ project, nextProject }: { project: Project; nextProject: Project }) {
  const [lookbookOpen, setLookbookOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!lookbookOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLookbookOpen(false);
      if (event.key === 'Tab') {
        event.preventDefault();
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [lookbookOpen]);

  return (
    <div className="attribute-story page-reveal">
      <header className="mx-auto max-w-[1440px] px-6 pb-10 pt-10 sm:px-10 md:pb-14 md:pt-14 lg:px-16">
        <Link href="/" className="archive-link inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground" data-testid="link-back-archive">
          <ArrowLeft size={14} /> All work
        </Link>
        <div className="mt-14 border-t border-border pt-6 md:mt-20">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">{project.company} <span className="mx-2 text-border">/</span> {project.category}</p>
          <h1 className="mt-6 max-w-[1200px] font-editorial text-[clamp(3rem,8vw,8.5rem)] leading-[.88] tracking-[-.055em]" data-testid="text-project-title">
            Trend, Vibe,<br />Occasion<br />Discovery<span className="text-accent">.</span>
          </h1>
          <p className="mt-8 max-w-[690px] text-lg leading-[1.4] md:mt-10 md:text-[1.45rem]">
            A new language for six million products. And a test of where it actually mattered.
          </p>
        </div>
      </header>
      <ProjectMeta project={project} />

      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16" aria-labelledby="attribute-problem">
        <Eyebrow number="01" aside="The problem">An incomplete catalog</Eyebrow>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <h2 id="attribute-problem" className="max-w-[750px] font-editorial text-[clamp(3.5rem,6vw,7rem)] leading-[.91] tracking-[-.04em]">
              Our catalog knew what a product <em className="font-normal text-accent">was.</em> It didn&apos;t know what it <em className="font-normal text-accent">felt like.</em>
            </h2>
            <p className="mt-8 max-w-[490px] text-base leading-[1.55] text-muted-foreground md:text-lg">
              We had 6M live listings and added 12K new products every day. But shoppers couldn&apos;t search naturally by trend, occasion, or vibe—and those signals weren&apos;t powering recommendations, personalization, or curation.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-5 border-t border-foreground/20 pt-6 md:mt-16">
              <div><p className="font-editorial text-[clamp(4.6rem,7vw,8rem)] leading-none tracking-[-.055em] text-accent" data-testid="text-live-listings">6M</p><p className="mt-2 font-mono-archive text-[10px] uppercase tracking-[.14em]">Live listings</p></div>
              <div><p className="font-editorial text-[clamp(4.6rem,7vw,8rem)] leading-none tracking-[-.055em] text-accent" data-testid="text-new-products">12K</p><p className="mt-2 font-mono-archive text-[10px] uppercase tracking-[.14em]">New products / day</p></div>
            </div>
          </div>
          <figure className="self-start">
            <div className="attribute-product flex h-[460px] items-center justify-center p-10 sm:h-[610px]">
              <img src={chanel} alt="Supplied Chanel Vintage 2005 Top listing showing a black lace top on a mannequin, a sold badge, and product details." fetchPriority="high" data-testid="img-chanel-top" />
            </div>
            <figcaption className="mt-4">
              <p className="mb-3 font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">Chanel vintage top / Supplied product example</p>
              <dl className="border-t border-foreground/20">
                <Attribute name="Aesthetic" value="Romantic · Classic · Feminine" />
                <Attribute name="Colorway" value="Black with nude/tan lace backing" />
                <Attribute name="Occasion" value="Evening Wear · Date Night · Party" />
              </dl>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-[hsl(var(--rose-surface)/.36)] py-20 md:py-28" aria-labelledby="attribute-idea">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <Eyebrow number="02" aside="Product → Attributes">The idea</Eyebrow>
          <h2 id="attribute-idea" className="max-w-[900px] font-editorial text-[clamp(3.5rem,6.5vw,7.5rem)] leading-[.91] tracking-[-.04em]">Give every product a richer understanding of <em className="font-normal text-accent">style.</em></h2>
          <div className="mt-12 grid gap-6 border-t border-foreground/20 pt-7 md:mt-16 md:grid-cols-[.75fr_auto_1.25fr] md:items-center md:gap-10">
            <figure className="grid grid-cols-[105px_1fr] items-center gap-5 sm:grid-cols-[150px_1fr] md:grid-cols-1">
              <div className="attribute-product h-44 p-3 sm:h-52 md:h-72"><img src={marni} alt="Marni white and blue striped shirt with multicolor paint splatters, from the supplied product example." loading="lazy" data-testid="img-marni-shirt" /></div>
              <figcaption className="font-mono-archive text-[10px] uppercase leading-[1.6] tracking-[.15em] text-accent">Product image<br /><span className="text-muted-foreground">Marni striped shirt</span></figcaption>
            </figure>
            <ArrowRight className="hidden text-accent md:block" size={25} strokeWidth={1.2} aria-hidden="true" />
            <div className="md:hidden"><ArrowDown className="text-accent" size={22} strokeWidth={1.2} aria-hidden="true" /></div>
            <div>
              <p className="mb-3 font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">Predicted fashion attributes</p>
              <dl className="border-t border-foreground/20">
                <Attribute name="Aesthetic" value="Streetwear · luxury · modern · casual" />
                <Attribute name="Colorway" value="White and blue striped with multi-color paint splatters" />
                <Attribute name="Occasion" value="Casual · Everyday Wear · Streetwear · Resort" />
                <Attribute name="Customer" value="Fashion-forward men, luxury streetwear enthusiasts" />
                <Attribute name="Fit" value="Relaxed fit suits various body types" />
              </dl>
            </div>
          </div>
          <p className="mt-10 max-w-[680px] text-lg leading-[1.45] md:mt-14 md:text-xl">We used LLMs to predict fashion attributes from product images and tag the entire catalog.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16" aria-labelledby="attribute-why">
        <Eyebrow number="03">Why it mattered</Eyebrow>
        <h2 id="attribute-why" className="sr-only">One shared product language, four experiences</h2>
        <div className="grid border-t border-foreground/20 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Search', 'Natural-language discovery'],
            ['Recommendations', 'More relevant products'],
            ['Curation', 'Programmatic assortments'],
            ['Personalization', 'A user’s style DNA'],
          ].map(([title, detail], index) => (
            <div key={title} className="min-h-44 border-b border-foreground/20 py-6 sm:pr-6 lg:min-h-60 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0">
              <span className="font-mono-archive text-[10px] text-accent">0{index + 1}</span>
              <h3 className="mt-7 font-editorial text-[clamp(2rem,2.9vw,3.2rem)] leading-none">{title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{detail}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-[750px] font-editorial text-[clamp(2rem,3.3vw,3.8rem)] leading-[1.07]">The goal: a shared product language across the marketplace.</p>
      </section>

      <section className="bg-[hsl(var(--olive-surface)/.32)] py-20 md:py-28" aria-labelledby="attribute-role">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <Eyebrow number="04">My role</Eyebrow>
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <h2 id="attribute-role" className="max-w-[540px] font-editorial text-[clamp(3.5rem,6vw,7rem)] leading-[.92] tracking-[-.04em]">I owned the <em className="font-normal text-accent">quality bar.</em></h2>
            <div className="border-t border-foreground/20">
              {[
                ['Prompting', 'Designed the prompts and taxonomy.'],
                ['Evaluation', 'Defined how we measured attribute quality.'],
                ['UAT', 'Tested outputs against real products.'],
                ['Testing strategy', 'Sequenced where we would prove value first.'],
              ].map(([title, detail]) => (
                <div key={title} className="grid gap-1 border-b border-foreground/20 py-5 sm:grid-cols-[.42fr_.58fr] sm:gap-6">
                  <h3 className="font-editorial text-2xl md:text-3xl">{title}</h3>
                  <p className="text-sm leading-[1.5] text-muted-foreground md:text-base">{detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16" aria-labelledby="attribute-quality">
        <Eyebrow number="05" aside="The product work">From output to usable data</Eyebrow>
        <h2 id="attribute-quality" className="max-w-[1000px] font-editorial text-[clamp(3.5rem,6vw,7rem)] leading-[.91] tracking-[-.04em]">AI could generate the attributes. We had to make them <em className="font-normal text-accent">product-ready.</em></h2>
        <div className="mt-12 grid gap-8 bg-[hsl(var(--rose-surface)/.34)] p-6 sm:p-9 md:mt-16 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8 lg:p-12">
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">Raw value / Marni example</p>
            <p className="mt-6 max-w-[420px] font-editorial text-[clamp(2.4rem,3.7vw,4.6rem)] leading-[1.03]">“Streetwear; luxury; modern; casual”</p>
          </div>
          <ArrowRight size={24} strokeWidth={1.2} className="hidden text-accent md:block" aria-hidden="true" />
          <ArrowDown size={22} strokeWidth={1.2} className="text-accent md:hidden" aria-hidden="true" />
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">Illustrative structure / Aesthetic</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {['Streetwear', 'Luxury', 'Modern', 'Casual'].map((tag) => <span key={tag} className="border border-foreground/35 px-3 py-2 font-mono-archive text-[11px]">{tag}</span>)}
            </div>
            <p className="mt-7 max-w-[330px] text-xs leading-[1.5] text-muted-foreground">Formatting of a supplied attribute value, not a screenshot or documented final taxonomy.</p>
          </div>
        </div>
        <div className="mt-10 grid gap-7 md:mt-14 md:grid-cols-3 md:gap-10">
          {[
            ['Normalize the language', 'Outputs varied in capitalization and values. We needed a controlled taxonomy.'],
            ['Structure the data', 'Filters couldn’t rely on free-form text. Fields had to be predictable.'],
            ['Protect the brand', 'Plausible wasn’t always brand right. We had to catch and remove slop.'],
          ].map(([title, detail]) => (
            <div key={title} className="border-t border-foreground/25 pt-5">
              <h3 className="font-editorial text-3xl leading-none md:text-[2.5rem]">{title}</h3>
              <p className="mt-4 max-w-[350px] text-sm leading-[1.55] text-muted-foreground md:text-base">{detail}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[hsl(var(--primary))] py-20 text-[hsl(var(--primary-foreground))] md:py-28" aria-labelledby="attribute-sequence">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <div className="mb-8 flex justify-between gap-4 border-t border-current/30 pt-4 font-mono-archive text-[10px] uppercase tracking-[.17em] md:mb-12"><span>06 / Experiment sequence</span><span className="opacity-70">Not all at once</span></div>
          <h2 id="attribute-sequence" className="max-w-[900px] font-editorial text-[clamp(3.4rem,6vw,7rem)] leading-[.91] tracking-[-.04em]">Prove the value, <em className="font-normal text-[hsl(var(--rose-surface))]">surface by surface.</em></h2>
          <div className="mt-12 grid gap-0 border-t border-current/35 md:mt-16 md:grid-cols-3">
            {['Search', 'Browse', 'Recommendations'].map((item, index) => (
              <div key={item} className="flex items-center justify-between gap-4 border-b border-current/35 py-5 md:border-r md:px-6 md:first:pl-0 md:last:border-r-0">
                <div><span className="font-mono-archive text-[10px] opacity-65">0{index + 1}</span><p className="mt-2 font-editorial text-[clamp(2.4rem,3.6vw,4.6rem)] leading-none">{item}</p></div>
                {index < 2 && <ArrowRight size={19} strokeWidth={1.2} className="opacity-70" aria-hidden="true" />}
              </div>
            ))}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono-archive text-[11px] uppercase tracking-[.1em]"><span>Curation Tool</span><span aria-hidden="true">↔</span><span>Search</span><span className="ml-0 text-[10px] normal-case tracking-normal opacity-65 sm:ml-5">Parallel merchandising track</span></div>
          <p className="mt-9 max-w-[780px] text-base leading-[1.5] opacity-85 md:text-lg">Search was the largest surface, so it was the first proving ground. Recommendations followed. In parallel, we built Curation Tools with the merchandising team to prove operational value.</p>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16" aria-labelledby="attribute-curation">
        <Eyebrow number="07" aside="Customer-facing outcome">Curation</Eyebrow>
        <h2 id="attribute-curation" className="max-w-[1100px] font-editorial text-[clamp(3.5rem,6.8vw,8rem)] leading-[.9] tracking-[-.045em]">What if a merchandiser could build a trend lookbook with <em className="font-normal text-accent">one search?</em></h2>
        <div className="mt-10 grid gap-3 border-t border-foreground/20 pt-5 sm:grid-cols-3 md:mt-14">
          {['Enter a trend', 'Get a programmatic assortment', 'Delete the slop'].map((step, index) => (
            <div key={step} className="flex items-baseline gap-3 py-2 sm:pr-4"><span className="font-mono-archive text-[10px] text-accent">0{index + 1}</span><p className="font-editorial text-2xl leading-tight md:text-3xl">{step}</p></div>
          ))}
        </div>
        <figure className="mt-10 md:mt-14">
          <div className="attribute-lookbook"><img src={lookbook} alt="Actual customer-facing Shop Vintage Bridal product listing page, showing the Vintage Bridal lookbook heading, filters, and a grid of bridal fashion products." loading="lazy" data-testid="img-vintage-bridal-lookbook" /></div>
          <figcaption className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <div><p className="font-mono-archive text-[10px] uppercase tracking-[.15em] text-accent">Actual customer experience / Shop Vintage Bridal</p><p className="mt-2 max-w-[640px] text-sm leading-[1.5] text-muted-foreground">A customer-facing vintage bridal lookbook—not a screenshot of the internal Curation Tool.</p><p className="mt-2 font-mono-archive text-[10px] text-muted-foreground md:hidden">Swipe image to inspect</p></div>
            <button type="button" onClick={() => setLookbookOpen(true)} className="archive-link inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.12em] text-accent" aria-label="Enlarge Vintage Bridal lookbook" data-testid="button-enlarge-lookbook"><Maximize2 size={15} /> Enlarge</button>
          </figcaption>
        </figure>
        <p className="mt-9 max-w-[720px] text-base leading-[1.5] md:text-lg">The goal: give merchandising a scalable way to create trend-based assortments without manually tagging thousands of products.</p>
      </section>

      <section className="bg-[hsl(var(--rose-surface)/.36)] py-20 md:py-28" aria-labelledby="attribute-baseline">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <Eyebrow number="08" aside="An honest result">The first test</Eyebrow>
          <div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:gap-20">
            <div><h2 id="attribute-baseline" className="font-editorial text-[clamp(4rem,7vw,8rem)] leading-[.9] tracking-[-.045em]">The baseline test <em className="font-normal text-accent">didn&apos;t move.</em></h2><p className="mt-8 max-w-[560px] text-base leading-[1.5] md:text-lg">We learned something important: shoppers weren&apos;t naturally searching this way yet.</p></div>
            <div className="border-t border-foreground/25">
              <p className="py-4 font-mono-archive text-[10px] uppercase tracking-[.15em] text-accent">The kinds of queries we wanted to unlock</p>
              {['“quiet luxury”', '“date night”', '“boho”', '“what should I wear to…”'].map((query) => <p key={query} className="border-t border-foreground/20 py-3 font-editorial text-[clamp(1.8rem,3vw,3.2rem)] leading-[1.08]">{query}</p>)}
              <p className="mt-5 font-editorial text-3xl italic text-accent md:text-4xl">The capability existed. The behavior didn&apos;t.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-28 lg:px-16" aria-labelledby="attribute-measurement">
        <Eyebrow number="09">The measurement problem</Eyebrow>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <h2 id="attribute-measurement" className="max-w-[850px] font-editorial text-[clamp(3.5rem,6vw,7rem)] leading-[.92] tracking-[-.04em]">You can&apos;t measure a behavior people don&apos;t know <em className="font-normal text-accent">exists.</em></h2>
          <div className="lg:pt-3"><p className="max-w-[510px] text-base leading-[1.55] text-muted-foreground md:text-lg">Natural-language search needed a stronger go-to-market strategy to teach shoppers they could search by trend, occasion, and vibe. A controlled test alone couldn&apos;t capture the full impact.</p><div className="mt-10 border-t border-foreground/25 pt-5"><p className="font-editorial text-[clamp(3rem,5vw,5.6rem)] leading-none">Pre <span className="text-accent">→</span> Post</p><p className="mt-4 max-w-[420px] text-sm leading-[1.5] text-muted-foreground md:text-base">We shifted toward observing behavior after launch—not treating a pre/post change as proof of causality.</p></div></div>
        </div>
      </section>

      <section className="bg-[hsl(var(--olive-surface)/.38)] py-20 md:py-28" aria-labelledby="attribute-value">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-16">
          <Eyebrow number="10" aside="Where value showed up">Product recommendations</Eyebrow>
          <div className="grid gap-10 md:grid-cols-[1.1fr_.9fr] md:items-end md:gap-16">
            <div><h2 id="attribute-value" className="sr-only">Conversion in product recommendations</h2><p className="font-editorial text-[clamp(6.5rem,16vw,17rem)] leading-[.75] tracking-[-.07em] text-accent" data-testid="text-recommendations-conversion">+10%</p><p className="mt-6 font-mono-archive text-[11px] uppercase tracking-[.17em]">Conversion / Product recommendations</p></div>
            <p className="max-w-[520px] border-t border-foreground/25 pt-5 font-editorial text-[clamp(2rem,3.4vw,4rem)] leading-[1.07]">Recommendations showed the largest step-change lift, <em className="font-normal text-accent">suggesting</em> richer product understanding could create value even when shoppers weren&apos;t explicitly searching for these attributes.</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-6 py-20 sm:px-10 md:py-32 lg:px-16" aria-labelledby="attribute-takeaway">
        <Eyebrow number="11">The takeaway</Eyebrow>
        <h2 id="attribute-takeaway" className="max-w-[1200px] font-editorial text-[clamp(3.7rem,7.2vw,8.5rem)] leading-[.91] tracking-[-.045em]">The real opportunity wasn&apos;t adding more metadata. It was giving The RealReal a richer language for understanding <em className="font-normal text-accent">style.</em></h2>
        <p className="mt-10 max-w-[680px] border-t border-foreground/20 pt-5 text-base leading-[1.5] text-muted-foreground md:mt-14 md:text-lg">One foundation. Multiple product experiences: search, recommendations, browse, personalization, and curation.</p>
      </section>
      <ProjectNavigation nextProject={nextProject} />

      {lookbookOpen && (
        <div className="attribute-zoom fixed inset-0 z-50 flex flex-col bg-[hsl(var(--background))] p-4 sm:p-8" role="dialog" aria-modal="true" aria-label="Vintage Bridal lookbook enlarged image" onClick={() => setLookbookOpen(false)} data-testid="dialog-lookbook-enlarged">
          <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between border-b border-border pb-4">
            <p className="font-mono-archive text-[10px] uppercase tracking-[.17em] text-accent">Customer experience / Vintage Bridal</p>
            <button type="button" ref={closeRef} onClick={() => setLookbookOpen(false)} className="archive-link inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.12em] text-accent" data-testid="button-close-lookbook">Close <X size={18} /></button>
          </div>
          <div className="mx-auto mt-5 w-full max-w-[1500px] flex-1 overflow-auto" onClick={(event) => event.stopPropagation()}><img src={lookbook} alt="Enlarged actual Shop Vintage Bridal customer-facing product listing page with bridal product grid." className="mx-auto h-auto min-w-[1000px] max-w-none lg:w-full" data-testid="img-lookbook-enlarged" /></div>
          <p className="mx-auto mt-3 w-full max-w-[1500px] font-mono-archive text-[10px] text-muted-foreground sm:hidden">Swipe to inspect the full image</p>
        </div>
      )}
    </div>
  );
}