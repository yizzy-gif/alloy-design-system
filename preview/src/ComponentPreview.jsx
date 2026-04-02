/* ─────────────────────────────────────────────────────────────────────────────
   Alloy · Component Preview
   Responsive shell — left sidebar on desktop, top-nav + drawer on mobile
   ───────────────────────────────────────────────────────────────────────────── */

import { useState, useRef, useEffect } from 'react'
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
]

const ALL_TABS = GROUPS.flatMap(g => g.items)

/* ── Icon atoms ──────────────────────────────────────────────────────────────── */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="6.5" cy="6.5" r="4" />
    <path d="M10 10l3 3" strokeLinecap="round" />
  </svg>
)
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M3 3l10 10M13 3L3 13" />
  </svg>
)
const HamburgerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M2 4h14M2 9h14M2 14h14" />
  </svg>
)
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4 12H2M22 12h-2M6.3 6.3L4.9 4.9M19.1 19.1l-1.4-1.4M17.7 6.3l1.4-1.4M4.9 19.1l1.4-1.4" />
  </svg>
)
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
  </svg>
)

/* ── Shell ───────────────────────────────────────────────────────────────────── */
export default function ComponentPreview() {
  const [activeTab, setActiveTab]   = useState('button')
  const [isDark, setIsDark]         = useState(false)
  const [search, setSearch]         = useState('')
  const [menuOpen, setMenuOpen]     = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchInputRef              = useRef(null)
  const mobileSearchRef             = useRef(null)

  const ActiveComponent = ALL_TABS.find(t => t.id === activeTab)?.component

  const filteredGroups = search.trim()
    ? GROUPS
        .map(g => ({
          ...g,
          items: g.items.filter(t => t.label.toLowerCase().includes(search.toLowerCase())),
        }))
        .filter(g => g.items.length > 0)
    : GROUPS

  /* Focus search input when opened */
  useEffect(() => {
    if (searchOpen && mobileSearchRef.current) mobileSearchRef.current.focus()
  }, [searchOpen])

  /* Close drawer on Escape */
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') { setMenuOpen(false); setSearchOpen(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* Close drawer when a nav item is selected on mobile */
  function selectTab(id) {
    setActiveTab(id)
    setMenuOpen(false)
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; }

        button:focus, button:focus-visible,
        [role="tab"]:focus, [role="tab"]:focus-visible,
        [role="button"]:focus, [role="button"]:focus-visible {
          outline: none !important; box-shadow: none !important;
        }

        /* ─────────────── Layout ─────────────── */
        .preview-shell {
          display: flex;
          min-height: 100vh;
        }

        /* ─────────────── Desktop sidebar ─────────────── */
        .preview-sidebar {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 220px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          background: var(--color-bg-primary);
          border-right: 1px solid var(--color-border-opaque);
          padding: 20px 10px;
          overflow-y: auto;
        }

        .preview-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding: 0 6px;
          flex-shrink: 0;
        }

        .preview-wordmark {
          font-family: var(--font-sans);
          font-size: var(--text-sm);
          font-weight: var(--font-weight-semibold);
          color: var(--color-content-primary);
          letter-spacing: var(--tracking-tight);
        }

        /* ─────────────── Dark/light icon toggle ─────────────── */
        .preview-theme-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border-opaque);
          background: var(--color-bg-secondary);
          color: var(--color-content-secondary);
          cursor: pointer;
          transition:
            background var(--duration-fast) var(--ease-default),
            color var(--duration-fast) var(--ease-default);
          flex-shrink: 0;
        }
        .preview-theme-btn:hover {
          background: var(--color-bg-tertiary);
          color: var(--color-content-primary);
        }

        /* ─────────────── Sidebar search ─────────────── */
        .preview-search-wrap {
          position: relative;
          margin-bottom: 14px;
          flex-shrink: 0;
        }
        .preview-search-icon-pos {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-content-disabled);
          pointer-events: none;
          display: flex;
          align-items: center;
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
        .preview-search-input::placeholder { color: var(--color-content-disabled); }
        .preview-search-input:focus { border-color: var(--color-border-selected); }

        /* ─────────────── Nav groups / items ─────────────── */
        .preview-nav-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin-bottom: 18px;
        }
        .preview-nav-group:last-child { margin-bottom: 0; }

        .preview-sidebar-label {
          font-family: var(--font-sans);
          font-size: 10px;
          font-weight: var(--font-weight-semibold);
          letter-spacing: var(--tracking-wider);
          text-transform: uppercase;
          color: var(--color-content-disabled);
          padding: 0 8px;
          margin-bottom: 2px;
          display: block;
        }

        .preview-nav-item {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 6px 10px;
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
        .preview-nav-item[aria-selected="true"] {
          background: var(--color-bg-tertiary);
          color: var(--color-content-primary);
          font-weight: var(--font-weight-semibold);
        }

        .preview-no-results {
          font-family: var(--font-sans);
          font-size: var(--text-xs);
          color: var(--color-content-disabled);
          padding: 8px;
        }

        /* ─────────────── Content pane ─────────────── */
        .preview-content {
          flex: 1;
          min-width: 0;
          overflow-y: auto;
        }

        /* ─────────────── Mobile top-nav ─────────────── */
        .preview-topnav {
          display: none;
        }

        /* ─────────────── Drawer overlay ─────────────── */
        .preview-drawer-overlay {
          display: none;
        }
        .preview-drawer {
          display: none;
        }

        /* ─────────────── Mobile search bar ─────────────── */
        .preview-mobile-search-bar {
          display: none;
        }

        /* ─────────────── Responsive ─────────────── */
        @media (max-width: 768px) {

          .preview-shell {
            flex-direction: column;
          }

          /* Hide sidebar on mobile */
          .preview-sidebar {
            display: none;
          }

          /* Show top-nav */
          .preview-topnav {
            display: flex;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
            height: 52px;
            padding: 0 16px;
            background: var(--color-bg-primary);
            border-bottom: 1px solid var(--color-border-opaque);
            gap: 8px;
            flex-shrink: 0;
          }

          .preview-topnav-wordmark {
            font-family: var(--font-sans);
            font-size: var(--text-sm);
            font-weight: var(--font-weight-semibold);
            color: var(--color-content-primary);
            letter-spacing: var(--tracking-tight);
            flex: 1;
          }

          .preview-topnav-actions {
            display: flex;
            align-items: center;
            gap: 6px;
          }

          .preview-icon-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: var(--radius-md);
            border: none;
            background: none;
            color: var(--color-content-secondary);
            cursor: pointer;
            transition:
              background var(--duration-fast) var(--ease-default),
              color var(--duration-fast) var(--ease-default);
          }
          .preview-icon-btn:hover {
            background: var(--color-bg-secondary);
            color: var(--color-content-primary);
          }
          .preview-icon-btn[aria-pressed="true"] {
            background: var(--color-bg-secondary);
            color: var(--color-content-primary);
          }

          /* Mobile search bar (full-width, below top-nav) */
          .preview-mobile-search-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            background: var(--color-bg-primary);
            border-bottom: 1px solid var(--color-border-opaque);
            position: sticky;
            top: 52px;
            z-index: 99;
          }
          .preview-mobile-search-bar.hidden {
            display: none;
          }
          .preview-mobile-search-input {
            flex: 1;
            height: 34px;
            padding: 0 10px 0 32px;
            border-radius: var(--radius-md);
            border: 1px solid var(--color-border-selected);
            background: var(--color-bg-secondary);
            font-family: var(--font-sans);
            font-size: var(--text-sm);
            color: var(--color-content-primary);
            outline: none;
          }
          .preview-mobile-search-input::placeholder { color: var(--color-content-disabled); }
          .preview-mobile-search-icon {
            position: absolute;
            left: 26px;
            color: var(--color-content-disabled);
            pointer-events: none;
            display: flex;
            align-items: center;
          }

          /* Drawer overlay (backdrop) */
          .preview-drawer-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.35);
            z-index: 200;
            opacity: 0;
            pointer-events: none;
            transition: opacity var(--duration-base) var(--ease-default);
          }
          .preview-drawer-overlay.open {
            opacity: 1;
            pointer-events: all;
          }

          /* Drawer panel */
          .preview-drawer {
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            width: 280px;
            max-width: 85vw;
            background: var(--color-bg-primary);
            border-right: 1px solid var(--color-border-opaque);
            z-index: 201;
            padding: 0;
            transform: translateX(-100%);
            transition: transform var(--duration-base) var(--ease-default);
            overflow: hidden;
          }
          .preview-drawer.open {
            transform: translateX(0);
          }

          .preview-drawer-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 16px;
            border-bottom: 1px solid var(--color-border-opaque);
            flex-shrink: 0;
          }
          .preview-drawer-title {
            font-family: var(--font-sans);
            font-size: var(--text-sm);
            font-weight: var(--font-weight-semibold);
            color: var(--color-content-primary);
          }

          .preview-drawer-body {
            flex: 1;
            overflow-y: auto;
            padding: 12px 10px;
          }

          .preview-content {
            flex: 1;
            min-width: 0;
            overflow-y: auto;
          }
        }
      `}</style>

      <div className={isDark ? 'preview-shell dark' : 'preview-shell'}>

        {/* ── Desktop sidebar ────────────────────────────────────────────── */}
        <nav className="preview-sidebar" role="tablist" aria-label="Component previews">
          <div className="preview-sidebar-header">
            <span className="preview-wordmark">Alloy</span>
            <button
              className="preview-theme-btn"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setIsDark(d => !d)}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          {/* Search */}
          <div className="preview-search-wrap">
            <span className="preview-search-icon-pos"><SearchIcon /></span>
            <input
              ref={searchInputRef}
              className="preview-search-input"
              type="search"
              placeholder="Search…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {filteredGroups.length === 0 && <p className="preview-no-results">No results</p>}

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

        {/* ── Mobile top-nav ─────────────────────────────────────────────── */}
        <header className="preview-topnav" aria-label="Component previews navigation">
          <span className="preview-topnav-wordmark">Alloy</span>
          <div className="preview-topnav-actions">
            {/* Search icon */}
            <button
              className="preview-icon-btn"
              aria-label="Search components"
              aria-pressed={searchOpen}
              onClick={() => setSearchOpen(s => !s)}
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
            {/* Dark/light toggle */}
            <button
              className="preview-icon-btn"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={() => setIsDark(d => !d)}
            >
              {isDark ? <SunIcon /> : <MoonIcon />}
            </button>
            {/* Hamburger */}
            <button
              className="preview-icon-btn"
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <HamburgerIcon />
            </button>
          </div>
        </header>

        {/* Mobile search bar (slides in below top-nav) */}
        <div className={`preview-mobile-search-bar${searchOpen ? '' : ' hidden'}`} style={{ position: 'relative' }}>
          <span className="preview-mobile-search-icon"><SearchIcon /></span>
          <input
            ref={mobileSearchRef}
            className="preview-mobile-search-input"
            type="search"
            placeholder="Search components…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* ── Drawer overlay ─────────────────────────────────────────────── */}
        <div
          className={`preview-drawer-overlay${menuOpen ? ' open' : ''}`}
          aria-hidden="true"
          onClick={() => setMenuOpen(false)}
        />

        {/* ── Drawer panel ───────────────────────────────────────────────── */}
        <div
          className={`preview-drawer${menuOpen ? ' open' : ''}`}
          role="dialog"
          aria-modal="true"
          aria-label="Component navigation"
        >
          <div className="preview-drawer-header">
            <span className="preview-drawer-title">Components</span>
            <button
              className="preview-icon-btn"
              aria-label="Close navigation"
              onClick={() => setMenuOpen(false)}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="preview-drawer-body">
            {GROUPS.map(group => (
              <div key={group.label} className="preview-nav-group">
                <span className="preview-sidebar-label">{group.label}</span>
                {group.items.map(tab => (
                  <button
                    key={tab.id}
                    role="tab"
                    className="preview-nav-item"
                    aria-selected={activeTab === tab.id}
                    onClick={() => selectTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Active preview ─────────────────────────────────────────────── */}
        <div className="preview-content">
          {ActiveComponent && <ActiveComponent />}
        </div>

      </div>
    </>
  )
}
