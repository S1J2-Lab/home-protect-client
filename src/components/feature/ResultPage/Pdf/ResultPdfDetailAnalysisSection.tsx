import styled from '@emotion/styled';

import type { ResultData } from '../../../../types/result';
import { JeonseRatioCard } from '../DetailAnalysis/Jeonse/JeonseRatioCard';
import { BuildingInfoCard } from '../DetailAnalysis/Building/BuildingInfoCard';
import { getRegistryAnalysisIssues } from '../../../../utils/registryAnalysis';
import { getContractAnalysisIssues } from '../../../../utils/contractAnalysis';
import { PdfAnalysisDetailBlock } from './PdfAnalysisDetailBlock';
import { FileText, ScrollText } from 'lucide-react';

interface ResultPdfDetailAnalysisSectionProps {
  result: ResultData;
}

export function ResultPdfDetailAnalysisSection({
  result,
}: ResultPdfDetailAnalysisSectionProps) {
  const registryItems = getRegistryAnalysisIssues(result.registry);
  const contractItems = getContractAnalysisIssues(result.contract);

  return (
    <PdfSection>
      <PdfBorderSection data-pdf-section>
        <JeonseRatioCard jeonseRatio={result.jeonseRatio} />
      </PdfBorderSection>

      <PdfBorderSection>
        <PdfAnalysisDetailBlock
          title="등기부등본 전체 분석"
          icon={<FileText size={22} />}
          items={registryItems}
        />
      </PdfBorderSection>

      <PdfBorderSection>
        <PdfAnalysisDetailBlock
          title="임대차계약서 전체 분석"
          icon={<ScrollText size={22} />}
          items={contractItems}
          showRowDivider
        />
      </PdfBorderSection>

      <PdfBorderSection data-pdf-section>
        <BuildingInfoCard building={result.building} />
      </PdfBorderSection>
    </PdfSection>
  );
}

const PdfSection = styled.section`
  display: flex;
  flex-direction: column;
`;

const PdfBorderSection = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.borderLight};
  padding-top: 18px;
  margin-top: 18px;
`;
