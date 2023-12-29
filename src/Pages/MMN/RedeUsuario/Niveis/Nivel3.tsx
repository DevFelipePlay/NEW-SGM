import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { mask } from 'remask';
import {
  IReqPostPlayRedeUsuario,
  IResPostPlayRedeUsuario,
  postPlayRedeUsuario,
} from '../../../../api';
import { FlexBox, MUIDataTableCustom } from '../../../../components';
import useUser from '../../../../hooks/useUser';
import { errorToast } from '../../../../utils';

export function Nivel3() {
  const [loading, setLoading] = useState(false);
  const [responseView, setResponseView] = useState<IResPostPlayRedeUsuario[]>([]);
  const { user } = useUser();

  async function handleView() {
    setLoading(true);

    const payload: IReqPostPlayRedeUsuario = {
      cpf: user?.cpf || '',
    };
    try {
      const data = await postPlayRedeUsuario(payload, 2);
      setResponseView(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleView();
  }, []);

  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      <FlexBox sx={{ gap: 2 }}>
        <Paper elevation={3} sx={{ mt: 2, p: 2 }}>
          <FlexBox
            sx={{
              flexDirection: 'row',
              alignItems: 'center',
              textAlign: {
                xs: 'center',
                sm: 'initial',
              },
            }}
          >
            <Typography variant='h4' gutterBottom flexGrow={1} sx={{ mt: 2 }}>
              Usuários de nível 3
            </Typography>
          </FlexBox>
          <MUIDataTableCustom
            title=''
            data={responseView}
            loading={loading}
            columns={[
              {
                name: 'nome',
                label: 'Nome',
              },
              {
                name: 'nivel',
                label: 'Nivel',
              },
              {
                name: 'licenciado',
                label: 'Licenciado',
                options: {
                  customBodyRender: (value) => (
                    <Box sx={{ textAlign: 'center' }}>
                      {' '}
                      {value === true ? 'Licenciado' : 'Sem licença'}
                    </Box>
                  ),
                },
              },

              {
                name: 'graduacao',
                label: 'Graduação',
                options: {
                  customBodyRender: (value) => (
                    <Box sx={{ textAlign: 'center' }}>
                      {' '}
                      {value === null ? 'Sem Graduação' : value}
                    </Box>
                  ),
                },
              },
              {
                name: 'cpf',
                label: 'CPF',
                options: {
                  customBodyRender: (value) => (
                    <Box sx={{ whiteSpace: 'nowrap' }}>{mask(value, '999.999.999-99')}</Box>
                  ),
                },
              },
              {
                name: 'email',
                label: 'E-Mail',
              },

              {
                name: 'cep',
                label: 'CEP',
              },
              {
                name: 'cidade',
                label: 'Cidade',
              },
              {
                name: 'uf',
                label: 'UF',
              },
              {
                name: 'distrito',
                label: 'Bairro',
              },
              {
                name: 'street',
                label: 'Logradouro',
              },
              {
                name: 'complement',
                label: 'Complemento',
                options: {
                  customBodyRender: (value) => (
                    <Box sx={{ textAlign: 'center' }}>
                      {' '}
                      {value === null ? 'Sem Complemento' : value}
                    </Box>
                  ),
                },
              },
              {
                name: 'number',
                label: 'Número',
                options: {
                  customBodyRender: (value) => (
                    <Box sx={{ textAlign: 'center' }}> {value === null ? 'Sem Numero' : value}</Box>
                  ),
                },
              },
            ]}
          />
        </Paper>
      </FlexBox>
    </Box>
  );
}
