import { Button, TextField } from '@mui/material';
import { Cards } from '../../../../../components';

export default function Step5() {
  return (
    <>
      <Cards title={'Valores'} subTitle={'Cadastro de taxas'} size={'50%'}>
        <TextField variant='standard' label={'Taxa de saque'} sx={{ mb: 1 }}></TextField>
        <TextField variant='standard' label={'Limite minimo de saque '} sx={{ mb: 1 }}></TextField>
        <TextField variant='standard' label={'Bonus de carreira'} sx={{ mb: 3 }}></TextField>
        <Button onClick={() => ''}>Enviar</Button>
      </Cards>
    </>
  );
}
