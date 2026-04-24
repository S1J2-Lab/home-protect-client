import { css, keyframes } from '@emotion/react';
import { theme } from './theme';

export const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const pulseGentle = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

export const globalStyles = css`
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
`;
