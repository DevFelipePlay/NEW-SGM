import { Avatar, Badge, Box, Grid, Typography } from '@mui/material';
import { CSSProperties, ReactNode } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { RiNotificationLine } from 'react-icons/ri';
import { SearchInput } from '..';

interface IDefaultCOntainer {
  page: string;
  title: string;
  subTitle: string;
  showSearch: boolean;
  showAvatar: boolean;
  children: ReactNode;
}

export function DefaultContainer({
  page,
  title,
  subTitle,
  showSearch,
  showAvatar,
  children,
}: IDefaultCOntainer) {
  const displayFlexComponent: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  const contentStyles: CSSProperties = {
    paddingLeft: '100px ',
    paddingRight: '20px ',
    transition: 'margin-left 0.3s, margin-right 0.3s, max-width 0.3s',
    height: '100vh',
    backgroundColor: 'white',
    overflowY: 'auto',
  };
  const defaultContent: CSSProperties = {
    ...displayFlexComponent,
    flexDirection: 'column',
    marginTop: '2rem',
    padding: '0px 40px 0px 100px',
  };

  return (
    <Grid>
      <Box
        sx={{
          width: '100%',
          py: '1rem',
          ...contentStyles,
          backgroundColor: 'var(--backGround-header-color)',
          height: 'auto',
        }}
      >
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent:
              showAvatar === false && showSearch === false ? 'center' : 'space-between',
            height: 'auto',
          }}
        >
          <Typography sx={{ color: 'var(--text-color)', fontSize: '1.3rem' }}>{page}</Typography>

          {showSearch && (
            <SearchInput icon={<AiOutlineSearch />} placeholder={'Buscar'} rest={undefined} />
          )}
          {showAvatar && (
            <Box sx={{ ...displayFlexComponent }}>
              <Badge badgeContent={4} color='error' sx={{ marginRight: '1.5rem' }}>
                <RiNotificationLine style={{ color: 'var(--text-color)', fontSize: '1.3rem' }} />
              </Badge>
              <Avatar sx={{ mr: 2 }}>TA</Avatar>
              <Box>
                <Typography sx={{ color: 'var(--text-color)' }}>Testenildo Alves</Typography>
                <Typography
                  sx={{ color: 'var(--sub-text-color)', fontSize: '12px' }}
                  variant='subtitle2'
                >
                  Mega Ultra blaster user
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
        <Box sx={{ mt: 5 }}>
          <Typography sx={{ color: 'var(--text-color)' }} variant='h3'>
            {title}
          </Typography>
          <Typography sx={{ color: 'var(--sub-text-color)' }} variant='subtitle2'>
            {subTitle}
          </Typography>
        </Box>
      </Box>
      {/* Content */}
      <Box sx={defaultContent}>{children}</Box>
      {/* /////// */}
    </Grid>
  );
}
