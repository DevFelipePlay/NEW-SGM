import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Pagination, PaginationItem, Stack, Typography } from '@mui/material';
import { ListCustom } from '../../../../../components';

export default function Tab1() {
  return (
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
        <Typography variant='h4'>Lista de usuários</Typography>
        <Button
          onClick={function (): void {
            throw new Error('Function not implemented.');
          }}
        >
          Cadastrar
        </Button>
      </Box>
      <ListCustom />
      <ListCustom />
      <ListCustom />
      <ListCustom />
      <ListCustom />
      <ListCustom />
      <Stack spacing={2}>
        <Pagination
          count={10}
          renderItem={(item) => (
            <PaginationItem slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }} {...item} />
          )}
        />
      </Stack>
    </Box>
  );
}
