import { Box, Button, TextField, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import logoPLay from '../../assets/MMNImg/icon.png';
import { Cards, DefaultContainer } from '../../components';
import useWindowSize from '../../hooks/useWindowSize';

export function PrimeiroAcessoSGM() {
  const isMobile = useWindowSize();
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
        title={'Cole o código de autenticação abaixo para prosseguir com o seu cadastro'}
        subTitle={'O código deverá ser enviado pela equipe comercial Play'}
        size={!isMobile ? 'auto' : '80%'}
      >
        <img
          src={logoPLay}
          style={{ width: !isMobile ? '10%' : '10%', borderRadius: '50%', marginBottom: '2rem' }}
        />
        <Typography>Digite o código de autenticação abaixo</Typography>

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
        <Button variant='contained' disabled={!isTokenComplete}>
          Validar
        </Button>
      </Cards>
    </DefaultContainer>
  );
}
