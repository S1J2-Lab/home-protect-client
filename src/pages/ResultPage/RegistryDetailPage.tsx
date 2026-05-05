import { useMemo } from 'react';
import { FileText } from 'lucide-react';
import { AnalysisDetailSection } from '../../components/feature/ResultPage/DetailAnalysis/RegistryContract/AnalysisDetailSection';
import { getRegistryAnalysisIssues } from '../../utils/registryAnalysis';
import type { RegistryData } from '../../utils/registrySummary';

interface RegistryDetailPageProps {
  registry: RegistryData;
}

export function RegistryDetailPage({ registry }: RegistryDetailPageProps) {
  const items = useMemo(() => getRegistryAnalysisIssues(registry), [registry]);

  const sectionKey = JSON.stringify(registry);

  return (
    <AnalysisDetailSection
      key={sectionKey}
      title="등기부등본 전체 분석"
      icon={<FileText size={22} />}
      items={items}
      direction="grid"
    />
  );
}
