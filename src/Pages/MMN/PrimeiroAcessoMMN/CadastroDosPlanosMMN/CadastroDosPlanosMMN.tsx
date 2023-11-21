import { Box, Button, Checkbox, MenuItem, Select, Typography } from '@mui/material';
import { PiHandCoins } from 'react-icons/pi';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'swiper/css';

import { useEffect, useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { StepsPrimeiroAcessoMMN } from '..';
import {
  IReqPostPlayRecuperaPlanosPrimeiroAcesso,
  postPlayRecuperaPlanosPrimeiroAcesso,
} from '../../../../api';
import { Cards, SwiperNavButtons } from '../../../../components';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';

interface IPlano {
  id: string;
  nome: string;
  value: string;
}

export function CadastroDosPlanosMMN() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [planosSelecionados, setPlanosSelecionados] = useState<IPlano[]>([]);
  const { user } = useUser();

  //

  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (event: any, dadosPlanos: any) => {
    if (event.target.cheked) {
      setPlanosSelecionados((planosSelecionadosAnteriores) => [
        ...planosSelecionadosAnteriores,
        dadosPlanos,
      ]);
    } else {
      setPlanosSelecionados((planosSelecionadosAnteriores) =>
        planosSelecionadosAnteriores.filter((planos) => planos !== dadosPlanos)
      );
    }
    setCheckboxChecked(event.target.checked);
  };

  async function handleViewer() {
    let payload: IReqPostPlayRecuperaPlanosPrimeiroAcesso = {
      token: user?.token ? user.token : '',
    };

    setLoading(true);

    try {
      const response = await postPlayRecuperaPlanosPrimeiroAcesso(payload);
      setResponseData(response);
    } catch (error) {
      errorToast;
    }
  }

  useEffect(() => {
    handleViewer();
  }, []);

  return (
    <StepsPrimeiroAcessoMMN step={1}>
      <>
        <Typography variant='h6'>Selecione os planos que deseja ter no seu modulo</Typography>
        <Box width={'100%'}>
          <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
          >
            {responseData.map((plano: any, index) => (
              <SwiperSlide>
                <Cards
                  title={'Planos'}
                  subTitle={'Escolha os planos que serão usados no multinível'}
                  size={'350px'}
                  showIcon
                  bgColorIcon='var(--primary-color)'
                  icon={<PiHandCoins />}
                  key={index}
                >
                  <Typography>Neste plano voce terá</Typography>
                  <Typography>6 GB</Typography>
                  <Typography>600 Minutos</Typography>
                  <Typography>Whats app ilimitado</Typography>
                  <Typography>SMS ilimitado</Typography>

                  <Checkbox
                    checked={planosSelecionados.some(
                      (planoSelecionado) => planoSelecionado.id === plano.id
                    )}
                    onChange={handleCheckboxChange}
                    icon={<MdFavoriteBorder style={{ fontSize: '2rem' }} />}
                    checkedIcon={<MdFavorite style={{ fontSize: '2rem' }} />}
                  />
                  {!!checkboxChecked && (
                    <Select labelId='nivel-label' id='nivel' label='Nível'>
                      {[...Array(11).keys()].map((value) => (
                        <MenuItem key={value} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                </Cards>
              </SwiperSlide>
            ))}
            <SwiperNavButtons />
          </Swiper>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              mt: 2,
            }}
          >
            <Button onClick={() => ''}>Enviar</Button>
          </Box>
        </Box>
      </>
    </StepsPrimeiroAcessoMMN>
  );
}
