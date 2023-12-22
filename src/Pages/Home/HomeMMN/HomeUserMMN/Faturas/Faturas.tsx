import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import Tab from '@mui/material/Tab';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { IResPostPlayVisualizaFaturas } from '../../../../../api';
import {
  IResPostPlayVisualizaFaturasPacotes,
  postPLayVisualizaFaturasPacotes,
  postPlayVisualizaFaturasAtivacaoERecarga,
} from '../../../../../api/ApisUtils/FaturasUsuario';
import {
  ListFaturasAtivacaoERecarga,
  ListFaturasPacotes,
  Loading,
} from '../../../../../components';
import { dateFormatter, errorToast } from '../../../../../utils';
import useUser from '../../../../hooks/useUser';

export function Faturas() {
  const [loading, setLoading] = useState(false);
  const [responseListAtivacaoERecarga, setResponseListAtivacaoERecarga] = useState<
    IResPostPlayVisualizaFaturas[]
  >([]);
  const [responseListPacotes, setResponseListPacotes] = useState<
    IResPostPlayVisualizaFaturasPacotes[]
  >([]);
  const { user } = useUser();
  const [currentPagePacotes, setCurrentPagePacotes] = useState(1);
  const [currentPageAtivacaoERecarga, setCurrentPageAtivacaoERecarga] = useState(1);
  const itemsPerPage = 5;

  async function handleListFaturas() {
    setLoading(true);

    let payload = {
      cpf: user?.cpf || '',
      token: user?.token || '',
    };
    try {
      const data = await postPlayVisualizaFaturasAtivacaoERecarga(payload);
      setResponseListAtivacaoERecarga(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
    try {
      const data = await postPLayVisualizaFaturasPacotes(payload);
      setResponseListPacotes(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  //////////////// Tabs //////////////
  const [value, setValue] = useState('1');
  //@ts-ignore
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  ////////////////

  //@ts-ignore
  const handlePageChangeAtivacaoERecarga = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPageAtivacaoERecarga(page);
  };

  const renderPaginatedListAtivacaoERecarga = () => {
    const startIndex = (currentPageAtivacaoERecarga - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItemsAtivacaoERecarga = responseListAtivacaoERecarga.slice(startIndex, endIndex);

    return paginatedItemsAtivacaoERecarga.map((item, index) => (
      <Box sx={{ width: '100%' }} key={index}>
        <ListFaturasAtivacaoERecarga
          colorStatus={item.paymentstatus === 0 ? '#dbbe00' : 'green'}
          dataDeCriacao={item.created ? dateFormatter(item.created) : 'Sem data de criação'}
          tipoDaFaturas={item.tipo}
          status={item.paymentstatus === 0 ? 'Pendente' : 'Pago'}
          valor={item.valuetopup}
          idFatura={item.paymentasaasid}
        />
      </Box>
    ));
  };
  //@ts-ignore
  const handlePageChangePacotes = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPagePacotes(page);
  };

  const renderPaginatedListPacotes = () => {
    const startIndex = (currentPagePacotes - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItemsPacotes = responseListPacotes.slice(startIndex, endIndex);

    return paginatedItemsPacotes.map((item, index) => (
      <Box sx={{ width: '100%' }} key={index}>
        <ListFaturasPacotes
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
  }, []);

  return (
    <Box sx={{ width: '100%', typography: 'body1', mt: 2 }}>
      <Typography variant='h6'>Escolha o tipo de Fatura que deseja visualizar</Typography>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label='lab API tabs example'>
            <Tab label='Faturas Ativação e Recarga' value='1' />
            <Tab label='Faturas compras de pacotes' value='2' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <>
            {loading !== true && responseListAtivacaoERecarga.length === 0 ? (
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
                  <Typography variant='h4' sx={{ mt: 10 }}>
                    Não há faturas
                  </Typography>
                </Box>
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
                      <Typography variant='h4'>Faturas Ativação e Recarga</Typography>
                    </Box>
                    {renderPaginatedListAtivacaoERecarga()}

                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(responseListAtivacaoERecarga.length / itemsPerPage)}
                        page={currentPageAtivacaoERecarga}
                        onChange={handlePageChangeAtivacaoERecarga}
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
        </TabPanel>
        <TabPanel value='2'>
          <>
            {loading !== true && responseListAtivacaoERecarga.length === 0 ? (
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
                  <Typography variant='h4' sx={{ mt: 10 }}>
                    Não há faturas
                  </Typography>
                </Box>
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
                      <Typography variant='h4'>Faturas Compra de Pacotes</Typography>
                    </Box>
                    {renderPaginatedListPacotes()}

                    <Stack spacing={2}>
                      <Pagination
                        count={Math.ceil(responseListPacotes.length / itemsPerPage)}
                        page={currentPagePacotes}
                        onChange={handlePageChangePacotes}
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
        </TabPanel>
      </TabContext>
    </Box>
  );
}
