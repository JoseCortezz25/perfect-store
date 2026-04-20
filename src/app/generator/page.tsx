import { Topbar } from '@/components/layout/topbar';
import { GeneratorShell } from '@/domains/generator/components/organisms/generator-shell';
import '@/styles/components/layout/topbar.css';
import '@/styles/components/atoms/button.css';
import '@/styles/domains/generator/generator.css';

export default function GeneratorPage() {
  return (
    <div className="dashboard">
      <Topbar />
      <main className="dashboard__main dashboard__main--workspace">
        <GeneratorShell />
      </main>
    </div>
  );
}
