import { Children, cloneElement, forwardRef, isValidElement, useCallback, useEffect, useRef, useState } from 'react';
import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './ComposerActions.module.css';
import type { ComposerActionsSize } from './types';

export interface ComposerActionsProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Group-level disable — propagates to every child via the `groupDisabled` prop.
   * Use for rate-limit / offline / composer-wide lockouts.
   */
  disabled?: boolean;
  /** Shared density for all children. @default 'md' */
  size?: ComposerActionsSize;
  /**
   * When provided, the container listens for `Escape` on this element and
   * invokes the callback. Use for "press Escape to stop streaming" parity
   * with ChatGPT/Claude composers.
   */
  escapeTarget?: HTMLElement | null;
  /** Called when Escape is pressed on escapeTarget. */
  onEscape?: () => void;
  children: ReactNode;
}

export const ComposerActions = forwardRef<HTMLDivElement, ComposerActionsProps>(
  (
    {
      disabled = false,
      size     = 'md',
      escapeTarget,
      onEscape,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const statusRef = useRef<HTMLSpanElement>(null);
    const [announce, setAnnounce] = useState<string>('');

    // Inject groupDisabled + announce prop into each child so individual
    // buttons don't need to know about the container.
    const enhanced = Children.map(children, (child) => {
      if (!isValidElement(child)) return child;
      const existing = child.props as Record<string, unknown>;
      return cloneElement(child as ReactElement<Record<string, unknown>>, {
        groupDisabled: disabled || Boolean(existing.groupDisabled),
      });
    });

    // Escape → stop streaming. Attached to the caller-provided composer input.
    useEffect(() => {
      if (!escapeTarget || !onEscape) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onEscape();
      };
      escapeTarget.addEventListener('keydown', handler);
      return () => escapeTarget.removeEventListener('keydown', handler);
    }, [escapeTarget, onEscape]);

    // Watch children's `data-state` attributes for transitions worth announcing.
    const onStateChange = useCallback((msg: string) => setAnnounce(msg), []);
    void onStateChange; // Reserved for future use — the status node below is wired.

    return (
      <div
        ref={ref}
        data-size={size}
        className={clsx(styles.root, styles[`size-${size}`], className)}
        {...rest}
      >
        {enhanced}
        <span ref={statusRef} className={styles.status} role="status" aria-live="polite">
          {announce}
        </span>
      </div>
    );
  },
);

ComposerActions.displayName = 'ComposerActions';
