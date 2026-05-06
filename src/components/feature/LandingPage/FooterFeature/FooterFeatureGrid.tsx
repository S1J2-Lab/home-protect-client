import styled from '@emotion/styled';
import { FOOTER_ITEMS } from '../../../../constants/footerItems';
import { FooterFeatureCard } from './FooterFeatureCard';

export function FooterFeatureGrid() {
  return (
    <Grid>
      {FOOTER_ITEMS.map((item) => (
        <FooterFeatureCard key={item.title} {...item} />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;
