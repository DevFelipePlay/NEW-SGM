import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { GiLaurelsTrophy } from 'react-icons/gi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useEffect, useState } from 'react';
import {
  IReqPostPlayVisualizaPremios,
  IResPostPlayVisualizaPremios,
  postPlayVisualizaListaPremios,
} from '../../../../../api';
import dinheiro from '../../../../../assets/MMNImg/din.png';
import moto from '../../../../../assets/MMNImg/moto.jpg';
import { Cards, Loading, ProgressBar } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';
import { currencyMask, errorToast } from '../../../../../utils';

export function Progresso() {
  //@ts-ignore
  const [telaEmDesenvilvimento, setTelaEmDesenvilvimento] = useState(true);
  const [loadingView, setLoadingView] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayVisualizaPremios[]>([]);
  const { user } = useUser();

  async function handleView() {
    setLoadingView(true);

    const payload: IReqPostPlayVisualizaPremios = {
      token: user?.token || '',
    };

    try {
      const data = await postPlayVisualizaListaPremios(payload);
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
                Meta para proxima graduação : 400 | 1000 pontos
              </Typography>
              <Box width={'100%'}>
                <ProgressBar progress={40} />
              </Box>
            </Cards>
            <Cards
              title={'Ganhe Premios'}
              subTitle={'Conquiste a meta para ganhar este premio'}
              size={'100%'}
            >
              <Typography sx={{ mb: 2 }}>Meta para o premio : 400 | 1000 pontos</Typography>

              <Box>
                <img src={moto} style={{ width: '300px', borderRadius: '16px' }} />
                <Typography sx={{ color: 'var(--primary-color)' }}>
                  Moto Duccati, 1000 cilindradas, 0 KM
                </Typography>
              </Box>
              <Box width={'100%'}>
                <ProgressBar progress={40} />
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
                  onClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  variant='contained'
                  color='warning'
                >
                  Acumular
                </Button>
                <Button
                  onClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  variant='contained'
                >
                  Resgatar
                </Button>
              </Box>
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
        </Grid>
      ) : (
        <Typography>Tela em desenvolvimento</Typography>
      )}
    </>
  );
}
