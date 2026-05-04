import styled from '@emotion/styled';
import { ChevronDown } from 'lucide-react';

export function StepArrow() {
  return (
    <ArrowWrap>
      <ChevronDown />
    </ArrowWrap>
  );
}

const ArrowWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;
