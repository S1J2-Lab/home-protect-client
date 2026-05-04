import { Routes, Route } from 'react-router-dom';
import { InputPage } from '../pages/InputPage/InputPage';
import { LandingPage } from '../pages/LandingPage/LandingPage';
import { AnalysisLoadingPage } from '../pages/AnalyzingPage/AnalysisLoadingPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/input" element={<InputPage />} />
      <Route path="/analyze" element={<AnalysisLoadingPage />} />
    </Routes>
  );
}
