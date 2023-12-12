import { Box, Grid, List, ListItem, ListItemText, styled } from '@mui/material';

interface IlistCustom {
  nome: string;
  statusPagamento: boolean;
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
              <Box>
                <ListItemText sx={{ userSelect: 'none' }}>ID: {id}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Nome: {nome}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>
                  Data do Pagamento: {dataPagamento}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Valor Pago: R$ {valorPago}</ListItemText>
              </Box>
            </ListItem>
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
