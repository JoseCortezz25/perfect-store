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
  client: string;
  designer: string;
  status: BannerStatus;
  totalPieces: number;
  latestVersion: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClientGroup {
  client: string;
  projects: Project[];
}

export type FilterType = 'all' | 'brand' | 'recent';
