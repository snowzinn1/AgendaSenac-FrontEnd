// SERVICE: rotas de horário do Spring (HorarioController).
import api from './api';

// Valores do enum StatusHorario do back-end
export const STATUS_HORARIO = {
  DISPONIVEL: 'DISPONIVEL',
  RESERVADO: 'RESERVADO',
  INDISPONIVEL: 'INDISPONIVEL',
};

// Cada item vem com a quadra dentro: { id, data, horaInicio, horaFim, status, quadra: {...} }
export async function listarHorarios() {
  const { data } = await api.get('/horarios');
  return data;
}

export async function buscarHorario(id) {
  const { data } = await api.get(`/horarios/${id}`);
  return data;
}

export async function criarHorario(horario) {
  const { data } = await api.post('/horarios', horario);
  return data;
}

export async function atualizarHorario(id, horario) {
  const { data } = await api.put(`/horarios/${id}`, horario);
  return data;
}

export async function removerHorario(id) {
  await api.delete(`/horarios/${id}`);
}
