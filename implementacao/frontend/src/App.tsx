import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Clientes } from './features/Cliente/pages';
import { useState } from 'react';

const queryClient = new QueryClient();

export const App = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <div className='container m-auto'>
        <div className='tabs'>
          <a className={`tab tab-bordered tab-lg ${currentTab === 0 && 'tab-active'}`} onClick={() => setCurrentTab(0)}>
            Clientes
          </a>
          <a className={`tab tab-bordered tab-lg ${currentTab === 1 && 'tab-active'}`} onClick={() => setCurrentTab(1)}>
            Agentes
          </a>
          <a className={`tab tab-bordered tab-lg ${currentTab === 2 && 'tab-active'}`} onClick={() => setCurrentTab(2)}>
            Aluguéis
          </a>
        </div>
        {currentTab === 0 && <Clientes />}
      </div>
    </QueryClientProvider>
  );
};
