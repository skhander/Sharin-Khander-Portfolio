import { useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';
import { Link } from 'wouter';
import './showroom-media.css';
import dreamCatcherJournal from '@assets/Dream_Catcher_journal_frame.png';
import dreamCatcherHome from '@assets/Dream_Catcher_home_aligned.png';
import { personalProjects, publishedProjects, type PersonalProject } from '@/lib/projects';

const workTypes = ['The RealReal', 'Personal'] as const;
export type WorkType = typeof workTypes[number];

const homepageProjectSlugs = [
  'ai-discovery',
  'curation',
  'similar-designers',
  'attribute-enrichment',
  'visual-search',
  'elevated-experience',
] as const;

const outcomes: Record<string, ReactNode> = {
  curation: 'Automated manual curation to build look books 3x faster.',
  'ai-discovery': 'Simplified product discovery to drive a 1% lift in conversion.',
  'similar-designers': 'Enabled deeper browsing and cut bounce rate by 6%.',
  'attribute-enrichment': 'Generated richer product descriptions with LLMs to lift search conversion by 5%.',
  'visual-search': 'Enabled product discovery with no guesswork and converted 2.5x higher than keyword search.',
  'elevated-experience': 'Elevated the buying experience to drive a 5% lift in revenue per visitor.',
};

const visuals: Record<string, { src: string; alt: string }> = {
  'elevated-experience': {
    src: '/media/browse-after.webp',
    alt: 'The RealReal luxury handbag browse interface',
  },
  'attribute-enrichment': {
    src: '/media/attribute-enrichment/chanel-top-product.webp',
    alt: 'Chanel vintage top used in the Catalog Enrichment project',
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
  if (slug === 'attribute-enrichment') return 'Catalog Enrichment';
  if (slug === 'visual-search') return 'Image Search';
  if (slug === 'elevated-experience') return 'Site Redesign';
  if (slug === 'similar-designers') return 'Similar Designer Recommendations';
  return title;
}

function Still({ src, alt, eager = false, width, height }: { src: string; alt: string; eager?: boolean; width?: number; height?: number }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : 'low'}
    />
  );
}

function Film({
  src,
  poster,
  alt,
  label,
  width,
  height,
}: {
  src: string;
  poster: string;
  alt: string;
  label: string;
  width: number;
  height: number;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const portrait = height > width;
  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) void video.play().catch(() => setPlaying(false));
    else video.pause();
  };
  return (
    <div className={portrait ? 'film film--portrait' : 'film film--landscape'}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        width={width}
        height={height}
        aria-label={alt}
        muted
        loop
        playsInline
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button type="button" onClick={(event) => { event.preventDefault(); event.stopPropagation(); toggle(); }} aria-label={playing ? `Pause ${label}` : `Play ${label}`}>
        {playing ? <Pause size={16} aria-hidden="true" /> : <Play size={16} aria-hidden="true" />}
      </button>
    </div>
  );
}

function PublishedFrame({ slug, thumb = false, eager = false }: { slug: string; thumb?: boolean; eager?: boolean }) {
  const visual = visuals[slug];
  if (!visual) return null;
  if (slug === 'curation' && !thumb) {
    return <Film src={visual.src} poster="/media/work/curation-vacation-shop-poster.jpg" alt={visual.alt} label="Curation Enablement prototype" width={1280} height={720} />;
  }
  if (slug === 'curation') return <Still src="/media/work/curation-vacation-shop-poster.jpg" alt={visual.alt} eager={eager} width={1280} height={720} />;
  if (slug === 'ai-discovery' && !thumb) {
    return <Film src={visual.src} poster="/media/work/shopping-agent-portrait-poster.jpg" alt={visual.alt} label="Shopping Agent prototype" width={310} height={674} />;
  }
  if (slug === 'ai-discovery') return <Still src="/media/work/shopping-agent-portrait-poster.jpg" alt={visual.alt} eager={eager} width={310} height={674} />;
  if (slug === 'visual-search' && !thumb) {
    return <Film src={visual.src} poster="/media/work/image-search-prototype-poster.jpg" alt={visual.alt} label="Image Search prototype" width={900} height={1764} />;
  }
  if (slug === 'visual-search') return <Still src="/media/work/image-search-prototype-poster.jpg" alt={visual.alt} eager={eager} width={900} height={1764} />;
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
  return (
    <div className="pair">
      <img src={dreamCatcherJournal} alt="Dream Catcher Journal screen with a list of illustrated dreams." loading={eager ? 'eager' : 'lazy'} decoding="async" />
      <img src={dreamCatcherHome} alt="Dream Catcher Home screen with a dream recording prompt and an interpretation." loading="lazy" decoding="async" />
    </div>
  );
}

type Entry = {
  key: string;
  title: string;
  outcome: ReactNode;
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
      href: project.slug === 'virtual-try-on' ? '/work/virtual-try-on' : undefined,
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

function TitleLink({ entry, children }: { entry: Entry; children: ReactNode }) {
  if (!entry.href) return <strong>{children}</strong>;
  if (entry.external) {
    return (
      <a className="title-link" href={entry.href} target="_blank" rel="noopener noreferrer">
        <strong>{children}</strong>
        <span className="sr-only"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className="title-link" href={entry.href}>
      <strong>{children}</strong>
    </Link>
  );
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
                <article className="rest-row">
                  <span className="thumb">{entry.frame(true)}</span>
                  <span>
                    <TitleLink entry={entry}>{entry.title}</TitleLink>
                    <em>{entry.outcome}</em>
                  </span>
                </article>
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
            <article className="tile" key={entry.key}>
              <span className="object">{entry.frame(false)}</span>
              <TitleLink entry={entry}>{entry.title}</TitleLink>
              <em>{entry.outcome}</em>
            </article>
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
          <article className="row" data-window={entry.title} key={entry.key}>
            <span className="object">{entry.frame(false, index === 0)}</span>
            <span className="copy">
              <TitleLink entry={entry}>{entry.title}</TitleLink>
              <em>{entry.outcome}</em>
            </span>
          </article>
        ))}
      </div>
    </div>
  );
}
