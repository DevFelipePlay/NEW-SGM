import { Avatar, Box, Grid, Tooltip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MdOutlineContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Cards, Loading } from '../../../../../components';
import { useCopyToClipboard } from '../../../../../hooks/useCopyToClipboard';

import { IResPostPlayDashboardUsuario, postPlayDashboardUsuario } from '../../../../../api';
import useUser from '../../../../../hooks/useUser';
import { dadosFormatter, dateFormatter, errorToast } from '../../../../../utils';

export function Inicio() {
  const [responseIdIndicacao, setresponseIdIndicacao] = useState<IResPostPlayDashboardUsuario>();
  const [loading, setLoading] = useState(false);
  // @ts-ignore
  const [value, copy] = useCopyToClipboard();
  const { user } = useUser();

  async function handleSubmit() {
    setLoading(true);
    let payload = {
      cpf: user?.cpf ? user?.cpf : '',
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
    copy(
      `https://multinivel.operadora.app.br/#/landingpage-indicacao/${responseIdIndicacao?.id_indicacao}`
    );
    toast.success('Copiado para area de transferencia');
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
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
                    {`https://multinivel.operadora.app.br/#/landingpage-indicacao/${responseIdIndicacao?.id_indicacao}`}
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
          <Grid item xs={5.5}>
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
                      {responseIdIndicacao?.plano ? responseIdIndicacao?.plano : 'Sem Plano Ativo'}
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
  );
}
