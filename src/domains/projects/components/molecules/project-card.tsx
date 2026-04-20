import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';
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
        <div className="project-card__preview-icon" aria-hidden="true">
          <ImageIcon size={32} strokeWidth={1} />
        </div>
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
