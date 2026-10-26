// AUTENTICAÇÃO (provisória).
// O back-end ainda NÃO tem rota de login (o Spring Security está pendente), então
// procuramos o e-mail/senha nas listas de alunos e admins. Quando existir um
// POST /auth/login, só esta função precisa mudar.
import api from './api';

// Devolve o usuário (sem a senha) ou null se e-mail/senha não baterem.
// Se o back estiver fora do ar, lança erro (a tela mostra "sem conexão").
export async function autenticar(email, senha) {
  const emailNormalizado = email.trim().toLowerCase();

  const [alunos, admins] = await Promise.all([
    api.get('/usuarios/comum'),
    api.get('/usuarios/admin'),
  ]);

  const encontrado = [...alunos.data, ...admins.data].find(
    (u) => u.email?.toLowerCase() === emailNormalizado && u.senha === senha
  );
  if (!encontrado) return null;

  const { senha: _senha, ...semSenha } = encontrado;
  return semSenha;
}
