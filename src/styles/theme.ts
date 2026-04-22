export const theme = {
  colors: {
    background: '#f6f7f9',
    foreground: '#1b212d',

    card: '#ffffff',
    cardForeground: '#1b212d',

    popover: '#ffffff',
    popoverForeground: '#1b212d',

    primary: '#2057c5',
    primaryForeground: '#ffffff',

    secondary: '#f0f1f5',
    secondaryForeground: '#303a50',

    muted: '#f0f2f4',
    mutedForeground: '#6a7181',

    accent: '#e8ebf3',
    accentForeground: '#2e426b',

    destructive: '#cc3333',
    destructiveForeground: '#ffffff',

    border: '#e2e4e9',
    input: '#e2e4e9',
    ring: '#2057c5',

    appBlue: '#2057c5',
    appBlueDeep: '#193876',
    appBlueLight: '#eff3fb',
    appBlueMuted: '#d4dced',

    statusCaution: '#dc2828',
    statusCautionLight: '#fcf3f3',
    statusWarning: '#dc2828',
    statusWarningLight: '#fcf3f3',
    statusSafe: '#3b9b7b',
    statusSafeLight: '#eef7f4',
    statusDanger: '#d43535',
    statusDangerLight: '#faf0f0',

    sidebarBackground: '#fafafa',
    sidebarForeground: '#3f3f46',
    sidebarPrimary: '#18181b',
    sidebarPrimaryForeground: '#fafafa',
    sidebarAccent: '#f4f4f5',
    sidebarAccentForeground: '#18181b',
    sidebarBorder: '#e5e7eb',
    sidebarRing: '#3b82f6',
  },

  radius: {
    md: '0.875rem',
  },

  shadows: {
    card: '0 2px 12px -2px rgba(36, 46, 66, 0.06)',
    cardHover: '0 4px 20px -2px rgba(36, 46, 66, 0.10)',
  },

  gradients: {
    hero: 'linear-gradient(160deg, #193876 0%, #2057c5 100%)',
  },

  fonts: {
    body: "'Noto Sans KR', sans-serif",
  },
} as const;

export type AppTheme = typeof theme;
