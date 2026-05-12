import styled from '@emotion/styled';
import { ScrollText } from 'lucide-react';
import { AnalysisCard } from '../../../../common/AnalysisCard';
import { AnalysisIssueList } from '../RegistryContract/AnalysisIssueList';
import type { ContractData } from '../../../../../types/contract';
import { getContractAnalysisIssues } from '../../../../../utils/contractAnalysis';

const PREVIEW_COUNT = 2;

interface ContractAnalysisCardProps {
  contract: ContractData;
  onClickDetail?: () => void;
}

export function ContractAnalysisCard({
  contract,
  onClickDetail,
}: ContractAnalysisCardProps) {
  const allItems = getContractAnalysisIssues(contract);
  const hasItems = allItems.length > 0;
  const previewItems = allItems.slice(0, PREVIEW_COUNT);
  return (
    <AnalysisCard
      icon={<ScrollText />}
      title="임대차계약서 분석"
      right={
        hasItems &&
        onClickDetail && (
          <DetailButton type="button" onClick={onClickDetail}>
            전체보기 &gt;
          </DetailButton>
        )
      }
    >
      <AnalysisIssueList
        items={previewItems}
        showRowDivider
        isPreview
        emptyMessage="확인이 필요한 임대차계약서 정보가 없어요."
      />
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
