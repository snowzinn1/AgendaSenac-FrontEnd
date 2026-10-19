// Funções puras de formatação/regra. Sem React, sem rede.
const MESES = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

// "2026-06-11" -> "11 Jun, 2026"
export function formatarData(iso) {
  const [ano, mes, dia] = iso.split('-');
  return `${dia} ${MESES[Number(mes) - 1]}, ${ano}`;
}

// "10:00:00" -> "10:00"
export const formatarHora = (hora) => hora.slice(0, 5);

// Check-in só vale no dia, entre o início e o fim do horário reservado.
export function checkInLiberado(horario) {
  const agora = new Date();
  const inicio = new Date(`${horario.data}T${horario.horaInicio}`);
  const fim = new Date(`${horario.data}T${horario.horaFim}`);
  return agora >= inicio && agora <= fim;
}