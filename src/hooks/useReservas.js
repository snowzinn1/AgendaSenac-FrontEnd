// HOOK: carrega as reservas ATIVAS do usuário e expõe o cancelamento.
// (Não existe mais histórico: o back apaga a reserva quando ela é concluída.)
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { cancelarReserva, listarReservas, STATUS_RESERVA } from '../Services/reservaService';
import { mensagemDeErro } from '../Utils/erros';

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
      const todas = await listarReservas();
      // TODO: ideal é o back filtrar por usuário; por ora filtramos aqui
      setReservas(
        todas
          .filter((r) => r.usuario?.id === usuarioId && r.status === STATUS_RESERVA.ATIVA)
          .sort(porDataHora)
      );
    } catch (e) {
      console.log('Erro ao buscar reservas:', e.message, e.config?.url);
      setErro(mensagemDeErro(e, 'Não foi possível carregar seus agendamentos.'));
    } finally {
      setCarregando(false);
    }
  }, [usuarioId]);

  // Recarrega sempre que a aba ganha foco (ex.: voltar depois de reservar)
  useFocusEffect(
    useCallback(() => {
      carregar();
    }, [carregar])
  );

  const cancelar = async (id) => {
    try {
      setProcessandoId(id);
      setErro(null);
      await cancelarReserva(id);
      await carregar();
    } catch (e) {
      console.log('Erro ao cancelar:', e.message, e.response?.data);
      // Mostra a mensagem do back (ex.: regra das 2 horas de antecedência)
      setErro(mensagemDeErro(e, 'Não foi possível cancelar.'));
    } finally {
      setProcessandoId(null);
    }
  };

  return { reservas, carregando, erro, processandoId, recarregar: carregar, cancelar };
}
