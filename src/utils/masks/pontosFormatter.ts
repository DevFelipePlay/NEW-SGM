export const pontosFormatter = (numero: number): string => {
  // Converter número para string
  const numeroString = numero.toString();

  // Dividir a parte inteira e decimal
  const [parteInteira, parteDecimal] = numeroString.split('.');

  // Adicionar ponto a cada três dígitos na parte inteira
  const parteInteiraFormatada = parteInteira.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  // Montar o número formatado
  const numeroFormatado = parteDecimal
    ? `${parteInteiraFormatada},${parteDecimal}`
    : parteInteiraFormatada;

  return numeroFormatado;
};
