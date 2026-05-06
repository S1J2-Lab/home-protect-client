import styled from '@emotion/styled';
import { Check, Trash2, TriangleAlert, CircleAlert } from 'lucide-react';
import { useState } from 'react';
import { Tag } from '../../../common/Tag';
import { Button } from '../../../common/Button';
import type { UploadedFile } from '../../../../constants/uploadedFile';

const ICON_STROKE_WIDTH = 2.2;
const STATUS_ICON_SIZE = 18;
const ACTION_ICON_SIZE = 16;

type FileItemCardProps = UploadedFile & {
  onRemove: (id: string) => void;
  dragHandle?: React.ReactNode;
};

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileItemCard({
  id,
  name,
  size,
  status,
  issues,
  onRemove,
  dragHandle,
}: FileItemCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <ItemWrap $status={status}>
      <Row>
        {dragHandle}

        <StatusIconBox $status={status}>
          {status === 'ok' ? (
            <Check
              size={STATUS_ICON_SIZE}
              strokeWidth={ICON_STROKE_WIDTH}
              aria-hidden="true"
            />
          ) : (
            <TriangleAlert
              size={STATUS_ICON_SIZE}
              strokeWidth={ICON_STROKE_WIDTH}
              aria-hidden="true"
            />
          )}
        </StatusIconBox>

        <Meta>
          <FileName>{name}</FileName>
          <SubRow>
            {status === 'ok' ? (
              <Tag variant="success">정상</Tag>
            ) : (
              <WarningBadge>주의 필요</WarningBadge>
            )}
            <Separator>·</Separator>
            <FileSize>{formatSize(size)}</FileSize>
          </SubRow>
        </Meta>

        <Actions>
          {status === 'warning' && (
            <AlertButton
              type="button"
              aria-label="문제 항목 보기"
              onClick={handleToggleExpand}
            >
              <CircleAlert
                size={ACTION_ICON_SIZE}
                strokeWidth={ICON_STROKE_WIDTH}
                aria-hidden="true"
              />
            </AlertButton>
          )}
          <Button
            variant="ghost"
            tone="black"
            size="sm"
            iconStart={
              <Trash2
                size={ACTION_ICON_SIZE}
                strokeWidth={ICON_STROKE_WIDTH}
                aria-hidden="true"
              />
            }
            aria-label="파일 삭제"
            onClick={() => onRemove(id)}
          />
        </Actions>
      </Row>

      {isExpanded && status === 'warning' && <FileIssuePanel issues={issues} />}
    </ItemWrap>
  );
}

interface FileIssuePanelProps {
  issues: string[];
}

function FileIssuePanel({ issues }: FileIssuePanelProps) {
  return (
    <IssuePanel>
      <IssueTitle>
        <TriangleAlert
          size={12}
          strokeWidth={ICON_STROKE_WIDTH}
          aria-hidden="true"
        />
        마스킹이 필요한 항목
      </IssueTitle>
      {issues.map((issue) => (
        <IssueItem key={issue}>{issue}</IssueItem>
      ))}
    </IssuePanel>
  );
}

const ItemWrap = styled.div<{ $status: 'ok' | 'warning' }>`
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid
    ${({ theme, $status }) =>
      $status === 'warning' ? theme.colors.dangerLight : theme.colors.border};
  background: ${({ theme, $status }) =>
    $status === 'warning' ? theme.colors.dangerBg : theme.colors.surface};
  overflow: hidden;
  transition:
    border-color 0.15s,
    background 0.15s;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
`;

const StatusIconBox = styled.div<{ $status: 'ok' | 'warning' }>`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $status }) =>
    $status === 'warning' ? theme.colors.dangerLight : theme.colors.successBg};
  color: ${({ theme, $status }) =>
    $status === 'warning' ? theme.colors.danger : theme.colors.success};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const Meta = styled.div`
  flex: 1;
  min-width: 0;
`;

const FileName = styled.p`
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 4px;
`;

const SubRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const WarningBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 9px;
  border-radius: ${({ theme }) => theme.radius.full};
  font-size: 11px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.dangerLight};
  color: ${({ theme }) => theme.colors.danger};
`;

const Separator = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const FileSize = styled.span`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;

const AlertButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: transparent;
  color: ${({ theme }) => theme.colors.danger};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s;

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background: ${({ theme }) => theme.colors.dangerBg};
  }
`;

const IssuePanel = styled.div`
  border-top: 1px dashed ${({ theme }) => theme.colors.dangerLight};
  background: ${({ theme }) => theme.colors.surface};
  padding: 12px 14px;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const IssueTitle = styled.p`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.danger};
  margin-bottom: 2px;
`;

const IssueItem = styled.p`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSub};

  &::before {
    content: '';
    width: 5px;
    height: 5px;
    border-radius: ${({ theme }) => theme.radius.full};
    background: ${({ theme }) => theme.colors.danger};
    flex-shrink: 0;
  }
`;
