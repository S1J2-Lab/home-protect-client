import styled from '@emotion/styled';
import type { LucideIcon } from 'lucide-react';
import { Card } from '../../../common/Card';

const ICON_SIZE = 52;
const ICON_STROKE_WIDTH = 1.5;

interface FeatureCardProps {
  Icon: LucideIcon;
  title: string;
  desc: string;
}

export function FeatureCard({ Icon, title, desc }: FeatureCardProps) {
  return (
    <StyledCard>
      <IconWrap>
        <Icon
          size={ICON_SIZE}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
      </IconWrap>
      <CardTitle>{title}</CardTitle>
      <CardDesc>{desc}</CardDesc>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  align-items: center;
  text-align: center;
  padding: 20px 14px;

  &:last-child:nth-of-type(odd) {
    grid-column: span 2;
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.colors.primary};
`;

const CardTitle = styled.h3`
  margin: 0 0 2px;
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const CardDesc = styled.p`
  margin: 0;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
  white-space: pre-line;
`;
