import { Box, Grid, List, ListItem, ListItemText, Stack, styled } from '@mui/material';
import { MouseEventHandler } from 'react';

interface IlistCustom {
  valor: string;
  dataDeCriacao: string;
  dataDePagamento: string;
  tipoDaFaturas: string;
  status: string;
  colorStatus: string;
  pressItemList: MouseEventHandler<HTMLDivElement>;
}

export function ListFaturas({
  valor,
  dataDeCriacao,
  dataDePagamento,
  tipoDaFaturas,
  status,
  colorStatus,
  pressItemList,
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
              secondaryAction={<Stack direction='row' spacing={2}></Stack>}
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
                  background: `${colorStatus}`,
                  height: '140px',
                  border: 'solid 1px ',
                  marginRight: '10px',
                  borderRadius: '20px',
                }}
              ></div>
              <Box>
                <ListItemText sx={{ userSelect: 'none' }} onClick={pressItemList}>
                  Criada em:{dataDeCriacao}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }} onClick={pressItemList}>
                  Paga em:{dataDePagamento}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }} onClick={pressItemList}>
                  Tipo: {tipoDaFaturas}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }} onClick={pressItemList}>
                  Status: {status}
                </ListItemText>
                <ListItemText sx={{ userSelect: 'none' }} onClick={pressItemList}>
                  R$ {valor}
                </ListItemText>
              </Box>
            </ListItem>
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
