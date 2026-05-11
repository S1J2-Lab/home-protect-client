import { useRef, useState } from 'react';

interface UseDragSortOptions<T> {
  items: T[];
  onReorder: (next: T[]) => void;
  disabled?: boolean;
}

interface DragHandlers {
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onDragLeave: () => void;
}

interface HandleHandlers {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseUp: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

interface UseDragSortResult {
  draggingIdx: number | null;
  overIdx: number | null;
  getItemHandlers: (idx: number) => DragHandlers;
  getHandleHandlers: (idx: number) => HandleHandlers;
}

const NOOP_DRAG_HANDLERS: DragHandlers = {
  onDragOver: () => {},
  onDrop: () => {},
  onDragEnd: () => {},
  onDragLeave: () => {},
};

const NOOP_HANDLE_HANDLERS: HandleHandlers = {
  onMouseDown: () => {},
  onMouseUp: () => {},
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
};

export function useDragSort<T>({
  items,
  onReorder,
  disabled = false,
}: UseDragSortOptions<T>): UseDragSortResult {
  const [draggingIdx, setDraggingIdx] = useState<number | null>(null);
  const [overIdx, setOverIdx] = useState<number | null>(null);

  const isDragFromHandleRef = useRef(false);
  const touchDraggingIdxRef = useRef<number | null>(null);
  const isTouchFromHandleRef = useRef(false);
  const itemHeightRef = useRef<number>(0);
  const listTopRef = useRef<number>(0);

  const reorder = (from: number, to: number) => {
    if (from === to) return;
    const next = [...items];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    onReorder(next);
  };

  const getItemHandlers = (idx: number): DragHandlers => {
    if (disabled) return NOOP_DRAG_HANDLERS;
    return {
      onDragOver(e) {
        if (!isDragFromHandleRef.current) return;
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
        isDragFromHandleRef.current = false;
      },
      onDragEnd() {
        setDraggingIdx(null);
        setOverIdx(null);
        isDragFromHandleRef.current = false;
      },
      onDragLeave() {
        setOverIdx((cur) => (cur === idx ? null : cur));
      },
    };
  };

  const getHandleHandlers = (idx: number): HandleHandlers => {
    if (disabled) return NOOP_HANDLE_HANDLERS;
    return {
      onMouseDown(e) {
        const itemEl = (e.currentTarget as HTMLElement).closest(
          '[data-drag-item]',
        ) as HTMLElement | null;
        isDragFromHandleRef.current = true;
        if (itemEl) {
          itemEl.draggable = true;

          const onDragStart = (e: DragEvent) => {
            if (!isDragFromHandleRef.current) {
              e.preventDefault();
              return;
            }
            setDraggingIdx(idx);
            if (e.dataTransfer) {
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', String(idx));
            }
          };

          const cleanup = () => {
            itemEl.draggable = false;
            isDragFromHandleRef.current = false;
            itemEl.removeEventListener('dragstart', onDragStart);
            itemEl.removeEventListener('dragend', cleanup);
            document.removeEventListener('mouseup', cleanup);
          };

          itemEl.addEventListener('dragstart', onDragStart);
          itemEl.addEventListener('dragend', cleanup);
          // 드래그 없이 mouseUp만 발생해도 정리되도록 보장
          document.addEventListener('mouseup', cleanup, { once: true });
        }
      },
      onMouseUp() {},
      onTouchStart(e) {
        isTouchFromHandleRef.current = true;
        const target = (e.currentTarget as HTMLElement).closest(
          '[data-drag-item]',
        ) as HTMLElement | null;
        const rect = (
          target ?? (e.currentTarget as HTMLElement)
        ).getBoundingClientRect();
        itemHeightRef.current = rect.height + 8;
        listTopRef.current = (
          target?.parentElement ?? (e.currentTarget as HTMLElement)
        ).getBoundingClientRect().top;
        touchDraggingIdxRef.current = idx;
        setDraggingIdx(idx);
      },
      onTouchMove(e) {
        if (!isTouchFromHandleRef.current) return;
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
        isTouchFromHandleRef.current = false;
      },
    };
  };

  return { draggingIdx, overIdx, getItemHandlers, getHandleHandlers };
}
