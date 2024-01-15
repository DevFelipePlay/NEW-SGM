import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, ListItemText, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  IReqPostPLayConfirmacaoSolicitacaoSaquePremio,
  IReqPostPlayListaSolicitacaoSaquePremio,
  IResPostPlayListaSolicitacaoSaquePremio,
  postPLayConfirmacaoSolicitacaoSaquePremio,
  postPlayListaSolicitacaoSaquePremio,
} from '../../../../api';
import foto from '../../../../assets/MMNImg/din.png';
import { Cards, Loading } from '../../../../components';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';
import { dateFormatter, errorToast } from '../../../../utils';

export function ListaPostagem() {
  const [loadingView, setLoadingView] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayListaSolicitacaoSaquePremio[]>([]);
  const { user } = useUser();

  const { formData, changeForm } = useForm({
    codigo_ratreio: '',
  });
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
  async function handleConfirmacaoSolicitacaoSaque(
    e: React.FormEvent<HTMLFormElement>,
    index: any
  ) {
    e.preventDefault();
    setLoadingSubmit(true);

    try {
      const payload: IReqPostPLayConfirmacaoSolicitacaoSaquePremio = {
        id: responseView[index].ID_Solicitacao,
        status_pagamento: 1,
        token: user?.token || '',
        codigo_rastreio: formData.codigo_ratreio || '',
      };

      await postPLayConfirmacaoSolicitacaoSaquePremio(payload);
      toast.success('Solicitação Respondida com sucesso');
      handleViewListaDeSolicitacoes();
      window.location.reload();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingSubmit(false);
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
                    <Cards title={'Solicitação de Premios'} subTitle={''} size={'100%'}>
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
                      {item.foto ? (
                        <img
                          src={`data:image/png;base64,${item.foto}`}
                          style={{
                            width: '200px ',
                            marginTop: '2rem ',
                            borderRadius: '10px',
                            boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                          }}
                        />
                      ) : (
                        <img
                          src={foto}
                          style={{
                            width: '100px ',
                            marginTop: '2rem ',
                            borderRadius: '10px',
                          }}
                        />
                      )}
                      <TextField
                        variant='standard'
                        label='Codigo de Rastreio'
                        helperText='Poste o codigo de rastreio aqui'
                        value={formData.codigo_ratreio}
                        onChange={(e) => changeForm('codigo_ratreio', e.target.value)}
                        fullWidth
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
                        <LoadingButton
                          variant='contained'
                          sx={{ my: 2 }}
                          loading={loadingSubmit}
                          disabled={formData.codigo_ratreio.length < 8}
                          onClick={(e: any) => handleConfirmacaoSolicitacaoSaque(e, index)}
                        >
                          Confirme a postagem do premio
                        </LoadingButton>
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
