'use client';

import { useState, useRef, useEffect, useSyncExternalStore } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generatorStore } from '../../stores/generator.store';
import { generatorMessages } from '../../messages';
import {
  FORMAT_CATALOG,
  FORMAT_STEPPER_MAX,
  type FormatCategory,
  type FormatSelection
} from '../../generator.types';

const msgs = generatorMessages.config.format;

/* ── Helpers ── */

function findSelection(
  formats: FormatSelection[],
  category: FormatCategory,
  formatId: string
): FormatSelection | undefined {
  return formats.find(f => f.category === category && f.format === formatId);
}

function buildTriggerLabel(formats: FormatSelection[]): string {
  if (formats.length === 0) return msgs.placeholder;

  const total = formats.reduce((s, f) => s + f.count, 0);

  if (formats.length === 1) {
    const f = formats[0];
    const cat = FORMAT_CATALOG.find(c => c.id === f.category);
    const fmt = cat?.formats.find(x => x.id === f.format);
    const name = cat?.expandable ? (fmt?.label ?? '') : (cat?.label ?? '');
    return `${name} ×${f.count}`;
  }

  if (formats.length <= 2) {
    return formats
      .map(f => {
        const cat = FORMAT_CATALOG.find(c => c.id === f.category);
        const fmt = cat?.formats.find(x => x.id === f.format);
        const name = cat?.expandable ? (fmt?.label ?? '') : (cat?.label ?? '');
        return `${name} ×${f.count}`;
      })
      .join(' · ');
  }

  return `${formats.length} formatos · ${total} imágenes`;
}

/* ── Component ── */

export function FormatSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  const config = useSyncExternalStore(
    generatorStore.subscribe,
    generatorStore.getConfig,
    generatorStore.getConfig
  );

  /* Click-outside closes the menu */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasSelection = config.formats.length > 0;
  const triggerLabel = buildTriggerLabel(config.formats);

  function handleAdd(
    category: FormatCategory,
    formatId: string,
    minCount: number
  ) {
    const config = generatorStore.getConfig();
    generatorStore.setConfig({
      formats: [
        ...config.formats,
        { category, format: formatId, count: minCount }
      ]
    });
  }

  function handleStep(
    category: FormatCategory,
    formatId: string,
    minCount: number,
    dir: 'up' | 'down'
  ) {
    const config = generatorStore.getConfig();
    generatorStore.setConfig({
      formats: config.formats.map(f => {
        if (f.category !== category || f.format !== formatId) return f;
        if (dir === 'up' && f.count < FORMAT_STEPPER_MAX)
          return { ...f, count: f.count + 1 };
        if (dir === 'down' && f.count > minCount)
          return { ...f, count: f.count - 1 };
        return f;
      })
    });
  }

  return (
    <div className="gen-drop" ref={dropRef}>
      {/* Trigger */}
      <button
        type="button"
        className={cn(
          'gen-drop__trigger',
          hasSelection && 'gen-drop__trigger--active'
        )}
        data-open={isOpen}
        onClick={() => setIsOpen(o => !o)}
      >
        <span
          className={cn(
            'gen-drop__value',
            !hasSelection && 'gen-drop__value--empty'
          )}
        >
          {triggerLabel}
        </span>
        <ChevronDown
          size={12}
          strokeWidth={1.5}
          className="gen-drop__chevron"
          data-open={isOpen}
          aria-hidden="true"
        />
      </button>

      {/* Menu — opens upward */}
      {isOpen && (
        <div className="gen-drop__menu gen-drop__menu--format gen-drop__menu--up">
          {FORMAT_CATALOG.map(category => (
            <div key={category.id} className="fmt-menu__group">
              {/* Category label */}
              <span className="fmt-menu__cat-label">{category.label}</span>

              {/* Format rows */}
              {category.formats.map(format => {
                const displayName = category.expandable
                  ? format.label
                  : category.label;
                const sel = findSelection(
                  config.formats,
                  category.id,
                  format.id
                );
                const isSelected = !!sel;
                const count = sel?.count ?? 0;

                return (
                  <div
                    key={format.id}
                    className={cn(
                      'fmt-menu__row',
                      isSelected && 'fmt-menu__row--selected'
                    )}
                  >
                    <span className="fmt-menu__name">{displayName}</span>

                    {!isSelected ? (
                      <button
                        type="button"
                        className="fmt-menu__add"
                        onClick={() =>
                          handleAdd(category.id, format.id, format.minCount)
                        }
                        aria-label={`Agregar ${displayName}`}
                      >
                        <Plus size={12} strokeWidth={2} aria-hidden="true" />
                      </button>
                    ) : (
                      <div className="fmt-menu__stepper">
                        <button
                          type="button"
                          className="fmt-menu__step-btn"
                          onClick={() =>
                            handleStep(
                              category.id,
                              format.id,
                              format.minCount,
                              'down'
                            )
                          }
                          disabled={count <= format.minCount}
                          aria-label={msgs.decrease}
                        >
                          <Minus size={10} strokeWidth={2} aria-hidden="true" />
                        </button>
                        <span className="fmt-menu__count">{count}</span>
                        <button
                          type="button"
                          className="fmt-menu__step-btn"
                          onClick={() =>
                            handleStep(
                              category.id,
                              format.id,
                              format.minCount,
                              'up'
                            )
                          }
                          disabled={count >= FORMAT_STEPPER_MAX}
                          aria-label={msgs.increase}
                        >
                          <Plus size={10} strokeWidth={2} aria-hidden="true" />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Min hint for carousel */}
              {category.id === 'carousel' &&
                isSelected(config.formats, category.id) && (
                  <span className="fmt-menu__hint">
                    {msgs.minHint(category.formats[0].minCount)}
                  </span>
                )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function isSelected(
  formats: FormatSelection[],
  category: FormatCategory
): boolean {
  return formats.some(f => f.category === category);
}
