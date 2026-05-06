import styled from '@emotion/styled';
import { FooterFeatureGrid } from './FooterFeatureGrid';

export function FooterFeature() {
  return (
    <Section>
      <Inner>
        <FooterFeatureGrid />
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
  border-radius: ${({ theme }) => theme.radius.xl};
  padding: 18px;
`;
