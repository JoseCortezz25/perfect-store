'use client';

import { useEffect, useRef, useState } from 'react';
import { projectMessages } from '../../messages';
import type { BannerPiece } from '../../projects.types';
import type { PreviewBackground } from '../molecules/preview-toolbar';

const msgs = projectMessages.detail.preview;

function parseBannerSize(size: string): { width: number; height: number } | null {
  const parts = size.split('x');
  if (parts.length !== 2) return null;
  const width = parseInt(parts[0], 10);
  const height = parseInt(parts[1], 10);
  if (isNaN(width) || isNaN(height)) return null;
  return { width, height };
}

function buildMockHtml(piece: BannerPiece, dims: { width: number; height: number }): string {
  const accent = piece.accentColor ?? '#1e3a8a';
  const animStyle = piece.hasAnimation
    ? `@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} } .inner{animation:pulse ${(piece.animationDurationMs ?? 8000) / 1000}s ease-in-out infinite}`
    : '';

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{width:${dims.width}px;height:${dims.height}px;overflow:hidden;font-family:sans-serif;background:${accent}}
    .inner{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:white;text-align:center;padding:12px}
    .name{font-size:${Math.min(12, dims.height / 6)}px;font-weight:600;opacity:0.9;word-break:break-all}
    .size{font-size:${Math.min(10, dims.height / 8)}px;opacity:0.6;font-weight:400}
    .dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.5)}
    ${animStyle}
  </style></head><body><div class="inner"><div class="dot"></div><p class="name">${piece.name}</p><p class="size">${piece.size}</p></div></body></html>`;
}

interface PreviewCanvasProps {
  piece: BannerPiece | null;
  background: PreviewBackground;
  reloadKey: number;
  trueSize?: boolean;
}

export function PreviewCanvas({ piece, background, reloadKey, trueSize }: PreviewCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [computedScale, setComputedScale] = useState(1);

  const scale = trueSize ? 1 : computedScale;

  const dims = piece ? parseBannerSize(piece.size) : null;

  useEffect(() => {
    if (!dims || !containerRef.current) return;

    const compute = (entry: ResizeObserverEntry) => {
      const { width, height } = entry.contentRect;
      // 48px horizontal padding (24 each side) + 56px vertical (24 top + 32 for label below)
      const availableW = width - 48;
      const availableH = height - 56;
      if (availableW <= 0 || availableH <= 0) return;
      const scaleX = availableW / dims.width;
      const scaleY = availableH / dims.height;
      setComputedScale(Math.min(scaleX, scaleY, 1));
    };

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) compute(entry);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [dims?.width, dims?.height]);

  if (!piece || !dims) {
    return (
      <div className={`preview-canvas preview-canvas--${background}`}>
        <div className="preview-canvas__empty">
          <div className="preview-canvas__empty-icon" aria-hidden="true">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="4" y="8" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="1.5" />
              <rect x="12" y="14" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.2" />
              <line x1="12" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              <circle cx="30" cy="10" r="4" fill="currentColor" fillOpacity="0.15" stroke="currentColor" strokeWidth="1.2" />
            </svg>
          </div>
          <p className="preview-canvas__empty-text">{msgs.noSelection}</p>
          <p className="preview-canvas__empty-hint">{msgs.noSelectionHint}</p>
        </div>
      </div>
    );
  }

  const mockHtml = buildMockHtml(piece, dims);

  return (
    <div
      ref={containerRef}
      className={`preview-canvas preview-canvas--${background}${trueSize ? ' preview-canvas--true-size' : ''}`}
      style={
        {
          '--preview-scale': scale,
          '--banner-w': dims.width,
          '--banner-h': dims.height,
        } as React.CSSProperties
      }
    >
      <div className="preview-canvas__scroll">
        <div className="preview-canvas__frame-wrapper">
          <div className="preview-canvas__frame">
            <iframe
              key={`${piece.id}-${reloadKey}`}
              srcDoc={mockHtml}
              width={dims.width}
              height={dims.height}
              className="preview-canvas__iframe"
              title={`Preview: ${piece.name}`}
              sandbox="allow-scripts"
              scrolling="no"
            />
            <div className="preview-canvas__dimensions" aria-label="Dimensiones">
              {msgs.dimensions(dims.width, dims.height)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
