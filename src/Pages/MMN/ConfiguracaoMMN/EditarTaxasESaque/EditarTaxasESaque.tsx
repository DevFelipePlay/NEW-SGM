import LoadingButton from '@mui/lab/LoadingButton';
import { Box, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  IReqPostPlayEditarTaxas,
  postPlayEditarTaxas,
  postPlayVisualizaTaxas,
} from '../../../../api';
import { Cards, Loading } from '../../../../components';
import useUser from '../../../../hooks/useUser';
import { currencyMask, currencyUnMask, errorToast } from '../../../../utils';

export function EditarTaxasESaque() {
  const [loadingView, setLoadingView] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const { user } = useUser();
  const [editedValues, setEditedValues] = useState<IReqPostPlayEditarTaxas>({
    bonus_carreira: '',
    cpf: '',
    limite_minimo_saque: '',
    taxa_saque: '',
  });

  async function handleView() {
    setLoadingView(true);

    let payload = {
      cpf: user?.cpf || '',
    };
    try {
      const data = await postPlayVisualizaTaxas(payload);
      setEditedValues({
        bonus_carreira: data.bonus_carreira,
        cpf: data.cpf,
        limite_minimo_saque: data.limite_minimo_saque,
        taxa_saque: data.taxa_saque,
      });
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingView(false);
    }
  }

  const handleEditChange = (key: any, value: any) => {
    setEditedValues((prevData) => ({ ...prevData, [key]: value }));
  };

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingEdit(true);

    try {
      let payload = {
        taxa_saque: editedValues?.taxa_saque || '',
        limite_minimo_saque: currencyUnMask(editedValues?.limite_minimo_saque) || '',
        bonus_carreira: currencyUnMask(editedValues?.bonus_carreira) || '',
        cpf: user?.cpf || '',
      };

      //@ts-ignore
      await postPlayEditarTaxas(payload);
      toast.success('Taxas Editadas!');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingEdit(false);
    }
  }

  useEffect(() => {
    handleView();
  }, []);

  return (
    <>
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
        <>
          <Cards
            title={'Configure as Taxas e Saques'}
            subTitle={'Edite os valores usados para taxas e saques'}
            size={'100%'}
          >
            <Box
              sx={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
              }}
              component={'form'}
              onSubmit={() => ''}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}
              >
                <span style={{ fontSize: '12px', color: '#6F6F6F' }}>Taxa de saque</span>
                <Select
                  label='Porcentagem'
                  id='porcentagem'
                  value={
                    editedValues?.taxa_saque !== undefined
                      ? editedValues?.taxa_saque.toString()
                      : '0'
                  }
                  onChange={(e) => handleEditChange('taxa_saque', Number(e.target.value))}
                  variant='standard'
                  fullWidth
                  defaultValue='0'
                  sx={{ mb: 2 }}
                >
                  {[...Array(101).keys()].map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}%
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  type='tel'
                  label='Limite minimo para saque'
                  placeholder='0,00'
                  value={
                    editedValues?.limite_minimo_saque !== undefined
                      ? editedValues?.limite_minimo_saque
                      : ''
                  }
                  onChange={(e) =>
                    handleEditChange('limite_minimo_saque', currencyMask(e.target.value))
                  }
                  variant='standard'
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                  }}
                />
                <TextField
                  type='tel'
                  label='Primeiro bonus de carreira'
                  placeholder='0,00'
                  value={
                    editedValues?.bonus_carreira !== undefined ? editedValues?.bonus_carreira : ''
                  }
                  onChange={(e) => handleEditChange('bonus_carreira', currencyMask(e.target.value))}
                  variant='standard'
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                  }}
                />

                <LoadingButton
                  type='submit'
                  variant='contained'
                  onClick={(e: any) => handleEdit(e)}
                  loading={loadingEdit}
                >
                  Confirmar Edição
                </LoadingButton>
              </Box>
            </Box>
          </Cards>
        </>
      )}
    </>
  );
}
