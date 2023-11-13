import { Button, Grid, Typography } from '@mui/material';

import QrCode from '../../../../../assets/MMNImg/qrcode.png';
import { Cards } from '../../../../../components';

export default function Tab2() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Cards title={'Saldo'} subTitle={'Total disponivel para saque'} size={'100%'}>
          <Typography variant='h5' sx={{ mb: 2 }}>
            R$ 756.00
          </Typography>
          <Button
            size='small'
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          >
            Solicitar saque
          </Button>
        </Cards>
        <Cards
          title={'Valor total já sacado'}
          subTitle={'Valor total já ganho até agora'}
          size={'100%'}
        >
          <Typography variant='h5' sx={{ mb: 2 }}>
            R$ 73,456.00
          </Typography>
        </Cards>
      </Grid>
      <Grid item xs={8}>
        <Cards
          title={'Seu QR Code'}
          subTitle={'Este é o pix que voce usa para receber o seu bonus'}
          size={'100%'}
        >
          <img src={QrCode} width={'30%'} />
          <Typography>Chave PIX : 000.000.000-00</Typography>
          <Typography>Tipo : CPF</Typography>
          <Typography>Titular: Elon Musk</Typography>
          <Button
            size='small'
            onClick={function (): void {
              throw new Error('Function not implemented.');
            }}
          >
            Editar dados
          </Button>
        </Cards>
      </Grid>
    </Grid>
  );
}
