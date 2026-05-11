export type TagVariant = 'primary' | 'safe' | 'caution' | 'danger';

export const TAG_COLORS = {
  primary: {
    color: 'primaryDark',
    background: 'primaryLight',
  },
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
