// SERVICE: fala com o back-end sobre reservas. As rotas ficam só aqui.
import api from './api';

// Converte o JSON do back-end no formato que a tela usa.
// Se o back-end tiver nomes de campos diferentes, ajuste SÓ aqui.
function normalizarReserva(d) {
  const horario = d.horario ?? {};
  const quadra = horario.quadra ?? d.quadra ?? {};

  const responsavel = {
    id: 'responsavel',
    nome: d.usuario?.nome ?? 'Responsável',
    papel: 'Responsável',
  };

  const outros = (d.participantes ?? []).map((item) => {
    const p = item.participante ?? item;
    return { id: p.id, nome: p.nome, papel: 'Participante' };
  });

  return {
    id: d.id,
    status: d.status, // 'ATIVA' | 'CONCLUIDA'
    codigoAcesso: d.codigoAcesso,
    data: horario.data, // '2026-06-11'
    horaInicio: horario.horaInicio, // '10:00:00'
    horaFim: horario.horaFim,
    quadra: {
      nome: quadra.nome,
      local: quadra.localizacao ?? quadra.local ?? quadra.descricao,
      imagem: quadra.imagem ?? quadra.foto ?? quadra.imagemUrl,
    },
    participantes: [responsavel, ...outros],
  };
}

export async function buscarReserva(id) {
  const { data } = await api.get(`/reservas/${id}`);
  return normalizarReserva(data);
}

export async function cancelarReserva(id) {
  await api.put(`/reservas/${id}/cancelar`);
}

// Extrai a mensagem que o back-end mandou (ex.: regra das 2 horas de antecedência).
export function mensagemDeErro(e, padrao) {
  if (!e.response) return 'Sem conexão com o servidor. Verifique sua internet e tente de novo.';
  const corpo = e.response.data;
  if (typeof corpo === 'string' && corpo) return corpo;
  return corpo?.message ?? corpo?.mensagem ?? corpo?.erro ?? padrao;
}