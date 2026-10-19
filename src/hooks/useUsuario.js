import { useCallback, useEffect, useState } from 'react';
import { buscarUsuario } from '../Services/usuarioService';

export function useUsuario(id) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      setUsuario(await buscarUsuario(id));
    } catch (e) {
      console.log('Erro ao buscar usuário:', e.message, e.config?.url);
      setErro('Não foi possível carregar seus dados.');
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  return { usuario, carregando, erro, recarregar: carregar };
}

export default useUsuario;