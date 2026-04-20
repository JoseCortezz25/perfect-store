import { Topbar } from '@/components/layout/topbar';
import { ProjectsGrid } from '@/domains/projects/components/organisms/projects-grid';
import { projectMessages } from '@/domains/projects/messages';
import { getAllPsProjects } from '@/domains/projects/ps-project-detail.repository';
import type { Project } from '@/domains/projects/projects.types';
import { FolderOpen, ImageIcon, Package, TrendingUp } from 'lucide-react';
import '@/styles/components/layout/topbar.css';
import '@/styles/domains/projects/home.css';

const MOCK_PROJECTS: Project[] = getAllPsProjects().map(p => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  totalImages: p.sessions.reduce((sum, s) => sum + s.images.length, 0),
  createdAt: p.createdAt,
  updatedAt: p.sessions[0]?.generatedAt ?? p.createdAt
}));

// ─── Métricas ─────────────────────────────────────────────────────────────────

const TOTAL_SKUS = 42;

const ONE_WEEK_AGO = new Date('2026-04-10');

const totalImages = MOCK_PROJECTS.reduce((acc, p) => acc + p.totalImages, 0);

const imagesThisWeek = MOCK_PROJECTS.filter(
  p => p.updatedAt >= ONE_WEEK_AGO
).reduce((acc, p) => acc + p.totalImages, 0);

const msgs = projectMessages.home;

export default function HomePage() {
  return (
    <div className="dashboard">
      <Topbar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />

        {/* ─── Stats Section ─────────────────────────────────── */}
        <section className="stats-section">
          <div className="stats-section__content">
            <div className="stats-card">
              <div className="section-header">
                <div className="section-header__accent-line" />
                <div className="section-header__body">
                  <h1 className="section-header__title">{msgs.statsTitle}</h1>
                  <p className="section-header__subtitle">
                    {msgs.statsSubtitle}
                  </p>
                </div>
              </div>

              <div className="home-metrics">
                <div className="metric-item">
                  <div className="metric-item__header">
                    <FolderOpen
                      size={16}
                      strokeWidth={1.5}
                      className="metric-item__icon"
                    />
                    <p className="metric-item__label">
                      {msgs.metrics.totalProjects}
                    </p>
                  </div>
                  <p className="metric-item__value">{MOCK_PROJECTS.length}</p>
                </div>

                <div className="metric-item">
                  <div className="metric-item__header">
                    <ImageIcon
                      size={16}
                      strokeWidth={1.5}
                      className="metric-item__icon"
                    />
                    <p className="metric-item__label">
                      {msgs.metrics.totalImages}
                    </p>
                  </div>
                  <p className="metric-item__value">{totalImages}</p>
                </div>

                <div className="metric-item">
                  <div className="metric-item__header">
                    <Package
                      size={16}
                      strokeWidth={1.5}
                      className="metric-item__icon"
                    />
                    <p className="metric-item__label">
                      {msgs.metrics.totalSkus}
                    </p>
                  </div>
                  <p className="metric-item__value">{TOTAL_SKUS}</p>
                </div>

                <div className="metric-item">
                  <div className="metric-item__header">
                    <TrendingUp
                      size={16}
                      strokeWidth={1.5}
                      className="metric-item__icon"
                    />
                    <p className="metric-item__label">
                      {msgs.metrics.imagesThisWeek}
                    </p>
                  </div>
                  <p className="metric-item__value">{imagesThisWeek}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Projects Section ──────────────────────────────── */}
        <section className="projects-section">
          <div className="projects-section__content">
            <ProjectsGrid projects={MOCK_PROJECTS} />
          </div>
        </section>
      </main>
    </div>
  );
}
