import styled from '@emotion/styled';
import type { ReactNode } from 'react';

const HEADER_HEIGHT = '56px';

interface HeaderProps {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}

export function Header({ title, left, right }: HeaderProps) {
  return (
    <Container>
      <Side>{left}</Side>
      <Title>{title}</Title>
      <Side>{right}</Side>
    </Container>
  );
}

const Container = styled.header`
  display: grid;
  grid-template-columns: 32px 1fr 32px;
  align-items: center;
  height: ${HEADER_HEIGHT};
  padding: 0 20px;
  background: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const Side = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
