import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
  Box,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import { StepsPrimeiroAcessoMMN } from '..';
import { postPlayCompletaPrimeiroAcesso } from '../../../../api';
import { postPlayCadastroPremiacaoMMN } from '../../../../api/ApisPrimeiroAcessoParceiro/CadastrarPremiacaoMMN';
import { Cards, Dropzone } from '../../../../components';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';
import { currencyMask } from '../../../../utils/masks/maskCurrency';

export function CadastroPremiacoesMMN() {
  const [selectedValue, setSelectedValue] = useState('0');
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const [premiosImg, setPremiosImg] = useState<{
    blob: Blob | null;
    url: string;
  }>({
    blob: null,
    url: '',
  });

  const handleRadioChange = (e: any) => {
    setSelectedValue(e.target.value);
  };

  const navigate = useNavigate();
  const { formData, changeForm, clearForm } = useForm<{ [key: string]: any }>({
    nome_premio: '',
    descricao: '',
    pontos_resgate: '',
    resgate: '',
    tempo_expiracao: '',
    valor_din: '',
    valor_premio: '',
  });

  const handleDeletePhoto = () => {
    setPremiosImg({ blob: null, url: '' });
  };

  async function handleCompletaPrimeiroAcesso() {
    let payload = {
      cpf: user?.cpf || '',
      alteracompletaprimeiroacesso: true,
    };
    try {
      await postPlayCompletaPrimeiroAcesso(payload);
    } catch (error: any) {
      console.log(error);
    }
  }

  async function handeSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const dados = new FormData();
    const keysEmpresa = Object.keys(formData);
    keysEmpresa.forEach((key) => dados.append(key, formData[key]));
    dados.append('foto', premiosImg?.blob || '');
    dados.append('token', user ? user?.token : '');

    try {
      await postPlayCadastroPremiacaoMMN(dados);
      toast.success('Premio cadastrado');
      clearForm();
      handleDeletePhoto();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  //breakpoints
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StepsPrimeiroAcessoMMN step={10}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
        component={'form'}
        onSubmit={handeSubmit}
      >
        <Cards
          title={'Premiações'}
          subTitle={'Cadastre os prêmios e as suas metas'}
          size={smDown ? '100%' : '50%'}
        >
          <FormControl>
            <Typography variant='h5'>Escolha o método que deseja cadastrar a premiação</Typography>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              value={selectedValue}
              name='radio-buttons-group'
              onChange={handleRadioChange}
            >
              <FormControlLabel value={'0'} control={<Radio />} label='Prêmio em dinheiro' />
              <FormControlLabel value={'1'} control={<Radio />} label='Prêmio em itens' />
              <FormControlLabel value={'2'} control={<Radio />} label='Ambas opções' />
            </RadioGroup>
          </FormControl>
          <div
            style={{
              width: '100%',
              height: '1px',
              backgroundColor: 'var(--primary_color)',
            }}
          />
          <>
            {selectedValue === '0' && (
              <Box sx={{ my: 2 }}>
                <Typography>Prêmio em dinheiro</Typography>
                <TextField
                  label='Nome do prêmio'
                  variant='standard'
                  value={formData.nome_premio}
                  fullWidth
                  onChange={(e) => changeForm('nome_premio', e.target.value)}
                  type='tel'
                  sx={{ mb: 2 }}
                />
                <TextField
                  label='Descrição'
                  variant='standard'
                  value={formData.descricao}
                  fullWidth
                  type='tel'
                  onChange={(e) => changeForm('descricao', e.target.value)}
                  sx={{ mb: 2 }}
                />

                <TextField
                  label='Pontos para resgate'
                  variant='standard'
                  value={mask(formData.pontos_resgate, ['9999999'])}
                  fullWidth
                  type='tel'
                  onChange={(e) => changeForm('pontos_resgate', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  type='tel'
                  id='id_valor_plano'
                  label='Valor total estimado do prêmio'
                  placeholder='0,00'
                  value={formData.valor_premio}
                  onChange={(e) => changeForm('valor_premio', currencyMask(e.target.value))}
                  variant='standard'
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                  }}
                  sx={{ mb: 2 }}
                />
                <TextField
                  type='tel'
                  id='id_valor_plano'
                  label='Quantia em dinheiro a ser premiada'
                  placeholder='0,00'
                  value={formData.valor_din}
                  onChange={(e) => changeForm('valor_din', currencyMask(e.target.value))}
                  variant='standard'
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                  }}
                  sx={{ mb: 2 }}
                />
              </Box>
            )}
            {selectedValue === '1' && (
              <Box sx={{ my: 2 }}>
                <Typography variant='h5'>Prêmio em Itens</Typography>
                <TextField
                  label='Nome do prêmio'
                  variant='standard'
                  value={formData.nome_premio ? formData.nome_premio : ''}
                  fullWidth
                  onChange={(e) => changeForm('nome_premio', e.target.value)}
                  type='tel'
                  sx={{ mb: 2 }}
                />

                <TextField
                  label='Descrição'
                  variant='standard'
                  value={formData.descricao ? formData.descricao : ''}
                  fullWidth
                  onChange={(e) => changeForm('descricao', e.target.value)}
                  type='tel'
                  sx={{ mb: 2 }}
                />
                <TextField
                  label='Prêmios disponiveis'
                  variant='standard'
                  value={mask(formData.quantidade ? formData.quantidade : '', ['9999'])}
                  fullWidth
                  type='tel'
                  onChange={(e) => changeForm('quantidade', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label='Pontos para resgate'
                  variant='standard'
                  value={mask(formData.pontos_resgate ? formData.pontos_resgate : '', ['9999999'])}
                  fullWidth
                  type='tel'
                  onChange={(e) => changeForm('pontos_resgate', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  type='tel'
                  id='id_valor_plano'
                  label='Valor total estimado do prêmio'
                  placeholder='0,00'
                  value={formData.valor_premio ? formData.valor_premio : ''}
                  onChange={(e) => changeForm('valor_premio', currencyMask(e.target.value))}
                  variant='standard'
                  fullWidth
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                  }}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ my: 2 }}>
                  <Typography>Adicione fotos dos itens no campo abaixo</Typography>
                  <Dropzone
                    accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
                    onDrop={(files) =>
                      setPremiosImg({
                        blob: files[0],
                        url: URL.createObjectURL(files[0]),
                      })
                    }
                  />
                  {premiosImg.url && (
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        my: 2,
                      }}
                    >
                      <Typography>Foto do prêmio</Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                        }}
                      >
                        <img
                          alt={`Foto do prêmio`}
                          src={premiosImg.url}
                          style={{
                            width: '100%',
                            borderRadius: '1rem',
                          }}
                        />
                        <IconButton onClick={handleDeletePhoto} size='small'>
                          <DeleteIcon color='error' />
                        </IconButton>
                      </Box>
                    </Box>
                  )}
                </Box>
              </Box>
            )}
            {selectedValue === '2' && (
              <>
                <Box sx={{ my: 2 }}>
                  <Typography variant='h5'>Prêmio em dinheiro e itens</Typography>
                  <TextField
                    label='Nome do prêmio'
                    variant='standard'
                    value={formData.nome_premio}
                    fullWidth
                    onChange={(e) => changeForm('nome_premio', e.target.value)}
                    type='tel'
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Descrição'
                    variant='standard'
                    value={formData.descricao}
                    fullWidth
                    type='tel'
                    onChange={(e) => changeForm('descricao', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Prêmios disponiveis'
                    variant='standard'
                    value={mask(formData.quantidade ? formData.quantidade : '', ['9999'])}
                    fullWidth
                    type='tel'
                    onChange={(e) => changeForm('quantidade', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label='Meta em pontos'
                    variant='standard'
                    value={mask(formData.pontos_resgate ? formData.pontos_resgate : '', [
                      '9999999',
                    ])}
                    fullWidth
                    type='tel'
                    onChange={(e) => changeForm('pontos_resgate', e.target.value)}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    type='tel'
                    id='id_valor_plano'
                    label='Valor total estimado do prêmio'
                    placeholder='0,00'
                    value={formData.valor_premio ? formData.valor_premio : ''}
                    onChange={(e) => changeForm('valor_premio', currencyMask(e.target.value))}
                    variant='standard'
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                    }}
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    type='tel'
                    id='id_valor_plano'
                    label='Quantia em dinheiro a ser premiada'
                    placeholder='0,00'
                    value={formData.valor_din}
                    onChange={(e) => changeForm('valor_din', currencyMask(e.target.value))}
                    variant='standard'
                    fullWidth
                    required
                    InputProps={{
                      startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                    }}
                    sx={{ mb: 2 }}
                  />
                </Box>
                <Box sx={{ my: 2 }}>
                  <Box sx={{ my: 2 }}>
                    <Typography>Adicione fotos dos itens no campo abaixo</Typography>
                    <Dropzone
                      accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
                      onDrop={(files) =>
                        setPremiosImg({
                          blob: files[0],
                          url: URL.createObjectURL(files[0]),
                        })
                      }
                    />
                    {premiosImg.url && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          my: 2,
                        }}
                      >
                        <Typography>Foto do prêmio</Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                          }}
                        >
                          <img
                            alt={`Foto do prêmio`}
                            src={premiosImg.url}
                            style={{
                              width: '100%',
                              borderRadius: '1rem',
                            }}
                          />
                          <IconButton onClick={handleDeletePhoto} size='small'>
                            <DeleteIcon color='error' />
                          </IconButton>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Box>
              </>
            )}
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <LoadingButton variant='contained' type='submit' sx={{ m: 2 }} loading={loading}>
                Cadastrar
              </LoadingButton>
              <LoadingButton
                onClick={(e) => {
                  e.preventDefault();
                  handleCompletaPrimeiroAcesso();
                  navigate('/home-admin-mmn');
                }}
                variant='outlined'
                color='warning'
              >
                Finalizar cadastro
              </LoadingButton>
            </Box>
          </>
        </Cards>
      </Box>
    </StepsPrimeiroAcessoMMN>
  );
}
