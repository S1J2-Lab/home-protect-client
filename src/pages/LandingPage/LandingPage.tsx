import styled from '@emotion/styled';
import { HeroSection } from '../../components/feature/LandingPage/HeroSection';

export function LandingPage() {
  return (
    <PageWrapper>
      <HeroSection />
    </PageWrapper>
  );
}

const PageWrapper = styled.main`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
`;
