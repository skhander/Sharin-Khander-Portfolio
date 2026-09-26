import { ArrowLeft } from 'lucide-react';
import { Link, useParams } from 'wouter';
import { AttributeEnrichmentStory } from '@/components/attribute-enrichment-story';
import { ElevatedExperienceStory } from '@/components/elevated-experience-story';
import { ShoppingAgentStory } from '@/components/shopping-agent-story';
import { SimilarDesignersStory } from '@/components/similar-designers-story';
import { ProjectCanvas, ProjectHero, ProjectMeta, ProjectNavigation, Section } from '@/components/project-content';
import { getProject, publishedProjects } from '@/lib/projects';
import { usePageMeta } from '@/lib/use-page-meta';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  usePageMeta(
    project ? `${project.title} — Sharin Khander` : 'Project not found — Sharin Khander',
    project ? `${project.title} at ${project.company}. ${project.description}` : 'This project could not be found.',
  );

  if (!project) {
    return (
      <section className="mx-auto max-w-[1440px] px-6 pb-32 pt-24 sm:px-10 lg:px-16">
        <Link href="/" className="inline-flex items-center gap-2 font-mono-archive text-[10px] uppercase tracking-[.15em] text-muted-foreground archive-link" data-testid="link-back-not-found"><ArrowLeft size={14} /> All work</Link>
        <h1 className="mt-12 font-editorial text-6xl">Project not found.</h1>
      </section>
    );
  }

  const index = publishedProjects.findIndex((item) => item.slug === project.slug);
  const nextProject = publishedProjects[(index + 1) % publishedProjects.length];
  if (project.slug === 'elevated-experience') {
    return <ElevatedExperienceStory project={project} nextProject={nextProject} />;
  }
  if (project.slug === 'attribute-enrichment') {
    return <AttributeEnrichmentStory project={project} nextProject={nextProject} />;
  }
  if (project.slug === 'ai-discovery') {
    return <ShoppingAgentStory project={project} nextProject={nextProject} />;
  }
  if (project.slug === 'similar-designers') {
    return <SimilarDesignersStory project={project} nextProject={nextProject} />;
  }
  const contentSections = project.sections?.filter((section) => section.body?.length || section.images?.length || section.beforeAfter || section.video || section.prototype || section.metrics?.length || section.decisions?.length) ?? [];

  return (
    <div className="page-reveal">
      <ProjectHero project={project} />
      {project.cover && (
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-12 sm:px-10 lg:px-16">
          <ProjectCanvas project={project} index={index} className="aspect-[1.6] md:aspect-[2.3]" />
        </div>
      )}
      <ProjectMeta project={project} />
      {contentSections.length > 0 && (
        <div className="mx-auto w-full max-w-[1440px] pt-12 md:pt-16">
          {contentSections.map((section, sectionIndex) => <Section key={section.heading} section={section} index={sectionIndex} />)}
        </div>
      )}
      <div className="h-16 md:h-24" aria-hidden="true" />
      <ProjectNavigation nextProject={nextProject} />
    </div>
  );
}