import styled from '@emotion/styled';
import { AnalysisIssueCard } from './AnalysisIssueCard';
import type { AnalysisIssueItem } from '../../../../../types/analysisIssue';

interface AnalysisIssueListProps {
  items: AnalysisIssueItem[];
  showRowDivider?: boolean;
  isPreview?: boolean;
  emptyMessage?: string;
}
export function AnalysisIssueList({
  items,
  showRowDivider = false,
  isPreview = false,
  emptyMessage = '확인이 필요한 분석 내역이 없어요.',
}: AnalysisIssueListProps) {
  if (items.length === 0) {
    return <EmptyText>{emptyMessage}</EmptyText>;
  }

  return (
    <>
      {items.map((item, index) => (
        <AnalysisIssueCard
          key={item.id}
          order={index + 1}
          item={item}
          showRowDivider={showRowDivider}
          isPreview={isPreview}
        />
      ))}
    </>
  );
}

const EmptyText = styled.p`
  margin: 0;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
