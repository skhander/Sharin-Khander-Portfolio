import { Link, useLocation } from 'wouter';

export function OsChrome() {
  const [location] = useLocation();
  const about = location === '/about' || location === '/contact';

  return (
    <div className="os-menubar">
      <p className="os-mark">SHARIN.KHANDER</p>
      <nav className="os-nav" aria-label="Primary">
        <Link href="/" aria-current={!about ? 'page' : undefined} data-testid="link-nav-work">Work</Link>
        <Link href="/about" aria-current={about ? 'page' : undefined} data-testid="link-nav-about">About</Link>
      </nav>
    </div>
  );
}
