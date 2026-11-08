import api from './api';

export async function realizarCheckin(reservaId, codigoAcesso) {
  const { data } = await api.post('/checkins', null, { params: { reservaId, codigoAcesso } });
  return data;
}