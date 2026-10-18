import api from './api';

export async function listarQuadras() {
  const { data } = await api.get('/quadras');
  return data;
}

export async function buscarQuadra(id) {
  const { data } = await api.get(`/quadras/${id}`);
  return data;
}

export async function criarQuadra(quadra) {
  const { data } = await api.post('/quadras', quadra);
  return data;
}

export async function atualizarQuadra(id, quadra) {
  const { data } = await api.put(`/quadras/${id}`, quadra);
  return data;
}

export async function removerQuadra(id) {
  await api.delete(`/quadras/${id}`);
}
