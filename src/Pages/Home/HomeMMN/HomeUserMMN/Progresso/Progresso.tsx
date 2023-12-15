import { Alert, AlertTitle, Avatar, Box, Button, Grid, Modal, Typography } from '@mui/material';
import { GiLaurelsTrophy } from 'react-icons/gi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  IReqPostPlayFilaPremios,
  IReqPostPlayQuantidadePontosUsuario,
  IReqPostPlaySolicitacaoSaquePremios,
  IReqPostPlayVisualizaListaPremios,
  IResPostPlayFilaPremios,
  IResPostPlayQuantidadePontosUsuario,
  IResPostPlayVisualizaPremios,
  postPlayFilaPremios,
  postPlayQuantidadePontosUsuario,
  postPlaySolicitacaoPremios,
  postPlayVisualizaListaPremios,
} from '../../../../../api';
import {
  IReqPostPlayAcumularPremio,
  postPlayAcumularPremios,
} from '../../../../../api/ApisRetiradaDePremio/AcumularPremio';
import dinheiro from '../../../../../assets/MMNImg/din.png';
import { Cards, Loading, ProgressBar } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';
import { currencyMask, errorToast } from '../../../../../utils';

export function Progresso() {
  //@ts-ignore
  const [telaEmDesenvilvimento, setTelaEmDesenvilvimento] = useState(true);
  const [loadingView, setLoadingView] = useState(false);
  const [loadSubmitResgate, setLoadSubmitResgate] = useState(false);
  const [loadSubmitAcumular, setLoadSubmitAcumular] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayVisualizaPremios[]>([]);
  const [responsePremioSaque, setResponsePremioSaque] = useState<IResPostPlayFilaPremios>();
  const [responseQuantidadePontosUsuario, setResponseQuantidadePontosUsuario] =
    useState<IResPostPlayQuantidadePontosUsuario>();
  const { user } = useUser();

  //Modal Resgatar
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    borderRadius: '10px',
    boxShadow: '24',
    backgroundColor: 'var(--backGround-sideBar-color)',
    color: 'var(--text-color)',
    padding: '4rem',
    textAlign: 'center',
    border: 'none',
  };
  //Modal Acumular
  const [openAcumular, setOpenAcumular] = useState(false);
  const handleOpenAcumular = () => setOpenAcumular(true);
  const handleCloseAcumular = () => setOpenAcumular(false);
  const styleAcumular = {
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    borderRadius: '10px',
    boxShadow: '24',
    backgroundColor: 'var(--backGround-sideBar-color)',
    color: 'var(--text-color)',
    padding: '4rem',
    textAlign: 'center',
    border: 'none',
  };
  ////////

  async function handleView() {
    setLoadingView(true);

    const payload: IReqPostPlayVisualizaListaPremios = {
      token: user?.token || '',
    };

    try {
      const data = await postPlayVisualizaListaPremios(payload);
      setResponseView(data);
    } catch (error: any) {
      errorToast(error);
    }
    const payloadPremiosSaque: IReqPostPlayFilaPremios = {
      token: user?.token || '',
      cpf: user?.cpf || '',
    };
    try {
      const dataPremioSaque = await postPlayFilaPremios(payloadPremiosSaque);
      setResponsePremioSaque(dataPremioSaque);
    } catch (error: any) {
      errorToast(error);
    }
    const payloadQuantidadePontosUsuario: IReqPostPlayQuantidadePontosUsuario = {
      cpf: user?.cpf || '',
    };
    try {
      const dataQuantidadePontosUsuario = await postPlayQuantidadePontosUsuario(
        payloadQuantidadePontosUsuario
      );
      setResponseQuantidadePontosUsuario(dataQuantidadePontosUsuario);
    } catch (error: any) {
    } finally {
      setLoadingView(false);
    }
  }

  async function handleSubmitResgatePremios(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadSubmitResgate(true);

    const payloadSubmitResgate: IReqPostPlaySolicitacaoSaquePremios = {
      cpf: user?.cpf || '',
      id_premio: responsePremioSaque?.ID || 0,
    };
    try {
      await postPlaySolicitacaoPremios(payloadSubmitResgate);
      toast.success('Resgate de premio solicitado');
      handleView();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadSubmitResgate(false);
    }
  }

  async function handleSubmitAcumularPremios(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadSubmitResgate(true);

    try {
      const payloadSubmitAcumular: IReqPostPlayAcumularPremio = {
        cpf: user?.cpf || '',
        id_premio: responsePremioSaque?.ID || '',
      };
      await postPlayAcumularPremios(payloadSubmitAcumular);
      toast.success('Você acumulou, agora poderá resgatar o próximo');
      handleView();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadSubmitAcumular(false);
    }
  }

  const [progressPercentage, setProgressPercentage] = useState(0);

  // ...

  useEffect(() => {
    if (responseQuantidadePontosUsuario && responsePremioSaque) {
      const pontosDisponiveis = responseQuantidadePontosUsuario.saldo_pontos_disponivel || 0;
      const pontosMeta = responsePremioSaque.Pontos_resgate || 0;

      // Calcule a porcentagem
      let percentage = (pontosDisponiveis / pontosMeta) * 100;

      // Garanta que a porcentagem não ultrapasse 100%
      percentage = Math.min(percentage, 100);

      // Atualize o estado
      setProgressPercentage(percentage);
    }
  }, [responseQuantidadePontosUsuario, responsePremioSaque]);

  useEffect(() => {
    handleView();
  }, []);

  return (
    <>
      {telaEmDesenvilvimento ? (
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Cards
              title={'Graduação'}
              subTitle={'Realize vendas para subir para a proxima graduação'}
              size={'100%'}
            >
              <Typography sx={{ mb: 2 }}>
                Meta para proxima graduação : 400 | 1000 Pontos
              </Typography>
              <Box width={'100%'}>
                <ProgressBar progress={40} />
              </Box>
            </Cards>

            {/* Ganhe Premios */}
            <Cards
              title={'Ganhe Premios'}
              subTitle={'Conquiste a meta para ganhar este premio'}
              size={'100%'}
            >
              {loadingView ? (
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '30vh',
                  }}
                >
                  <Loading />
                </Box>
              ) : (
                <>
                  <Typography sx={{ mb: 2 }}>
                    Meta para o premio :{' '}
                    {responseQuantidadePontosUsuario
                      ? responseQuantidadePontosUsuario?.saldo_pontos_disponivel
                      : 'Sem Premios'}{' '}
                    |{' '}
                    {responsePremioSaque?.Pontos_resgate
                      ? responsePremioSaque?.Pontos_resgate
                      : 'Sem Meta'}{' '}
                    pontos
                  </Typography>

                  <Box>
                    <img
                      src={`data:image/jpeg;base64,${responsePremioSaque?.foto}`}
                      style={{ width: '300px', borderRadius: '16px' }}
                    />
                    <Typography sx={{ color: 'var(--primary-color)' }}>
                      {responsePremioSaque?.Descricao}
                    </Typography>
                  </Box>
                  <Box width={'100%'}>
                    <ProgressBar progress={progressPercentage} />
                    {progressPercentage !== 100 ? (
                      <Typography sx={{ mb: 1 }} color='error'>
                        Para retirar os premios atinja 100%
                      </Typography>
                    ) : (
                      <Typography sx={{ mb: 1 }} color='darkgreen'>
                        Parabéns! Você já pode retirar seu prêmio ou acumular seus pontos para o
                        próximo prêmio
                      </Typography>
                    )}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      width: '100%',
                    }}
                  >
                    <Button
                      onClick={() => handleOpenAcumular()}
                      variant='contained'
                      color='warning'
                      disabled={progressPercentage !== 100}
                    >
                      Acumular
                    </Button>
                    <LoadingButton
                      onClick={() => handleOpen()}
                      variant='contained'
                      loading={loadSubmitResgate}
                      disabled={progressPercentage !== 100}
                    >
                      Resgatar
                    </LoadingButton>
                  </Box>
                </>
              )}
            </Cards>

            {/* /////////// */}
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
                  boxShadow: ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
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
          <Grid item xs={12}>
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
                <Typography
                  sx={{
                    m: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  variant='h4'
                >
                  Premios
                </Typography>
                <Box>
                  <Swiper
                    spaceBetween={2}
                    slidesPerView={2.3}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    navigation
                  >
                    {responseView.map((item, index) => (
                      <SwiperSlide key={index}>
                        <Cards title={item.nome_premio} subTitle={''} size={'90%'}>
                          {item.foto ? (
                            <img
                              src={`data:image/jpeg;base64,${item.foto}`}
                              style={{ width: '200px', borderRadius: '16px' }}
                            />
                          ) : (
                            <img src={dinheiro} style={{ width: '100px', borderRadius: '16px' }} />
                          )}
                          <Typography sx={{ color: 'var(--primary-color)' }}>
                            {item.descricao}
                          </Typography>
                          <Typography>Valor estimado:</Typography>
                          <Typography sx={{ color: 'var(--primary-color)' }} variant='h4'>
                            R$ {currencyMask(item.valor_premio)}
                          </Typography>
                          <Typography variant='h5' sx={{ mt: 2 }}>
                            Meta: {item.pontos_resgate} Pontos
                          </Typography>
                        </Cards>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </Box>
              </>
            )}
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={{ ...style, textAlign: 'center' }}>
              <Alert sx={{ mb: 2, textAlign: 'center' }} severity='warning'>
                <AlertTitle>Aviso</AlertTitle>
                Ao retirar o prêmio, os pontos do mesmo serão debitados de sua base de pontos.
                clique em confirmar para prosseguir com a solicitação de retirada de prêmios
              </Alert>

              <Button
                variant='contained'
                sx={{ mt: 2 }}
                onClick={(e: any) => {
                  handleSubmitResgatePremios(e);
                  handleClose();
                }}
              >
                Confirmar
              </Button>
            </Box>
          </Modal>
          <Modal
            open={openAcumular}
            onClose={handleCloseAcumular}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={{ ...styleAcumular, textAlign: 'center' }}>
              <Alert sx={{ mb: 2, textAlign: 'center' }} severity='warning'>
                <AlertTitle>Aviso</AlertTitle>
                Ao acumular o prêmio, os pontos do mesmo serão mantidos. E você não terá mais acesso
                à este prêmio clique em confirmar para prosseguir com o acumulo de pontos para o
                prêmios
              </Alert>
              <LoadingButton
                variant='contained'
                sx={{ mt: 2 }}
                onClick={(e: any) => {
                  handleSubmitAcumularPremios(e);
                  handleCloseAcumular();
                }}
                loading={loadSubmitAcumular}
              >
                Confirmar
              </LoadingButton>
            </Box>
          </Modal>
        </Grid>
      ) : (
        <Typography>Tela em desenvolvimento</Typography>
      )}
    </>
  );
}
