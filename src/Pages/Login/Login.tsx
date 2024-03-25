import { Box, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { mask } from "remask";
import { AuthContext } from "../../components/Auth/auth";

import LoadingButton from "@mui/lab/LoadingButton";

import { useNavigate, useParams } from "react-router-dom";
import {
  IReqPostPlayListarCorSistemaPorCompanyRef,
  IResPostPlayListarCorSistemaPorCompanyRef,
  postPlayListarCorSistemaPorCompanyRef,
} from "../../api/Login";
import { AnimatedBackground } from "../../components";
import { TextInput, TextInputPassword } from "../../components/Inputs";
import { PreLoader } from "../../components/PreLoader";
import { TemaContext } from "../../themes";
import { errorToast } from "../../utils";

export function Login() {
  //@ts-ignore
  const { setColors } = useContext(TemaContext);
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const { companyref } = useParams();

  const navigate = useNavigate();

  // login
  const { signIn, loadingAuth } = useContext(AuthContext);

  // Função para aplicar a máscara de CPF/CNPJ
  const formatCpf = (value: string) =>
    mask(value, ["999.999.999-99", "99.999.999/9999-99"]);

  // Função de manipulação de mudança para o campo CPF
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const unmaskedValue = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    setCpf(unmaskedValue);
  };

  //Fução para resgate de cores e nome parceiro login
  const [loadigColorsSistem, setLoadigColorsSistem] = useState(false);
  const [responseColors, setResponseColors] =
    useState<IResPostPlayListarCorSistemaPorCompanyRef>();
  async function handleColorsSistem() {
    setLoadigColorsSistem(true);

    const payload: IReqPostPlayListarCorSistemaPorCompanyRef = {
      companyref: companyref || "",
    };

    try {
      const data = await postPlayListarCorSistemaPorCompanyRef(payload);
      setResponseColors(data);
    } catch (error: any) {
      errorToast(error);
      navigate(`/forbidden`);
    } finally {
      setLoadigColorsSistem(false);
    }
  }

  useEffect(() => {
    handleColorsSistem();
    console.log(responseColors);
  }, []);
  useEffect(() => {
    if (responseColors?.primary_color !== null) {
      setColors({
        primary_color: responseColors?.primary_color,
        secondary_color: "#444",
        backGround_button_hover_color: "#141414",
        backGround_sideBar_color: "#141414",
        backGround_header_color: "#202020",
        backGround_default: "#141414",
        text_header_color: "#c0c0c0",
        text_color: "white",
        sub_text_color: "#808080",
        color_svg: responseColors?.primary_color,
      });
    }
  }, [responseColors?.primary_color]);

  // breakpoints
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      {loadigColorsSistem ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "black",
            color: "white",
          }}
        >
          <PreLoader />
        </Box>
      ) : (
        <Box
          sx={{
            background:
              "radial-gradient(ellipse at bottom, #0d1d31 0%, #0c0d13 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <AnimatedBackground />
          {lgDown ? (
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "row",
              }}
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(20px)",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  gap: {
                    xs: 4,
                    lg: 8,
                  },
                }}
              >
                <Stack
                  order={2}
                  spacing={2}
                  sx={{
                    backdropFilter: "blur(10px)",
                    zIndex: "100",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    variant={smDown ? "h5" : "h4"}
                    sx={{ color: "#c0c0c0" }}
                  >
                    Login
                  </Typography>
                  <TextInput
                    icon={undefined}
                    placeholder={"CNPJ/CPF"}
                    type={"tel"}
                    value={formatCpf(cpf)}
                    onChange={handleCpfChange}
                  />
                  <TextInputPassword
                    icon
                    placeholder={"Senha"}
                    value={senha}
                    onChange={(e: any) => setSenha(e.target.value)}
                  />
                  <LoadingButton
                    onClick={(e) => {
                      e.preventDefault();
                      signIn(cpf, senha);
                    }}
                    size="small"
                    loading={loadingAuth}
                    variant="contained"
                    type="submit"
                  >
                    Entrar
                  </LoadingButton>
                </Stack>
                <Box
                  order={1}
                  sx={{
                    // width: "60%",
                    // height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mx: 3,
                  }}
                >
                  <Stack
                    sx={{
                      backdropFilter: "blur(10px)",
                      dislay: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      p: {
                        xs: 1.75,
                        sm: 2,
                      },
                      borderRadius: "8px",
                      border: "solid 1px var(--primary_color)",
                      textAlign: "center",
                    }}
                  >
                    <Typography variant={smDown ? "h6" : "h3"} color={"white"}>
                      Seja bem-vindo
                    </Typography>
                    <Typography variant={smDown ? "h6" : "h3"} color={"white"}>
                      ao
                    </Typography>
                    <Typography
                      variant={smDown ? "h6" : "h3"}
                      color={"var(--primary_color)"}
                      fontWeight={"900"}
                    >
                      Sistema Opuscell
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                flexDirection: "row",
              }}
              component={"form"}
              onSubmit={(e) => {
                e.preventDefault();
                navigate("/");
              }}
            >
              <Box
                sx={{
                  width: "40%",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  backdropFilter: "blur(20px)",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <Stack
                  spacing={2}
                  sx={{
                    backdropFilter: "blur(10px)",
                    zIndex: "100",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h4" sx={{ color: "#c0c0c0" }}>
                    Login
                  </Typography>
                  <TextInput
                    icon={undefined}
                    placeholder={"CNPJ/CPF"}
                    type={"tel"}
                    value={formatCpf(cpf)}
                    onChange={handleCpfChange}
                  />
                  <TextInputPassword
                    icon
                    placeholder={"Senha"}
                    value={senha}
                    onChange={(e: any) => setSenha(e.target.value)}
                  />
                  <LoadingButton
                    onClick={(e) => {
                      e.preventDefault();
                      signIn(cpf, senha);
                    }}
                    size="small"
                    loading={loadingAuth}
                    variant="contained"
                    type="submit"
                  >
                    Entrar
                  </LoadingButton>
                </Stack>
              </Box>
              <Box
                sx={{
                  width: "60%",
                  height: "100vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: 3,
                }}
              >
                <Stack
                  sx={{
                    backdropFilter: "blur(10px)",
                    dislay: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                    borderRadius: "30px",
                    border: "solid 1px var(--primary_color)",
                    textAlign: "center",
                  }}
                >
                  <Typography variant="h2" color={"white"}>
                    Seja bem-vindo
                  </Typography>
                  <Typography variant="h2" color={"white"}>
                    à
                  </Typography>
                  <Typography
                    variant="h2"
                    color={"var(--primary_color)"}
                    fontWeight={"900"}
                  >
                    {`${
                      responseColors?.tradename
                        ? responseColors.tradename
                        : "Play Móvel"
                    }`}
                  </Typography>
                </Stack>
              </Box>
            </Box>
          )}
          <Typography
            sx={{
              position: "fixed",
              bottom: 5,
              textAlign: "center",
              color: "var(--sub_text_color)",
              fontSize: {
                xs: "0.675rem",
                sm: "0.875rem",
                md: "1rem",
              },
              px: 1,
            }}
          >
            Copyright © 2023 Play Tecnologia - 33.093.462.0001/50 | Todos os
            direitos reservados
          </Typography>
        </Box>
      )}
    </>
  );
}
