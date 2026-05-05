import styled from '@emotion/styled';
import { FileText } from 'lucide-react';
import { AnalysisCard } from '../../../../common/AnalysisCard';
import { AnalysisIssueList } from '../RegistryContract/AnalysisIssueList';
import { getRegistryAnalysisIssues } from '../../../../../utils/registryAnalysis';
import type { RegistryData } from '../../../../../utils/registrySummary';

const PREVIEW_COUNT = 2;

interface RegistryAnalysisCardProps {
  registry: RegistryData;
  onClickDetail?: () => void;
}

export function RegistryAnalysisCard({
  registry,
  onClickDetail,
}: RegistryAnalysisCardProps) {
  const allItems = getRegistryAnalysisIssues(registry);
  const previewItems = allItems.slice(0, PREVIEW_COUNT);

  return (
    <AnalysisCard
      icon={<FileText />}
      title="등기부등본 분석"
      right={
        allItems.length > PREVIEW_COUNT && (
          <DetailButton type="button" onClick={onClickDetail}>
            전체보기 &gt;
          </DetailButton>
        )
      }
    >
      <AnalysisIssueList items={previewItems} />
    </AnalysisCard>
  );
}

const DetailButton = styled.button`
  border: 0;
  background: transparent;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transform: translateY(9px);
`;
