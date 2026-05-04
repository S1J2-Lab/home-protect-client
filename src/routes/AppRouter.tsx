import { Routes, Route } from 'react-router-dom';
import { InputPage } from '../pages/InputPage/InputPage';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/input" element={<InputPage />} />
    </Routes>
  );
}
