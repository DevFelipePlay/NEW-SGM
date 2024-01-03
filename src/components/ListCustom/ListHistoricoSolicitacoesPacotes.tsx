import { Box, Grid, List, ListItem, ListItemText, styled } from '@mui/material';
import useUser from '../../hooks/useUser';
import { dateFormatter } from '../../utils';

interface IlistCustom {
  nome: string;
  nomePremio: string;
  endereco: string;
  id: number;
  dataPagamento: string;
  cod: string;
  statusSolicitacao?: number;
}

export function ListHistoricoSolicitacoesPacotes({
  nome,
  nomePremio,
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
                <ListItemText sx={{ userSelect: 'none' }}></ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>ID: {id}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Nome: {nome}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>Tipo: {nomePremio}</ListItemText>
                <ListItemText sx={{ userSelect: 'none' }}>
                  Data da confirmação: {dateFormatter(dataPagamento)}
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
