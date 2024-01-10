import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, ListItemText, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  IReqPostPlayConfirmacaoSolicitacaoVendaChipLicenciamento,
  IReqPostPlayListaSolicitacaoSaquePremio,
  IResPostPlayListaSolicitacaoVendaChip,
  postPlayConfirmacaoSolicitacaoVendaChipLicenciamento,
  postPlaySolicitacaoVendaChip,
} from '../../../../../api';
import { Cards, Loading } from '../../../../../components';
import { useForm } from '../../../../../hooks';
import { useCopyToClipboard } from '../../../../../hooks/useCopyToClipboard';
import useUser from '../../../../../hooks/useUser';
import { currencyFormatter, dateFormatter, errorToast } from '../../../../../utils';

export function ListaPostagemPacotes() {
  const [loadingView, setLoadingView] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayListaSolicitacaoVendaChip[]>([]);
  //@ts-ignore
  const [value, copy] = useCopyToClipboard();
  const { user } = useUser();

  //@ts-ignore
  function copyToText(index: any, endereco: any) {
    copy(`${endereco}`);
    toast.success('Copiado para area de transferência');
  }

  const { formData, changeForm } = useForm({
    codigo_ratreio: {} as Record<number, string>,
  });
  async function handleViewListaDeSolicitacoes() {
    setLoadingView(true);

    try {
      const payload: IReqPostPlayListaSolicitacaoSaquePremio = {
        token: user?.token || '',
      };

      const data = await postPlaySolicitacaoVendaChip(payload);
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
      const payload: IReqPostPlayConfirmacaoSolicitacaoVendaChipLicenciamento = {
        id: responseView[index].id_solicitacao,
        status_pagamento: 1,
        token: user?.token || '',
        codigo_rastreio: formData.codigo_ratreio[index] || '',
      };

      await postPlayConfirmacaoSolicitacaoVendaChipLicenciamento(payload);
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
              {responseView.map((item, index: any) => (
                <Box sx={{ flexGrow: 1, width: '100%' }} key={index}>
                  <Grid item xs={12} md={6}>
                    <Cards
                      title={`Solicitação de Envio de Pacote ${item.tipo_fatura || ''} `}
                      subTitle={''}
                      size={'100%'}
                    >
                      <ListItemText sx={{ userSelect: 'none' }}>
                        ID: {item.id_solicitacao}
                      </ListItemText>
                      <ListItemText sx={{ userSelect: 'none' }}>
                        Pacote: {item.nome_pacote}
                      </ListItemText>
                      <ListItemText sx={{ userSelect: 'none' }}>
                        Solicitante: {item.name}
                      </ListItemText>

                      <ListItemText sx={{ userSelect: 'none' }}>
                        Solicitado em: {dateFormatter(item.data_solicitacao)}
                      </ListItemText>
                      <ListItemText sx={{ userSelect: 'none' }}>Endereço para envio:</ListItemText>
                      <Box
                        sx={{
                          backgroundColor: 'var(--primary-color)',
                          color: 'white',
                          p: 2,
                          borderRadius: '10px',
                          '&:hover': { bgcolor: 'grey', color: 'white' },
                          cursor: 'pointer',
                          transition: 'all 0.3s',
                        }}
                        onClick={() => copyToText(index, item.endereco)}
                      >
                        <ListItemText sx={{ userSelect: 'none' }}>{item.endereco} </ListItemText>
                        <MdOutlineContentCopy />
                      </Box>
                      <Typography variant='h4' sx={{ mt: 2 }}>
                        Valor do pacote{currencyFormatter(item.valor_fatura)}
                      </Typography>
                      <TextField
                        variant='standard'
                        label='Codigo de Rastreio'
                        helperText='Poste o codigo de rastreio aqui'
                        value={formData.codigo_ratreio[index] || ''}
                        onChange={(e) => {
                          // Atualiza o valor para o item específico
                          const novosValores = {
                            ...formData.codigo_ratreio,
                            [index]: e.target.value,
                          };
                          changeForm('codigo_ratreio', novosValores);
                        }}
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
                          disabled={formData.codigo_ratreio[index]?.length < 8}
                          onClick={(e: any) => handleConfirmacaoSolicitacaoSaque(e, index)}
                        >
                          Confirme a postagem do pacote
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
