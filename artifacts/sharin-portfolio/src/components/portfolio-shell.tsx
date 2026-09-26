import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Footer } from '@/components/project-content';

type PortfolioShellProps = { children: React.ReactNode };

export function PortfolioShell({ children }: PortfolioShellProps) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const closeMenu = () => setMenuOpen(false);
  const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="archive-noise min-h-[100dvh] bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between border-b border-border px-6 py-5 sm:px-10 lg:px-16">
        <Link href="/" onClick={closeMenu} className="archive-link group flex items-baseline gap-2" data-testid="link-home">
          <span className="font-editorial text-[1.5rem] leading-none tracking-[-.03em]">Sharin Khander</span>
        </Link>
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="relative z-30 flex h-10 w-10 items-center justify-center md:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          data-testid="button-toggle-navigation"
        >
          {menuOpen ? <X size={19} strokeWidth={1.5} /> : <Menu size={19} strokeWidth={1.5} />}
        </button>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`archive-link font-mono-archive text-[10px] uppercase tracking-[.18em] ${location === link.href ? 'text-accent' : 'text-muted-foreground'}`}
              data-testid={`link-nav-${link.label.toLowerCase()}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>
      {menuOpen && (
        <nav id="mobile-navigation" className="absolute inset-x-0 top-[65px] z-20 border-y border-border bg-background px-6 py-6 md:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={`font-editorial text-3xl ${location === link.href ? 'text-accent' : 'text-foreground'}`}
                data-testid={`link-mobile-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function ViewArchiveLink({ label = 'View the archive' }: { label?: string }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.16em] text-muted-foreground archive-link" data-testid="link-view-archive">
      <span>{label}</span>
      <ArrowUpRight size={13} strokeWidth={1.4} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </Link>
  );
}