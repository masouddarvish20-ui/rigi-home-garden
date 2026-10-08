import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProjectGallery from '@/components/ProjectGallery';
import { findProject, promotedProjects } from '@/data/projects';
import { getProjectGallery } from '@/lib/projectAssets';
import RevealHeading from '@/components/RevealHeading';

type ProjectPageProps = { params: Promise<{ country: string; slug: string }> };

export function generateStaticParams() {
  return promotedProjects.map((project) => ({ country: project.countrySlug, slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { country, slug } = await params;
  const project = findProject(country, slug);
  if (!project || project.needsVerification || !project.promoted) return {};
  return { title: `${project.name} | RIGI`, description: project.description };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { country, slug } = await params;
  const project = findProject(country, slug);
  if (!project || project.needsVerification || !project.promoted) notFound();
  const phases = getProjectGallery(project);

  return (
    <main className="projectPage" id="projects">
      <nav className="projectPageNav" aria-label="Project navigation">
        <Link href="/#projects" data-cursor="link">← All Projects</Link><Link className="projectPageNav__brand" href="/" data-cursor="link">RIGI</Link><Link href="/#contact" data-cursor="start" data-magnetic>Start a Project</Link>
      </nav>
      <header className="projectPageHero" style={{ position: 'relative' }}>
        <Image src={project.heroImage} alt={project.heroAlt} fill priority sizes="100vw" /><div className="projectPageHero__shade" />
        <div className="projectPageHero__copy"><p>{project.id} · {project.location}</p><RevealHeading as="h1" text={project.name} depth /><span>{project.category}</span></div>
        <a className="projectPageHero__scroll" href="#project-overview">View the process ↓</a>
      </header>
      <section className="projectOverview" id="project-overview">
        <p className="eyebrow eyebrow--line" data-gold-line>PROJECT OVERVIEW</p><RevealHeading text={project.description} />
        <div className="projectOverview__facts">
          <span><small>Location</small>{project.location}</span><span><small>Project type</small>{project.type}</span>
          <span><small>Archive</small>{project.photoCount} photographs</span><span><small>Documented</small>Before · During · After</span>
        </div>
      </section>
      <ProjectGallery phases={phases} projectName={project.name} />
      <footer className="projectPageFooter">
        <p>Have a project in mind?</p><Link href="/#contact" data-cursor="start" data-magnetic>Start Your Project <span className="linkArrow" aria-hidden="true">→</span></Link>
        <Link className="projectPageFooter__back" href="/#projects">Back to all projects</Link>
      </footer>
    </main>
  );
}
