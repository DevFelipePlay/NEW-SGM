import {
  Box,
  Checkbox,
  Grid,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PiHandCoins } from 'react-icons/pi';

import 'swiper/css';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'swiper/css';

import { useEffect, useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StepsPrimeiroAcessoMMN } from '..';

import {
  IReqPostPlayRecuperaPlanosPrimeiroAcesso,
  postPlayRecuperaPlanosPrimeiroAcesso,
} from '../../../../api';
import { IResPostPlayRecuperaPlanosPrimeiroAcesso } from '../../../../api/Multinivel/ApisPrimeiroAcessoParceiro/RecuperaPlanosPrimeiroAcessoMMN/IResPostPlayRecuperaPlanosPrimeiroAcessoMMN';
import { Cards, Loading } from '../../../../components';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';

export function CadastroDosPlanosMMN() {
  const [checkboxStates, setCheckboxStates] = useState<{
    [key: string]: boolean;
  }>({});

  const navigate = useNavigate();

  const [responseData, setResponseData] = useState([]);
  const [planosSelecionados, setPlanosSelecionados] = useState<
    IResPostPlayRecuperaPlanosPrimeiroAcesso[]
  >([]);
  const [nivel, setNivel] = useState<{ [key: string]: number }>({});
  const { user } = useUser();

  //

  const [loading, setLoading] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);

  //breakpoints
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  //

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dadosPlanos: IResPostPlayRecuperaPlanosPrimeiroAcesso
  ) => {
    const isChecked = event.target.checked;

    setCheckboxStates((prevStates) => {
      const newStates = { ...prevStates, [dadosPlanos.id]: isChecked };

      setPlanosSelecionados((prevSelected) => {
        if (isChecked) {
          return [...prevSelected, { ...dadosPlanos, value: nivel.toString() }];
        } else {
          return prevSelected.filter((card) => card.id !== dadosPlanos.id);
        }
      });

      return newStates;
    });
  };

  async function handleViewer() {
    let payload: IReqPostPlayRecuperaPlanosPrimeiroAcesso = {
      token: user?.token ? user.token : '',
    };

    setLoading(true);

    try {
      const response = await postPlayRecuperaPlanosPrimeiroAcesso(payload);
      setResponseData(response);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleSubmit() {
    const dados = planosSelecionados.map((plano) => ({
      id_plano: plano.id,
      nivel: nivel[plano.id],
    }));

    const postData = {
      token: user?.token,
      ...dados,
    };

    setLoadingSend(true);

    try {
      //@ts-ignore
      const response = await postPlayCadastraNivelPlanosMMN(postData);
      setResponseData(response.data);
      navigate('/primeiro-acesso-multinivel-parceiro/cadastro-graduacoes');
      toast.success('Escolha dos planos realizada');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingSend(false);
    }
  }

  useEffect(() => {
    handleViewer();
  }, []);

  return (
    <StepsPrimeiroAcessoMMN step={2}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
        }}
        component={'form'}
        onSubmit={handleSubmit}
      >
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
          <>
            <Typography variant='h6'>Selecione os planos que deseja ter no seu módulo</Typography>
            <Grid container width={'100%'} display='flex' justifyContent='center'>
              {responseData.map((plano: IResPostPlayRecuperaPlanosPrimeiroAcesso, index) => (
                <Grid item key={index}>
                  <Cards
                    title={plano.nomeplano}
                    subTitle={'Escolha os planos que serão usados no multinível'}
                    size={smDown ? '200px' : '350px'}
                    showIcon
                    bgColorIcon='var(--primary_color)'
                    icon={<PiHandCoins />}
                  >
                    <Typography>Neste plano voce terá</Typography>
                    <Typography>{plano.gigas !== '0' ? plano.gigas + ' ' + 'GB' : ''}</Typography>
                    <Typography>
                      {plano.minutos !== '999'
                        ? plano.minutos + ' ' + 'Minutos'
                        : 'Ligações Ilimitadas'}
                    </Typography>
                    <Typography>{plano.sms + ' ' + 'SMS'}</Typography>

                    <Checkbox
                      checked={checkboxStates[plano.id] || false}
                      onChange={(event) => handleCheckboxChange(event, plano)}
                      icon={<MdFavoriteBorder style={{ fontSize: '2rem' }} />}
                      checkedIcon={<MdFavorite style={{ fontSize: '2rem' }} />}
                    />
                    {checkboxStates[plano.id] && (
                      <Select
                        labelId='nivel-label'
                        id='nivel'
                        label='Nível'
                        disabled={!checkboxStates[plano.id]}
                        value={nivel[plano.id]?.toString() || '0'}
                        variant='standard'
                        fullWidth
                        onChange={(e) =>
                          setNivel((prevNivel) => ({
                            ...prevNivel,
                            [plano.id]: parseInt(e.target.value, 10),
                          }))
                        }
                      >
                        {[...Array(11).keys()].map((value) => (
                          <MenuItem key={value} value={value}>
                            {value} {value > 1 ? 'Níveis' : 'Nível'}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  </Cards>
                </Grid>
              ))}
            </Grid>
            <LoadingButton type='submit' variant='contained' loading={loadingSend}>
              Enviar
            </LoadingButton>
          </>
        )}
      </Box>
    </StepsPrimeiroAcessoMMN>
  );
}
