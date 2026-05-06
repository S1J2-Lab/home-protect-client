import styled from '@emotion/styled';
import { Plus } from 'lucide-react';

const ICON_SIZE = 22;
const ICON_STROKE_WIDTH = 1.8;

interface UploaderEmptyDropZoneProps {
  onClick: () => void;
}

export function UploaderEmptyDropZone({ onClick }: UploaderEmptyDropZoneProps) {
  return (
    <DropZone type="button" onClick={onClick}>
      <Plus
        size={ICON_SIZE}
        strokeWidth={ICON_STROKE_WIDTH}
        aria-hidden="true"
      />
      <HintText>여기를 눌러 파일을 업로드하세요</HintText>
      <SubHint>PDF · 여러 장 가능</SubHint>
    </DropZone>
  );
}

const DropZone = styled.button`
  width: 100%;
  border: 1.5px dashed ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.bg};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 28px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.textMuted};
  transition:
    border-color 0.15s,
    color 0.15s;

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const HintText = styled.p`
  font-size: 13px;
  font-weight: 600;
  color: inherit;
`;

const SubHint = styled.p`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.textMuted};
`;
