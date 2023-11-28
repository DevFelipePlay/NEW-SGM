import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { GiLaurelsTrophy } from 'react-icons/gi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import carro from '../../../../../assets/MMNImg/carro.jpeg.webp';
import mansao from '../../../../../assets/MMNImg/mansao.webp';
import moto from '../../../../../assets/MMNImg/moto.jpg';
import { Cards, ProgressBar } from '../../../../../components';

export function Progresso() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={7}>
        <Cards
          title={'Graduação'}
          subTitle={'Realize vendas para subir para a proxima graduação'}
          size={'100%'}
        >
          <Typography sx={{ mb: 2 }}>Meta para proxima graduação : 400 | 1000 pontos</Typography>
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
            >
              Acumular
            </Button>
            <Button
              onClick={function (): void {
                throw new Error('Function not implemented.');
              }}
            >
              Resgatar
            </Button>
          </Box>
        </Cards>
      </Grid>
      <Grid item xs={5}>
        <Cards title={'Plano mais vendido'} subTitle={'Plano mais vendido este mes'} size={'100%'}>
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
          <div style={{ width: '30%', height: '1px', backgroundColor: 'var(--primary-color)' }} />
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
            <SwiperSlide>
              <Cards title={'Duccati'} subTitle={''} size={'90%'}>
                <img src={moto} style={{ width: '300px', borderRadius: '16px' }} />
                <Typography sx={{ color: 'var(--primary-color)' }}>
                  Moto Duccati, 1000 cilindradas, 0 KM
                </Typography>
                <Typography variant='h5' sx={{ mt: 2 }}>
                  Meta: 1.000 pontos
                </Typography>
              </Cards>
            </SwiperSlide>
            <SwiperSlide>
              <Cards title={'Carro'} subTitle={''} size={'90%'}>
                <img src={carro} style={{ width: '300px', borderRadius: '16px' }} />
                <Typography sx={{ color: 'var(--primary-color)' }}>
                  Carro de luxo, 2 portas, 960 cavalos, para pistas
                </Typography>
                <Typography variant='h5' sx={{ mt: 2 }}>
                  Meta: 5.000 pontos
                </Typography>
              </Cards>
            </SwiperSlide>
            <SwiperSlide>
              <Cards title={'Casa de luxo'} subTitle={''} size={'90%'}>
                <img src={mansao} style={{ width: '300px', borderRadius: '16px' }} />
                <Typography sx={{ color: 'var(--primary-color)' }}>
                  Mansão no Guarujá, 8 quartos, piscina, bem localizada, condominio fechado
                </Typography>
                <Typography variant='h5' sx={{ mt: 2 }}>
                  Meta: 100.000 pontos
                </Typography>
              </Cards>
            </SwiperSlide>
          </Swiper>
        </Box>
      </Grid>
    </Grid>
  );
}
