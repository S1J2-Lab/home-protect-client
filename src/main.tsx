import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AppStyleProvider } from './styles/AppStyleProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppStyleProvider>
        <App />
      </AppStyleProvider>
    </BrowserRouter>
  </StrictMode>,
);