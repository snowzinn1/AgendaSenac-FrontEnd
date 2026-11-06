// AUTENTICAÇÃO via POST /auth/login (JWT).
import api from './api';

// Devolve o usuário (com token) ou null se e-mail/senha não baterem.
// Se o back estiver fora do ar, lança erro (a tela mostra "sem conexão").
export async function autenticar(email, senha) {
  const emailNormalizado = email.trim().toLowerCase();

  try {
    const resposta = await api.post('/auth/login', {
      email: emailNormalizado,
      senha,
    });

    // Guarda o token e envia em todas as próximas chamadas
    api.defaults.headers.common.Authorization = `Bearer ${resposta.data.token}`;

    return resposta.data; // { id, nome, email, curso, tipoUsuario, token }
  } catch (erro) {
    if (erro.response?.status === 401) return null; // e-mail ou senha errados
    throw erro; // sem conexão ou outro erro
  }
}

// Chamar no logout
export function sair() {
  delete api.defaults.headers.common.Authorization;
}