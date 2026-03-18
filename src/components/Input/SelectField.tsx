/* ─────────────────────────────────────────────────────────────────────────────
   Alloy · SelectField
   Native <select> with custom styling. Chevron icon always present on trailing edge.
   ───────────────────────────────────────────────────────────────────────────── */

import { forwardRef, useId } from 'react';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { clsx } from 'clsx';
import { FieldWrapper } from './FieldWrapper';
import { FieldShell }  from './FieldShell';
import type { FieldVariant, FieldSize } from './FieldShell';
import type { FieldLayout } from './FieldWrapper';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';
import styles from './Input.module.css';

// ── Types ────────────────────────────────────────────────────────────────────

export interface SelectFieldProps
  extends Omit<ComponentPropsWithoutRef<'select'>, 'size'> {
  label?:      ReactNode;
  /** Icon rendered immediately after the label text (e.g. InfoCircleIcon). */
  labelIcon?:  ReactNode;
  hint?:       string;
  error?:      string;
  success?:    string;
  required?:   boolean;
  /** @default 'outlined' */
  variant?:    FieldVariant;
  /** @default 'md' */
  size?:       FieldSize;
  leadingIcon?: ReactNode;
  layout?: FieldLayout;
  labelWidth?: number | string;
  labelDescription?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
  (
    {
      label,
      labelIcon,
      hint,
      error,
      success,
      required,
      variant     = 'outlined',
      size        = 'md',
      leadingIcon,
      layout,
      labelWidth,
      labelDescription,
      id,
      disabled,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const fieldId     = id ?? generatedId;

    // Icon size matches the shell's --field-icon token per size tier
    const chevronSize = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;

    return (
      <FieldWrapper
        label={label}
        labelIcon={labelIcon}
        hint={hint}
        error={error}
        success={success}
        required={required}
        htmlFor={fieldId}
        layout={layout}
        labelWidth={labelWidth}
        labelDescription={labelDescription}
        className={className}
      >
        <FieldShell
          variant={variant}
          size={size}
          error={!!error}
          success={!!success}
          disabled={disabled}
          leadingIcon={leadingIcon}
          trailingIcon={<ChevronDownIcon size={chevronSize} />}
        >
          <select
            ref={ref}
            id={fieldId}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            className={clsx(styles.control, styles.selectControl)}
            {...props}
          >
            {children}
          </select>
        </FieldShell>
      </FieldWrapper>
    );
  },
);

SelectField.displayName = 'SelectField';
