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
  { value: '7', label: '0→1 builds', testId: 'text-products-count' },
] as const;

export default function About() {
  usePageMeta('About — Sharin Khander', '$180M in sales and 7 builds from zero.');

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
        <img src={portrait} alt="Sharin Khander" className="about-portrait" decoding="async" fetchPriority="high" />

        <section className="about-panel" aria-labelledby="about-me-title">
          <h2 id="about-me-title" className="about-kicker">About Me</h2>
          <p className="about-bio">
            Product builder based in{' '}
            <span className="about-bio-place">New York City 🗽</span>
          </p>
        </section>

        <section className="about-panel" aria-labelledby="about-impact-title">
          <h2 id="about-impact-title" className="about-kicker">2026 Impact</h2>
          <dl className="about-stats">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="font-editorial" data-testid={stat.testId}>{stat.value}</dt>
                <dd>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="about-panel" aria-labelledby="about-resources-title">
          <h2 id="about-resources-title" className="about-kicker">Resources</h2>
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
