import { cn } from '@/lib/utils';
import type { BannerStatus } from '../../projects.types';
import { projectMessages } from '../../messages';

const STATUS_CLASS: Record<BannerStatus, string> = {
  uploaded: 'status-badge--pending',
  qc_pending: 'status-badge--pending',
  qc_approved: 'status-badge--approved',
  qc_rejected: 'status-badge--rejected',
  needs_fix: 'status-badge--warning',
  client_review: 'status-badge--in-review',
  client_approved: 'status-badge--client-approved',
  delivered: 'status-badge--delivered'
};

interface StatusBadgeProps {
  status: BannerStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={cn('status-badge', STATUS_CLASS[status])}>
      {projectMessages.status[status]}
    </span>
  );
}
