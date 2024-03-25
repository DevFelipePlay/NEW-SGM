import LoadingButton from "@mui/lab/LoadingButton";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { mask } from "remask";
import { StepsCadastroUserMMN } from "..";
import {
  IReqPostPlayAtivacaoLinha,
  IReqPostPlayLicenciados,
  IReqPostPlayRecuperaPlanosPreferidos,
  IResPostPlayLicenciados,
  IresPostPlayRecuperaPlanosPreferidos,
  postPlayAtivacaoLinha,
  postPlayLicenciados,
  postPlayRecuperaPlanosPreferidos,
} from "../../../../api";
import { postPlayValidaICCID } from "../../../../api/ApisUtils/validaICCID";
import { Cards, MUIDataTableCustom } from "../../../../components";
import { useForm } from "../../../../hooks";
import useUser from "../../../../hooks/useUser";
import { errorToast } from "../../../../utils";

export function AtivacaoLinha() {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [loadingValidate, setLoadingValidate] = useState(false);
  const [loadingValidateICCID, setLoadingValidateICCID] = useState(false);
  const [loadingViewLicenciados, setLoadingViewLicenciados] = useState(false);
  const [isIccidValid, setIsIccidValid] = useState<boolean>(false);
  const [responsePLanosPreferidos, setResponsePLanosPreferidos] = useState<
    IresPostPlayRecuperaPlanosPreferidos[]
  >([]);
  const [responseLicenciados, setResponseLicenciados] = useState<
    IResPostPlayLicenciados[]
  >([]);

  const { user } = useUser();

  //Modal Planos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleShowModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const style: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "95vh",
    borderRadius: "10px",
    boxShadow: "24",
    backgroundColor: "white",
    color: "black)",
    padding: 1,
    textAlign: "center",
    border: "none",
    overflowY: "scroll",
    overflowX: "hidden",
    paddingBottom: 2,
  };
  //Modal Licenciados
  const [isModalLicenciadosOpen, setIsModalLicenciadosOpen] = useState(false);
  const handleShowModalLicenciados = () => {
    setIsModalLicenciadosOpen(true);
  };

  const handleCloseModalLicenciados = () => {
    setIsModalLicenciadosOpen(false);
  };

  const styleLicenciados: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    height: "95vh",
    borderRadius: "10px",
    boxShadow: "24",
    backgroundColor: "white",
    color: "black)",
    padding: 1,
    textAlign: "center",
    border: "none",
    overflowY: "scroll",
    overflowX: "hidden",
    paddingBottom: 2,
  };

  async function handlePlanosPreferidos() {
    let payload: IReqPostPlayRecuperaPlanosPreferidos = {
      token: user?.token ? user.token : "",
    };
    try {
      const data = await postPlayRecuperaPlanosPreferidos(payload);
      setResponsePLanosPreferidos(data);
    } catch (error: any) {
      errorToast(error);
    }
  }

  const { formData, changeForm } = useForm<IReqPostPlayAtivacaoLinha>({
    cpf: user?.cpf ? user?.cpf : "",
    iccid: "",
    ddd: "",

    pospago: false,
    token: user?.token ? user.token : "",
  });

  async function handleValidate(id: string, planid: string) {
    setLoadingValidate(true);

    const postData = {
      ...formData,
      planid_personalizado: id,
      planid: planid,
    };
    try {
      await postPlayAtivacaoLinha(postData);
      toast.success("Sua fatura foi gerada e poderá ser vista no aplicativo");
      navigate(
        `/${user?.companyref}/primeiro-acesso-multinivel-usuario/cadastro-dados-financeiros-usuario`
      );
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingValidate(false);
    }
  }

  async function handleValidateICCID() {
    setLoadingValidateICCID(true);
    let payload = {
      iccid: formData.iccid ? formData.iccid : "",
      cpf: user?.cpf ? user?.cpf : "",
    };
    try {
      await postPlayValidaICCID(payload);
      setIsIccidValid(true);
      toast.success("Seu ICCID é valido");
    } catch (error: any) {
      errorToast(error);
      setIsIccidValid(false);
    } finally {
      setLoadingValidateICCID(false);
    }
  }

  async function handleLicenciados(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setLoadingViewLicenciados(true);

    const payload: IReqPostPlayLicenciados = {
      token: user?.token || "",
      UF: user?.UF || "",
    };
    try {
      const data = await postPlayLicenciados(payload);
      setResponseLicenciados(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingViewLicenciados(false);
    }
  }

  useEffect(() => {
    if (formData.iccid.length === 19) {
      handleValidateICCID();
    }
  }, [formData.iccid]);

  useEffect(() => {
    handlePlanosPreferidos();
  }, []);

  return (
    <StepsCadastroUserMMN step={1}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        component={"form"}
        onSubmit={(e) => {
          e.preventDefault();
          handleShowModal();
        }}
      >
        <Cards
          title="Ative a sua linha"
          subTitle="Ative sua linha para ter acesso ao módulo"
          size={smDown ? "100%" : "50%"}
        >
          <Typography variant={"subtitle2"} color={"#808080"} sx={{ mt: 2 }}>
            Escolha seu DDD
          </Typography>
          <Select
            required
            label={"DDD"}
            variant={"standard"}
            value={formData.ddd}
            onChange={(e) => changeForm("ddd", e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          >
            {Array.from({ length: 89 }, (_, index) => (
              <MenuItem
                key={index}
                value={(index + 11).toString().padStart(2, "0")}
              >
                {(index + 11).toString().padStart(2, "0")}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Número do ICCID"
            type="tel"
            value={mask(formData.iccid, ["9999999999999999999"])}
            variant="standard"
            onChange={(e) => changeForm("iccid", e.target.value)}
            helperText={
              !isIccidValid
                ? "O ICCID não é valido, o núero do ICCID encontra-se abaixo do código de barras do seu chip"
                : "O número do ICCID encontra-se abaixo do código de barras do seu chip"
            }
            fullWidth
            error={formData.iccid.length > 19 && !isIccidValid}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {loadingValidateICCID ? (
                    <CircularProgress size={"20px"} />
                  ) : (
                    ""
                  )}
                </InputAdornment>
              ),
            }}
          />

          <LoadingButton
            loading={loadingValidate}
            variant="contained"
            type="submit"
            sx={{ mt: 2 }}
            disabled={isIccidValid === false}
            fullWidth
          >
            Escolher plano
          </LoadingButton>
          <LoadingButton
            loading={loadingValidate}
            variant="outlined"
            onClick={() =>
              navigate(
                `/${user?.companyref}/primeiro-acesso-multinivel-usuario/cadastro-dados-financeiros-usuario`
              )
            }
            sx={{ mt: 2 }}
            color="warning"
            fullWidth
          >
            Já Possuo uma linha ativa
          </LoadingButton>
          <Button
            variant="outlined"
            color="warning"
            fullWidth
            sx={{ mt: 2 }}
            onClick={(e: React.FormEvent<HTMLElement>) => {
              handleShowModalLicenciados();
              handleLicenciados(e);
            }}
          >
            ainda não possuo um chip
          </Button>
        </Cards>

        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{
                mt: 0,
                width: {
                  xs: "100%",
                  sm: "80%",
                },
                maxHeight: "75vh",
                pb: 5,
              }}
            >
              <Typography variant="h5">Escolha seu plano</Typography>
              <Alert severity="warning">
                Após o pagamento do seu plano, a ativação pode levar até duas
                horas para ser concluída.
              </Alert>
              {responsePLanosPreferidos.map((i, index) => (
                <Cards
                  title={i.nomeplano}
                  subTitle={"Escolha seu plano"}
                  size={"100%"}
                  key={index}
                >
                  <Typography>{i.descricao}</Typography>
                  <Typography
                    variant="h4"
                    sx={{ mt: 2 }}
                    color={"var(--primary-color)"}
                  >
                    R$ {i.value}
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => handleValidate(i.id, i.planid)}
                  >
                    Comprar e ativar
                  </Button>
                </Cards>
              ))}
              <Box height={"10px"} />
            </Box>
          </Box>
        </Modal>
        <Modal
          open={isModalLicenciadosOpen}
          onClose={handleCloseModalLicenciados}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box sx={styleLicenciados}>
            <Typography variant="h4" color={"var(--primary-color)"}>
              Lista de Vendedores Licenciados perto de você!
            </Typography>
            <Typography variant="h6">
              Entre em contato e solicite um chip agora mesmo!
            </Typography>
            <Box
              sx={{
                width: "100%",
                py: 2,
              }}
            >
              <MUIDataTableCustom
                title=""
                data={responseLicenciados && responseLicenciados}
                loading={loadingViewLicenciados}
                columns={[
                  {
                    name: "nome",
                    label: "Nome",
                  },
                  {
                    name: "uf",
                    label: "UF",
                  },
                  {
                    name: "city",
                    label: "Cidade",
                  },
                  {
                    name: "telefone",
                    label: "Telefone",
                    options: {
                      customBodyRender: (value) => (
                        <Box sx={{ whiteSpace: "nowrap" }}>
                          {mask(value, "(99) 99999-9999")}
                        </Box>
                      ),
                    },
                  },
                ]}
              />
            </Box>
          </Box>
        </Modal>
      </Box>
    </StepsCadastroUserMMN>
  );
}
