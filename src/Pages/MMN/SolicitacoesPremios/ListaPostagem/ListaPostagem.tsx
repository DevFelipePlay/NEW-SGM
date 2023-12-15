import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, ListItemText, TextField, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  IReqPostPlayListaSolicitacaoSaquePremio,
  IResPostPlayListaSolicitacaoSaquePremio,
  postPlayListaSolicitacaoSaquePremio,
} from '../../../../api';
import {
  IReqPostPlayConfirmacaoSolicitacaoSaque,
  postPlayConfirmacaoSolicitacaoSaque,
} from '../../../../api/ApisSaqueMMN/ConfirmacaoSolicitacaoSaque';
import { Cards, Loading } from '../../../../components';
import useUser from '../../../../hooks/useUser';
import { dateFormatter, errorToast } from '../../../../utils';

export function ListaPostagem() {
  const [loadingView, setLoadingView] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayListaSolicitacaoSaquePremio[]>([]);
  const { user } = useUser();

  async function handleViewListaDeSolicitacoes() {
    setLoadingView(true);

    try {
      const payload: IReqPostPlayListaSolicitacaoSaquePremio = {
        token: user?.token || '',
      };

      const data = await postPlayListaSolicitacaoSaquePremio(payload);
      setResponseView(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingView(false);
    }
  }
  async function handleConfirmacaoSolicitacaoSaqueTrue(index: number) {
    setLoadingView(true);

    try {
      const payload: IReqPostPlayConfirmacaoSolicitacaoSaque = {
        id: responseView[index].ID_Solicitacao,
        status_pagamento: 1,
        token: user?.token || '',
      };

      await postPlayConfirmacaoSolicitacaoSaque(payload);
      toast.success('Solicitação Respondida com sucesso');
      window.location.reload();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingView(false);
    }
  }
  async function handleConfirmacaoSolicitacaoSaqueFalse(
    e: React.FormEvent<HTMLFormElement>,
    index: number
  ) {
    e.preventDefault();
    setLoadingView(true);

    try {
      const payload: IReqPostPlayConfirmacaoSolicitacaoSaque = {
        id: responseView[index].ID_Solicitacao,
        status_pagamento: 0,
        token: user?.token || '',
      };

      await postPlayConfirmacaoSolicitacaoSaque(payload);
      toast.success('Solicitação Respondida com sucesso');
    } catch (error: any) {
      errorToast(error);
      window.location.reload();
    } finally {
      setLoadingView(false);
    }
  }

  useEffect(() => {
    handleViewListaDeSolicitacoes();
  }, []);

  return (
    <>
      {!loadingView && responseView.length === 0 ? (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '50vh',
          }}
        >
          <Typography>Não há solicitações pendentes</Typography>
        </Box>
      ) : (
        <>
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
                <Box sx={{ flexGrow: 1, width: '100%' }} key={index}>
                  <Grid item xs={12} md={6}>
                    <Cards title={'Solicitação de Saque'} subTitle={''} size={'100%'}>
                      <ListItemText sx={{ userSelect: 'none' }}>
                        ID: {item.ID_Solicitacao}
                      </ListItemText>
                      <ListItemText sx={{ userSelect: 'none' }}>
                        Solicitante: {item.Nome}
                      </ListItemText>

                      <ListItemText sx={{ userSelect: 'none' }}>
                        Solicitado em: {dateFormatter(item.Data_Solicitacao)}
                      </ListItemText>
                      <ListItemText sx={{ userSelect: 'none' }}>Endereço para envio:</ListItemText>
                      <ListItemText sx={{ userSelect: 'none' }}>{item.endereco}</ListItemText>
                      <TextField
                        variant='standard'
                        label='Codigo de rastreio'
                        helperText='Poste o codigo de rastreio aqui'
                        required
                      />
                      <Box
                        sx={{
                          width: '100%',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Tooltip title='Confirmar Pagamento'>
                          <LoadingButton variant='contained' sx={{ my: 2 }}>
                            Confirme a postagem do premio
                          </LoadingButton>
                        </Tooltip>
                      </Box>
                    </Cards>
                  </Grid>
                </Box>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
