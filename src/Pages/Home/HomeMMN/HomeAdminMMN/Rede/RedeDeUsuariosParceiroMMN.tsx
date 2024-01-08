import { Box, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mask } from 'remask';
import { postPlayRecuperaNiveisParceiro } from '../../../../../api';
import { IResPostPlayRecuperaNiveisParceiro } from '../../../../../api/ApisUtils/RecuperaNiveisParceiro/IResPostPlayRecuperaNiveisParceiro';
import { FlexBox, MUIDataTableCustom } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';
import { errorToast } from '../../../../../utils';

export default function RedeDeUsuariosParceiroMMN() {
  const [loading, setLoading] = useState(false);
  const [responseList, setResponseList] = useState<IResPostPlayRecuperaNiveisParceiro[]>([]);
  const { user } = useUser();

  const navigate = useNavigate();

  async function handleListRedeDeUsuarioMMN() {
    setLoading(true);

    let payload = {
      cpf: user?.cpf ? user?.cpf : '',
    };
    try {
      const data = await postPlayRecuperaNiveisParceiro(payload);
      setResponseList(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    handleListRedeDeUsuarioMMN();
    console.log(responseList);
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
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
              Usuários
            </Typography>
          </FlexBox>
          <MUIDataTableCustom
            title=''
            data={responseList}
            options={{
              // @ts-ignore
              onRowClick: (d, { dataIndex }) => {
                responseList[dataIndex].cpf;
                navigate(`/daashboard-relatorio-usuario-mmn/${responseList[dataIndex].cpf}`);
              },
            }}
            loading={loading}
            columns={[
              {
                name: 'nome',
                label: 'Nome',
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
                name: 'ativo',
                label: 'Status',
                options: {
                  customBodyRender: (value) => (
                    <Box sx={{ textAlign: 'center' }}> {value === true ? 'Ativo' : 'Inativo'}</Box>
                  ),
                },
              },
              {
                name: 'licenciado',
                label: 'Licenciado',
                options: {
                  customBodyRender: (value) => (
                    <Box sx={{ textAlign: 'center' }}>
                      {' '}
                      {value === true ? 'Licenciado' : 'Não Licenciado'}
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
                name: 'cep',
                label: 'CEP',
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
                name: 'district',
                label: 'Bairro',
              },
              {
                name: 'complement',
                label: 'Complemento',
                options: {
                  customBodyRender: (value) => (
                    <Box sx={{ textAlign: 'center' }}>
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
                    <Box sx={{ textAlign: 'center' }}>{value === null ? 'Sem Número' : value}</Box>
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
