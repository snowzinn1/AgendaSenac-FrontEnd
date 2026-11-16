// Funções puras de data. Sem React, sem rede.

// Data de hoje no formato do back ("2026-11-07"), usando o fuso do aparelho.
// (toISOString usaria UTC e viraria o dia errado à noite no Brasil.)
export function hojeISO(agora = new Date()) {
  const ano = agora.getFullYear();
  const mes = String(agora.getMonth() + 1).padStart(2, '0');
  const dia = String(agora.getDate()).padStart(2, '0');
  return `${ano}-${mes}-${dia}`;
}