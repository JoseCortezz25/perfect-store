import Link from 'next/link';
import { Image as ImageIcon } from 'lucide-react';
import { projectMessages } from '../../messages';
import type { Project, BannerStatus } from '../../projects.types';

/* Per-status chip: label from messages.ts + color class from status-colors.md */
const STATUS_CHIP: Record<BannerStatus, { label: string; cls: string }> = {
  uploaded:          { label: projectMessages.status.uploaded,          cls: 'project-card__tag--pending' },
  'qc_pending':      { label: projectMessages.status['qc_pending'],     cls: 'project-card__tag--pending' },
  'qc_approved':     { label: projectMessages.status['qc_approved'],    cls: 'project-card__tag--approved' },
  'qc_rejected':     { label: projectMessages.status['qc_rejected'],    cls: 'project-card__tag--rejected' },
  'client_review':   { label: projectMessages.status['client_review'],  cls: 'project-card__tag--in-review' },
  'client_approved': { label: projectMessages.status['client_approved'],cls: 'project-card__tag--client-approved' },
  delivered:         { label: projectMessages.status.delivered,         cls: 'project-card__tag--delivered' },
  'needs_fix':       { label: projectMessages.status['needs_fix'],      cls: 'project-card__tag--warning' },
};

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const chip = STATUS_CHIP[project.status];

  return (
    <Link href={`/projects/${project.id}`} className="project-card">
      {/* Image preview area */}
      <div className="project-card__preview">
        <span className={`project-card__tag ${chip.cls}`}>{chip.label}</span>
        <div className="project-card__preview-icon" aria-hidden="true">
          <ImageIcon size={32} strokeWidth={1} />
        </div>
      </div>

      {/* Card body */}
      <div className="project-card__body">
        <div className="project-card__title-row">
          <h3 className="project-card__name">{project.name}</h3>
          <span className="project-card__version-badge">
            {projectMessages.card.version(project.latestVersion)}
          </span>
        </div>

        <p className="project-card__brand">{project.brand}</p>

        <div className="project-card__footer">
          <span className="project-card__designer">{project.designer}</span>
          <div className="project-card__footer-right">
            <span className="project-card__pieces">
              {projectMessages.card.pieces(project.totalPieces)}
            </span>
            <span className="project-card__sep" aria-hidden="true">·</span>
            <span className="project-card__date">
              {projectMessages.card.date(project.updatedAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
