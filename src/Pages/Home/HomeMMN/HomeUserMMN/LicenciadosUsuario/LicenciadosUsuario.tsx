import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { mask } from 'remask';
import {
  IReqPostPlayLicenciados,
  IResPostPlayLicenciados,
  postPlayLicenciados,
} from '../../../../../api';
import { MUIDataTableCustom } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';
import { errorToast } from '../../../../../utils';

export function LicenciadosUsuario() {
  const [responseLicenciados, setResponseLicenciados] = useState<IResPostPlayLicenciados[]>([]);
  const [loadingViewLicenciados, setLoadingViewLicenciados] = useState(false);
  const { user } = useUser();

  async function handleLicenciados() {
    setLoadingViewLicenciados(true);

    const payload: IReqPostPlayLicenciados = {
      token: user?.token || '',
      UF: user?.UF || '',
    };
    try {
      const data = await postPlayLicenciados(payload);
      setResponseLicenciados(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingViewLicenciados(false);
    }
  }

  useEffect(() => {
    handleLicenciados();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant='h4' color={'var(--primary-color)'} sx={{ mt: 2 }}>
        Lista de vendedores licenciados perto de você!
      </Typography>
      <Box
        sx={{
          width: '100%',
          py: 2,
        }}
      >
        <MUIDataTableCustom
          title=''
          data={responseLicenciados && responseLicenciados}
          loading={loadingViewLicenciados}
          columns={[
            {
              name: 'nome',
              label: 'Nome',
            },
            {
              name: 'uf',
              label: 'UF',
            },
            {
              name: 'city',
              label: 'Cidade',
            },
            {
              name: 'telefone',
              label: 'Telefone',
              options: {
                customBodyRender: (value) => (
                  <Box sx={{ whiteSpace: 'nowrap' }}>{mask(value, '(99) 99999-9999')}</Box>
                ),
              },
            },
          ]}
        />
      </Box>
    </Box>
  );
}
