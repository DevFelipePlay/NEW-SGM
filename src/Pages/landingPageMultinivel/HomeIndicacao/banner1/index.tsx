import { Box, CircularProgress, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';

import {
  IReqPostPlayValidaCpfLadingpage,
  postPlayValidaCpfLandingPage,
} from '../../../../api/ApisPrimeiroAcessoParceiro/PlayLadingPage';
import { AboutImg } from '../../../../assets/svg';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';
import useWindowSize from '../../../../hooks/useWindowSize';
import { maskCpfCnpj } from '../../../../utils';
import styles from '../../style.module.css';

export default function Banner1() {
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { idIndicacao } = useParams();
  const { isMobile } = useWindowSize();

  //Endpoint para validar CPF
  const navigate = useNavigate();

  const { formData, changeForm } = useForm<IReqPostPlayValidaCpfLadingpage>({
    cpf: '',
  });

  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await postPlayValidaCpfLandingPage(formData);
      changeForm('cpf', formData.cpf);
      toast.success('Sucesso');
      if (user?.primeiroAcesso) {
        navigate(`/cadastro-usuario-mmn/${idIndicacao}`);
      } else if (isMobile) {
        navigate('/landingpage-indicacao/appousistem');
      } else {
        navigate('/login');
      }
    } catch (error: any) {
      toast.success('Inicie seu cadastro!');
      navigate(`/cadastro-usuario-mmn/${idIndicacao}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box
      sx={{
        backgroundColor: 'var(--backGround-default)',
        p: {
          md: 10,
          sm: 5,
          xs: 2,
        },
        py: {
          xs: 5,
        },
        display: 'flex',
        flexDirection: `${mdDown ? 'column' : 'row'}`,
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Stack
        sx={{
          maxWidth: '700px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: `${mdDown ? 'center' : 'start'}`,
          alignItems: `${mdDown ? 'center' : 'start'}`,
          textAlign: `${mdDown ? 'center' : 'start'}`,
          gap: '1.25rem',
        }}
      >
        <Typography
          variant={`${smDown ? 'h4' : 'h2'}`}
          color='var(--primary-color)'
          sx={{
            lineHeight: '1.1',
          }}
        >
          Seja um parceiro e garanta uma renda extra!
        </Typography>
        <Typography
          variant={`${smDown ? 'subtitle2' : 'subtitle1'}`}
          color='var(--text-color)'
          sx={{
            maxWidth: {
              xs: '350px',
              md: '400px',
            },
          }}
        >
          Através de nosso sistema multinível, você acumula pontos a cada venda e recebe prêmios por
          isso.
        </Typography>

        <Box
          className={styles['wrapper']}
          sx={{
            width: '100%',
            maxWidth: '275px',
            position: 'relative',
          }}
          component='form'
          onSubmit={handleSubmit}
        >
          <input
            style={{
              background: '#fff',
              borderRadius: '50px',
              padding: '1rem 1.5rem',
              width: '100%',
            }}
            placeholder={'CPF/CNPJ'}
            type={'tel'}
            value={maskCpfCnpj(formData.cpf)}
            onChange={(e) => changeForm('cpf', e.target.value.replace(/\D/g, ''))}
          />
          <button
            className={styles['button']}
            style={{
              color: 'var(--primary_main)',
              fontSize: '2rem',
              borderRadius: '50px',
              height: '80%',
              aspectRatio: '1',
              border: 'none',

              position: 'absolute',
              right: '0',
              transform: 'translateX(-10%)',
              top: '10%',
              cursor: 'pointer',
              transition: 'all .2s',

              display: 'grid',
              placeContent: 'center',
              textAlign: 'center',
            }}
            type='submit'
            disabled={
              formData.cpf.length !== 11 && formData.cpf.length !== 14 && formData.cpf !== ' '
            }
          >
            {loading ? (
              <CircularProgress color='secondary' />
            ) : (
              <BsArrowRight style={{ fontSize: '1.5rem' }} />
            )}
          </button>
        </Box>
      </Stack>

      <AboutImg color={'var(--color-svg)'} />
    </Box>
  );
}
