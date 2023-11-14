import { Box, Button, TextField } from '@mui/material';
import { Cards } from '../../../../../components';

export default function Step4() {
  return (
    <Cards
      title={'Pontos por nível'}
      subTitle={'Defina a quantidade de pontos de cada modalidade'}
      size={'50%'}
    >
      <TextField label='Ativação' variant='standard' fullWidth sx={{ mb: 2 }} />
      <TextField label='Recarga' variant='standard' fullWidth sx={{ mb: 2 }} />
      <TextField label='Venda de chip' variant='standard' fullWidth sx={{ mb: 2 }} />
      <TextField label='lincença' variant='standard' fullWidth sx={{ mb: 2 }} />
      <Box>
        <Button onClick={() => ''}>Enviar</Button>
      </Box>
    </Cards>
  );
}
