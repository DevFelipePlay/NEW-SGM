import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import {
  IReqPostPlayCadastroUserMMN,
  postPlayCadastroUserMMN,
} from '../../../../api/ApisPrimeiroAcessoParceiro/CadastroUserMMN';
import { Cards } from '../../../../components';
import { useForm } from '../../../../hooks';
import apiCep from '../../../../services/apiCep';

export default function CadastroDeDadosPessoaisUserMmn() {
  return <div>CadastroDeDadosPessoaisUserMmn</div>;
}

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

  const navigate = useNavigate();

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

  // tratamento de erro

  const [validations, setValidations] = useState({
    cep: false,
    cidade: false,
    complement: false,
    cpf: false,
    district: false,
    email: false,
    name: false,
    nascimento: false,
    number: false,
    phone: false,
    street: false,
    uf: false,
    whats: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const formDataPlusToken = {
    ...formData,
    id_patrocinador: 'AKNF4R40EG',
    nivel: 3,
  };

  const debouncedGetCepInfo = debounce(getCepInfo, 500);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      await postPlayCadastroUserMMN(formDataPlusToken);
      clearForm();
      toast.success('Cadastro Realizado!');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      toast.error('Erro ao Cadastrar');
      setLoading(false);
    }
  }

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const ufUpperCase = formData.uf ? formData.uf.toUpperCase() : '';
  const maskedUf = mask(ufUpperCase, ['AA']);

  async function getCepInfo() {
    try {
      const data = (await apiCep.get('/' + formData.cep + '/json')).data;
      changeForm('uf', data.uf);
      changeForm('cidade', data.localidade);
      changeForm('district', data.bairro);
      changeForm('street', data.logradouro);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const isCepValid = /^\d{5}-?\d{3}$/.test(formData.cep);
    const isCidadeValid = formData?.cidade && formData.cidade.trim() !== '';
    const isComplementValid = formData?.complement && formData.complement.trim() !== '';
    const isDistrictValid = formData?.district && formData.district.trim() !== '';
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) || formData.email === '';
    const isNameValid = formData?.name.trim() !== '';
    const isNascimentoValid = true; // Adicione sua lógica de validação para nascimento
    const isNumberValid = /^\d+$/.test(formData.number);
    const isPhoneValid = true;
    const isStreetValid = formData?.street && formData.street.trim() !== '';
    const isUfValid = /^[A-Za-z]{2}$/.test(formData.uf);
    const isWhatsValid = /^\(\d{2}\)\s\d{5}-\d{4}$/.test(formData.whats);
    const isPasswordValid = formData.password.length >= 5 || formData.password === '';
    const isConfirmEmailValid = formData.confirmEmail === formData.email;
    const isConfirmPasswordValid = formData.confirmPassword === formData.password;
    const isCpfValid = /^\d{11}$|^\d{14}$/.test(formData.cpf) || formData.cpf === '';

    // Atualizar estados de validação
    setValidations((prevValidations: any) => ({
      ...prevValidations,
      cep: isCepValid,
      cidade: isCidadeValid,
      complement: isComplementValid,
      cpf: isCpfValid,
      district: isDistrictValid,
      email: isEmailValid,
      name: isNameValid,
      nascimento: isNascimentoValid,
      number: isNumberValid,
      phone: isPhoneValid,
      street: isStreetValid,
      uf: isUfValid,
      whats: isWhatsValid,
      password: isPasswordValid,
      confirmEmail: isConfirmEmailValid,
      confirmPassword: isConfirmPasswordValid,
    }));
  }, [formData]);

  useEffect(() => {
    if (formData.cep.length === 8) {
      debouncedGetCepInfo();
    }
  }, [formData.cep]);

  useEffect(() => {
    if (formData.cep.length === 8) {
      getCepInfo().finally(() => {});
    }
  }, [formData.cep]);

  return (
    <Box
      component={'form'}
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          backgroundColor: '#141414',
          p: {
            md: 10,
            sm: 5,
            xs: 2,
          },
          py: {
            xs: 5,
          },
          flexDirection: 'column',
          display: 'flex',
          width: '100%',
        }}
      >
        <Typography variant={`${smDown ? 'h4' : 'h2'}`} color='var(--primary-color)'>
          Cadastre-se
        </Typography>
        <Typography
          variant={`${smDown ? 'subtitle2' : 'subtitle1'}`}
          color='#ffffff'
          sx={{
            maxWidth: '400px',
          }}
        >
          cadastre aqui seu modulo multinivel
        </Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          mb: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Cards
          title='Cadastre-se'
          subTitle='Insira seus dados para continuar'
          size={smDown ? '100%' : '50%'}
        >
          <CustomTextField
            label='Nome Completo'
            onChange={(e) => changeForm('name', e.target.value.trim())}
            required
          />

          <CustomTextField
            label='CPF/CNPJ'
            value={mask(formData.cpf || '', ['999.999.999-99', '99.999.999/9999-99'])}
            onChange={(e) => changeForm('cpf', e.target.value.replace(/\D/g, ''))}
            required
            helperText={!validations.cpf ? 'CPF INVALIDO' : ''}
            error={!validations.cpf}
          />

          <CustomTextField
            label='Data de Nascimento'
            value={mask(formData.nascimento || '', ['99/99/9999'])}
            onChange={(e) => changeForm('nascimento', e.target.value)}
            required
          />
          <CustomTextField
            label='Telefone'
            value={mask(formData.phone || '', ['(99) 9 9999-9999'])}
            onChange={(e) => changeForm('phone', e.target.value.replace(/\D/g, ''))}
            required
          />
          <CustomTextField
            label='CEP'
            value={mask(formData.cep || '', ['99999-999'])}
            onChange={(e) => changeForm('cep', e.target.value.replace(/\D/g, ''))}
            required
          />

          <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}></Stack>
          <CustomTextField
            value={maskedUf || ''}
            onChange={(e) => changeForm('uf', e.target.value)}
            label='UF'
            required
          />
          <CustomTextField
            value={formData.cidade || ''}
            onChange={(e) => changeForm('cidade', e.target.value.trim())}
            label='Cidade'
            required
          />
          <CustomTextField
            value={formData.district || ''}
            onChange={(e) => changeForm('district', e.target.value.trim())}
            label='Bairro'
            required
          />
          <CustomTextField
            value={formData.street || ''}
            onChange={(e) => changeForm('street', e.target.value.trim())}
            label='Logradouro'
            required
          />
          <CustomTextField
            value={formData.number || ''}
            onChange={(e) => changeForm('number', e.target.value.trim())}
            label='Número'
          />
          <CustomTextField
            value={formData.complement || ''}
            onChange={(e) => changeForm('complement', e.target.value.trim())}
            label='Complemento'
          />
          <CustomTextField
            label='E-Mail'
            value={formData.email || ''}
            onChange={(e) => changeForm('email', e.target.value)}
            helperText={!validations.email ? 'O email deve ser valido' : ''}
            error={!validations.email}
            required
          />
          <CustomTextField
            label='Confirme seu E-Mail'
            value={formData.confirmEmail || ''}
            onChange={(e) => changeForm('confirmEmail', e.target.value)}
            helperText={!validations.confirmEmail ? 'Os campos de e-mail não coícidem' : ''}
            error={!validations.confirmEmail}
            required
          />
          <CustomTextField
            label='Senha'
            type='password'
            value={formData.password || ''}
            onChange={(e) => changeForm('password', e.target.value)}
            helperText={
              !validations.password ? 'A senha deve conter no mínimo cinco caracteres' : ''
            }
            error={!validations.password}
            required
          />
          <CustomTextField
            label='Confirme sua senha'
            type='password'
            value={formData.confirmPassword || ''}
            onChange={(e) => changeForm('confirmPassword', e.target.value)}
            helperText={!validations.confirmPassword ? 'A senhas não coicídem' : ''}
            error={!validations.confirmPassword}
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
    </Box>
  );
}
