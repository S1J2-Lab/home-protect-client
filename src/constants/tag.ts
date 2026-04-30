export type TagVariant = 'success' | 'warning' | 'danger';

export const TAG_COLORS = {
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
