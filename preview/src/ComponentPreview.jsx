/* ─────────────────────────────────────────────────────────────────────────────
   Alloy · Component Preview
   Vertical left-sidebar nav shell — components grouped by category
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
import ColorTokensPreview      from './ColorTokensPreview.jsx'
import TypographyPreview       from './TypographyPreview.jsx'
import ShadowsPreview          from './ShadowsPreview.jsx'
import SpacingPreview          from './SpacingPreview.jsx'
import ButtonPreview            from './ButtonPreview.jsx'
import ToggleButtonPreview      from './ToggleButtonPreview.jsx'
import TagPreview               from './TagPreview.jsx'
import SegmentedControlPreview  from './SegmentedControlPreview.jsx'
import TabsPreview              from './TabsPreview.jsx'
import ListItemPreview          from './ListItemPreview.jsx'
import BadgePreview             from './BadgePreview.jsx'
import InputPreview             from './InputPreview.jsx'
import PaginationPreview        from './PaginationPreview.jsx'
import AlertPreview             from './AlertPreview.jsx'
import BreadcrumbPreview        from './BreadcrumbPreview.jsx'
import DropdownMenuPreview      from './DropdownMenuPreview.jsx'
import ScrollAreaPreview        from './ScrollAreaPreview.jsx'
import FilterPillPreview        from './FilterPillPreview.jsx'
import ControlsPreview         from './ControlsPreview.jsx'
import TablePreview            from './TablePreview.jsx'
import ChartsPreview           from './ChartsPreview.jsx'
import TooltipPreview          from './TooltipPreview.jsx'
import DataCardPreview            from './DataCardPreview.jsx'
import ValueChangeLabelPreview    from './ValueChangeLabelPreview.jsx'
import DividerPreview             from './DividerPreview.jsx'
import AILoaderPreview         from './AILoaderPreview.jsx'
import TagSpecimen             from '../../specimens/TagSpecimen'
import DialogPreview           from './DialogPreview.jsx'
import AreaButtonPreview       from './AreaButtonPreview.jsx'
import EyebrowPreview          from './EyebrowPreview.jsx'

/* ── Component registry (grouped) ───────────────────────────────────────────── */
const GROUPS = [
  {
    label: 'Foundation',
    items: [
      { id: 'colors',     label: 'Colors',          component: ColorTokensPreview },
      { id: 'typography', label: 'Typography',       component: TypographyPreview },
      { id: 'shadows',    label: 'Shadows',          component: ShadowsPreview },
      { id: 'spacing',    label: 'Spacing & Radius', component: SpacingPreview },
    ],
  },
  {
    label: 'Typography',
    items: [
      { id: 'eyebrow', label: 'Eyebrow', component: EyebrowPreview },
    ],
  },
  {
    label: 'Actions',
    items: [
      { id: 'button',        label: 'Button',        component: ButtonPreview },
      { id: 'toggle-button', label: 'Toggle Button', component: ToggleButtonPreview },
      { id: 'area-button',   label: 'Area Button',   component: AreaButtonPreview },
    ],
  },
  {
    label: 'Navigation',
    items: [
      { id: 'tabs',              label: 'Tabs',              component: TabsPreview },
      { id: 'segmented-control', label: 'Segmented Control', component: SegmentedControlPreview },
      { id: 'breadcrumb',        label: 'Breadcrumb',        component: BreadcrumbPreview },
      { id: 'pagination',        label: 'Pagination',        component: PaginationPreview },
      { id: 'filter-pill',       label: 'Filter Pill',       component: FilterPillPreview },
    ],
  },
  {
    label: 'Form',
    items: [
      { id: 'input',    label: 'Input / Field', component: InputPreview },
      { id: 'controls', label: 'Controls',      component: ControlsPreview },
    ],
  },
  {
    label: 'Data Display',
    items: [
      { id: 'data-card',          label: 'Data Card',          component: DataCardPreview },
      { id: 'value-change-label', label: 'Value Change Label', component: ValueChangeLabelPreview },
      { id: 'charts',    label: 'Charts',       component: ChartsPreview },
      { id: 'table',     label: 'Table',        component: TablePreview },
      { id: 'list-item', label: 'List Item',    component: ListItemPreview },
      { id: 'badge',     label: 'Badge',        component: BadgePreview },
      { id: 'tag',       label: 'Tag & Status', component: TagPreview },
    ],
  },
  {
    label: 'Feedback',
    items: [
      { id: 'alert',         label: 'Alert / Toast', component: AlertPreview },
      { id: 'dialog',        label: 'Dialog',        component: DialogPreview },
      { id: 'dropdown-menu', label: 'Dropdown Menu', component: DropdownMenuPreview },
      { id: 'tooltip',       label: 'Tooltip',       component: TooltipPreview },
    ],
  },
  {
    label: 'Layout',
    items: [
      { id: 'divider',     label: 'Divider',     component: DividerPreview },
      { id: 'scroll-area', label: 'Scroll Area', component: ScrollAreaPreview },
    ],
  },
  {
    label: 'Teambridge AI',
    items: [
      { id: 'ai-loader', label: 'AI Loader', component: AILoaderPreview },
    ],
  },
  {
    label: 'Specimens',
    items: [
      { id: 'specimen-tag', label: 'Tag', component: TagSpecimen },
    ],
  },
]

const ALL_TABS = GROUPS.flatMap(g => g.items)

/* ── Shell ───────────────────────────────────────────────────────────────────── */
export default function ComponentPreview() {
  const [activeTab, setActiveTab] = useState('button')
  const [isDark, setIsDark] = useState(false)
  const [search, setSearch] = useState('')
  const ActiveComponent = ALL_TABS.find(t => t.id === activeTab)?.component

  const filteredGroups = search.trim()
    ? GROUPS
        .map(g => ({
          ...g,
          items: g.items.filter(t => t.label.toLowerCase().includes(search.toLowerCase())),
        }))
        .filter(g => g.items.length > 0)
    : GROUPS

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; }

        /* ─ Global focus outline removal ─ */
        button:focus,
        button:focus-visible,
        [role="tab"]:focus,
        [role="tab"]:focus-visible,
        [role="radio"]:focus,
        [role="radio"]:focus-visible,
        [role="button"]:focus,
        [role="button"]:focus-visible {
          outline: none !important;
          box-shadow: none !important;
        }

        /* ─ Layout ─ */
        .preview-shell {
          display: flex;
          min-height: 100vh;
        }

        /* ─ Sidebar ─ */
        .preview-sidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 240px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          background: var(--color-bg-primary);
          border-right: 1px solid var(--color-border-opaque);
          padding: 24px 12px;
          overflow-y: auto;
        }

        /* ─ Group ─ */
        .preview-nav-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 20px;
        }

        .preview-nav-group:last-child {
          margin-bottom: 0;
        }

        .preview-sidebar-label {
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          color: var(--color-content-disabled);
          padding: 0 8px;
          margin-bottom: 4px;
          display: block;
        }

        /* ─ Nav item ─ */
        .preview-nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 7px 10px;
          border-radius: var(--radius-md);
          border: none;
          outline: none;
          background: none;
          font-family: var(--font-sans);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-medium);
          color: var(--color-content-tertiary);
          text-align: left;
          cursor: pointer;
          transition:
            background-color var(--duration-fast) var(--ease-default),
            color var(--duration-fast) var(--ease-default);
          white-space: nowrap;
        }

        .preview-nav-item:hover {
          background: var(--color-bg-secondary);
          color: var(--color-content-secondary);
        }

        .preview-nav-item:focus,
        .preview-nav-item:focus-visible {
          outline: none;
        }

        .preview-nav-item[aria-selected="true"] {
          background: var(--color-bg-tertiary);
          color: var(--color-content-primary);
          font-weight: var(--font-weight-semibold);
        }

        /* ─ Content pane ─ */
        .preview-content {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
        }

        /* ─ Mode toggle ─ */
        .preview-mode-toggle {
          display: flex;
          align-items: center;
          background: var(--color-bg-secondary);
          border: 1px solid var(--color-border-opaque);
          border-radius: var(--radius-md);
          padding: 2px;
          margin-bottom: 20px;
          flex-shrink: 0;
        }

        .preview-mode-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 26px;
          border: none;
          border-radius: calc(var(--radius-md) - 2px);
          background: none;
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          color: var(--color-content-tertiary);
          cursor: pointer;
          transition:
            background var(--duration-fast) var(--ease-default),
            color var(--duration-fast) var(--ease-default);
        }

        .preview-mode-btn[aria-pressed="true"] {
          background: var(--color-bg-primary);
          color: var(--color-content-primary);
          box-shadow: var(--shadow-below-low);
        }

        /* ─ Sidebar search ─ */
        .preview-search-wrap {
          position: relative;
          margin-bottom: 16px;
          flex-shrink: 0;
        }

        .preview-search-icon {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 14px;
          height: 14px;
          color: var(--color-content-disabled);
          pointer-events: none;
        }

        .preview-search-input {
          width: 100%;
          height: 30px;
          padding: 0 8px 0 28px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-opaque);
          background: var(--color-bg-secondary);
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          color: var(--color-content-primary);
          outline: none;
          transition: border-color var(--duration-fast) var(--ease-default);
        }

        .preview-search-input::placeholder {
          color: var(--color-content-disabled);
        }

        .preview-search-input:focus {
          border-color: var(--color-border-selected);
        }

        .preview-no-results {
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          color: var(--color-content-disabled);
          padding: 8px 8px;
        }
      `}</style>

      <div className={isDark ? 'preview-shell dark' : 'preview-shell'}>
        {/* Sidebar nav */}
        <nav className="preview-sidebar" role="tablist" aria-label="Component previews">
          {/* Light / Dark toggle */}
          <div className="preview-mode-toggle">
            <button
              className="preview-mode-btn"
              aria-pressed={!isDark}
              onClick={() => setIsDark(false)}
            >Light</button>
            <button
              className="preview-mode-btn"
              aria-pressed={isDark}
              onClick={() => setIsDark(true)}
            >Dark</button>
          </div>

          {/* Search */}
          <div className="preview-search-wrap">
            <svg className="preview-search-icon" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="6.5" cy="6.5" r="4" />
              <path d="M10 10l3 3" strokeLinecap="round" />
            </svg>
            <input
              className="preview-search-input"
              type="search"
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {filteredGroups.length === 0 && (
            <p className="preview-no-results">No results</p>
          )}

          {filteredGroups.map(group => (
            <div key={group.label} className="preview-nav-group">
              <span className="preview-sidebar-label">{group.label}</span>
              {group.items.map(tab => (
                <button
                  key={tab.id}
                  role="tab"
                  className="preview-nav-item"
                  aria-selected={activeTab === tab.id}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        {/* Active preview */}
        <div className="preview-content">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </>
  )
}
