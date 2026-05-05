import styled from '@emotion/styled';

interface ChecklistProgressProps {
  checkedCount: number;
  totalCount: number;
}

export function ChecklistProgress({
  checkedCount,
  totalCount,
}: ChecklistProgressProps) {
  const progressPercent =
    totalCount === 0 ? 0 : Math.round((checkedCount / totalCount) * 100);

  return (
    <ProgressBox>
      <ProgressText>
        현재 진행률{' '}
        <strong>
          {checkedCount} / {totalCount}
        </strong>
      </ProgressText>

      <ProgressRow>
        <ProgressTrack>
          <ProgressFill percent={progressPercent} />
        </ProgressTrack>
        <Percent>{progressPercent}%</Percent>
      </ProgressRow>
    </ProgressBox>
  );
}

const ProgressBox = styled.div`
  min-width: 220px;
`;

const ProgressText = styled.p`
  margin: 0 0 8px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 14px;

  strong {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 800;
  }
`;

const ProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ProgressTrack = styled.div`
  flex: 1;
  height: 8px;
  border-radius: 999px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.borderLight};
`;

const ProgressFill = styled.div<{ percent: number }>`
  width: ${({ percent }) => percent}%;
  height: 100%;
  border-radius: inherit;
  background: ${({ theme }) => theme.colors.primary};
  transition: width 0.2s ease;
`;

const Percent = styled.span`
  min-width: 36px;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 14px;
  font-weight: 700;
  text-align: right;
`;
