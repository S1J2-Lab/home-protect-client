import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppStyleProvider } from './styles/AppStyleProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppStyleProvider>
      <App />
    </AppStyleProvider>
  </StrictMode>,
);
