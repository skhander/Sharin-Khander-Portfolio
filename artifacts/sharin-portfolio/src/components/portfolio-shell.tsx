import { useCallback, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/project-content';
import { OsBoot } from '@/components/os-boot';
import { OsChrome } from '@/components/os-chrome';
import { OsLife } from '@/components/os-life';
import { applyTastePreview } from '@/lib/taste-preview';

type PortfolioShellProps = { children: React.ReactNode };

export function PortfolioShell({ children }: PortfolioShellProps) {
  const [location] = useLocation();
  const [preview, setPreview] = useState(() => applyTastePreview());
  const [booting, setBooting] = useState(() => applyTastePreview());

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const on = applyTastePreview();
    setPreview(on);
    if (!on) setBooting(false);
  }, [location]);

  const finishBoot = useCallback(() => setBooting(false), []);
  const isAbout = location === '/about' || location === '/contact';

  return (
    <div className={`archive-noise min-h-[100dvh] bg-background text-foreground${preview && isAbout ? ' has-life' : ''}`}>
      {preview && isAbout ? <OsLife /> : null}
      {preview && booting ? <OsBoot onDone={finishBoot} /> : null}
      <OsChrome preview={preview} />
      <main>{children}</main>
      {isAbout ? null : <Footer />}
    </div>
  );
}

export function ViewArchiveLink({ label = 'View the archive' }: { label?: string }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2 font-mono-archive text-sm text-muted-foreground archive-link" data-testid="link-view-archive">
      <span>{label}</span>
      <ArrowUpRight size={13} strokeWidth={1.4} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}
