/* ─────────────────────────────────────────────────────────────────────────────
   Teambridge AI · ComposerActions Preview
   ───────────────────────────────────────────────────────────────────────────── */

import { useEffect, useRef, useState } from 'react'
import {
  ComposerActions,
  ComposerSendButton,
  ComposerAttachment,
  ComposerVoiceButton,
} from '../../src/components/ComposerActions'
import { useIsMobile } from './useIsMobile.js'

/* ── Shared layout primitives ────────────────────────────────────────────── */
const wrap = {
  minHeight: '100vh',
  backgroundColor: 'var(--color-bg-secondary)',
  fontFamily: 'var(--font-sans)',
  paddingBottom: '80px',
}

const header = { padding: '48px 48px 0', marginBottom: '40px' }

const label = {
  fontSize: 'var(--text-xs)',
  fontWeight: 'var(--font-weight-semibold)',
  letterSpacing: 'var(--tracking-wider)',
  textTransform: 'uppercase',
  color: 'var(--color-content-tertiary)',
  marginBottom: '8px',
}

const title = {
  fontSize: 'var(--text-3xl)',
  fontWeight: 'var(--font-weight-bold)',
  color: 'var(--color-content-primary)',
  margin: '0 0 8px',
}

const subtitle = {
  fontSize: 'var(--text-base)',
  color: 'var(--color-content-secondary)',
  margin: 0,
}

const section = (extra = {}) => ({
  margin: '0 48px 32px',
  backgroundColor: 'var(--color-bg-primary)',
  borderRadius: 'var(--radius-xl)',
  padding: '32px',
  border: '1px solid var(--color-border-opaque)',
  ...extra,
})

const sectionTitle = {
  fontSize: 'var(--text-xs)',
  fontWeight: 'var(--font-weight-semibold)',
  letterSpacing: 'var(--tracking-wider)',
  textTransform: 'uppercase',
  color: 'var(--color-content-tertiary)',
  marginBottom: '24px',
}

const row = (extra = {}) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
  flexWrap: 'wrap',
  ...extra,
})

const cell = (extra = {}) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '10px',
  minWidth: 120,
  ...extra,
})

const cellLabel = {
  fontSize: 'var(--text-xs)',
  color: 'var(--color-content-secondary)',
  fontFamily: 'var(--font-mono)',
}

const cellNote = {
  fontSize: 'var(--text-xs)',
  color: 'var(--color-content-tertiary)',
  maxWidth: 220,
  lineHeight: 1.45,
  fontFamily: 'var(--font-mono)',
}

const divider = {
  height: '1px',
  backgroundColor: 'var(--color-border-opaque)',
  margin: '28px 0',
}

const footer = {
  padding: '40px 48px 0',
  fontSize: 'var(--text-sm)',
  color: 'var(--color-content-tertiary)',
  borderTop: '1px solid var(--color-border-opaque)',
  margin: '0 48px',
}

/* ── State metadata ──────────────────────────────────────────────────────── */

const SEND_STATES = [
  { state: 'hidden',           label: 'hidden',           note: 'Composer empty — not rendered.' },
  { state: 'ready',            label: 'ready',            note: 'Default filled — click to send.' },
  { state: 'disabled-invalid', label: 'disabled-invalid', note: 'Muted — tooltip explains why.', props: { invalidReason: 'Waiting for upload' } },
  { state: 'streaming',        label: 'streaming',        note: 'Icon morphs to stop. Click cancels.' },
  { state: 'error',            label: 'error',            note: 'Retry icon, error accent. Click retries.', props: { errorMessage: 'Network lost' } },
]

const ATTACH_STATES = [
  { state: 'idle',      label: 'idle',      note: 'Paperclip-style plus; opens picker.' },
  { state: 'uploading', label: 'uploading', note: 'Spinner overlay; click cancels.' },
  { state: 'disabled',  label: 'disabled',  note: 'Muted; tooltip explains why.', props: { disabledReason: 'Maximum 5 attachments' } },
  { state: 'error',     label: 'error',     note: 'Red accent border.', props: { errorMessage: 'File too large' } },
]

const VOICE_STATES = [
  { state: 'idle',      label: 'idle',      note: 'Mic icon; click to start recording.' },
  { state: 'recording', label: 'recording', note: 'Icon swaps to waveform. Calm pulse.' },
  { state: 'disabled',  label: 'disabled',  note: 'Permission denied or unavailable.', props: { disabledReason: 'Microphone access required' } },
]

/* ── Composer-in-context mock ─────────────────────────────────────────────
   Replicates just enough of the Automation_2.0 composer card to judge
   placement and alignment of the action row. NOT a shipped primitive. */
function ComposerFrame({ children, value, onChange, inputRef }) {
  return (
    <div style={{
      backgroundColor: 'var(--color-bg-primary)',
      border: '1px solid var(--color-border-opaque)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-2)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
    }}>
      <textarea
        ref={inputRef}
        rows={2}
        value={value ?? ''}
        onChange={onChange}
        placeholder="Ask Teambridge AI…"
        style={{
          width: '100%',
          border: 'none',
          outline: 'none',
          resize: 'none',
          padding: '8px 12px',
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-content-primary)',
          background: 'transparent',
          lineHeight: 'var(--line-height-loose)',
        }}
      />
      <div style={{ padding: '0 var(--space-2) 0' }}>
        {children}
      </div>
    </div>
  )
}

/* ── Choreography matrix — one row per scenario ───────────────────────── */
const CHOREOGRAPHY = [
  { id: 'empty',       desc: 'Composer is empty',                      text: '',             send: 'hidden',           attach: 'idle',      voice: 'idle',      groupDisabled: false },
  { id: 'typing',      desc: 'Composer has valid text',                text: 'Summarize this thread',   send: 'ready', attach: 'idle',      voice: 'idle',      groupDisabled: false },
  { id: 'uploading',   desc: 'Attachment is uploading',                text: '',             send: 'disabled-invalid', attach: 'uploading', voice: 'idle',      groupDisabled: false, invalidReason: 'Waiting for upload' },
  { id: 'streaming',   desc: 'Send is streaming',                      text: 'Generate a Q3 plan',      send: 'streaming', attach: 'disabled', voice: 'disabled',  groupDisabled: false, disabledReason: 'Generating response' },
  { id: 'recording',   desc: 'Voice is recording',                     text: '',             send: 'hidden',           attach: 'disabled',  voice: 'recording', groupDisabled: false, disabledReason: 'Recording voice' },
  { id: 'composer-off',desc: 'Composer disabled (rate-limit, offline)', text: 'Rate limited', send: 'disabled-invalid', attach: 'disabled',  voice: 'disabled',  groupDisabled: true, invalidReason: 'Rate limit reached', disabledReason: 'Rate limit reached' },
]

/* ── Interactive demo — wires the three buttons end-to-end ─────────────── */
function InteractiveComposer() {
  const [text, setText]           = useState('')
  const [sendState, setSendState] = useState('hidden')
  const [attach, setAttach]       = useState('idle')
  const [voice, setVoice]         = useState('idle')
  const [files, setFiles]         = useState([])
  const inputRef = useRef(null)

  // Composer → send state mirrors the choreography matrix's rules.
  useEffect(() => {
    if (voice === 'recording')      setSendState('hidden')
    else if (sendState === 'streaming') { /* hold */ }
    else if (attach === 'uploading') setSendState('disabled-invalid')
    else if (text.trim().length)     setSendState('ready')
    else                             setSendState('hidden')
  }, [text, attach, voice]) // eslint-disable-line react-hooks/exhaustive-deps

  const onSend = () => {
    setSendState('streaming')
    setTimeout(() => {
      setSendState(text.trim() ? 'ready' : 'hidden')
    }, 1800)
  }
  const onStop  = () => setSendState(text.trim() ? 'ready' : 'hidden')
  const onRetry = () => { setSendState('streaming'); setTimeout(() => setSendState('ready'), 1200) }
  const onSelectFiles = (fl) => {
    const list = Array.from(fl).map(f => f.name)
    setFiles(f => [...f, ...list])
    setAttach('uploading')
    setTimeout(() => setAttach('idle'), 1400)
  }
  const onStartRecording = () => setVoice('recording')
  const onStopRecording  = () => setVoice('idle')

  return (
    <div style={{ maxWidth: 560 }}>
      <ComposerFrame
        inputRef={inputRef}
        value={text}
        onChange={e => setText(e.target.value)}
      >
        <ComposerActions
          size="md"
          escapeTarget={inputRef.current}
          onEscape={() => { if (sendState === 'streaming') onStop() }}
        >
          <ComposerAttachment
            state={attach}
            onSelect={onSelectFiles}
            onCancelUpload={() => setAttach('idle')}
          />
          <ComposerVoiceButton
            state={voice}
            onStartRecording={onStartRecording}
            onStopRecording={onStopRecording}
          />
          <ComposerSendButton
            state={sendState}
            onSend={onSend}
            onStop={onStop}
            onRetry={onRetry}
          />
        </ComposerActions>
      </ComposerFrame>

      {files.length > 0 && (
        <p style={{
          marginTop: 12, fontSize: 'var(--text-xs)', color: 'var(--color-content-tertiary)',
          fontFamily: 'var(--font-mono)',
        }}>
          attached: {files.join(', ')}
        </p>
      )}
    </div>
  )
}

/* ── A2.0 baseline reference (static HTML replica of BuilderPage composer) ─── */
function A20BaselineRow() {
  const btnBase = {
    width: 24, height: 24,
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    border: '1px solid var(--color-border-opaque)',
    borderRadius: 6,
    padding: 0,
    cursor: 'pointer',
    transition: 'background var(--duration-fast), color var(--duration-fast)',
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <button aria-label="Add attachment" style={{ ...btnBase,
        background: 'transparent',
        color: 'var(--color-content-secondary)',
      }}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button aria-label="Start voice input" style={{ ...btnBase,
        background: 'var(--color-bg-primary)',
        color: 'var(--color-content-secondary)',
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M20 12V13C20 17.4183 16.4183 21 12 21C7.58172 21 4 17.4183 4 13V12M12 17C9.79086 17 8 15.2091 8 13V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V13C16 15.2091 14.2091 17 12 17Z" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button aria-label="Send message" style={{ ...btnBase,
        background: 'var(--color-bg-inverse-primary)',
        borderColor:'var(--color-bg-inverse-primary)',
        color:      'var(--color-content-inverse-primary)',
      }}>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
          <path d="M12 20V4M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}

/* ── Page ────────────────────────────────────────────────────────────────── */
export default function ComposerActionsPreview() {
  const isMobile = useIsMobile()

  const dynHeader = { ...header, padding: isMobile ? '24px 16px 0' : '48px 48px 0' }
  const dynSection = (extra = {}) => ({
    ...section(extra),
    margin: isMobile ? '0 0 32px' : '0 48px 32px',
    padding: isMobile ? '20px' : '32px',
  })
  const dynFooter = { ...footer, padding: isMobile ? '40px 16px 0' : '40px 48px 0', margin: isMobile ? '0 0' : '0 48px' }
  const dynRow = (extra = {}) => ({ ...row(extra), gap: isMobile ? '16px' : '28px' })

  return (
    <div style={wrap}>
      <div style={dynHeader}>
        <p style={label}>Teambridge AI</p>
        <h1 style={title}>Composer Actions</h1>
        <p style={subtitle}>
          The three action buttons that live inside the chat composer — attachment, voice, send — plus the
          group container that owns layout, shared sizing, and cross-action choreography. Idle visuals are
          inherited 1:1 from the Automation&nbsp;2.0 builder composer.
        </p>
      </div>

      {/* ── Interactive ── */}
      <div style={dynSection()}>
        <p style={sectionTitle}>Interactive</p>
        <p style={{ ...cellNote, maxWidth: 480, marginBottom: 20 }}>
          Type to enable send. Click send to kick off a fake 1.8s stream — the icon morphs to stop.
          Click attach to pick files (upload simulates for 1.4s). Click mic to toggle the recording icon.
          Escape while streaming cancels.
        </p>
        <InteractiveComposer />
      </div>

      {/* ── Send states ── */}
      <div style={dynSection()}>
        <p style={sectionTitle}>Send button · states</p>
        <div style={dynRow({ alignItems: 'flex-start' })}>
          {SEND_STATES.map(s => (
            <div key={s.state} style={cell()}>
              <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ComposerActions size="md">
                  <ComposerSendButton state={s.state} {...(s.props || {})} />
                </ComposerActions>
              </div>
              <span style={{ ...cellLabel, color: 'var(--color-content-primary)', fontWeight: 'var(--font-weight-semibold)' }}>{s.label}</span>
              <span style={cellNote}>{s.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Attachment states ── */}
      <div style={dynSection()}>
        <p style={sectionTitle}>Attachment · states</p>
        <div style={dynRow({ alignItems: 'flex-start' })}>
          {ATTACH_STATES.map(s => (
            <div key={s.state} style={cell()}>
              <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ComposerActions size="md">
                  <ComposerAttachment state={s.state} {...(s.props || {})} />
                </ComposerActions>
              </div>
              <span style={{ ...cellLabel, color: 'var(--color-content-primary)', fontWeight: 'var(--font-weight-semibold)' }}>{s.label}</span>
              <span style={cellNote}>{s.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Voice states ── */}
      <div style={dynSection()}>
        <p style={sectionTitle}>Voice · states</p>
        <div style={dynRow({ alignItems: 'flex-start' })}>
          {VOICE_STATES.map(s => (
            <div key={s.state} style={cell()}>
              <div style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ComposerActions size="md">
                  <ComposerVoiceButton state={s.state} {...(s.props || {})} />
                </ComposerActions>
              </div>
              <span style={{ ...cellLabel, color: 'var(--color-content-primary)', fontWeight: 'var(--font-weight-semibold)' }}>{s.label}</span>
              <span style={cellNote}>{s.note}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Group choreography matrix ── */}
      <div style={dynSection()}>
        <p style={sectionTitle}>Group choreography matrix</p>
        <p style={{ ...cellNote, maxWidth: 520, marginBottom: 20 }}>
          One row per scenario from the spec. Individual buttons don't know about each other —
          the parent composer passes the right state to each. These rows are what consumers should match.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {CHOREOGRAPHY.map(c => (
            <div key={c.id} style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
              gap: 20,
              alignItems: 'center',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-opaque)',
              backgroundColor: 'var(--color-bg-secondary)',
            }}>
              <div>
                <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-weight-semibold)', color: 'var(--color-content-primary)' }}>{c.desc}</div>
                <div style={{ ...cellNote, marginTop: 4 }}>
                  send <code>{c.send}</code> · attach <code>{c.attach}</code> · voice <code>{c.voice}</code>
                </div>
              </div>
              <ComposerFrame value={c.text} onChange={() => {}}>
                <ComposerActions size="md" disabled={c.groupDisabled}>
                  <ComposerAttachment state={c.attach} disabledReason={c.disabledReason} />
                  <ComposerVoiceButton state={c.voice}  disabledReason={c.disabledReason} />
                  <ComposerSendButton  state={c.send}   invalidReason={c.invalidReason} />
                </ComposerActions>
              </ComposerFrame>
            </div>
          ))}
        </div>
      </div>

      {/* ── Keyboard + a11y ── */}
      <div style={dynSection()}>
        <p style={sectionTitle}>Keyboard & accessibility</p>
        <ul style={{ ...cellNote, maxWidth: 620, paddingLeft: 20, margin: 0, lineHeight: 1.6 }}>
          <li><strong>Enter / Space</strong> — triggers the focused button's primary action (send / start recording / open picker).</li>
          <li><strong>Focus follows the morph</strong> — when send transitions <code>ready → streaming</code>, focus stays on the button so Enter again stops.</li>
          <li><strong>Escape</strong> — on the composer input, cancels streaming. Wire via the <code>escapeTarget</code> / <code>onEscape</code> container props.</li>
          <li><strong>Tooltips</strong> — attached via <code>aria-describedby</code>, not visual-only. Disabled-with-reason states always expose their reason.</li>
          <li><strong>prefers-reduced-motion</strong> — voice pulse, upload spinner, icon morph transitions, and pressed-state scale all collapse to static.</li>
        </ul>
      </div>

      <div style={dynFooter}>
        <strong style={{ color: 'var(--color-content-secondary)' }}>ComposerActions</strong>
        {' — '}Teambridge AI
      </div>
    </div>
  )
}
