import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

import type { ResultData } from '../../types/result';
import { ChecklistSection } from './ChecklistSection';
import { DetailAnalysisSection } from './DetailAnalysisSection';
import { ResultScreenContent } from '../../components/feature/ResultPage/ResultScreenContent';
import { ResultPdfContent } from './ResultPdfPage';
import { useResultPdfDownload } from '../../hooks/useResultPdfDownload';
import type { ResultTab } from '../../types/tab';

import { getAnalysisResult } from '../../api/result';
import { getApiErrorMessage, type ApiError } from '../../api/error';
import {
  getAnalysisResultFromStorage,
  getAnalysisSessionId,
  saveAnalysisResult,
} from '../../utils/analysisStorage';
import { AlertTriangle, LoaderCircle } from 'lucide-react';

export function ResultPage() {
  const location = useLocation();
  const sessionId = location.state?.sessionId ?? getAnalysisSessionId();

  const pdfContentRef = useRef<HTMLDivElement | null>(null);
  const savedResult = getAnalysisResultFromStorage();

  const [activeTab, setActiveTab] = useState<ResultTab>('detail');
  const [result, setResult] = useState<ResultData | null>(savedResult);
  const [isLoading, setIsLoading] = useState(!savedResult);
  const [errorMessage, setErrorMessage] = useState('');

  const { isPdfSaving, downloadPdf } = useResultPdfDownload();

  useEffect(() => {
    if (!sessionId) {
      setErrorMessage('분석 세션 정보가 없어 결과를 불러오지 못했어요');
      setIsLoading(false);
      return;
    }

    const fetchResult = async () => {
      try {
        const data = await getAnalysisResult(sessionId);

        setResult(data);
        saveAnalysisResult(data);
      } catch (error) {
        setErrorMessage(getApiErrorMessage(error as ApiError));
      } finally {
        setIsLoading(false);
      }
    };

    fetchResult();
  }, [sessionId]);

  if (isLoading && !result) {
    return (
      <Page>
        <StateCard>
          <SpinnerIcon>
            <LoaderCircle size={32} strokeWidth={2.2} />
          </SpinnerIcon>

          <TextBox>
            <StateTitle>결과를 불러오는 중이에요</StateTitle>
            <StateDescription>
              분석 결과를 안전하게 정리하고 있어요.
            </StateDescription>
          </TextBox>
        </StateCard>
      </Page>
    );
  }

  if (errorMessage && !result) {
    return (
      <Page>
        <StateCard>
          <ErrorIconBox>
            <AlertTriangle size={24} strokeWidth={2.4} />
          </ErrorIconBox>
          <TextBox>
            <StateTitle>결과를 불러오지 못했어요</StateTitle>
            <StateDescription>
              {errorMessage || '네트워크 상태를 확인 후 다시 시도해주세요.'}
            </StateDescription>
          </TextBox>
        </StateCard>
      </Page>
    );
  }

  if (!result) return null;

  return (
    <Page>
      <ResultScreenContent
        result={result}
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onPdfSave={() => downloadPdf(pdfContentRef.current, result.address)}
        isPdfSaving={isPdfSaving}
      />

      {activeTab === 'detail' && <DetailAnalysisSection result={result} />}
      {activeTab === 'checklist' && <ChecklistSection />}

      <ResultPdfContent ref={pdfContentRef} result={result} />
    </Page>
  );
}

const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StateCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;

  margin-top: 230px;
  padding: 32px 24px;

  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.surface};

  box-shadow: 0 4px 20px rgba(15, 23, 42, 0.06);
`;

const SpinnerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.primary};

  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
`;

const StateTitle = styled.h2`
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const StateDescription = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSub};
  text-align: center;
`;

const ErrorIconBox = styled.div`
  width: 36px;
  height: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;
  background: ${({ theme }) => theme.colors.dangerBg};
  color: ${({ theme }) => theme.colors.danger};
`;
