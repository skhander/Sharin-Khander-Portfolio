import { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight } from 'lucide-react';
import { Footer } from '@/components/project-content';

type PortfolioShellProps = { children: React.ReactNode };

export function PortfolioShell({ children }: PortfolioShellProps) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'Process' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="archive-noise min-h-[100dvh] bg-background text-foreground">
      <header className="mx-auto flex min-h-16 w-full max-w-[1440px] items-center justify-end border-b border-border px-6 py-4 sm:px-10 lg:px-[5%]">
        <nav className="flex items-center gap-5 sm:gap-8" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`archive-link font-mono-archive text-[12px] font-medium ${location === link.href ? 'text-accent' : 'text-muted-foreground'}`}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function ViewArchiveLink({ label = 'View the archive' }: { label?: string }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2 font-mono-archive text-xs text-muted-foreground archive-link" data-testid="link-view-archive">
      <span>{label}</span>
      <ArrowUpRight size={13} strokeWidth={1.4} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}