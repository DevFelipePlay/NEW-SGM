import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { Box, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  IReqPostPlayEditarPontosPorNivel,
  IResPostPlayVisualizarPontosPorNivel,
  postPlayEditarPontosPorNivel,
  postPlayVisualizarPontosPorNivel,
} from '../../../../api';
import { Cards, Loading } from '../../../../components';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';

export function EditarPontos() {
  const { user } = useUser();
  const [loadingView, setLoadingView] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayVisualizarPontosPorNivel>();

  const [editedValues, setEditedValues] = useState<IReqPostPlayEditarPontosPorNivel>({
    cpf: '',
    ativacao: '',
    recarga: '',
    chips: '',
  });

  const handleEditChange = (key: any, value: any) => {
    setEditedValues((prevData) => ({ ...prevData, [key]: value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingEdit(true);

    try {
      let payload = {
        ativacao: editedValues?.ativacao || responseView?.ativacao || '',
        recarga: editedValues?.recarga || responseView?.recarga || '',
        chips: editedValues?.chips || responseView?.chips || '',
        cpf: user?.cpf || '',
      };
      //@ts-ignore
      await postPlayEditarPontosPorNivel(payload);
      toast.success('Pontos Editados');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingEdit(false);
    }
  }

  async function handleView() {
    setLoadingView(true);
    let payload = {
      cpf: user?.cpf || '',
    };
    try {
      const data = await postPlayVisualizarPontosPorNivel(payload);
      setResponseView(data);
      handleEditChange('ativacao', responseView?.ativacao);
      handleEditChange('recarga', responseView?.recarga);
      handleEditChange('chips', responseView?.chips);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingView(false);
      console.log(responseView);
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
        <Cards title={'Modalidades'} subTitle={''} size={'100%'}>
          <Box
            sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            component={'form'}
            onSubmit={handleSubmit}
          >
            <Cards
              title={'Pontos por nível'}
              subTitle={'Defina a quantidade de pontos de cada modalidade'}
              size={'50%'}
            >
              <TextField
                type='tel'
                label='Ativação'
                variant='standard'
                value={
                  editedValues?.ativacao !== undefined
                    ? editedValues?.ativacao
                    : responseView?.ativacao
                }
                onChange={(e) => handleEditChange('ativacao', e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                type='tel'
                label='Recarga'
                variant='standard'
                value={
                  editedValues?.recarga !== undefined
                    ? editedValues?.recarga
                    : responseView?.recarga
                }
                onChange={(e) => handleEditChange('recarga', e.target.value)}
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <TextField
                type='tel'
                label='Chips'
                value={
                  editedValues?.chips !== undefined ? editedValues?.chips : responseView?.chips
                }
                onChange={(e) => handleEditChange('chips', e.target.value)}
                variant='standard'
                fullWidth
                sx={{ mb: 2 }}
                required
              />
              <Box>
                <LoadingButton type='submit' variant='contained' loading={loadingEdit}>
                  Editar
                </LoadingButton>
              </Box>
            </Cards>
          </Box>
        </Cards>
      )}
    </>
  );
}
