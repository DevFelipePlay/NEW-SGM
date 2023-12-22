import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import { StepsPrimeiroAcessoMMN } from '..';
import { Cards } from '../../../../components';

import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, Grid, IconButton, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { IReqPostPlayCadastroGraduacoesMMN } from '../../../../api/ApisPrimeiroAcessoParceiro/CadastroGraduacoesMMN/IReqPostPlayCadastroGraduacoes';
import { postPlayCadastroGraduacoesMMN } from '../../../../api/ApisPrimeiroAcessoParceiro/CadastroGraduacoesMMN/postPlayCadastroGraduacoes';
import { errorToast } from '../../../../utils';
import useUser from '../../../hooks/useUser';

export function CadastroGraduacoesMMN() {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [graduations, setGraduations] = useState<IReqPostPlayCadastroGraduacoesMMN[]>([
    { nome_graduacao: '', meta_proxima_graduacao: '', porcentagem: '' },
  ]);

  const handleAddGraduation = () => {
    setGraduations([
      ...graduations,
      { nome_graduacao: '', porcentagem: '', meta_proxima_graduacao: '' },
    ]);
  };

  const handleRemoveGraduation = (index: number) => {
    const updatedGraduations = graduations.filter((_, i) => i !== index);
    setGraduations(updatedGraduations);
  };

  const handleInputChange = (
    index: number,
    field: 'nome_graduacao' | 'porcentagem' | 'meta_proxima_graduacao',
    value: string | number
  ) => {
    const updatedGraduations = graduations.map((graduation, i) => {
      if (i === index) {
        return {
          ...graduation,
          [field]: field === 'porcentagem' || field === 'meta_proxima_graduacao' ? +value : value,
        };
      }
      return graduation;
    });
    setGraduations(updatedGraduations);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const postData = graduations.map((form) => ({
        nome_graduacao: form.nome_graduacao,
        porcentagem: form.porcentagem,
        meta_proxima_graduacao: form.meta_proxima_graduacao,
      }));
      const postDataToken: any = {
        ...postData,
        token: user ? user?.token : null,
      };

      await postPlayCadastroGraduacoesMMN(postDataToken);
      toast.success('Graduações cadastradas');
      navigate('/primeiro-acesso-multinivel-parceiro/cadastro-pontos-por-modalidade');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <StepsPrimeiroAcessoMMN step={3}>
      <Cards title={'Graduações'} subTitle={'Cadastre as graduações para os usuários'} size={'80%'}>
        <Box component={'form'} onSubmit={handleSubmit} sx={{ width: `100%` }}>
          {graduations.map((graduation, index) => (
            <Grid
              container
              spacing={2}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Grid item xs={4} sx={{ mb: 4 }}>
                <TextField
                  label='Nome da graduação'
                  variant='standard'
                  type='text'
                  fullWidth
                  value={graduation.nome_graduacao}
                  onChange={(e) => handleInputChange(index, 'nome_graduacao', e.target.value)}
                />
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  mb: 5,
                }}
              >
                <span style={{ fontSize: '12px', color: '#6F6F6F' }}>Porcentagem</span>
                <Select
                  label='Porcentagem'
                  id='porcentagem'
                  value={graduation.porcentagem}
                  onChange={(e) => handleInputChange(index, 'porcentagem', e.target.value)}
                  variant='standard'
                  fullWidth
                  defaultValue='0'
                >
                  {[...Array(101).keys()].map((value) => (
                    <MenuItem key={value} value={value}>
                      {value}%
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={3} sx={{ mb: 4 }}>
                <TextField
                  label='Pontos para atingir esta graduação'
                  variant='standard'
                  fullWidth
                  type='tel'
                  value={graduation.meta_proxima_graduacao}
                  onChange={(e) =>
                    handleInputChange(index, 'meta_proxima_graduacao', e.target.value)
                  }
                />
              </Grid>
              <Grid item xs={2} sx={{ mb: 4 }}>
                <IconButton
                  color='error'
                  onClick={() => handleRemoveGraduation(index)}
                  disabled={index === 0}
                >
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Box mt={2}>
            <Tooltip title='Adicionar nova graduação'>
              <IconButton
                onClick={handleAddGraduation}
                sx={{ backgroundColor: 'var(--primary-color)' }}
              >
                <HiOutlinePlusSmall />
              </IconButton>
            </Tooltip>
          </Box>
          <LoadingButton
            sx={{ mt: 2 }}
            type='submit'
            variant='contained'
            color='primary'
            loading={loading}
          >
            Cadastrar
          </LoadingButton>
        </Box>
      </Cards>
    </StepsPrimeiroAcessoMMN>
  );
}
