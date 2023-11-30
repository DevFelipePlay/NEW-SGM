import TextField from '@mui/material/TextField';
import React, { ChangeEvent } from 'react';
import { mask, unMask } from 'remask';

interface IInputForMoneyProps {
  value: string;
  onChange: (value: string) => void;
  helperText?: string;
  label?: string;
}

export const InputForMoney: React.FC<IInputForMoneyProps> = ({
  value,
  onChange,
  helperText,
  label,
}) => {
  // Regex para validar o formato do dinheiro (R$)
  const moneyRegex = /^R\$\s\d{1,3}(?:\.\d{3})*(?:,\d{2})?$/;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value.replace(/[^0-9,]/g, '');

    // Adicione a máscara apenas se o valor estiver no formato desejado
    if (moneyRegex.test(rawValue)) {
      onChange(mask(rawValue, 'R$ 999,99'));
    }
  };

  // Remova a máscara antes de exibir o valor no TextField
  const displayValue = mask(value, 'R$ 999,99');
  const rawValue = unMask(value);

  // Lógica para remover o "R$" antes de enviar para o endpoint
  //@ts-ignore
  const valueToSend = moneyRegex.test(rawValue) ? rawValue : '';

 

  return (
    <TextField
      variant='standard'
      label={label}
      value={displayValue}
      onChange={handleInputChange}
      helperText={helperText}
      sx={{ mb: 2 }}
      fullWidth
      // Adicione a lógica para o evento onBlur para garantir que o valor seja atualizado corretamente após a edição
      onBlur={() => onChange(mask(rawValue, 'R$ 999,99'))}
      required
    />
  );
};

// import TextField from '@mui/material/TextField';
// import React, { ChangeEvent } from 'react';
// import { mask, unMask } from 'remask';

// interface IInputForMoneyProps {
//   value: string;
//   onChange: (value: string) => void;
//   helperText?: string;
//   label?: string;
// }

// export const InputForMoney: React.FC<IInputForMoneyProps> = ({
//   value,
//   onChange,
//   helperText,
//   label,
// }) => {
//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     let rawValue = e.target.value.replace(/[^0-9]/g, '');
//     onChange(mask(rawValue, 'R$ 999,99'));
//   };

//   // Remova a máscara antes de exibir o valor no TextField
//   const displayValue = mask(value, 'R$ 999,99');
//   const rawValue = unMask(value);

//   return (
//     <TextField
//       variant='standard'
//       label={label}
//       value={displayValue}
//       onChange={handleInputChange}
//       helperText={helperText}
//       sx={{ mb: 2 }}
//       fullWidth
//       // Adicione a lógica para o evento onBlur para garantir que o valor seja atualizado corretamente após a edição
//       onBlur={() => onChange(mask(rawValue, 'R$ 999,99'))}
//       required
//     />
//   );
// };
