import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, InputAdornment, Slider, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  IResPostPlayVisualizaNiveisAtivacao,
  postPlayEditarNiveisAtivacao,
  postPlayVisualizaNiveisAtivacao,
} from '../../../../../api';
import { Cards, Loading } from '../../../../../components';
import { errorToast } from '../../../../../utils';
import { currencyMask } from '../../../../../utils/masks/maskCurrency';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';

export function NiveisDeDistribuicaoAtivacao() {
  const [selectedValues, setSelectedValues] = useState<number[]>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  const [total, setTotal] = useState<number>(0);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [initialValuesLoaded, setInitialValuesLoaded] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayVisualizaNiveisAtivacao>();

  const { user } = useUser();

  const { formData, changeForm } = useForm({
    valor_referencia: '',
  });
  const handleSliderChange = (index: number, value: number | undefined) => {
    if (value !== undefined && value !== null) {
      const updatedValues = [...selectedValues];
      updatedValues[index] = value;
      setSelectedValues(updatedValues);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingEdit(true);
    try {
      const payload = {
        token: user ? user.token : '',
        cpf: user?.cpf || '',
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
      await postPlayEditarNiveisAtivacao(payload);
      toast.success('Niveis Cadastrados com sucesso!');
    } catch (error: any) {
      errorToast(error);
    }
  }

  async function handleView() {
    setLoadingView(true);
    try {
      let payload = {
        cpf: user?.cpf || '',
      };
      const data = await postPlayVisualizaNiveisAtivacao(payload);
      setResponseView(data);
      const valorReferencia =
        responseView?.valor_referencia !== null ? responseView?.valor_referencia.toString() : '';
      const newValues = [
        responseView?.nivel1 || 0,
        responseView?.nivel2 || 0,
        responseView?.nivel3 || 0,
        responseView?.nivel4 || 0,
        responseView?.nivel5 || 0,
        responseView?.nivel6 || 0,
        responseView?.nivel7 || 0,
        responseView?.nivel8 || 0,
        responseView?.nivel9 || 0,
        responseView?.nivel10 || 0,
      ];
      //@ts-ignore
      setSelectedValues(newValues);
      changeForm('valor_referencia', valorReferencia ? valorReferencia : '');
      setInitialValuesLoaded(true);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingView(false);
    }
  }

  useEffect(() => {
    const sum = selectedValues.reduce((acc, value) => acc + value, 0);
    setTotal(sum);
    console.log('teste', selectedValues);
  }, [selectedValues]);

  useEffect(() => {
    handleView();
  }, [initialValuesLoaded]);

  return (
    <Cards title={'Ativações'} subTitle={''} size={'100%'}>
      {loadingView ? (
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
        <Box
          sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
        >
          <Cards
            title={'Cadastro de distribuição de valores por Ativação'}
            subTitle={'Cadastro do sistema de distribuição de valores por nível da rede'}
            size={'70%'}
          >
            <Box component={'form'} onSubmit={handleSubmit} sx={{ width: '100%' }}>
              <Typography>Valor base a ser distribuido</Typography>

              <TextField
                type='tel'
                id='id_valor_plano'
                label='Valor de referencia'
                placeholder='0,00'
                value={formData.valor_referencia !== undefined ? formData.valor_referencia : ''}
                onChange={(e) => {
                  changeForm('valor_referencia', currencyMask(e.target.value));
                }}
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
                      defaultValue={selectedValues[index]}
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
                  loading={loadingEdit}
                >
                  Editar
                </LoadingButton>
              </div>
            </Box>
          </Cards>
        </Box>
      )}
    </Cards>
  );
}
