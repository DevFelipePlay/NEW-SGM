import { Avatar, Box, Grid, Typography } from '@mui/material';
import perfil from '../../../../../assets/MMNImg/perfil.jpeg';
import { Cards } from '../../../../../components';

export default function Tab0() {
  return (
    <Grid container spacing={2} width={'100%'}>
      <Grid item xs={15}>
        <Cards title={'Link para indicação'} subTitle={''} size={'100%'}>
          <a href=''>https://linkparaindicação/usertestenildo.com.br</a>
        </Cards>
      </Grid>
      <Grid item xs={3}>
        <Cards title={'Bonus a receber'} subTitle={'Total de Bonus a ser recebido'} size={'100%'}>
          <Typography variant='h5'>R$ 00.000,00</Typography>
        </Cards>
        <Cards
          title={'Total de niveis'}
          subTitle={'Total de niveis de usuarios ativos que voce pode receber '}
          size={'100%'}
        >
          <Typography variant='h5'>10 niveis</Typography>
        </Cards>
      </Grid>
      <Grid item xs={3}>
        <Cards
          title={'Total de bonus recebidos'}
          subTitle={'Total de Bonus recebidos'}
          size={'100%'}
        >
          <Typography variant='h5'>R$ 00.000,00</Typography>
        </Cards>
        <Cards
          title={'Usuários ativos'}
          subTitle={'Total de usuários ativos na sua rede'}
          size={'100%'}
        >
          <Typography variant='h5'>54.328</Typography>
        </Cards>
      </Grid>
      <Grid item xs={5.5}>
        <Cards title={'Dados Pessoais'} subTitle={''} size={'100%'}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar sx={{ width: '100px', height: '100px', mb: 2 }}>
              <img src={perfil} style={{ width: '100%' }} />
            </Avatar>
            <Typography variant='h5'>Ellon Musk</Typography>
            <div style={{ width: '90%', height: '1px', backgroundColor: 'var(--primary-color)' }} />
            <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography>Indicado por:</Typography>
                <Typography>Status:</Typography>
                <Typography>Plano Ativo:</Typography>
                <Typography>Saldo de dados:</Typography>

                <Typography>Expira em:</Typography>
                <Typography>Graduação:</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <Typography>OPUSCELL CORPORATIVO</Typography>
                <Typography>ATIVO</Typography>
                <Typography>MAXX</Typography>
                <Typography>57 GB</Typography>
                <Typography>10/09/2023</Typography>
                <Typography>Platina</Typography>
              </Grid>
            </Grid>
          </Box>
        </Cards>
      </Grid>
    </Grid>
  );
}
