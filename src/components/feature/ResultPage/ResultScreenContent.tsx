import styled from '@emotion/styled';
import { Download } from 'lucide-react';
import { ResultAddressCard } from './ResultAddressCard';
import type { ResultData } from '../../../types/result';
import type { ResultTab } from '../../../types/tab';
import { formatAnalyzedAt } from '../../../utils/date';
import { Button } from '../../common/Button';
import { ResultTabs } from './ResultTabs';

interface ResultScreenContentProps {
  result: ResultData;
  activeTab: ResultTab;
  onChangeTab: (tab: ResultTab) => void;
  onPdfSave: () => void;
  isPdfSaving: boolean;
}

export function ResultScreenContent({
  result,
  activeTab,
  onChangeTab,
  onPdfSave,
  isPdfSaving,
}: ResultScreenContentProps) {
  return (
    <ScreenContent>
      <ResultAddressCard address={result.address} />

      <ResultMetaRow>
        <AnalyzedAt>분석일 {formatAnalyzedAt(result.analyzedAt)}</AnalyzedAt>
        <Button
          variant="outline"
          size="sm"
          iconStart={<Download size={16} />}
          onClick={onPdfSave}
          disabled={isPdfSaving}
        >
          {isPdfSaving ? '저장 중' : 'PDF 저장'}
        </Button>
      </ResultMetaRow>

      <ResultTabs activeTab={activeTab} onChangeTab={onChangeTab} />
    </ScreenContent>
  );
}

const ScreenContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ResultMetaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 5px;
`;

const AnalyzedAt = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 13px;
  font-weight: 500;
`;
