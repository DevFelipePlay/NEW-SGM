import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, TextField, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import { IReqPostPlayAutorizaCadastro, postPlayAutorizaCadastro } from '../../api';
import logoPLay from '../../assets/MMNImg/icon.png';
import { Cards, DefaultContainer } from '../../components';
import { useForm } from '../../hooks';
import useWindowSize from '../../hooks/useWindowSize';
import { errorToast } from '../../utils';

export function PrimeiroAcessoSGM() {
  const isMobile = useWindowSize();
  const [loadingValidate, setLoadingValidate] = useState(false);

  const { changeForm, formData } = useForm({
    documento: '',
  });

  const [validations, setValidation] = useState({
    documento: false,
  });

  // Input costumizado Token
  const [token, setToken] = useState<string[]>(Array(6).fill(''));
  const tokenInputs = useRef<HTMLInputElement[]>(Array(6).fill(null));

  const handleTokenChange = (index: number, newDigit: string) => {
    if (newDigit.match(/^\d$/)) {
      const newToken = [...token];
      newToken[index] = newDigit;
      setToken(newToken);

      if (index < token.length - 1) {
        tokenInputs.current[index + 1]?.focus();
      }
    } else if (newDigit === '') {
      // Allow deletion
      const newToken = [...token];
      newToken[index] = '';
      setToken(newToken);

      if (index > 0) {
        tokenInputs.current[index - 1]?.focus();
      }
    }
  };

  const isTokenComplete = token.every((digit) => digit !== '');
  ////

  async function handleValidateCadParceiro(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setLoadingValidate(true);

    const payload: IReqPostPlayAutorizaCadastro = {
      codigo: token.join('') || '',
      documento: formData.documento || '',
    };

    try {
      await postPlayAutorizaCadastro(payload);
      toast.success('Sucesso!');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingValidate(false);
    }
  }

  useEffect(() => {
    const isCpfTitularValid =
      /^\d{11}$|^\d{14}$/.test(formData.documento) || formData.documento === '';
    setValidation({
      documento: isCpfTitularValid,
    });
  }, [formData]);

  return (
    <DefaultContainer
      page={''}
      title={'Bem-Vindo ao SGM'}
      subTitle={'Realize o seu cadastro no Sistema de Gerenciamento Móvel!'}
      showAvatar={false}
      showSearch={false}
      hasSidebar={false}
    >
      <Typography variant='h4' sx={{ textAlign: 'center' }}>
        Falta pouco para concluir o seu cadastro como um Parceiro Play!
      </Typography>
      <Cards
        title={'Validação para cadastro'}
        subTitle={'O código deverá ser enviado pela equipe comercial Play'}
        size={!isMobile ? 'auto' : '80%'}
      >
        <Box
          onSubmit={(e) => handleValidateCadParceiro(e)}
          component={'form'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <img
            src={logoPLay}
            style={{ width: !isMobile ? '10%' : '10%', borderRadius: '50%', marginBottom: '2rem' }}
          />

          <TextField
            variant='standard'
            label='CNPJ'
            value={mask(formData.documento || '', ['999.999.999-99', '99.999.999/9999-99'])}
            onChange={(e) => changeForm('documento', e.target.value.replace(/\D/g, ''))}
            required
            helperText={
              !validations.documento
                ? 'CPF INVÁLIDO'
                : 'Digite o CNPJ que deseja utilizar para sua MVNO'
            }
            error={!validations.documento}
            sx={{ py: 2, width: '30%' }}
          />
          <Typography>Digite o código de autenticação</Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              margin: '2rem',
            }}
          >
            {token.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(input) => {
                  if (input) {
                    tokenInputs.current[index] = input;
                  }
                }}
                variant='outlined'
                size='small'
                type='text'
                inputProps={{ maxLength: 1 }}
                onChange={(e) => handleTokenChange(index, e.target.value)}
                value={digit}
                style={{ width: '40px', margin: !isMobile ? '0 1px' : '0 4px' }}
              />
            ))}
          </Box>
          <LoadingButton
            variant='contained'
            type='submit'
            disabled={!isTokenComplete || !validations.documento}
            loading={loadingValidate}
          >
            Validar
          </LoadingButton>
        </Box>
      </Cards>
    </DefaultContainer>
  );
}
