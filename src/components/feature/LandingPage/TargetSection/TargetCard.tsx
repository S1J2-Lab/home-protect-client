import styled from '@emotion/styled';
import { Card } from '../../../common/Card';

const AVATAR_SIZE = 88;

interface TargetCardProps {
  img: string;
  title: string;
  desc: string;
}

export function TargetCard({ img, title, desc }: TargetCardProps) {
  return (
    <StyledCard>
      <Avatar
        src={img}
        alt={title}
        width={AVATAR_SIZE}
        height={AVATAR_SIZE}
        loading="lazy"
      />
      <CardTitle>{title}</CardTitle>
      <CardDesc>{desc}</CardDesc>
    </StyledCard>
  );
}

const StyledCard = styled(Card)`
  align-items: center;
  text-align: center;
  padding: 20px 12px 18px;
  gap: 6px;
`;

const Avatar = styled.img`
  width: ${AVATAR_SIZE}px;
  height: ${AVATAR_SIZE}px;
  object-fit: contain;
  margin-bottom: 4px;
`;

const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
`;

const CardDesc = styled.p`
  font-size: 11.5px;
  line-height: 1.55;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: pre-line;
`;
