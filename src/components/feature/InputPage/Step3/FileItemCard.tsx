import styled from '@emotion/styled';
import { Check, Trash2, Loader, XCircle } from 'lucide-react';
import { Tag } from '../../../common/Tag';
import { Button } from '../../../common/Button';
import type {
  UploadedFile,
  FileStatus,
} from '../../../../constants/uploadedFile';

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
  onRemove,
  dragHandle,
}: FileItemCardProps) {
  return (
    <ItemWrap $status={status}>
      <Row>
        {dragHandle}

        <StatusIconBox $status={status}>
          {status === 'safe' && (
            <Check
              size={STATUS_ICON_SIZE}
              strokeWidth={ICON_STROKE_WIDTH}
              aria-hidden="true"
            />
          )}
          {status === 'loading' && (
            <Loader
              size={STATUS_ICON_SIZE}
              strokeWidth={ICON_STROKE_WIDTH}
              aria-hidden="true"
            />
          )}
          {(status === 'error' || status === 'pending') && (
            <XCircle
              size={STATUS_ICON_SIZE}
              strokeWidth={ICON_STROKE_WIDTH}
              aria-hidden="true"
            />
          )}
        </StatusIconBox>

        <Meta>
          <FileName>{name}</FileName>
          <SubRow>
            {status === 'safe' && <Tag variant="safe">정상</Tag>}
            {status === 'loading' && <Tag variant="primary">분석 중</Tag>}
            {status === 'error' && <Tag variant="danger">재업로드 필요</Tag>}
            {status === 'pending' && <Tag variant="caution">대기 중</Tag>}
            <Separator>·</Separator>
            <FileSize>{formatSize(size)}</FileSize>
          </SubRow>
        </Meta>

        <Actions>
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
    </ItemWrap>
  );
}

const ItemWrap = styled.div<{ $status: FileStatus }>`
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
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

const StatusIconBox = styled.div<{ $status: FileStatus }>`
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme, $status }) =>
    $status === 'safe' ? theme.colors.successBg : theme.colors.primaryLight};
  color: ${({ theme, $status }) =>
    $status === 'safe' ? theme.colors.success : theme.colors.primary};
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
