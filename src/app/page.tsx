import { AppSidebar } from '@/components/layout/app-sidebar';
import { ProjectsGrid } from '@/domains/projects/components/organisms/projects-grid';
import { projectMessages } from '@/domains/projects/messages';
import { getAllPsProjects } from '@/domains/projects/ps-project-detail.repository';
import type { Project } from '@/domains/projects/projects.types';
import { FolderOpen, ImageIcon, Package, TrendingUp } from 'lucide-react';
import '@/styles/components/layout/app-sidebar.css';
import '@/styles/domains/projects/home.css';

const MOCK_PROJECTS: Project[] = getAllPsProjects().map(p => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  totalImages: p.sessions.reduce((sum, s) => sum + s.images.length, 0),
  createdAt: p.createdAt,
  updatedAt: p.sessions[0]?.generatedAt ?? p.createdAt,
  thumbnail: p.thumbnail
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
      <AppSidebar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />

        {/* ─── Stats Section ─────────────────────────────────── */}
        <section className="stats-section">
          <div className="stats-section__content">
            <div className="section-header stats-section__header">
              <div className="section-header__accent-line" />
              <div className="section-header__body">
                <h2 className="stats-section__title">{msgs.statsTitle}</h2>
                <p className="stats-section__subtitle">{msgs.statsSubtitle}</p>
              </div>
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-card__icon stat-card__icon--blue">
                  <FolderOpen size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="stat-card__body">
                  <span className="stat-card__label">
                    {msgs.metrics.totalProjects}
                  </span>
                  <p className="stat-card__value">{MOCK_PROJECTS.length}</p>
                </div>
                <div className="stat-card__deco" aria-hidden="true" />
              </div>

              <div className="stat-card">
                <div className="stat-card__icon stat-card__icon--purple">
                  <ImageIcon size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="stat-card__body">
                  <span className="stat-card__label">
                    {msgs.metrics.totalImages}
                  </span>
                  <p className="stat-card__value">{totalImages}</p>
                </div>
                <div className="stat-card__deco" aria-hidden="true" />
              </div>

              <div className="stat-card">
                <div className="stat-card__icon stat-card__icon--orange">
                  <Package size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="stat-card__body">
                  <span className="stat-card__label">
                    {msgs.metrics.totalSkus}
                  </span>
                  <p className="stat-card__value">{TOTAL_SKUS}</p>
                </div>
                <div className="stat-card__deco" aria-hidden="true" />
              </div>

              <div className="stat-card">
                <div className="stat-card__icon stat-card__icon--pink">
                  <TrendingUp size={18} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <div className="stat-card__body">
                  <span className="stat-card__label">
                    {msgs.metrics.imagesThisWeek}
                  </span>
                  <p className="stat-card__value">{imagesThisWeek}</p>
                </div>
                <div className="stat-card__deco" aria-hidden="true" />
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
