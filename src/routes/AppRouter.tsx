import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { House, ChevronLeft } from 'lucide-react';
import logoImage from '../assets/logo.png.png';
import { HeaderLogo } from '../components/common/HeaderLogo';
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

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function AppRouter() {
  const navigate = useNavigate();
  const [inputStepIndex, setInputStepIndex] = useState(0);

  const handleInputBack = () => {
    if (inputStepIndex > 0) {
      setInputStepIndex((prev) => prev - 1);
      return;
    }

    navigate('/');
  };

  return (
    <>
      <ScrollToTop />

      <Routes>
        <Route
          element={
            <Layout
              header={
                <Header
                  title="지켜줘홈즈"
                  logo={<HeaderLogo src={logoImage} alt="지켜줘홈즈 로고" />}
                />
              }
              noPadding
            />
          }
        >
          <Route path="/" element={<LandingPage />} />
        </Route>

        <Route
          element={
            <Layout
              header={
                <Header
                  title="정보 입력"
                  left={
                    <Button
                      variant="ghost"
                      tone="black"
                      size="md"
                      iconStart={<ChevronLeft />}
                      aria-label="이전"
                      onClick={handleInputBack}
                    />
                  }
                />
              }
              stepIndicator={
                <StepIndicator
                  currentStep={inputStepIndex + 1}
                  totalSteps={3}
                />
              }
            />
          }
        >
          <Route
            path="/input"
            element={
              <InputPage
                currentStepIndex={inputStepIndex}
                setCurrentStepIndex={setInputStepIndex}
              />
            }
          />
        </Route>

        <Route
          element={
            <Layout
              header={
                <Header
                  title="계약 분석 중"
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
              stepIndicator={<StepIndicator currentStep={2} totalSteps={3} />}
              noPadding
            />
          }
        >
          <Route path="/analyze" element={<AnalysisLoadingPage />} />
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
              stepIndicator={<StepIndicator currentStep={3} totalSteps={3} />}
            />
          }
        >
          <Route path="/result" element={<ResultPage />} />
          <Route path="/result/registry" element={<RegistryDetailPage />} />
          <Route path="/result/contract" element={<ContractDetailPage />} />
        </Route>
      </Routes>
    </>
  );
}
