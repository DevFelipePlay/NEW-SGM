import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { postPLayVisualizaFaturas } from '../../../../../api';
import { IResPostPlayVisualizaFaturas } from '../../../../../api/ApisUtils/FaturasUsuario/IResPostPlayVisualizaFaturas';
import { Loading } from '../../../../../components';
import { ListFaturas } from '../../../../../components/ListCustom/ListFaturas';
import useUser from '../../../../../hooks/useUser';
import { dateFormatter, errorToast } from '../../../../../utils';

export function Faturas() {
  const [loading, setLoading] = useState(false);
  const [responseList, setResponseList] = useState<IResPostPlayVisualizaFaturas[]>([]);
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  async function handleListFaturas() {
    setLoading(true);

    let payload = {
      cpf: user?.cpf || '',
      token: user?.token || '',
    };
    try {
      const data = await postPLayVisualizaFaturas(payload);
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
        <ListFaturas
          colorStatus={item.paymentstatus === '0' ? '#dbbe00' : 'green'}
          dataDeCriacao={item.created ? dateFormatter(item.created) : 'Sem data de criação'}
          tipoDaFaturas={item.tipo}
          status={item.paymentstatus === '0' ? 'Pendente' : 'Pago'}
          valor={item.valuetopup}
          idFatura={item.paymentasaasid}
        />
      </Box>
    ));
  };

  useEffect(() => {
    handleListFaturas();
    console.log(responseList);
  }, []);

  return (
    <>
      {loading !== true && responseList.length === 0 ? (
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
            <Typography variant='h4'>Faturas</Typography>
          </Box>
          <Typography variant='h4' sx={{ mt: 10 }}>
            Não há faturas
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
                <Typography variant='h4'>Faturas</Typography>
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
