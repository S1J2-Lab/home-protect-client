import { css, Global, keyframes, ThemeProvider } from '@emotion/react';
import type { ReactNode } from 'react';
import { theme } from './theme';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulseGentle = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap');

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    border-color: ${theme.colors.border};
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    min-height: 100%;
  }

  body {
    background: ${theme.colors.background};
    color: ${theme.colors.foreground};
    font-family: ${theme.fonts.body};
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  button,
  input,
  textarea,
  select {
    font: inherit;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .gradient-hero {
    background: ${theme.gradients.hero};
  }

  .shadow-card {
    box-shadow: ${theme.shadows.card};
  }

  .shadow-card-hover {
    box-shadow: ${theme.shadows.cardHover};
  }

  .animate-fade-in-up {
    animation: ${fadeInUp} 0.5s ease-out forwards;
  }

  .animate-fade-in-up-delay-1 {
    animation: ${fadeInUp} 0.5s ease-out 0.1s forwards;
    opacity: 0;
  }

  .animate-fade-in-up-delay-2 {
    animation: ${fadeInUp} 0.5s ease-out 0.2s forwards;
    opacity: 0;
  }

  .animate-fade-in-up-delay-3 {
    animation: ${fadeInUp} 0.5s ease-out 0.3s forwards;
    opacity: 0;
  }

  .animate-pulse-gentle {
    animation: ${pulseGentle} 2s ease-in-out infinite;
  }
`;

export function AppStyleProvider({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      {children}
    </ThemeProvider>
  );
}
