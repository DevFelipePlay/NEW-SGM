import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
  Box,
  InputAdornment,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StepsPrimeiroAcessoMMN } from '..';
import { postPlayCadastroNiveisAtivacaoMMN } from '../../../../api';
import { Cards } from '../../../../components';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';
import { currencyMask } from '../../../../utils/masks/maskCurrency';

export function CadastroDeDistribuicaoDeValoresPorAtivacao() {
  const [selectedValues, setSelectedValues] = useState<number[]>(new Array(10).fill(0));
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useUser();

  const { formData, changeForm } = useForm({
    valor_referencia: '',
  });

  const handleSliderChange = (index: number, value: number) => {
    const updatedValues = [...selectedValues];
    updatedValues[index] = value;
    setSelectedValues(updatedValues);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        token: user ? user.token : '',
        valor_referencia: parseFloat(formData.valor_referencia),
        nivel1: String(selectedValues[0]),
        nivel2: String(selectedValues[1]),
        nivel3: String(selectedValues[2]),
        nivel4: String(selectedValues[3]),
        nivel5: String(selectedValues[4]),
        nivel6: String(selectedValues[5]),
        nivel7: String(selectedValues[6]),
        nivel8: String(selectedValues[7]),
        nivel9: String(selectedValues[8]),
        nivel10: String(selectedValues[9]),
      };
      await postPlayCadastroNiveisAtivacaoMMN(payload);
      toast.success('Niveis Cadastrados com sucesso!');
      navigate(
        '/primeiro-acesso-multinivel-parceiro/cadastro-de-distribuicao-de-valores-por-licenciamento'
      );
    } catch (error: any) {
      errorToast(error);
    }
  }

  useEffect(() => {
    const sum = selectedValues.reduce((acc, value) => acc + value, 0);
    setTotal(sum);
    console.log('teste', selectedValues);
  }, [selectedValues]);

  //breakpoints

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StepsPrimeiroAcessoMMN step={6}>
      <Cards
        title={'Cadastro de distribuição de valores por Ativação'}
        subTitle={'Cadastro do sistema de distribuição de valores por nível da rede'}
        size={smDown ? '90%' : '50%'}
      >
        <Box component={'form'} onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Typography mb={2}>Valor base a ser distribuído</Typography>

          <TextField
            type='tel'
            id='id_valor_plano'
            label='Valor de referência'
            placeholder='0,00'
            value={formData.valor_referencia}
            onChange={(e) => changeForm('valor_referencia', currencyMask(e.target.value))}
            variant='standard'
            fullWidth
            required
            InputProps={{
              startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
            }}
          />
          <div style={{ width: '100%' }}>
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index}>
                <label>{`Nivel ${index + 1} `}</label>
                <Slider
                  value={selectedValues[index]}
                  onChange={(_, value) => handleSliderChange(index, value as number)}
                  valueLabelDisplay='auto'
                  valueLabelFormat={(value) => `${value}%`}
                  min={0}
                  max={100}
                />
              </div>
            ))}
            {total > 100 ? (
              <Typography color={'error'} sx={{ my: 2 }}>
                A soma dos valores deve ser menor ou igual a 100%
              </Typography>
            ) : (
              ''
            )}
            <LoadingButton
              variant='contained'
              type={'submit'}
              disabled={total > 100 || formData.valor_referencia === ''}
              loading={loading}
            >
              Enviar
            </LoadingButton>
          </div>
        </Box>
      </Cards>
    </StepsPrimeiroAcessoMMN>
  );
}
