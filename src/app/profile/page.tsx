import { Topbar } from '@/components/layout/topbar';
import { ProfileShell } from '@/domains/auth/components/organisms/profile-shell';
import '@/styles/components/layout/topbar.css';
import '@/styles/domains/projects/home.css';
import '@/styles/domains/admin/admin.css';

export default function ProfilePage() {
  return (
    <div className="dashboard">
      <Topbar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />
        <ProfileShell />
      </main>
    </div>
  );
}
