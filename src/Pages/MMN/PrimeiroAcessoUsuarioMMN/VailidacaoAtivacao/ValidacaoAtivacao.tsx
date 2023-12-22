import { Box, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppStoreBadge from '../../../../assets/badge-appstore.svg';
import PlayStoreBadge from '../../../../assets/badge-playstore.svg';
import SemLinhaAtivaImg from '../../../../assets/svg/SemLinhaAtivaImg';
import { AuthContext } from '../../../../components';
import useWindowSize from '../../../hooks/useWindowSize';

export default function SemLinhaAtiva() {
  const { isMobile } = useWindowSize();
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      signOut();
    }, 5000);
    return () => clearTimeout(timeoutId);
  }, []);

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
        mt={isMobile ? 2 : 0}
      >
        <SemLinhaAtivaImg />
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
        <Typography
          mt={isMobile ? 2 : 0}
          variant={isMobile ? 'h3' : 'h1'}
          fontWeight='700'
          color='var(--primary-color)'
        >
          Oops!
        </Typography>
        <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight='700'>
          Você não possui uma linha ativa
        </Typography>
        <Typography variant={isMobile ? 'subtitle1' : 'h6'} fontWeight='700'>
          Baixe nosso app
        </Typography>

        <Box
          display='flex'
          gap={isMobile ? 1 : 3}
          mt={isMobile ? 0 : 4}
          flexDirection={isMobile ? 'column' : 'row'}
        >
          <Link to='https://play.google.com/store/apps/details?id=app.mobile.opuscell'>
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
      </Box>
    </Box>
  );
}
