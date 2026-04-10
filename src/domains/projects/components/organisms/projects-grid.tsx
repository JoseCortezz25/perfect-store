'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Plus, LayoutGrid } from 'lucide-react';
import { ProjectCard } from '../molecules/project-card';
import { NewProjectModal } from '../molecules/new-project-modal';
import { projectMessages } from '../../messages';
import type { Project, FilterType } from '../../projects.types';

const msgs = projectMessages.home;

const SORT_OPTIONS: { label: string; value: FilterType }[] = [
  { label: msgs.filters.all, value: 'all' },
  { label: msgs.filters.brand, value: 'brand' },
  { label: msgs.filters.recent, value: 'recent' }
];

function groupByClient(projects: Project[]): { client: string; projects: Project[] }[] {
  const map = new Map<string, Project[]>();
  for (const project of projects) {
    if (!map.has(project.client)) map.set(project.client, []);
    map.get(project.client)!.push(project);
  }
  return Array.from(map.entries()).map(([client, items]) => ({ client, projects: items }));
}

interface ProjectsGridProps {
  projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<FilterType>('all');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const sorted =
    sort === 'recent'
      ? [...projects].sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      : sort === 'brand'
        ? [...projects].sort((a, b) => a.brand.localeCompare(b.brand))
        : projects;

  const filtered = query
    ? sorted.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.brand.toLowerCase().includes(query.toLowerCase()) ||
        p.client.toLowerCase().includes(query.toLowerCase())
      )
    : sorted;

  const groups = groupByClient(filtered);
  const activeLabel = SORT_OPTIONS.find(o => o.value === sort)?.label ?? msgs.sortBy;

  return (
    <div className="home-content">
        {/* ── Header: title + create | search + sort ── */}
        <div className="projects-container__header">
          <div className="projects-container__title-area">
            <LayoutGrid size={18} strokeWidth={1.5} className="projects-container__title-icon" aria-hidden="true" />
            <h2 className="projects-container__title">{msgs.projectsSection}</h2>
            <button
              type="button"
              className="projects-container__create-btn"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={12} strokeWidth={2.5} aria-hidden="true" />
              <span>{msgs.newProject}</span>
            </button>
          </div>

          <div className="projects-container__toolbar">
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

            <div className="home-sort" ref={sortRef}>
              <button
                type="button"
                className="home-sort__trigger"
                data-open={isSortOpen}
                onClick={() => setIsSortOpen(o => !o)}
              >
                {activeLabel}
                <ChevronDown size={13} strokeWidth={1.5} className="home-sort__chevron" data-open={isSortOpen} />
              </button>

              {isSortOpen && (
                <div className="home-sort__dropdown">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      className="home-sort__option"
                      data-active={sort === option.value}
                      onClick={() => { setSort(option.value); setIsSortOpen(false); }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Card groups by client ── */}
        {groups.length === 0 ? (
          <p className="projects-empty">{msgs.noProjectsInGroup}</p>
        ) : (
          <div className="projects-groups">
            {groups.map(group => (
              <div key={group.client} className="projects-grid__group">
                <h2 className="projects-grid__client">{group.client}</h2>
                <div className="projects-grid__cards">
                  {group.projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

      <NewProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
