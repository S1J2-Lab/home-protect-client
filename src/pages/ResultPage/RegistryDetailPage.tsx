import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { AnalysisDetailSection } from '../../components/feature/ResultPage/DetailAnalysis/RegistryContract/AnalysisDetailSection';
import { getRegistryAnalysisIssues } from '../../utils/registryAnalysis';
import type { RegistryData } from '../../types/registry';
import { getAnalysisResultFromStorage } from '../../utils/analysisStorage';

interface LocationState {
  registry?: RegistryData;
}

export function RegistryDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const registry =
    (location.state as LocationState | null)?.registry ??
    getAnalysisResultFromStorage()?.registry;

  const items = useMemo(
    () => (registry ? getRegistryAnalysisIssues(registry) : []),
    [registry],
  );

  if (!registry) {
    return (
      <button type="button" onClick={() => navigate('/result')}>
        결과 페이지로 돌아가기
      </button>
    );
  }

  return (
    <AnalysisDetailSection
      key={JSON.stringify(registry)}
      title="등기부등본 전체 분석"
      icon={<FileText size={22} />}
      items={items}
    />
  );
}