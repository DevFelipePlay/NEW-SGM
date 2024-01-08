import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, Button, Grid, Modal, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import {
  IResPostPlayVisualizaPacotesVendaChip,
  postPlayVisualizaPacotesVendaChip,
} from '../../../../../api';
import {
  IReqPostPlayGeraFaturaVendaChip,
  IResPostPlayGeraFaturaVendaChip,
  postPlayGeraFaturaVendaChip,
} from '../../../../../api/ApisPrimeiroAcessoUsuario/GerafaturaVendaChip';
import { Cards, Loading } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';
import { errorToast } from '../../../../../utils';

export function AdquiraSeusChips() {
  const [loadingView, setLoadingView] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayVisualizaPacotesVendaChip[]>([]);
  const [responseBuy, setResponseBuy] = useState<IResPostPlayGeraFaturaVendaChip>();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const { user } = useUser();

  //breakpoints
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  ///

  const style = {
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${smDown ? '300px' : '70%'}`,
    borderRadius: '10px',
    boxShadow: '24',
    backgroundColor: 'var(--backGround-sideBar-color)',
    color: 'var(--text-color)',
    padding: `${smDown ? '1rem' : '4rem'}`,
    textAlign: 'center',
    border: 'none',
  };

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

  async function handleBuyPacks(packageId: number) {
    setLoadingBuy(true);

    const payload: IReqPostPlayGeraFaturaVendaChip = {
      cpf: user?.cpf || '',
      token: user?.token || '',
      id: packageId,
    };

    try {
      const data = await postPlayGeraFaturaVendaChip(payload);
      setResponseBuy(data);
      toast.success('Solicitação de compra realizada');
      handleOpen();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingBuy(false);
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
            <Grid
              display={'flex'}
              flexWrap={'wrap'}
              justifyContent='center'
              item
              xs={12}
              key={index}
            >
              <Cards title={`${item.nome}`} subTitle={'Adquira'} size={smDown ? '200px' : '350px'}>
                <Typography variant='h4' sx={{ mb: 2 }}>
                  {item.chips} Chips
                </Typography>
                <Typography variant='subtitle2'>Por Apenas:</Typography>

                <Typography variant='h5' color={'var(--primary-color)'}>
                  R$ {item.valor_venda}
                </Typography>
                <LoadingButton
                  variant='contained'
                  sx={{ mt: 2 }}
                  onClick={() => handleBuyPacks(item.id)}
                  loading={loadingBuy}
                >
                  Adquirir
                </LoadingButton>
              </Cards>
            </Grid>
          ))}
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={{ ...style, textAlign: 'center' }}>
          <Typography
            id='modal-modal-title'
            variant='h6'
            component='h2'
            sx={{ mb: 2, wordBreak: 'break-all' }}
          >
            Sua solicitação de compra foi realizada, clique no link e pague sua fatura ou visualize
            a fatura pelo seu aplicativo ou na aba de faturas do seu módulo:
          </Typography>
          <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: '10px' }}>
            <a
              id='modal-modal-description'
              href={`https://faturammn.operadora.app.br/?payid=${responseBuy?.payid}`}
              target='_blank'
            >
              <Typography>
                https://faturammn.operadora.app.br/?payid={responseBuy?.payid}
              </Typography>
            </a>
          </Box>
          <Button variant='contained' sx={{ mt: 2 }} onClick={() => handleClose()}>
            voltar para home
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
}
