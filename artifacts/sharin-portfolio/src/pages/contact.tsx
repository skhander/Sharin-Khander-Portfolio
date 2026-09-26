import { usePageMeta } from '@/lib/use-page-meta';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  usePageMeta('Contact — Sharin Khander', 'Connect with Sharin Khander about consumer products, marketplaces, discovery, AI, and commerce.');

  return (
    <div className="page-reveal">
      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-9 px-6 pb-20 pt-14 sm:px-10 md:grid-cols-[.55fr_1.45fr] md:gap-16 md:pb-28 md:pt-24 lg:px-16">
        <div>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">Contact</p>
        </div>
        <div>
          <h1 className="max-w-4xl font-editorial text-[clamp(4rem,9vw,8.5rem)] leading-[.85] tracking-[-.055em]">Let’s talk<br /><em>product.</em></h1>
          <p className="mt-12 max-w-lg text-lg leading-[1.5] text-muted-foreground sm:mt-16 sm:text-xl">Contact information isn’t public on this site.</p>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1440px] border-t border-border px-6 py-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Start with the work</p>
          <Link href="/" className="group inline-flex items-center gap-3 font-editorial text-2xl archive-link" data-testid="link-contact-work">See the work <ArrowUpRight size={17} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>
    </div>
  );
}