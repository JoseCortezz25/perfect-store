'use client';

import { useState, useEffect, useRef } from 'react';
import { ProjectDetailHeader } from '../molecules/project-detail-header';
import { FolderListPanel } from '../molecules/folder-list-panel';
import { PieceListPanel } from '../molecules/piece-list-panel';
import { StageLinkModal } from '../molecules/stage-link-modal';
import { ValidadorTab } from './validador-tab';
import { PreviewTab } from './preview-tab';
import { projectMessages } from '../../messages';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import type { ProjectDetail } from '../../projects.types';

const msgs = projectMessages.detail;

type DetailTab = 'validador' | 'preview';

interface ProjectDetailShellProps {
  project: ProjectDetail;
}

export function ProjectDetailShell({ project }: ProjectDetailShellProps) {
  const { canSeeValidador, canQcReview } = useCurrentUser();

  /* ── Version state ── */
  const [selectedVersionId, setSelectedVersionId] = useState<string>(
    project.versions[0]?.id ?? ''
  );

  /* ── Folder state — initialise to first folder of first version ── */
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    () => project.versions[0]?.folders[0]?.id ?? null
  );

  /* ── Piece state ── */
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);

  /* ── QC multi-select ── */
  const [checkedPieceIds, setCheckedPieceIds] = useState<Set<string>>(
    new Set()
  );

  /* ── QC decisions ── */
  const [pieceDecisions, setPieceDecisions] = useState<
    Map<string, 'approved' | 'rejected'>
  >(new Map());

  function handleToggleCheck(id: string) {
    setCheckedPieceIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleSelectAll() {
    setCheckedPieceIds(new Set(pieces.map(p => p.id)));
  }

  function handleClearAll() {
    setCheckedPieceIds(new Set());
  }

  function handleApprove(ids: string[]) {
    setPieceDecisions(prev => {
      const next = new Map(prev);
      ids.forEach(id => next.set(id, 'approved'));
      return next;
    });
    setCheckedPieceIds(new Set());
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleReject(ids: string[], _comment: string) {
    setPieceDecisions(prev => {
      const next = new Map(prev);
      ids.forEach(id => next.set(id, 'rejected'));
      return next;
    });
    setCheckedPieceIds(new Set());
  }

  /* ── Tab state ── */
  const [activeTab, setActiveTab] = useState<DetailTab>(
    canSeeValidador ? 'validador' : 'preview'
  );

  const [isStageLinkOpen, setIsStageLinkOpen] = useState(false);
  const [isFolderOpen, setIsFolderOpen] = useState(true);
  const isFirstRender = useRef(true);

  /* When version changes, reset folder + piece + decisions (skip on mount) */
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const version = project.versions.find(v => v.id === selectedVersionId);
    setSelectedFolderId(version?.folders[0]?.id ?? null);
    setSelectedPieceId(null);
    setPieceDecisions(new Map());
  }, [selectedVersionId, project.versions]);

  /* When folder changes, reset piece + checked */
  useEffect(() => {
    setSelectedPieceId(null);
    setCheckedPieceIds(new Set());
  }, [selectedFolderId]);

  /* Redirect cliente to preview */
  useEffect(() => {
    if (!canSeeValidador) setActiveTab('preview');
  }, [canSeeValidador]);

  /* ── Derived ── */
  const selectedVersion = project.versions.find(
    v => v.id === selectedVersionId
  );
  const selectedFolder = selectedVersion?.folders.find(
    f => f.id === selectedFolderId
  );
  const pieces = selectedFolder?.pieces ?? [];
  const selectedPiece = pieces.find(p => p.id === selectedPieceId) ?? null;

  return (
    <div className="detail-content">
      <ProjectDetailHeader
        project={project}
        versions={project.versions}
        selectedVersionId={selectedVersionId}
        onVersionChange={setSelectedVersionId}
        onStageLink={() => setIsStageLinkOpen(true)}
      />

      {/* ── 3-panel layout ── */}
      <div
        className={`detail-three-panel${isFolderOpen ? '' : 'detail-three-panel--folder-hidden'}`}
      >
        {/* Panel 1 — Folders */}
        <FolderListPanel
          folders={selectedVersion?.folders ?? []}
          selectedId={selectedFolderId}
          onSelect={setSelectedFolderId}
          isCollapsed={!isFolderOpen}
          onToggleCollapse={() => setIsFolderOpen(prev => !prev)}
        />

        {/* Panel 2 — Pieces */}
        <PieceListPanel
          pieces={pieces}
          selectedId={selectedPieceId}
          onSelect={setSelectedPieceId}
          showCheckboxes={
            activeTab === 'validador' && canSeeValidador && canQcReview
          }
          checkedIds={checkedPieceIds}
          onToggleCheck={handleToggleCheck}
          onSelectAll={handleSelectAll}
          onClearAll={handleClearAll}
          pieceDecisions={pieceDecisions}
          onApprove={handleApprove}
          onReject={handleReject}
        />

        {/* Panel 3 — Right panel: tabs + content */}
        <div className="detail-panel-right">
          {/* Tabs — visually anchored to this panel only */}
          <div className="detail-right-tabs" role="tablist">
            {canSeeValidador && (
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'validador'}
                className={`detail-tab${activeTab === 'validador' ? 'detail-tab--active' : ''}`}
                onClick={() => setActiveTab('validador')}
              >
                {msgs.tabs.validador}
                {activeTab === 'validador' && (
                  <span className="detail-tab__glow" aria-hidden="true" />
                )}
              </button>
            )}
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'preview'}
              className={`detail-tab${activeTab === 'preview' ? 'detail-tab--active' : ''}`}
              onClick={() => setActiveTab('preview')}
            >
              {msgs.tabs.preview}
              {activeTab === 'preview' && (
                <span className="detail-tab__glow" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Content */}
          <div className="detail-right-content" role="tabpanel">
            {activeTab === 'validador' && canSeeValidador && (
              <ValidadorTab projectId={project.id} version={selectedVersion} />
            )}
            {activeTab === 'preview' && <PreviewTab piece={selectedPiece} />}
          </div>
        </div>
      </div>

      {project.stageUrl && (
        <StageLinkModal
          isOpen={isStageLinkOpen}
          stageUrl={project.stageUrl}
          onClose={() => setIsStageLinkOpen(false)}
        />
      )}
    </div>
  );
}
