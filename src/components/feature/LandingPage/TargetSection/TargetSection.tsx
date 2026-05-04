import styled from '@emotion/styled';
import { TargetSectionHeader } from './TargetSectionHeader';
import { TargetGrid } from './TargetGrid';

export function TargetSection() {
  return (
    <Section>
      <Inner>
        <TargetSectionHeader />
        <TargetGrid />
      </Inner>
    </Section>
  );
}

const Section = styled.section`
  width: 100%;
  max-width: 420px;
  padding: 32px 0 0;
`;

const Inner = styled.div`
  background: ${({ theme }) => theme.colors.primarySoft};
  border-radius: 22px;
  padding: 28px 18px;
`;
