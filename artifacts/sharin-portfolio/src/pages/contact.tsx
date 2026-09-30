import { usePageMeta } from '@/lib/use-page-meta';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  usePageMeta('Contact — Sharin Khander', 'Connect with Sharin Khander about consumer products, marketplaces, discovery, AI, and commerce.');

  return (
    <div className="page-reveal">
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-14 sm:px-10 md:pt-16 lg:px-[5%]">
        <p className="font-mono-archive text-xs text-accent">Contact</p>
        <h1 className="mt-4 max-w-4xl font-editorial text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[1.1] tracking-[-.03em]">Let’s talk<br />product.</h1>
        <p className="mt-5 max-w-lg text-base leading-[1.65] text-muted-foreground">Contact information isn’t public on this site.</p>
      </section>
      <section className="mx-auto w-full max-w-[1440px] border-t border-border px-6 py-8 sm:px-10 lg:px-[5%]">
        <div className="flex flex-col items-start gap-3">
          <p className="font-mono-archive text-xs text-muted-foreground">Start with the work</p>
          <Link href="/" className="group inline-flex items-center gap-3 font-editorial text-2xl font-medium archive-link" data-testid="link-contact-work">See the work <ArrowUpRight size={17} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>
    </div>
  );
}