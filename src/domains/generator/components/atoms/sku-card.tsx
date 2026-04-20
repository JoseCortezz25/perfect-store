import { Check } from 'lucide-react';
import type { Sku } from '../../generator.types';

interface SkuCardProps {
  sku: Sku;
  isSelected: boolean;
  onToggle: (sku: Sku) => void;
}

export function SkuCard({ sku, isSelected, onToggle }: SkuCardProps) {
  return (
    <button
      type="button"
      className={`sku-card${isSelected ? 'sku-card--selected' : ''}`}
      onClick={() => onToggle(sku)}
      aria-pressed={isSelected}
    >
      {/* Packshot placeholder */}
      <div
        className="sku-card__packshot"
        style={{
          backgroundColor: sku.accentColor + '22',
          borderColor: sku.accentColor + '44'
        }}
        aria-hidden="true"
      >
        <span className="sku-card__initials" style={{ color: sku.accentColor }}>
          {sku.name.slice(0, 2).toUpperCase()}
        </span>
      </div>

      <div className="sku-card__info">
        <span className="sku-card__name">{sku.name}</span>
        <span className="sku-card__volume">{sku.volume}</span>
      </div>

      {isSelected && (
        <div className="sku-card__check" aria-hidden="true">
          <Check size={10} strokeWidth={3} />
        </div>
      )}
    </button>
  );
}
