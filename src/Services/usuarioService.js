// SERVICE: rotas de usuário do Spring.
// O back separa por tipo:
//   /usuarios/comum  -> alunos
//   /usuarios/admin  -> admins (+ gestão de alunos em /usuarios/admin/alunos)
// `tipo` é o tipoUsuario do usuário logado: 'ALUNO' ou 'ADMIN'.
import api from './api';

const base = (tipo) => (tipo === 'ADMIN' ? '/usuarios/admin' : '/usuarios/comum');

// ---- Serve para os dois tipos: a rota muda conforme `tipo` ----
export async function buscarUsuario(id, tipo) {
  const { data } = await api.get(`${base(tipo)}/${id}`);
  return data;
}

export async function atualizarUsuario(id, usuario, tipo) {
  const { data } = await api.put(`${base(tipo)}/${id}`, usuario);
  return data;
}

export async function removerUsuario(id, tipo) {
  await api.delete(`${base(tipo)}/${id}`);
}

// ---- Cadastro e listagens por tipo ----
export async function listarAlunos() {
  const { data } = await api.get('/usuarios/comum');
  return data;
}

export async function listarAdmins() {
  const { data } = await api.get('/usuarios/admin');
  return data;
}

export async function criarAluno(usuario) {
  const { data } = await api.post('/usuarios/comum', usuario);
  return data;
}

export async function criarAdmin(usuario) {
  const { data } = await api.post('/usuarios/admin', usuario);
  return data;
}

// ---- Gestão de alunos feita por um admin ----
export async function adminListarAlunos() {
  const { data } = await api.get('/usuarios/admin/alunos');
  return data;
}

export async function adminBuscarAluno(id) {
  const { data } = await api.get(`/usuarios/admin/alunos/${id}`);
  return data;
}

export async function adminAtualizarAluno(id, usuario) {
  const { data } = await api.put(`/usuarios/admin/alunos/${id}`, usuario);
  return data;
}

export async function adminRemoverAluno(id) {
  await api.delete(`/usuarios/admin/alunos/${id}`);
}
