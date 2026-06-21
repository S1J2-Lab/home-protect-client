import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from 'react-router-dom';
import { ChevronLeft, House } from 'lucide-react';

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
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import logoImage from '../assets/logo.png';
import { HeaderLogo } from '../components/common/HeaderLogo';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function LandingLayout() {
  return (
    <>
      <ScrollToTop />
      <Layout
        header={
          <Header
            title="지켜줘홈즈"
            logo={<HeaderLogo src={logoImage} alt="지켜줘홈즈 로고" />}
          />
        }
        noPadding
      />
    </>
  );
}

function InputLayout() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Layout
        header={
          <Header
            title="정보 입력"
            left={
              <Button
                variant="ghost"
                tone="black"
                size="lg"
                iconStart={<ChevronLeft />}
                aria-label="이전"
                onClick={() => navigate('/')}
              />
            }
          />
        }
        stepIndicator={<StepIndicator currentStep={1} totalSteps={3} />}
      />
    </>
  );
}

function AnalyzingLayout() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Layout
        header={
          <Header
            title="계약 분석 중"
            left={
              <Button
                variant="ghost"
                tone="blue"
                size="lg"
                iconStart={<ChevronLeft />}
                aria-label="이전"
                onClick={() => navigate('/input')}
              />
            }
          />
        }
        stepIndicator={<StepIndicator currentStep={2} totalSteps={3} />}
        noPadding
      />
    </>
  );
}

function ResultLayout() {
  const navigate = useNavigate();

  return (
    <>
      <ScrollToTop />
      <Layout
        header={
          <Header
            title="분석 결과"
            left={
              <Button
                variant="ghost"
                tone="black"
                size="lg"
                iconStart={<House />}
                aria-label="홈으로"
                onClick={() => navigate('/')}
              />
            }
          />
        }
        stepIndicator={<StepIndicator currentStep={3} totalSteps={3} />}
      />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <LandingLayout />,
    children: [{ path: '/', element: <LandingPage /> }],
  },
  {
    element: <InputLayout />,
    children: [{ path: '/input', element: <InputPage /> }],
  },
  {
    element: <AnalyzingLayout />,
    children: [{ path: '/analyze', element: <AnalysisLoadingPage /> }],
  },
  {
    element: <ResultLayout />,
    children: [
      { path: '/result', element: <ResultPage /> },
      { path: '/result/registry', element: <RegistryDetailPage /> },
      { path: '/result/contract', element: <ContractDetailPage /> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
