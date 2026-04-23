export type ComposerActionsSize = 'sm' | 'md';

export type ComposerSendState =
  | 'hidden'
  | 'ready'
  | 'disabled-invalid'
  | 'streaming'
  | 'error';

export type ComposerAttachmentState =
  | 'idle'
  | 'uploading'
  | 'disabled'
  | 'error';

export type ComposerVoiceState = 'idle' | 'recording' | 'disabled';
