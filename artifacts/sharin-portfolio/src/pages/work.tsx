import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';
import { Link } from 'wouter';
import dreamCatcherJournal from '@assets/Dream_Catcher_journal_frame.png';
import dreamCatcherHome from '@assets/Dream_Catcher_home_aligned.png';
import { personalProjects, publishedProjects } from '@/lib/projects';
import { usePageMeta } from '@/lib/use-page-meta';
import './editorial-work.css';

const workTypes = ['The RealReal', 'Personal'] as const;
type WorkType = typeof workTypes[number];

const tryOnClips = [
  {
    label: 'Browse grid',
    src: `${import.meta.env.BASE_URL}media/personal/virtual-try-on-grid-web.mp4`,
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

function ImageSearchPrototype({ src, alt }: { src: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play().catch(() => setPlaying(false));
    } else {
      video.pause();
    }
  };

  return (
    <div className="image-search-prototype">
      <video
        ref={videoRef}
        src={src}
        poster={`${import.meta.env.BASE_URL}media/work/image-search-prototype-poster.jpg`}
        aria-label={alt}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="image-search-playback"
        onClick={togglePlayback}
        aria-label={playing ? 'Pause Image Search prototype' : 'Play Image Search prototype'}
      >
        {playing ? <Pause size={16} fill="currentColor" aria-hidden="true" /> : <Play size={16} fill="currentColor" aria-hidden="true" />}
      </button>
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
    note: 'Product interface',
    badges: ['Experiments'],
  },
  'attribute-enrichment': {
    src: '/media/attribute-enrichment/chanel-top-product.webp',
    alt: 'Chanel vintage top used in the Attribute Prediction project',
    note: 'Attribute prediction / source visual',
    badges: ['LLMs', '0→1'],
  },
  'ai-discovery': {
    src: `${import.meta.env.BASE_URL}media/work/shopping-agent-portrait.mp4`,
    alt: 'Ask TRR shopping agent demo video',
    badges: ['Agents', '0→1'],
  },
  'visual-search': {
    src: `${import.meta.env.BASE_URL}media/work/image-search-prototype.mp4`,
    alt: 'Image Search prototype showing camera search and matching products',
    badges: ['ML', '0→1'],
  },
  'similar-designers': {
    src: `${import.meta.env.BASE_URL}media/work/similar-designers-network-refined.png`,
    alt: 'Illustrative recommendation network: seed designer The Row produces Lemaire score 96, Studio Nicholson score 90, Toteme score 86, and Margaret Howell score 79',
    badges: ['ML', '0→1'],
  },
  curation: {
    src: '/media/work/curation-vacation-shop.mp4',
    alt: 'The RealReal Vacation Shop product browse video',
    badges: ['Agents', 'ML', '0→1'],
  },
};

export default function Work() {
  const [workType, setWorkType] = useState<WorkType>(workTypes[0]);
  usePageMeta('Work — Sharin Khander', 'Explore Sharin Khander’s product work across luxury marketplaces, shopping agents, image search, designer discovery, and personalization.');

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
          <p className="work-hero-role font-editorial" data-testid="text-work-tagline">I build easier ways<br />{' '}to shop<span className="text-accent">.</span></p>
          <div className="work-proof" aria-label="2026 impact metrics">
            <span className="site-eyebrow work-proof-heading font-mono-archive">2026 impact</span>
            <div className="work-proof-grid">
              <div className="work-proof-item">
                <strong className="work-proof-number font-editorial" data-testid="text-gmv-impact">$180m</strong>
                <span className="work-proof-label">GMV</span>
              </div>
              <div className="work-proof-item">
                <strong className="work-proof-number font-editorial" data-testid="text-experiments-count">40</strong>
                <span className="work-proof-label">Experiments</span>
                <span className="work-proof-note">36 wins</span>
              </div>
              <div className="work-proof-item">
                <strong className="work-proof-number font-editorial" data-testid="text-products-count">7</strong>
                <span className="work-proof-label">0→1 builds</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="selected-work" className="mx-auto w-full max-w-[1440px] px-6 pb-20 sm:px-10 md:pb-28 lg:px-[5%]" aria-labelledby="work-heading">
        <div className="work-band">
          <h2 id="work-heading" className="font-editorial text-[clamp(2.3rem,4vw,3.8rem)] leading-none tracking-[-.035em]">Things I've built</h2>
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
            const copy = (
              <>
                <div className="site-eyebrow editorial-project-kicker font-mono-archive text-accent">
                  <span>{number}</span>
                  {(project.slug === 'virtual-try-on' || project.slug === 'ai-advent-calendar') && <ArrowUpRight size={16} strokeWidth={1.5} className="project-arrow" aria-hidden="true" />}
                </div>
                <h3 className="font-editorial">{project.title}</h3>
                <p className="editorial-project-description text-muted-foreground">{project.description}</p>
                {project.badges.length > 0 && (
                  <div className="editorial-project-badges" aria-label={`${project.title} categories`}>
                    {project.badges.map((badge) => <span key={badge}>{badge}</span>)}
                  </div>
                )}
              </>
            );
            return (
              <article className={`editorial-project personal-project${project.preview === 'recordings' || project.preview === 'video' ? ' has-video' : ''}`} key={project.slug} data-testid={`personal-project-${project.slug}`}>
                {project.slug === 'virtual-try-on' ? (
                  <Link href="/work/virtual-try-on" className="editorial-project-copy personal-project-link" data-testid="link-project-virtual-try-on">
                    {copy}
                  </Link>
                ) : project.slug === 'ai-advent-calendar' ? (
                  <a href="https://ai-pm-advent-calendar.replit.app/" target="_blank" rel="noopener noreferrer" className="editorial-project-copy personal-project-link" data-testid="link-project-ai-advent-calendar">
                    {copy}
                  </a>
                ) : (
                  <div className="editorial-project-copy">{copy}</div>
                )}
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
                  ) : project.preview === 'mockup' ? (
                    <div className="personal-dream-preview">
                      <img
                        src={dreamCatcherJournal}
                        alt="Dream Catcher Journal screen with a list of illustrated dreams."
                        loading="lazy"
                      />
                      <img
                        src={dreamCatcherHome}
                        alt="Dream Catcher Home screen with a dream recording prompt and an interpretation."
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div className="personal-coming-soon">
                      <span className="font-editorial">Coming Soon</span>
                    </div>
                  )}
                </figure>
              </article>
            );
          }) : homepageProjects.map((project) => {
            const projectIndex = homepageProjects.findIndex((item) => item.slug === project.slug);
            const projectNumber = String(projectIndex + 1).padStart(2, '0');
            const cardTitle = project.slug === 'curation' ? 'Curation Tool' : project.slug === 'attribute-enrichment' ? 'Attribute Prediction' : project.slug === 'visual-search' ? 'Image Search' : project.slug === 'elevated-experience' ? 'Site Redesign' : project.title;
            const visual = projectVisuals[project.slug];
            if (!visual) throw new Error(`Missing homepage visual for ${project.slug}`);
            const cardClassName = `editorial-project group${project.slug === 'curation' ? ' is-curation' : ''}${project.slug === 'ai-discovery' ? ' is-shopping-agent' : ''}${project.slug === 'similar-designers' ? ' is-similar-designers' : ''}${project.slug === 'visual-search' ? ' is-visual-search' : ''}${projectIndex % 2 === 1 && project.slug !== 'ai-discovery' ? ' is-reversed' : ''}${projectIndex % 3 === 2 && project.slug !== 'similar-designers' ? ' is-wide' : ''}`;
            const cardContent = (
              <>
                <div className="editorial-project-copy">
                  <div className="site-eyebrow editorial-project-kicker font-mono-archive text-accent">
                    <span>{projectNumber}</span>
                    <ArrowUpRight size={16} strokeWidth={1.5} className="project-arrow" aria-hidden="true" />
                  </div>
                  <h3 className="font-editorial">{cardTitle}</h3>
                   <p className="editorial-project-description text-muted-foreground">{project.slug === 'curation' ? 'Build assortments in minutes.' : project.slug === 'ai-discovery' ? 'Search in your own words.' : project.slug === 'similar-designers' ? 'Discover your next favorite designer.' : project.slug === 'attribute-enrichment' ? 'Power search with trend, occasion, and vibe labels' : project.slug === 'visual-search' ? 'Shop your social media or IRL inspiration.' : project.slug === 'elevated-experience' ? 'A more elevated way to browse and shop.' : project.description}</p>
                  <div className="editorial-project-badges" aria-label={`${cardTitle} categories`}>
                    {visual.badges.map((badge) => <span key={badge}>{badge}</span>)}
                  </div>
                </div>
                <figure className="editorial-project-visual" data-project={project.slug}>
                  <div className="editorial-project-artwork">
                    {project.slug === 'ai-discovery' ? (
                      <div className="shopping-agent-phone">
                        <div className="shopping-agent-phone-screen">
                          <video
                            src={visual.src}
                            poster={`${import.meta.env.BASE_URL}media/work/shopping-agent-portrait-poster.jpg`}
                            aria-label={visual.alt}
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                          />
                        </div>
                      </div>
                    ) : project.slug === 'curation' ? (
                      <video
                        src={visual.src}
                        poster="/media/work/curation-vacation-shop-poster.jpg"
                        aria-label={visual.alt}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : project.slug === 'similar-designers' ? (
                      <picture>
                        <source media="(max-width: 767px)" srcSet="/media/work/similar-designers-network-mobile.svg" />
                        <img src={visual.src} alt={visual.alt} loading="lazy" />
                      </picture>
                    ) : project.slug === 'attribute-enrichment' ? (
                      <div className="metadata-enrichment-preview">
                        <div className="metadata-seed">
                          <p className="metadata-preview-label">Photo</p>
                          <div className="metadata-seed-frame">
                            <img src={visual.src} alt={visual.alt} loading="lazy" />
                          </div>
                        </div>
                        <div className="metadata-model">
                          <span>Gemini 3.1 Flash</span>
                        </div>
                        <div className="metadata-output">
                          <p className="metadata-preview-label">Output</p>
                          <dl className="metadata-enrichment-attributes" aria-label="Predicted attributes">
                            <div className="metadata-attribute-group">
                              <dt>Aesthetic</dt>
                              <dd className="metadata-attribute-tags">
                                {['Romantic', 'Classic', 'Feminine'].map((tag) => <span key={tag}>{tag}</span>)}
                              </dd>
                            </div>
                            <div className="metadata-attribute-group">
                              <dt>Occasion</dt>
                              <dd className="metadata-attribute-tags">
                                {['Evening wear', 'Date night', 'Party'].map((tag) => <span key={tag}>{tag}</span>)}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>
                    ) : project.slug === 'visual-search' ? (
                      <ImageSearchPrototype src={visual.src} alt={visual.alt} />
                    ) : (
                      <img src={visual.src} alt={visual.alt} loading={projectIndex < 2 ? 'eager' : 'lazy'} />
                    )}
                  </div>
                </figure>
              </>
            );
            return project.slug === 'visual-search' ? (
              <article key={project.slug} className={cardClassName}>
                <Link
                  href={`/work/${project.slug}`}
                  className="editorial-project-cover-link"
                  data-testid={`link-project-${project.slug}`}
                  aria-label={`View ${cardTitle} project`}
                />
                {cardContent}
              </article>
            ) : (
              <Link
                href={`/work/${project.slug}`}
                key={project.slug}
                className={cardClassName}
                data-testid={`link-project-${project.slug}`}
              >
                {cardContent}
              </Link>
            );
          })}
          </div>
        </div>

      </section>
    </div>
  );
}