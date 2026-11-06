// HOOK: carrega a reserva e sabe cancelar. A tela só consome.
import { useCallback, useEffect, useMemo, useState } from 'react';
import { buscarReserva, cancelarReserva, mensagemDeErro } from '../Services/reservaService';

const HORAS_ANTECEDENCIA = 2; // mesma regra do back-end

export default function useQuadraReservada(id) {
  const [reserva, setReserva] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [cancelando, setCancelando] = useState(false);

  const carregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setReserva(await buscarReserva(id));
    } catch (e) {
      setErro(mensagemDeErro(e, 'Não foi possível carregar a reserva.'));
    } finally {
      setCarregando(false);
    }
  }, [id]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  // Só ajuda a esconder o botão: quem decide de verdade é o back-end.
  const podeCancelar = useMemo(() => {
    if (reserva?.status !== 'ATIVA') return false;
    const inicio = new Date(`${reserva.data}T${reserva.horaInicio}`);
    const limite = inicio.getTime() - HORAS_ANTECEDENCIA * 60 * 60 * 1000;
    return Date.now() <= limite;
  }, [reserva]);

  const cancelar = async () => {
    setCancelando(true);
    try {
      await cancelarReserva(id);
      return { ok: true };
    } catch (e) {
      return { ok: false, mensagem: mensagemDeErro(e, 'Não foi possível cancelar a reserva.') };
    } finally {
      setCancelando(false);
    }
  };

  return { reserva, carregando, erro, recarregar: carregar, podeCancelar, cancelando, cancelar };
}