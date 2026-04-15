import type { UserRole } from '@/domains/auth/stores/user.store';
import type { BannerStatus } from '@/domains/projects/projects.types';

export type AdminUserStatus = 'active' | 'inactive';

export interface AdminUser {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  status: AdminUserStatus;
}

export interface AdminProject {
  id: string;
  name: string;
  designer: string;
  status: BannerStatus;
  pieces: number;
}

export interface AdminBrand {
  id: string;
  name: string;
  client: string;
  projects: AdminProject[];
}
