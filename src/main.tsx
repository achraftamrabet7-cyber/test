import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { SocketProvider } from './contexts/SocketContext';
import { NavigationProvider } from './contexts/NavigationContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SocketProvider>
      <NavigationProvider>
        <App />
      </NavigationProvider>
    </SocketProvider>
  </StrictMode>,
);
