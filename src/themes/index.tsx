import { ThemeProvider } from "@mui/material";
import createTheme from "@mui/material/styles/createTheme";
import { createContext, useEffect, useState } from "react";

export const TemaContext = createContext({});

export function TemaProvider({ children }: any) {
  const root = document.querySelector(":root") as HTMLElement;

  // Função para salvar as cores no Local Storage
  function salvarCoresNoLocalStorage(cores: any) {
    localStorage.setItem("cores", JSON.stringify(cores));
  }

  // Função para recuperar as cores do Local Storage
  function recuperarCoresDoLocalStorage() {
    const coresArmazenadas = localStorage.getItem("cores");
    return coresArmazenadas ? JSON.parse(coresArmazenadas) : null;
  }

  const [colors, setColors] = useState(() => {
    const coresSalvas = recuperarCoresDoLocalStorage();
    return (
      coresSalvas || {
        primary_color: "#DF3B67",
        secondary_color: "#444",
        backGround_button_hover_color: "#141414",
        backGround_sideBar_color: "#141414",
        backGround_header_color: "#202020",
        backGround_default: "#141414",
        text_header_color: "#c0c0c0",
        text_color: "white",
        sub_text_color: "#808080",
        color_svg: "#0FFF07",
      }
    );
  });

  function changeColor(key: string, value: any) {
    if (root) {
      root.style.setProperty(`--${key}`, value);
    }
    setColors((prev: any) => ({ ...prev, [key]: value }));
  }
  const customTheme = createTheme({
    palette: {
      primary: {
        main: colors.primary_color ? colors.primary_color : "#DF3B67",
      },
    },
  });

  useEffect(() => {
    changeColor(
      "primary_color",
      colors.primary_color ? colors.primary_color : "#DF3B67"
    );
    salvarCoresNoLocalStorage(colors);
  }, [colors.primary_color]);

  return (
    <TemaContext.Provider
      value={{ customTheme, changeColor, colors, setColors }}
    >
      <ThemeProvider theme={customTheme}>{children}</ThemeProvider>
    </TemaContext.Provider>
  );
}
