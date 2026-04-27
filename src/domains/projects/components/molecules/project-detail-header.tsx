'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  ArrowLeft,
  Share2,
  ChevronDown,
  CheckCircle,
  XCircle,
  Clock,
  Circle,
  Check
} from 'lucide-react';
import { StatusBadge } from '../atoms/status-badge';
import { projectMessages } from '../../messages';
import type {
  ProjectDetail,
  ProjectVersion,
  VersionStatus
} from '../../projects.types';

const msgs = projectMessages.detail;

const VERSION_STATUS_ICON: Record<VersionStatus, React.ReactNode> = {
  approved: <CheckCircle size={11} strokeWidth={2} />,
  rejected: <XCircle size={11} strokeWidth={2} />,
  validating: <Clock size={11} strokeWidth={1.5} />,
  pending: <Circle size={11} strokeWidth={1.5} />
};

const VERSION_STATUS_CLS: Record<VersionStatus, string> = {
  approved: 'detail-version-status--approved',
  rejected: 'detail-version-status--rejected',
  validating: 'detail-version-status--validating',
  pending: 'detail-version-status--pending'
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

interface ProjectDetailHeaderProps {
  project: ProjectDetail;
  versions: ProjectVersion[];
  selectedVersionId: string;
  onVersionChange: (id: string) => void;
  onStageLink: () => void;
}

export function ProjectDetailHeader({
  project,
  versions,
  selectedVersionId,
  onVersionChange,
  onStageLink
}: ProjectDetailHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const current = versions.find(v => v.id === selectedVersionId) ?? versions[0];

  return (
    <div className="detail-header">
      <Link href="/" className="detail-back-btn">
        <ArrowLeft size={16} strokeWidth={2} aria-hidden="true" />
        <span>{msgs.backButton}</span>
      </Link>

      <div className="detail-header__row">
        <div className="detail-header__title-area">
          <h1 className="detail-header__title">{project.name}</h1>
          <div className="detail-header__meta">
            <StatusBadge status={project.status} />

            {/* Version selector */}
            {versions.length > 0 && current && (
              <div className="detail-version-selector" ref={ref}>
                <button
                  type="button"
                  className="detail-version-trigger"
                  onClick={() => setIsOpen(o => !o)}
                  aria-expanded={isOpen}
                >
                  <span
                    className={cn(
                      'detail-version-status',
                      VERSION_STATUS_CLS[current.status]
                    )}
                  >
                    {VERSION_STATUS_ICON[current.status]}
                  </span>
                  <span>{current.label}</span>
                  <ChevronDown
                    size={11}
                    strokeWidth={1.5}
                    className={cn(
                      'detail-version-chevron',
                      isOpen && 'detail-version-chevron--open'
                    )}
                    aria-hidden="true"
                  />
                </button>

                {isOpen && (
                  <div className="detail-version-dropdown">
                    {versions.map(v => (
                      <button
                        key={v.id}
                        type="button"
                        className={cn(
                          'detail-version-item',
                          v.id === selectedVersionId &&
                            'detail-version-item--active'
                        )}
                        onClick={() => {
                          onVersionChange(v.id);
                          setIsOpen(false);
                        }}
                      >
                        <span
                          className={cn(
                            'detail-version-status',
                            VERSION_STATUS_CLS[v.status]
                          )}
                        >
                          {VERSION_STATUS_ICON[v.status]}
                        </span>
                        <div className="detail-version-item__info">
                          <span className="detail-version-item__label">
                            {v.label}
                          </span>
                          <span className="detail-version-item__date">
                            {formatDate(v.uploadedAt)}
                          </span>
                        </div>
                        {v.id === selectedVersionId && (
                          <Check
                            size={11}
                            strokeWidth={2.5}
                            className="detail-version-item__check"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <span className="detail-header__designer">{project.designer}</span>
            <span className="detail-header__brand">{project.brand}</span>
          </div>
        </div>

        {project.stageUrl && (
          <button
            type="button"
            className="btn btn--secondary detail-header__stage-btn"
            onClick={onStageLink}
          >
            <Share2 size={13} strokeWidth={1.5} aria-hidden="true" />
            <span>{msgs.stageLinkButton}</span>
          </button>
        )}
      </div>
    </div>
  );
}
