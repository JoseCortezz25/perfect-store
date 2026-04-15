import { notFound } from 'next/navigation';
import { Topbar } from '@/components/layout/topbar';
import { ProjectDetailShell } from '@/domains/projects/components/organisms/project-detail-shell';
import { findProjectById } from '@/domains/projects/project-detail.repository';
import '@/styles/components/layout/topbar.css';
import '@/styles/domains/projects/home.css';
import '@/styles/domains/projects/detail.css';

interface ProjectDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const project = findProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <div className="dashboard">
      <Topbar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />
        <ProjectDetailShell project={project} />
      </main>
    </div>
  );
}
