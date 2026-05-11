import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { ResultAddressCard } from '../../components/feature/ResultPage/ResultAddressCard';
import { ResultTabs } from '../../components/feature/ResultPage/ResultTabs';
import { DetailAnalysisSection } from './DetailAnalysisSection';
import { ChecklistSection } from './ChecklistSection';
import type { ResultData } from '../../types/result';
import { useLocation } from 'react-router-dom';
import { getAnalysisResult } from '../../api/result';
import { getApiErrorMessage, type ApiError } from '../../api/error';
import {
  getAnalysisSessionId,
  saveAnalysisResult,
} from '../../utils/analysisStorage';

type ResultTab = 'detail' | 'checklist' | 'caution';

export function ResultPage() {
  const location = useLocation();
  const sessionId = location.state?.sessionId ?? getAnalysisSessionId();

  const [activeTab, setActiveTab] = useState<ResultTab>('detail');
  const [result, setResult] = useState<ResultData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

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
        <Section>
          <SectionTitle>결과를 불러오는 중이에요</SectionTitle>
          <Description>잠시만 기다려주세요.</Description>
        </Section>
      </Page>
    );
  }

  if (errorMessage) {
    return (
      <Page>
        <Section>
          <SectionTitle>결과를 불러오지 못했어요</SectionTitle>
          <Description>{errorMessage}</Description>
        </Section>
      </Page>
    );
  }
  if (!result) return null;

  return (
    <Page>
      <ResultAddressCard address={result.address} />

      <ResultTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {activeTab === 'detail' && <DetailAnalysisSection result={result} />}
      {activeTab === 'checklist' && <ChecklistSection />}
      {activeTab === 'caution' && <CautionSection />}
    </Page>
  );
}

function CautionSection() {
  return (
    <Section>
      <SectionTitle>주의 사항</SectionTitle>
      <Description>
        분석 결과는 참고용 정보입니다. 계약 전 등기부등본, 건축물대장,
        임대차계약서를 직접 확인하고 필요 시 전문가 상담을 권장해요.
      </Description>
    </Section>
  );
}

const Page = styled.main`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Section = styled.section`
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
