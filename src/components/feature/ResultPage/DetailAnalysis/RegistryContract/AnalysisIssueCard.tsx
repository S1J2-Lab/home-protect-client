import styled from '@emotion/styled';
import { Tag } from '../../../../common/Tag';
import type { AnalysisIssueItem } from '../../../../../types/analysisIssue';
import {
  getRiskLevelLabel,
  toTagVariant,
} from '../../../../../utils/riskMapper';
import { formatDetailContent } from '../../../../../utils/formatDetailContent';

interface AnalysisIssueCardProps {
  order: number;
  item: AnalysisIssueItem;
  showRowDivider?: boolean;
  isPreview?: boolean;
}

export function AnalysisIssueCard({
  order,
  item,
  showRowDivider = false,
  isPreview = false,
}: AnalysisIssueCardProps) {
  return (
    <IssueCard>
      <IssueHeader>
        <Tag variant={toTagVariant(item.riskLevel)}>
          {getRiskLevelLabel(item.riskLevel)}
        </Tag>
        <IssueTitle>
          {order}. {item.title}
        </IssueTitle>
      </IssueHeader>

      <InfoGrid>
        {item.details.map((detail, index) => (
          <InfoBox
            key={`${item.id}-${detail.label}`}
            isLeftColumn={index % 2 === 0}
            isTopRow={index < 2}
            showRowDivider={showRowDivider}
          >
            <InfoLabel>{detail.label}</InfoLabel>
            <InfoText isPreview={isPreview}>
              {formatDetailContent(detail.content)}
            </InfoText>{' '}
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
  margin-bottom: 19px;
`;

const IssueTitle = styled.p`
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoGrid = styled.div`
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

  padding: ${({ isLeftColumn }) =>
    isLeftColumn ? '0 14px 0 0' : '0 0 0 14px'};

  ${({ isLeftColumn, theme }) =>
    isLeftColumn &&
    `
      border-right: 1px solid ${theme.colors.borderLight};
    `}

  ${({ isTopRow, showRowDivider, theme }) =>
    showRowDivider &&
    isTopRow &&
    `
      padding-bottom: 12px;
      margin-bottom: 12px;
      border-bottom: 1px solid ${theme.colors.borderLight};
    `}
`;

const InfoLabel = styled.p`
  margin: 0;
  font-size: 13px;
  font-weight: 600;
`;

const InfoText = styled.p<{ isPreview: boolean }>`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};

  white-space: pre-line;
  word-break: keep-all;

  ${({ isPreview }) =>
    isPreview &&
    `
      display: -webkit-box;
      -webkit-line-clamp: 5;
      -webkit-box-orient: vertical;
      overflow: hidden;
    `}
`;
