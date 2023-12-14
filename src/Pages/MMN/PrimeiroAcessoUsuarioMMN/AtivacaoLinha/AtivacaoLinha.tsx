import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { CSSProperties, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import { StepsCadastroUserMMN } from '..';
import {
  IReqPostPlayAtivacaoLinha,
  IReqPostPlayRecuperaPlanosPreferidos,
  IresPostPlayRecuperaPlanosPreferidos,
  postPlayAtivacaoLinha,
  postPlayRecuperaPlanosPreferidos,
} from '../../../../api';
import { postPlayValidaICCID } from '../../../../api/ApisUtils/validaICCID';
import { Cards } from '../../../../components';
import { useForm } from '../../../../hooks';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';

export function AtivacaoLinha() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [loadingValidate, setLoadingValidate] = useState(false);
  const [loadingValidateICCID, setLoadingValidateICCID] = useState(false);
  const [isIccidValid, setIsIccidValid] = useState<boolean>(false);
  const [responsePLanosPreferidos, setResponsePLanosPreferidos] = useState<
    IresPostPlayRecuperaPlanosPreferidos[]
  >([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
    width: '80%',
    height: '95vh',
    borderRadius: '10px',
    boxShadow: '24',
    backgroundColor: 'white',
    color: 'black)',
    padding: 1,
    textAlign: 'center',
    border: 'none',
    overflowY: 'scroll',
    overflowX: 'hidden',
    paddingBottom: 2,
  };

  async function handlePlanosPreferidos() {
    let payload: IReqPostPlayRecuperaPlanosPreferidos = {
      token: user?.token ? user.token : '',
    };
    try {
      const data = await postPlayRecuperaPlanosPreferidos(payload);
      setResponsePLanosPreferidos(data);
    } catch (error: any) {
      errorToast(error);
    }
  }

  const { formData, changeForm } = useForm<IReqPostPlayAtivacaoLinha>({
    cpf: user?.cpf ? user?.cpf : '',
    iccid: '',
    ddd: '',

    pospago: false,
    token: user?.token ? user.token : '',
  });

  async function handleValidate(id: string, planid: string) {
    setLoadingValidate(true);

    const postData = {
      ...formData,
      planid_personalizado: id,
      planid: planid,
    };
    try {
      await postPlayAtivacaoLinha(postData);
      toast.success('Sua fatura foi gerada e poderá ser vista no aplicativo');
      navigate('/primeiro-acesso-multinivel-usuario/cadastro-dados-financeiros-usuario');
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingValidate(false);
    }
  }

  async function handleValidateICCID() {
    setLoadingValidateICCID(true);
    let payload = {
      iccid: formData.iccid ? formData.iccid : '',
      cpf: user?.cpf ? user?.cpf : '',
    };
    try {
      await postPlayValidaICCID(payload);
      setIsIccidValid(true);
      toast.success('Seu ICCID é valido');
    } catch (error: any) {
      errorToast(error);
      setIsIccidValid(false);
    } finally {
      setLoadingValidateICCID(false);
    }
  }

  useEffect(() => {
    if (formData.iccid.length === 19) {
      handleValidateICCID();
    }
  }, [formData.iccid]);

  useEffect(() => {
    handlePlanosPreferidos();
  }, []);

  return (
    <StepsCadastroUserMMN step={1}>
      <Box
        sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        component={'form'}
        onSubmit={handleShowModal}
      >
        <Cards
          title='Ative a sua linha'
          subTitle='Ative sua linha para ter acesso ao modulo'
          size={smDown ? '100%' : '50%'}
        >
          <Typography variant={'subtitle2'} color={'#808080'} sx={{ mt: 2 }}>
            Escolha seu DDD
          </Typography>
          <Select
            required
            label={'DDD'}
            variant={'standard'}
            value={formData.ddd}
            onChange={(e) => changeForm('ddd', e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {Array.from({ length: 89 }, (_, index) => (
              <MenuItem key={index} value={(index + 11).toString().padStart(2, '0')}>
                {(index + 11).toString().padStart(2, '0')}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label='Número do ICCID'
            type='tel'
            value={mask(formData.iccid, ['9999999999999999999'])}
            variant='standard'
            onChange={(e) => changeForm('iccid', e.target.value)}
            helperText={
              !isIccidValid
                ? 'O ICCID não é valido, o numero do iccid encontra-se abaixo do codigo de barras do seu chip'
                : 'O numero do iccid encontra-se abaixo do codigo de barras do seu chip'
            }
            fullWidth
            error={formData.iccid.length > 19 && !isIccidValid}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  {loadingValidateICCID ? <CircularProgress size={'20px'} /> : ''}
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            loading={loadingValidate}
            variant='contained'
            type='submit'
            sx={{ mt: 2 }}
            disabled={isIccidValid === false}
          >
            Escolher plano
          </LoadingButton>
          <LoadingButton
            loading={loadingValidate}
            variant='outlined'
            onClick={() =>
              navigate('/primeiro-acesso-multinivel-usuario/cadastro-dados-financeiros-usuario')
            }
            sx={{ mt: 2 }}
            color='warning'
          >
            Já Possuo uma linha ativa
          </LoadingButton>
        </Cards>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
        >
          <Box sx={style}>
            <Box width={{ mt: 0, width: '80%', maxHeight: '75vh', pb: 5 }}>
              <Typography variant='h5'>Escolha seu plano</Typography>
              {responsePLanosPreferidos.map((i, index) => (
                <Cards title={i.nomeplano} subTitle={'Escolha seu plano'} size={'100%'} key={index}>
                  <Typography>{i.descricao}</Typography>
                  <Typography variant='h4' sx={{ mt: 2 }} color={'var(--primary-color)'}>
                    R$ {i.value}
                  </Typography>
                  <Button
                    variant='contained'
                    sx={{ mt: 2 }}
                    onClick={() => handleValidate(i.id, i.planid)}
                  >
                    Comprar e ativar
                  </Button>
                </Cards>
              ))}
              <Box height={'10px'} />
            </Box>
          </Box>
        </Modal>
      </Box>
    </StepsCadastroUserMMN>
  );
}
