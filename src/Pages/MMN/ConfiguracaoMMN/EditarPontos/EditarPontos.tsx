import LoadingButton from '@mui/lab/LoadingButton';
import { TextField } from '@mui/material';
import { Cards } from '../../../../components';

export function EditarPontos() {
  return (
    <Cards title={'Edite seus pontos por modalidade'} subTitle={'Pontos'} size={'100%'}>
      <Cards title={'Modalidades'} subTitle={''} size={'50%'}>
        <TextField
          type='tel'
          label='Ativação'
          variant='standard'
          fullWidth
          sx={{ mb: 2 }}
          required
        />
        <TextField
          type='tel'
          label='Recarga'
          variant='standard'
          fullWidth
          sx={{ mb: 2 }}
          required
        />

        <LoadingButton type='submit' variant='contained'>
          Confirmar edicão
        </LoadingButton>
      </Cards>
    </Cards>
  );
}
