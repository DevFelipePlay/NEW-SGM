import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Pagination, PaginationItem, Stack } from '@mui/material';

import { BotaoAcoes, DefaultContainer, ListCustom } from '../../../../components';

export default function ListPartner() {
  return (
    <DefaultContainer
      page={'CRM'}
      title={'Parceiros'}
      subTitle={'Visualize e gerencie todos os parceiros cadastrados no sistema'}
      showSearch={false}
      showAvatar={true}
    >
      <Box
        sx={{
          width: '100%',
        }}
      ></Box>
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
        ></Box>
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
              <PaginationItem
                slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                {...item}
              />
            )}
          />
        </Stack>
      </Box>
      <BotaoAcoes />
    </DefaultContainer>
  );
}
