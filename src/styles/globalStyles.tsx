import { Global, css, useTheme } from '@emotion/react';

export function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      styles={css`
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          border-color: ${theme.colors.border};
        }

        html {
          scrollbar-gutter: stable;
        }
        body,
        #root {
          min-height: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: ${theme.colors.bg};
          color: ${theme.colors.text};
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        button,
        input,
        textarea,
        select {
          font: inherit;
        }

        button {
          border: 0;
          cursor: pointer;
        }

        input,
        textarea,
        select {
          border: 1px solid ${theme.colors.border};
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        ul,
        ol {
          margin: 0;
          padding: 0;
          list-style: none;
        }

        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p {
          margin: 0;
        }
      `}
    />
  );
}
