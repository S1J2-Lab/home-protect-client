import { useState } from 'react';
import styled from '@emotion/styled';
import { ClipboardCheck } from 'lucide-react';
import { AnalysisCard } from '../../components/common/AnalysisCard';
import { COMMON_CHECKLIST } from '../../constants/checklist';
import { ChecklistProgress } from '../../components/feature/ResultPage/Checklist/ChecklistProgress';
import { ChecklistItemList } from '../../components/feature/ResultPage/Checklist/ChecklistItemList';

export function ChecklistSection() {
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const totalCount = COMMON_CHECKLIST.length;
  const checkedCount = checkedIds.length;

  const toggleChecklist = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id)
        ? prev.filter((checkedId) => checkedId !== id)
        : [...prev, id],
    );
  };

  return (
    <AnalysisCard icon={<ClipboardCheck />} title="체크리스트">
      <GuideBox>
        <GuideText>
          계약 전 마지막으로 확인하면 좋은 항목들이에요. 서류 분석 결과와 함께
          직접 확인하고, 애매한 부분은 전문가 상담을 받아보세요.
        </GuideText>
        <Divider />
        <ChecklistProgress
          checkedCount={checkedCount}
          totalCount={totalCount}
        />
      </GuideBox>

      <ChecklistItemList
        items={COMMON_CHECKLIST}
        checkedIds={checkedIds}
        onToggle={toggleChecklist}
      />
    </AnalysisCard>
  );
}

const GuideBox = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.bg};
`;

const GuideText = styled.p`
  margin: 0 0 14px;
  font-size: 13px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textSub};
`;

const Divider = styled.div`
  height: 1px;
  margin: 12px 0;
  background: ${({ theme }) => theme.colors.borderLight};
`;
