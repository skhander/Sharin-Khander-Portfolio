import { useEffect, type CSSProperties } from 'react';
import { usePageMeta } from '@/lib/use-page-meta';
import { ArrowUpRight } from 'lucide-react';
import portrait from '@assets/sharin-khander.jpg';
import goo from '@assets/about-goo.jpg';
import './about-stage.css';

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sharin-khander/' },
  { label: 'GitHub', href: 'https://github.com/skhander' },
  { label: 'Medium', href: 'https://medium.com/@sharinkhander' },
] as const;

const stats = [
  { value: '$180M', label: 'sales', testId: 'text-gmv-impact' },
  { value: '90%', label: 'win rate', testId: 'text-experiments-count' },
  { value: '7', label: '0→1 builds', testId: 'text-products-count' },
] as const;

export default function About() {
  usePageMeta('About — Sharin Khander', '$180M in sales, 90% win rate, and 7 builds from zero.');

  useEffect(() => {
    const stage = document.querySelector('.about-stage');
    const sync = () => stage?.classList.toggle('is-paused', document.hidden);
    document.addEventListener('visibilitychange', sync);
    return () => document.removeEventListener('visibilitychange', sync);
  }, []);

  return (
    <div className="about-stage" style={{ '--about-goo': `url(${goo})` } as CSSProperties}>
      <div className="about-sheet">
        <h1 className="sr-only">Sharin Khander</h1>
        <img src={portrait} alt="Sharin Khander" className="about-portrait" />

        <section className="about-panel" aria-label="2026 Impact">
          <p className="about-place">Product builder in New York City.</p>
          <p className="about-kicker">2026 Impact</p>
          <dl className="about-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-editorial" data-testid={stat.testId}>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="about-panel" aria-label="Contact">
          <h2 className="about-kicker">Contact</h2>
          <div className="about-links">
            {links.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">
                {label}
                <span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight size={16} strokeWidth={1.6} aria-hidden="true" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
