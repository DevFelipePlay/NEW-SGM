import {
  Box,
  Button,
  Grid,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { PiHandCoins } from "react-icons/pi";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { DefaultContainer } from "../../../../../components";

import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IResPostPlayGeraFaturaLicenciamento,
  IResPostPlayRecuperaPacotesLicenciamento,
  postPlayGeraFaturaLicenciamento,
  postPlayRecuperaPacotesLicenciamento,
} from "../../../../../api";
import { Cards, Loading } from "../../../../../components";
import useUser from "../../../../../hooks/useUser";
import { errorToast } from "../../../../../utils";

const style = {
  flexDirection: "column",
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  borderRadius: "10px",
  boxShadow: "24",
  backgroundColor: "var(--backGround-sideBar-color)",
  color: "var(--text-color)",
  padding: "4rem",
  textAlign: "center",
  border: "none",
};

export function AdquirirLicenciamento() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [responseBuy, setResponseBuy] =
    useState<IResPostPlayGeraFaturaLicenciamento>();

  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));

  const { user } = useUser();

  const [response, setResponse] = useState<
    IResPostPlayRecuperaPacotesLicenciamento[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [loadingBuy, setLoadingBuy] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setLoading(true);

    let payload = {
      token: user?.token ? user?.token : "",
    };

    try {
      const data = await postPlayRecuperaPacotesLicenciamento(payload);
      setResponse(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleBuyPacks(packageId: string) {
    setLoadingBuy(true);

    let payload = {
      token: user?.token ? user?.token : "",
      cpf: user?.cpf ? user?.cpf : "",
      id: packageId,
    };

    try {
      const data = await postPlayGeraFaturaLicenciamento(payload);
      setResponseBuy(data);
      toast.success("Solicitação de compra realizada");
      handleOpen();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingBuy(false);
    }
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <DefaultContainer
      page={"Adiquirir Licenciamento"}
      title={"Licenciamento"}
      subTitle={"Obtenha acesso ao multinível"}
      showSearch={false}
      showAvatar={true}
    >
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <Typography variant="h4">Pacotes</Typography>
          <Typography>Escolha o melhor pacote para você</Typography>
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
            <Box width={"100%"}>
              <Grid container width={"100%"}>
                {response &&
                  response.map &&
                  response.map(
                    (i: IResPostPlayRecuperaPacotesLicenciamento, index) => (
                      <Grid item xs={4} key={index}>
                        <Cards
                          title={i.nome}
                          subTitle={"Escolha o seu pacote"}
                          size={
                            smDown
                              ? "100vm"
                              : mdDown
                              ? "200px"
                              : lgDown
                              ? "200px"
                              : "350px"
                          }
                          showIcon
                          bgColorIcon="var(--primary-color)"
                          icon={<PiHandCoins />}
                        >
                          <Typography> Acesso ao multinível +</Typography>
                          <Typography>{i.chips} Chips </Typography>

                          <Typography
                            variant="subtitle2"
                            color={"var(--sub-text-color)"}
                            sx={{ mt: 2 }}
                          >
                            Por apenas:
                          </Typography>
                          <Typography variant="h5">
                            R$ {i.valor_venda}
                          </Typography>
                          <LoadingButton
                            onClick={() => handleBuyPacks(i.id)}
                            variant="contained"
                            sx={{ mt: 2 }}
                            loading={loadingBuy}
                          >
                            Contratar
                          </LoadingButton>
                        </Cards>
                      </Grid>
                    )
                  )}
              </Grid>
            </Box>
          )}
        </Box>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{ ...style, textAlign: "center" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ mb: 2 }}
            >
              Sua solicitação de compra foi realizada, clique no link e pague
              sua fatura ou visualize a fatura pelo seu aplicativo:
            </Typography>
            <Box sx={{ backgroundColor: "white", p: 1, borderRadius: "10px" }}>
              <a
                id="modal-modal-description"
                href={`https://faturammn.operadora.app.br/?payid=${responseBuy?.payid}`}
                target="_blank"
              >
                <Typography>
                  https://faturammn.operadora.app.br/?payid={responseBuy?.payid}
                </Typography>
              </a>
            </Box>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => navigate("/home-usuario-mmn")}
            >
              voltar para home
            </Button>
          </Box>
        </Modal>
      </>
    </DefaultContainer>
  );
}
