import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PiHandCoins } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useEffect, useState } from 'react';
import {
  IResPostPlayRecuperaPacotesLicenciamento,
  postPlayRecuperaPacotesLicenciamento,
} from '../../../../api';
import { Cards } from '../../../../components';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';
import { StepsCadastroUserMMN } from '../../../landingPageMultinivel/CadastroUserMMN';

export function CompraDePacotes() {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'));

  const { user } = useUser();

  const [response, setResponse] = useState<IResPostPlayRecuperaPacotesLicenciamento[]>([]);
  const [loading, setLoading] = useState(false);

  function handleButtonClick(): void {
    throw new Error('Function not implemented.');
  }

  async function handleSubmit() {
    setLoading(true);

    let payload = {
      token: user?.token ? user?.token : '',
    };

    try {
      const data = await postPlayRecuperaPacotesLicenciamento(payload);
      setResponse(data);
    } catch (error) {
      errorToast;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <StepsCadastroUserMMN step={0}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Typography variant='h4'>Pacotes</Typography>
        <Typography>Selecione o melhor pack para você</Typography>

        <Box width={'100%'}>
          <Grid container width={'100%'}>
            {response &&
              response.map &&
              response.map((i: IResPostPlayRecuperaPacotesLicenciamento, index) => (
                <Grid item xs={4} key={index}>
                  <Cards
                    title={i.nome}
                    subTitle={'Escolha o seu Pack'}
                    size={smDown ? '100vm' : mdDown ? '200px' : lgDown ? '200px' : '350px'}
                    showIcon
                    bgColorIcon='var(--primary-color)'
                    icon={<PiHandCoins />}
                  >
                    <Typography> Acesso ao multinivel +</Typography>
                    <Typography variant='h5'>{i.chips} Chips </Typography>

                    <Typography>Por apenas</Typography>
                    <Typography variant='h5'>R$ {i.valor_venda}</Typography>
                    <Button onClick={() => handleButtonClick()} variant='contained' sx={{ mt: 2 }}>
                      Contratar
                    </Button>
                  </Cards>
                </Grid>
              ))}
          </Grid>
        </Box>
        <Button
          onClick={() => handleButtonClick()}
          variant='outlined'
          sx={{ my: 2 }}
          color='secondary'
        >
          Continuar sem comprar
        </Button>
      </Box>
    </StepsCadastroUserMMN>
  );
}
