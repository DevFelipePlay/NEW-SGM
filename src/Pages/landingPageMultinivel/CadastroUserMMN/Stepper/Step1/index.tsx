import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { useState } from 'react';
import { mask } from 'remask';
import { Cards } from '../../../../../components';

interface CustomTextFieldProps {
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  type?: string;
}

function CustomTextField({
  value,
  label,
  required = false,
  onBlur,
  helperText,
  error,
  type,
  ...rest
}: CustomTextFieldProps) {
  return (
    <TextField
      required={required}
      label={label}
      variant='standard'
      fullWidth
      sx={{ mb: 2 }}
      {...rest}
      value={value}
      onBlur={onBlur}
      helperText={helperText}
      error={error}
      type={type}
    />
  );
}

export default function Step1() {
  const [formData, setFormData] = useState({
    nome: '',
    dataNascimento: '',
    telefone: '',
    cpf: '',
    cep: '',
    uf: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numero: '',
    complemento: '',
    email: '',
    confirmEmail: '',
    senha: '',
    confirmSenha: '',
  });

  const [errors, setErrors] = useState({
    nome: '',
    telefone: '',
    cpf: '',
    cep: '',
    uf: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numero: '',
    complemento: '',
    email: '',
    confirmEmail: '',
    senha: '',
    confirmSenha: '',
  });

  const formatCpf = (value: string) => mask(value, ['999.999.999-99', '99.999.999/9999-99']);

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
    } else if (fieldName === 'confirmEmail') {
      if (formData.confirmEmail !== formData.email) {
        setErrors({ ...errors, confirmEmail: 'Os e-mails não coincidem' });
      } else {
        setErrors({ ...errors, confirmEmail: '' });
      }
    } else if (fieldName === 'senha') {
      // Implemente validações para senha, como comprimento mínimo, maiúsculas, minúsculas, números, etc.
    } else if (fieldName === 'confirmSenha') {
      if (formData.confirmSenha !== formData.senha) {
        setErrors({ ...errors, confirmSenha: 'As senhas não coincidem' });
      } else {
        setErrors({ ...errors, confirmSenha: '' });
      }
    }
  };

  const handleSubmit = () => {
    // Implemente a lógica de envio de dados aqui
    // Verifique os erros antes de prosseguir com o envio
    if (
      errors.nome === '' &&
      errors.telefone === '' &&
      errors.cpf === '' &&
      errors.cep === '' &&
      errors.uf === '' &&
      errors.cidade === '' &&
      errors.bairro === '' &&
      errors.logradouro === '' &&
      errors.numero === '' &&
      errors.complemento === '' &&
      errors.email === '' &&
      errors.confirmEmail === '' &&
      errors.senha === '' &&
      errors.confirmSenha === ''
    ) {
      // Envie os dados
      console.log('Dados enviados com sucesso:', formData);
    } else {
      // Exiba uma mensagem de erro ou realize alguma ação apropriada
      console.log('Por favor, corrija os erros no formulário');
    }
  };

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Cards
      title='Cadastre-se'
      subTitle='Insira seus dados para continuar'
      size={smDown ? '100%' : '50%'}
    >
      <CustomTextField
        label='Nome Completo'
        onChange={(e) => handleFieldChange('nome', e.target.value)}
        onBlur={() => handleBlur('nome')}
        helperText={errors.nome}
        required
      />
      <CustomTextField
        label='CPF/CNPJ'
        value={formatCpf(formData.cpf)}
        onChange={(e) => handleFieldChange('cpf', e.target.value)}
        onBlur={() => handleBlur('cpf')}
        helperText={errors.cpf}
        required
      />
      <CustomTextField label='RG' onChange={(e) => handleFieldChange('rg', e.target.value)} />
      <CustomTextField
        label='Data de Nascimento'
        value={mask(formData.dataNascimento, ['99/99/9999'])}
        onChange={(e) => handleFieldChange('dataNascimento', e.target.value)}
        required
      />
      <CustomTextField
        label='Telefone'
        value={mask(formData.telefone, ['(99) 9 9999-9999'])}
        onChange={(e) => handleFieldChange('telefone', e.target.value)}
        required
      />
      <CustomTextField
        label='CEP'
        value={mask(formData.cep, ['99999-999'])}
        onChange={(e) => handleFieldChange('cep', e.target.value)}
        onBlur={() => handleBlur('cep')}
        error={errors.cep !== ''}
        helperText={errors.cep}
        required
      />
      <CustomTextField label='UF' required />
      <CustomTextField label='Cidade' required />
      <CustomTextField label='Bairro' required />
      <CustomTextField label='Logradouro' required />
      <CustomTextField label='Número' />
      <CustomTextField label='Complemento' />
      <CustomTextField
        label='E-Mail'
        value={formData.email}
        onChange={(e) => handleFieldChange('email', e.target.value)}
        onBlur={() => handleBlur('email')}
        required
        error={errors.email !== ''}
        helperText={errors.email}
      />
      <CustomTextField
        label='Confirme seu E-Mail'
        value={formData.confirmEmail}
        onChange={(e) => handleFieldChange('confirmEmail', e.target.value)}
        onBlur={() => handleBlur('confirmEmail')}
        required
        error={errors.confirmEmail !== ''}
        helperText={errors.confirmEmail}
      />
      <CustomTextField
        label='Senha'
        type='password'
        value={formData.senha}
        onChange={(e) => handleFieldChange('senha', e.target.value)}
        onBlur={() => handleBlur('senha')}
        required
        error={errors.senha !== ''}
        helperText={errors.senha}
      />
      <CustomTextField
        label='Confirme sua senha'
        type='password'
        value={formData.confirmSenha}
        onChange={(e) => handleFieldChange('confirmSenha', e.target.value)}
        onBlur={() => handleBlur('confirmSenha')}
        required
        error={errors.confirmSenha !== ''}
        helperText={errors.confirmSenha}
      />
      <FormGroup>
        <FormControlLabel required control={<Checkbox />} label='Aceitar termos de uso.' />
      </FormGroup>
      <Box>
        <Button onClick={handleSubmit}>Enviar</Button>
      </Box>
    </Cards>
  );
}
