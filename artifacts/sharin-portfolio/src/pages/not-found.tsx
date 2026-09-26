import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="mx-auto min-h-[55dvh] w-full max-w-[1440px] px-6 pb-24 pt-24 sm:px-10 lg:px-16">
      <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">404 / Unfiled</p>
      <h1 className="mt-12 max-w-2xl font-editorial text-[clamp(4rem,9vw,8rem)] leading-[.8] tracking-[-.05em]">Nothing here<br /><em>yet.</em></h1>
      <Link href="/" className="mt-16 inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground archive-link" data-testid="link-404-home"><ArrowLeft size={14} /> Back to archive</Link>
    </div>
  );
}
