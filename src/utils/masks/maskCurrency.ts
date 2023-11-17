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
  let UnMaskedValue = parseFloat(maskedValue.replace(/\./, '').replace(/,/, '.'));
  return UnMaskedValue;
}
