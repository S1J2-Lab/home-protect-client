import styled from '@emotion/styled';
import { TargetCard } from './TargetCard';
import { TARGET_ITEMS } from '../../../../constants/targetItems';

export function TargetGrid() {
  return (
    <Grid>
      {TARGET_ITEMS.map((item) => (
        <TargetCard
          key={item.title}
          img={item.img}
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
