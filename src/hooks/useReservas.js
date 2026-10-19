// HOOK: carrega as reservas do usuário, separa em próximas/histórico e expõe as ações.
import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import {
  cancelarReserva,
  concluirReserva,
  listarReservas,
  STATUS_RESERVA,
} from '../Services/minhasReservasService';

const porDataHora = (a, b) =>
  `${a.horario.data}T${a.horario.horaInicio}`.localeCompare(`${b.horario.data}T${b.horario.horaInicio}`);

export function useReservas(usuarioId) {
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [processandoId, setProcessandoId] = useState(null);

  const carregar = useCallback(async () => {
    try {
      setCarregando(true);
      setErro(null);
      const todas = await listarReservas(); // ← era reservaService.listarTodas()
      // TODO: ideal é o back filtrar (GET /reservas/usuario/{id}); por ora filtramos aqui
      setReservas(todas.filter((r) => r.usuario?.id === usuarioId));
    } catch (e) {
      console.log('Erro ao buscar reservas:', e.message, e.config?.url);
      setErro('Não foi possível carregar seus agendamentos.');
    } finally {
      setCarregando(false);
    }
  }, [usuarioId]);

useFocusEffect(
  useCallback(() => {
    carregar();
  }, [carregar])
);

  // Executa uma ação (cancelar/check-in) e recarrega a lista
  const executar = async (id, acao, mensagemErro) => {
    try {
      setProcessandoId(id);
      setErro(null);
      await acao(id);
      await carregar();
    } catch (e) {
      console.log('Erro na ação:', e.message, e.config?.url);
      setErro(mensagemErro);
    } finally {
      setProcessandoId(null);
    }
  };

  return {
    proximos: reservas.filter((r) => r.status === STATUS_RESERVA.CONFIRMADA).sort(porDataHora),
    historico: reservas.filter((r) => r.status === STATUS_RESERVA.CONCLUIDA).sort(porDataHora).reverse(),
    carregando,
    erro,
    processandoId,
    recarregar: carregar,
    cancelar: (id) => executar(id, cancelarReserva, 'Não foi possível cancelar.'),
    fazerCheckIn: (id) => executar(id, concluirReserva, 'Não foi possível fazer o check-in.'),
  };
}