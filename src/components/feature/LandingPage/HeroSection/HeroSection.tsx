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
  text-align: center;
  width: 100%;
  max-width: 420px;
`;
