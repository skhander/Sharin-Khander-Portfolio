import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'wouter';
import type { CaseSection, DecisionItem, MediaAsset, MetricItem, Project, PrototypeAsset, VideoAsset } from '@/lib/projects';

export function ProjectCanvas({ project, className = '' }: { project: Project; index: number; className?: string }) {
  if (!project.cover) return null;
  return (
    <figure className={`overflow-hidden ${className}`}>
      <img src={project.cover.src} alt={project.cover.alt} loading="lazy" className="h-full w-full object-cover" />
      {project.cover.caption && <figcaption className="mt-2 text-sm text-muted-foreground">{project.cover.caption}</figcaption>}
    </figure>
  );
}

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 pb-12 pt-10 sm:px-10 md:pb-16 md:pt-14 lg:px-16">
      <Link href="/" className="inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground archive-link" data-testid="link-back-archive"><ArrowLeft size={14} /> All work</Link>
      <div className="mt-14 grid grid-cols-1 gap-7 md:mt-20 md:grid-cols-[1.2fr_.8fr] md:items-end md:gap-12">
        <div>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.15em] text-accent">{project.company} <span className="mx-2 text-border">/</span> {project.category}</p>
          <h1 className="mt-6 max-w-3xl font-editorial text-[clamp(3.8rem,8vw,8rem)] leading-[.84] tracking-[-.05em]">{project.title}</h1>
        </div>
        <div className="max-w-md md:pb-2">
          <p className="text-lg leading-[1.4] text-muted-foreground sm:text-xl">{project.description}</p>
          {project.thesis && <p className="mt-6 border-l-2 border-accent pl-4 font-editorial text-xl italic leading-[1.15]">{project.thesis}</p>}
        </div>
      </div>
    </section>
  );
}

export function ProjectMeta({ project }: { project: Project }) {
  const entries = [
    { label: 'Role', value: project.role },
    { label: 'Team', value: project.team },
    { label: 'Scope', value: project.scope },
  ].filter((entry) => entry.value);

  return (
    <section className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16" aria-label="Project facts">
      {entries.length > 0 && <dl className="grid grid-cols-1 gap-x-8 gap-y-5 border-y border-border py-6 sm:grid-cols-3 md:gap-8">
        {entries.map((entry) => (
          <div key={entry.label}>
            <dt className="font-mono-archive text-[9px] uppercase tracking-[.15em] text-muted-foreground">{entry.label}</dt>
            <dd className="mt-2 max-w-[220px] text-sm leading-[1.4]">
              {Array.isArray(entry.value) ? (
                <ul className="space-y-1">
                  {entry.value.map((member) => (
                    <li key={member.name} className="flex justify-between gap-3">
                      <span>{member.name}</span>
                      <span className="shrink-0 text-muted-foreground">{member.role}</span>
                    </li>
                  ))}
                </ul>
              ) : entry.value}
            </dd>
          </div>
        ))}
      </dl>}
    </section>
  );
}

export function ImageGallery({ images }: { images: MediaAsset[] }) {
  if (!images.length) return null;
  return (
    <figure className={`mt-10 grid gap-3 ${images.length > 1 ? 'md:grid-cols-2' : ''}`}>
      {images.map((image) => (
        <div key={image.src}>
          <img src={image.src} alt={image.alt} loading="lazy" className="h-auto w-full bg-secondary object-cover" />
          {image.caption && <figcaption className="mt-3 font-mono-archive text-[9px] leading-[1.6] uppercase tracking-[.1em] text-muted-foreground">{image.caption}</figcaption>}
        </div>
      ))}
    </figure>
  );
}

export function BeforeAfter({ before, after }: { before: MediaAsset; after: MediaAsset }) {
  return (
    <div className="mt-10 grid gap-3 md:grid-cols-2">
      {[{ label: 'Before', asset: before }, { label: 'After', asset: after }].map(({ label, asset }) => (
        <figure key={label}>
          <span className="mb-3 block font-mono-archive text-[9px] uppercase tracking-[.15em] text-muted-foreground">{label}</span>
          <img src={asset.src} alt={asset.alt} loading="lazy" className="w-full bg-secondary object-cover" />
          {asset.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{asset.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
}

export function Video({ asset }: { asset: VideoAsset }) {
  return (
    <figure className="mt-10">
      <video controls preload="metadata" playsInline poster={asset.poster} className="w-full bg-secondary" aria-label={asset.caption ?? 'Project video'}>
        <source src={asset.src} />
        Your browser does not support this video.
      </video>
      {asset.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{asset.caption}</figcaption>}
    </figure>
  );
}

export function PrototypeEmbed({ asset }: { asset: PrototypeAsset }) {
  return (
    <figure className="mt-10">
      <iframe src={asset.src} title={asset.title} loading="lazy" allowFullScreen className="aspect-video w-full border border-border bg-secondary" />
      {asset.caption && <figcaption className="mt-3 text-sm text-muted-foreground">{asset.caption}</figcaption>}
    </figure>
  );
}

export function Metric({ item }: { item: MetricItem }) {
  return (
    <div className="border-t border-border pt-5">
      <p className="font-editorial text-5xl leading-none">{item.value}</p>
      <p className="mt-3 text-sm">{item.label}</p>
      {item.context && <p className="mt-1 text-sm text-muted-foreground">{item.context}</p>}
    </div>
  );
}

export function Decision({ item }: { item: DecisionItem }) {
  return (
    <div className="border-t border-border py-5">
      <h3 className="font-editorial text-2xl">{item.title}</h3>
      <p className="mt-2 max-w-xl text-base leading-[1.6] text-muted-foreground">{item.rationale}</p>
    </div>
  );
}

export function Section({ section, index }: { section: CaseSection; index: number }) {
  const hasContent = Boolean(section.body?.length || section.images?.length || section.beforeAfter || section.video || section.prototype || section.metrics?.length || section.decisions?.length);
  if (!hasContent) return null;
  return (
    <section className="mx-auto grid w-full max-w-[1440px] gap-5 border-t border-border px-6 py-12 sm:px-10 md:grid-cols-[.35fr_1fr] md:gap-16 md:py-16 lg:px-16" aria-labelledby={`section-${section.heading.toLowerCase()}`}>
      <div className="font-mono-archive text-[10px] uppercase tracking-[.16em] text-accent">{String(index + 1).padStart(2, '0')}</div>
      <div>
        <h2 id={`section-${section.heading.toLowerCase()}`} className="font-editorial text-[clamp(2.5rem,5vw,5rem)] leading-[.95] tracking-[-.035em]">{section.heading}</h2>
        {section.body?.map((paragraph) => <p key={paragraph} className="mt-5 max-w-2xl text-lg leading-[1.55] text-muted-foreground">{paragraph}</p>)}
        {section.images && <ImageGallery images={section.images} />}
        {section.beforeAfter && <BeforeAfter {...section.beforeAfter} />}
        {section.video && <Video asset={section.video} />}
        {section.prototype && <PrototypeEmbed asset={section.prototype} />}
        {section.metrics && <div className="mt-10 grid gap-8 sm:grid-cols-2">{section.metrics.map((item) => <Metric key={item.label} item={item} />)}</div>}
        {section.decisions && <div className="mt-10">{section.decisions.map((item) => <Decision key={item.title} item={item} />)}</div>}
      </div>
    </section>
  );
}

export function ProjectNavigation({ nextProject }: { nextProject: Project }) {
  return (
    <nav className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 border-t border-border px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16" aria-label="Project navigation">
      <p className="font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground">Next project</p>
      <Link href={`/work/${nextProject.slug}`} className="group inline-flex items-center gap-3 font-editorial text-3xl archive-link" data-testid="link-next-project">{nextProject.title} <ArrowUpRight size={18} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="mx-auto flex w-full max-w-[1440px] flex-col gap-2 border-t border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
      <p className="font-editorial text-xl leading-none">Sharin Khander</p>
      <p className="font-mono-archive text-[10px] uppercase tracking-[.12em] text-muted-foreground">Product work · {new Date().getFullYear()}</p>
    </footer>
  );
}