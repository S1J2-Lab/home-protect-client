import styled from '@emotion/styled';
import { GripVertical } from 'lucide-react';
import { FileItemCard } from './FileItemCard';
import { useDragSort } from '../../../../hooks/useDragSort';
import type { UploadedFile } from '../../../../constants/uploadedFile';

const GRIP_SIZE = 16;
const GRIP_STROKE_WIDTH = 2;

interface UploaderFileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
  onReorder: (files: UploadedFile[]) => void;
}

export function UploaderFileList({
  files,
  onRemove,
  onReorder,
}: UploaderFileListProps) {
  const { draggingIdx, overIdx, getItemHandlers } = useDragSort({
    items: files,
    onReorder,
  });

  return (
    <List>
      {files.map((file, idx) => {
        const handlers = getItemHandlers(idx);
        const isDragging = draggingIdx === idx;
        const isOver =
          overIdx === idx && draggingIdx !== null && draggingIdx !== idx;

        return (
          <ItemWrapper
            key={file.id}
            $isDragging={isDragging}
            $isOver={isOver}
            draggable
            {...handlers}
          >
            <FileItemCard
              {...file}
              onRemove={onRemove}
              dragHandle={
                <DragHandle aria-label="드래그하여 순서 변경">
                  <GripVertical
                    size={GRIP_SIZE}
                    strokeWidth={GRIP_STROKE_WIDTH}
                    aria-hidden="true"
                  />
                </DragHandle>
              }
            />
          </ItemWrapper>
        );
      })}
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
  touch-action: none;
`;

const DragHandle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 30px;
  color: ${({ theme }) => theme.colors.textMuted};
  cursor: grab;
  flex-shrink: 0;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`;
