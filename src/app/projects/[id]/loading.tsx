import { Topbar } from '@/components/layout/topbar';
import '@/styles/components/layout/topbar.css';
import '@/styles/domains/projects/home.css';
import '@/styles/domains/projects/detail.css';

export default function ProjectDetailLoading() {
  return (
    <div className="dashboard">
      <Topbar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />
        <div className="detail-content">
          {/* Header skeleton */}
          <div className="detail-header">
            <div className="detail-skeleton detail-skeleton--breadcrumb" />
            <div className="detail-skeleton detail-skeleton--title" />
          </div>
          {/* Tab skeleton */}
          <div className="detail-skeleton detail-skeleton--tabs" />
          {/* Content skeleton */}
          <div className="detail-skeleton detail-skeleton--content" />
        </div>
      </main>
    </div>
  );
}
