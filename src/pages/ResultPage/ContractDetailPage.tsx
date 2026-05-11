import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ScrollText } from 'lucide-react';
import { AnalysisDetailSection } from '../../components/feature/ResultPage/DetailAnalysis/RegistryContract/AnalysisDetailSection';
import type { ContractData } from '../../types/contract';
import { getContractAnalysisIssues } from '../../utils/contractAnalysis';
import { getAnalysisResultFromStorage } from '../../utils/analysisStorage';

interface LocationState {
  contract?: ContractData;
}

export function ContractDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const contract =
    (location.state as LocationState | null)?.contract ??
    getAnalysisResultFromStorage()?.contract;

  const items = useMemo(
    () => (contract ? getContractAnalysisIssues(contract) : []),
    [contract],
  );

  if (!contract) {
    return (
      <button type="button" onClick={() => navigate('/result')}>
        결과 페이지로 돌아가기
      </button>
    );
  }

  return (
    <AnalysisDetailSection
      title="임대차계약서 전체 분석"
      icon={<ScrollText size={22} />}
      items={items}
      showRowDivider
    />
  );
}