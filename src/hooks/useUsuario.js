// HOOK: carrega o usuário logado usando a rota certa para o tipo dele (comum ou admin).
import { useCallback, useEffect, useState } from 'react';
import { buscarUsuario } from '../Services/usuarioService';

export function useUsuario(id, tipo) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(id != null);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    if (id == null) return;
    try {
      setCarregando(true);
      setErro(null);
      setUsuario(await buscarUsuario(id, tipo));
    } catch (e) {
      console.log('Erro ao buscar usuário:', e.message, e.config?.url);
      setErro('Não foi possível carregar seus dados.');
    } finally {
      setCarregando(false);
    }
  }, [id, tipo]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { usuario, carregando, erro, recarregar: carregar };
}

export default useUsuario;
