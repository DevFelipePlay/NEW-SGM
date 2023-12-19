import { Box, Grid, List, ListItem, ListItemText, styled } from '@mui/material';
import foto from '../../assets/MMNImg/din.png';
import useUser from '../../hooks/useUser';
import { dateFormatter } from '../../utils';

interface IlistCustom {
  nome: string;
  nomePremio: string;
  logotipo: string;
  endereco: string;
  id: number;
  dataPagamento: string;
  cod: string;
  statusSolicitacao?: number;
}

export function ListHistoricoSolicitacoesPremios({
  nome,
  nomePremio,
  logotipo,
  endereco,
  id,
  dataPagamento,
  cod,
  statusSolicitacao,
}: IlistCustom) {
  const Demo = styled('div')(() => ({
    backgroundColor: 'color.background.default',
  }));

  const { user } = useUser();

  return (
    <Box sx={{ flexGrow: 1, width: '100%' }}>
      <Grid item xs={12} md={6}>
        <Demo>
          <List>
            <ListItem
              sx={{
                bgcolor: '#5f5f5f',
                color: 'white',
                '&:hover': {
                  bgcolor: 'var(--text-header-color)',
                  color: 'white',
                  transition: 'all 0.3s',
                },
                cursor: 'pointer',
                borderRadius: '10px',
              }}
            >
              <Box>
                <ListItemText sx={{ userSelect: 'none' }}>
                  {logotipo !== '' ? (
                    <img
                      src={`data:image/png;base64,${logotipo}`}
                      style={{ width: '100px', borderRadius: '10px' }}
                    />
                  ) : (
                    <img src={foto} style={{ width: '100px', borderRadius: '10px' }} />
                  )}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>ID: {id}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Nome: {nome}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>
                  Nome do Premio: {nomePremio}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>
                  Data do Pagamento: {dateFormatter(dataPagamento)}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Endereço: {endereco}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>
                  Data da solicitação:{dateFormatter(dataPagamento)}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Cod. de rastreio: {cod}</ListItemText>
                {user?.profileid === 7 && (
                  <ListItemText sx={{ userSelect: 'none' }}>
                    Status da solicitação: {statusSolicitacao === 1 ? 'Enviado' : 'Pendente'}
                  </ListItemText>
                )}
              </Box>
            </ListItem>
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
