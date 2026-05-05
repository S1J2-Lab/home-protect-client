import styled from '@emotion/styled';
import { Card } from '../../../components/common/Card';
import { StatusCountCard } from './StatusCountCard';

interface ResultSummaryCardProps {
  danger: number;
  caution: number;
  safe: number;
}

export function ResultSummaryCard({
  danger,
  caution,
  safe,
}: ResultSummaryCardProps) {
  const total = danger + caution + safe;

  return (
    <Card>
      <Title>{total}개의 항목을 분석했어요</Title>
      <Description>주의가 필요한 항목을 먼저 확인해 주세요.</Description>

      <StatusGrid>
        <StatusCountCard variant="danger" count={danger} label="주의 필요" />
        <StatusCountCard variant="caution" count={caution} label="확인 권장" />
        <StatusCountCard variant="safe" count={safe} label="정상" />
      </StatusGrid>
    </Card>
  );
}

const Title = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
  font-weight: 800;
`;

const Description = styled.p`
  margin: 4px 0 18px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 14px;
  line-height: 1.5;
`;

const StatusGrid = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
`;
