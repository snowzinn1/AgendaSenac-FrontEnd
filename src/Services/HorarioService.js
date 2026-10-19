// SERVICE: endpoints de horário (HorarioController).
import api from './api';

// ATENÇÃO: confirme com o enum StatusHorario do seu backend.
export const STATUS_HORARIO = {
  DISPONIVEL: 'DISPONIVEL',
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