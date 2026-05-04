import styled from '@emotion/styled';
import { HeroSection } from '../../components/feature/LandingPage/HeroSection';
import { FeatureSection } from '../../components/feature/LandingPage/FeatureSection/FeatureSection';
import { StepSection } from '../../components/feature/LandingPage/StepSection/StepSection';

export function LandingPage() {
  return (
    <PageWrapper>
      <HeroSection />
      <FeatureSection />
      <StepSection />
    </PageWrapper>
  );
}

const PageWrapper = styled.main`
  padding: 32px 20px 36px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%);

  & > *:not(:last-child) {
    margin-bottom: 24px;
  }
`;
