import type { RefObject } from 'react';
import { useIntersectionObserver } from './useIntersectionObserver';

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
  useIntersectionObserver({
    rootRef,
    targetRef,
    enabled,
    onIntersect,
  });
}
