import { forwardRef, useCallback } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import { Microphone02Icon, RecordingIcon } from '../icons';
import { Tooltip } from '../Tooltip';
import base from './ComposerButton.module.css';
import type { ComposerVoiceState } from './types';

type NativeButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'onClick' | 'aria-label'>;

export interface ComposerVoiceButtonProps extends NativeButtonProps {
  state: ComposerVoiceState;
  onStartRecording?: () => void;
  onStopRecording?: () => void;
  disabledReason?: string;
  groupDisabled?: boolean;
}

const STATE_CLASS: Record<ComposerVoiceState, string> = {
  idle:      base.voiceIdle,
  recording: base.voiceRecording,
  disabled:  base.voiceDisabled,
};

const STATE_LABEL = (state: ComposerVoiceState, disabledReason?: string): string => {
  switch (state) {
    case 'idle':      return 'Start voice input';
    case 'recording': return 'Stop recording';
    case 'disabled':  return disabledReason ? `Voice unavailable: ${disabledReason}` : 'Voice unavailable';
  }
};

export const ComposerVoiceButton = forwardRef<HTMLButtonElement, ComposerVoiceButtonProps>(
  (
    {
      state,
      onStartRecording,
      onStopRecording,
      disabledReason,
      groupDisabled,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const handleClick = useCallback(() => {
      if (state === 'idle')      { onStartRecording?.(); return; }
      if (state === 'recording') { onStopRecording?.();  return; }
    }, [state, onStartRecording, onStopRecording]);

    const isInteractive = !groupDisabled && state !== 'disabled';
    const label         = STATE_LABEL(state, disabledReason);
    const tooltipContent = state === 'disabled' ? (disabledReason ?? 'Voice unavailable') : null;

    const button = (
      <button
        ref={ref}
        type="button"
        data-composer-action="voice"
        data-state={state}
        className={clsx(base.base, STATE_CLASS[state], className)}
        style={style}
        aria-label={label}
        aria-pressed={state === 'recording' || undefined}
        disabled={!isInteractive}
        onClick={handleClick}
        {...rest}
      >
        <span
          className={base.iconStack}
          aria-hidden="true"
          style={{ width:  'var(--composer-btn-icon-voice)',
                   height: 'var(--composer-btn-icon-voice)' }}
        >
          <span
            className={base.iconLayer}
            data-active={state !== 'recording' ? 'true' : 'false'}
          >
            <Microphone02Icon size="100%" strokeWidth={1.5} />
          </span>
          <span
            className={base.iconLayer}
            data-active={state === 'recording' ? 'true' : 'false'}
          >
            <RecordingIcon size="100%" strokeWidth={1.5} />
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

ComposerVoiceButton.displayName = 'ComposerVoiceButton';
