import { Avatar, Box, Grid, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { GiLaurelsTrophy } from 'react-icons/gi';
import { MdOutlineContentCopy } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IResPostPlayDashboardUsuario, postPlayDashboardUsuario } from '../../../api';
import { Cards, DefaultContainer, Loading } from '../../../components';
import { useCopyToClipboard } from '../../../hooks/useCopyToClipboard';
import useUser from '../../../hooks/useUser';
import { dadosFormatter, dateFormatter, errorToast } from '../../../utils';

export function DashboardRelatorioUsuario() {
  const [responseIdIndicacao, setresponseIdIndicacao] = useState<IResPostPlayDashboardUsuario>();
  const [loading, setLoading] = useState(false);
  const { cpf } = useParams();

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

  function copyToText() {
    copy(`localhost:5173/#/landingpage-indicacao/${responseIdIndicacao?.id_indicacao}`);
    toast.success('Copiado para area de transferencia');
  }

  useEffect(() => {
    handleSubmit();
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
                      {`localhost:5173/#/landingpage-indicacao/${responseIdIndicacao?.id_indicacao}`}
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
                    ? 'R$' + ' ' + responseIdIndicacao?.bonus_receber
                    : 'Sem Saldo'}
                </Typography>
              </Cards>
            </Grid>
            <Grid item xs={3}>
              <Cards
                title={'Total de niveis'}
                subTitle={'Total de niveis de usuarios ativos que voce pode receber '}
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
                    ? 'R$' + ' ' + responseIdIndicacao?.bonus_recebidos
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
            <Grid item xs={5}>
              <Cards
                title={'Plano mais vendido'}
                subTitle={'Plano mais vendido este mes'}
                size={'100%'}
              >
                <Avatar
                  sx={{
                    backgroundColor: '#FFCD4D',
                    width: '100px',
                    height: '100px',
                    boxShadow:
                      ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
                    mb: 4,
                  }}
                >
                  <GiLaurelsTrophy style={{ fontSize: '3rem' }} />
                </Avatar>
                <div
                  style={{ width: '30%', height: '1px', backgroundColor: 'var(--primary-color)' }}
                />
                <Typography variant='h5' sx={{ m: 2, color: 'var(--primary-color)' }}>
                  MAXX
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ fontSize: '1.2rem' }}>6 GB</Typography>
                  <Typography sx={{ fontSize: '1.2rem' }}>100 minutos para SMS</Typography>
                  <Typography sx={{ fontSize: '1.2rem' }}>Whats app gratis</Typography>
                  <Typography sx={{ fontSize: '1.2rem' }}>Dizzer</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Box sx={{ mr: 5 }}>
                    <Typography>Total de ativações</Typography>
                    <Typography variant='h5'>525</Typography>
                  </Box>
                  <Box>
                    <Typography>Total de recargas</Typography>
                    <Typography variant='h5'>1525</Typography>
                  </Box>
                </Box>
              </Cards>
            </Grid>
            <Grid item xs={7}>
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
                      <Typography>{responseIdIndicacao?.status}</Typography>
                      <Typography>
                        {responseIdIndicacao?.plano
                          ? responseIdIndicacao?.plano
                          : 'Sem Plano Ativo'}
                      </Typography>
                      <Typography>
                        {dadosFormatter(
                          responseIdIndicacao?.saldo_dados
                            ? responseIdIndicacao?.saldo_dados
                            : 'Sem saldo'
                        )}
                      </Typography>
                      <Typography>
                        {dateFormatter(
                          responseIdIndicacao?.expira_em
                            ? responseIdIndicacao?.expira_em
                            : 'Sem expiração'
                        )}
                      </Typography>
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
