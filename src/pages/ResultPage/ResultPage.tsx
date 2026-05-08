import { useState } from 'react';
import styled from '@emotion/styled';

import { ResultAddressCard } from '../../components/feature/ResultPage/ResultAddressCard';
import { ResultTabs } from '../../components/feature/ResultPage/ResultTabs';
import { DetailAnalysisSection } from './DetailAnalysisSection';
import { ChecklistSection } from './ChecklistSection';

type ResultTab = 'detail' | 'checklist' | 'caution';

export function ResultPage() {
  const [activeTab, setActiveTab] = useState<ResultTab>('detail');

  return (
    <Page>
      <ResultAddressCard address="서울특별시 강남구 테헤란로 123" />

      <ResultTabs activeTab={activeTab} onChangeTab={setActiveTab} />

      {activeTab === 'detail' && <DetailAnalysisSection />}
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
