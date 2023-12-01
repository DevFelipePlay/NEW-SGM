import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Modal,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import LoadingButton from '@mui/lab/LoadingButton';
import { upperCase } from 'lodash';
import { CSSProperties, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { mask } from 'remask';
import {
  IReqPostPlayCadastroDadosFinanceiros,
  postPlayCadastroDadosFinanceiros,
} from '../../../../../api';
import { postPlaySaqueUsuario } from '../../../../../api/ApisUtils/SaqueUsuario';
import { IResPostPlaySaqueUsuario } from '../../../../../api/ApisUtils/SaqueUsuario/IResPostPlaySaqueUsuario';
import { Cards, CustomTextField, Loading } from '../../../../../components';
import { useForm } from '../../../../../hooks';
import useUser from '../../../../../hooks/useUser';
import { errorToast } from '../../../../../utils';

export function Saque() {
  const [loading, setLoading] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [responseSaque, setResponseSaque] = useState<IResPostPlaySaqueUsuario>();
  const { user } = useUser();

  // Modal exclusao de pacotes
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const handleOpen = () => {
    setOpen(true);
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
    borderRadius: '10px',
    boxShadow: '24',
    backgroundColor: 'white',
    padding: '4rem',

    textAlign: 'center',
    border: 'none',
  };
  //////

  const { formData, changeForm } = useForm<IReqPostPlayCadastroDadosFinanceiros>({
    chave_pix: '',
    cpf_titular_pix: '',
    titular_pix: '',
    type_pix: '',
    cpf: user?.cpf ? user?.cpf : '',
  });

  const [validations, setValidation] = useState({
    chave_pix: false,
    cpf_titular_pix: false,
    cpf: false,
  });

  async function handleDataSaque() {
    setLoading(true);
    try {
      let payload = {
        cpf: user?.cpf ? user?.cpf : '',
      };
      const data = await postPlaySaqueUsuario(payload);
      setResponseSaque(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingSubmit(true);
    try {
      await postPlayCadastroDadosFinanceiros(formData);
      toast.success('Dados financeiros editados!');
      handleClose();
      handleDataSaque();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingSubmit(false);
    }
  }

  useEffect(() => {
    const isEmailValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.chave_pix) || formData.chave_pix === '';
    const isCpfValid = /^\d{11}$|^\d{14}$/.test(formData.cpf) || formData.cpf === '';
    const isCpfTitularValid =
      /^\d{11}$|^\d{14}$/.test(formData.cpf_titular_pix) || formData.cpf_titular_pix === '';
    setValidation({
      cpf: isCpfValid,
      chave_pix: isEmailValid,
      cpf_titular_pix: isCpfTitularValid,
    });

    console.log(formData);
  }, [formData]);

  useEffect(() => {
    handleDataSaque();
    console.log(responseSaque);
  }, []);

  return (
    <>
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
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Cards title={'Saldo'} subTitle={'Total disponivel para saque'} size={'100%'}>
              <Typography variant='h5' sx={{ mb: 2 }}>
                {responseSaque?.saldo_disponivel
                  ? `R$ ${responseSaque?.saldo_disponivel}`
                  : `Sem Saldo`}
              </Typography>
              <Button
                size='small'
                onClick={() => alert('Função temporariamente indisponivel')}
                variant='contained'
              >
                Solicitar saque
              </Button>
            </Cards>
            <Cards
              title={'Valor total já sacado'}
              subTitle={'Valor total já ganho até agora'}
              size={'100%'}
            >
              <Typography variant='h5' sx={{ mb: 2 }}>
                {responseSaque?.valor_total_sacado
                  ? `R$ ${responseSaque?.valor_total_sacado}`
                  : `Sem Saldo`}
              </Typography>
            </Cards>
          </Grid>
          <Grid item xs={8}>
            {responseSaque ? (
              <Cards
                title={'Seu QR Code'}
                subTitle={'Este é o pix que voce usa para receber o seu bonus'}
                size={'100%'}
                showIcon
              >
                <Box>
                  <Typography>
                    Chave PIX:{' '}
                    {responseSaque?.chave_pix !== 'cpf' ? (
                      responseSaque?.chave_pix
                    ) : (
                      <>
                        {mask(
                          responseSaque?.tipo_pix === 'cpf' && responseSaque?.chave_pix
                            ? responseSaque?.chave_pix
                            : '',
                          ['999.999.999-99']
                        )}
                      </>
                    )}
                  </Typography>
                  <Typography>Tipo: {upperCase(responseSaque?.tipo_pix)}</Typography>
                  <Typography>Titular: {responseSaque?.nome_titular_pix}</Typography>
                </Box>
                <Button
                  size='small'
                  onClick={() => handleOpen()}
                  variant='contained'
                  sx={{ mt: 2 }}
                >
                  Editar dados
                </Button>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby='modal-modal-title'
                  aria-describedby='modal-modal-description'
                >
                  <Box sx={style} component={'form'} onSubmit={handleSubmit}>
                    <Typography variant='h6'>Edite Seus Dados Financeiros</Typography>
                    <Typography variant='h6'>Selecione o tipo de pix</Typography>
                    <RadioGroup
                      aria-label='options'
                      name='options'
                      value={formData.type_pix}
                      onChange={(e) => changeForm('type_pix', e.target.value)}
                      sx={{ flexDirection: 'row' }}
                    >
                      <FormControlLabel value='telefone' control={<Radio />} label='Telefone' />
                      <FormControlLabel value='email' control={<Radio />} label='E-mail' />
                      <FormControlLabel value='cpf' control={<Radio />} label='CPF' />
                      <FormControlLabel
                        value='chaveAleatoria'
                        control={<Radio />}
                        label='Chave Aleatória'
                      />
                    </RadioGroup>

                    {formData.type_pix === 'telefone' && (
                      <CustomTextField
                        value={mask(formData.chave_pix, ['(99) 9 9999-9999'])}
                        onChange={(e) => changeForm('chave_pix', e.target.value)}
                        label='Telefone'
                        required
                      />
                    )}

                    {formData.type_pix === 'email' && (
                      <CustomTextField
                        value={formData.chave_pix}
                        label='E-mail'
                        onChange={(e) => changeForm('chave_pix', e.target.value)}
                        helperText={!validations.chave_pix ? 'O email deve ser valido' : ''}
                        error={!validations.chave_pix}
                        required
                      />
                    )}

                    {formData.type_pix === 'cpf' && (
                      <CustomTextField
                        label='Chave: CPF/CNPJ'
                        value={mask(formData.chave_pix || '', ['999.999.999-99'])}
                        onChange={(e) => changeForm('chave_pix', e.target.value.replace(/\D/g, ''))}
                        required
                      />
                    )}

                    {formData.type_pix === 'chaveAleatoria' && (
                      <CustomTextField
                        value={formData.chave_pix}
                        onChange={(e) => changeForm('chave_pix', e.target.value)}
                        label='Chave Aleatória'
                        required
                      />
                    )}

                    <CustomTextField
                      label='Nome do titular da conta'
                      value={formData.titular_pix}
                      onChange={(e) => changeForm('titular_pix', e.target.value)}
                    />
                    <CustomTextField
                      label='CPF/CNPJ do Titular'
                      value={mask(formData.cpf_titular_pix || '', [
                        '999.999.999-99',
                        '99.999.999/9999-99',
                      ])}
                      onChange={(e) =>
                        changeForm('cpf_titular_pix', e.target.value.replace(/\D/g, ''))
                      }
                      required
                      helperText={!validations.cpf_titular_pix ? 'CPF INVALIDO' : ''}
                      error={!validations.cpf_titular_pix}
                    />
                    <Box mt={2}>
                      <LoadingButton type='submit' variant='contained' loading={loadingSubmit}>
                        Editar
                      </LoadingButton>
                    </Box>
                  </Box>
                </Modal>
              </Cards>
            ) : (
              <Cards
                title={'Seu QR Code'}
                subTitle={'Este é o pix que voce usa para receber o seu bonus'}
                size={'100%'}
                showIcon
              >
                Sem dados Financeiros
              </Cards>
            )}
          </Grid>
        </Grid>
      )}
    </>
  );
}
