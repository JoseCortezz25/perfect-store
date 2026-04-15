'use client';

interface SizeFilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export function SizeFilterChip({ label, isActive, onClick }: SizeFilterChipProps) {
  return (
    <button
      type="button"
      className={`size-chip${isActive ? ' size-chip--active' : ''}`}
      onClick={onClick}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}
