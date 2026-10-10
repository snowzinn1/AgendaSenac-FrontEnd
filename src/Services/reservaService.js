import api from './api';

export async function listarReservas() {
  const { data } = await api.get('/reservas');
  return data;
}

export async function buscarReserva(id) {
  const { data } = await api.get(`/reservas/${id}`);
  return data;
}

export async function criarReserva(reserva) {
  const { data } = await api.post('/reservas', reserva);
  return data;
}

export async function cancelarReserva(id) {
  await api.patch(`/reservas/${id}/cancelar`);
}

export async function concluirReserva(id) {
  const { data } = await api.patch(`/reservas/${id}/concluir`);
  return data;
}

export async function removerReserva(id) {
  await api.delete(`/reservas/${id}`);
}
