import { useCallback, useRef, useState, type ReactNode } from 'react';
import styled from '@emotion/styled';

import { AnalysisCard } from '../../../../common/AnalysisCard';
import { AnalysisIssueList } from './AnalysisIssueList';
import { useIntersectionObserver } from '../../../../../hooks/useIntersectionObserver';
import type { AnalysisIssueItem } from '../../../../../types/result';

const INITIAL_VISIBLE_COUNT = 5;
const LOAD_MORE_COUNT = 5;

interface AnalysisDetailSectionProps {
  title: string;
  icon: ReactNode;
  items: AnalysisIssueItem[];
  showRowDivider?: boolean;
}

export function AnalysisDetailSection({
  title,
  icon,
  items,
  showRowDivider = false,
}: AnalysisDetailSectionProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);
  const observerTargetRef = useRef<HTMLDivElement | null>(null);

  const visibleItems = items.slice(0, visibleCount);
  const hasMoreItems = visibleCount < items.length;

  const handleIntersect = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, items.length));
  }, [items.length]);

  useIntersectionObserver({
    targetRef: observerTargetRef,
    enabled: hasMoreItems,
    onIntersect: handleIntersect,
  });

  return (
    <AnalysisCard icon={icon} title={title}>
      <AnalysisIssueList items={visibleItems} showRowDivider={showRowDivider} />

      {hasMoreItems && (
        <ObserverTarget ref={observerTargetRef}>
          더 많은 분석 항목을 불러오는 중이에요.
        </ObserverTarget>
      )}
    </AnalysisCard>
  );
}

const ObserverTarget = styled.div`
  padding: 16px 0;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
`;
