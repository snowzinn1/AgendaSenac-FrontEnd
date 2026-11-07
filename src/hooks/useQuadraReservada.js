// HOOK: carrega UMA reserva (detalhe), seus participantes e sabe cancelar. A tela só consome.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { buscarReserva, cancelarReserva, listarParticipantes } from '../Services/reservaService';
import { mensagemDeErro } from '../Utils/erros';

const HORAS_ANTECEDENCIA = 2; // mesma regra do back-end

export default function useQuadraReservada(id, usuarioSessao) {
  const [reserva, setReserva] = useState(null);
  const [extras, setExtras] = useState([]); // participantes além do responsável
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [cancelando, setCancelando] = useState(false);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dados = await buscarReserva(id);
      setReserva(dados);

      // Se o back já mandou a lista dentro da reserva, usamos ela.
      // Senão, tentamos a rota própria. Se falhar, a tela segue só com o responsável.
      if (Array.isArray(dados.participantes)) {
        setExtras(dados.participantes);
      } else {
        try {
          setExtras(await listarParticipantes(id));
        } catch (e) {
          console.log('Sem lista de participantes:', e.message, e.config?.url);
          setExtras([]);
        }
      }
    } catch (e) {
      console.log('Erro ao buscar reserva:', e.message, e.config?.url);
      setErro(mensagemDeErro(e, 'Não foi possível carregar a reserva.'));
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // Responsável primeiro, depois os participantes. Aceita { nome } ou { participante: { nome } }.
  const participantes = useMemo(() => {
    if (!reserva) return [];
    const responsavel = {
      id: 'responsavel',
      nome: reserva.usuario?.nome ?? usuarioSessao?.nome ?? 'Responsável',
      papel: 'Responsável',
    };
    const outros = extras.map((item) => {
      const p = item.participante ?? item;
      return { id: p.id, nome: p.nome, papel: 'Participante' };
    });
    return [responsavel, ...outros];
  }, [reserva, extras, usuarioSessao?.nome]);

  // Só ajuda a esconder o botão: quem decide de verdade é o back-end.
  const podeCancelar = useMemo(() => {
    if (reserva?.status !== 'ATIVA') return false;
    const { data, horaInicio } = reserva.horario;
    const inicio = new Date(`${data}T${horaInicio}`);
    return Date.now() <= inicio.getTime() - HORAS_ANTECEDENCIA * 60 * 60 * 1000;
  }, [reserva]);

  // Devolve { ok } ou { ok: false, mensagem } para a tela decidir o que mostrar.
  const cancelar = async () => {
    try {
      setCancelando(true);
      await cancelarReserva(id);
      return { ok: true };
    } catch (e) {
      console.log('Erro ao cancelar:', e.message, e.response?.data);
      return { ok: false, mensagem: mensagemDeErro(e, 'Não foi possível cancelar a reserva.') };
    } finally {
      setCancelando(false);
    }
  };

  return {
    reserva, participantes, carregando, erro, recarregar: carregar,
    podeCancelar, cancelando, cancelar,
  };
}