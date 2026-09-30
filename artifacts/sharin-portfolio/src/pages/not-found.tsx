import { ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function NotFound() {
  return (
    <div className="mx-auto min-h-[55dvh] w-full max-w-[1440px] px-6 pb-16 pt-14 sm:px-10 md:pt-16 lg:px-[5%]">
      <p className="font-mono-archive text-xs text-accent">404 / Unfiled</p>
      <h1 className="mt-4 max-w-2xl font-editorial text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[1.1] tracking-[-.03em]">Nothing here<br />yet.</h1>
      <Link href="/" className="mt-8 inline-flex items-center gap-2 font-mono-archive text-xs text-muted-foreground archive-link" data-testid="link-404-home"><ArrowLeft size={14} /> Back to archive</Link>
    </div>
  );
}
