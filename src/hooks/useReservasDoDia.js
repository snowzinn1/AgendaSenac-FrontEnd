// HOOK (admin): reservas ATIVAS de hoje, de todos os alunos, e a confirmação de check-in.
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { realizarCheckin } from '../Services/CheckInService';
import { listarReservas, STATUS_RESERVA } from '../Services/reservaService';
import { hojeISO } from '../Utils/datas';
import { mensagemDeErro } from '../Utils/erros';

const porHorario = (a, b) => a.horario.horaInicio.localeCompare(b.horario.horaInicio);

export function useReservasDoDia() {
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  // Ids com check-in feito nesta sessão (marca o card mesmo que o back ainda devolva a reserva)
  const [confirmados, setConfirmados] = useState([]);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const todas = await listarReservas();
      const hoje = hojeISO();
      setReservas(
        todas
          .filter((r) => r.status === STATUS_RESERVA.ATIVA && r.horario?.data === hoje)
          .sort(porHorario)
      );
    } catch (e) {
      console.log('Erro ao buscar reservas do dia:', e.message, e.config?.url);
      setErro(mensagemDeErro(e, 'Não foi possível carregar as reservas de hoje.'));
    } finally {
      setCarregando(false);
    }
  }, []);

  // Recarrega sempre que a aba ganha foco
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  // Devolve { ok } ou { ok: false, mensagem } (ex.: "código inválido") para a tela mostrar.
  const fazerCheckin = async (reserva, codigo) => {
    try {
      await realizarCheckin(reserva.id, codigo);
      setConfirmados((ids) => [...ids, reserva.id]);
      carregar();
      return { ok: true };
    } catch (e) {
      console.log('Erro no check-in:', e.message, e.response?.data);
      return { ok: false, mensagem: mensagemDeErro(e, 'Não foi possível confirmar o check-in.') };
    }
  };

  return { reservas, carregando, erro, recarregar: carregar, confirmados, fazerCheckin };
}