import styled from '@emotion/styled';
import type { ReactNode } from 'react';

type ContentBackground = 'surface' | 'bg';

interface LayoutProps {
  header?: ReactNode;
  stepIndicator?: ReactNode;
  contentBackground?: ContentBackground;
  children: ReactNode;
}

export function Layout({
  header,
  stepIndicator,
  contentBackground = 'bg',
  children,
}: LayoutProps) {
  return (
    <Wrapper>
      <LayoutWrapper>
        {header}
        {stepIndicator}
        <PageContent $contentBackground={contentBackground}>
          {children}
        </PageContent>
      </LayoutWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.border};
`;

const LayoutWrapper = styled.main`
  width: 100%;
  max-width: 420px;
  min-width: 320px;
  min-height: 100dvh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
`;

const PageContent = styled.div<{ $contentBackground: ContentBackground }>`
  flex: 1;
  padding: 24px 20px;
  background-color: ${({ theme, $contentBackground }) =>
    theme.colors[$contentBackground]};
`;
