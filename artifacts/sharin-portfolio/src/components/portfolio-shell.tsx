import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowUpRight, Menu, X } from 'lucide-react';

type PortfolioShellProps = { children: React.ReactNode };

export function PortfolioShell({ children }: PortfolioShellProps) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);
  const links = [
    { href: '/', label: 'Work' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div className="archive-noise min-h-[100dvh] bg-background text-foreground">
      <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-6 sm:px-10 lg:px-16 lg:py-8">
        <Link href="/" onClick={closeMenu} className="archive-link group flex items-baseline gap-2" data-testid="link-home">
          <span className="font-editorial text-[1.45rem] leading-none tracking-[-.03em]">Sharin Khander</span>
          <span className="hidden font-mono-archive text-[9px] uppercase tracking-[.16em] text-muted-foreground sm:inline">Product archive</span>
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
        <nav id="mobile-navigation" className="absolute inset-x-0 top-[76px] z-20 border-y border-border bg-background px-6 py-6 md:hidden" aria-label="Mobile navigation">
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
      <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-6 pb-8 pt-20 sm:flex-row sm:items-end sm:justify-between sm:px-10 lg:px-16 lg:pb-10">
        <div>
          <p className="font-editorial text-2xl leading-none">The work is the point.</p>
          <p className="mt-3 font-mono-archive text-[9px] uppercase tracking-[.14em] text-muted-foreground">Sharin Khander · Product builder</p>
        </div>
        <p className="font-mono-archive text-[9px] uppercase tracking-[.14em] text-muted-foreground">A living archive · {new Date().getFullYear()}</p>
      </footer>
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