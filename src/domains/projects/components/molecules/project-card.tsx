import { projectMessages } from '../../messages';
import type { Project, BannerStatus } from '../../projects.types';

const STATUS_CLASS: Record<BannerStatus, string> = {
  uploaded: 'project-card__status--pending',
  qc_pending: 'project-card__status--pending',
  qc_approved: 'project-card__status--approved',
  qc_rejected: 'project-card__status--rejected',
  needs_fix: 'project-card__status--warning',
  client_review: 'project-card__status--in-review',
  client_approved: 'project-card__status--client-approved',
  delivered: 'project-card__status--delivered'
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      {/* Top: status + version */}
      <div className="project-card__top">
        <span className={`project-card__status ${STATUS_CLASS[project.status]}`}>
          <span className="project-card__status-dot" aria-hidden="true" />
          {projectMessages.status[project.status]}
        </span>
        <span className="project-card__version">
          {projectMessages.card.version(project.latestVersion)}
        </span>
      </div>

      {/* Name */}
      <h3 className="project-card__name">{project.name}</h3>

      {/* Designer */}
      <p className="project-card__designer">{project.designer}</p>

      {/* Footer: brand | pieces + date */}
      <div className="project-card__footer">
        <span className="project-card__brand">{project.brand}</span>
        <div className="project-card__meta">
          <span className="project-card__pieces">
            {projectMessages.card.pieces(project.totalPieces)}
          </span>
          <span className="project-card__date">
            {projectMessages.card.date(project.updatedAt)}
          </span>
        </div>
      </div>
    </article>
  );
}
