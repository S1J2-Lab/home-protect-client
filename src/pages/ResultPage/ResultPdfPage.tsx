import { forwardRef } from 'react';
import styled from '@emotion/styled';

import type { ResultData } from '../../types/result';
import { ResultAddressCard } from '../../components/feature/ResultPage/ResultAddressCard';
import { ResultPdfDetailAnalysisSection } from '../../components/feature/ResultPage/Pdf/ResultPdfDetailAnalysisSection';
import { formatAnalyzedAt } from '../../utils/date';

interface ResultPdfContentProps {
  result: ResultData;
}

export const ResultPdfContent = forwardRef<
  HTMLDivElement,
  ResultPdfContentProps
>(({ result }, ref) => {
  return (
    <PdfOnlyContent ref={ref}>
      <PdfAddressSection data-pdf-section>
        <ResultAddressCard address={result.address} />
      </PdfAddressSection>

      <PdfAnalyzedAtSection data-pdf-section>
        <AnalyzedAt>분석일 {formatAnalyzedAt(result.analyzedAt)}</AnalyzedAt>
      </PdfAnalyzedAtSection>

      <ResultPdfDetailAnalysisSection result={result} />
    </PdfOnlyContent>
  );
});

ResultPdfContent.displayName = 'ResultPdfContent';

const PdfOnlyContent = styled.div`
  position: fixed;
  top: 0;
  left: -9999px;

  width: 550px;
  background: ${({ theme }) => theme.colors.bg};

  display: flex;
  flex-direction: column;
`;

const PdfAddressSection = styled.div`
  width: 100%;
`;

const PdfAnalyzedAtSection = styled.div`
  width: 100%;
  padding: 0 24px 18px;
`;

const AnalyzedAt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 14px;
  font-weight: 500;
  text-align: right;
`;
