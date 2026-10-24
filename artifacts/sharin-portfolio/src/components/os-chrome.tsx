import { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';

function formatClock(date: Date) {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function OsChrome() {
  const [location] = useLocation();
  const [clock, setClock] = useState(() => formatClock(new Date()));
  const about = location === '/about' || location === '/contact';

  useEffect(() => {
    const tick = () => setClock(formatClock(new Date()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="os-menubar">
      <p className="os-mark">SHARIN.KHANDER</p>
      <nav className="os-nav" aria-label="Primary">
        <Link href="/" aria-current={!about ? 'page' : undefined} data-testid="link-nav-work">Work</Link>
        <Link href="/about" aria-current={about ? 'page' : undefined} data-testid="link-nav-about">About</Link>
      </nav>
      <span className="os-run" aria-hidden="true" />
      <time className="os-clock" dateTime={clock}>{clock}</time>
    </div>
  );
}
