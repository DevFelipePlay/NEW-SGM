import { Box, Button, Checkbox, TextField, Typography } from '@mui/material';
import { PiHandCoins } from 'react-icons/pi';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/navigation';
import 'swiper/css/pagination';

import 'swiper/css';

import { useState } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { StepsPrimeiroAcessoMMN } from '..';
import { Cards, SwiperNavButtons } from '../../../../components';

interface IPlano {
  id: string;
  nome: string;
  value: string;
}

export function CadastroDosPlanosMMN() {
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [planosSelecionados, setPlanosSelecionados] = useState<IPlano[]>([]);

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

  const currencies = [
    {
      value: '0',
      label: 'Nenhum Nível',
    },
    {
      value: '1',
      label: '1 - Nível',
    },
    {
      value: '2',
      label: '2 - Níveis',
    },
    {
      value: '3',
      label: '3 - Níveis',
    },
    {
      value: '4',
      label: '4 - Níveis',
    },
    {
      value: '5',
      label: '5 - Níveis',
    },
    {
      value: '6',
      label: '6 - Níveis',
    },
    {
      value: '7',
      label: '7 - Níveis',
    },
    {
      value: '8',
      label: '8 - Níveis',
    },
    {
      value: '9',
      label: '9 - Níveis',
    },
    {
      value: '10',
      label: '10 - Níveis',
    },
  ];

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
            {mapeamentoDosPlanosEndpoint.map((plano: any) => (
              <SwiperSlide>
                <Cards
                  title={'Planos'}
                  subTitle={'Escolha os planos que serão usados no multinível'}
                  size={'350px'}
                  showIcon
                  bgColorIcon='var(--primary-color)'
                  icon={<PiHandCoins />}
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
                    <TextField
                      id='outlined-select-currency-native'
                      select
                      variant='standard'
                      label='Nivel'
                      defaultValue='EUR'
                      sx={{ width: '80%' }}
                      SelectProps={{
                        native: true,
                      }}
                      helperText='Defina a quantidade de niveis que este plano poderá acessar'
                    >
                      {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
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
