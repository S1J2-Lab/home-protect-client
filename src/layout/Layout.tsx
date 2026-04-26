import styled from '@emotion/styled';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <Wrapper>
      <LayoutWrapper>{children}</LayoutWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
`;

const LayoutWrapper = styled.main`
  width: 100%;
  max-width: 420px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface};
`;
