// Funções puras de formatação/regra. Sem React, sem rede.
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// "2026-06-11" -> "11 Jun, 2026"
export function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia} ${MESES[Number(mes) - 1]}, ${ano}`;
}

// "10:00:00" -> "10:00"
export const formatarHora = (hora) => hora.slice(0, 5);
