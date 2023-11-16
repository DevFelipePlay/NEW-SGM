import TextField from '@mui/material/TextField';
import React, { ChangeEvent } from 'react';
import { mask, unMask } from 'remask';

interface IInputForMoneyProps {
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
}

export const InputForMoney: React.FC<IInputForMoneyProps> = ({ value, onChange, helperText }) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/[^0-9]/g, '');
    onChange(mask(rawValue, 'R$ 999,99'));
  };

  // Remova a máscara antes de exibir o valor no TextField
  const displayValue = mask(value, 'R$ 999,99');
  const rawValue = unMask(value);

  return (
    <TextField
      variant='standard'
      label={'Valor de venda'}
      value={displayValue}
      onChange={handleInputChange}
      helperText={helperText}
      sx={{ mb: 2 }}
      fullWidth
      // Adicione a lógica para o evento onBlur para garantir que o valor seja atualizado corretamente após a edição
      onBlur={() => onChange(mask(rawValue, 'R$ 999,99'))}
    />
  );
};
