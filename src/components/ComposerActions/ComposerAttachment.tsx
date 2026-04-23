import { forwardRef, useCallback, useRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import { PlusIcon } from '../icons';
import { Tooltip } from '../Tooltip';
import base from './ComposerButton.module.css';
import type { ComposerAttachmentState } from './types';

type NativeButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'aria-label'>;

export interface ComposerAttachmentProps extends NativeButtonProps {
  state: ComposerAttachmentState;
  onSelect?: (files: FileList) => void;
  onCancelUpload?: () => void;
  /** MIME type / extension filter for the file picker. */
  accept?: string;
  /** Forwarded to `<input multiple />`. Defaults to true (spec: multi-file). */
  multiple?: boolean;
  /** Tooltip text when state is `disabled`. */
  disabledReason?: string;
  /** Tooltip text when state is `error`. */
  errorMessage?: string;
  groupDisabled?: boolean;
}

const STATE_CLASS: Record<ComposerAttachmentState, string> = {
  idle:      base.attachIdle,
  uploading: base.attachUploading,
  disabled:  base.attachDisabled,
  error:     base.attachError,
};

const STATE_LABEL = (state: ComposerAttachmentState, disabledReason?: string, errorMessage?: string): string => {
  switch (state) {
    case 'idle':      return 'Add attachment';
    case 'uploading': return 'Uploading, click to cancel';
    case 'disabled':  return disabledReason ? `Attachments unavailable: ${disabledReason}` : 'Attachments unavailable';
    case 'error':     return errorMessage ? `Attachment failed: ${errorMessage}` : 'Attachment failed';
  }
};

export const ComposerAttachment = forwardRef<HTMLButtonElement, ComposerAttachmentProps>(
  (
    {
      state,
      onSelect,
      onCancelUpload,
      accept,
      multiple = true,
      disabledReason,
      errorMessage,
      groupDisabled,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const handleClick = useCallback(() => {
      if (state === 'uploading') { onCancelUpload?.(); return; }
      if (state === 'idle' || state === 'error') {
        inputRef.current?.click();
      }
    }, [state, onCancelUpload]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        onSelect?.(files);
      }
      // Reset so selecting the same file twice still fires onChange.
      e.target.value = '';
    }, [onSelect]);

    const isInteractive = !groupDisabled && state !== 'disabled';
    const label = STATE_LABEL(state, disabledReason, errorMessage);

    const tooltipContent =
      state === 'disabled' ? (disabledReason ?? 'Attachments unavailable') :
      state === 'error'    ? (errorMessage   ?? 'Attachment failed') :
      state === 'uploading' ? 'Click to cancel upload' :
      null;

    const button = (
      <button
        ref={ref}
        type="button"
        data-composer-action="attachment"
        data-state={state}
        className={clsx(base.base, STATE_CLASS[state], className)}
        style={style}
        aria-label={label}
        disabled={!isInteractive}
        onClick={handleClick}
        {...rest}
      >
        <span className={base.icon} style={{
          width:  'var(--composer-btn-icon-attach)',
          height: 'var(--composer-btn-icon-attach)',
        }}>
          <PlusIcon size="100%" strokeWidth={2} />
        </span>
        {state === 'uploading' && <span className={base.spinnerRing} aria-hidden="true" />}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          style={{ display: 'none' }}
          tabIndex={-1}
          aria-hidden="true"
        />
      </button>
    );

    if (tooltipContent) {
      return <Tooltip content={tooltipContent} placement="top">{button}</Tooltip>;
    }
    return button;
  },
);

ComposerAttachment.displayName = 'ComposerAttachment';
