import { Link, useLocation } from 'wouter';
import { exitTastePreview } from '@/lib/taste-preview';

export function OsChrome({ preview = false }: { preview?: boolean }) {
  const [location] = useLocation();
  const about = location === '/about' || location === '/contact';

  return (
    <div className="os-menubar">
      <p className="os-mark">SHARIN.KHANDER</p>
      <nav className="os-nav" aria-label="Primary">
        <Link href="/" aria-current={!about ? 'page' : undefined} data-testid="link-nav-work">Work</Link>
        <Link href="/about" aria-current={about ? 'page' : undefined} data-testid="link-nav-about">About</Link>
      </nav>
      {preview ? (
        <button type="button" className="os-exit" onClick={exitTastePreview}>
          Exit preview
        </button>
      ) : null}
    </div>
  );
}
