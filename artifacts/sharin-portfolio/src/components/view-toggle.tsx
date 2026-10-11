import { useLayoutEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'wouter';
import './view-toggle.css';

const options = [
  { href: '/', label: 'Work', testId: 'link-nav-work' },
  { href: '/about', label: 'About', testId: 'link-nav-about' },
] as const;

type Thumb = { x: number; y: number; width: number; height: number };

function isAboutPath(location: string) {
  return location === '/about' || location === '/contact';
}

export function ViewToggle() {
  const [location] = useLocation();
  const about = isAboutPath(location);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const [thumb, setThumb] = useState<Thumb | null>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const measure = () => {
      const active = linkRefs.current[about ? 1 : 0];
      if (!active) return;
      const next = {
        x: active.offsetLeft,
        y: active.offsetTop,
        width: active.offsetWidth,
        height: active.offsetHeight,
      };
      setThumb((prev) =>
        prev &&
        prev.x === next.x &&
        prev.y === next.y &&
        prev.width === next.width &&
        prev.height === next.height
          ? prev
          : next,
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(nav);
    window.addEventListener('resize', measure);
    let cancelled = false;
    document.fonts?.ready.then(() => {
      if (!cancelled) measure();
    });
    const frame = requestAnimationFrame(() => setReady(true));

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [about]);

  return (
    <nav
      ref={navRef}
      className={`view-toggle${thumb ? ' is-measured' : ''}${ready ? ' is-ready' : ''}`}
      aria-label="Primary"
    >
      <span
        className="view-toggle-thumb"
        style={
          thumb
            ? {
                transform: `translateX(${thumb.x}px)`,
                width: thumb.width,
                height: thumb.height,
                top: thumb.y,
              }
            : undefined
        }
        aria-hidden="true"
      />
      {options.map((option, index) => {
        const current = option.href === '/about' ? about : !about;
        return (
          <Link
            key={option.href}
            href={option.href}
            className="view-toggle-option"
            data-testid={option.testId}
            aria-current={current ? 'page' : undefined}
            ref={(node) => {
              linkRefs.current[index] = node;
            }}
          >
            {option.label}
          </Link>
        );
      })}
    </nav>
  );
}
