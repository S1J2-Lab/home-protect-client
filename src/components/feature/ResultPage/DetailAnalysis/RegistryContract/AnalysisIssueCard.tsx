import styled from '@emotion/styled';
import { Tag } from '../../../../common/Tag';
import type { AnalysisIssueItem } from '../../../../../types/result';

interface AnalysisIssueCardProps {
  order: number;
  item: AnalysisIssueItem;
  showRowDivider?: boolean;
}

export function AnalysisIssueCard({
  order,
  item,
  showRowDivider = false,
}: AnalysisIssueCardProps) {
  return (
    <IssueCard>
      <IssueHeader>
        <Tag variant={item.variant}>{item.label}</Tag>
        <IssueTitle>
          {order}. {item.title}
        </IssueTitle>
      </IssueHeader>

      <InfoGrid showRowDivider={showRowDivider}>
        {item.details.map((detail, index) => (
          <InfoBox
            key={`${item.id}-${detail.label}`}
            isLeftColumn={index % 2 === 0}
            isTopRow={index < 2}
            showRowDivider={showRowDivider}
          >
            <InfoLabel>{detail.label}</InfoLabel>
            <InfoText>{detail.content}</InfoText>
          </InfoBox>
        ))}
      </InfoGrid>
    </IssueCard>
  );
}
const IssueCard = styled.div`
  padding: 14px;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
`;

const IssueHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
`;

const IssueTitle = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoGrid = styled.div<{ showRowDivider: boolean }>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const InfoBox = styled.div<{
  isLeftColumn: boolean;
  isTopRow: boolean;
  showRowDivider: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px;

  ${({ isLeftColumn, theme }) =>
    isLeftColumn &&
    `
      border-right: 1px solid ${theme.colors.borderLight};
    `}

  ${({ isTopRow, showRowDivider, theme }) =>
    showRowDivider &&
    isTopRow &&
    `
      border-bottom: 1px solid ${theme.colors.borderLight};
    `}
`;

const InfoLabel = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;
