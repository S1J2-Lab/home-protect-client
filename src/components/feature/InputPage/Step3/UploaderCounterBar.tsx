import styled from '@emotion/styled';
import { Plus } from 'lucide-react';
import { Button } from '../../../common/Button';

interface UploaderCounterBarProps {
  count: number;
  onAdd: () => void;
}

export function UploaderCounterBar({ count, onAdd }: UploaderCounterBarProps) {
  return (
    <Bar>
      <Counter>
        업로드된 파일 <CountNum>{count}</CountNum>개
      </Counter>
      {count > 0 && (
        <Button
          variant="dashed"
          size="sm"
          iconStart={<Plus size={12} strokeWidth={3} aria-hidden="true" />}
          onClick={onAdd}
        >
          파일 추가
        </Button>
      )}
    </Bar>
  );
}

const Bar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Counter = styled.p`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const CountNum = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 800;
`;
