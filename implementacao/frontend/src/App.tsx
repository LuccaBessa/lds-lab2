import { Clientes } from './features/Cliente/pages';
import { useEffect, useState } from 'react';
import { Alugueis } from './features/Aluguel';
import { useUsuarioLogado } from './hooks';
import { Login } from './features/Login';

export const App = () => {
  const [currentTab, setCurrentTab] = useState(0);
  const { usuario } = useUsuarioLogado();

  return (
    <div className='container m-auto h-full'>
      {usuario == null ? (
        <Login />
      ) : (
        <>
          <div className='tabs'>
            <a className={`tab tab-bordered tab-lg ${currentTab === 0 && 'tab-active'}`} onClick={() => setCurrentTab(0)}>
              Clientes
            </a>
            <a className={`tab tab-bordered tab-lg ${currentTab === 1 && 'tab-active'}`} onClick={() => setCurrentTab(1)}>
              Aluguéis
            </a>
          </div>
          {currentTab === 0 && <Clientes />}
          {currentTab === 1 && <Alugueis />}
        </>
      )}
    </div>
  );
};
