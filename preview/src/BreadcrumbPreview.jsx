/* ─────────────────────────────────────────────────────────────────────────────
   Alloy · Breadcrumb Preview
   Slash · Chevron · With icon · Without icon · Current-page state · Dark mode
   ───────────────────────────────────────────────────────────────────────────── */

/* ── Icons ─────────────────────────────────────────────────────────────────── */

const HomeLineIcon = ({ size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 21V15H15V21" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronRightSmIcon = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 6L15 12L9 18" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

/* ── Breadcrumb mirror ──────────────────────────────────────────────────────── */

function Breadcrumb({ items = [], separator = 'slash' }) {
  return (
    <nav aria-label="Breadcrumb" style={{ fontFamily: 'var(--font-sans)' }}>
      <ol style={{ display: 'flex', alignItems: 'center', gap: 6, listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap' }}>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1
          const isClickable = !isCurrent && (!!item.href || !!item.onClick)

          const labelStyle = {
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
            lineHeight: 'var(--line-height-snug)',
            letterSpacing: 'var(--tracking-tight)',
            color: isCurrent ? 'var(--color-content-tertiary)' : 'var(--color-content-primary)',
            textDecoration: (isClickable || (!isCurrent && !isClickable)) && !isCurrent ? 'underline' : 'none',
            textUnderlineOffset: 2,
            whiteSpace: 'nowrap',
            cursor: isClickable ? 'pointer' : 'default',
          }

          const separatorStyle = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 20,
            color: 'var(--color-content-tertiary)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
            userSelect: 'none',
            flexShrink: 0,
          }

          return (
            <li key={index} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {index > 0 && (
                <span aria-hidden="true" style={separatorStyle}>
                  {separator === 'chevron'
                    ? <ChevronRightSmIcon size={12} />
                    : '/'}
                </span>
              )}
              {isClickable ? (
                <a
                  href={item.href || '#'}
                  onClick={e => { e.preventDefault(); item.onClick?.() }}
                  style={{ ...labelStyle, textDecoration: 'underline' }}
                >
                  {item.icon && (
                    <span className="alloy-icon-slot" style={{ width: 16, height: 16, flexShrink: 0 }}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </a>
              ) : (
                <span style={labelStyle} aria-current={isCurrent ? 'page' : undefined}>
                  {item.icon && (
                    <span className="alloy-icon-slot" style={{ width: 16, height: 16, flexShrink: 0 }}>
                      {item.icon}
                    </span>
                  )}
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

/* ── Preview shell ──────────────────────────────────────────────────────────── */

function Section({ title, note, children }) {
  return (
    <section style={{ background: 'var(--color-bg-primary)', border: '1px solid var(--color-border-opaque)', borderRadius: 'var(--radius-xl)', padding: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--color-content-disabled)', margin: '0 0 4px' }}>{title}</p>
        {note && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-sm)', color: 'var(--color-content-tertiary)', margin: 0, lineHeight: 1.5 }}>{note}</p>}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>{children}</div>
    </section>
  )
}

function Row({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-content-disabled)', letterSpacing: 'var(--tracking-wide)', margin: 0 }}>{label}</p>}
      {children}
    </div>
  )
}

/* ── Demo data ──────────────────────────────────────────────────────────────── */

const home = { label: 'Home', href: '/', icon: <HomeLineIcon size={16} /> }
const settings = { label: 'Settings', href: '/settings' }
const profile = { label: 'Profile', href: '/profile' }
const account = { label: 'Account' /* no href = current */ }

export default function BreadcrumbPreview() {
  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; }

        .alloy-icon-slot { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .alloy-icon-slot > svg, .alloy-icon-slot > svg * { stroke-width: 1.75; }
        .alloy-icon-slot > svg { display: block; width: 100%; height: 100%; }

        a { color: inherit; }

      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--color-bg-secondary)', fontFamily: 'var(--font-sans)', padding: '48px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--color-content-disabled)', marginBottom: 6 }}>Alloy Design System</p>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-weight-regular)', lineHeight: 'var(--line-height-snug)', color: 'var(--color-content-primary)', marginBottom: 8 }}>Breadcrumb</h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-content-tertiary)', lineHeight: 1.6 }}>slash & chevron separators · optional leading icon · current-page state · aria-current</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Slash separator */}
          <Section title="Slash separator" note="Default — / character, 20px wide, centered">
            <Row label="3 items — home icon on first">
              <Breadcrumb separator="slash" items={[home, settings, account]} />
            </Row>
            <Row label="3 items — no icons">
              <Breadcrumb separator="slash" items={[
                { label: 'Dashboard', href: '/' },
                { label: 'Users', href: '/users' },
                { label: 'Edit profile' },
              ]} />
            </Row>
            <Row label="2 items">
              <Breadcrumb separator="slash" items={[
                { label: 'Home', href: '/', icon: <HomeLineIcon size={16} /> },
                { label: 'Notifications' },
              ]} />
            </Row>
            <Row label="1 item — no separators">
              <Breadcrumb separator="slash" items={[{ label: 'Home', icon: <HomeLineIcon size={16} /> }]} />
            </Row>
          </Section>

          {/* Chevron separator */}
          <Section title="Chevron separator" note="Chevron › replaces the slash — same sizing and spacing">
            <Row label="3 items — home icon on first">
              <Breadcrumb separator="chevron" items={[home, settings, account]} />
            </Row>
            <Row label="3 items — no icons">
              <Breadcrumb separator="chevron" items={[
                { label: 'Dashboard', href: '/' },
                { label: 'Projects', href: '/projects' },
                { label: 'Alloy Design Kit' },
              ]} />
            </Row>
            <Row label="4 items">
              <Breadcrumb separator="chevron" items={[
                { label: 'Home', href: '/', icon: <HomeLineIcon size={16} /> },
                { label: 'Settings', href: '/settings' },
                { label: 'Privacy', href: '/settings/privacy' },
                { label: 'Data & cookies' },
              ]} />
            </Row>
          </Section>

          {/* With icons */}
          <Section title="With leading icon" note="Icon is wrapped in alloy-icon-slot — stroke-width follows the artwork system">
            <Row label="home icon on first item only">
              <Breadcrumb separator="slash" items={[
                { label: 'Home', href: '/', icon: <HomeLineIcon size={16} /> },
                { label: 'Account', href: '/account' },
                { label: 'Profile' },
              ]} />
            </Row>
            <Row label="home icon on every item">
              <Breadcrumb separator="slash" items={[
                { label: 'Home', href: '/', icon: <HomeLineIcon size={16} /> },
                { label: 'Settings', href: '/settings', icon: <HomeLineIcon size={16} /> },
                { label: 'Profile', icon: <HomeLineIcon size={16} /> },
              ]} />
            </Row>
          </Section>

          {/* Current page */}
          <Section title="Current page state" note="Last item has no href — renders as non-interactive with tertiary color and no underline">
            <Row label="middle item is clickable, last is current">
              <Breadcrumb separator="slash" items={[home, profile, account]} />
            </Row>
            <Row label="first two clickable">
              <Breadcrumb separator="chevron" items={[
                { label: 'Home', href: '/', icon: <HomeLineIcon size={16} /> },
                { label: 'Reports', href: '/reports' },
                { label: 'Q4 2025 Summary' },
              ]} />
            </Row>
          </Section>

        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--color-border-opaque)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-content-disabled)', letterSpacing: 'var(--tracking-wide)' }}>Alloy — Breadcrumb v1</span>
        </div>

      </div>
    </>
  )
}
