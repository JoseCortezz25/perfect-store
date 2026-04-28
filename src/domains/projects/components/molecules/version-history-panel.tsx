'use client';

import { Clock, CheckCircle, XCircle, Loader, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { projectMessages } from '../../messages';
import type { ProjectVersion, VersionStatus } from '../../projects.types';

const msgs = projectMessages.detail;

const STATUS_ICON: Record<VersionStatus, React.ReactNode> = {
  approved: <CheckCircle size={12} strokeWidth={2} />,
  rejected: <XCircle size={12} strokeWidth={2} />,
  validating: <Loader size={12} strokeWidth={2} />,
  pending: <Circle size={12} strokeWidth={2} />
};

const STATUS_CLASS: Record<VersionStatus, string> = {
  approved: 'version-item__status--approved',
  rejected: 'version-item__status--rejected',
  validating: 'version-item__status--validating',
  pending: 'version-item__status--pending'
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

interface VersionHistoryPanelProps {
  versions: ProjectVersion[];
  activeVersionId: string;
  onSelect: (id: string) => void;
}

export function VersionHistoryPanel({
  versions,
  activeVersionId,
  onSelect
}: VersionHistoryPanelProps) {
  if (versions.length === 0) {
    return (
      <div className="version-history">
        <h3 className="version-history__title">
          {msgs.validador.versionHistory.title}
        </h3>
        <p className="version-history__empty">
          {msgs.validador.versionHistory.noVersions}
        </p>
      </div>
    );
  }

  return (
    <div className="version-history">
      <h3 className="version-history__title">
        {msgs.validador.versionHistory.title}
      </h3>
      <div className="version-history__list">
        {versions.map(version => (
          <button
            key={version.id}
            type="button"
            className={cn(
              'version-item',
              activeVersionId === version.id && 'version-item--active'
            )}
            onClick={() => onSelect(version.id)}
          >
            {/* Version label + status */}
            <div className="version-item__top">
              <span className="version-item__label">{version.label}</span>
              <span
                className={cn(
                  'version-item__status',
                  STATUS_CLASS[version.status]
                )}
              >
                {STATUS_ICON[version.status]}
                {msgs.versionStatus[version.status]}
              </span>
            </div>

            {/* File name */}
            <p className="version-item__file">{version.zipFileName}</p>

            {/* Uploader + date */}
            <div className="version-item__meta">
              <span className="version-item__uploader">
                {msgs.validador.versionHistory.uploadedBy(version.uploadedBy)}
              </span>
              <span className="version-item__date">
                <Clock size={10} strokeWidth={1.5} aria-hidden="true" />
                {formatDate(version.uploadedAt)}
              </span>
            </div>

            {/* QC score preview */}
            {version.qcResult && (
              <div className="version-item__score">
                <span
                  className={cn(
                    'version-item__score-value',
                    `version-item__score-value--${version.qcResult.score >= 80 ? 'pass' : version.qcResult.score >= 50 ? 'warn' : 'fail'}`
                  )}
                >
                  {version.qcResult.score}
                </span>
                <span className="version-item__score-max">/ 100</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
