import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import styles from './Tag.module.css';
import { XIcon } from '../icons/XIcon';

export type TagVariant = 'subtle' | 'outline' | 'solid';
export type TagColor = 'neutral' | 'blue' | 'azure' | 'purple' | 'pink' | 'red' | 'orange' | 'yellow' | 'matcha' | 'green';
export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends ComponentPropsWithoutRef<'span'> {
  variant?: TagVariant;
  color?: TagColor;
  size?: TagSize;
  dot?: boolean;
  leadingIcon?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Tag = forwardRef<HTMLSpanElement, TagProps>(
  ({ variant = 'subtle', color = 'neutral', size = 'md', dot, leadingIcon, dismissible, onDismiss, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={clsx(styles.root, styles[size], styles[color], styles[variant], className)}
        {...props}
      >
        {dot && <span className={styles.dot} aria-hidden="true" />}
        {leadingIcon && <span className={clsx(styles.icon, 'alloy-icon-slot')} aria-hidden="true">{leadingIcon}</span>}
        {children}
        {dismissible && (
          <button
            type="button"
            className={styles.dismiss}
            aria-label="Remove"
            onClick={(e) => { e.stopPropagation(); onDismiss?.(); }}
          >
            <XIcon size={8} />
          </button>
        )}
      </span>
    );
  }
);

Tag.displayName = 'Tag';
