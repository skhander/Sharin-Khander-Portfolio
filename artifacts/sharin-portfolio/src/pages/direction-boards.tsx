import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { Link } from 'wouter';
import dreamCatcherJournal from '@assets/Dream_Catcher_journal_frame.png';
import dreamCatcherHome from '@assets/Dream_Catcher_home_aligned.png';
import { personalProjects, publishedProjects, type PersonalProject } from '@/lib/projects';

const workTypes = ['The RealReal', 'Personal'] as const;
export type WorkType = typeof workTypes[number];

const homepageProjectSlugs = [
  'curation',
  'ai-discovery',
  'similar-designers',
  'attribute-enrichment',
  'visual-search',
  'elevated-experience',
] as const;

const outcomes: Record<string, string> = {
  curation: 'Automated manual curation, doubling editorial output and increasing sell-through by 30%.',
  'ai-discovery': 'Easier product discovery with an AI agent that helps users search in their own words, compare products, and get styling advice, driving 14 million in GMV.',
  'similar-designers': '$30M in GMV. Bounce rate down 10%.',
  'attribute-enrichment': 'Labels on 6M+ products. We built a check for bad labels.',
  'visual-search': '$14M in GMV. Keyword searches per visitor down 10%.',
  'elevated-experience': '$60M in GMV. Add to cart up 10%.',
};

const visuals: Record<string, { src: string; alt: string }> = {
  'elevated-experience': {
    src: '/media/browse-after.webp',
    alt: 'The RealReal luxury handbag browse interface',
  },
  'attribute-enrichment': {
    src: '/media/attribute-enrichment/chanel-top-product.webp',
    alt: 'Chanel vintage top used in the Attribute Prediction project',
  },
  'ai-discovery': {
    src: '/media/work/shopping-agent-portrait.mp4',
    alt: 'Ask TRR shopping agent demo video',
  },
  'visual-search': {
    src: '/media/work/image-search-prototype.mp4',
    alt: 'Image Search prototype showing camera search and matching products',
  },
  'similar-designers': {
    src: '/media/work/similar-designers-network-refined.png',
    alt: 'Illustrative recommendation network: seed designer The Row produces Lemaire score 96, Studio Nicholson score 90, Toteme score 86, and Margaret Howell score 79',
  },
  curation: {
    src: '/media/work/curation-vacation-shop.mp4',
    alt: 'The RealReal Vacation Shop product browse video',
  },
};

function titleFor(slug: string, title: string) {
  if (slug === 'curation') return 'Curation Enablement';
  if (slug === 'attribute-enrichment') return 'Attribute Prediction';
  if (slug === 'visual-search') return 'Image Search';
  if (slug === 'elevated-experience') return 'Site Redesign';
  return title;
}

function Still({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  return <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'low'} />;
}

function SearchFilm({ src, alt }: { src: string; alt: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  };
  return (
    <div className="film">
      <video
        ref={videoRef}
        src={src}
        poster="/media/work/image-search-prototype-poster.jpg"
        aria-label={alt}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggle(); }} aria-label={playing ? 'Pause Image Search prototype' : 'Play Image Search prototype'}>
        {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}

function PublishedFrame({ slug, thumb = false, eager = false }: { slug: string; thumb?: boolean; eager?: boolean }) {
  const visual = visuals[slug];
  if (!visual) return null;
  if (slug === 'curation') return <Still src="/media/work/curation-vacation-shop-poster.jpg" alt={visual.alt} eager={eager} />;
  if (slug === 'ai-discovery') return <Still src="/media/work/shopping-agent-portrait-poster.jpg" alt={visual.alt} eager={eager} />;
  if (slug === 'visual-search' && !thumb) return <SearchFilm src={visual.src} alt={visual.alt} />;
  if (slug === 'visual-search') return <Still src="/media/work/image-search-prototype-poster.jpg" alt={visual.alt} eager={eager} />;
  if (slug === 'attribute-enrichment') {
    return (
      <div className="attrs">
        <img src={visual.src} alt={visual.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        <div aria-hidden="true">
          <p>Aesthetic</p>
          <p>Romantic, Classic, Feminine</p>
          <p>Occasion</p>
          <p>Evening wear, Date night, Party</p>
        </div>
      </div>
    );
  }
  if (slug === 'similar-designers') {
    return (
      <picture>
        <source media="(max-width: 767px)" srcSet="/media/work/similar-designers-network-mobile.svg" />
        <img src={visual.src} alt={visual.alt} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'low'} />
      </picture>
    );
  }
  return <Still src={visual.src} alt={visual.alt} eager={eager} />;
}

function PersonalFrame({ project, eager = false }: { project: PersonalProject; eager?: boolean }) {
  if (project.preview === 'recordings') {
    return <Still src="/media/personal/virtual-try-on-grid-poster.jpg?v=2" alt="Virtual Try-On browse grid" eager={eager} />;
  }
  if (project.preview === 'video') {
    return <Still src="/media/personal/ai-advent-calendar-poster.jpg?v=2" alt="AI Advent Calendar demo" eager={eager} />;
  }
  if (project.preview === 'mockup') {
    return (
      <div className="pair">
        <img src={dreamCatcherJournal} alt="Dream Catcher Journal screen with a list of illustrated dreams." loading={eager ? 'eager' : 'lazy'} decoding="async" />
        <img src={dreamCatcherHome} alt="Dream Catcher Home screen with a dream recording prompt and an interpretation." loading="lazy" decoding="async" />
      </div>
    );
  }
  return <p className="soon">Coming soon</p>;
}

type Entry = {
  key: string;
  title: string;
  outcome: string;
  href?: string;
  external?: boolean;
  frame: (thumb?: boolean, eager?: boolean) => ReactNode;
};

function entriesFor(workType: WorkType): Entry[] {
  if (workType === 'Personal') {
    return personalProjects.map((project) => ({
      key: project.slug,
      title: project.title,
      outcome: project.description,
      href: project.slug === 'virtual-try-on'
        ? '/work/virtual-try-on'
        : project.slug === 'ai-advent-calendar'
          ? 'https://ai-pm-advent-calendar.replit.app/'
          : undefined,
      external: project.slug === 'ai-advent-calendar',
      frame: (_thumb?: boolean, eager?: boolean) => <PersonalFrame project={project} eager={eager} />,
    }));
  }
  return homepageProjectSlugs.map((slug) => {
    const project = publishedProjects.find((item) => item.slug === slug);
    if (!project) return null;
    return {
      key: slug,
      title: titleFor(slug, project.title),
      outcome: outcomes[slug] ?? project.description,
      href: `/work/${slug}`,
      frame: (thumb?: boolean, eager?: boolean) => <PublishedFrame slug={slug} thumb={thumb} eager={eager} />,
    };
  }).filter((entry): entry is Entry => entry !== null);
}

function EntryLink({ entry, className, children }: { entry: Entry; className: string; children: ReactNode }) {
  if (!entry.href) return <article className={className}>{children}</article>;
  if (entry.external) {
    return (
      <a className={className} href={entry.href} target="_blank" rel="noopener noreferrer">
        {children}
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return <Link className={className} href={entry.href}>{children}</Link>;
}

function Switch({
  idPrefix,
  workType,
  onSelect,
  onKeyDown,
}: {
  idPrefix: string;
  workType: WorkType;
  onSelect: (next: WorkType) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number, idPrefix: string) => void;
}) {
  return (
    <div className="switch" role="tablist" aria-label="Work type">
      {workTypes.map((type, index) => (
        <button
          type="button"
          role="tab"
          id={`${idPrefix}-tab-${index}`}
          aria-controls={`${idPrefix}-panel`}
          aria-selected={workType === type}
          tabIndex={workType === type ? 0 : -1}
          onKeyDown={(event) => onKeyDown(event, index, idPrefix)}
          onClick={() => onSelect(type)}
          key={type}
        >
          {type}
        </button>
      ))}
    </div>
  );
}

function Impact() {
  return (
    <p className="impact">
      <strong>$180M</strong> sales
      <strong>40</strong> experiments
      <strong className="wins">36 wins</strong>
      <strong>7</strong> 0→1 builds
    </p>
  );
}

export function DirectionBoard({
  layout,
  workType,
  onSelect,
  onKeyDown,
}: {
  layout: 'showroom' | 'gallery' | 'office';
  workType: WorkType;
  onSelect: (next: WorkType) => void;
  onKeyDown: (event: KeyboardEvent<HTMLButtonElement>, index: number, idPrefix: string) => void;
}) {
  const entries = entriesFor(workType);
  const panelId = `${layout}-panel`;

  if (layout === 'gallery') {
    const [feature, ...rest] = entries;
    return (
      <div className="dir dir-gallery">
        {feature && (
          <div className="feature">
            <div className="object">{feature.frame(false, true)}</div>
            <div className="label">
              <h1>{feature.title}</h1>
              <p>{feature.outcome}</p>
              <p className="credit">Sharin Khander. I build <em>smarter ways to shop.</em></p>
              <Impact />
              <Switch idPrefix={layout} workType={workType} onSelect={onSelect} onKeyDown={onKeyDown} />
              {feature.href && (
                feature.external
                  ? <a className="open" href={feature.href} target="_blank" rel="noopener noreferrer">Open this work</a>
                  : <Link className="open" href={feature.href}>Open this work</Link>
              )}
            </div>
          </div>
        )}
        <div id={panelId} role="tabpanel" aria-labelledby={`${layout}-tab-${workType === 'Personal' ? 1 : 0}`}>
          <ul className="rest">
            {rest.map((entry) => (
              <li key={entry.key}>
                <EntryLink entry={entry} className="rest-row">
                  <span className="thumb">{entry.frame(true)}</span>
                  <span>
                    <strong>{entry.title}</strong>
                    <em>{entry.outcome}</em>
                  </span>
                </EntryLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (layout === 'office') {
    return (
      <div className="dir dir-office">
        <header className="top">
          <h1>Sharin Khander</h1>
          <p>I build <em>smarter ways to shop.</em></p>
        </header>
        <Impact />
        <Switch idPrefix={layout} workType={workType} onSelect={onSelect} onKeyDown={onKeyDown} />
        <div id={panelId} className="catalog" role="tabpanel" aria-labelledby={`${layout}-tab-${workType === 'Personal' ? 1 : 0}`}>
          {entries.map((entry) => (
            <EntryLink entry={entry} className="tile" key={entry.key}>
              <span className="object">{entry.frame(false)}</span>
              <strong>{entry.title}</strong>
              <em>{entry.outcome}</em>
            </EntryLink>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="dir dir-showroom">
      <header className="mast">
        <div>
          <h1>Sharin Khander</h1>
          <p className="line">I build <em>smarter ways to shop.</em></p>
        </div>
        <Switch idPrefix={layout} workType={workType} onSelect={onSelect} onKeyDown={onKeyDown} />
      </header>
      <div id={panelId} role="tabpanel" aria-labelledby={`${layout}-tab-${workType === 'Personal' ? 1 : 0}`}>
        {entries.map((entry, index) => (
          <EntryLink entry={entry} className="row" key={entry.key}>
            <span className="object">{entry.frame(false, index === 0)}</span>
            <span className="copy">
              <strong>{entry.title}</strong>
              <em>{entry.outcome}</em>
            </span>
          </EntryLink>
        ))}
      </div>
    </div>
  );
}
