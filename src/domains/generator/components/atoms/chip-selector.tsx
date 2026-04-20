'use client';

import { cn } from '@/lib/utils';

interface ChipSelectorProps {
  label: string;
  options: readonly string[];
  selected: string[];
  onToggle: (value: string) => void;
}

export function ChipSelector({
  label,
  options,
  selected,
  onToggle
}: ChipSelectorProps) {
  return (
    <div className="chip-selector">
      <span className="chip-selector__label">{label}</span>
      <div className="chip-selector__chips">
        {options.map(option => {
          const isActive = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              className={cn(
                'chip-selector__chip',
                isActive && 'chip-selector__chip--active'
              )}
              onClick={() => onToggle(option)}
              aria-pressed={isActive}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
