import styled from '@emotion/styled';
import { Lock } from 'lucide-react';

const ICON_SIZE = 12;
const ICON_STROKE_WIDTH = 2.2;

export function UploadAutoDeleteNotice() {
  return (
    <Notice>
      <Lock
        size={ICON_SIZE}
        strokeWidth={ICON_STROKE_WIDTH}
        aria-hidden="true"
      />
      업로드된 파일은 분석 후 자동 삭제돼요
    </Notice>
  );
}

const Notice = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textMuted};
`;
