import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PiHandCoins } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Cards, SwiperNavButtons } from '../../../../../components';

export default function Step3() {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'));

  function handleButtonClick(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <Typography variant='h4'>Planos</Typography>
      <Typography variant='h6'>Selecione o melhor plano para você</Typography>

      <Box width={'100%'}>
        <Swiper
          spaceBetween={5}
          slidesPerView={!xlDown ? 4 : !mdDown ? 3 : !smDown ? 2 : 1}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
          pagination={true}
          modules={[Navigation, Pagination]}
        >
          <SwiperSlide>
            <Cards
              title={'Planos'}
              subTitle={'Escolha os planos que serão usados no multinível'}
              size={smDown ? '100vm' : mdDown ? '200px' : lgDown ? '200px' : '350px'}
              showIcon
              bgColorIcon='var(--primary_color)'
              icon={<PiHandCoins />}
            >
              <Typography>Neste plano você terá</Typography>
              <Typography>6 GB</Typography>
              <Typography>600 Minutos</Typography>
              <Typography>WhatsApp ilimitado</Typography>
              <Typography>SMS ilimitado</Typography>
              <Button onClick={() => handleButtonClick()}>Contratar</Button>
            </Cards>
          </SwiperSlide>
          <SwiperSlide>
            <Cards
              title={'Planos'}
              subTitle={'Escolha os planos que serão usados no multinível'}
              size={smDown ? '100vm' : mdDown ? '200px' : lgDown ? '200px' : '350px'}
              showIcon
              bgColorIcon='var(--primary_color)'
              icon={<PiHandCoins />}
            >
              <Typography>Neste plano você terá</Typography>
              <Typography>6 GB</Typography>
              <Typography>600 Minutos</Typography>
              <Typography>WhatsApp ilimitado</Typography>
              <Typography>SMS ilimitado</Typography>
              <Button onClick={() => handleButtonClick()}>Contratar</Button>
            </Cards>
          </SwiperSlide>
          <SwiperSlide>
            <Cards
              title={'Planos'}
              subTitle={'Escolha os planos que serão usados no multinível'}
              size={smDown ? '100vm' : mdDown ? '200px' : lgDown ? '200px' : '350px'}
              showIcon
              bgColorIcon='var(--primary_color)'
              icon={<PiHandCoins />}
            >
              <Typography>Neste plano você terá</Typography>
              <Typography>6 GB</Typography>
              <Typography>600 Minutos</Typography>
              <Typography>WhatsApp ilimitado</Typography>
              <Typography>SMS ilimitado</Typography>
              <Button onClick={() => handleButtonClick()}>Contratar</Button>
            </Cards>
          </SwiperSlide>

          <SwiperNavButtons />
        </Swiper>
      </Box>
    </>
  );
}
