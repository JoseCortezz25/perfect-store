import { AppSidebar } from '@/components/layout/app-sidebar';
import { ProfileShell } from '@/domains/auth/components/organisms/profile-shell';
import '@/styles/components/layout/app-sidebar.css';
import '@/styles/domains/projects/home.css';
import '@/styles/domains/admin/admin.css';

export default function ProfilePage() {
  return (
    <div className="dashboard">
      <AppSidebar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />
        <ProfileShell />
      </main>
    </div>
  );
}
