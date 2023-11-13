import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import * as React from 'react';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: 'var(--primary-color)',
  },
});

interface StyledTabProps {
  label: string;
}

const StyledTab = styled((props: StyledTabProps) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(17),

    marginRight: theme.spacing(1),
    color: 'white',
    '&.Mui-selected': {
      color: 'var(--primary-color)',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'var(--backGround-header-color)',
    },
  })
);

interface ITabs {
  mostrarBotaoVoltar: boolean;
  mostrarNavbar: boolean;
  tabsData: { label: string; value: number }[];
  value: number;
  onChange: (newValue: number) => void;
}

export function CustomizedTabs({
  mostrarBotaoVoltar = true,
  mostrarNavbar = true,
  tabsData,
  value = 0,
  onChange,
}: ITabs) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
        width: '100%',
      }}
    >
      {mostrarNavbar && (
        <Box
          sx={{
            width: '100%',
            backgroundColor: 'var(--backGround-header-color)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: '30px',
            padding: 1,
            px: 3,
          }}
        >
          <StyledTabs
            value={value}
            // @ts-ignore
            onChange={(e, newValue) => onChange(newValue)}
            aria-label='styled tabs example'
          >
            {tabsData.map((tab, index) => (
              <StyledTab key={index} label={tab.label} />
            ))}
          </StyledTabs>
          <Box sx={{ p: 3 }} />
        </Box>
      )}
    </Box>
  );
}
