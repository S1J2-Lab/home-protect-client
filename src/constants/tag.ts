export type TagVariant = 'primary' | 'success' | 'warning' | 'danger';

export const TAG_COLORS = {
  primary: {
    color: 'primaryDark',
    background: 'primaryLight',
  },
  success: {
    color: 'success',
    background: 'successBg',
  },
  warning: {
    color: 'warning',
    background: 'warningBg',
  },
  danger: {
    color: 'danger',
    background: 'dangerBg',
  },
} as const;
