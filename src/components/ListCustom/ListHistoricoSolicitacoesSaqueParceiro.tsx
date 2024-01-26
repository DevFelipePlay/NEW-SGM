import {
  Alert,
  AlertTitle,
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  styled,
} from '@mui/material';
import useUser from '../../hooks/useUser';

interface IlistCustom {
  nome: string;
  statusPagamento: boolean | number;
  id: number;
  valorPago: string;
  dataPagamento: string;
  mensagem: string;
}

export function ListHistoricoSolicitacoesSaqueParceiro({
  nome,
  statusPagamento,
  id,
  valorPago,
  dataPagamento,
  mensagem,
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
              {user?.super && (
                <div
                  style={{
                    width: '12px',
                    background: statusPagamento === true ? `green` : 'red',
                    height: statusPagamento === false ? '220px' : '140px',
                    border: 'solid 1px ',
                    marginRight: '10px',
                    borderRadius: '20px',
                  }}
                ></div>
              )}
              {user?.profileid_multinivel === 7 && (
                <div
                  style={{
                    width: '12px',
                    background:
                      statusPagamento === 1 ? 'green' : statusPagamento === 0 ? 'red' : '#cdc600',
                    height: statusPagamento !== 0 ? '140px' : '220px',
                    border: 'solid 1px ',
                    marginRight: '10px',
                    borderRadius: '20px',
                  }}
                ></div>
              )}
              <Box>
                <ListItemText sx={{ userSelect: 'none' }}>ID: {id}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Nome: {nome}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>
                  Data do Pagamento: {dataPagamento}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Valor: R$ {valorPago}</ListItemText>
                {statusPagamento === 0 && user?.profileid_multinivel === 7 && (
                  <ListItem sx={{ userSelect: 'none' }}>
                    <Alert severity='error'>
                      <AlertTitle>Solicitação Negada!</AlertTitle>

                      <Typography>{mensagem}</Typography>
                    </Alert>
                  </ListItem>
                )}
                {statusPagamento === 0 ||
                  (statusPagamento === false && user?.profileid === 1 && (
                    <ListItem sx={{ userSelect: 'none' }}>
                      <Alert severity='error'>
                        <AlertTitle>Solicitação Negada!</AlertTitle>
                        <Typography>Mensagem: {mensagem}</Typography>
                      </Alert>
                    </ListItem>
                  ))}
              </Box>
            </ListItem>
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
