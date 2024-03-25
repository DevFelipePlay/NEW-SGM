import {
  Avatar,
  Box,
  Grid,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { MdOutlineContentCopy } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IReqPostPlayDashboardUsuarioContinue,
  IResPostPlayDashboardUsuario,
  IResPostPlayDashboardUsuarioContinue,
  postPlayDashboardUsuario,
  postPlayDashboardUsuarioContinue,
} from "../../../api";
import { Cards, DefaultContainer, Loading } from "../../../components";
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard";
import useUser from "../../../hooks/useUser";
import {
  currencyMask,
  dadosFormatter,
  dateFormatter,
  errorToast,
} from "../../../utils";

export function DashboardRelatorioUsuario() {
  const [responseIdIndicacao, setresponseIdIndicacao] =
    useState<IResPostPlayDashboardUsuario>();
  const [responseViewContinue, setResponseViewContinue] =
    useState<IResPostPlayDashboardUsuarioContinue>();
  const [loading, setLoading] = useState(false);
  const [loadingDados, setLoadingDados] = useState(false);
  const { cpf } = useParams();
  const [semPlanoAtivo, setSemPlanoAtivo] = useState(false);
  //@ts-ignore
  const [value, copy] = useCopyToClipboard();
  const { user } = useUser();

  async function handleSubmit() {
    setLoading(true);
    let payload = {
      cpf: cpf ? cpf : "",
      token: user?.token ? user?.token : "",
    };
    try {
      const data = await postPlayDashboardUsuario(payload);
      setresponseIdIndicacao(data);
    } catch (error: any) {
      errorToast(error);
      setSemPlanoAtivo(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleDados() {
    setLoadingDados(true);

    try {
      const payload: IReqPostPlayDashboardUsuarioContinue = {
        cpf: user?.cpf || "",
        token: user?.token || "",
      };
      const data = await postPlayDashboardUsuarioContinue(payload);
      setResponseViewContinue(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingDados(false);
    }
  }

  function copyToText() {
    copy(
      `https://indicacao.opuscell.com.br/#/${responseIdIndicacao?.id_indicacao}`
    );
    toast.success("Copiado para area de transferência");
  }

  useEffect(() => {
    handleSubmit();
    handleDados();
  }, []);

  return (
    <DefaultContainer
      page={"Relatório do usuário MMN "}
      title={`Usuário ${
        responseIdIndicacao?.nome ? responseIdIndicacao?.nome : "Parceiro"
      }`}
      subTitle={`Veja os dados pessoais de ${
        responseIdIndicacao?.nome ? responseIdIndicacao?.nome : "Parceiro"
      }`}
      showSearch={false}
      showAvatar={true}
    >
      <>
        {loading ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "50vh",
            }}
          >
            <Loading />
          </Box>
        ) : (
          <>
            {semPlanoAtivo ? (
              <Typography>Sem plano ativo</Typography>
            ) : (
              <Grid
                container
                spacing={2}
                width={"100%"}
                justifyContent="center"
              >
                <Grid item xs={12}>
                  <Cards
                    title={"Seu Link para indicação"}
                    subTitle={""}
                    size={"100%"}
                  >
                    <Tooltip title={"Copiar"}>
                      <Box
                        onClick={() => copyToText()}
                        sx={{
                          cursor: "pointer",
                          display: "flex",
                          flexDirection: {
                            xs: "column",
                            sm: "row",
                          },
                          alignItems: "center",
                          justifyContent: "center",
                          width: "100%",
                          gap: {
                            xs: "0.25rem",
                            sn: "2rem",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            wordBreak: "break-all",
                          }}
                        >
                          {`https://indicacao.opuscell.com.br/#/${responseIdIndicacao?.id_indicacao}`}
                        </Typography>
                        <MdOutlineContentCopy />
                      </Box>
                    </Tooltip>
                  </Cards>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={6} xl={3}>
                  <Cards
                    title={"Bônus a receber"}
                    subTitle={"Total de Bônus a ser recebido"}
                    size={"100%"}
                  >
                    <Typography variant="h5">
                      {responseIdIndicacao?.bonus_receber
                        ? "R$" +
                          " " +
                          currencyMask(responseIdIndicacao?.bonus_receber)
                        : "Sem Saldo"}
                    </Typography>
                  </Cards>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={6} xl={3}>
                  <Cards
                    title={"Total de níveis"}
                    subTitle={"Total de Níveis de usuários ativos "}
                    size={"100%"}
                  >
                    <Typography variant="h5">
                      {responseIdIndicacao?.total_niveis
                        ? responseIdIndicacao?.total_niveis
                        : "Sem acesso ao multinivel"}
                    </Typography>
                  </Cards>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={6} xl={3}>
                  <Cards
                    title={"Usuários ativos"}
                    subTitle={"Total de usuários na sua rede"}
                    size={"100%"}
                  >
                    <Typography variant="h5">
                      {responseIdIndicacao?.usuarios_ativos
                        ? responseIdIndicacao?.usuarios_ativos
                        : "Sem usuários ativos"}
                    </Typography>
                  </Cards>
                </Grid>

                <Grid item xs={12} sm={6} md={3} lg={6} xl={3}>
                  <Cards
                    title={"Total de bônus recebidos"}
                    subTitle={"Total de Bônus recebidos"}
                    size={"100%"}
                  >
                    <Typography variant="h5">
                      {responseIdIndicacao?.bonus_recebidos
                        ? "R$" +
                          " " +
                          currencyMask(responseIdIndicacao?.bonus_recebidos)
                        : "Sem Saldo"}
                    </Typography>
                  </Cards>
                </Grid>

                <Grid item xs={12} sm={12} md={5.5}>
                  <Cards title={"Dados Pessoais"} subTitle={""} size={"100%"}>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        sx={{ width: "100px", height: "100px", mb: 2 }}
                      ></Avatar>
                      <Typography variant="h5">
                        {responseIdIndicacao?.nome}
                      </Typography>
                      <div
                        style={{
                          width: "90%",
                          height: "1px",
                          backgroundColor: "var(--primary_color)",
                        }}
                      />
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          mt: 1,
                        }}
                      >
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: {
                              xs: "center",
                              sm: "flex-start",
                            },
                            justifyContent: "center",
                            flexDirection: "column",
                            width: {
                              xs: "100%",
                              sm: "auto",
                            },
                          }}
                        >
                          <Typography>Indicado por:</Typography>
                          <Typography>Status:</Typography>
                          <Typography>Plano Ativo:</Typography>
                          <Typography>Saldo de dados:</Typography>

                          <Typography>Expira em:</Typography>
                          <Typography>Graduação:</Typography>
                        </Grid>
                        <Grid
                          item
                          sx={{
                            display: "flex",
                            alignItems: {
                              xs: "center",
                              sm: "flex-start",
                            },
                            justifyContent: "center",
                            flexDirection: "column",
                            width: {
                              xs: "100%",
                              sm: "auto",
                            },
                          }}
                        >
                          <Typography>
                            {responseIdIndicacao?.indicado_por}
                          </Typography>
                          {loadingDados ? (
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem", width: "250px" }}
                            />
                          ) : (
                            <Typography>
                              {responseViewContinue?.status
                                ? responseViewContinue?.status
                                : "Inativo"}
                            </Typography>
                          )}
                          <Typography>
                            {responseIdIndicacao?.plano
                              ? responseIdIndicacao?.plano
                              : "Sem Plano Ativo"}
                          </Typography>
                          {loadingDados ? (
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem", width: "250px" }}
                            />
                          ) : (
                            <Typography>
                              {responseViewContinue?.saldo_dados !==
                              "Indefinido"
                                ? dadosFormatter(
                                    responseViewContinue?.saldo_dados
                                      ? responseViewContinue?.saldo_dados
                                      : 0
                                  )
                                : "Falha ao buscar dados!"}
                            </Typography>
                          )}
                          {loadingDados ? (
                            <Skeleton
                              variant="text"
                              sx={{ fontSize: "1rem", width: "250px" }}
                            />
                          ) : (
                            <Typography>
                              {dateFormatter(
                                responseViewContinue?.expira_em
                                  ? responseViewContinue?.expira_em
                                  : "Indefinido"
                              )}
                            </Typography>
                          )}
                          <Typography>
                            {responseIdIndicacao?.graduacao === "Indefinido"
                              ? "Sem Graduação"
                              : responseIdIndicacao?.graduacao}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Box>
                  </Cards>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </>
    </DefaultContainer>
  );
}
