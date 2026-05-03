import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useAnalysisProgress } from '../../hooks/useAnalysisProgress';
import type {
  AnalysisErrorCode,
  AnalysisPageStatus,
} from '../../types/analysis';
import { AnalysisErrorView } from '../../components/feature/AnalyzingPage/AnalysisErrorView';
import { useEffect, useState } from 'react';
import { AnalysisLoadingView } from '../../components/feature/AnalyzingPage/AnalysisLoadingView';

export function AnalysisLoadingPage() {
  const { progress, steps, isCompleted, resetProgress } = useAnalysisProgress();
  const navigate = useNavigate();
  const [pageStatus, setPageStatus] = useState<AnalysisPageStatus>('loading');

  const [errorCode] = useState<AnalysisErrorCode>('API_UNAVAILABLE');

  useEffect(() => {
    if (pageStatus !== 'loading') return;
    if (!isCompleted) return;

    const timer = setTimeout(() => {
      navigate('/result');
    }, 700);

    return () => clearTimeout(timer);
  }, [isCompleted, navigate, pageStatus]);

  const handleRetry = () => {
    resetProgress?.();
    setPageStatus('loading');

    // TODO: 나중에 여기서 분석 재요청 API 호출
    // requestAnalysis();
  };

  return (
    <PageWrapper>
      <Content>
        {pageStatus === 'error' ? (
          <AnalysisErrorView errorCode={errorCode} onRetry={handleRetry} />
        ) : (
          <AnalysisLoadingView progress={progress} steps={steps} />
        )}
      </Content>
    </PageWrapper>
  );
}

const PageWrapper = styled.main`
  min-height: 100dvh;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 24px 4px 28px;
`;
