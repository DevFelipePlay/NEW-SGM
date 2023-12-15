import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StepsPrimeiroAcessoMMN } from '..';
import { postPlayCadastroValoresETaxasMMN } from '../../../../api/ApisPrimeiroAcessoParceiro/CadastroValoresETaxasMMN';
import { Cards } from '../../../../components';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';
import { currencyMask, currencyUnMask } from '../../../../utils/masks/maskCurrency';

export function CadastroValoresETaxasMMN() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { formData, changeForm } = useForm({
    bonus_carreira: '',
    limite_minimo_saque: '',
    taxa_saque: '',
    token: user?.token,
  });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    currencyUnMask(formData.bonus_carreira);
    currencyUnMask(formData.limite_minimo_saque);

    const unMaskedBonusCarreira = currencyUnMask(formData.bonus_carreira);
    const unMaskedLimiteMinimoSaque = currencyUnMask(formData.limite_minimo_saque);

    const postData = {
      ...formData,
      bonus_carreira: unMaskedBonusCarreira,
      limite_minimo_saque: unMaskedLimiteMinimoSaque,
    };

    try {
      await postPlayCadastroValoresETaxasMMN(postData);
      toast.success('Cadastro Realizado!');
      navigate('/primeiro-acesso-multinivel-parceiro/cadastro-premiacoes');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <StepsPrimeiroAcessoMMN step={9}>
      <Box
        sx={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex' }}
        component={'form'}
        onSubmit={handleSubmit}
      >
        <Cards title={'Valores'} subTitle={'Cadastro de taxas'} size={'50%'}>
          <span style={{ fontSize: '12px', color: '#6F6F6F' }}>Taxa de saque</span>
          <Select
            label='Porcentagem'
            id='porcentagem'
            value={formData.taxa_saque}
            onChange={(e) => changeForm('taxa_saque', e.target.value)}
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
            id='id_valor_plano'
            label='Limite minimo para saque'
            placeholder='0,00'
            value={formData.limite_minimo_saque}
            onChange={(e) => changeForm('limite_minimo_saque', currencyMask(e.target.value))}
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
            id='id_valor_plano'
            label='Referencial bonus de carreira'
            placeholder='0,00'
            value={formData.bonus_carreira}
            onChange={(e) => changeForm('bonus_carreira', currencyMask(e.target.value))}
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
            loading={loading}
            disabled={formData.bonus_carreira === '' || formData.limite_minimo_saque === ''}
          >
            Enviar
          </LoadingButton>
        </Cards>
      </Box>
    </StepsPrimeiroAcessoMMN>
  );
}
