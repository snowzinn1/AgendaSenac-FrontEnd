// Funções puras de CPF (sem React, sem rede).
export const apenasDigitos = (valor = '') => valor.replace(/\D/g, '');

// Máscara enquanto digita: "12345678901" -> "123.456.789-01"
export function mascararCpf(valor = '') {
  return apenasDigitos(valor)
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

// Exibição protegida: "12345678901" -> "123.***.***-01"
export function ocultarCpf(valor = '') {
  const d = apenasDigitos(valor);
  return d.length === 11 ? `${d.slice(0, 3)}.***.***-${d.slice(9)}` : '';
}

// Valida só o tamanho. (Dígito verificador pode ser adicionado depois.)
export const cpfCompleto = (valor = '') => apenasDigitos(valor).length === 11;