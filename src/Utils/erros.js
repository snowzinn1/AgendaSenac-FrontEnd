// Transforma o erro do axios em uma frase para mostrar ao usuário.
// O back-end responde erros assim: { status, erro, mensagem, caminho }
export function mensagemDeErro(erro, padrao) {
  const doBack = erro?.response?.data?.mensagem;
  if (doBack) return doBack;
  if (erro?.request && !erro?.response) {
    return 'Sem conexão com o servidor. Confira se o back-end está rodando.';
  }
  return padrao;
}
