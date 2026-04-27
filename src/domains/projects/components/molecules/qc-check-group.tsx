'use client';

import { useState } from 'react';
import { ChevronDown, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { QcCheckItem } from '../atoms/qc-check-item';
import type { QcCheckGroup as QcCheckGroupType } from '../../projects.types';

interface QcCheckGroupProps {
  group: QcCheckGroupType;
  defaultOpen?: boolean;
}

function GroupSummary({ items }: { items: QcCheckGroupType['items'] }) {
  const passCount = items.filter(i => i.status === 'pass').length;
  const failCount = items.filter(i => i.status === 'fail').length;
  const warnCount = items.filter(i => i.status === 'warning').length;

  return (
    <div className="qc-group__summary" aria-hidden="true">
      {failCount > 0 && (
        <span className="qc-group__summary-item qc-group__summary-item--fail">
          <XCircle size={11} strokeWidth={2} />
          {failCount}
        </span>
      )}
      {warnCount > 0 && (
        <span className="qc-group__summary-item qc-group__summary-item--warn">
          <AlertTriangle size={11} strokeWidth={2} />
          {warnCount}
        </span>
      )}
      {passCount > 0 && (
        <span className="qc-group__summary-item qc-group__summary-item--pass">
          <CheckCircle size={11} strokeWidth={2} />
          {passCount}
        </span>
      )}
    </div>
  );
}

export function QcCheckGroup({
  group,
  defaultOpen = false
}: QcCheckGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="qc-group">
      <button
        type="button"
        className={cn('qc-group__header', isOpen && 'qc-group__header--open')}
        onClick={() => setIsOpen(o => !o)}
        aria-expanded={isOpen}
      >
        <span className="qc-group__title">{group.label}</span>
        <GroupSummary items={group.items} />
        <ChevronDown
          size={14}
          strokeWidth={1.5}
          className={cn(
            'qc-group__chevron',
            isOpen && 'qc-group__chevron--open'
          )}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div className="qc-group__body">
          {group.items.map(item => (
            <QcCheckItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
