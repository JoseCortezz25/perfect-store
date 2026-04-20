'use client';

import { useState, useSyncExternalStore } from 'react';
import { Search, X } from 'lucide-react';
import { SkuCard } from '../atoms/sku-card';
import { generatorStore } from '../../stores/generator.store';
import { generatorMessages } from '../../messages';
import { MOCK_SKUS, SKU_BRANDS } from '../../generator.repository';
import type { Sku } from '../../generator.types';

const msgs = generatorMessages.skuPanel;

export function SkuPanel() {
  const config = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getConfig,
    generatorStore.getConfig
  );

  const [activeBrand, setActiveBrand] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const filtered = MOCK_SKUS.filter(s => {
    const matchesBrand = activeBrand ? s.brand === activeBrand : true;
    const matchesQuery = query
      ? s.name.toLowerCase().includes(query.toLowerCase())
      : true;
    return matchesBrand && matchesQuery;
  });

  function handleToggle(sku: Sku) {
    const exists = config.selectedSkus.find(s => s.id === sku.id);
    const next = exists
      ? config.selectedSkus.filter(s => s.id !== sku.id)
      : [...config.selectedSkus, sku];
    generatorStore.setConfig({ selectedSkus: next });
  }

  function handleRemove(id: string) {
    generatorStore.setConfig({
      selectedSkus: config.selectedSkus.filter(s => s.id !== id)
    });
  }

  return (
    <aside className="sku-panel">
      <div className="sku-panel__header">
        <span className="sku-panel__title">{msgs.title}</span>
      </div>

      {/* Brand filter */}
      <div className="sku-panel__brands">
        <button
          type="button"
          className={`sku-brand-pill${activeBrand === null ? 'sku-brand-pill--active' : ''}`}
          onClick={() => setActiveBrand(null)}
        >
          {msgs.allBrands}
        </button>
        {SKU_BRANDS.map(brand => (
          <button
            key={brand}
            type="button"
            className={`sku-brand-pill${activeBrand === brand ? 'sku-brand-pill--active' : ''}`}
            onClick={() => setActiveBrand(brand)}
          >
            {brand}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="sku-panel__search">
        <Search
          size={13}
          strokeWidth={1.5}
          className="sku-panel__search-icon"
        />
        <input
          type="text"
          className="sku-panel__search-input"
          placeholder={msgs.searchPlaceholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      {/* SKU grid */}
      <div className="sku-panel__grid">
        {filtered.length === 0 ? (
          <p className="sku-panel__empty">{msgs.noResults}</p>
        ) : (
          filtered.map(sku => (
            <SkuCard
              key={sku.id}
              sku={sku}
              isSelected={!!config.selectedSkus.find(s => s.id === sku.id)}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>

      {/* Selected SKUs */}
      {config.selectedSkus.length > 0 && (
        <div className="sku-panel__selected">
          <span className="sku-panel__selected-label">
            {msgs.selectedLabel} ({config.selectedSkus.length})
          </span>
          <div className="sku-panel__selected-chips">
            {config.selectedSkus.map(sku => (
              <div key={sku.id} className="sku-selected-chip">
                <span
                  className="sku-selected-chip__dot"
                  style={{ backgroundColor: sku.accentColor }}
                  aria-hidden="true"
                />
                <span className="sku-selected-chip__name">{sku.name}</span>
                <button
                  type="button"
                  className="sku-selected-chip__remove"
                  onClick={() => handleRemove(sku.id)}
                  aria-label={`Quitar ${sku.name}`}
                >
                  <X size={10} strokeWidth={2.5} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </aside>
  );
}
