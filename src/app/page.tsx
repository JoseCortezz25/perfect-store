import { Topbar } from '@/components/layout/topbar';
import { ProjectsGrid } from '@/domains/projects/components/organisms/projects-grid';
import { projectMessages } from '@/domains/projects/messages';
import type { Project, BannerStatus } from '@/domains/projects/projects.types';
import { Layers, CheckCircle, AlertTriangle, Send } from 'lucide-react';
import '@/styles/components/layout/topbar.css';
import '@/styles/domains/projects/home.css';

const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Summer Campaign 2025',
    brand: 'Pepsi',
    client: 'PepsiCo',
    designer: 'Michaela O',
    status: 'qc_approved',
    totalPieces: 24,
    latestVersion: 3,
    createdAt: new Date('2025-03-10'),
    updatedAt: new Date('2026-04-01')
  },
  {
    id: '2',
    name: 'Back to School',
    brand: 'Pepsi',
    client: 'PepsiCo',
    designer: 'Carlos R',
    status: 'client_review',
    totalPieces: 12,
    latestVersion: 2,
    createdAt: new Date('2026-03-20'),
    updatedAt: new Date('2026-04-05')
  },
  {
    id: '3',
    name: 'World Cup Launch',
    brand: 'Gatorade',
    client: 'PepsiCo',
    designer: 'Daniela S',
    status: 'qc_rejected',
    totalPieces: 36,
    latestVersion: 1,
    createdAt: new Date('2026-04-01'),
    updatedAt: new Date('2026-04-08')
  },
  {
    id: '4',
    name: 'Brand Refresh Q2',
    brand: 'Nike',
    client: 'Nike Inc.',
    designer: 'Michaela O',
    status: 'delivered',
    totalPieces: 18,
    latestVersion: 4,
    createdAt: new Date('2026-02-14'),
    updatedAt: new Date('2026-03-28')
  },
  {
    id: '5',
    name: 'Air Max Drop',
    brand: 'Nike',
    client: 'Nike Inc.',
    designer: 'Luis P',
    status: 'needs_fix',
    totalPieces: 8,
    latestVersion: 2,
    createdAt: new Date('2026-03-28'),
    updatedAt: new Date('2026-04-09')
  },
  {
    id: '6',
    name: 'Holiday Collection',
    brand: 'Zara',
    client: 'Inditex',
    designer: 'Ana G',
    status: 'qc_pending',
    totalPieces: 30,
    latestVersion: 1,
    createdAt: new Date('2026-04-08'),
    updatedAt: new Date('2026-04-08')
  },
  {
    id: '7',
    name: 'Spring Drop 2025',
    brand: 'Massimo Dutti',
    client: 'Inditex',
    designer: 'Carlos R',
    status: 'client_approved',
    totalPieces: 16,
    latestVersion: 3,
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-04-03')
  },
  {
    id: '8',
    name: 'Horizon Talent Spring Recruitment Ads',
    brand: 'Horizon',
    client: 'Horizon Talent Group',
    designer: 'Daniela S',
    status: 'qc_approved',
    totalPieces: 6,
    latestVersion: 2,
    createdAt: new Date('2025-12-15'),
    updatedAt: new Date('2025-12-20')
  },
  {
    id: '9',
    name: 'Suncrest Influencer Push',
    brand: 'Suncrest',
    client: 'Suncrest Marketing',
    designer: 'Luis P',
    status: 'client_review',
    totalPieces: 12,
    latestVersion: 1,
    createdAt: new Date('2026-01-02'),
    updatedAt: new Date('2026-01-08')
  },
  {
    id: '10',
    name: 'Evergreen Brand Refresh Toolkit',
    brand: 'Evergreen',
    client: 'Evergreen Communications',
    designer: 'Ana G',
    status: 'delivered',
    totalPieces: 5,
    latestVersion: 3,
    createdAt: new Date('2025-11-20'),
    updatedAt: new Date('2025-11-29')
  },
  {
    id: '11',
    name: 'Radiant Studio Holiday Creative Suite',
    brand: 'Radiant',
    client: 'Radiant Brand Studio',
    designer: 'Michaela O',
    status: 'needs_fix',
    totalPieces: 8,
    latestVersion: 1,
    createdAt: new Date('2025-12-05'),
    updatedAt: new Date('2025-12-11')
  },
  {
    id: '12',
    name: 'Summit Digital Paid Search Overhaul',
    brand: 'Summit',
    client: 'Summit Digital Agency',
    designer: 'Carlos R',
    status: 'qc_pending',
    totalPieces: 10,
    latestVersion: 2,
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-16')
  }
];

const ACTIVE_STATUSES: BannerStatus[] = ['uploaded', 'qc_pending', 'qc_approved', 'client_review', 'needs_fix'];
const APPROVED_STATUSES: BannerStatus[] = ['qc_approved', 'client_approved'];
const CORRECTION_STATUSES: BannerStatus[] = ['qc_rejected', 'needs_fix'];
const SENT_STATUSES: BannerStatus[] = ['client_review', 'delivered'];

function countPieces(projects: Project[], statuses: BannerStatus[]): number {
  return projects
    .filter(p => statuses.includes(p.status))
    .reduce((acc, p) => acc + p.totalPieces, 0);
}

const msgs = projectMessages.home;

export default function HomePage() {
  const activeBanners = countPieces(MOCK_PROJECTS, ACTIVE_STATUSES);
  const approved = countPieces(MOCK_PROJECTS, APPROVED_STATUSES);
  const inCorrection = countPieces(MOCK_PROJECTS, CORRECTION_STATUSES);
  const sentToClient = countPieces(MOCK_PROJECTS, SENT_STATUSES);

  return (
    <div className="dashboard">
      <Topbar />
      <main className="dashboard__main">
        <div className="dashboard__bg" />

        <div className="welcome-header">
          <div className="welcome-header__accent">
            <div className="welcome-header__line" />
          </div>
          <h1 className="welcome-header__title">{msgs.welcome}</h1>
        </div>

        <div className="home-metrics">
          <div className="metric-item">
            <div className="metric-item__top">
              <div className="metric-item__icon">
                <Layers size={20} strokeWidth={1.5} />
              </div>
              <p className="metric-item__label">{msgs.metrics.activeBanners}</p>
            </div>
            <p className="metric-item__value">{activeBanners}</p>
          </div>

          <div className="metric-item">
            <div className="metric-item__top">
              <div className="metric-item__icon">
                <CheckCircle size={20} strokeWidth={1.5} />
              </div>
              <p className="metric-item__label">{msgs.metrics.approved}</p>
            </div>
            <p className="metric-item__value">{approved}</p>
          </div>

          <div className="metric-item">
            <div className="metric-item__top">
              <div className="metric-item__icon">
                <AlertTriangle size={20} strokeWidth={1.5} />
              </div>
              <p className="metric-item__label">{msgs.metrics.inCorrection}</p>
            </div>
            <p className="metric-item__value">{inCorrection}</p>
          </div>

          <div className="metric-item">
            <div className="metric-item__top">
              <div className="metric-item__icon">
                <Send size={20} strokeWidth={1.5} />
              </div>
              <p className="metric-item__label">{msgs.metrics.sentToClient}</p>
            </div>
            <p className="metric-item__value">{sentToClient}</p>
          </div>
        </div>

        <ProjectsGrid projects={MOCK_PROJECTS} />
      </main>
    </div>
  );
}
