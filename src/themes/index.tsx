import { ThemeProvider } from '@mui/material';
import createTheme from '@mui/material/styles/createTheme';
import { createContext, useState } from 'react';

export const TemaContext = createContext({});

export function TemaProvider({ children }: any) {
  const root = document.querySelector(':root') as HTMLElement;
  const [colors, setColors] = useState({
    primary_color: '#DF3B67',
    secondary_color: '#444',
    backGround_button_hover_color: '#141414',
    backGround_sideBar_color: '#141414',
    backGround_header_color: '#202020',
    backGround_default: '#141414',
    text_header_color: '#c0c0c0',
    text_color: 'white',
    sub_text_color: '#808080',
    color_svg: '#0FFF07',
  });

  function changeColor(key: string, value: any) {
    if (root) {
      root.style.setProperty(`--${key}`, value);
    }
    setColors((prev) => ({ ...prev, [key]: value }));
  }
  const customTheme = createTheme({
    palette: {
      primary: {
        main: colors.primary_color,
      },
    },
  });

  return (
    <TemaContext.Provider value={{ customTheme, changeColor, colors, setColors }}>
      <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    </TemaContext.Provider>
  );
}
