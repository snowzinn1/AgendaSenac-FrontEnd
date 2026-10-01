// HOOK: guarda o estado da tela (carregando, erro, dado) e chama o service.
import { useEffect, useState } from 'react';
import { listarUsuarios } from '../Services/usuarioService';

export default function useUsuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        setUsuarios(await listarUsuarios());
      } catch (e) {
        setErro('Não foi possível carregar os usuários.');
      } finally {
        setCarregando(false);
      }
    }
    carregar();
  }, []);

  return { usuarios, carregando, erro };
}