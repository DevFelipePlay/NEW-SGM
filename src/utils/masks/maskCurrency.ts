export function currencyFormatter(numero?: number | string | null) {
  if (numero === '' || numero === null || numero === undefined) return '0';

  let num = parseFloat(numero.toString());

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  const numFormatado = formatter.format(num);
  return numFormatado;
}

export function currencyMask(value: string) {
  let maskedValue = value;
  maskedValue = maskedValue.replace(/\D/g, '');
  maskedValue = maskedValue.replace(/(\d)(\d{2})$/, '$1.$2');
  maskedValue = maskedValue.replace(/(?=(\d{3})+(\D))\B/g, '.');
  return maskedValue;
}

export function currencyUnMask(maskedValue: string) {
  // let UnMaskedValue = parseFloat(maskedValue.replace(/\./, '').replace(/,/, '.'));
  // return UnMaskedValue;
  // Remover pontos de milhar
  let unMaskedValue = maskedValue.replace(/\./g, '');
  // Substituir vírgulas por pontos
  unMaskedValue = unMaskedValue.replace(/,/, '.');

  // Se o valor tiver mais de três caracteres, posicionar o ponto antes das duas últimas casas decimais
  if (unMaskedValue.length > 3) {
    const decimalIndex = unMaskedValue.length - 2;
    unMaskedValue = unMaskedValue.slice(0, decimalIndex) + '.' + unMaskedValue.slice(decimalIndex);
  }
  return parseFloat(unMaskedValue);
}
