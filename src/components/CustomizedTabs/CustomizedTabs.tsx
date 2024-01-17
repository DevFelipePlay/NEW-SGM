import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { styled } from '@mui/material/styles';
import * as React from 'react';

interface StyledTabsProps {
  children?: React.ReactNode;
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

const StyledTabs = styled((props: StyledTabsProps) => (
  <Tabs
    variant='scrollable'
    scrollButtons='auto'
    allowScrollButtonsMobile
    sx={{
      [`& .${tabsClasses.scrollButtons} svg`]: {
        width: '1.75rem',
        height: '1.75rem',
        fill: 'var(--primary_color)',
      },
    }}
    {...props}
    TabIndicatorProps={{ children: <span className='MuiTabs-indicatorSpan' /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: 'var(--primary_color)',
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
      color: 'var(--primary_color)',
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'var(--backGround_header_color)',
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

export function CustomizedTabs({ mostrarNavbar = true, tabsData, value = 0, onChange }: ITabs) {
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
            backgroundColor: 'var(--backGround_header_color)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: '30px',
            padding: 1,
            px: 3,
            boxShadow: ' rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px',
          }}
        >
          <StyledTabs
            value={value}
            // @ts-ignore
            onChange={(e, newValue) => onChange(newValue)}
            aria-label='styled tabs'
          >
            {tabsData.map((tab, index) => (
              <StyledTab key={index} label={tab.label} />
            ))}
          </StyledTabs>
          <Box
            sx={{
              p: 3,
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          />
        </Box>
      )}
    </Box>
  );
}
