// SERVICE: rotas de reserva do Spring (ReservaController).
// O check-in NÃO passa por aqui: no back ele é automático/validado por código de acesso.
import api from './api';

// Valores do enum StatusReserva do back-end
export const STATUS_RESERVA = {
  ATIVA: 'ATIVA',
  CANCELADA: 'CANCELADA',
  CONCLUIDA: 'CONCLUIDA',
  NAO_COMPARECEU: 'NAO_COMPARECEU',
};

export async function listarReservas() {
  const { data } = await api.get('/reservas');
  return data;
}

export async function buscarReserva(id) {
  const { data } = await api.get(`/reservas/${id}`);
  return data;
}

// dados = { usuario: { id }, horario: { id } }  -> o back gera status, data e código de acesso
export async function criarReserva(dados) {
  const { data } = await api.post('/reservas', dados);
  return data;
}

// Só com 2h ou mais de antecedência (regra do back). Responde 204.
export async function cancelarReserva(id) {
  await api.patch(`/reservas/${id}/cancelar`);
}

export async function removerReserva(id) {
  await api.delete(`/reservas/${id}`);
}

// participante = { nome, cpf }  (cpf só com 11 números)
export async function adicionarParticipante(reservaId, participante) {
  await api.post(`/reservas/${reservaId}/participantes`, participante);
}
