import { AppSidebar } from '@/components/layout/app-sidebar';
import { AdminShell } from '@/domains/admin/components/organisms/admin-shell';
import '@/styles/components/layout/app-sidebar.css';
import '@/styles/domains/projects/home.css';
import '@/styles/domains/admin/admin.css';

export default function AdminPage() {
  return (
    <div className="dashboard">
      <AppSidebar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />
        <AdminShell />
      </main>
    </div>
  );
}
