import { useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Play } from 'lucide-react';
import { Link } from 'wouter';
import { personalProjects, publishedProjects } from '@/lib/projects';
import { usePageMeta } from '@/lib/use-page-meta';
import './editorial-work.css';

const workTypes = ['The RealReal', 'Personal'] as const;
type WorkType = typeof workTypes[number];

const tryOnClips = [
  {
    label: 'Browse grid',
    src: `${import.meta.env.BASE_URL}media/personal/virtual-try-on-grid.mp4?v=2`,
    poster: `${import.meta.env.BASE_URL}media/personal/virtual-try-on-grid-poster.jpg?v=2`,
  },
];

function Recording({ clip }: { clip: typeof tryOnClips[number] }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="personal-recording">
      {playing ? (
        <video src={clip.src} poster={clip.poster} controls autoPlay playsInline aria-label={`Virtual Try-On — ${clip.label} recording`} preload="metadata" />
      ) : (
        <button type="button" className="personal-recording-play" onClick={() => setPlaying(true)} aria-label={`Play Virtual Try-On — ${clip.label} recording`}>
          <img src={clip.poster} alt="" loading="lazy" />
          <span className="personal-play-icon"><Play size={18} fill="currentColor" aria-hidden="true" /></span>
        </button>
      )}
    </div>
  );
}

const homepageProjectSlugs = [
  'curation',
  'ai-discovery',
  'similar-designers',
  'attribute-enrichment',
  'visual-search',
  'elevated-experience',
] as const;

const homepageProjects = homepageProjectSlugs.map((slug) => {
  const project = publishedProjects.find((item) => item.slug === slug);
  if (!project) throw new Error(`Missing published homepage project: ${slug}`);
  return project;
});

if (homepageProjects.length !== publishedProjects.length) {
  throw new Error('Homepage project order must include every published project');
}

const projectVisuals: Record<string, { src: string; alt: string; note?: string; badges: string[] }> = {
  'elevated-experience': {
    src: '/media/browse-after.webp',
    alt: 'The RealReal luxury handbag browse interface',
    note: 'PRODUCT INTERFACE',
    badges: ['Experiments'],
  },
  'attribute-enrichment': {
    src: '/media/attribute-enrichment/chanel-top.webp',
    alt: 'Chanel vintage top used in the attribute-enrichment project',
    note: 'ATTRIBUTE ENRICHMENT / SOURCE VISUAL',
    badges: ['LLMs', '0→1'],
  },
  'ai-discovery': {
    src: '/media/work/shopping-agent-demo.mp4',
    alt: 'Ask TRR shopping agent demo video',
    badges: ['Agents', '0→1'],
  },
  'visual-search': {
    src: '/media/work/visual-search-ui.png',
    alt: 'Visual Search mobile camera interface with selectable regions in a photo',
    badges: ['Machine Learning', '0→1'],
  },
  'similar-designers': {
    src: '/media/work/similar-designers-customers-also-shop.png',
    alt: 'Customers also shop recommendations for Chanel, Christian Dior, Gucci, Prada, Fendi, and Hermès',
    badges: ['Machine Learning', '0→1'],
  },
  curation: {
    src: '/media/work/curation-vacation-shop.mp4',
    alt: 'The RealReal Vacation Shop product browse video',
    badges: ['Agents', 'Machine Learning', '0→1 BUILD'],
  },
};

export default function Work() {
  const [workType, setWorkType] = useState<WorkType>(workTypes[0]);
  usePageMeta('Work — Sharin Khander', 'Explore Sharin Khander’s product work across luxury marketplaces, shopping agents, visual search, designer discovery, and personalization.');

  const selectWorkType = (next: WorkType) => {
    setWorkType(next);
  };
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const nextIndex = event.key === 'ArrowRight' ? (index + 1) % workTypes.length
      : event.key === 'ArrowLeft' ? (index - 1 + workTypes.length) % workTypes.length
      : event.key === 'Home' ? 0 : event.key === 'End' ? workTypes.length - 1 : -1;
    if (nextIndex < 0) return;
    event.preventDefault();
    selectWorkType(workTypes[nextIndex]);
    document.getElementById(`work-tab-${nextIndex}`)?.focus();
  };

  return (
    <div className="page-reveal editorial-work">
      <section className="work-hero mx-auto w-full max-w-[1440px] px-6 pb-12 pt-14 sm:px-10 md:pb-14 md:pt-16 lg:px-[5%]">
        <h1 className="work-hero-name font-editorial" data-testid="text-work-name">Sharin<br />{' '}Khander<span className="text-accent">.</span></h1>
        <div className="work-hero-support">
          <p className="work-hero-role font-editorial" data-testid="text-work-tagline">I build better ways<br />{' '}to shop<span className="text-accent">.</span></p>
          <div className="work-proof" aria-label="2026 year-to-date metrics">
            <span className="work-proof-heading font-mono-archive">2026 YTD</span>
            <div className="work-proof-grid">
              <div className="work-proof-item">
                <strong className="work-proof-number font-editorial" data-testid="text-products-count">7</strong>
                <span className="work-proof-label">0→1 PRODUCTS</span>
              </div>
              <div className="work-proof-item">
                <strong className="work-proof-number font-editorial" data-testid="text-experiments-count">40</strong>
                <span className="work-proof-label">EXPERIMENTS</span>
                <span className="work-proof-note">36 WINS</span>
              </div>
              <div className="work-proof-item">
                <strong className="work-proof-number font-editorial" data-testid="text-gmv-impact">$180M</strong>
                <span className="work-proof-label">GMV IMPACT</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="selected-work" className="mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-28 lg:px-[5%]" aria-labelledby="work-heading">
        <div className="work-band">
          <h2 id="work-heading" className="font-editorial text-[clamp(2.3rem,4vw,3.8rem)] leading-none tracking-[-.035em]">Things I’ve Built</h2>
          <div className="work-tabs" role="tablist" aria-label="Work type">
            {workTypes.map((type, index) => (
              <button
                type="button"
                role="tab"
                id={`work-tab-${index}`}
                aria-controls="work-panel"
                aria-selected={workType === type}
                tabIndex={workType === type ? 0 : -1}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                onClick={() => selectWorkType(type)}
                className="work-tab font-editorial"
                data-testid={`tab-${type === 'Personal' ? 'personal' : 'realreal'}`}
                key={type}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${workTypes.indexOf(workType)}`} tabIndex={0} className="work-list editorial-project-list" aria-live="polite">
          <div key={workType} className="work-list-content">
          {workType === 'Personal' ? personalProjects.map((project, index) => {
            const number = String(index + 1).padStart(2, '0');
            return (
              <article className={`editorial-project personal-project${project.preview === 'recordings' || project.preview === 'video' ? ' has-video' : ''}`} key={project.slug} data-testid={`personal-project-${project.slug}`}>
                <div className="editorial-project-copy">
                  <div className="editorial-project-kicker font-mono-archive text-accent"><span className="text-[10px]">{number}</span></div>
                  <h3 className="font-editorial">{project.title}</h3>
                  <p className="editorial-project-description text-muted-foreground">{project.description}</p>
                  <div className="editorial-project-badges" aria-label={`${project.title} categories`}>
                    {project.badges.map((badge) => <span key={badge}>{badge}</span>)}
                  </div>
                </div>
                <figure className="editorial-project-visual personal-project-visual" data-project={project.slug}>
                  {project.preview === 'recordings' ? (
                    <div className="personal-recordings">{tryOnClips.map((clip) => <Recording key={clip.src} clip={clip} />)}</div>
                  ) : project.preview === 'video' ? (
                    <div className="personal-advent-preview">
                      <video
                        src={`${import.meta.env.BASE_URL}media/personal/ai-advent-calendar.mp4`}
                        poster={`${import.meta.env.BASE_URL}media/personal/ai-advent-calendar-poster.jpg?v=2`}
                        aria-label="AI Advent Calendar demo recording"
                        autoPlay
                        muted
                        loop
                        controls
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  ) : (
                    <div className="personal-unavailable">
                      <span className="personal-unavailable-number font-mono-archive">FIG. {number} / {project.title}</span>
                      <span className="personal-unavailable-title font-editorial">{project.title}</span>
                      <span className="personal-unavailable-status font-mono-archive">Prototype preview unavailable</span>
                    </div>
                  )}
                </figure>
              </article>
            );
          }) : homepageProjects.map((project) => {
            const projectIndex = homepageProjects.findIndex((item) => item.slug === project.slug);
            const projectNumber = String(projectIndex + 1).padStart(2, '0');
            const cardTitle = project.slug === 'curation' ? 'Curation Tool' : project.slug === 'attribute-enrichment' ? 'Metadata Enrichment' : project.slug === 'visual-search' ? 'Image Search' : project.slug === 'elevated-experience' ? 'Site Redesign' : project.title;
            const visual = projectVisuals[project.slug];
            if (!visual) throw new Error(`Missing homepage visual for ${project.slug}`);
            return (
              <Link
                href={`/work/${project.slug}`}
                key={project.slug}
                className={`editorial-project group${project.slug === 'curation' ? ' is-curation' : ''}${project.slug === 'ai-discovery' ? ' is-shopping-agent' : ''}${project.slug === 'similar-designers' ? ' is-similar-designers' : ''}${project.slug === 'visual-search' ? ' is-visual-search' : ''}${projectIndex % 2 === 1 && project.slug !== 'ai-discovery' ? ' is-reversed' : ''}${projectIndex % 3 === 2 && project.slug !== 'similar-designers' ? ' is-wide' : ''}`}
                data-testid={`link-project-${project.slug}`}
              >
                <div className="editorial-project-copy">
                  <div className="editorial-project-kicker font-mono-archive text-accent">
                    <span className="text-[10px]">{projectNumber}</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className="project-arrow" aria-hidden="true" />
                  </div>
                  <h3 className="font-editorial">{cardTitle}</h3>
                  <p className="editorial-project-description text-muted-foreground">{project.slug === 'curation' ? 'Making editorial taste scalable.' : project.slug === 'ai-discovery' ? 'Search, compare, and buy with natural language.' : project.slug === 'similar-designers' ? 'Helping shoppers discover their next favorite designer.' : project.slug === 'attribute-enrichment' ? 'Making 6M products discoverable by trend, vibe, and occasion.' : project.slug === 'visual-search' ? 'Turn inspiration into something you can shop.' : project.slug === 'elevated-experience' ? 'Elevating the shopping experience for improved discovery and conversion.' : project.description}</p>
                  <div className="editorial-project-badges" aria-label={`${cardTitle} categories`}>
                    {visual.badges.map((badge) => <span key={badge}>{badge}</span>)}
                  </div>
                </div>
                <figure className="editorial-project-visual" data-project={project.slug}>
                  <div className="editorial-project-artwork">
                    {project.slug === 'curation' || project.slug === 'ai-discovery' ? (
                      <video
                        src={visual.src}
                        poster={project.slug === 'curation' ? '/media/work/curation-vacation-shop-poster.jpg' : '/media/work/shopping-agent-poster.jpg'}
                        aria-label={visual.alt}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img src={visual.src} alt={visual.alt} loading={projectIndex < 2 ? 'eager' : 'lazy'} />
                    )}
                  </div>
                </figure>
              </Link>
            );
          })}
          </div>
        </div>

      </section>
    </div>
  );
}