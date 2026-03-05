export const AI_CONFIG = {
  enabled: true,
  defaultTone: 'friendly',
  maxContextMessages: 10,
  fallbackMessage: 'Sorry, I could not process that request right now.',
} as const;

export type AIConfig = typeof AI_CONFIG;
