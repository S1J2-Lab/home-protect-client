import { useRef, useState } from 'react';

interface UseDragSortOptions<T> {
  items: T[];
  onReorder: (next: T[]) => void;
}

interface DragHandlers {
  onDragStart: (e: React.DragEvent) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDragLeave: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

interface UseDragSortResult {
  draggingIdx: number | null;
  overIdx: number | null;
  getItemHandlers: (idx: number) => DragHandlers;
}

export function useDragSort<T>({
  items,
  onReorder,
}: UseDragSortOptions<T>): UseDragSortResult {
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const touchDraggingIdxRef = useRef<number | null>(null);
  const itemHeightRef = useRef<number>(0);
  const listTopRef = useRef<number>(0);

  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onReorder(next);
  };

  const getItemHandlers = (idx: number): DragHandlers => ({
    onDragStart(e) {
      setDraggingIdx(idx);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', String(idx));
    },
    onDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      if (overIdx !== idx) setOverIdx(idx);
    },
    onDrop(e) {
      e.preventDefault();
      if (draggingIdx !== null && draggingIdx !== idx) {
        reorder(draggingIdx, idx);
      }
      setDraggingIdx(null);
      setOverIdx(null);
    },
    onDragEnd() {
      setDraggingIdx(null);
      setOverIdx(null);
    },
    onDragLeave() {
      setOverIdx((cur) => (cur === idx ? null : cur));
    },

    onTouchStart(e) {
      const target = e.currentTarget as HTMLElement;
      const rect = target.getBoundingClientRect();
      // gap 8px을 포함한 아이템 높이로 터치 이동 중 타깃 인덱스를 계산
      itemHeightRef.current = rect.height + 8;
      listTopRef.current =
        target.parentElement?.getBoundingClientRect().top ?? rect.top;
      touchDraggingIdxRef.current = idx;
      setDraggingIdx(idx);
    },
    onTouchMove(e) {
      e.preventDefault();
      const touch = e.touches[0];
      const offsetFromListTop = touch.clientY - listTopRef.current;
      const targetIdx = Math.min(
        items.length - 1,
        Math.max(0, Math.floor(offsetFromListTop / itemHeightRef.current)),
      );
      if (overIdx !== targetIdx) setOverIdx(targetIdx);
    },
    onTouchEnd() {
      const from = touchDraggingIdxRef.current;
      if (from !== null && overIdx !== null && from !== overIdx) {
        reorder(from, overIdx);
      }
      setDraggingIdx(null);
      setOverIdx(null);
      touchDraggingIdxRef.current = null;
    },
  });

  return { draggingIdx, overIdx, getItemHandlers };
}
