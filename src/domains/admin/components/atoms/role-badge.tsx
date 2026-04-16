import type { UserRole } from '@/domains/auth/stores/user.store';
import { adminMessages } from '../../messages';

const ROLE_CLS: Record<UserRole, string> = {
  admin:     'role-badge--admin',
  diseñador: 'role-badge--disenador',
  qc:        'role-badge--qc',
  cliente:   'role-badge--cliente',
};

interface RoleBadgeProps {
  role: UserRole;
}

export function RoleBadge({ role }: RoleBadgeProps) {
  return (
    <span className={`role-badge ${ROLE_CLS[role]}`}>
      {adminMessages.users.roles[role]}
    </span>
  );
}
