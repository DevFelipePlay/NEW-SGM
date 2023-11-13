export default function CadastroDeDadosPessoaisUserMmn() {
  return <div>CadastroDeDadosPessoaisUserMmn</div>;
}
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import {
  IReqPostPlayCadastroUserMMN,
  postPlayCadastroUserMMN,
} from '../../../../api/CadastroUserMMN';
import { Cards } from '../../../../components';
import { useForm } from '../../../../hooks';
import { StepsCadastroUserMMN } from '../StepsCadastroUserMMN';

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

export function CadastroDeDadosPessoaisUserMMN() {
  const [loading, setLoading] = useState(false);
  const { formData, changeForm, clearForm } = useForm<IReqPostPlayCadastroUserMMN>({
    cep: '',
    cidade: '',
    complement: '',
    cpf: '',
    district: '',
    email: '',
    id_patrocinador: '',
    name: '',
    nascimento: '',
    nivel: 3,
    number: '',
    parceiro: '',
    phone: '',
    street: '',
    token: '',
    uf: '',
    whats: '',
    password: '',
    confirmEmail: '',
    confirmPassword: '',
  });

  const formDataPlusToken = {
    ...formData,
    id_patrocinador: 'AKNF4R40EG',
    nivel: 3,
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await postPlayCadastroUserMMN(formDataPlusToken);
      clearForm();
      toast.success('Cadastro Realizado!');
      setLoading(false);
    } catch (error) {
      toast.error('Erro ao Cadastrar');
      setLoading(false);
    }
  }

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const ufUpperCase = formData.uf.toUpperCase();
  const maskedUf = mask(ufUpperCase, ['AA']);

  return (
    <StepsCadastroUserMMN step={0}>
      <Box
        component={'form'}
        onSubmit={handleSubmit}
        sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Cards
          title='Cadastre-se'
          subTitle='Insira seus dados para continuar'
          size={smDown ? '100%' : '50%'}
        >
          <CustomTextField
            label='Nome Completo'
            onChange={(e) => changeForm('name', e.target.value)}
            required
          />
          <CustomTextField
            label='CPF/CNPJ'
            value={mask(formData.cpf, ['999.999.999-99', '99.999.999/9999-99'])}
            onChange={(e) => changeForm('cpf', e.target.value.replace(/\D/g, ''))}
            required
          />
          <CustomTextField
            label='Data de Nascimento'
            value={mask(formData.nascimento, ['99/99/9999'])}
            onChange={(e) => changeForm('nascimento', e.target.value.replace(/\D/g, ''))}
            required
          />
          <CustomTextField
            label='Telefone'
            value={mask(formData.phone, ['(99) 9 9999-9999'])}
            required
          />
          <CustomTextField
            label='CEP'
            value={mask(formData.cep, ['99999-999'])}
            onChange={(e) => changeForm('cep', e.target.value.replace(/\D/g, ''))}
            required
          />
          <CustomTextField
            value={maskedUf}
            onChange={(e) => changeForm('uf', e.target.value)}
            label='UF'
            required
          />
          <CustomTextField label='Cidade' required />
          <CustomTextField label='Bairro' required />
          <CustomTextField label='Logradouro' required />
          <CustomTextField label='Número' />
          <CustomTextField label='Complemento' />
          <CustomTextField
            label='E-Mail'
            value={formData.email}
            onChange={(e) => changeForm('email', e.target.value)}
            required
          />
          <CustomTextField
            label='Confirme seu E-Mail'
            value={formData.confirmEmail}
            onChange={(e) => changeForm('confirmEmail', e.target.value)}
            required
          />
          <CustomTextField
            label='Senha'
            type='password'
            value={formData.password}
            onChange={(e) => changeForm('password', e.target.value)}
            required
          />
          <CustomTextField
            label='Confirme sua senha'
            type='password'
            value={formData.confirmPassword}
            onChange={(e) => changeForm('confirmPassword', e.target.value)}
            required
          />
          <FormGroup>
            <FormControlLabel required control={<Checkbox />} label='Aceitar termos de uso.' />
          </FormGroup>
          <Box>
            <LoadingButton variant='contained' type='submit' loading={loading}>
              Enviar
            </LoadingButton>
          </Box>
        </Cards>
      </Box>
    </StepsCadastroUserMMN>
  );
}
