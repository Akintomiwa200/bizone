export const THEME_CONFIG = {
  primary: '#2563eb',
  secondary: '#16a34a',
  danger: '#dc2626',
  warning: '#f59e0b',
  success: '#16a34a',
  neutral: '#6b7280',
} as const;

export type ThemeConfig = typeof THEME_CONFIG;
