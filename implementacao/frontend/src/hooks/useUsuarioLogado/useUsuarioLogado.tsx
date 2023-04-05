import { createContext, type ReactElement, useContext, useState, useEffect } from 'react';
import { IUsuario } from '../../features/Login/services';

interface UsuarioLogadoContextType {
  usuario: IUsuario | null;
  setUsuario: (usuario: IUsuario | null) => void;
}

const UsuarioLogadoContext: React.Context<UsuarioLogadoContextType> = createContext<UsuarioLogadoContextType>({
  usuario: null,
  setUsuario: (usuario: IUsuario | null) => {},
});

const UsuarioLogadoProvider = ({ children }: any): ReactElement => {
  const [usuario, handleUsuarioState] = useState<IUsuario | null>(null);

  const setUsuario = (usuario: IUsuario | null): void => {
    handleUsuarioState(usuario);
    usuario != null ? localStorage.setItem('usuarioLogado', JSON.stringify(usuario)) : localStorage.removeItem('usuarioLogado');
  };

  useEffect(() => {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (usuarioLogado != null) {
      handleUsuarioState(JSON.parse(usuarioLogado));
    }
  }, []);

  return <UsuarioLogadoContext.Provider value={{ usuario, setUsuario }}>{children}</UsuarioLogadoContext.Provider>;
};

const useUsuarioLogado = (): UsuarioLogadoContextType => {
  const context = useContext(UsuarioLogadoContext);
  return context;
};

export { UsuarioLogadoProvider, useUsuarioLogado };
