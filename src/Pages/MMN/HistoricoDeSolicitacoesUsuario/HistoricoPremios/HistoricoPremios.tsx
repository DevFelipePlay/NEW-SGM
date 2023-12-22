import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  IReqPostPlaySolicitacoesPremiosUsuario,
  IResPostPlaySolicitacoesPremiosUsuario,
  postPlaySolicitacaoPremiosUsuario,
} from '../../../../api';
import { ListHistoricoSolicitacoesPremios, Loading } from '../../../../components';
import useUser from '../../../hooks/useUser';

export function HistoricoPremios() {
  const [loading, setLoading] = useState(false);
  const [responseList, setResponseList] = useState<IResPostPlaySolicitacoesPremiosUsuario[]>([]);
  const { user } = useUser();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  async function handleListRedeDeUsuarioMMN() {
    setLoading(true);

    const payload: IReqPostPlaySolicitacoesPremiosUsuario = {
      cpf: user?.cpf || '',
    };
    try {
      const data = await postPlaySolicitacaoPremiosUsuario(payload);
      setResponseList(data);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  //@ts-ignore
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const renderPaginatedList = () => {
    const reversedList = [...responseList].reverse();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = reversedList.slice(startIndex, endIndex);

    return paginatedItems.map((item, index) => (
      <Box sx={{ width: '100%' }} key={index}>
        <ListHistoricoSolicitacoesPremios
          nome={user ? user.name : ''}
          dataPagamento={item.data_solicitacao}
          endereco={item.endereco}
          id={item.ID}
          logotipo={item.foto}
          nomePremio={item.nome_premio}
          cod={item.codigo_rastreio}
          statusSolicitacao={item.status_pagamento}
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
      {!loading && responseList.length === 0 ? (
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
            <Typography variant='h4'>Histórico de solicitações de Prêmios</Typography>
          </Box>
          <Typography variant='h4' sx={{ mt: 10 }}>
            Nenhuma solicitação realizada!
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
                <Typography variant='h4'>Histórico de solicitações de Prêmios</Typography>
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
