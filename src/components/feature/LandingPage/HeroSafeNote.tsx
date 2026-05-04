import styled from '@emotion/styled';
import { Lock } from 'lucide-react';

export function HeroSafeNote() {
  return (
    <Wrapper>
      <SafeNote>
        <Lock size={12} aria-hidden="true" />
        입력하신 정보는 안전하게 보호돼요.
      </SafeNote>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 12px;
`;

const SafeNote = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 12px;
`;
