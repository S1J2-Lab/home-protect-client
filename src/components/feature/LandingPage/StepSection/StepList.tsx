import { Fragment } from 'react';
import styled from '@emotion/styled';
import { STEP_ITEMS } from '../../../../constants/stepItems';
import { StepCard } from './StepCard';
import { StepArrow } from './StepArrow';

export function StepList() {
  return (
    <Col>
      {STEP_ITEMS.map((item, i) => (
        <Fragment key={item.step}>
          <StepCard {...item} />
          {i < STEP_ITEMS.length - 1 && <StepArrow />}
        </Fragment>
      ))}
    </Col>
  );
}

const Col = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
