/* ─────────────────────────────────────────────────────────────────────────────
   Alloy · Component Preview
   Vertical left-sidebar nav shell — one item per component
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'
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

/* ── Tab registry ────────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'button',            label: 'Button',            component: ButtonPreview },
  { id: 'toggle-button',     label: 'Toggle Button',     component: ToggleButtonPreview },
  { id: 'tag',               label: 'Tag & Status',      component: TagPreview },
  { id: 'segmented-control', label: 'Segmented Control', component: SegmentedControlPreview },
  { id: 'tabs',              label: 'Tabs',              component: TabsPreview },
  { id: 'list-item',         label: 'List Item',         component: ListItemPreview },
  { id: 'badge',             label: 'Badge',             component: BadgePreview },
  { id: 'input',             label: 'Input / Field',     component: InputPreview },
  { id: 'pagination',        label: 'Pagination',        component: PaginationPreview },
  { id: 'alert',             label: 'Alert / Toast',     component: AlertPreview },
  { id: 'breadcrumb',        label: 'Breadcrumb',        component: BreadcrumbPreview },
  { id: 'dropdown-menu',     label: 'Dropdown Menu',     component: DropdownMenuPreview },
]

/* ── Shell ───────────────────────────────────────────────────────────────────── */
export default function ComponentPreview() {
  const [activeTab, setActiveTab] = useState('button')
  const ActiveComponent = TABS.find(t => t.id === activeTab)?.component

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; }

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
          width: 200px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          background: var(--color-bg-primary);
          border-right: 1px solid var(--color-border-opaque);
          padding: 24px 12px;
          gap: 2px;
          overflow-y: auto;
        }

        .preview-sidebar-label {
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          font-weight: var(--font-weight-medium);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          color: var(--color-content-disabled);
          padding: 0 8px;
          margin-bottom: 8px;
        }

        /* ─ Nav item ─ */
        .preview-nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 7px 10px;
          border-radius: var(--radius-md);
          border: none;
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
      `}</style>

      <div className="preview-shell">
        {/* Sidebar nav */}
        <nav className="preview-sidebar" role="tablist" aria-label="Component previews">
          <span className="preview-sidebar-label">Components</span>
          {TABS.map(tab => (
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
        </nav>

        {/* Active preview */}
        <div className="preview-content">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </div>
    </>
  )
}
