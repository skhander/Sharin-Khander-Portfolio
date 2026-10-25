import { Link, useLocation } from 'wouter';

const resumeHref = `${import.meta.env.BASE_URL}resume.pdf`;

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
      <a
        className="os-resume"
        href={resumeHref}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="link-resume"
      >
        Resume
        <span className="sr-only"> (PDF, opens in a new tab)</span>
      </a>
    </div>
  );
}
