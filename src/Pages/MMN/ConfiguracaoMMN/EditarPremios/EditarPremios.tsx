import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';
import { TbTrashX } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import {
  IResPostPlayVisualizaPremios,
  postPlayCadastroPremiacaoMMN,
  postPlayDeletarPremiacao,
  postPlayVisualizaPremios,
} from '../../../../api';
import { postPlayEditaPremios } from '../../../../api/ApisEditarModulo/EditarPremiacao';
import { Cards, Dropzone, Loading } from '../../../../components';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';
import { currencyMask, errorToast } from '../../../../utils';

export function EditarPremios() {
  const [selectedValue, setSelectedValue] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingView, setLoadingView] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  // Substitua a linha existente

  const [responseView, setResponseView] = useState<IResPostPlayVisualizaPremios[]>([]);
  const [editedValues, setEditedValues] = useState<{
    [key: number]: Partial<IResPostPlayVisualizaPremios>;
  }>({});
  const { user } = useUser();

  async function handleView() {
    setLoadingView(true);

    let payload = {
      token: user?.token || '',
    };
    try {
      const data = await postPlayVisualizaPremios(payload);
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
          nome_premio: editedItem?.nome_premio || item.nome_premio || '',
          descricao: editedItem?.descricao || item.descricao || '',
          foto: editedItem?.foto || item.foto || '',
          quantidade: editedItem?.quantidade || item.quantidade || '',
          tempo_expiracao: editedItem?.tempo_expiracao || item.tempo_expiracao || '',
          valor_din: editedItem?.valor_din || item.valor_din || '',
          valor_premio: editedItem?.valor_premio || item.valor_premio || '',
          pontos_resgate: editedItem?.pontos_resgate || item.pontos_resgate || '',
        };
      });
      const postData = {
        ...editedData,
        cpf: user?.cpf || '',
      };
      //@ts-ignore
      await postPlayEditaPremios(postData);
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

  // Modal exclusao de pacotes
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1); // Novo estado para o índice do card
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (index: number) => {
    setOpen(true);
    setSelectedCardIndex(index);
  };
  const style: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: '10px',
    boxShadow: '24',
    backgroundColor: 'var(--backGround-sideBar-color)',
    color: 'var(--text-color)',
    padding: '4rem',
    textAlign: 'center',
    border: 'none',
  };
  //////

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
      await postPlayDeletarPremiacao(postData);
      toast.success('Premio excluído com sucesso!');
      handleClose();
      handleView();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingDelete(false);
    }
  }

  //   Cadastro dos nosvos premios
  const [selectedValuePremios, setSelectedValuePremios] = useState('0');
  const [loading, setLoading] = useState(false);
  const [premiosImg, setPremiosImg] = useState<{ blob: Blob | null; url: string }>({
    blob: null,
    url: '',
  });

  const handleRadioChange = (e: any) => {
    setSelectedValuePremios(e.target.value);
  };

  const { formData, changeForm, clearForm } = useForm<{ [key: string]: any }>({
    nome_premio: '',
    descricao: '',
    pontos_resgate: '',
    quantidade: '',
    resgate: '',
    valor_din: '',
    valor_premio: '',
  });

  const handleDeletePhoto = () => {
    setPremiosImg({ blob: null, url: '' });
  };

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

  useEffect(() => {
    handleView();
  }, []);

  //////////////
  return (
    <>
      <Cards title={'Configure seus Premios'} subTitle={' '} size={'100%'}>
        <FormControl>
          <FormLabel id='demo-radio-buttons-group-label'>
            Marque a ideal opção para o seu objetivo
          </FormLabel>
          <RadioGroup
            aria-labelledby='demo-radio-buttons-group-label'
            defaultValue={0}
            value={selectedValue}
            name='radio-buttons-group'
            onChange={(e: any) => setSelectedValue(e.target.value)}
          >
            <FormControlLabel value='0' control={<Radio />} label='Editar premios já existentes' />
            <FormControlLabel value='1' control={<Radio />} label='Excluir premios' />
            <FormControlLabel value='2' control={<Radio />} label='Acrescentar uma novo premio' />
          </RadioGroup>
        </FormControl>
      </Cards>

      <>
        {selectedValue === '0' && (
          <Cards title={'Edição de Premios'} subTitle={'Edite seus premios'} size={'100%'}>
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
                  <Cards
                    title={`${item.nome_premio}`}
                    subTitle={'Premios'}
                    size={'50%'}
                    key={index}
                  >
                    <TextField
                      variant='standard'
                      sx={{ mb: 2 }}
                      value={
                        editedValues[index]?.nome_premio !== undefined
                          ? editedValues[index]?.nome_premio
                          : item?.nome_premio
                      }
                      fullWidth
                      onChange={(e) => handleEditChange(index, 'nome_premio', e.target.value)}
                      label={'Nome do Premio'}
                    />
                    <TextField
                      variant='standard'
                      sx={{ mb: 2 }}
                      value={
                        editedValues[index]?.descricao !== undefined
                          ? editedValues[index]?.descricao
                          : item?.descricao
                      }
                      fullWidth
                      onChange={(e) => handleEditChange(index, 'descricao', e.target.value)}
                      label={'descrição'}
                    />

                    <TextField
                      variant='standard'
                      value={
                        editedValues[index]?.pontos_resgate !== undefined
                          ? editedValues[index]?.pontos_resgate
                          : item?.pontos_resgate
                      }
                      fullWidth
                      onChange={(e) => handleEditChange(index, 'pontos_resgate', e.target.value)}
                      label={'Quantidade de pontos para resgate'}
                    />
                    <TextField
                      variant='standard'
                      sx={{ mb: 2 }}
                      value={
                        editedValues[index]?.valor_din !== undefined
                          ? editedValues[index]?.valor_din
                          : item?.valor_din
                      }
                      fullWidth
                      onChange={(e) =>
                        handleEditChange(index, 'valor_din', currencyMask(e.target.value))
                      }
                      label={'Valor em dinheiro'}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                      }}
                    />
                    <TextField
                      variant='standard'
                      sx={{ mb: 2 }}
                      value={
                        editedValues[index]?.valor_premio !== undefined
                          ? editedValues[index]?.valor_premio
                          : item?.valor_premio
                      }
                      fullWidth
                      onChange={(e) =>
                        handleEditChange(index, 'valor_premio', currencyMask(e.target.value))
                      }
                      label={'Valor estimado do premio'}
                      InputProps={{
                        startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                      }}
                    />
                  </Cards>
                ))}
                <LoadingButton
                  variant='contained'
                  onClick={(e: any) => handleEdit(e)}
                  loading={loadingEdit}
                >
                  Confirmar edição
                </LoadingButton>
              </>
            )}
          </Cards>
        )}
        {selectedValue === '1' && (
          <Cards
            title={'Exclusão de Premios'}
            subTitle={'Exclua premios do seu modulo'}
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
                  <>
                    <Cards
                      title={`${item.nome_premio}`}
                      subTitle={'Premio'}
                      size={'100%'}
                      key={index}
                    >
                      <Typography>Nome: {item.nome_premio}</Typography>
                      <Typography>Descrição: {item.descricao}</Typography>
                      <Typography>Pontos para resgate: {item.pontos_resgate}</Typography>
                      <Typography>Valor em dinheiro: {item.valor_din}</Typography>
                      <Typography>Valor estimado para o premio: {item.valor_premio}</Typography>
                      {item.foto ? (
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
                              src={item.foto}
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
                      ) : (
                        <Typography sx={{ mt: 2 }}>Premio sem foto</Typography>
                      )}
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
                          Certeza que deseja excluir : {item.nome_premio}
                        </Typography>
                        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                          Ao excluir este pacote ele nao vai poder ser comprado por novos usuários
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
                  </>
                ))}
              </>
            )}
          </Cards>
        )}

        {selectedValue === '2' && (
          <Cards
            title={'Cadastro de Premios'}
            subTitle={'Cadastre novos premios para os usuários'}
            size={'100%'}
          >
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
                subTitle={'Cadastre os premios e as suas metas'}
                size={'50%'}
              >
                <FormControl>
                  <Typography variant='h5'>
                    Escolha o metodo que deseja cadastrar a premiação
                  </Typography>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    value={selectedValuePremios}
                    name='radio-buttons-group'
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value={'0'} control={<Radio />} label='Premio em dinheiro' />
                    <FormControlLabel value={'1'} control={<Radio />} label='Premio em itens' />
                    <FormControlLabel value={'2'} control={<Radio />} label='Ambas opções' />
                  </RadioGroup>
                </FormControl>
                <div
                  style={{
                    width: '100%',
                    height: '1px',
                    backgroundColor: 'var(--primary-color)',
                  }}
                />
                <>
                  {selectedValuePremios === '0' && (
                    <Box sx={{ my: 2 }}>
                      <Typography>Premio em dinheiro</Typography>
                      <TextField
                        label='Nome do premio'
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
                        label='Valor total estimado do premio'
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
                  {selectedValuePremios === '1' && (
                    <Box sx={{ my: 2 }}>
                      <Typography variant='h5'>Premio em Itens</Typography>
                      <TextField
                        label='Nome do premio'
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
                        onChange={(e) => changeForm('descricao', e.target.value)}
                        type='tel'
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
                        label='Valor total estimado do premio'
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
                      <Box sx={{ my: 2 }}>
                        <Typography>Adicione fotos dos itens no campo abaixo</Typography>
                        <Dropzone
                          accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
                          onDrop={(files) =>
                            setPremiosImg({ blob: files[0], url: URL.createObjectURL(files[0]) })
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
                  {selectedValuePremios === '2' && (
                    <>
                      <Box sx={{ my: 2 }}>
                        <Typography variant='h5'>Premio em dinheiro e itens</Typography>
                        <TextField
                          label='Nome do premio'
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
                          label='Premios disponiveis'
                          variant='standard'
                          value={mask(formData.quantidade, ['9999'])}
                          fullWidth
                          type='tel'
                          onChange={(e) => changeForm('quantidade', e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label='Meta em pontos'
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
                          label='Valor total estimado do premio'
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
                    <LoadingButton
                      variant='contained'
                      type='submit'
                      sx={{ m: 2 }}
                      loading={loading}
                    >
                      Cadastrar
                    </LoadingButton>
                  </Box>
                </>
              </Cards>
            </Box>
          </Cards>
        )}
      </>
    </>
  );
}
