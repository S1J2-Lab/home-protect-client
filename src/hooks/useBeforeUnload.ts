import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';

const UNLOAD_MESSAGE =
  '페이지를 벗어나면 입력한 내용이 모두 초기화됩니다.\n계속하시겠습니까?';

export function useBeforeUnload(isActive: boolean) {
  useEffect(() => {
    if (!isActive) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isActive]);

  const blocker = useBlocker(() => isActive);

  useEffect(() => {
    if (blocker.state !== 'blocked') return;

    const id = setTimeout(() => {
      if (window.confirm(UNLOAD_MESSAGE)) {
        blocker.proceed();
      } else {
        blocker.reset();
      }
    }, 0);

    return () => clearTimeout(id);
  }, [blocker]);
}
