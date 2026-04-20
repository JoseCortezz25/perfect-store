'use client';

import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import { QcScoreRing } from '../atoms/qc-score-ring';
import { QcCheckGroup } from '../molecules/qc-check-group';
import { projectMessages } from '../../messages';
import type { QcResult } from '../../projects.types';

const msgs = projectMessages.detail.validador.qcPanel;

interface QcValidationPanelProps {
  result: QcResult | undefined;
  isValidating?: boolean;
  versionLabel?: string;
  canQcReview?: boolean;
}

export function QcValidationPanel({
  result,
  isValidating,
  versionLabel,
  canQcReview = false
}: QcValidationPanelProps) {
  const [qcDecision, setQcDecision] = useState<'approved' | 'rejected' | null>(
    null
  );

  if (isValidating) {
    return (
      <div className="qc-panel">
        <div className="qc-panel__validating">
          <div className="qc-panel__spinner" aria-label={msgs.validating} />
          <p className="qc-panel__validating-text">{msgs.validating}</p>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="qc-panel">
        <div className="qc-panel__empty">
          <p className="qc-panel__empty-text">{msgs.noResult}</p>
        </div>
      </div>
    );
  }

  const passCount = result.groups
    .flatMap(g => g.items)
    .filter(i => i.status === 'pass').length;
  const failCount = result.groups
    .flatMap(g => g.items)
    .filter(i => i.status === 'fail').length;
  const warnCount = result.groups
    .flatMap(g => g.items)
    .filter(i => i.status === 'warning').length;

  return (
    <div className="qc-panel">
      <h2 className="qc-panel__title">{msgs.title}</h2>

      {/* Score area */}
      <div className="qc-panel__score-area">
        <QcScoreRing score={result.score} />
        <div className="qc-panel__score-stats">
          <div className="qc-panel__stat qc-panel__stat--pass">
            <span className="qc-panel__stat-value">{passCount}</span>
            <span className="qc-panel__stat-label">{msgs.passCount()}</span>
          </div>
          {failCount > 0 && (
            <div className="qc-panel__stat qc-panel__stat--fail">
              <span className="qc-panel__stat-value">{failCount}</span>
              <span className="qc-panel__stat-label">{msgs.failCount()}</span>
            </div>
          )}
          {warnCount > 0 && (
            <div className="qc-panel__stat qc-panel__stat--warn">
              <span className="qc-panel__stat-value">{warnCount}</span>
              <span className="qc-panel__stat-label">
                {msgs.warningCount()}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Check groups */}
      <div className="qc-panel__groups">
        {result.groups.map((group, index) => (
          <QcCheckGroup
            key={group.id}
            group={group}
            defaultOpen={index === 0}
          />
        ))}
      </div>

      {/* QC decision area — only for QC and Admin roles */}
      {canQcReview && (
        <div className="qc-panel__decision">
          {qcDecision ? (
            <div
              className={`qc-panel__decision-feedback qc-panel__decision-feedback--${qcDecision}`}
            >
              {qcDecision === 'approved'
                ? `✓ Versión ${versionLabel ?? ''} aprobada`
                : `✗ Versión ${versionLabel ?? ''} rechazada`}
              <button
                type="button"
                className="qc-panel__decision-undo"
                onClick={() => setQcDecision(null)}
              >
                Deshacer
              </button>
            </div>
          ) : (
            <>
              <p className="qc-panel__decision-label">Decisión QC</p>
              <div className="qc-panel__decision-actions">
                <button
                  type="button"
                  className="btn btn--secondary qc-panel__decision-btn"
                  onClick={() => setQcDecision('rejected')}
                >
                  <XCircle size={15} strokeWidth={1.5} aria-hidden="true" />
                  Rechazar versión
                </button>
                <button
                  type="button"
                  className="btn btn--primary qc-panel__decision-btn"
                  onClick={() => setQcDecision('approved')}
                >
                  <CheckCircle size={15} strokeWidth={1.5} aria-hidden="true" />
                  Aprobar versión
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
