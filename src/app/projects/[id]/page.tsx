import { notFound } from 'next/navigation';
import { AppSidebar } from '@/components/layout/app-sidebar';
import { PsProjectDetailShell } from '@/domains/projects/components/organisms/ps-project-detail-shell';
import { ProjectDetailShell } from '@/domains/projects/components/organisms/project-detail-shell';
import { findPsProjectById } from '@/domains/projects/ps-project-detail.repository';
import { findProjectById } from '@/domains/projects/project-detail.repository';
import '@/styles/components/layout/app-sidebar.css';
import '@/styles/domains/projects/home.css';
import '@/styles/domains/projects/detail.css';
import '@/styles/domains/generator/generator.css';
import '@/styles/components/atoms/button.css';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({
  params
}: ProjectDetailPageProps) {
  const { id } = await params;

  const psProject = findPsProjectById(id);
  if (psProject) {
    return (
      <div className="dashboard">
        <AppSidebar />
        <main className="dashboard__main dashboard__main--workspace">
          <div className="dashboard__bg" />
          <PsProjectDetailShell project={psProject} />
        </main>
      </div>
    );
  }

  const project = findProjectById(id);
  if (project) {
    return (
      <div className="dashboard">
        <AppSidebar />
        <main className="dashboard__main">
          <div className="dashboard__bg" />
          <ProjectDetailShell project={project} />
        </main>
      </div>
    );
  }

  notFound();
}
