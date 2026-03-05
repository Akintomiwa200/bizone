export const NIGERIAN_CONFIG = {
  countryCode: 'NG',
  currency: 'NGN',
  phonePrefix: '+234',
  timezone: 'Africa/Lagos',
  defaultState: 'Lagos',
} as const;

export type NigerianConfig = typeof NIGERIAN_CONFIG;
