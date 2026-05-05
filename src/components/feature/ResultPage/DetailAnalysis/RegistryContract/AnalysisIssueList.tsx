import styled from '@emotion/styled';
import { AnalysisIssueCard } from './AnalysisIssueCard';
import type { AnalysisIssueItem } from '../../../../../types/analysis';

interface AnalysisIssueListProps {
  items: AnalysisIssueItem[];
  direction?: 'grid' | 'column';
}

export function AnalysisIssueList({
  items,
  direction = 'grid',
}: AnalysisIssueListProps) {
  return (
    <Content>
      {items.map((item, index) => (
        <AnalysisIssueCard
          key={item.id}
          order={index + 1}
          item={item}
          direction={direction}
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
