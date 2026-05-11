import styled from '@emotion/styled';
import { GripVertical, Lock } from 'lucide-react';
import { FileItemCard } from './FileItemCard';
import { useDragSort } from '../../../../hooks/useDragSort';
import type { UploadedFile } from '../../../../constants/uploadedFile';

const GRIP_SIZE = 16;
const GRIP_STROKE_WIDTH = 2;

interface UploaderFileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  onReorder: (files: UploadedFile[]) => void;
  isLocked: boolean;
}

function DraggableItem({
  file,
  idx,
  isDragging,
  isOver,
  isLocked,
  getItemHandlers,
  getHandleHandlers,
  onRemove,
}: {
  file: UploadedFile;
  idx: number;
  isDragging: boolean;
  isOver: boolean;
  isLocked: boolean;
  getItemHandlers: ReturnType<typeof useDragSort>['getItemHandlers'];
  getHandleHandlers: ReturnType<typeof useDragSort>['getHandleHandlers'];
  onRemove: (id: string) => void;
}) {
  const itemHandlers = getItemHandlers(idx);
  const handleHandlers = getHandleHandlers(idx);

  return (
    <ItemWrapper
      data-drag-item
      $isDragging={isDragging}
      $isOver={isOver}
      {...itemHandlers}
    >
      <FileItemCard
        {...file}
        onRemove={onRemove}
        dragHandle={
          <DragHandle
            $isLocked={isLocked}
            aria-label={isLocked ? '순서 잠금됨' : '드래그하여 순서 변경'}
            {...handleHandlers}
          >
            {isLocked ? (
              <Lock
                size={GRIP_SIZE}
                strokeWidth={GRIP_STROKE_WIDTH}
                aria-hidden="true"
              />
            ) : (
              <GripVertical
                size={GRIP_SIZE}
                strokeWidth={GRIP_STROKE_WIDTH}
                aria-hidden="true"
              />
            )}
          </DragHandle>
        }
      />
    </ItemWrapper>
  );
}

export function UploaderFileList({
  files,
  onRemove,
  onReorder,
  isLocked,
}: UploaderFileListProps) {
  const { draggingIdx, overIdx, getItemHandlers, getHandleHandlers } =
    useDragSort({ items: files, onReorder, disabled: isLocked });

  return (
    <List>
      {files.map((file, idx) => (
        <DraggableItem
          key={file.id}
          file={file}
          idx={idx}
          isDragging={draggingIdx === idx}
          isOver={
            overIdx === idx && draggingIdx !== null && draggingIdx !== idx
          }
          isLocked={isLocked}
          getItemHandlers={getItemHandlers}
          getHandleHandlers={getHandleHandlers}
          onRemove={onRemove}
        />
      ))}
    </List>
  );
}

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemWrapper = styled.div<{ $isDragging: boolean; $isOver: boolean }>`
  opacity: ${({ $isDragging }) => ($isDragging ? 0.4 : 1)};
  border-radius: ${({ theme }) => theme.radius.md};
  outline: ${({ theme, $isOver }) =>
    $isOver ? `2px solid ${theme.colors.primary}` : 'none'};
  outline-offset: 1px;
  transition:
    opacity 0.15s,
    outline 0.1s;
`;

const DragHandle = styled.div<{ $isLocked: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 30px;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: ${({ $isLocked }) => ($isLocked ? 'not-allowed' : 'grab')};
  opacity: ${({ $isLocked }) => ($isLocked ? 0.4 : 1)};
  flex-shrink: 0;
  touch-action: none;

  &:active {
    cursor: ${({ $isLocked }) => ($isLocked ? 'not-allowed' : 'grabbing')};
  }
`;
