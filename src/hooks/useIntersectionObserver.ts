import { useEffect } from 'react';
import type { RefObject } from 'react';

interface UseIntersectionObserverParams {
  rootRef?: RefObject<Element | null>;
  targetRef: RefObject<Element | null>;
  enabled: boolean;
  onIntersect: () => void;
  rootMargin?: string;
  threshold?: number;
}

export function useIntersectionObserver({
  rootRef,
  targetRef,
  enabled,
  onIntersect,
  rootMargin = '120px',
  threshold = 0.1,
}: UseIntersectionObserverParams) {
  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        onIntersect();
      },
      {
        root: rootRef?.current ?? null,
        rootMargin,
        threshold,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [enabled, onIntersect, rootMargin, rootRef, targetRef, threshold]);
}
