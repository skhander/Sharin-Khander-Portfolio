import type { Project } from '@/lib/projects';
import { ProjectNavigation } from './project-content';
import logosPatternsImage from '@assets/Screenshot_2026-09-30_at_3.39.28_AM_1790765043915.png';
import sweaterMismatchImage from '@assets/Screenshot_2026-09-30_at_3.39.08_AM_1790765047792.png';
import metallicBagMismatchImage from '@assets/Screenshot_2026-09-30_at_3.38.54_AM_1790765051727.png';
import './image-search-story.css';

type ImageSearchStoryProps = {
  nextProject: Project;
};

const leadership = [
  { number: '01', title: 'Discovery', description: 'Picked the vendor and the stack.' },
  { number: '02', title: 'Definition', description: 'Set scope and the shipping plan with Engineering and ML.' },
  { number: '03', title: 'Execution', description: 'Owned the search flow and whether the results were right.' },
  { number: '04', title: 'Adoption', description: 'Watched usage and GMV.' },
];

const tradeOffExamples = [
  {
    id: 'overview',
    src: logosPatternsImage,
    alt: 'Logos and abstract patterns overview showing successful and mismatched image search results.',
    className: 'image-search-example-overview',
  },
  {
    id: 'sweater',
    src: sweaterMismatchImage,
    alt: 'Sweater image search rank mismatch: a striped sweater appears first, while the closer patterned sweater appears second.',
    className: '',
  },
  {
    id: 'metallic-bag',
    src: metallicBagMismatchImage,
    alt: 'Metallic bag image search mismatch: a white bag appears first, while the closer metallic silver bag appears second.',
    className: '',
  },
];

export function ImageSearchStory({ nextProject }: ImageSearchStoryProps) {
  return (
    <article className="page-reveal image-search-story">
      <section className="image-search-section image-search-problem mx-auto max-w-[1440px] border-t border-border px-6 py-10 sm:px-10 md:py-12 lg:px-16" aria-labelledby="image-search-problem">
        <div className="image-search-section-grid">
          <h2 id="image-search-problem" className="image-search-heading font-editorial">The problem</h2>
          <div className="image-search-copy">
            <p className="image-search-lede"><strong>Some products are hard to describe in words.</strong></p>
            <p>Someone sees it on social, in a store, or on another person. They do not know what to type.</p>
            <p className="image-search-resolution">Image search lets them skip the keywords.</p>
          </div>
        </div>
      </section>

      <section className="image-search-impact mx-auto max-w-[1440px] border-y border-border px-6 py-8 sm:px-10 md:py-10 lg:px-16" aria-labelledby="image-search-impact-heading">
        <h2 id="image-search-impact-heading" className="image-search-heading font-editorial">Impact</h2>
        <dl className="image-search-metrics">
          <div className="image-search-metric">
            <dt>GMV</dt>
            <dd>$14M</dd>
          </div>
          <div className="image-search-metric">
            <dt>conversion</dt>
            <dd>+1%</dd>
          </div>
          <div className="image-search-metric">
            <dt>keyword searches per visitor</dt>
            <dd>−10%</dd>
          </div>
        </dl>
      </section>

      <section className="image-search-section mx-auto max-w-[1440px] border-b border-border px-6 py-10 sm:px-10 md:py-12 lg:px-16" aria-labelledby="image-search-led">
        <div className="image-search-section-grid">
          <h2 id="image-search-led" className="image-search-heading font-editorial">What I led</h2>
          <ol className="image-search-leadership">
            {leadership.map((item) => (
              <li className="image-search-leadership-item" key={item.number}>
                <div>
                  <h3>{item.number} — {item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="image-search-section image-search-tradeoff mx-auto max-w-[1440px] border-b border-border px-6 py-10 sm:px-10 md:py-12 lg:px-16" aria-labelledby="image-search-tradeoff">
        <div className="image-search-section-grid">
          <h2 id="image-search-tradeoff" className="image-search-heading font-editorial">The trade-off</h2>
          <div className="image-search-copy">
            <p className="image-search-lede"><strong>The model missed the details.</strong></p>
            <ul className="image-search-nuances">
              <li>Metallics vs. whites.</li>
              <li>Subtle patterns.</li>
              <li>Hermès scarves and ties.</li>
            </ul>
            <p className="image-search-resolution">We added a feedback loop so results got better over time.</p>
          </div>
        </div>
        <div className="image-search-examples" aria-label="Image search result examples">
          {tradeOffExamples.map((image) => (
            <figure className={`image-search-example ${image.className}`} key={image.alt}>
              <a
                href={image.src}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View full-size example: ${image.alt}`}
                data-testid={`link-image-search-example-${image.id}`}
              >
                <img src={image.src} alt={image.alt} loading="lazy" />
              </a>
            </figure>
          ))}
        </div>
      </section>

      <ProjectNavigation nextProject={nextProject} />
    </article>
  );
}