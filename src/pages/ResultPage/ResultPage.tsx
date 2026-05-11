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
  getAnalysisSessionId,
  saveAnalysisResult,
} from '../../utils/analysisStorage';

export function ResultPage() {
  const location = useLocation();
  const sessionId = location.state?.sessionId ?? getAnalysisSessionId();

  const pdfContentRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState<ResultTab>('detail');
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
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

  if (isLoading) {
    return (
      <Page>
        <MessageSection>
          <SectionTitle>결과를 불러오는 중이에요</SectionTitle>
          <Description>잠시만 기다려주세요.</Description>
        </MessageSection>
      </Page>
    );
  }

  if (errorMessage) {
    return (
      <Page>
        <MessageSection>
          <SectionTitle>결과를 불러오지 못했어요</SectionTitle>
          <Description>{errorMessage}</Description>
        </MessageSection>
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

const MessageSection = styled.section`
  padding: 24px 20px;
  border-radius: ${({ theme }) => theme.radius.xl};
  background: ${({ theme }) => theme.colors.surface};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

const Description = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.textSub};
  font-size: 14px;
  line-height: 1.6;
`;
