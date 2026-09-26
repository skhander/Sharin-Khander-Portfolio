import { useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact — Sharin Khander';
    return () => { document.title = 'Sharin Khander — Product archive'; };
  }, []);

  return (
    <div className="page-reveal">
      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-16 px-6 pb-28 pt-20 sm:px-10 md:grid-cols-[.75fr_1.25fr] md:gap-20 md:pb-40 md:pt-32 lg:px-16">
        <div>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">Contact / 01</p>
          <p className="mt-14 max-w-[190px] font-mono-archive text-[9px] uppercase leading-[1.6] tracking-[.14em] text-muted-foreground">For conversations<br />about building<br />for people</p>
        </div>
        <div>
          <h1 className="max-w-4xl font-editorial text-[clamp(4rem,10vw,9.5rem)] leading-[.8] tracking-[-.055em]">Let’s talk<br /><em>product.</em></h1>
          <p className="mt-14 max-w-lg text-lg leading-[1.55] text-muted-foreground sm:mt-20 sm:text-xl">A direct contact channel is intentionally not published in this archive. If you have been sent here for a conversation, please use the channel that brought you here.</p>
          <div className="mt-12 border-t border-border pt-5">
            <p className="font-mono-archive text-[9px] uppercase leading-[1.7] tracking-[.12em] text-muted-foreground">Contact details available privately</p>
          </div>
        </div>
      </section>
      <section className="mx-auto w-full max-w-[1440px] border-t border-border px-6 py-8 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground">Before you go</p>
          <Link href="/" className="group inline-flex items-center gap-3 font-editorial text-2xl archive-link" data-testid="link-contact-work">See the work <ArrowUpRight size={17} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
        </div>
      </section>
    </div>
  );
}