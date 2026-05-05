import styled from '@emotion/styled';
import { Tag } from '../../../../common/Tag';
import type { AnalysisIssueItem } from '../../../../../types/analysis';

interface AnalysisIssueCardProps {
  order: number;
  item: AnalysisIssueItem;
  direction?: 'grid' | 'column';
}

export function AnalysisIssueCard({
  order,
  item,
  direction = 'grid',
}: AnalysisIssueCardProps) {
  return (
    <IssueCard>
      <IssueHeader>
        <Tag variant={item.variant}>{item.label}</Tag>
        <IssueTitle>
          {order}. {item.title}
        </IssueTitle>
      </IssueHeader>

      <InfoGrid direction={direction}>
        {item.details.map((detail, index) => (
          <InfoBox
            key={`${item.id}-${detail.label}`}
            direction={direction}
            hasDivider={index < item.details.length - 1}
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
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

const InfoGrid = styled.div<{ direction: 'grid' | 'column' }>`
  display: grid;
  grid-template-columns: ${({ direction }) =>
    direction === 'column' ? '1fr' : 'repeat(2, 1fr)'};
`;

const InfoBox = styled.div<{
  direction: 'grid' | 'column';
  hasDivider: boolean;
}>`
  display: flex;
  flex-direction: column;
  gap: 6px;

  ${({ direction, hasDivider, theme }) =>
    direction === 'grid' &&
    hasDivider &&
    `
      padding-right: 14px;
      margin-right: 14px;
      border-right: 1px solid ${theme.colors.borderLight};
    `}

  ${({ direction, hasDivider, theme }) =>
    direction === 'column' &&
    hasDivider &&
    `
      padding-bottom: 14px;
      margin-bottom: 14px;
      border-bottom: 1px solid ${theme.colors.borderLight};
    `}
`;

const InfoLabel = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
`;

const InfoText = styled.p`
  margin: 0;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
`;
