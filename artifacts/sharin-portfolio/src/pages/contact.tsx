import { usePageMeta } from '@/lib/use-page-meta';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

const contactLinks = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sharin-khander/' },
  { label: 'GitHub', href: 'https://github.com/skhander' },
  { label: 'Medium', href: 'https://medium.com/@sharinkhander' },
] as const;

export default function Contact() {
  usePageMeta('Contact — Sharin Khander', 'Connect with Sharin Khander about consumer products, marketplaces, discovery, AI, and commerce.');

  return (
    <div className="page-reveal">
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-14 sm:px-10 md:pt-16 lg:px-[5%]">
        <p className="site-eyebrow font-mono-archive text-accent">Contact</p>
        <h1 className="mt-4 max-w-4xl font-editorial text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[1.1] tracking-[-.03em]">Let’s talk<br />product.</h1>
        <nav aria-label="Social links" className="mt-8 grid max-w-2xl border-y border-border sm:grid-cols-3 sm:divide-x sm:divide-border">
          {contactLinks.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between gap-3 border-b border-border py-4 text-xl font-medium transition-colors hover:text-accent last:border-b-0 sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0">
              <span>{label}<span className="sr-only"> (opens in a new tab)</span></span>
              <ArrowUpRight size={18} strokeWidth={1.4} className="shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </a>
          ))}
        </nav>
      </section>
      <section className="mx-auto w-full max-w-[1440px] border-t border-border px-6 py-8 sm:px-10 lg:px-[5%]">
        <div className="flex flex-col items-start gap-3">
          <p className="site-eyebrow font-mono-archive text-muted-foreground">Start with the work</p>
          <Link href="/" className="group inline-flex items-center gap-3 font-editorial text-2xl font-medium archive-link md:text-3xl" data-testid="link-contact-work">See the work <ArrowUpRight size={17} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>
    </div>
  );
}