import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  useEffect(() => {
    document.title = 'About — Sharin Khander';
    return () => { document.title = 'Sharin Khander — Product archive'; };
  }, []);

  return (
    <div className="page-reveal">
      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-16 px-6 pb-28 pt-20 sm:px-10 md:grid-cols-[.8fr_1.2fr] md:gap-20 md:pb-40 md:pt-32 lg:px-16">
        <div>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">About / 01</p>
          <p className="mt-14 max-w-[180px] font-mono-archive text-[9px] uppercase leading-[1.6] tracking-[.14em] text-muted-foreground">Product builder<br />Former engineer<br />Consumer at heart</p>
        </div>
        <div>
          <h1 className="max-w-4xl font-editorial text-[clamp(4rem,9vw,8.5rem)] leading-[.82] tracking-[-.05em]">I make things<br /><em>people return to.</em></h1>
          <div className="mt-16 max-w-xl space-y-7 text-lg leading-[1.55] text-muted-foreground sm:mt-24 sm:text-xl">
            <p>Sharin Khander is a product builder and former engineer focused on habit-forming consumer products.</p>
            <p>His work spans marketplaces, AI discovery, ecommerce, checkout, personalization, virtual try-on, and consumer productivity.</p>
            <p>This is a quiet archive of that work. The case studies are intentionally built around the thinking: what was seen, what was believed, and what was made.</p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1440px] border-t border-border px-6 py-8 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Explore the work</p>
          <Link href="/" className="group inline-flex items-center gap-3 font-editorial text-2xl archive-link" data-testid="link-about-work">The archive <ArrowUpRight size={17} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>
    </div>
  );
}