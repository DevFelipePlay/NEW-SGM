import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { StepsCadastroUserMMN } from '..';

import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import {
  IReqPostPlayCadastroDadosFinanceiros,
  postPlayCadastroDadosFinanceiros,
} from '../../../../api';
import { Cards, CustomTextField } from '../../../../components';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';

export function CadastroDadosFinanceiros() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const { formData, changeForm } = useForm<IReqPostPlayCadastroDadosFinanceiros>({
    chave_pix: '',
    cpf_titular_pix: '',
    titular_pix: '',
    type_pix: '',
    cpf: user?.cpf ? user?.cpf : '',
  });

  const [validations, setValidation] = useState({
    chave_pix: false,
    cpf_titular_pix: false,
    cpf: false,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      await postPlayCadastroDadosFinanceiros(formData);
      toast.success('Dados Financeiros cadastrados!');
      if (user?.msisdnativo) {
        navigate('/home-usuario-mmn');
      } else {
        navigate('/sem-linha-ativa');
      }
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const isEmailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.chave_pix) || formData.chave_pix === '';
    const isCpfValid = /^\d{11}$|^\d{14}$/.test(formData.cpf) || formData.cpf === '';
    const isCpfTitularValid =
      /^\d{11}$|^\d{14}$/.test(formData.cpf_titular_pix) || formData.cpf_titular_pix === '';
    setValidation({
      cpf: isCpfValid,
      chave_pix: isEmailValid,
      cpf_titular_pix: isCpfTitularValid,
    });

    console.log(formData);
  }, [formData]);

  return (
    <StepsCadastroUserMMN step={3}>
      <Box
        component={'form'}
        onSubmit={handleSubmit}
        sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}
      >
        <Cards
          title={'Dados Financeiros'}
          subTitle={'Cadastre sua conta para recebimento'}
          size={smDown ? '100%' : '70%'}
        >
          <Typography variant='h6'>Selecione o tipo de pix</Typography>
          <RadioGroup
            aria-label='options'
            name='options'
            value={formData.type_pix}
            onChange={(e) => changeForm('type_pix', e.target.value)}
            sx={{ flexDirection: 'row' }}
          >
            <FormControlLabel value='telefone' control={<Radio />} label='Telefone' />
            <FormControlLabel value='email' control={<Radio />} label='E-mail' />
            <FormControlLabel value='cpf' control={<Radio />} label='CPF' />
            <FormControlLabel value='chaveAleatoria' control={<Radio />} label='Chave Aleatória' />
          </RadioGroup>

          {formData.type_pix === 'telefone' && (
            <CustomTextField
              value={mask(formData.chave_pix, ['(99) 9 9999-9999'])}
              onChange={(e) => changeForm('chave_pix', e.target.value)}
              label='Telefone'
              required
            />
          )}

          {formData.type_pix === 'email' && (
            <CustomTextField
              value={formData.chave_pix}
              label='E-mail'
              onChange={(e) => changeForm('chave_pix', e.target.value)}
              helperText={!validations.chave_pix ? 'O email deve ser valido' : ''}
              error={!validations.chave_pix}
              required
            />
          )}

          {formData.type_pix === 'cpf' && (
            <CustomTextField
              label='Chave: CPF/CNPJ'
              value={mask(formData.chave_pix || '', ['999.999.999-99'])}
              onChange={(e) => changeForm('chave_pix', e.target.value.replace(/\D/g, ''))}
              required
            />
          )}

          {formData.type_pix === 'chaveAleatoria' && (
            <CustomTextField
              value={formData.chave_pix}
              onChange={(e) => changeForm('chave_pix', e.target.value)}
              label='Chave Aleatória'
              required
            />
          )}

          <CustomTextField
            label='Nome do titular da conta'
            value={formData.titular_pix}
            onChange={(e) => changeForm('titular_pix', e.target.value)}
          />
          <CustomTextField
            label='CPF/CNPJ do Titular'
            value={mask(formData.cpf_titular_pix || '', ['999.999.999-99', '99.999.999/9999-99'])}
            onChange={(e) => changeForm('cpf_titular_pix', e.target.value.replace(/\D/g, ''))}
            required
            helperText={!validations.cpf_titular_pix ? 'CPF INVALIDO' : ''}
            error={!validations.cpf_titular_pix}
          />

          <Box mt={2}>
            <LoadingButton
              type='submit'
              variant='contained'
              loading={loading}
              disabled={
                formData.chave_pix === '' ||
                formData.titular_pix === '' ||
                formData.cpf === '' ||
                formData.type_pix === '' ||
                !validations.cpf_titular_pix
              }
            >
              Enviar
            </LoadingButton>
          </Box>
        </Cards>
      </Box>
    </StepsCadastroUserMMN>
  );
}
