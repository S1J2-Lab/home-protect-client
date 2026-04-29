import styled from '@emotion/styled';
import type { HTMLAttributes } from 'react';

const CARD_PADDING = '20px';
const CARD_GAP = '6px';

export function Card({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <CardContainer {...rest}>{children}</CardContainer>;
}

const CardContainer = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: ${({ theme }) => theme.shadow.card};
  padding: ${CARD_PADDING};
  display: flex;
  flex-direction: column;
  gap: ${CARD_GAP};
`;
