import styled from '@emotion/styled';
import type { ReactNode } from 'react';

import { AnalysisCard } from '../../../common/AnalysisCard';
import { AnalysisIssueList } from '../DetailAnalysis/RegistryContract/AnalysisIssueList';
import type { AnalysisIssueItem } from '../../../../types/analysisIssue';

interface PdfAnalysisDetailBlockProps {
  title: string;
  icon: ReactNode;
  items: AnalysisIssueItem[];
  showRowDivider?: boolean;
}

export function PdfAnalysisDetailBlock({
  title,
  icon,
  items,
  showRowDivider = false,
}: PdfAnalysisDetailBlockProps) {
  return (
    <PdfDetailBlock>
      <PdfTitleSection data-pdf-title-section>
        <AnalysisCard icon={icon} title={title}>
          <></>
        </AnalysisCard>
      </PdfTitleSection>

      {items.map((item) => (
        <PdfIssueSection key={item.title} data-pdf-section>
          <PdfIssueInner>
            <AnalysisIssueList items={[item]} showRowDivider={showRowDivider} />
          </PdfIssueInner>
        </PdfIssueSection>
      ))}
    </PdfDetailBlock>
  );
}

const PdfDetailBlock = styled.div`
  display: flex;
  flex-direction: column;
`;

const PdfTitleSection = styled.div`
  width: 100%;
  padding-bottom: 14px;
`;

const PdfIssueSection = styled.div`
  width: 100%;
  padding-bottom: 14px;
`;

const PdfIssueInner = styled.div`
  padding: 0 24px;
`;
