import { useEffect, type RefObject } from 'react';

interface UseInfiniteAddressScrollParams {
  rootRef: RefObject<HTMLDivElement | null>;
  targetRef: RefObject<HTMLDivElement | null>;
  enabled: boolean;
  onIntersect: () => void;
}

export function useInfiniteAddressScroll({
  rootRef,
  targetRef,
  enabled,
  onIntersect,
}: UseInfiniteAddressScrollParams) {
  useEffect(() => {
    if (!enabled) return;

    const target = targetRef.current;

    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onIntersect();
        }
      },
      {
        root: rootRef.current,
        rootMargin: '40px',
        threshold: 0.1,
      },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [enabled, onIntersect, rootRef, targetRef]);
}
