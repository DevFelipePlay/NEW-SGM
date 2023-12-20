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
}

export function ListHistoricoSolicitacoesSaqueParceiro({
  nome,
  statusPagamento,
  id,
  valorPago,
  dataPagamento,
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
                    height: '140px',
                    border: 'solid 1px ',
                    marginRight: '10px',
                    borderRadius: '20px',
                  }}
                ></div>
              )}
              {user?.profileid === 7 && (
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
                <ListItemText sx={{ userSelect: 'none' }}>Valor Pago: R$ {valorPago}</ListItemText>
                {statusPagamento === 0 && user?.profileid === 7 && (
                  <ListItem sx={{ userSelect: 'none' }}>
                    <Alert severity='error'>
                      <AlertTitle>Solicitação negada</AlertTitle>
                      <Typography>Algo deu errado com os seus dados financeiros!</Typography>
                      <Typography>
                        Atualize seus dados financeiros e faça a solicitação de saque novamente.
                      </Typography>
                    </Alert>
                  </ListItem>
                )}
              </Box>
            </ListItem>
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
