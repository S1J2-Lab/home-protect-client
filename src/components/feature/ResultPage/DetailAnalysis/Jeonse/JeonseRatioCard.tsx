import styled from '@emotion/styled';
import { BarChart3 } from 'lucide-react';
import { Tag } from '../../../../common/Tag';
import { TAG_COLORS, type TagVariant } from '../../../../../constants/tag';
import {
  formatPrice,
  getRatioNotice,
  getRiskLevelLabel,
} from '../../../../../utils/jeonseRatio';
import { AnalysisCard } from '../../../../common/AnalysisCard';

interface JeonseRatioCardProps {
  ratio: number;
  riskLevel: TagVariant;
  deposit: number;
  recentPrice: number;
  averagePrice: number;
  lowestPrice: number;
}

export function JeonseRatioCard({
  ratio,
  riskLevel,
  deposit,
  recentPrice,
  averagePrice,
  lowestPrice,
}: JeonseRatioCardProps) {
  const notice = getRatioNotice(ratio);

  return (
    <AnalysisCard
      icon={<BarChart3 />}
      title="전세가율"
      right={<Tag variant={riskLevel}>{getRiskLevelLabel(riskLevel)}</Tag>}
    >
      <Body>
        <RatioCircle ratio={ratio} variant={riskLevel}>
          <RatioText>{ratio}%</RatioText>
        </RatioCircle>

        <PriceList>
          <PriceRow>
            <PriceLabel>보증금</PriceLabel>
            <StrongPrice>{formatPrice(deposit)}</StrongPrice>
          </PriceRow>
          <PriceRow>
            <PriceLabel>최근 시세</PriceLabel>
            <PriceValue>{formatPrice(recentPrice)}</PriceValue>
          </PriceRow>
          <PriceRow>
            <PriceLabel>평균 시세</PriceLabel>
            <PriceValue>{formatPrice(averagePrice)}</PriceValue>
          </PriceRow>
          <PriceRow>
            <PriceLabel>최저 시세</PriceLabel>
            <PriceValue>{formatPrice(lowestPrice)}</PriceValue>
          </PriceRow>
        </PriceList>
      </Body>

      <Notice variant={riskLevel}>{notice}</Notice>
    </AnalysisCard>
  );
}

const Body = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const RatioCircle = styled.div<{ ratio: number; variant: TagVariant }>`
  width: 112px;
  height: 112px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme, ratio, variant }) => `
    conic-gradient(
      ${theme.colors[TAG_COLORS[variant].color]} ${ratio}%,
      ${theme.colors.borderLight} 0
    )
  `};

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    width: 78px;
    height: 78px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.surface};
  }
`;

const RatioText = styled.span`
  position: relative;
  z-index: 1;
  color: ${({ theme }) => theme.colors.text};
  font-size: 22px;
  font-weight: 900;
`;

const PriceList = styled.div`
  flex: 1;
  min-width: 0;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 0;

  & + & {
    border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  }
`;

const PriceLabel = styled.span`
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 12px;
  font-weight: 600;
`;

const PriceValue = styled.span`
  color: ${({ theme }) => theme.colors.text};
  font-size: 12px;
  font-weight: 600;
`;

const StrongPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 900;
`;

const Notice = styled.p<{ variant: TagVariant }>`
  margin: 18px 0 0;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, variant }) =>
    theme.colors[TAG_COLORS[variant].background]};
  color: ${({ theme, variant }) => theme.colors[TAG_COLORS[variant].color]};
  font-size: 13px;
  font-weight: 600;
`;
