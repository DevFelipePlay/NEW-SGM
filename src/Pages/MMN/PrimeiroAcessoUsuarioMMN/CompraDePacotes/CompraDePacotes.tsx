import {
  Box,
  Button,
  Grid,
  Modal,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { PiHandCoins } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';
import { useEffect, useState } from 'react';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { StepsCadastroUserMMN } from '..';

import { MdOutlineContentCopy } from 'react-icons/md';
import {
  IReqPostPlayValidaLicenciamento,
  IReqPostPlayVisualizaFaturasPacotes,
  IResPostPlayGeraFaturaLicenciamento,
  IResPostPlayRecuperaPacotesLicenciamento,
  IResPostPlayValidaLicenciamento,
  IResPostPlayVisualizaFaturasPacotes,
  postPlayGeraFaturaLicenciamento,
  postPlayRecuperaPacotesLicenciamento,
  postPlayValidaLicenciamento,
  postPLayVisualizaFaturasPacotes as postPlayVisualizaFaturasPacotes,
} from '../../../../api';
import { Cards, Loading } from '../../../../components';
import { useCopyToClipboard } from '../../../../hooks/useCopyToClipboard';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';

export function CompraDePacotes() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [responseBuy, setResponseBuy] = useState<IResPostPlayGeraFaturaLicenciamento>();
  const [loadingValidaLicenciamento, setLoadingValidaLicenciamento] = useState(false);

  //breakpoints
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  //

  const { user } = useUser();

  const [response, setResponse] = useState<IResPostPlayRecuperaPacotesLicenciamento[]>([]);
  const [responseValidaLicenciamento, setResponseValidaLicenciamento] =
    useState<IResPostPlayValidaLicenciamento>();
  const [responseVisualizaFaturaPacotes, setResponseVisualizaFaturaPacotes] = useState<
    IResPostPlayVisualizaFaturasPacotes[]
  >([]);
  const [loading, setLoading] = useState(false);

  const [loadingBuy, setLoadingBuy] = useState(false);
  const navigate = useNavigate();

  //@ts-ignore
  const [value, copy] = useCopyToClipboard();

  function copyToText(index: string) {
    copy(`https://indicacao.opuscell.com.br/#/${index}`);
    toast.success('Copiado para area de transferência');
  }

  //estilo modal
  const style = {
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
  //

  async function handleSubmit() {
    setLoading(true);

    let payload = {
      token: user?.token ? user?.token : '',
    };

    try {
      const data = await postPlayRecuperaPacotesLicenciamento(payload);
      setResponse(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }
  async function handleValidateLicenciamento() {
    setLoadingValidaLicenciamento(true);
    try {
      const payloadValidaLicenciamento: IReqPostPlayValidaLicenciamento = {
        cpf: user?.cpf || '',
      };
      const data = await postPlayValidaLicenciamento(payloadValidaLicenciamento);
      setResponseValidaLicenciamento(data);
    } catch (error: any) {
      errorToast(error);
    }
    try {
      const payloadVisualizaFaturasPacotes: IReqPostPlayVisualizaFaturasPacotes = {
        cpf: user?.cpf || '',
        token: user?.token || '',
      };
      const data = await postPlayVisualizaFaturasPacotes(payloadVisualizaFaturasPacotes);
      setResponseVisualizaFaturaPacotes(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingValidaLicenciamento(false);
    }
  }

  async function handleBuyPacks(packageId: string) {
    setLoadingBuy(true);

    let payload = {
      token: user?.token ? user?.token : '',
      cpf: user?.cpf ? user?.cpf : '',
      id: packageId,
    };

    try {
      const data = await postPlayGeraFaturaLicenciamento(payload);
      setResponseBuy(data);
      toast.success('Solicitação de compra realizada');
      handleOpen();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingBuy(false);
    }
  }

  useEffect(() => {
    handleValidateLicenciamento();
    handleSubmit();
  }, []);

  return (
    <StepsCadastroUserMMN step={0}>
      <>
        {loadingValidaLicenciamento ? (
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
            {responseValidaLicenciamento?.status_licenciamento === 0 && (
              <>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    width: '100%',
                  }}
                >
                  <Typography variant='h4'>Pacotes</Typography>
                  <Typography>Escolha o melhor pacote para você</Typography>
                  {loading ? (
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
                    <Box width={'100%'}>
                      <>
                        {response.length !== 1 ? (
                          <Grid container width={'100%'}>
                            {response &&
                              response.map((i: IResPostPlayRecuperaPacotesLicenciamento, index) => (
                                <Grid item xs={4} key={index}>
                                  <Cards
                                    title={i.nome}
                                    subTitle={'Escolha o seu pacote'}
                                    size={
                                      smDown
                                        ? '100vm'
                                        : mdDown
                                        ? '200px'
                                        : lgDown
                                        ? '200px'
                                        : '350px'
                                    }
                                    showIcon
                                    bgColorIcon='var(--primary-color)'
                                    icon={<PiHandCoins />}
                                  >
                                    <Typography> Acesso ao multinivel +</Typography>
                                    <Typography>{i.chips} Chips </Typography>

                                    <Typography
                                      variant='subtitle2'
                                      color={'var(--sub-text-color)'}
                                      sx={{ mt: 2 }}
                                    >
                                      Por apenas:
                                    </Typography>
                                    <Typography variant='h5'>R$ {i.valor_venda}</Typography>
                                    <LoadingButton
                                      onClick={() => handleBuyPacks(i.id)}
                                      variant='contained'
                                      sx={{ mt: 2 }}
                                      loading={loadingBuy}
                                    >
                                      Contratar
                                    </LoadingButton>
                                  </Cards>
                                </Grid>
                              ))}
                          </Grid>
                        ) : (
                          <>
                            {response.map((i, index) => (
                              <Box
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                                key={index}
                              >
                                <Cards
                                  title={i.nome}
                                  subTitle={'Escolha o seu pacote'}
                                  size={
                                    smDown ? '100vm' : mdDown ? '200px' : lgDown ? '200px' : '350px'
                                  }
                                  showIcon
                                  bgColorIcon='var(--primary-color)'
                                  icon={<PiHandCoins />}
                                >
                                  <Typography> Acesso ao multinivel +</Typography>
                                  <Typography>{i.chips} Chips </Typography>

                                  <Typography
                                    variant='subtitle2'
                                    color={'var(--sub-text-color)'}
                                    sx={{ mt: 2 }}
                                  >
                                    Por apenas:
                                  </Typography>
                                  <Typography variant='h5'>R$ {i.valor_venda}</Typography>
                                  <LoadingButton
                                    onClick={() => handleBuyPacks(i.id)}
                                    variant='contained'
                                    sx={{ mt: 2 }}
                                    loading={loadingBuy}
                                  >
                                    Contratar
                                  </LoadingButton>
                                </Cards>
                              </Box>
                            ))}
                          </>
                        )}
                      </>
                    </Box>
                  )}
                  <Button
                    onClick={() => navigate('/primeiro-acesso-multinivel-usuario/ativacao-linha')}
                    variant='outlined'
                    sx={{ my: 2 }}
                    color='secondary'
                  >
                    Continuar sem comprar
                  </Button>
                </Box>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={{ ...style, textAlign: 'center' }}>
                    <Typography id='modal-modal-title' variant='h6' component='h2' sx={{ mb: 2 }}>
                      Sua solicitação de compra foi realizada, clique no link e pague sua fatura ou
                      visualize a fatura pelo seu aplicativo:
                    </Typography>
                    <Box
                      sx={{
                        backgroundColor: 'white',
                        p: 1,
                        borderRadius: '10px',
                        wordBreak: 'break-all',
                      }}
                    >
                      <a
                        id='modal-modal-description'
                        href={`https://faturammn.operadora.app.br/?payid=${responseBuy?.payid}`}
                        target='_blank'
                      >
                        <Typography>
                          https://faturammn.operadora.app.br/?payid=
                          {responseBuy?.payid}
                        </Typography>
                      </a>
                    </Box>
                    <Button
                      variant='contained'
                      sx={{ mt: 2 }}
                      onClick={() => navigate('/primeiro-acesso-multinivel-usuario/ativacao-linha')}
                    >
                      Continuar cadastro
                    </Button>
                  </Box>
                </Modal>
              </>
            )}
          </>
        )}
        {responseValidaLicenciamento?.status_licenciamento === 1 && (
          <>
            {loadingValidaLicenciamento ? (
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
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: {
                    xs: 'center',
                    sm: 'inherit',
                  },
                }}
              >
                <Typography variant='h4'>
                  Você possui uma compra de licenciamento em andamento
                </Typography>

                {responseVisualizaFaturaPacotes
                  .filter((item) => item.tipo === 'Licenciamento')
                  .map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Cards title={`Fatura de ${item.tipo} em Aberto`} subTitle={''} size={'90%'}>
                        <Link
                          to={`https://faturammn.operadora.app.br/?payid=${item?.paymentasaasid}`}
                          target='_blank'
                        >
                          https://faturammn.operadora.app.br/?payid=$
                          {item?.paymentasaasid}
                        </Link>
                      </Cards>
                    </Box>
                  ))}
                <Button
                  variant='outlined'
                  color='secondary'
                  sx={{ my: 2 }}
                  onClick={() => navigate('/primeiro-acesso-multinivel-usuario/ativacao-linha')}
                >
                  Continuar cadastro
                </Button>
              </Box>
            )}
          </>
        )}
        {responseValidaLicenciamento?.status_licenciamento === 2 && (
          <>
            {loadingValidaLicenciamento ? (
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
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  textAlign: {
                    xs: 'center',
                    md: 'inherit',
                  },
                }}
              >
                <Typography variant='h4'>
                  Você possui uma compra de licenciamento concluída!
                </Typography>
                <Box sx={{ fontSize: '5rem', color: 'green' }}>
                  <IoIosCheckmarkCircleOutline />
                </Box>

                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Cards
                    title={`Link de indicação`}
                    subTitle={
                      'Agora você pode começar a utilizar o seu link de indicação para criar a sua rede de usuários!'
                    }
                    size={'100%'}
                  >
                    <Tooltip title={'Copiar'}>
                      <Box
                        onClick={() => copyToText(responseValidaLicenciamento.link_indicacao)}
                        sx={{
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: {
                            xs: 'column',
                            sm: 'row',
                          },
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '100%',
                          fontSize: '1.5rem',
                          wordBreak: 'break-all',
                          gap: {
                            xs: 2,
                            sm: 0,
                          },
                        }}
                        color={'var(--primary-color)'}
                      >
                        <Typography
                          sx={{
                            marginRight: {
                              xs: '0',
                              sm: '2rem',
                            },
                            fontSize: '1.5rem',
                          }}
                        >
                          {`https://indicacao.opuscell.com.br/#/${responseValidaLicenciamento.link_indicacao}`}
                        </Typography>
                        <MdOutlineContentCopy />
                      </Box>
                    </Tooltip>
                  </Cards>
                </Box>

                <Button
                  variant='outlined'
                  color='secondary'
                  sx={{ my: 2 }}
                  onClick={() => navigate('/primeiro-acesso-multinivel-usuario/ativacao-linha')}
                >
                  Continuar cadastro
                </Button>
              </Box>
            )}
          </>
        )}
      </>
    </StepsCadastroUserMMN>
  );
}
