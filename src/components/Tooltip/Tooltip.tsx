import { useState, useRef, useId } from 'react';
import type { ReactNode, ReactElement } from 'react';
import React from 'react';
import { clsx } from 'clsx';
import styles from './Tooltip.module.css';

// ── Types ─────────────────────────────────────────────────────────────────────

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Content to display inside the tooltip bubble. */
  content: ReactNode;
  /** Placement relative to the trigger element. @default 'top' */
  placement?: TooltipPlacement;
  /** Delay in ms before the tooltip appears. @default 0 */
  delay?: number;
  /** When true the tooltip never shows. */
  disabled?: boolean;
  /** Max width of the bubble; use for long-text tooltips. @default 280 */
  maxWidth?: number | string;
  /** The element that acts as the trigger. Must be a single ReactElement. */
  children: ReactElement;
}

// ── Component ─────────────────────────────────────────────────────────────────

export const Tooltip = ({
  content,
  placement = 'top',
  delay = 0,
  disabled = false,
  maxWidth = 280,
  children,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const id = useId();

  const show = () => {
    if (disabled) return;
    clearTimeout(timeoutRef.current);
    if (delay > 0) {
      timeoutRef.current = setTimeout(() => setVisible(true), delay);
    } else {
      setVisible(true);
    }
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  // Inject aria-describedby into the trigger so screen readers announce the tooltip
  const trigger = React.cloneElement(children, {
    'aria-describedby': visible ? id : undefined,
  });

  return (
    <span
      className={styles.wrapper}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {trigger}
      <span
        id={id}
        role="tooltip"
        className={clsx(styles.tooltip, styles[placement])}
        data-visible={visible || undefined}
        style={maxWidth !== undefined ? { maxWidth } : undefined}
      >
        {content}
      </span>
    </span>
  );
};

Tooltip.displayName = 'Tooltip';
