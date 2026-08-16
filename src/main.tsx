import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';
import { ProgressProvider } from './hooks/useProgress';
import { SyncProvider } from './sync/useSync';
import './index.css';

// HashRouter keeps deep links working on static hosts (GitHub Pages in
// particular) without any server-side rewrite rules.
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <ProgressProvider>
        <SyncProvider>
          <HashRouter>
            <App />
          </HashRouter>
        </SyncProvider>
      </ProgressProvider>
    </ThemeProvider>
  </StrictMode>,
);
