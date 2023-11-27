import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { postPlayRecuperaNiveisParceiro } from '../../../../../api';
import { IResPostPlayRecuperaNiveisParceiro } from '../../../../../api/ApisUtils/RecuperaNiveisParceiro/IResPostPlayRecuperaNiveisParceiro';
import { ListCustom } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';

export default function RedeDeUsuariosParceiroMMN() {
  const [loading, setLoading] = useState(false);
  const [responseList, setResponseList] = useState<IResPostPlayRecuperaNiveisParceiro[]>([]);
  const { user } = useUser();

  async function handleListRedeDeUsuarioMMN() {
    setLoading(true);

    let payload = {
      cpf: user?.cpf ? user?.cpf : '',
    };
    try {
      const data = await postPlayRecuperaNiveisParceiro(payload);
      setResponseList(data);
    } catch (error) {}
  }

  useEffect(() => {
    handleListRedeDeUsuarioMMN();
  }, []);

  return (
    <Box
      sx={{
        mb: 2,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Box
        sx={{
          width: '100%',
          m: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4'>Lista de usuários</Typography>
        <Button
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        >
          Cadastrar
        </Button>
      </Box>
      {responseList.map((item, index) => (
        <Box sx={{ width: '100%' }} key={index}>
          <ListCustom
            avatar={''}
            nome={item.usuarios.nome_titular_pix}
            cpf={'123123132'}
            editar={() => ''}
            excluir={() => ''}
            pressItemList={() => ''}
          />
        </Box>
      ))}

      <Stack spacing={2}>
        <Pagination
          count={10}
          renderItem={(item) => (
            <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
          )}
        />
      </Stack>
    </Box>
  );
}
