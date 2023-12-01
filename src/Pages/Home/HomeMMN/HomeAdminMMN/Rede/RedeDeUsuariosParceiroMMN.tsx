import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mask } from 'remask';
import { postPlayRecuperaNiveisParceiro } from '../../../../../api';
import { IResPostPlayRecuperaNiveisParceiro } from '../../../../../api/ApisUtils/RecuperaNiveisParceiro/IResPostPlayRecuperaNiveisParceiro';
import { ListCustom, Loading } from '../../../../../components';
import useUser from '../../../../../hooks/useUser';
import { errorToast } from '../../../../../utils';

export default function RedeDeUsuariosParceiroMMN() {
  const [loading, setLoading] = useState(false);
  const [responseList, setResponseList] = useState<IResPostPlayRecuperaNiveisParceiro[]>([]);
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const renderPaginatedList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = responseList.slice(startIndex, endIndex);

    return paginatedItems.map((item, index) => (
      <Box sx={{ width: '100%' }} key={index}>
        <ListCustom
          avatar={''}
          nome={item.nome}
          cpf={mask(item.cpf, ['999.999.999-99', '99.999.999/9999-99'])}
          editar={() => ''}
          excluir={() => ''}
          pressItemList={() => navigate(`/daashboard-relatorio-usuario-mmn/${item.cpf}`)}
        />
      </Box>
    ));
  };

  useEffect(() => {
    handleListRedeDeUsuarioMMN();
    console.log(responseList);
  }, []);

  return (
    <>
      {responseList.length === 0 ? (
        <>
          <Box
            sx={{
              width: '100%',
              m: 1,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant='h4'>Rede de usuários</Typography>
            <Button
              onClick={function (): void {
                throw new Error('Function not implemented.');
              }}
              variant='contained'
            >
              Cadastrar
            </Button>
          </Box>
          <Typography variant='h4' sx={{ mt: 10 }}>
            Sem usuários cadastrados
          </Typography>
        </>
      ) : (
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
                <Typography variant='h4'>Rede de usuários</Typography>
                <Button
                  onClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  variant='contained'
                >
                  Cadastrar
                </Button>
              </Box>
              {renderPaginatedList()}

              <Stack spacing={2}>
                <Pagination
                  count={Math.ceil(responseList.length / itemsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  renderItem={(item) => (
                    <PaginationItem
                      slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                      {...item}
                    />
                  )}
                />
              </Stack>
            </Box>
          )}
        </>
      )}
    </>
  );
}
