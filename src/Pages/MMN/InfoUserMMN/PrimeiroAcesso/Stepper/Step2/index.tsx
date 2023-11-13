import { Button, TextField, Typography } from '@mui/material';
import { Cards } from '../../../../../../components';

export default function Step2() {
  return (
    <>
      <Cards
        title={'Cadastro dos Niveis'}
        subTitle={'Cadastro do sistema de níveis de rede'}
        size={'50%'}
      >
        <Typography sx={{ mt: 2 }}>Valor de referencia</Typography>
        <TextField
          variant='standard'
          helperText={'Defina o valor de referencia que será usado nas porcentagens abaixo'}
        ></TextField>
        <Typography sx={{ mt: 2 }}>Porcentagem por nivel</Typography>
        <Typography sx={{ mt: 2 }}>Nivel 1</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 2</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 3</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 4</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 5</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 6</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 7</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 8</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 9</Typography>
        <TextField variant='standard' helperText={'Escolha um valor de 0% à 100%'}></TextField>
        <Typography sx={{ mt: 2 }}>Nivel 10</Typography>
        <TextField
          variant='standard'
          helperText={'Escolha um valor de 0% à 100%'}
          sx={{ mb: 3 }}
        ></TextField>
        <Button onClick={() => ''}> Enviar</Button>
      </Cards>
    </>
  );
}
