import styled from '@emotion/styled';
import { BarChart3 } from 'lucide-react';
import { AnalysisCard } from '../../../../common/AnalysisCard';
import { Tag } from '../../../../common/Tag';
import { TAG_COLORS } from '../../../../../constants/tag';
import type { JeonseRatioData } from '../../../../../types/jeonse';
import type { RiskLevel } from '../../../../../types/risk';
import { formatPrice, getRatioNotice } from '../../../../../utils/jeonseRatio';
import {
  getRiskLevelLabel,
  toTagVariant,
} from '../../../../../utils/riskMapper';

interface JeonseRatioCardProps {
  jeonseRatio: JeonseRatioData;
}

export function JeonseRatioCard({ jeonseRatio }: JeonseRatioCardProps) {
  const {
    ratioPercent,
    riskLevel,
    convertedDeposit,
    recentHigh,
    average,
    recentLow,
    sampleCount,
  } = jeonseRatio;

  const hasMarketData = (sampleCount ?? 0) > 0;
  const safeRatio = Math.min(Math.max(ratioPercent ?? 0, 0), 100);
  const notice = hasMarketData
    ? getRatioNotice(safeRatio)
    : '최근 거래량이 없어 전세가율을 계산하기 어려워요. 주변 시세를 추가로 확인해 주세요.';

  return (
    <AnalysisCard
      icon={<BarChart3 />}
      title="전세가율"
      right={
        hasMarketData ? (
          <Tag variant={toTagVariant(riskLevel)}>
            {getRiskLevelLabel(riskLevel)}
          </Tag>
        ) : null
      }
    >
      {hasMarketData ? (
        <Body>
          <RatioCircle ratio={safeRatio} variant={riskLevel}>
            <RatioText>{safeRatio}%</RatioText>
          </RatioCircle>

          <PriceList>
            <PriceRow>
              <PriceLabel>보증금</PriceLabel>
              <StrongPrice>{formatPrice(convertedDeposit)}</StrongPrice>
            </PriceRow>

            <PriceRow>
              <PriceLabel>최근 시세</PriceLabel>
              <PriceValue>{formatPrice(recentHigh)}</PriceValue>
            </PriceRow>

            <PriceRow>
              <PriceLabel>평균 시세</PriceLabel>
              <PriceValue>{formatPrice(average)}</PriceValue>
            </PriceRow>

            <PriceRow>
              <PriceLabel>최저 시세</PriceLabel>
              <PriceValue>{formatPrice(recentLow)}</PriceValue>
            </PriceRow>
          </PriceList>
        </Body>
      ) : (
        <EmptyState>
          <PriceRow>
            <PriceLabel>보증금</PriceLabel>
            <StrongPrice>{formatPrice(convertedDeposit)}</StrongPrice>
          </PriceRow>
        </EmptyState>
      )}

      {hasMarketData ? (
        <Notice variant={riskLevel}>{notice}</Notice>
      ) : (
        <EmptyNotice>
          최근 거래량이 없어 전세가율을 계산하기 어려워요. 주변 시세를 추가로
          확인해 주세요.
        </EmptyNotice>
      )}
    </AnalysisCard>
  );
}

const Body = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

const RatioCircle = styled.div<{ ratio: number; variant: RiskLevel | null }>`
  width: 112px;
  height: 112px;
  flex-shrink: 0;
  border-radius: 50%;
  background: ${({ theme, ratio, variant }) => `
    conic-gradient(
      ${theme.colors[TAG_COLORS[variant ?? 'primary'].color]} ${ratio}%,
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
  font-variant-numeric: tabular-nums;
`;

const StrongPrice = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 13px;
  font-weight: 900;
  font-variant-numeric: tabular-nums;
`;

const Notice = styled.p<{ variant: RiskLevel | null }>`
  margin: 18px 0 0;
  padding: 10px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme, variant }) =>
    theme.colors[TAG_COLORS[variant ?? 'primary'].background]};
  color: ${({ theme, variant }) =>
    theme.colors[TAG_COLORS[variant ?? 'primary'].color]};
  font-size: 13px;
  font-weight: 600;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
`;

const EmptyNotice = styled.p`
  margin: 0;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
