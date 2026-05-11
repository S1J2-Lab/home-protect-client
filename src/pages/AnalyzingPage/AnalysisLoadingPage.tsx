import styled from '@emotion/styled';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalyzingProgress } from '../../hooks/useAnalyzingProgress';
import type { AnalysisPageStatus } from '../../types/analysis';
import { AnalysisErrorView } from './AnalysisErrorView';
import { AnalysisLoadingView } from './AnalysisLoadingView';
import { saveAnalysisSessionId } from '../../utils/analysisStorage';

interface AnalysisLocationState {
  sessionId?: string;
}

export function AnalysisLoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as AnalysisLocationState | null;
  const sessionId = state?.sessionId ?? null;
  const isSessionIdMissing = !sessionId;

  const [pageStatus, setPageStatus] = useState<AnalysisPageStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleComplete = useCallback(() => {
    if (completeTimerRef.current) {
      clearTimeout(completeTimerRef.current);
    }

    completeTimerRef.current = setTimeout(() => {
      if (sessionId) {
        saveAnalysisSessionId(sessionId);
      }

      navigate('/result', {
        state: { sessionId },
      });
    }, 700);
  }, [navigate, sessionId]);

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
