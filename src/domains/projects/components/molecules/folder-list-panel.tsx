'use client';

import { useState } from 'react';
import { Search, Folder } from 'lucide-react';
import { projectMessages } from '../../messages';
import type { BannerFolder, FolderStatus } from '../../projects.types';

const msgs = projectMessages.detail.foldersPanel;

const FOLDER_DOT_CLS: Record<FolderStatus, string> = {
  approved: 'folder-item__dot--approved',
  rejected: 'folder-item__dot--rejected',
  pending:  'folder-item__dot--pending',
  in_review:'folder-item__dot--in-review',
};

interface FolderListPanelProps {
  folders: BannerFolder[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function FolderListPanel({ folders, selectedId, onSelect }: FolderListPanelProps) {
  const [query, setQuery] = useState('');

  const filtered = query
    ? folders.filter(f => f.name.toLowerCase().includes(query.toLowerCase()))
    : folders;

  return (
    <div className="folder-list">
      {/* Search */}
      <div className="folder-list__search">
        <Search size={12} strokeWidth={1.5} className="folder-list__search-icon" aria-hidden="true" />
        <input
          type="text"
          className="folder-list__search-input"
          placeholder={msgs.searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* Folder items */}
      <div className="folder-list__items">
        {filtered.map(folder => (
          <button
            key={folder.id}
            type="button"
            className={`folder-item${selectedId === folder.id ? ' folder-item--selected' : ''}`}
            onClick={() => onSelect(folder.id)}
          >
            <span className={`folder-item__dot ${FOLDER_DOT_CLS[folder.status]}`} aria-hidden="true" />
            <Folder
              size={15}
              strokeWidth={1.5}
              className="folder-item__icon"
              aria-hidden="true"
            />
            <div className="folder-item__info">
              <span className="folder-item__name">{folder.name}</span>
              <span className="folder-item__count">{folder.pieces.length}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
