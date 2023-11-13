import {
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';

import { mask } from 'remask';
import { Cards, CustomTextField } from '../../../../../components';

export default function Step5() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    telefone: '',
    cpf: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    telefone: '',
    cpf: '',
    email: '',
  });

  const formatCpf = (value: string) => mask(value, ['999.999.999-99']);

  const handleFieldChange = (fieldName: string, newValue: string) => {
    setFormData({ ...formData, [fieldName]: newValue });
  };

  const handleBlur = (fieldName: string) => {
    if (fieldName === 'cpf') {
      const formattedCpf = formatCpf(formData.cpf);
      setFormData({ ...formData, cpf: formattedCpf });
    }
    // Resto da lógica de validação...
    else if (fieldName === 'email') {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailPattern.test(formData.email)) {
        setErrors({ ...errors, email: 'E-mail inválido' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }
  };

  const handleSubmit = () => {
    // Implemente a lógica de envio de dados aqui
    // Verifique os erros antes de prosseguir com o envio
    if (errors.telefone === '' && errors.cpf === '' && errors.email === '') {
      // Envie os dados
      console.log('Dados enviados com sucesso:', formData);
    } else {
      // Exiba uma mensagem de erro ou realize alguma ação apropriada
      console.log('Por favor, corrija os erros no formulário');
    }
  };

  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Cards
        title={'Dados Financeiros'}
        subTitle={'Cadastre sua conta para recebimento'}
        size={smDown ? '100%' : '70%'}
      >
        <Typography variant='h6'>Selecione o tipo de pix</Typography>
        <RadioGroup
          aria-label='options'
          name='options'
          value={selectedOption}
          onChange={handleOptionChange}
          sx={{ flexDirection: 'row' }}
        >
          <FormControlLabel value='telefone' control={<Radio />} label='Telefone' />
          <FormControlLabel value='email' control={<Radio />} label='E-mail' />
          <FormControlLabel value='cpf' control={<Radio />} label='CPF' />
          <FormControlLabel value='chaveAleatoria' control={<Radio />} label='Chave Aleatória' />
        </RadioGroup>

        {selectedOption === 'telefone' && (
          <CustomTextField
            label='Telefone'
            value={mask(formData.telefone, ['(99) 9 9999-9999'])}
            onChange={(e) => handleFieldChange('telefone', e.target.value)}
            required
          />
        )}

        {selectedOption === 'email' && (
          <CustomTextField
            label='E-mail'
            value={formData.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            required
            error={errors.email !== ''}
            helperText={errors.email}
          />
        )}

        {selectedOption === 'cpf' && (
          <CustomTextField
            label='CPF'
            value={formatCpf(formData.cpf)}
            onChange={(e) => handleFieldChange('cpf', e.target.value)}
            onBlur={() => handleBlur('cpf')}
            helperText={errors.cpf}
            required
          />
        )}

        {selectedOption === 'chaveAleatoria' && <CustomTextField label='Chave Aleatória' />}

        <CustomTextField label='Nome do titular da conta' />
        <CustomTextField label='Número do CPF' />

        <Box mt={2}>
          <Button onClick={handleSubmit}>Enviar</Button>
        </Box>
      </Cards>
    </>
  );
}
