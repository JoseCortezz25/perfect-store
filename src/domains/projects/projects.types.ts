export type BannerStatus =
  | 'uploaded'
  | 'qc_pending'
  | 'qc_approved'
  | 'qc_rejected'
  | 'client_review'
  | 'client_approved'
  | 'delivered'
  | 'needs_fix';

export interface Project {
  id: string;
  name: string;
  brand: string;
  totalImages: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BrandGroup {
  brand: string;
  projects: Project[];
}

export type FilterType =
  | 'none'
  | 'alphabetical'
  | 'recent'
  | 'oldest'
  | 'created';

export type FolderStatus = 'approved' | 'rejected' | 'pending' | 'in_review';

export interface BannerFolder {
  id: string;
  name: string;
  status: FolderStatus;
  pieces: BannerPiece[];
}

/* ─── Banner Piece ──────────────────────────────────────────── */

export type BannerSize =
  | '300x250'
  | '728x90'
  | '160x600'
  | '300x600'
  | '320x50'
  | '970x250'
  | '468x60'
  | '120x600'
  | '336x280'
  | '320x480';

export interface BannerPiece {
  id: string;
  name: string;
  size: BannerSize | string;
  fileName: string;
  hasAnimation: boolean;
  animationDurationMs?: number;
  accentColor?: string;
}

/* ─── QC Check ──────────────────────────────────────────────── */

export type QcCheckStatus = 'pass' | 'fail' | 'warning' | 'skipped';
export type QcCheckCategory = 'critical' | 'important' | 'informational';

export interface QcCheckItem {
  id: string;
  label: string;
  category: QcCheckCategory;
  status: QcCheckStatus;
  detail?: string;
}

export interface QcCheckGroup {
  id: string;
  label: string;
  items: QcCheckItem[];
}

export interface QcResult {
  score: number;
  groups: QcCheckGroup[];
  validatedAt: Date;
  versionId: string;
}

/* ─── Project Version ───────────────────────────────────────── */

export type VersionStatus = 'validating' | 'approved' | 'rejected' | 'pending';

export interface ProjectVersion {
  id: string;
  label: string;
  status: VersionStatus;
  qcResult?: QcResult;
  folders: BannerFolder[];
  uploadedAt: Date;
  uploadedBy: string;
  zipFileName: string;
}

/* ─── PS Project Detail (Perfect Store image generation) ──────── */

export interface PsGeneratedImage {
  id: string;
  accentColor: string;
}

export interface SessionParams {
  skus: string[];
  imageType: string;
  angle: string;
  aspectRatio: string;
  quality: string;
  freeText?: string;
}

export interface GenerationSession {
  id: string;
  generatedAt: Date;
  images: PsGeneratedImage[];
  params: SessionParams;
}

export interface PsProjectDetail {
  id: string;
  name: string;
  brand: string;
  skus: string[];
  createdAt: Date;
  sessions: GenerationSession[];
}

/* ─── Project Detail (self-contained — migrated separately) ─── */

export interface ProjectDetail {
  id: string;
  name: string;
  brand: string;
  client: string;
  designer: string;
  status: BannerStatus;
  totalPieces: number;
  latestVersion: number;
  createdAt: Date;
  updatedAt: Date;
  versions: ProjectVersion[];
  stageUrl?: string;
}
