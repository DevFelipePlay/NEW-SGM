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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';
import { TbTrashX } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import {
  IResPostPlayVisualizaPremios,
  postPlayCadastroPremiacaoMMN,
  postPlayDeletarPremiacao,
  postPlayEditarImagemPremio,
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

  const [premiosEditImg, setPremiosEditImg] = useState<{
    [key: string]: { blob: Blob | null; url: string; idpremio: string };
  }>({});
  const handleDeletePhotoEdit = (index: number) => {
    setPremiosEditImg((prevImgs) => {
      const updatedImgs = { ...prevImgs };
      delete updatedImgs[index.toString()];
      return updatedImgs;
    });
  };

  // breakpoints
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));

  /////
  async function handleSubmitFoto(index: number, idpremio: string) {
    const dadosFotos = new FormData();

    const premioEditImg = premiosEditImg[index.toString()];
    if (premioEditImg) {
      dadosFotos.append('foto', premioEditImg.blob || '');
      // dadosFotos.append('token', user?.token || '');
      dadosFotos.append('idpremio', idpremio);
    }

    try {
      //@ts-ignore
      await postPlayEditarImagemPremio(dadosFotos);
      clearForm();
      handleDeletePhoto();
      setPremiosEditImg((prevImgs) => ({
        ...prevImgs,
        [index.toString()]: {
          blob: null,
          url: '',
          idpremio: idpremio,
        },
      }));
      handleView();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDropzoneChange = (files: any, index: number, idpremio: string) => {
    setPremiosEditImg((prevImgs) => ({
      ...prevImgs,
      [index.toString()]: {
        blob: files[0],
        url: URL.createObjectURL(files[0]),
        idpremio: idpremio,
      },
    }));
  };
  async function handleView() {
    setLoadingView(true);

    let payload = {
      token: user?.token || '',
    };
    try {
      const data = await postPlayVisualizaPremios(payload);
      setResponseView(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoadingView(false);
    }
  }

  async function handleEdit(index: number) {
    setLoadingEdit(true);

    try {
      const editedItem = editedValues[index];
      const item = responseView[index];

      const postData = {
        idpremio: editedItem?.id || item.id || '',
        nome_premio: editedItem?.nome_premio || item.nome_premio || '',
        descricao: editedItem?.descricao || item.descricao || '',
        tempo_expiracao: editedItem?.tempo_expiracao || item.tempo_expiracao || '',
        valor_din: editedItem?.valor_din || item.valor_din || '',
        valor_premio: editedItem?.valor_premio || item.valor_premio || '',
        pontos_resgate: editedItem?.pontos_resgate || item.pontos_resgate || '',
        cpf: user?.cpf || '',
      };

      //@ts-ignore
      await postPlayEditaPremios(postData);
      toast.success('Graduações Editados!');
      handleView();
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
    width: `${smDown ? '300px' : '400px'}`,
    borderRadius: '10px',
    boxShadow: '24',
    backgroundColor: 'var(--backGround-sideBar-color)',
    color: 'var(--text-color)',
    padding: `${smDown ? '1rem' : '4rem'}`,
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

  //   Cadastro dos nosvos prêmios
  const [selectedValuePremios, setSelectedValuePremios] = useState('0');
  const [loading, setLoading] = useState(false);
  const [premiosImg, setPremiosImg] = useState<{
    blob: Blob | null;
    url: string;
  }>({
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
      <Cards title={'Configure seus Prêmios'} subTitle={' '} size={'100%'}>
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
            <FormControlLabel value='0' control={<Radio />} label='Editar prêmios já existentes' />
            <FormControlLabel value='1' control={<Radio />} label='Excluir prêmios' />
            <FormControlLabel value='2' control={<Radio />} label='Acrescentar um novo prêmio' />
          </RadioGroup>
        </FormControl>
      </Cards>

      <>
        {selectedValue === '0' && (
          <Cards title={'Edição de Prêmios'} subTitle={'Edite seus prêmios'} size={'100%'}>
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
                      subTitle={'Prêmios'}
                      size={mdDown ? '100%' : '50%'}
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
                        label={'Nome do Prêmio'}
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
                        label={'Descrição'}
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
                        sx={{ mb: 2, mt: 1 }}
                        value={
                          editedValues[index]?.valor_din !== undefined
                            ? editedValues[index]?.valor_din
                            : currencyMask(item.valor_din ? item?.valor_din : '')
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
                            : currencyMask(item.valor_premio ? item?.valor_premio : '')
                        }
                        fullWidth
                        onChange={(e) =>
                          handleEditChange(index, 'valor_premio', currencyMask(e.target.value))
                        }
                        label={'Valor estimado do prêmio'}
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>R$</InputAdornment>,
                        }}
                      />
                      {item.foto && (
                        <>
                          <Typography sx={{ marginTop: '2rem', mb: 1 }}>Foto atual:</Typography>
                          <img
                            src={`data:image/png;base64,${item.foto}`}
                            style={{
                              width: '200px',
                              borderRadius: '10px',
                              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                              marginBottom: '2rem',
                            }}
                          />
                        </>
                      )}

                      <>
                        {premiosEditImg[index.toString()] && (
                          <>
                            <Typography sx={{ marginTop: '2rem', mb: 1 }}>Nova Foto:</Typography>
                            <img
                              src={premiosEditImg[index.toString()].url}
                              style={{
                                width: '200px',
                                borderRadius: '10px',
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                              }}
                            />
                            <IconButton onClick={() => handleDeletePhotoEdit(index)} size='small'>
                              <DeleteIcon color='error' />
                            </IconButton>
                            <IconButton
                              onClick={() => handleSubmitFoto(index, item.id.toString())}
                              size='small'
                            ></IconButton>
                          </>
                        )}
                        <Typography>
                          Adicione uma nova foto do item no campo abaixo para editá-las
                        </Typography>
                        <Dropzone
                          accept={{ 'image/*': ['.png', '.jpeg', '.jpg'] }}
                          onDrop={(files) => handleDropzoneChange(files, index, item.id.toString())}
                        />
                      </>
                      <LoadingButton
                        variant='contained'
                        onClick={() => {
                          handleSubmitFoto(index, item.id.toString());
                          handleEdit(index);
                        }}
                        sx={{ mt: 2 }}
                        loading={loadingEdit}
                      >
                        Editar
                      </LoadingButton>
                    </Cards>
                  </>
                ))}
              </>
            )}
          </Cards>
        )}
        {selectedValue === '1' && (
          <Cards
            title={'Exclusão de Prêmios'}
            subTitle={'Exclua prêmios do seu módulo'}
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
                      subTitle={'Prêmio'}
                      size={'100%'}
                      key={index}
                    >
                      <Typography>Nome: {item.nome_premio}</Typography>
                      <Typography>Descrição: {item.descricao}</Typography>
                      <Typography>Pontos para resgate: {item.pontos_resgate}</Typography>
                      <Typography>Valor em dinheiro: {item.valor_din}</Typography>
                      <Typography>Valor estimado para o prêmio: {item.valor_premio}</Typography>
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
                              src={`data:image/jpeg;base64,${item.foto}`}
                              style={{
                                width: '500px',
                                borderRadius: '1rem',
                              }}
                            />
                          </Box>
                        </Box>
                      ) : (
                        <Typography sx={{ mt: 2 }}>Prêmio sem foto</Typography>
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
                          Ao excluir este pacote ele não vai poder ser comprado por novos usuários
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
            title={'Cadastro de Prêmios'}
            subTitle={'Cadastre novos prêmios para os usuários'}
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
                subTitle={'Cadastre os prêmios e as suas metas'}
                size={mdDown ? '100%' : '50%'}
              >
                <FormControl>
                  <Typography variant='h5'>
                    Escolha o método que deseja cadastrar a premiação
                  </Typography>
                  <RadioGroup
                    aria-labelledby='demo-radio-buttons-group-label'
                    value={selectedValuePremios}
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
                    backgroundColor: 'var(--primary-color)',
                  }}
                />
                <>
                  {selectedValuePremios === '0' && (
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
                        value={mask(formData.pontos_resgate, [
                          '9999999999999999999999999999999999999999999999',
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
                      <Typography variant='h5'>Prêmio em Itens</Typography>
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
                        onChange={(e) => changeForm('descricao', e.target.value)}
                        type='tel'
                        sx={{ mb: 2 }}
                      />

                      <TextField
                        label='Pontos para resgate'
                        variant='standard'
                        value={mask(formData.pontos_resgate, [
                          '9999999999999999999999999999999999999999999999',
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
                  {selectedValuePremios === '2' && (
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
                          value={mask(formData.quantidade, ['9999'])}
                          fullWidth
                          type='tel'
                          onChange={(e) => changeForm('quantidade', e.target.value)}
                          sx={{ mb: 2 }}
                        />
                        <TextField
                          label='Meta em pontos'
                          variant='standard'
                          value={mask(formData.pontos_resgate, [
                            '9999999999999999999999999999999999999999999999',
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
