import { Avatar, Box, Grid, Skeleton, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  IReqPostPlayDashboardUsuarioContinue,
  IResPostPlayDashboardUsuario,
  IResPostPlayDashboardUsuarioContinue,
  postPlayDashboardUsuario,
  postPlayDashboardUsuarioContinue,
} from '../../../api';
import { Cards, DefaultContainer, Loading } from '../../../components';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import useUser from '../../../hooks/useUser';
import { currencyMask, dadosFormatter, dateFormatter, errorToast } from '../../../utils';

export function DashboardRelatorioUsuario() {
  const [responseIdIndicacao, setresponseIdIndicacao] = useState<IResPostPlayDashboardUsuario>();
  const [responseViewContinue, setResponseViewContinue] =
    useState<IResPostPlayDashboardUsuarioContinue>();
  const [loading, setLoading] = useState(false);
  const [loadingDados, setLoadingDados] = useState(false);
  const { cpf } = useParams();
  //@ts-ignore
  const [value, copy] = useCopyToClipboard();
  const { user } = useUser();

  async function handleSubmit() {
    setLoading(true);
    let payload = {
      cpf: cpf ? cpf : '',
      token: user?.token ? user?.token : '',
    };
    try {
      const data = await postPlayDashboardUsuario(payload);
      setresponseIdIndicacao(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDados() {
    setLoadingDados(true);

    try {
      const payload: IReqPostPlayDashboardUsuarioContinue = {
        cpf: user?.cpf || '',
        token: user?.token || '',
      };
      const data = await postPlayDashboardUsuarioContinue(payload);
      setResponseViewContinue(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingDados(false);
    }
  }

  function copyToText() {
    copy(`https://indicacao.opuscell.com.br/#/${responseIdIndicacao?.id_indicacao}`);
    toast.success('Copiado para area de transferencia');
  }

  useEffect(() => {
    handleSubmit();
    handleDados();
  }, []);

  return (
    <DefaultContainer
      page={'Relatório do usuário MMN '}
      title={`Usuário ${responseIdIndicacao?.nome ? responseIdIndicacao?.nome : 'Parceiro'}`}
      subTitle={`Veja os dados pessoais de ${
        responseIdIndicacao?.nome ? responseIdIndicacao?.nome : 'Parceiro'
      }`}
      showSearch={false}
      showAvatar={true}
    >
      <>
        {loading ? (
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
          <Grid container spacing={2} width={'100%'}>
            <Grid item xs={15}>
              <Cards title={'Seu Link para indicação'} subTitle={''} size={'100%'}>
                <Tooltip title={'Copiar'}>
                  <Box
                    onClick={() => copyToText()}
                    sx={{
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                    }}
                  >
                    <Typography sx={{ marginRight: '2rem' }}>
                      {`https://indicacao.opuscell.com.br/#/${responseIdIndicacao?.id_indicacao}`}
                    </Typography>
                    <MdOutlineContentCopy />
                  </Box>
                </Tooltip>
              </Cards>
            </Grid>
            <Grid item xs={3}>
              <Cards
                title={'Bonus a receber'}
                subTitle={'Total de Bonus a ser recebido'}
                size={'100%'}
              >
                <Typography variant='h5'>
                  {responseIdIndicacao?.bonus_receber
                    ? 'R$' + ' ' + currencyMask(responseIdIndicacao?.bonus_receber)
                    : 'Sem Saldo'}
                </Typography>
              </Cards>
            </Grid>
            <Grid item xs={3}>
              <Cards
                title={'Total de niveis'}
                subTitle={'Total de niveis de usuarios ativos'}
                size={'100%'}
              >
                <Typography variant='h5'>
                  {responseIdIndicacao?.total_niveis
                    ? responseIdIndicacao?.total_niveis
                    : 'Sem acesso ao multinivel'}
                </Typography>
              </Cards>
            </Grid>
            <Grid item xs={3}>
              <Cards
                title={'Total de bonus recebidos'}
                subTitle={'Total de Bonus recebidos'}
                size={'100%'}
              >
                <Typography variant='h5'>
                  {responseIdIndicacao?.bonus_recebidos
                    ? 'R$' + ' ' + currencyMask(responseIdIndicacao?.bonus_recebidos)
                    : 'Sem Saldo'}
                </Typography>
              </Cards>
            </Grid>
            <Grid item xs={3}>
              <Cards
                title={'Usuários ativos'}
                subTitle={'Total de usuários ativos na sua rede'}
                size={'100%'}
              >
                <Typography variant='h5'>
                  {responseIdIndicacao?.usuarios_ativos
                    ? responseIdIndicacao?.usuarios_ativos
                    : 'Sem usuários ativos'}
                </Typography>
              </Cards>
            </Grid>

            <Grid item xs={15}>
              <Cards title={'Dados Pessoais'} subTitle={''} size={'100%'}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar sx={{ width: '100px', height: '100px', mb: 2 }}></Avatar>
                  <Typography variant='h5'>{responseIdIndicacao?.nome}</Typography>
                  <div
                    style={{ width: '90%', height: '1px', backgroundColor: 'var(--primary-color)' }}
                  />
                  <Grid container spacing={2} sx={{ display: 'flex', flexDirection: 'row', mt: 1 }}>
                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography>Indicado por:</Typography>
                      <Typography>Status:</Typography>
                      <Typography>Plano Ativo:</Typography>
                      <Typography>Saldo de dados:</Typography>

                      <Typography>Expira em:</Typography>
                      <Typography>Graduação:</Typography>
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <Typography>{responseIdIndicacao?.indicado_por}</Typography>
                      {loadingDados ? (
                        <Skeleton variant='text' sx={{ fontSize: '1rem', width: '250px' }} />
                      ) : (
                        <Typography>
                          {responseViewContinue?.status ? responseViewContinue?.status : 'Inativo'}
                        </Typography>
                      )}
                      <Typography>
                        {responseIdIndicacao?.plano
                          ? responseIdIndicacao?.plano
                          : 'Sem Plano Ativo'}
                      </Typography>
                      {loadingDados ? (
                        <Skeleton variant='text' sx={{ fontSize: '1rem', width: '250px' }} />
                      ) : (
                        <Typography>
                          {dadosFormatter(
                            responseViewContinue?.saldo_dados
                              ? responseViewContinue?.saldo_dados
                              : 'Sem saldo'
                          )}
                        </Typography>
                      )}

                      {loadingDados ? (
                        <Skeleton variant='text' sx={{ fontSize: '1rem', width: '250px' }} />
                      ) : (
                        <Typography>
                          {dateFormatter(
                            responseViewContinue?.expira_em
                              ? responseViewContinue?.expira_em
                              : 'Indefinido'
                          )}
                        </Typography>
                      )}

                      <Typography>
                        {responseIdIndicacao?.graduacao
                          ? responseIdIndicacao?.graduacao
                          : 'Sem Graduação'}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Cards>
            </Grid>
          </Grid>
        )}
      </>
    </DefaultContainer>
  );
}
