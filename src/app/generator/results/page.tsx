import { Topbar } from '@/components/layout/topbar';
import { ResultsShell } from '@/domains/generator/components/organisms/results-shell';
import '@/styles/components/layout/topbar.css';
import '@/styles/components/atoms/button.css';
import '@/styles/domains/generator/generator.css';

export default function ResultsPage() {
  return (
    <div className="dashboard">
      <Topbar />
      <main className="dashboard__main dashboard__main--workspace">
        <ResultsShell />
      </main>
    </div>
  );
}
