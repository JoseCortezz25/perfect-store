import { AppSidebar } from '@/components/layout/app-sidebar';
import { ResultsShell } from '@/domains/generator/components/organisms/results-shell';
import '@/styles/components/layout/app-sidebar.css';
import '@/styles/components/atoms/button.css';
import '@/styles/domains/generator/generator.css';

export default function ResultsPage() {
  return (
    <div className="dashboard">
      <AppSidebar />
      <main className="dashboard__main dashboard__main--workspace">
        <ResultsShell />
      </main>
    </div>
  );
}
