// HOOK: guarda o estado da tela (carregando, erro, dado) e chama o service.
import { useEffect, useState } from 'react';
import { buscarUsuario } from '../Services/usuarioService';

export default function useUsuario(id) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const dados = await buscarUsuario(id);
      setUsuario(dados);
    } catch (e) {
      setErro('Não foi possível carregar o usuário.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, [id]);

  return {
    usuario,
    carregando,
    erro,
    recarregar: carregar
  };
}