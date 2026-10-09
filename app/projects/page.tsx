import Image from 'next/image';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import { promotedProjects } from '@/data/projects';

export const metadata = { title: 'Projects | RIGI Home & Garden Design', description: 'Explore verified residential and commercial projects by RIGI Home & Garden Design.' };

export default function ProjectsPage() {
  return (
    <main className="projectsIndex">
      <SiteHeader />
      <header className="projectsIndex__intro">
        <p className="eyebrow eyebrow--line" data-gold-line>PROJECT ARCHIVE</p>
        <h1>Selected Projects</h1>
        <p>Explore verified projects and their documented galleries, from existing conditions through construction and completion.</p>
      </header>
      <div className="projectsIndex__list">
        {promotedProjects.map((project, index) => (
          <article className="projectsIndex__item" key={project.id}>
            <Link className="projectsIndex__image" href={project.detailPath} aria-label={`Explore ${project.name}`}>
              <Image src={project.heroImage} alt={project.heroAlt} fill priority={index === 0} sizes="(max-width: 760px) 100vw, 70vw" />
            </Link>
            <div className="projectsIndex__copy">
              <p>{project.id} · {project.location} · {project.category}</p>
              <h2>{project.name}</h2>
              <span>{project.photoCount} photographs · Before · During · After</span>
              <Link href={project.detailPath}>Explore Project <span aria-hidden="true">→</span></Link>
            </div>
          </article>
        ))}
      </div>
      <SiteFooter />
    </main>
  );
}
