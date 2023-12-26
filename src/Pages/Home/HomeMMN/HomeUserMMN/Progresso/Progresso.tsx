import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import LoadingButton from "@mui/lab/LoadingButton";
import { useEffect, useState } from "react";
import { GiLaurelsTrophy } from "react-icons/gi";
import { toast } from "react-toastify";
import {
  IReqPostPlayFilaPremios,
  IReqPostPlayQuantidadePontosUsuario,
  IReqPostPlaySolicitacaoSaquePremios,
  IReqPostPlayVisualizaListaPremios,
  IResPostPlayFilaPremios,
  IResPostPlayQuantidadePontosUsuario,
  IResPostPlayVisualizaPremios,
  postPlayFilaPremios,
  postPlayQuantidadePontosUsuario,
  postPlaySolicitacaoPremios,
  postPlayVisualizaListaPremios,
} from "../../../../../api";
import {
  IReqPostPlayAcumularPremio,
  postPlayAcumularPremios,
} from "../../../../../api/ApisRetiradaDePremio/AcumularPremio";
import {
  IReqPostPlayMetaGraduacao,
  IResPostPlayMetaGraduacao,
  postPlayMetaGraduacao,
} from "../../../../../api/ApisUtils/MetaGraduacao";
import dinheiro from "../../../../../assets/MMNImg/din.png";
import { Cards, Loading, ProgressBar } from "../../../../../components";
import useUser from "../../../../../hooks/useUser";
import useWindowSize from "../../../../../hooks/useWindowSize";
import { errorToast } from "../../../../../utils";

export function Progresso() {
  const { isMobile } = useWindowSize();

  //@ts-ignore
  const [telaEmDesenvilvimento, setTelaEmDesenvilvimento] = useState(false);
  const [loading, setloading] = useState(true);

  const [loadingSubmitResgate, setLoadingSubmitResgate] = useState(false);
  const [loadingSubmitAcumular, setloadingSubmitAcumular] = useState(false);
  const [responseView, setResponseView] = useState<
    IResPostPlayVisualizaPremios[]
  >([]);
  const [responsePremioSaque, setResponsePremioSaque] =
    useState<IResPostPlayFilaPremios>();
  const [responseQuantidadePontosUsuario, setResponseQuantidadePontosUsuario] =
    useState<IResPostPlayQuantidadePontosUsuario>();
  const [responseMetaGraduacao, setResponseMetaGraduacao] =
    useState<IResPostPlayMetaGraduacao>();
  const { user } = useUser();

  //Modal Resgatar
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    flexDirection: "column",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 300 : 600,
    borderRadius: "10px",
    boxShadow: "24",
    backgroundColor: "var(--backGround-sideBar-color)",
    color: "var(--text-color)",
    padding: isMobile ? "1rem" : "4rem",
    textAlign: "center",
    border: "none",
  };
  //Modal Acumular
  const [openAcumular, setOpenAcumular] = useState(false);
  const handleOpenAcumular = () => setOpenAcumular(true);
  const handleCloseAcumular = () => setOpenAcumular(false);
  const styleAcumular = {
    flexDirection: "column",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: isMobile ? 300 : 600,
    borderRadius: "10px",
    boxShadow: "24",
    backgroundColor: "var(--backGround-sideBar-color)",
    color: "var(--text-color)",
    padding: isMobile ? "1rem" : "4rem",
    textAlign: "center",
    border: "none",
  };

  // breakpoints
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  console.log(mdDown);
  ////////

  async function handleView() {
    setloading(true);

    const payload: IReqPostPlayVisualizaListaPremios = {
      token: user?.token || "",
    };

    try {
      const data = await postPlayVisualizaListaPremios(payload);
      setResponseView(data);
    } catch (error: any) {
      errorToast(error);
    }
    const payloadPremiosSaque: IReqPostPlayFilaPremios = {
      token: user?.token || "",
      cpf: user?.cpf || "",
    };
    try {
      const dataPremioSaque = await postPlayFilaPremios(payloadPremiosSaque);
      setResponsePremioSaque(dataPremioSaque);
    } catch (error: any) {
      errorToast(error);
    }
    const payloadQuantidadePontosUsuario: IReqPostPlayQuantidadePontosUsuario =
      {
        cpf: user?.cpf || "",
      };
    try {
      const dataQuantidadePontosUsuario = await postPlayQuantidadePontosUsuario(
        payloadQuantidadePontosUsuario
      );
      setResponseQuantidadePontosUsuario(dataQuantidadePontosUsuario);
    } catch (error: any) {}
    const payloadMetaGraduacao: IReqPostPlayMetaGraduacao = {
      cpf: user?.cpf || "",
      token: user?.token || "",
    };
    try {
      const dataMetaGraduacao = await postPlayMetaGraduacao(
        payloadMetaGraduacao
      );
      setResponseMetaGraduacao(dataMetaGraduacao);
    } catch (error: any) {
      console.log(error);
    } finally {
      setloading(false);
    }
  }

  async function handleSubmitResgatePremios(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setLoadingSubmitResgate(true);

    const payloadSubmitResgate: IReqPostPlaySolicitacaoSaquePremios = {
      cpf: user?.cpf || "",
      id_premio: responsePremioSaque?.ID || 0,
    };
    try {
      await postPlaySolicitacaoPremios(payloadSubmitResgate);
      toast.success("Resgate de premio solicitado");
      handleView();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingSubmitResgate(false);
    }
  }

  async function handleSubmitAcumularPremios(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setloadingSubmitAcumular(true);

    try {
      const payloadSubmitAcumular: IReqPostPlayAcumularPremio = {
        cpf: user?.cpf || "",
        id_premio: responsePremioSaque?.ID || "",
      };
      await postPlayAcumularPremios(payloadSubmitAcumular);
      toast.success("Você acumulou, agora poderá resgatar o próximo");
      handleView();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setloadingSubmitAcumular(false);
    }
  }

  const [progressPercentage, setProgressPercentage] = useState(0);
  const compareByPoints = (a: any, b: any) =>
    a.pontos_resgate - b.pontos_resgate;

  // ...

  useEffect(() => {
    if (responseQuantidadePontosUsuario && responsePremioSaque) {
      const pontosDisponiveis =
        responseQuantidadePontosUsuario.saldo_pontos_disponivel || 0;
      const pontosMeta = responsePremioSaque.Pontos_resgate || 0;

      // Calcule a porcentagem
      let percentage = (pontosDisponiveis / pontosMeta) * 100;

      // Garanta que a porcentagem não ultrapasse 100%
      percentage = Math.min(percentage, 100);

      // Atualize o estado
      setProgressPercentage(percentage);
    }
  }, [responseQuantidadePontosUsuario, responsePremioSaque]);

  const [progressPercentageMetaGraduacao, setProgressPercentageMetaGraduacao] =
    useState(0);

  // ...

  useEffect(() => {
    if (responseQuantidadePontosUsuario && responseMetaGraduacao) {
      const pontosDisponiveis = responseMetaGraduacao.pontos_graduacao || 0;
      const pontosMetaGraduacao: any =
        responseMetaGraduacao.meta_proxima_graduacao || 0;

      //@ts-ignore
      let percentageMetaGraduacao =
        (pontosDisponiveis / pontosMetaGraduacao) * 100;

      // Garanta que a porcentagem não ultrapasse 100%
      percentageMetaGraduacao = Math.min(percentageMetaGraduacao, 100);

      // Atualize o estado
      setProgressPercentageMetaGraduacao(percentageMetaGraduacao);
    }
  }, [responseQuantidadePontosUsuario, responseMetaGraduacao]);

  useEffect(() => {
    handleView();
  }, []);

  return (
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
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                sm: "row",
              },
            }}
          >
            <Cards
              title={`${responseMetaGraduacao?.graduacao}`}
              subTitle={"Realize vendas para subir para a próxima graduação"}
              size={"100%"}
            >
              <Box sx={{ fontSize: "8rem", color: "var(--primary-color)" }}>
                <GiLaurelsTrophy />
              </Box>

              <Typography sx={{ mb: 2 }}>
                Meta para próxima graduação :{" "}
                {responseMetaGraduacao?.pontos_graduacao} |{" "}
                {responseMetaGraduacao?.meta_proxima_graduacao} Pontos
              </Typography>
              <Box width={"100%"}>
                <ProgressBar progress={progressPercentageMetaGraduacao} />
              </Box>
            </Cards>

            {/* Ganhe Premios */}
            <Cards
              title={"Ganhe Prêmios"}
              subTitle={"Conquiste a meta para ganhar este prêmio"}
              size={"100%"}
            >
              <>
                <Typography sx={{ mb: 2 }}>
                  Meta para o prêmio :{" "}
                  {responseQuantidadePontosUsuario
                    ? responseQuantidadePontosUsuario?.saldo_pontos_disponivel
                    : "Sem Prêmios"}{" "}
                  |{" "}
                  {responsePremioSaque?.Pontos_resgate
                    ? responsePremioSaque?.Pontos_resgate
                    : "Sem Meta"}{" "}
                  pontos
                </Typography>

                <Box>
                  {responsePremioSaque?.foto ? (
                    <img
                      src={`data:image/jpeg;base64,${responsePremioSaque?.foto}`}
                      style={{ width: "300px", borderRadius: "16px" }}
                    />
                  ) : (
                    <img
                      src={dinheiro}
                      style={{ width: "100px", borderRadius: "16px" }}
                    />
                  )}
                  <Typography sx={{ color: "var(--primary-color)" }}>
                    {responsePremioSaque?.Descricao}
                  </Typography>
                </Box>
                <Box width={"100%"}>
                  <ProgressBar progress={progressPercentage} />
                  {progressPercentage !== 100 ? (
                    <Typography sx={{ mb: 1 }} color="error">
                      Para retirar os prêmios atinja 100%
                    </Typography>
                  ) : (
                    <Typography sx={{ mb: 1 }} color="darkgreen">
                      Parabéns! Você já pode retirar seu prêmio ou acumular seus
                      pontos para o próximo prêmio
                    </Typography>
                  )}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-evenly",
                    width: "100%",
                  }}
                >
                  <Button
                    onClick={() => handleOpenAcumular()}
                    variant="contained"
                    color="warning"
                    disabled={progressPercentage !== 100}
                  >
                    Acumular
                  </Button>
                  <LoadingButton
                    onClick={() => handleOpen()}
                    variant="contained"
                    loading={loadingSubmitResgate}
                    disabled={progressPercentage !== 100}
                  >
                    Resgatar
                  </LoadingButton>
                </Box>
              </>
            </Cards>

            {/* /////////// */}
          </Grid>

          <Grid item xs={12}>
            <>
              <Typography
                sx={{
                  m: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="h4"
              >
                Prêmios
              </Typography>
              <Box>
                <Swiper
                  spaceBetween={2}
                  slidesPerView={mdDown ? 1 : 2}
                  onSlideChange={() => console.log("slide change")}
                  onSwiper={(swiper) => console.log(swiper)}
                  pagination={{ clickable: true }}
                  modules={[Navigation, Pagination]}
                  navigation
                >
                  {responseView.sort(compareByPoints).map((item, index) => (
                    <SwiperSlide key={index}>
                      <Cards
                        title={item.nome_premio}
                        subTitle={""}
                        size={"90%"}
                      >
                        {item.foto ? (
                          <img
                            src={`data:image/jpeg;base64,${item.foto}`}
                            style={{ width: "200px", borderRadius: "16px" }}
                          />
                        ) : (
                          <img
                            src={dinheiro}
                            style={{ width: "100px", borderRadius: "16px" }}
                          />
                        )}
                        <Typography sx={{ color: "var(--primary-color)" }}>
                          {item.descricao}
                        </Typography>
                        <Typography variant="h5" sx={{ mt: 2 }}>
                          Meta: {item.pontos_resgate} Pontos
                        </Typography>
                      </Cards>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </Box>
            </>
          </Grid>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...styleAcumular, textAlign: "center" }}>
              <Alert
                sx={{
                  mb: 2,
                  textAlign: "center",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  alignItems: {
                    xs: "center",
                    sm: "initial",
                  },
                }}
                severity="warning"
              >
                <AlertTitle>Aviso</AlertTitle>
                Ao acumular o prêmio, os pontos do mesmo serão mantidos. E você
                não terá mais acesso à este prêmio clique em confirmar para
                prosseguir com o acumulo de pontos para o prêmios
              </Alert>
              <LoadingButton
                variant="contained"
                sx={{ mt: 2 }}
                onClick={(e: any) => {
                  handleSubmitAcumularPremios(e);
                  handleCloseAcumular();
                }}
                loading={loadingSubmitAcumular}
              >
                Confirmar
              </LoadingButton>
            </Box>
          </Modal>
          <Modal
            open={openAcumular}
            onClose={handleCloseAcumular}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...styleAcumular, textAlign: "center" }}>
              <Alert
                sx={{
                  mb: 2,
                  textAlign: "center",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  alignItems: {
                    xs: "center",
                    sm: "initial",
                  },
                }}
                severity="warning"
              >
                <AlertTitle>Aviso</AlertTitle>
                Ao acumular o prêmio, os pontos do mesmo serão mantidos. E você
                não terá mais acesso à este prêmio clique em confirmar para
                prosseguir com o acumulo de pontos para o prêmios
              </Alert>
              <LoadingButton
                variant="contained"
                sx={{ mt: 2 }}
                onClick={(e: any) => {
                  handleSubmitAcumularPremios(e);
                  handleCloseAcumular();
                }}
                loading={loadingSubmitAcumular}
              >
                Confirmar
              </LoadingButton>
            </Box>
          </Modal>
        </Grid>
      )}
    </>
  );
}
