import { Box, Button, Grid, Typography } from '@mui/material';

import { upperCase } from 'lodash';
import { useEffect, useState } from 'react';
import { mask } from 'remask';
import { postPlaySaqueUsuario } from '../../../../../api/ApisUtils/SaqueUsuario';
import { IResPostPlaySaqueUsuario } from '../../../../../api/ApisUtils/SaqueUsuario/IResPostPlaySaqueUsuario';
import { Cards, Loading } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';

export function Saque() {
  const [loading, setLoading] = useState(false);
  const [responseSaque, setResponseSaque] = useState<IResPostPlaySaqueUsuario>();
  const { user } = useUser();

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
                R$ {responseSaque?.saldo_disponivel}
              </Typography>
              <Button size='small' onClick={() => ''} variant='contained'>
                Solicitar saque
              </Button>
            </Cards>
            <Cards
              title={'Valor total já sacado'}
              subTitle={'Valor total já ganho até agora'}
              size={'100%'}
            >
              <Typography variant='h5' sx={{ mb: 2 }}>
                R$ {responseSaque?.valor_total_sacado}
              </Typography>
            </Cards>
          </Grid>
          <Grid item xs={8}>
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
              <Button size='small' onClick={() => ''} variant='contained' sx={{ mt: 2 }}>
                Editar dados
              </Button>
            </Cards>
          </Grid>
        </Grid>
      )}
    </>
  );
}
