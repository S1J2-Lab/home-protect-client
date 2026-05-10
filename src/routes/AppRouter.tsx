import { Routes, Route, useNavigate } from 'react-router-dom';
import { House, ChevronLeft } from 'lucide-react';

import { LandingPage } from '../pages/LandingPage/LandingPage';
import { InputPage } from '../pages/InputPage/InputPage';
import { AnalysisLoadingPage } from '../pages/AnalyzingPage/AnalysisLoadingPage';
import { ResultPage } from '../pages/ResultPage/ResultPage';
import { RegistryDetailPage } from '../pages/ResultPage/RegistryDetailPage';
import { ContractDetailPage } from '../pages/ResultPage/ContractDetailPage';

import { Layout } from '../layout/Layout';
import { Header } from '../components/common/Header';
import { StepIndicator } from '../components/common/StepIndicator';
import { Button } from '../components/common/Button';

const registryMockData = {
  trustWarning: true,
  priorLease: true,
  mortgageCount: 2,
  mortgages: [
    { bank: '국민은행', amount: 120000000 },
    { bank: '신한은행', amount: 80000000 },
  ],
  totalMortgage: 200000000,
  ownershipChangeRecent: true,
};

const contractMockData = {
  toxicClauses: [
    {
      level: 'danger' as const,
      title: '수리비 전액 임차인 부담',
      originalText: '수리비는 임차인이 전액 부담한다.',
      legalIssue:
        '임차인에게 과도하게 불리한 특약으로 해석될 가능성이 있습니다.',
      precedent: '통상적인 노후 및 하자 수선 책임은 임대인에게 있습니다.',
      suggestion:
        '수리 범위와 부담 주체를 계약 전에 명확히 협의하는 것이 좋습니다.',
    },
  ],
  cautionClauses: [
    {
      level: 'caution' as const,
      title: '전세대출 비협조 가능성',
      originalText: '임대인은 전세대출에 협조하지 않을 수 있다.',
      legalIssue: '전세대출 진행 과정에서 문제가 발생할 가능성이 있습니다.',
      precedent:
        '대출 협조 여부는 계약 체결 전 반드시 확인하는 것이 일반적입니다.',
      suggestion:
        '임대인의 대출 협조 여부를 특약으로 명시하는 것을 권장합니다.',
    },
  ],
};

export function AppRouter() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route
        element={
          <Layout
            header={
              <Header
                title="지켜줘홈즈"
                left={
                  <Button
                    variant="ghost"
                    tone="blue"
                    size="md"
                    iconStart={<House />}
                    aria-label="홈"
                    onClick={() => navigate('/')}
                  />
                }
              />
            }
            noPadding
          />
        }
      >
        <Route path="/" element={<LandingPage />} />
        <Route path="/analyze" element={<AnalysisLoadingPage />} />
      </Route>

      <Route
        element={
          <Layout
            header={
              <Header
                title="지켜줘홈즈"
                left={
                  <Button
                    variant="ghost"
                    tone="black"
                    size="md"
                    iconStart={<ChevronLeft />}
                    aria-label="이전"
                    onClick={() => navigate(-1)}
                  />
                }
              />
            }
            stepIndicator={<StepIndicator currentStep={1} totalSteps={4} />}
          />
        }
      >
        <Route path="/input" element={<InputPage />} />
      </Route>

      <Route
        element={
          <Layout
            header={
              <Header
                title="분석 결과"
                left={
                  <Button
                    variant="ghost"
                    tone="black"
                    size="md"
                    iconStart={<ChevronLeft />}
                    aria-label="이전"
                    onClick={() => navigate(-1)}
                  />
                }
              />
            }
          />
        }
      >
        <Route path="/result" element={<ResultPage />} />
        <Route
          path="/result/registry"
          element={<RegistryDetailPage registry={registryMockData} />}
        />
        <Route
          path="/result/contract"
          element={<ContractDetailPage contract={contractMockData} />}
        />
      </Route>
    </Routes>
  );
}
