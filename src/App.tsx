import { House } from 'lucide-react';
import { Button } from './components/common/Button';
import { Header } from './components/common/Header';
import { Layout } from './layout/Layout';

function App() {
  return (
    <Layout>
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
      <div>레이아웃 테스트</div>
    </Layout>
  );
}

export default App;
