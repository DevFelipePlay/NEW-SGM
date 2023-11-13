import { mask } from 'remask';
import { MaskValueType } from '../../@types';
export const maskCpfCnpj = (value: MaskValueType) =>
  !!value ? mask(value, ['999.999.999-99', '99.999.999/9999-99']) : '';
