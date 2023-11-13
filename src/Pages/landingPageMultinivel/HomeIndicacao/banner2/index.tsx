import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import Icon1 from '../../../../assets/LadingPageIcons/iconTutorial1.svg';
import Icon2 from '../../../../assets/LadingPageIcons/iconTutorial2.svg';
import Icon3 from '../../../../assets/LadingPageIcons/iconTutorial3.svg';
import Icon4 from '../../../../assets/LadingPageIcons/iconTutorial4.svg';
import Icon5 from '../../../../assets/LadingPageIcons/iconTutorial5.svg';
import styles from '../../style.module.css';

import { Navigation, Pagination } from 'swiper/modules';
import { SwiperNavButtons } from '../../../../components';

export default function Banner2() {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Box
      sx={{
        textAlign: 'center',
        boxSizing: 'border-box',
        p: {
          xs: 2,
          sm: 3,
          md: 4,
        },
      }}
    >
      <Typography variant='h4' sx={{ color: 'var(--primary-color)', fontWeight: '700' }}>
        Venha ver como é simples
      </Typography>

      <Swiper
        slidesPerView={!xlDown ? 4 : !mdDown ? 3 : !smDown ? 2 : 1}
        pagination={true}
        modules={[Pagination, Navigation]}
        className='swiper_container'
      >
        <SwiperSlide
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Cards
            icon={Icon1}
            title={`Cadastra-se em poucos minutos`}
            subtitle={
              'Junte-se à nossa comunidade de forma rápida e simples. Cadastre-se em apenas alguns minutos e desfrute de todos os benefícios que temos a oferecer. Não perca mais tempo, comece agora.'
            }
            numeracao={'1'}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Cards
            icon={Icon2}
            title={`Adquira um pacote de chip`}
            subtitle={
              'Conecte-se ao futuro com nossos pacotes de chip de alta qualidade. Escolha o seu hoje e experimente a diferença em velocidade, confiabilidade e cobertura.'
            }
            numeracao={'2'}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Cards
            icon={Icon3}
            title={`Módulo Multinível`}
            subtitle={
              'Esta é a base de um sistema inovador que oferece amplas possibilidades de crescimento e renda. Junte-se a nós e descubra um novo caminho para o sucesso!'
            }
            numeracao={'3'}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Cards
            icon={Icon4}
            title={`Aumente sua rede`}
            subtitle={
              'Abra novas portas, expanda suas conexões e alcance horizontes inexplorados. Descubra um vasto leque de oportunidades para crescimento, realização e prosperidade em sua jornada.'
            }
            numeracao={'4'}
          />
        </SwiperSlide>
        <SwiperSlide
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Cards
            icon={Icon5}
            title={`Ganhe prêmios`}
            subtitle={
              'Desfrute dos frutos do seu sucesso à medida que você avança em direção ao topo, conquistando prêmios incríveis ao longo do seu caminho de realizações.'
            }
            numeracao={'5'}
          />
        </SwiperSlide>
        <SwiperNavButtons />
      </Swiper>
    </Box>
  );
}

interface Icards {
  numeracao: string;
  icon: string;
  title: string;
  subtitle: string;
}

function Cards({ numeracao, icon, title, subtitle }: Icards) {
  return (
    <Box
      className={styles['card']}
      sx={{
        maxWidth: '360px',
        height: {
          xs: '325px',
          sm: '300px',
          md: '400px',
          lg: '325px',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        gap: {
          xs: '12px',
          sm: '12px',
          md: '20px',
        },
        textAlign: 'center',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
        padding: {
          xs: '12px',
          sm: '12px',
          md: '20px',
        },
        position: 'relative',
        transition: 'all .3s',
        margin: '3rem 1.5rem',
      }}
    >
      <Typography
        sx={{
          width: {
            xs: '32px',
            sm: '48px',
          },
          height: {
            xs: '32px',
            sm: '48px',
          },
          fontSize: {
            xs: '1.5rem',
            sm: '2rem',
          },
          top: {
            xs: '-1rem',
            sm: '-1.25rem',
          },
          left: {
            xs: '-1rem',
            sm: '-1.5rem',
          },
        }}
        style={{
          position: 'absolute',

          backgroundColor: 'var(--primary-color)',
          display: 'grid',
          placeContent: 'center',
          borderRadius: '50px',
          fontWeight: '700',
          color: 'var(--text-color)',
        }}
      >
        {numeracao}
      </Typography>
      <img src={icon} alt='' style={{ width: '80px' }} />
      <Typography
        variant='h5'
        sx={{
          fontSize: {
            xs: '1.5rem',
            sm: '1.5rem',
            md: '1.75rem',
          },
          color: 'var(--primary-color)',
          margin: '0',
          lineHeight: '1.1',
          fontWeight: '700',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          margin: '0',
          fontSize: {
            xs: '0.875rem',
            sm: '0.9rem',
            md: '0.9rem',
            lg: '1rem',
          },
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
