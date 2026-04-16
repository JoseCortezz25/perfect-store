'use client';

import { Moon, Sun, RotateCw } from 'lucide-react';
import { projectMessages } from '../../messages';
import type { BannerPiece } from '../../projects.types';

const msgs = projectMessages.detail.preview.toolbar;

export type PreviewBackground = 'dark' | 'light';

interface PreviewToolbarProps {
  background: PreviewBackground;
  onBackgroundChange: (bg: PreviewBackground) => void;
  onReload: () => void;
  selectedPiece: BannerPiece | null;
}

export function PreviewToolbar({ background, onBackgroundChange, onReload, selectedPiece }: PreviewToolbarProps) {
  return (
    <div className="preview-toolbar">
      <div className="preview-toolbar__right">
        {/* Background toggle */}
        <div className="preview-toolbar__bg-toggle" role="group" aria-label="Fondo del canvas">
          <button
            type="button"
            className={`preview-toolbar__bg-btn${background === 'dark' ? ' preview-toolbar__bg-btn--active' : ''}`}
            onClick={() => onBackgroundChange('dark')}
            aria-pressed={background === 'dark'}
            title={msgs.darkBg}
          >
            <Moon size={13} strokeWidth={1.5} />
            <span>{msgs.darkBg}</span>
          </button>
          <button
            type="button"
            className={`preview-toolbar__bg-btn${background === 'light' ? ' preview-toolbar__bg-btn--active' : ''}`}
            onClick={() => onBackgroundChange('light')}
            aria-pressed={background === 'light'}
            title={msgs.lightBg}
          >
            <Sun size={13} strokeWidth={1.5} />
            <span>{msgs.lightBg}</span>
          </button>
        </div>

        {/* Reload */}
        <button
          type="button"
          className="preview-toolbar__reload"
          onClick={onReload}
          disabled={!selectedPiece}
          title={msgs.reload}
          aria-label={msgs.reload}
        >
          <RotateCw size={13} strokeWidth={1.5} />
          <span>{msgs.reload}</span>
        </button>
      </div>
    </div>
  );
}
