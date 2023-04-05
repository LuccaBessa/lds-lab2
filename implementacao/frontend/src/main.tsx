import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UsuarioLogadoProvider } from './hooks';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UsuarioLogadoProvider>
        <App />
      </UsuarioLogadoProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
