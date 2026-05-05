export type TagVariant = 'safe' | 'caution' | 'danger';

export const TAG_COLORS = {
  safe: {
    color: 'success',
    background: 'successBg',
  },
  caution: {
    color: 'warning',
    background: 'warningBg',
  },
  danger: {
    color: 'danger',
    background: 'dangerBg',
  },
} as const;
