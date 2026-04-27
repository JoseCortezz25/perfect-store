'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Search,
  ChevronDown,
  Check,
  Plus,
  LayoutGrid,
  LayoutList
} from 'lucide-react';
import Link from 'next/link';
import { ProjectCard } from '../molecules/project-card';
import { NewProjectModal } from '../molecules/new-project-modal';
import { projectMessages } from '../../messages';
import { useCurrentUser } from '@/domains/auth/hooks/use-current-user';
import type { Project, FilterType } from '../../projects.types';

type ViewMode = 'grid' | 'list';

const msgs = projectMessages.home;

const SORT_OPTIONS: { label: string; value: FilterType }[] = [
  { label: msgs.filters.alphabetical, value: 'alphabetical' },
  { label: msgs.filters.recent, value: 'recent' },
  { label: msgs.filters.oldest, value: 'oldest' },
  { label: msgs.filters.created, value: 'created' }
];

function groupByBrand(
  projects: Project[]
): { brand: string; projects: Project[] }[] {
  const map = new Map<string, Project[]>();
  for (const project of projects) {
    if (!map.has(project.brand)) map.set(project.brand, []);
    map.get(project.brand)!.push(project);
  }
  return Array.from(map.entries()).map(([brand, items]) => ({
    brand,
    projects: items
  }));
}

function ProjectListRow({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`} className="project-list-row">
      <div className="project-list-row__name-cell">
        <div className="project-list-row__thumb" aria-hidden="true">
          <img
            src={project.thumbnail ?? '/Images/Placceholder-Image.png'}
            alt=""
            className="project-list-row__thumb-img"
          />
        </div>
        <div className="project-list-row__name-info">
          <span className="project-list-row__name">{project.name}</span>
        </div>
      </div>
      <div className="project-list-row__brand-cell">
        <span className="project-list-row__brand">{project.brand}</span>
      </div>
      <div className="project-list-row__images-cell">
        <span className="project-list-row__images">
          {projectMessages.card.images(project.totalImages)}
        </span>
      </div>
      <div className="project-list-row__date-cell">
        <span className="project-list-row__date">
          {projectMessages.card.date(project.updatedAt)}
        </span>
      </div>
    </Link>
  );
}

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { canCreateProject } = useCurrentUser();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<FilterType>('none');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<Set<string>>(new Set());
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const sortRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
      if (brandRef.current && !brandRef.current.contains(e.target as Node)) {
        setIsBrandOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const allBrands = Array.from(new Set(projects.map(p => p.brand))).sort();

  function toggleBrand(brand: string) {
    setSelectedBrands(prev => {
      const next = new Set(prev);
      if (next.has(brand)) next.delete(brand);
      else next.add(brand);
      return next;
    });
  }

  const sorted =
    sort === 'alphabetical'
      ? [...projects].sort((a, b) => a.name.localeCompare(b.name))
      : sort === 'recent'
        ? [...projects].sort(
            (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime()
          )
        : sort === 'oldest'
          ? [...projects].sort(
              (a, b) => a.updatedAt.getTime() - b.updatedAt.getTime()
            )
          : sort === 'created'
            ? [...projects].sort(
                (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
              )
            : projects;

  const filtered = query
    ? sorted.filter(
        p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase())
      )
    : sorted;

  const filteredByBrand =
    selectedBrands.size > 0
      ? filtered.filter(p => selectedBrands.has(p.brand))
      : filtered;

  const groups = groupByBrand(filteredByBrand);
  const activeLabel =
    SORT_OPTIONS.find(o => o.value === sort)?.label ?? msgs.filters.sortLabel;
  const brandLabel =
    selectedBrands.size > 0
      ? `${msgs.brandFilter} (${selectedBrands.size})`
      : msgs.brandFilter;

  return (
    <div className="home-content">
      {/* Section header */}
      <div className="section-header">
        <div className="section-header__accent-line" />
        <div className="section-header__body">
          <h2 className="section-header__title">{msgs.projectsTitle}</h2>
          <p className="section-header__subtitle">{msgs.projectsSubtitle}</p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="home-toolbar">
        <div className="home-search">
          <Search size={13} strokeWidth={1.5} className="home-search__icon" />
          <input
            type="text"
            className="home-search__input"
            placeholder={msgs.searchPlaceholder}
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>

        <div className="brand-filter" ref={brandRef}>
          <button
            type="button"
            className="home-sort__trigger"
            data-open={isBrandOpen}
            onClick={() => setIsBrandOpen(o => !o)}
          >
            {brandLabel}
            <ChevronDown
              size={13}
              strokeWidth={1.5}
              className="home-sort__chevron"
              data-open={isBrandOpen}
            />
          </button>
          {isBrandOpen && (
            <div className="brand-filter__dropdown">
              {allBrands.map(brand => {
                const isChecked = selectedBrands.has(brand);
                return (
                  <button
                    key={brand}
                    type="button"
                    className="brand-filter__item"
                    onClick={() => toggleBrand(brand)}
                  >
                    <span
                      className={`brand-filter__checkbox${isChecked ? 'brand-filter__checkbox--checked' : ''}`}
                    >
                      {isChecked && <Check size={10} strokeWidth={3} />}
                    </span>
                    {brand}
                  </button>
                );
              })}
              {selectedBrands.size > 0 && (
                <button
                  type="button"
                  className="brand-filter__item brand-filter__item--clear"
                  onClick={() => setSelectedBrands(new Set())}
                >
                  {msgs.clearBrands}
                </button>
              )}
            </div>
          )}
        </div>

        <div className="home-sort" ref={sortRef}>
          <button
            type="button"
            className="home-sort__trigger"
            data-open={isSortOpen}
            onClick={() => setIsSortOpen(o => !o)}
          >
            {activeLabel}
            <ChevronDown
              size={13}
              strokeWidth={1.5}
              className="home-sort__chevron"
              data-open={isSortOpen}
            />
          </button>
          {isSortOpen && (
            <div className="home-sort__dropdown">
              {SORT_OPTIONS.map(option => (
                <button
                  key={option.value}
                  type="button"
                  className="home-sort__option"
                  data-active={sort === option.value}
                  onClick={() => {
                    setSort(option.value);
                    setIsSortOpen(false);
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="home-toolbar__actions">
          {/* View toggle */}
          <div className="view-toggle" role="group" aria-label="Vista">
            <button
              type="button"
              className={`view-toggle__btn${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('grid')}
              aria-label={msgs.viewGrid}
              title={msgs.viewGrid}
            >
              <LayoutGrid size={15} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              className={`view-toggle__btn${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`}
              onClick={() => setViewMode('list')}
              aria-label={msgs.viewList}
              title={msgs.viewList}
            >
              <LayoutList size={15} strokeWidth={1.5} />
            </button>
          </div>

          {canCreateProject && (
            <button
              type="button"
              className="btn btn--primary projects-container__create-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={12} strokeWidth={2.5} aria-hidden="true" />
              <span>{msgs.newProject}</span>
            </button>
          )}
        </div>
      </div>

      {/* Grid view */}
      {viewMode === 'grid' &&
        (groups.length === 0 ? (
          <p className="projects-empty">{msgs.noProjectsInGroup}</p>
        ) : (
          <div className="projects-groups">
            {groups.map(group => (
              <div key={group.brand} className="projects-grid__group">
                <div className="projects-grid__client-separator">
                  <h2 className="projects-grid__client">{group.brand}</h2>
                </div>
                <div className="projects-grid__cards">
                  {group.projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

      {/* List view */}
      {viewMode === 'list' &&
        (groups.length === 0 ? (
          <p className="projects-empty">{msgs.noProjectsInGroup}</p>
        ) : (
          <div className="projects-list">
            <div className="list-view-header">
              <span className="list-view-header__cell">
                {msgs.listHeaders.name}
              </span>
              <span className="list-view-header__cell">
                {msgs.listHeaders.brand}
              </span>
              <span className="list-view-header__cell">
                {msgs.listHeaders.images}
              </span>
              <span className="list-view-header__cell">
                {msgs.listHeaders.lastModified}
              </span>
            </div>

            {groups.map(group => (
              <div key={group.brand} className="projects-list__group">
                <div className="projects-grid__client-separator--list">
                  <h2 className="projects-grid__client">{group.brand}</h2>
                </div>
                {group.projects.map(project => (
                  <ProjectListRow key={project.id} project={project} />
                ))}
              </div>
            ))}
          </div>
        ))}

      {canCreateProject && (
        <NewProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
