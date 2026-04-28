'use client';

import { useState } from 'react';
import {
  Layers,
  Wand2,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';
import '@/styles/domains/pruebas/pruebas.css';

/* ── Nav items data ──────────────────────────────────── */

const NAV_ITEMS = [
  { icon: Layers, label: 'Mis proyectos', active: true },
  { icon: Wand2, label: 'Generador', active: false },
  { icon: ShieldCheck, label: 'Admin', active: false },
  { icon: LayoutDashboard, label: 'Dashboard', active: false },
  { icon: Settings, label: 'Ajustes', active: false }
];

/* ── Sidebar variants config ─────────────────────────── */

const VARIANTS = [
  {
    id: 1,
    cls: 'sb-v1',
    name: 'Azul · flotante',
    tag: 'Brand blue · pill radius · shadow'
  },
  {
    id: 2,
    cls: 'sb-v2',
    name: 'Blanco · flotante',
    tag: 'White · pill radius · shadow'
  },
  {
    id: 3,
    cls: 'sb-v3',
    name: 'Navy · fijo',
    tag: 'Dark navy · full edge · no radius'
  },
  {
    id: 4,
    cls: 'sb-v4',
    name: 'Gris · fijo',
    tag: 'Light grey · divider right · white active card'
  },
  {
    id: 5,
    cls: 'sb-v5',
    name: 'Azul degradado · fijo',
    tag: 'Gradient blue · full edge'
  }
];

/* ── Sidebar component ───────────────────────────────── */

interface SidebarProps {
  variantCls: string;
  isCollapsed: boolean;
  onToggle: () => void;
}

function Sidebar({ variantCls, isCollapsed, onToggle }: SidebarProps) {
  return (
    <aside className={cn('sb', variantCls, isCollapsed && 'sb--collapsed')}>
      {/* Logo */}
      <div className="sb__logo">
        <img
          src="/Assets/Burbujas.svg"
          alt="Perfect Store"
          className="sb__logo-bubbles"
          width={20}
          height={22}
        />
        {!isCollapsed && <span className="sb__logo-text">Perfect Store</span>}
      </div>

      {/* Nav */}
      <nav className="sb__nav" aria-label="Navegación principal">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href="#"
              onClick={e => e.preventDefault()}
              className={cn(
                'sb__item',
                item.active && 'sb__item--active',
                isCollapsed && 'sb__item--collapsed'
              )}
            >
              <Icon
                size={isCollapsed ? 18 : 16}
                strokeWidth={1.5}
                className="sb__item-icon"
                aria-hidden="true"
              />
              <span className="sb__item-label">{item.label}</span>
            </a>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        className={cn('sb__collapse-btn', isCollapsed && 'sb__item--collapsed')}
        onClick={onToggle}
        aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
      >
        {isCollapsed ? (
          <ChevronRight size={16} strokeWidth={1.5} aria-hidden="true" />
        ) : (
          <>
            <ChevronLeft size={15} strokeWidth={1.5} aria-hidden="true" />
            <span>Colapsar</span>
          </>
        )}
      </button>
    </aside>
  );
}

/* ── Mock content ────────────────────────────────────── */

function MockContent() {
  return (
    <div className="preview-content">
      <div className="preview-content__bar preview-content__bar--short" />
      <div className="preview-content__bar preview-content__bar--medium" />
      <div className="preview-content__card" />
      <div className="preview-content__bar preview-content__bar--full" />
      <div className="preview-content__card" style={{ flex: '2' }} />
    </div>
  );
}

/* ── Page ────────────────────────────────────────────── */

export default function PruebasPage() {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});

  function toggleVariant(id: number) {
    setCollapsed(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div className="pruebas-page">
      <div className="pruebas-page__header">
        <h1 className="pruebas-page__title">Pruebas · Sidebar</h1>
        <p className="pruebas-page__sub">
          5 variantes de barra lateral — haz clic en «Colapsar» dentro de cada
          una para probar el estado reducido
        </p>
      </div>

      <div className="pruebas-grid">
        {VARIANTS.map(variant => {
          const isCollapsed = !!collapsed[variant.id];
          return (
            <div key={variant.id} className="preview-card">
              <div className="preview-card__label">
                <div>
                  <p className="preview-card__name">{variant.name}</p>
                </div>
                <button
                  type="button"
                  className="preview-card__toggle"
                  onClick={() => toggleVariant(variant.id)}
                >
                  {isCollapsed ? (
                    <ChevronRight size={10} />
                  ) : (
                    <ChevronLeft size={10} />
                  )}
                  {isCollapsed ? 'Expandir' : 'Colapsar'}
                </button>
              </div>
              <div className="preview-layout">
                <Sidebar
                  variantCls={variant.cls}
                  isCollapsed={isCollapsed}
                  onToggle={() => toggleVariant(variant.id)}
                />
                <MockContent />
              </div>
              <div
                style={{
                  padding: '8px 14px',
                  fontFamily: 'var(--font-montserrat)',
                  fontSize: '10px',
                  color: '#AAAAAA',
                  borderTop: '1px solid #EAECEF'
                }}
              >
                {variant.tag}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
