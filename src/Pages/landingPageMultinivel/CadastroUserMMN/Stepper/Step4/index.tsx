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
      <Typography variant='h4'>Packs</Typography>
      <Typography variant='h6'>Selecione o melhor pack para você</Typography>

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
              title={'Pack 1'}
              subTitle={'Escolha o seu Pack'}
              size={smDown ? '100vm' : mdDown ? '200px' : lgDown ? '200px' : '350px'}
              showIcon
              bgColorIcon='var(--primary_color)'
              icon={<PiHandCoins />}
            >
              <Typography>Quantidade de chips</Typography>
              <Typography>Valor de venda</Typography>
              <Typography>Nome</Typography>
              <Typography>Quantidade de pontos</Typography>
              <Button onClick={() => handleButtonClick()}>Contratar</Button>
            </Cards>
          </SwiperSlide>
          <SwiperSlide>
            <Cards
              title={'Pack 2'}
              subTitle={'Escolha o seu Pack'}
              size={smDown ? '100vm' : mdDown ? '200px' : lgDown ? '200px' : '350px'}
              showIcon
              bgColorIcon='var(--primary_color)'
              icon={<PiHandCoins />}
            >
              <Typography>Quantidade de chips</Typography>
              <Typography>Valor de venda</Typography>
              <Typography>Nome</Typography>
              <Typography>Quantidade de pontos</Typography>
              <Button onClick={() => handleButtonClick()}>Contratar</Button>
            </Cards>
          </SwiperSlide>
          <SwiperSlide>
            <Cards
              title={'Pack 3'}
              subTitle={'Escolha o seu Pack'}
              size={smDown ? '100vm' : mdDown ? '200px' : lgDown ? '200px' : '350px'}
              showIcon
              bgColorIcon='var(--primary_color)'
              icon={<PiHandCoins />}
            >
              <Typography>Quantidade de chips</Typography>
              <Typography>Valor de venda</Typography>
              <Typography>Nome</Typography>
              <Typography>Quantidade de pontos</Typography>
              <Button onClick={() => handleButtonClick()}>Contratar</Button>
            </Cards>
          </SwiperSlide>

          <SwiperNavButtons />
        </Swiper>
      </Box>
    </>
  );
}
