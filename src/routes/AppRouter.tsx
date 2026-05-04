import { Routes, Route, useNavigate } from 'react-router-dom';
import { House, ChevronLeft } from 'lucide-react';
import { InputPage } from '../pages/InputPage/InputPage';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { AnalysisLoadingPage } from '../pages/AnalyzingPage/AnalysisLoadingPage';
import { Layout } from '../layout/Layout';
import { Header } from '../components/common/Header';
import { StepIndicator } from '../components/common/StepIndicator';
import { Button } from '../components/common/Button';

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
      {/* <Route path="*" element={<404페이지 />} /> */}
    </Routes>
  );
}
