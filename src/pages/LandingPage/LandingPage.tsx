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
  padding: 32px 20px 36px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%);
`;
