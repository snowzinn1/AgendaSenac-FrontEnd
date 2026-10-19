import api from './api';

export const STATUS_RESERVA = {
  CONFIRMADA: 'CONFIRMADA',
  CONCLUIDA: 'CONCLUIDA',
  CANCELADA: 'CANCELADA',
};

export async function listarReservas() {
  const { data } = await api.get('/reservas');
  return data;
}

export async function cancelarReserva(id) {
  await api.patch(`/reservas/${id}/cancelar`);
}

// check-in
export async function concluirReserva(id) {
  const { data } = await api.patch(`/reservas/${id}/concluir`);
  return data;
}

export async function criarReserva(dados) {
  const { data } = await api.post('/reservas', dados);
  return data;
}