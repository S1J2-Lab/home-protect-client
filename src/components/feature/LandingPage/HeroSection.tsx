import styled from '@emotion/styled';
import { HeroBadge } from './HeroBadge';
import { HeroTitle } from './HeroTitle';
import { HeroSubText } from './HeroSubText';
import { HeroImage } from './HeroImage';
import { HeroCtaButton } from './HeroCtaButton';
import { HeroSafeNote } from './HeroSafeNote';

export function HeroSection() {
  return (
    <Section>
      <HeroBadge />
      <HeroTitle />
      <HeroSubText />
      <HeroImage />
      <HeroCtaButton />
      <HeroSafeNote />
    </Section>
  );
}

const Section = styled.section`
  padding: 32px 20px 36px;
  background: linear-gradient(180deg, #ffffff 0%, #f5f7fb 100%);
  text-align: center;
  width: 100%;
  max-width: 420px;
`;
