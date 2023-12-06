import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import {
  IResPostPlayVisualizaPacotesVendaChip,
  postPlayVisualizaPacotesVendaChip,
} from '../../../../../api';
import { Cards, Loading } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';
import { errorToast } from '../../../../../utils';

export function AdquiraSeusChips() {
  const [loadingView, setLoadingView] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayVisualizaPacotesVendaChip[]>([]);
  const { user } = useUser();
  async function handleView() {
    setLoadingView(true);

    try {
      let payload = {
        token: user?.token || '',
      };
      const data = await postPlayVisualizaPacotesVendaChip(payload);
      setResponseView(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingView(false);
    }
  }

  useEffect(() => {
    handleView();
  }, []);

  return (
    <Grid container>
      {loadingView ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
          }}
        >
          <Loading />
        </Box>
      ) : (
        <>
          {responseView.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Cards title={`${item.nome}`} subTitle={'Adquira'} size={'400'}>
                <Typography variant='h4' sx={{ mb: 2 }}>
                  {' '}
                  {item.chips} Chips
                </Typography>
                <Typography variant='subtitle2'>Por Apenas:</Typography>

                <Typography variant='h5' color={'var(--primary-color)'}>
                  R$ {item.valor_venda}
                </Typography>
                <LoadingButton
                  variant='contained'
                  sx={{ mt: 2 }}
                  onClick={() => alert('Função temporariamente indisponivel')}
                >
                  Adquirir
                </LoadingButton>
              </Cards>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
