export const theme = {
  colors: {
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    primaryLight: '#DBEAFE',
    primarySoft: '#EFF6FF',

    bg: '#F5F7FB',
    surface: '#FFFFFF',

    border: '#E5E9F0',
    borderLight: '#EEF1F6',

    text: '#0F172A',
    textSub: '#475569',
    textMuted: '#94A3B8',

    success: '#10B981',
    successLight: '#D1FAE5',
    successBg: '#ECFDF5',

    danger: '#EF4444',
    dangerLight: '#FEE2E2',
    dangerBg: '#FEF2F2',

    warning: '#F59E0B',
    warningLight: '#FEF3C7',
    warningBg: '#FFFBEB',
  },

  radius: {
    sm: '8px',
    md: '10px',
    lg: '12px',
    xl: '14px',
    full: '999px',
  },

  shadow: {
    card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.06)',
    soft: '0 1px 2px rgba(15, 23, 42, 0.04)',
    pop: '0 8px 24px rgba(59, 130, 246, 0.18)',
  },

  font: {
    family:
      "'Pretendard', -apple-system, BlinkMacSystemFont, 'Apple SD Gothic Neo', system-ui, sans-serif",
  },
} as const;

export type AppTheme = typeof theme;
