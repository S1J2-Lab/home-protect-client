import { House } from 'lucide-react';
import { Button } from './components/common/Button';
import { Header } from './components/common/Header';
import { Layout } from './layout/Layout';
import { StepIndicator } from './components/common/StepIndicator';
import { AppRouter } from './routes/AppRouter';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Layout
        header={
          <Header
            title="지켜줘홈즈"
            left={
              <Button
                variant="ghost"
                tone="blue"
                size="sm"
                iconStart={<House />}
                aria-label="홈"
              />
            }
          />
        }
        stepIndicator={<StepIndicator currentStep={1} totalSteps={4} />}
      >
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
}
export default App;
