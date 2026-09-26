import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronDown } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { getProject, projects } from '@/lib/projects';

function AssetPlaceholder({ projectTitle }: { projectTitle: string }) {
  return (
    <div className="relative flex aspect-[16/9] w-full flex-col justify-between overflow-hidden border border-border bg-secondary p-5 sm:p-8" aria-label={`Image-ready state for ${projectTitle}`}>
      <div className="flex items-center justify-between font-mono-archive text-[9px] uppercase tracking-[.16em] text-muted-foreground">
        <span>Work asset</span><span>01 / 01</span>
      </div>
      <div className="relative">
        <span className="absolute -left-1 top-1/2 h-px w-16 bg-accent" />
        <p className="pl-24 font-editorial text-[clamp(2rem,5vw,5.5rem)] leading-[.9] tracking-[-.04em] text-foreground/70">Image<br /><em>to come.</em></p>
      </div>
      <p className="max-w-[270px] font-mono-archive text-[9px] uppercase leading-[1.6] tracking-[.12em] text-muted-foreground">No project screenshots have been supplied for this archive.</p>
    </div>
  );
}

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);
  const [openSection, setOpenSection] = useState<string | null>(null);

  useEffect(() => {
    document.title = project ? `${project.title} — Sharin Khander` : 'Project not found — Sharin Khander';
    return () => { document.title = 'Sharin Khander — Product archive'; };
  }, [project]);

  if (!project) {
    return (
      <section className="mx-auto max-w-[1440px] px-6 pb-32 pt-24 sm:px-10 lg:px-16">
        <Link href="/" className="inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground archive-link" data-testid="link-back-not-found"><ArrowLeft size={14} /> Back to archive</Link>
        <h1 className="mt-20 font-editorial text-7xl">This page is not filed.</h1>
      </section>
    );
  }

  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length];

  return (
    <div className="page-reveal">
      <section className="mx-auto w-full max-w-[1440px] px-6 pb-16 pt-12 sm:px-10 md:pb-28 md:pt-20 lg:px-16">
        <Link href="/" className="inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground archive-link" data-testid="link-back-archive"><ArrowLeft size={14} /> Back to archive</Link>
        <div className="mt-20 grid grid-cols-1 gap-14 md:grid-cols-[1fr_1fr] md:items-end md:gap-16">
          <div>
            <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">{project.company} / {project.category}</p>
            <h1 className="mt-8 max-w-2xl font-editorial text-[clamp(4rem,9vw,9rem)] leading-[.79] tracking-[-.055em]">{project.title}</h1>
          </div>
          <div className="max-w-md md:pb-2">
            <p className="text-xl leading-[1.35] text-muted-foreground">{project.description}</p>
            {project.thesis && <p className="mt-8 border-l border-accent pl-5 font-editorial text-2xl leading-[1.05]">“{project.thesis}”</p>}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-6 sm:px-10 lg:px-16">
        <AssetPlaceholder projectTitle={project.title} />
      </section>

      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 gap-12 px-6 py-20 sm:px-10 md:grid-cols-[.8fr_1.2fr] md:gap-20 md:py-32 lg:px-16">
        <aside>
          <p className="font-mono-archive text-[10px] uppercase tracking-[.18em] text-accent">Project notes</p>
          <dl className="mt-8 space-y-5 text-sm">
            {project.role && <div><dt className="font-mono-archive text-[9px] uppercase tracking-[.13em] text-muted-foreground">Role</dt><dd className="mt-1">{project.role}</dd></div>}
            {project.team && <div><dt className="font-mono-archive text-[9px] uppercase tracking-[.13em] text-muted-foreground">Team</dt><dd className="mt-1">{project.team}</dd></div>}
            {project.scope && <div><dt className="font-mono-archive text-[9px] uppercase tracking-[.13em] text-muted-foreground">Scope</dt><dd className="mt-1">{project.scope}</dd></div>}
          </dl>
        </aside>
        <div>
          <div className="border-t border-border">
            {project.sections.map((section) => (
              <div key={section} className="border-b border-border">
                <button type="button" onClick={() => setOpenSection(openSection === section ? null : section)} className="flex w-full items-center justify-between py-5 text-left" aria-expanded={openSection === section} data-testid={`button-section-${section.toLowerCase()}`}>
                  <span className="font-editorial text-3xl">{section}</span>
                  <ChevronDown size={18} strokeWidth={1.2} className={`text-muted-foreground transition-transform ${openSection === section ? 'rotate-180' : ''}`} />
                </button>
                {openSection === section && (
                  <div className="pb-7 pr-8">
                    <p className="max-w-lg text-sm leading-[1.6] text-muted-foreground">This section is reserved for the case study detail. No additional research, results, metrics, outcomes, or screenshots have been supplied for this archive.</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <p className="mt-8 font-mono-archive text-[9px] uppercase leading-[1.6] tracking-[.12em] text-muted-foreground">Case study framework · detail will be added as the archive grows</p>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-[1440px] flex-col gap-6 border-t border-border px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-16">
        <p className="font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground">Next in the archive</p>
        <Link href={`/work/${nextProject.slug}`} className="group inline-flex items-center gap-3 font-editorial text-3xl archive-link" data-testid="link-next-project">{nextProject.title} <ArrowUpRight size={18} strokeWidth={1.2} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
      </section>
    </div>
  );
}