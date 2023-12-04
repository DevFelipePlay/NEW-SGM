import { Box, Button, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AppStoreBadge from '../../../assets/badge-appstore.svg';
import PlayStoreBadge from '../../../assets/badge-playstore.svg';
import { AppImage } from '../../../assets/svg/appImage1';
import useWindowSize from '../../../hooks/useWindowSize';

export default function AppScreen() {
  const { isMobile } = useWindowSize();
  const navigate = useNavigate();
  return (
    <Box
      height={isMobile ? '100vh' : '100vh'}
      display='flex'
      justifyContent='center'
      flexDirection={isMobile ? 'column' : 'row'}
      sx={{
        background: `${isMobile ? 'var(--backGround-default)' : '#fff'}`,
      }}
    >
      <Box
        flex={1}
        width='225px'
        display='flex'
        alignSelf='center'
        justifyContent='center'
        order={isMobile ? '2' : '1'}
        sx={{
          background: `${isMobile ? 'var(--backGround-default)' : '#fff'}`,
        }}
      >
        <AppImage />
      </Box>
      <Box
        flex={1}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
        color='#fff'
        sx={{ background: 'var(--backGround-default)' }}
        gap={1}
        order={isMobile ? '1' : '2'}
        textAlign='center'
        px={2}
      >
        <Typography mt={isMobile ? 2 : 0} variant='h4' fontWeight='700'>
          Acesse nossos aplicativos
        </Typography>

        <Box
          display='flex'
          gap={isMobile ? 1 : 3}
          mt={isMobile ? 0 : 4}
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <Link to={'https://play.google.com/store/apps/details?id=app.mobile.opuscell'}>
            <Box
              component='img'
              sx={{
                cursor: 'pointer',
                border: '1px solid transparent',
                borderRadius: '6px',
                '&:hover': {
                  borderColor: 'var(--primary-color)',
                },
                transition: '.2s',
              }}
              src={PlayStoreBadge}
              alt='Baixar na Play Store'
            />
          </Link>
          <Link to='https://apps.apple.com/us/app/opuscell/id6470322147'>
            <Box
              component='img'
              sx={{
                cursor: 'pointer',
                border: '1px solid transparent',
                borderRadius: '6px',
                '&:hover': {
                  borderColor: 'var(--primary-color)',
                },
                transition: '.2s',
              }}
              src={AppStoreBadge}
              alt='Baixar na App Store'
            />
          </Link>
        </Box>
        <Typography variant='h6' mt={2} mb={1}>
          Ou vá para nosso sistema
        </Typography>
        {!isMobile && (
          <Button
            sx={{ color: 'var(--white)', fontWeight: '700', p: 1.25 }}
            variant='contained'
            onClick={() => navigate('/login')}
          >
            Ir para o sistema
          </Button>
        )}
      </Box>
    </Box>
  );
}
