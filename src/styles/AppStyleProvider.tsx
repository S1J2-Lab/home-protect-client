import { ThemeProvider } from '@emotion/react';
import type { PropsWithChildren } from 'react';
import { GlobalStyles } from './globalStyles';
import { theme } from './theme';

export function AppStyleProvider({ children }: PropsWithChildren) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
