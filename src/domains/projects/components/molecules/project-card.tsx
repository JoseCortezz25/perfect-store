import Link from 'next/link';
import { projectMessages } from '../../messages';
import type { Project } from '../../projects.types';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="project-card">
      {/* Image preview area */}
      <div className="project-card__preview">
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.name}
            className="project-card__preview-img"
          />
        ) : (
          <img
            src="/Images/Placceholder-Image.png"
            alt=""
            className="project-card__preview-img"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Card body */}
      <div className="project-card__body">
        <h3 className="project-card__name">{project.name}</h3>
        <p className="project-card__brand">{project.brand}</p>

        <div className="project-card__footer">
          <span className="project-card__images">
            {projectMessages.card.images(project.totalImages)}
          </span>
          <span className="project-card__date">
            {projectMessages.card.date(project.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
