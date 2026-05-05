import { ScrollText } from 'lucide-react';
import { AnalysisDetailSection } from '../../components/feature/ResultPage/DetailAnalysis/RegistryContract/AnalysisDetailSection';
import type { ContractData } from '../../types/contract';
import { getContractAnalysisIssues } from '../../utils/contractAnalysis';

interface ContractDetailPageProps {
  contract: ContractData;
}

export function ContractDetailPage({ contract }: ContractDetailPageProps) {
  const items = getContractAnalysisIssues(contract);

  return (
    <AnalysisDetailSection
      title="임대차계약서 전체 분석"
      icon={<ScrollText size={22} />}
      items={items}
      direction="column"
    />
  );
}
