import styled from '@emotion/styled';
import { FeatureCard } from './FeatureCard';
import { FEATURE_ITEMS } from '../../../../constants/featureItems';

export function FeatureGrid() {
  return (
    <Grid>
      {FEATURE_ITEMS.map((item) => (
        <FeatureCard
          key={item.title}
          Icon={item.Icon}
          title={item.title}
          desc={item.desc}
        />
      ))}
    </Grid>
  );
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
`;
