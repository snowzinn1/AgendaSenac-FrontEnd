import { useEffect, useState } from 'react';
import { listarQuadras } from '../Services/quadraService';

export default function useQuadras() {
  const [quadras, setQuadras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const carregar = async () => {
    try {
      setCarregando(true);
      setErro(null);

      const dados = await listarQuadras();
      setQuadras(dados);
    } catch (e) {
      setErro('Não foi possível carregar as quadras.');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return {
    quadras,
    carregando,
    erro,
    recarregar: carregar,
  };
}
