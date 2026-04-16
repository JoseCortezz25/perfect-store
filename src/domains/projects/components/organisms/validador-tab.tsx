'use client';

import { UploadZone } from '../molecules/upload-zone';
import { QcValidationPanel } from './qc-validation-panel';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import type { ProjectVersion } from '../../projects.types';

interface ValidadorTabProps {
  projectId: string;
  version: ProjectVersion | undefined;
}

export function ValidadorTab({ projectId, version }: ValidadorTabProps) {
  const { canUpload, canQcReview } = useCurrentUser();

  return (
    <div className="validador-right-panel">
      {canUpload && <UploadZone projectId={projectId} />}
      <QcValidationPanel
        result={version?.qcResult}
        isValidating={version?.status === 'validating'}
        versionLabel={version?.label}
        canQcReview={canQcReview}
      />
    </div>
  );
}
