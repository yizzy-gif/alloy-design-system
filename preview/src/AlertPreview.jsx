/* ─────────────────────────────────────────────────────────────────────────────
   Alloy · Alert / Notification / Toast Preview
   Status: error · warning · success · info · feature
   Variants: lighter · stroke   Sizes: sm · lg
   ───────────────────────────────────────────────────────────────────────────── */

import { useState } from 'react'

/* ── Badge icons — stroke="currentColor", no hardcoded strokeWidth (alloy-icon-slot controls it) */

const BadgeXIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeLinecap="round" />
  </svg>
)
const BadgeCheckIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1.5 5L3.5 7.5L8.5 2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
// alert.svg paths scaled from 24→10 (×0.4167) — exclamation mark (warning)
const BadgeAlertIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M5 1.667V6.405M5 8.333H5.002" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
// info.svg paths scaled from 24→10 (×0.4167) — lowercase i (info + feature)
const BadgeInfoIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M5 8.333V3.595M5 1.667H5.002" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const XCloseIcon = () => (
  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true">
    <path d="M1.5 1.5L8.5 8.5M8.5 1.5L1.5 8.5" stroke="currentColor" strokeLinecap="round" />
  </svg>
)

const BADGE_ICONS = {
  error:   BadgeXIcon,
  warning: BadgeAlertIcon,
  success: BadgeCheckIcon,
  info:    BadgeInfoIcon,
  feature: BadgeInfoIcon,
}

/* ── Token maps (CSS custom properties) ──────────────────────────────────────── */

const BADGE_BG = {
  error:   'var(--color-error-fill)',
  warning: 'var(--color-warning-fill)',
  success: 'var(--color-success-fill)',
  info:    'var(--color-blue-bg-secondary)',
  feature: 'var(--color-slate-bg-secondary)',
}

const LIGHTER_BG = {
  error:   'var(--color-error-bg)',
  warning: 'var(--color-warning-bg)',
  success: 'var(--color-success-bg)',
  info:    'var(--color-blue-bg-tertiary)',
  feature: 'var(--color-slate-bg-tertiary)',
}

const LIGHTER_BORDER = {
  error:   'var(--color-error-border)',
  warning: 'var(--color-warning-border)',
  success: 'var(--color-success-border)',
  info:    'var(--color-blue-border-tertiary)',
  feature: 'var(--color-slate-border-tertiary)',
}

const ACTION_COLOR = {
  error:   'var(--color-error-content)',
  warning: 'var(--color-warning-content)',
  success: 'var(--color-success-content)',
  info:    'var(--color-blue-content-secondary)',
  feature: 'var(--color-slate-content-secondary)',
}

/* ── Alert mirror component ──────────────────────────────────────────────────── */

function Alert({
  status   = 'info',
  variant  = 'lighter',
  size     = 'sm',
  title    = 'Insert your alert title here!',
  description,
  action,
  onAction,
  learnMore,
  onLearnMore,
  onDismiss,
  style: extraStyle,
}) {
  const BadgeIcon = BADGE_ICONS[status]
  const isLg = size === 'lg'

  const rootStyle = {
    display: 'flex',
    alignItems: isLg ? 'flex-start' : 'center',
    gap: isLg ? 12 : 8,
    padding: 12,
    border: '1px solid',
    borderRadius: 6,
    boxShadow: 'var(--shadow-below-md)',
    overflow: 'hidden',
    fontFamily: 'var(--font-sans)',
    background: variant === 'lighter' ? LIGHTER_BG[status] : 'var(--color-bg-primary)',
    borderColor: variant === 'lighter' ? LIGHTER_BORDER[status] : 'var(--color-border-opaque)',
    ...extraStyle,
  }

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: 20,
    height: 20,
    borderRadius: '50%',
    background: BADGE_BG[status],
  }

  // 10×10 icon slot inside the badge — alloy-icon-slot handles stroke-width via CSS
  const badgeIconSlotStyle = {
    width: 10,
    height: 10,
    color: 'white',
  }

  const titleStyle = {
    flex: isLg ? undefined : '1 0 0',
    minWidth: 0,
    margin: 0,
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-snug)',
    color: 'var(--color-content-primary)',
    letterSpacing: 'var(--tracking-tight)',
    overflow: 'hidden',
    textOverflow: isLg ? undefined : 'ellipsis',
    whiteSpace: isLg ? 'normal' : 'nowrap',
  }

  const descStyle = {
    margin: 0,
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-regular)',
    lineHeight: 'var(--line-height-snug)',
    color: 'var(--color-content-tertiary)',
  }

  const actionBase = {
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'var(--font-sans)',
    fontSize: 'var(--text-sm)',
    fontWeight: 'var(--font-weight-medium)',
    lineHeight: 'var(--line-height-snug)',
    letterSpacing: 'var(--tracking-tight)',
    cursor: 'pointer',
  }

  const dismissBtn = onDismiss ? (
    <button
      type="button"
      onClick={onDismiss}
      aria-label="Dismiss"
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, width: 24, height: 24, padding: 5,
        background: 'none', border: 'none', borderRadius: '50%',
        color: 'var(--color-content-tertiary)', cursor: 'pointer',
      }}
    >
      <XCloseIcon />
    </button>
  ) : null

  return (
    <div role="alert" style={rootStyle}>
      {/* Status badge — alloy-icon-slot wrapper makes CSS stroke-width apply */}
      <span style={badgeStyle} aria-hidden="true">
        <span className="alloy-icon-slot" style={badgeIconSlotStyle}>
          <BadgeIcon />
        </span>
      </span>

      {isLg ? (
        /* Large: content column */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: '1 0 0', minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={titleStyle}>{title}</p>
            {description && <p style={descStyle}>{description}</p>}
          </div>

          {(action || learnMore) && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {action && (
                <button type="button" onClick={onAction} style={{ ...actionBase, color: ACTION_COLOR[status] }}>
                  {action}
                </button>
              )}
              {action && learnMore && (
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-content-tertiary)', padding: '0 4px', userSelect: 'none' }}>·</span>
              )}
              {learnMore && (
                <button type="button" onClick={onLearnMore} style={{ ...actionBase, color: 'var(--color-content-tertiary)' }}>
                  {learnMore}
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Small: inline title (flex-1) */
        <p style={titleStyle}>{title}</p>
      )}

      {/* Trailing */}
      {isLg ? dismissBtn : (
        (action || onDismiss) && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
            {action && (
              <button type="button" onClick={onAction} style={{ ...actionBase, color: ACTION_COLOR[status] }}>
                {action}
              </button>
            )}
            {dismissBtn}
          </div>
        )
      )}
    </div>
  )
}

/* ── Preview shell ────────────────────────────────────────────────────────────── */

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>{children}</div>
    </div>
  )
}

/* ── Main export ─────────────────────────────────────────────────────────────── */

const STATUSES = ['error', 'warning', 'success', 'info', 'feature']

export default function AlertPreview() {
  const [dismissed, setDismissed] = useState({})
  const dismiss = (key) => setDismissed(d => ({ ...d, [key]: true }))
  const reset   = () => setDismissed({})

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; }
        button { font-family: var(--font-sans); }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--color-bg-secondary)', fontFamily: 'var(--font-sans)', padding: '48px 40px' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <p style={{ fontSize: 'var(--text-xs)', letterSpacing: 'var(--tracking-wider)', textTransform: 'uppercase', color: 'var(--color-content-disabled)', marginBottom: 6 }}>Alloy Design System</p>
          <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-weight-regular)', lineHeight: 'var(--line-height-snug)', color: 'var(--color-content-primary)', marginBottom: 8 }}>Alert / Toast</h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--color-content-tertiary)', lineHeight: 1.6 }}>5 statuses · lighter & stroke variants · sm & lg sizes · action links · dismiss</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Small · Lighter */}
          <Section title="Small · Lighter" note="Single-line title, action link, dismiss — tinted background per status">
            {STATUSES.map(s => (
              <Row key={s} label={s}>
                <Alert status={s} variant="lighter" size="sm" action="Action" onDismiss={() => {}} />
              </Row>
            ))}
          </Section>

          {/* Small · Stroke */}
          <Section title="Small · Stroke" note="White background with opaque border — status indicated by badge only">
            {STATUSES.map(s => (
              <Row key={s} label={s}>
                <Alert status={s} variant="stroke" size="sm" action="Action" onDismiss={() => {}} />
              </Row>
            ))}
          </Section>

          {/* Large · Lighter */}
          <Section title="Large · Lighter" note="Title + description + action links + dismiss">
            {STATUSES.map(s => (
              <Row key={s} label={s}>
                <Alert
                  status={s}
                  variant="lighter"
                  size="lg"
                  description="Insert the alert description here. It would look better as two lines of text."
                  action="Action"
                  learnMore="Learn more"
                  onDismiss={() => {}}
                />
              </Row>
            ))}
          </Section>

          {/* Large · Stroke */}
          <Section title="Large · Stroke">
            {STATUSES.map(s => (
              <Row key={s} label={s}>
                <Alert
                  status={s}
                  variant="stroke"
                  size="lg"
                  description="Insert the alert description here. It would look better as two lines of text."
                  action="Action"
                  learnMore="Learn more"
                  onDismiss={() => {}}
                />
              </Row>
            ))}
          </Section>

          {/* Interactive dismiss */}
          <Section title="Interactive" note="Dismiss removes the alert. Click Reset to restore.">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {STATUSES.map(s => !dismissed[s] && (
                <Alert key={s} status={s} size="sm" action="Action" onDismiss={() => dismiss(s)} />
              ))}
              <button
                type="button"
                onClick={reset}
                style={{ marginTop: 8, alignSelf: 'flex-start', background: 'none', border: '1px solid var(--color-border-opaque)', borderRadius: 'var(--radius-button)', padding: '6px 12px', fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-content-secondary)', cursor: 'pointer' }}
              >
                Reset
              </button>
            </div>
          </Section>

          {/* No trailing / minimal */}
          <Section title="Minimal" note="Title only — no action, no dismiss">
            <Row label="sm · lighter">
              {STATUSES.map(s => (
                <Alert key={s} status={s} size="sm" />
              ))}
            </Row>
            <Row label="lg · lighter">
              {STATUSES.map(s => (
                <Alert key={s} status={s} size="lg" description="Supporting description text goes here." />
              ))}
            </Row>
          </Section>

        </div>

        {/* Footer */}
        <div style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--color-border-opaque)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--text-xs)', color: 'var(--color-content-disabled)', letterSpacing: 'var(--tracking-wide)' }}>Alloy — Alert / Toast v1</span>
        </div>

      </div>
    </>
  )
}
