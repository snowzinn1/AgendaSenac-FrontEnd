// Funções puras do código de acesso (sem React, sem rede).
// O back gera 9 caracteres (A-Z e 0-9) com um "-" depois do 4º. Ex.: AB12-C3D4E

export const normalizarCodigo = (valor = '') =>
  valor.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 9);

// Máscara enquanto digita: "AB12C3D4E" -> "AB12-C3D4E"
export function mascararCodigo(valor = '') {
  const limpo = normalizarCodigo(valor);
  return limpo.length > 4 ? `${limpo.slice(0, 4)}-${limpo.slice(4)}` : limpo;
}

export const codigoCompleto = (valor = '') => normalizarCodigo(valor).length === 9;