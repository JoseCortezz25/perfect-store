import { Topbar } from '@/components/layout/topbar';
import { AdminShell } from '@/domains/admin/components/organisms/admin-shell';
import '@/styles/components/layout/topbar.css';
import '@/styles/domains/projects/home.css';
import '@/styles/domains/admin/admin.css';

export default function AdminPage() {
  return (
    <div className="dashboard">
      <Topbar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />
        <AdminShell />
      </main>
    </div>
  );
}
