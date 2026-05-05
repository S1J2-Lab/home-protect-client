import styled from '@emotion/styled';
import { Card } from '../../../components/common/Card';
import { TAG_COLORS, type TagVariant } from '../../../constants/tag';

interface StatusCountCardProps {
  variant: TagVariant;
  count: number;
  label: string;
}

export function StatusCountCard({
  variant,
  count,
  label,
}: StatusCountCardProps) {
  return (
    <StyledCard variant={variant}>
      <Count variant={variant}>{count}</Count>
      <Label variant={variant}>{label}</Label>
    </StyledCard>
  );
}

const StyledCard = styled(Card)<{ variant: TagVariant }>`
  flex: 1;
  align-items: center;
  gap: 6px;
  padding: 16px 10px;
  background: ${({ theme, variant }) =>
    theme.colors[TAG_COLORS[variant].background]};
  box-shadow: none;
`;

const Count = styled.span<{ variant: TagVariant }>`
  color: ${({ theme, variant }) => theme.colors[TAG_COLORS[variant].color]};
  font-size: 22px;
  font-weight: 800;
  line-height: 1;
`;

const Label = styled.span<{ variant: TagVariant }>`
  color: ${({ theme, variant }) => theme.colors[TAG_COLORS[variant].color]};
  font-size: 13px;
  font-weight: 700;
`;
