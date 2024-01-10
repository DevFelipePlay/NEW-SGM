import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Modal,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import React from 'react';
import { HiOutlinePlusSmall } from 'react-icons/hi2';
import { TbTrashX } from 'react-icons/tb';
import {
  IReqPostPlayCadastroGraduacoesMMN,
  IResPostPlayVisualizaGraduacao,
  postPlayCadastroGraduacoesMMN,
  postPlayEditarGraduacao,
  postPlayVisualizaGraduacao,
} from '../../../../api';
import { postPlayDeletarGraduacao } from '../../../../api/ApisEditarModulo/DeletarGraduacao';
import { Cards, Loading } from '../../../../components';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';

export function EditarGraduações() {
  const [selectedValue, setSelectedValue] = useState('');
  const [loadingView, setLoadingView] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayVisualizaGraduacao[]>([]);
  const [editedValues, setEditedValues] = useState<{
    [key: number]: Partial<IResPostPlayVisualizaGraduacao>;
  }>({});
  const { user } = useUser();

  // Modal exclusao de pacotes
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1);
  const handleOpen = (index: number) => {
    setOpen(true);
    setSelectedCardIndex(index);
  };

  // breakpoints
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  //

  const style: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: `${smDown ? '300px' : '400px'}`,
    borderRadius: '10px',
    boxShadow: '24',
    backgroundColor: 'var(--backGround_sideBar_color)',
    color: 'var(--text_color)',
    padding: `${smDown ? '1rem' : '4rem'}`,
    textAlign: 'center',
    border: 'none',
  };
  //////

  async function handleView() {
    setLoadingView(true);

    let payload = {
      cpf: user?.cpf || '',
    };
    try {
      const data = await postPlayVisualizaGraduacao(payload);
      setResponseView(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingView(false);
    }
  }

  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingEdit(true);

    try {
      const editedData = responseView.map((item, index) => {
        const editedItem = editedValues[index];

        return {
          id: editedItem?.id || item.id || '',
          nome_graduacao: editedItem?.nome_graduacao || item.nome_graduacao || '',
          porcentagem: editedItem?.porcentagem || item.porcentagem || '',
          meta_proxima_graduacao:
            editedItem?.meta_proxima_graduacao || item.meta_proxima_graduacao || '',
        };
      });
      const postData = {
        ...editedData,
        cpf: user?.cpf || '',
      };
      //@ts-ignore
      await postPlayEditarGraduacao(postData);
      toast.success('Graduações Editados!');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingEdit(false);
    }
  }

  const handleEditChange = (id: any, field: string, value: any) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [field]: value,
      },
    }));
  };

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingDelete(true);

    try {
      const selectedCard = responseView[selectedCardIndex];
      const postData = {
        cpf: user?.cpf || '',
        [selectedCardIndex]: {
          id: selectedCard.id || '',
        },
      };
      //@ts-ignore
      await postPlayDeletarGraduacao(postData);
      toast.success('Pacote excluído com sucesso!');
      handleClose();
      handleView();
    } catch (error: any) {
      errorToast(error);
      setLoadingDelete(false);
    }
  }

  //   Cadastro de novas graduações
  const [loading, setLoading] = useState(false);

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
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }
  ////////////

  useEffect(() => {
    handleView();
  }, []);

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Cards title={'Configure suas graduações'} subTitle={''} size={'100%'}>
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>
            Marque a opção ideal para o seu objetivo
          </FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue={0}
            value={selectedValue}
            name='radio-buttons-group'
            onChange={(e: any) => setSelectedValue(e.target.value)}
            sx={{
              textAlign: 'start',
            }}
          >
            <FormControlLabel
              value='0'
              control={<Radio />}
              label='Editar Graduações já existentes'
            />
            <FormControlLabel value='1' control={<Radio />} label='Excluir Graduações' />
            <FormControlLabel
              value='2'
              control={<Radio />}
              label='Acrescentar uma nova Graduação'
            />
          </RadioGroup>
        </FormControl>
      </Cards>
      {selectedValue === '0' && (
        <Cards title={'Editar Graduações '} subTitle={'Edite suas graduações'} size={'100%'}>
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
            <Box>
              {responseView.map((item, index) => {
                return (
                  <Cards title={`${item.nome_graduacao}`} subTitle={''} size={'100%'} key={index}>
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
                      <Grid item xs={12} sm={4} sx={{ mb: 4 }}>
                        <TextField
                          label='Nome da graduação'
                          variant='standard'
                          value={
                            editedValues[index]?.nome_graduacao !== undefined
                              ? editedValues[index]?.nome_graduacao
                              : item.nome_graduacao
                          }
                          onChange={(e) =>
                            handleEditChange(index, 'nome_graduacao', e.target.value)
                          }
                          type='text'
                          fullWidth
                        />
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={3}
                        sx={{
                          mb: 5,
                          textAlign: {
                            xs: 'start',
                            sm: 'center',
                          },
                        }}
                      >
                        <span style={{ fontSize: '12px', color: '#6F6F6F' }}>Porcentagem</span>
                        <Select
                          label='Porcentagem'
                          id='porcentagem'
                          variant='standard'
                          value={editedValues[index]?.porcentagem || item.porcentagem || '0'}
                          onChange={(e) => handleEditChange(index, 'porcentagem', e.target.value)}
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
                      <Grid item xs={12} sm={3} sx={{ mb: 4 }}>
                        <TextField
                          label='Pontos para graduar'
                          variant='standard'
                          value={
                            editedValues[index]?.meta_proxima_graduacao !== undefined
                              ? editedValues[index]?.meta_proxima_graduacao
                              : item?.meta_proxima_graduacao
                          }
                          fullWidth
                          onChange={(e) =>
                            handleEditChange(index, 'meta_proxima_graduacao', e.target.value)
                          }
                          type='tel'
                        />
                      </Grid>
                    </Grid>
                  </Cards>
                );
              })}
              <LoadingButton
                variant='contained'
                onClick={(e: any) => handleEdit(e)}
                loading={loadingEdit}
              >
                Confirmar Edição
              </LoadingButton>
            </Box>
          )}
        </Cards>
      )}
      {selectedValue === '1' && (
        <Cards
          title={'Excluir Graduações'}
          subTitle={'Exclua as graduações do seu módulo'}
          size={'100%'}
        >
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
              {responseView.map((item, index) => (
                <React.Fragment key={index}>
                  <Cards title={`${item.nome_graduacao}`} subTitle={'Graduação'} size={'100%'}>
                    <Typography>Nome: {item.nome_graduacao}</Typography>
                    <Typography>Meta para graduar: {item.meta_proxima_graduacao}</Typography>
                    <Typography>
                      Porcentagem de recebimento do bônus de carreira: {item.porcentagem}%
                    </Typography>
                    <IconButton color='error' onClick={() => handleOpen(index)}>
                      <TbTrashX />
                    </IconButton>
                  </Cards>
                  <Modal
                    open={open && selectedCardIndex === index}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                  >
                    <Box sx={style}>
                      <Typography id='modal-modal-title' variant='h6' component='h2'>
                        Certeza que deseja excluir : Graduação {item.nome_graduacao}
                      </Typography>
                      <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                        Ao excluir esta graduação os usuários que estiverem na mesma irão para a
                        graduação acima.
                      </Typography>
                      <LoadingButton
                        color='error'
                        variant='contained'
                        fullWidth
                        sx={{ my: 2 }}
                        onClick={(e: any) => handleDelete(e)}
                        loading={loadingDelete}
                      >
                        Excluir
                      </LoadingButton>
                      <Button variant='contained' fullWidth onClick={() => handleClose()}>
                        Cancelar
                      </Button>
                    </Box>
                  </Modal>
                </React.Fragment>
              ))}
            </>
          )}
        </Cards>
      )}
      {selectedValue === '2' && (
        <Cards
          title={'Graduações'}
          subTitle={'Cadastre as graduações para os usuários'}
          size={'80%'}
        >
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
                <Grid item xs={12} sm={4} sx={{ mb: 4 }}>
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
                  xs={12}
                  sm={3}
                  sx={{
                    mb: 5,
                    textAlign: {
                      xs: 'start',
                      sm: 'center',
                    },
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
                <Grid
                  item
                  xs={12}
                  sm={3}
                  sx={{
                    mb: {
                      xs: 3,
                      sm: 4,
                    },
                  }}
                >
                  <TextField
                    label='Pontos para graduar'
                    variant='standard'
                    fullWidth
                    type='tel'
                    value={graduation.meta_proxima_graduacao}
                    onChange={(e) =>
                      handleInputChange(index, 'meta_proxima_graduacao', e.target.value)
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={2} sx={{ mb: 4 }}>
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
                  sx={{ backgroundColor: 'var(--primary_color)' }}
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
      )}
    </Box>
  );
}
