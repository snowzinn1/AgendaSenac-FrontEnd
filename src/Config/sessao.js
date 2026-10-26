// SESSÃO: guarda quem está logado (em memória) e entrega para qualquer tela.
// Ao recarregar/fechar o app a sessão some e o usuário volta para o login.
import { createContext, useContext, useMemo, useState } from 'react';

const SessaoContext = createContext(null);

export function SessaoProvider({ children }) {
  // { id, nome, email, cpf, curso, tipoUsuario } — a senha nunca fica guardada aqui
  const [usuario, setUsuario] = useState(null);

  const valor = useMemo(
    () => ({ usuario, entrar: setUsuario, sair: () => setUsuario(null) }),
    [usuario]
  );

  return <SessaoContext.Provider value={valor}>{children}</SessaoContext.Provider>;
}

export function useSessao() {
  const contexto = useContext(SessaoContext);
  if (!contexto) throw new Error('useSessao precisa estar dentro de <SessaoProvider>');
  return contexto;
}

// O campo no back-end é `tipoUsuario` (enum TipoUsuario: ALUNO | ADMIN)
export const ehAdmin = (usuario) => usuario?.tipoUsuario === 'ADMIN';
