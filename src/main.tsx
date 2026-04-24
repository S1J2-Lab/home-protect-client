// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
// import { AppStyleProvider } from './styles/AppStyleProvider';

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <AppStyleProvider>
//       <App />
//     </AppStyleProvider>
//   </React.StrictMode>,
// );

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
