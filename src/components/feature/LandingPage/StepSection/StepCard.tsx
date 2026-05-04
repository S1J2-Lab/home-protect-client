import styled from '@emotion/styled';
import { Circle } from 'lucide-react';
import { Card } from '../../../common/Card';
import { Tag } from '../../../common/Tag';
import type { StepItem } from '../../../../constants/stepItems';

const ICON_SIZE = 44;
const ICON_STROKE_WIDTH = 1.5;

type StepCardProps = StepItem;

export function StepCard({ step, title, desc, hint, Icon }: StepCardProps) {
  return (
    <StyledCard>
      <NumBadge>{step}</NumBadge>
      <Body>
        <Title>{title}</Title>
        <Desc>{desc}</Desc>
        <HintTag variant="primary">
          <Circle fill="currentColor" />
          {hint}
        </HintTag>
      </Body>
      <IconWrap>
        <Icon
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      </IconWrap>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  flex-direction: row;
  align-items: flex-start;
  gap: 14px;
  padding: 18px 16px;
`;

const NumBadge = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  font-size: 13px;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Body = styled.div`
  flex: 1;
  min-width: 0;
`;

const Title = styled.h3`
  margin-top: 2px;
  margin-bottom: 4px;
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const Desc = styled.p`
  margin-bottom: 10px;
  font-size: 12.5px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  white-space: pre-line;
`;

const HintTag = styled(Tag)`
  font-weight: 800;
  gap: 4px;

  svg {
    width: 8px;
    height: 8px;
  }
`;

const IconWrap = styled.div`
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.primary};
`;
