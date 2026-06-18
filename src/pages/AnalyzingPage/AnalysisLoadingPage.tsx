import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAnalyzingProgress } from '../../hooks/useAnalyzingProgress';
import type { AnalysisPageStatus } from '../../types/analysis';
import { AnalysisErrorView } from './AnalysisErrorView';
import { AnalysisLoadingView } from './AnalysisLoadingView';
import { getAnalysisSessionId } from '../../utils/analysisStorage';
import { useBeforeUnload } from '../../hooks/useBeforeUnload';

export function AnalysisLoadingPage() {
  const navigate = useNavigate();

  const sessionId = getAnalysisSessionId();
  const isSessionIdMissing = !sessionId;

  const [pageStatus, setPageStatus] = useState<AnalysisPageStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [retryKey, setRetryKey] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useBeforeUnload(!isCompleted);

  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    if (completeTimerRef.current) {
      clearTimeout(completeTimerRef.current);
    }

    completeTimerRef.current = setTimeout(() => {
      setIsCompleted(true);
      navigate('/result');
    }, 700);
  }, [navigate]);

  useEffect(() => {
    return () => {
      if (completeTimerRef.current) {
        clearTimeout(completeTimerRef.current);
      }
    };
  }, []);

  const handleError = useCallback((message: string) => {
    setErrorMessage(message);
    setPageStatus('error');
  }, []);

  const { progress, steps, resetProgress } = useAnalyzingProgress({
    sessionId,
    retryKey,
    onComplete: handleComplete,
    onError: handleError,
  });

  const handleRetry = () => {
    if (isSessionIdMissing) {
      navigate('/input');
      return;
    }

    resetProgress();
    setErrorMessage('');
    setPageStatus('loading');
    setRetryKey((prev) => prev + 1);
  };

  return (
    <PageWrapper>
      {pageStatus === 'error' ? (
        <AnalysisErrorView
          errorMessage={errorMessage}
          buttonText={
            isSessionIdMissing ? '정보 다시 입력하기' : '다시 분석하기'
          }
          onRetry={handleRetry}
        />
      ) : (
        <AnalysisLoadingView progress={progress} steps={steps} />
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.main`
  padding: 32px 20px 36px;
`;
