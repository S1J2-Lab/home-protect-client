import styled from '@emotion/styled';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAnalyzingProgress } from '../../hooks/useAnalyzingProgress';
import type { AnalysisPageStatus } from '../../types/analysis';
import { AnalysisErrorView } from './AnalysisErrorView';
import { AnalysisLoadingView } from './AnalysisLoadingView';

interface AnalysisLocationState {
  sessionId?: string;
}

export function AnalysisLoadingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as AnalysisLocationState | null;
  const sessionId = state?.sessionId ?? null;

  const [pageStatus, setPageStatus] = useState<AnalysisPageStatus>('loading');
  const [errorMessage, setErrorMessage] = useState('');
  const [retryKey, setRetryKey] = useState(0);

  const handleComplete = useCallback(() => {
    setTimeout(() => {
      navigate('/result', {
        state: { sessionId },
      });
    }, 700);
  }, [navigate, sessionId]);

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
    resetProgress();
    setErrorMessage('');
    setPageStatus('loading');
    setRetryKey((prev) => prev + 1);
  };

  return (
    <PageWrapper>
      {pageStatus === 'error' ? (
        <AnalysisErrorView errorMessage={errorMessage} onRetry={handleRetry} />
      ) : (
        <AnalysisLoadingView progress={progress} steps={steps} />
      )}
    </PageWrapper>
  );
}

const PageWrapper = styled.main`
  padding: 32px 20px 36px;
`;
