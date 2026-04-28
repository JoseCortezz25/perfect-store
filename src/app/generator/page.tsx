import { AppSidebar } from '@/components/layout/app-sidebar';
import { GeneratorShell } from '@/domains/generator/components/organisms/generator-shell';
import '@/styles/components/layout/app-sidebar.css';
import '@/styles/components/atoms/button.css';
import '@/styles/domains/generator/generator.css'; // v2

export default function GeneratorPage() {
  return (
    <div className="dashboard">
      <AppSidebar />
      <main className="dashboard__main dashboard__main--workspace">
        <GeneratorShell />
      </main>
    </div>
  );
}
