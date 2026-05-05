import { useEffect, useRef, useState, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { AnalysisIssueList } from './AnalysisIssueList';
import type {
  AnalysisIssueItem,
  IssueDirection,
} from '../../../../../types/result';

const INITIAL_VISIBLE_COUNT = 5;
const LOAD_MORE_COUNT = 5;

interface AnalysisDetailSectionProps {
  title: string;
  icon: ReactNode;
  items: AnalysisIssueItem[];
  direction?: IssueDirection;
}

export function AnalysisDetailSection({
  title,
  icon,
  items,
  direction = 'grid',
}: AnalysisDetailSectionProps) {
  const observerRef = useRef<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_COUNT);

  const visibleItems = items.slice(0, visibleCount);
  const hasMoreItems = visibleCount < items.length;

  useEffect(() => {
    if (!hasMoreItems) return;

    const observerTarget = observerRef.current;
    if (!observerTarget) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setVisibleCount((prev) =>
          Math.min(prev + LOAD_MORE_COUNT, items.length),
        );
      },
      {
        root: null,
        rootMargin: '120px',
        threshold: 0.1,
      },
    );

    observer.observe(observerTarget);

    return () => {
      observer.unobserve(observerTarget);
    };
  }, [hasMoreItems, items.length]);

  return (
    <Page>
      <Header>
        <TitleGroup>
          {icon}
          <Title>{title}</Title>
        </TitleGroup>
      </Header>

      <AnalysisIssueList items={visibleItems} direction={direction} />

      {hasMoreItems && (
        <ObserverTarget ref={observerRef}>
          더 많은 분석 항목을 불러오는 중이에요.
        </ObserverTarget>
      )}
    </Page>
  );
}

const Page = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
`;

const TitleGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Title = styled.h1`
  display: block;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const ObserverTarget = styled.div`
  padding: 16px 0;
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSub};
`;
