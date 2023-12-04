import { Box, Stack, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { mask } from 'remask';
import { AuthContext } from '../../components/Auth/auth';

import LoadingButton from '@mui/lab/LoadingButton';

import { useNavigate } from 'react-router-dom';
import { AnimatedBackground } from '../../components';
import { TextInput, TextInputPassword } from '../../components/Inputs';

export default function Login() {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const navigate = useNavigate();

  // login
  const { signIn, loadingAuth } = useContext(AuthContext);

  // Função para aplicar a máscara de CPF/CNPJ
  const formatCpf = (value: string) => mask(value, ['999.999.999-99', '99.999.999/9999-99']);

  // Função de manipulação de mudança para o campo CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unmaskedValue = e.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    setCpf(unmaskedValue);
  };

  return (
    <Box
      sx={{
        background: 'radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <AnimatedBackground />
      <Box
        sx={{ width: '100vw', height: '100vh', display: 'flex', flexDirection: 'row' }}
        component={'form'}
        onSubmit={(e) => {
          e.preventDefault();
          navigate('/');
        }}
      >
        <Box
          sx={{
            width: '40%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(20px)',
            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              backdropFilter: 'blur(10px)',
              zIndex: '100',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant='h4' sx={{ color: '#c0c0c0' }}>
              Login
            </Typography>
            <TextInput
              icon={undefined}
              placeholder={'CNPJ/CPF'}
              type={'tel'}
              value={formatCpf(cpf)}
              onChange={handleCpfChange}
            />
            <TextInputPassword
              icon
              placeholder={'Senha'}
              value={senha}
              onChange={(e: any) => setSenha(e.target.value)}
            />
            <LoadingButton
              onClick={(e) => {
                e.preventDefault();
                signIn(cpf, senha);
              }}
              size='small'
              loading={loadingAuth}
              variant='contained'
              type='submit'
            >
              Entrar
            </LoadingButton>
          </Stack>
        </Box>
        <Box
          sx={{
            width: '60%',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Stack
            sx={{
              backdropFilter: 'blur(10px)',
              dislay: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              p: 2,
              borderRadius: '30px',
              border: 'solid 1px var(--primary-color)',
            }}
          >
            <Typography variant='h2' color={'white'}>
              Seja bem-vindo
            </Typography>
            <Typography variant='h2' color={'white'}>
              ao
            </Typography>
            <Typography variant='h2' color={'var(--primary-color)'} fontWeight={'900'}>
              Multinível Opuscell
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
