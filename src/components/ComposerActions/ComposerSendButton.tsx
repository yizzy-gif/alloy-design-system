import { forwardRef, useCallback, useRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import { ArrowNarrowUpIcon, StopIcon, RefreshCw04Icon } from '../icons';
import { Tooltip } from '../Tooltip';
import base from './ComposerButton.module.css';
import type { ComposerSendState } from './types';

type NativeButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'aria-label'>;

export interface ComposerSendButtonProps extends NativeButtonProps {
  state: ComposerSendState;
  onSend?: () => void;
  onStop?: () => void;
  onRetry?: () => void;
  /** Shown in tooltip when `disabled-invalid`. */
  invalidReason?: string;
  /** Shown in tooltip when `error`. */
  errorMessage?: string;
  /**
   * When true the send button is receiving group-level disable via the
   * ComposerActions container. Forces the rendered state to be inert
   * regardless of the passed `state`, except for `hidden`.
   */
  groupDisabled?: boolean;
}

const STATE_CLASS: Record<ComposerSendState, string | undefined> = {
  'hidden':           undefined,
  'ready':            base.sendReady,
  'disabled-invalid': base.sendDisabled,
  'streaming':        base.sendStreaming,
  'error':            base.sendError,
};

const STATE_LABEL = (state: ComposerSendState, invalidReason?: string, errorMessage?: string): string => {
  switch (state) {
    case 'ready':            return 'Send message';
    case 'disabled-invalid': return invalidReason ? `Cannot send: ${invalidReason}` : 'Cannot send';
    case 'streaming':        return 'Stop generating';
    case 'error':            return errorMessage ? `Retry sending: ${errorMessage}` : 'Retry sending';
    case 'hidden':           return '';
  }
};

export const ComposerSendButton = forwardRef<HTMLButtonElement, ComposerSendButtonProps>(
  (
    {
      state,
      onSend,
      onStop,
      onRetry,
      invalidReason,
      errorMessage,
      groupDisabled,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const pressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const btnRef        = useRef<HTMLButtonElement | null>(null);

    const setRefs = useCallback((node: HTMLButtonElement | null) => {
      btnRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }, [ref]);

    const handleClick = useCallback(() => {
      if (state === 'ready')     { onSend?.();  return; }
      if (state === 'streaming') { onStop?.();  return; }
      if (state === 'error') {
        const node = btnRef.current;
        if (node) {
          node.dataset.pressed = 'true';
          if (pressTimerRef.current) clearTimeout(pressTimerRef.current);
          pressTimerRef.current = setTimeout(() => { node.dataset.pressed = 'false'; }, 140);
        }
        onRetry?.();
      }
    }, [state, onSend, onStop, onRetry]);

    if (state === 'hidden') {
      return null;
    }

    const isInteractive =
      !groupDisabled && (state === 'ready' || state === 'streaming' || state === 'error');

    const label = STATE_LABEL(state, invalidReason, errorMessage);

    const tooltipContent =
      state === 'disabled-invalid' ? (invalidReason ?? 'Cannot send') :
      state === 'error'             ? (errorMessage  ?? 'Send failed — click to retry') :
      null;

    const button = (
      <button
        ref={setRefs}
        type="button"
        data-composer-action="send"
        data-state={state}
        className={clsx(base.base, STATE_CLASS[state], className)}
        style={style}
        aria-label={label}
        disabled={!isInteractive}
        onClick={handleClick}
        {...rest}
      >
        <span
          className={base.iconStack}
          aria-hidden="true"
          style={{ width:  'var(--composer-btn-icon-send)',
                   height: 'var(--composer-btn-icon-send)' }}
        >
          <span
            className={base.iconLayer}
            data-active={state === 'ready' || state === 'disabled-invalid' ? 'true' : 'false'}
          >
            <ArrowNarrowUpIcon size="100%" strokeWidth={2} />
          </span>
          <span
            className={base.iconLayer}
            data-active={state === 'streaming' ? 'true' : 'false'}
          >
            <StopIcon size="100%" strokeWidth={1.75} />
          </span>
          <span
            className={base.iconLayer}
            data-active={state === 'error' ? 'true' : 'false'}
          >
            <RefreshCw04Icon size="100%" strokeWidth={2} />
          </span>
        </span>
      </button>
    );

    if (tooltipContent) {
      return <Tooltip content={tooltipContent} placement="top">{button}</Tooltip>;
    }
    return button;
  },
);

ComposerSendButton.displayName = 'ComposerSendButton';
