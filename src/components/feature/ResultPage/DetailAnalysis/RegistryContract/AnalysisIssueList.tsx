import styled from '@emotion/styled';
import { AnalysisIssueCard } from './AnalysisIssueCard';
import type { AnalysisIssueItem } from '../../../../../types/analysisIssue';
interface AnalysisIssueListProps {
  items: AnalysisIssueItem[];
  showRowDivider?: boolean;
}

export function AnalysisIssueList({
  items,
  showRowDivider = false,
}: AnalysisIssueListProps) {
  return (
    <Content>
      {items.map((item, index) => (
        <AnalysisIssueCard
          key={item.id}
          order={index + 1}
          item={item}
          showRowDivider={showRowDivider}
        />
      ))}
    </Content>
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
