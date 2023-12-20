import LoadingButton from "@mui/lab/LoadingButton";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  Modal,
  Radio,
  RadioGroup,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CSSProperties, useEffect, useState } from "react";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { TbTrashX } from "react-icons/tb";
import { toast } from "react-toastify";
import { mask } from "remask";
import {
  IResPostPlayRecuperaPacotesLicenciamento,
  postPlayCadastroPacotesVendaChip,
  postPlayDeletarPacotesChips,
  postPlayVisualizaPacotesVendaChip,
} from "../../../../api";
import {
  IReqPostPlayEditarPacotesChips,
  postPlayEditarPacotesChips,
} from "../../../../api/ApisEditarModulo/EditarPacotesChips";
import { Cards, Loading } from "../../../../components";
import useUser from "../../../../hooks/useUser";
import { currencyMask, currencyUnMask, errorToast } from "../../../../utils";

export function EditarPacotesChips() {
  const [loading, setloading] = useState(false);
  const [loadingSubmit, setloadingSubmit] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [editedValues, setEditedValues] = useState<{
    [key: number]: Partial<IResPostPlayRecuperaPacotesLicenciamento>;
  }>({});
  const [responsePacotes, setResponsePacotes] = useState<
    IResPostPlayRecuperaPacotesLicenciamento[]
  >([]);
  const { user } = useUser();

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCardIndex, setSelectedCardIndex] = useState(-1); // Novo estado para o índice do card selecionado

  // breakpoints
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  //

  // Modal exclusao de pacotes
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = (index: number) => {
    setOpen(true);
    setSelectedCardIndex(index);
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
    width: `${smDown ? "300px" : "400px"}`,
    borderRadius: "10px",
    boxShadow: "24",
    backgroundColor: "var(--backGround-sideBar-color)",
    color: "var(--text-color)",
    padding: `${smDown ? "1rem" : "4rem"}`,
    textAlign: "center",
    border: "none",
  };
  //////

  async function handleRecuperaPacotes() {
    setloading(true);

    let payload = {
      token: user?.token ? user.token : "",
    };

    try {
      const data = await postPlayVisualizaPacotesVendaChip(payload);
      setResponsePacotes(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setloading(false);
    }
  }

  const handleEditChange = (id: any, field: string, value: any) => {
    setEditedValues((prevValues) => ({
      ...prevValues,
      [id]: {
        ...prevValues[id],
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    handleRecuperaPacotes();
  }, []);

  // Acrescentar

  const [cardData, setcardData] = useState<IReqPostPlayEditarPacotesChips[]>([
    { nome: "", chips: "", pontos: "", valor_venda: "" },
  ]);
  const handleAddCard = () => {
    setcardData([
      ...cardData,
      { nome: "", chips: "", pontos: "", valor_venda: "" },
    ]);
  };

  const handleInputChanges = (index: any, key: any, value: any) => {
    const newCardData = [...cardData];
    //@ts-ignore
    newCardData[index][key] = value;
    setcardData(newCardData);
  };

  const handleDeleteCard = (index: number) => {
    const newCardData = [...cardData];
    newCardData.splice(index, 1);
    setcardData(newCardData);
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setloadingSubmit(true);
    handleAddCard;
    try {
      const postData = cardData.map((card) => ({
        nome: card.nome,
        chips: card.chips,
        pontos: card.pontos,
        valor_venda: currencyUnMask(card.valor_venda).toString(),
      }));

      const postDataToken = {
        ...postData,
        token: user ? user.token : null,
      };
      //@ts-ignore
      await postPlayCadastroPacotesVendaChip(postDataToken);
      toast.success("Pacotes de chips cadastrados com sucesso");
    } catch (error: any) {
      errorToast(error);
    } finally {
      setloadingSubmit(false);
    }
  }

  async function hendleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingEdit(true);

    try {
      const editedData = responsePacotes.map((item, index) => {
        const editedItem = editedValues[index];

        return {
          id: editedItem?.id || item.id || "", // Adapte conforme necessário
          nome: editedItem?.nome || item.nome || "",
          chips: editedItem?.chips || item.chips || "",
          pontos: editedItem?.pontos || item.pontos || "",
          valor_venda: currencyUnMask(
            editedItem?.valor_venda || item.valor_venda || ""
          ).toString(),
        };
      });
      const postData = {
        ...editedData,
        cpf: user?.cpf || "",
      };
      //@ts-ignore
      await postPlayEditarPacotesChips(postData);
      toast.success("Pacotes de chips Editados!");
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingEdit(false);
    }
  }

  async function handleDelete(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingDelete(true);

    try {
      const selectedCard = responsePacotes[selectedCardIndex];
      const postData = {
        cpf: user?.cpf || "",
        [selectedCardIndex]: {
          id: selectedCard.id || "",
        },
      };
      //@ts-ignore
      await postPlayDeletarPacotesChips(postData);
      toast.success("Pacote de chips excluído com sucesso!");
      handleClose();
      handleRecuperaPacotes();
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingDelete(false);
    }
  }

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Cards
        title={"Configure seus pacotes de Chips."}
        subTitle={""}
        size={"100%"}
      >
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Marque a opção ideal para o seu objetivo
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={0}
            value={selectedValue}
            name="radio-buttons-group"
            onChange={(e: any) => setSelectedValue(e.target.value)}
            sx={{
              textAlign: "start",
            }}
          >
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Editar pacotes de chips já existentes"
            />
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="Excluir pacotes de chips"
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Acrescentar um novo pacote de chips"
            />
          </RadioGroup>
        </FormControl>
      </Cards>

      {selectedValue === "0" && (
        <Cards title={"Editar Pacotes"} subTitle={""} size={"100%"}>
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
            <Grid
              container
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              component={"form"}
              onSubmit={hendleEdit}
            >
              {responsePacotes.map((item, index) => (
                <Grid item xs={12} sm={8} key={index}>
                  <Cards
                    title={item.nome}
                    subTitle={"Edite os dados dos seus pacotes de Chips"}
                    size={"100%"}
                  >
                    <>
                      <TextField
                        variant="standard"
                        label={"Nome"}
                        value={
                          editedValues[index]?.nome !== undefined
                            ? editedValues[index]?.nome
                            : item.nome
                        }
                        onChange={(e) =>
                          handleEditChange(index, "nome", e.target.value)
                        }
                        helperText={
                          "Escolha um nome para o pacote, este nome será mostrado para os usuários"
                        }
                        sx={{ mb: 2 }}
                        fullWidth
                        required
                      />
                      <TextField
                        variant="standard"
                        label={"Chips"}
                        type="tel"
                        value={
                          editedValues[index]?.chips !== undefined
                            ? editedValues[index]?.chips
                            : item?.chips
                        }
                        onChange={(e) =>
                          handleEditChange(index, "chips", e.target.value)
                        }
                        helperText={
                          "Escolha a quantidade de chips que será oferecido pra este pacote"
                        }
                        fullWidth
                        sx={{ mb: 2 }}
                        required
                      />
                      <TextField
                        variant="standard"
                        label={"Pontos"}
                        type="tel"
                        value={
                          editedValues[index]?.pontos !== undefined
                            ? editedValues[index]?.pontos
                            : item?.pontos
                        }
                        onChange={(e) =>
                          handleEditChange(index, "pontos", e.target.value)
                        }
                        helperText={
                          "Defina a quantidade de pontos que cada venda deste modulo irá gerar para os usuários"
                        }
                        sx={{ mb: 2 }}
                        fullWidth
                        required
                      />
                      <TextField
                        type="tel"
                        id="id_valor_plano"
                        label="Valor de venda"
                        placeholder="0,00"
                        value={
                          editedValues[index]?.valor_venda !== undefined
                            ? editedValues[index]?.valor_venda
                            : item?.valor_venda
                        }
                        onChange={(e) =>
                          handleEditChange(
                            index,
                            "valor_venda",
                            currencyMask(e.target.value)
                          )
                        }
                        variant="standard"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                          ),
                        }}
                      />
                    </>
                  </Cards>
                </Grid>
              ))}

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-evenly",
                  mb: 2,
                }}
              >
                <LoadingButton
                  type="submit"
                  variant="contained"
                  onClick={(e: any) => hendleEdit(e)}
                  loading={loadingEdit}
                >
                  Confirmar Edição
                </LoadingButton>
              </Box>
            </Grid>
          )}
        </Cards>
      )}
      {selectedValue === "1" && (
        <>
          <Cards title={"Excluir Pacotes de Chips"} subTitle={""} size={"100%"}>
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
              <Grid
                container
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                component={"form"}
                onSubmit={() => ""}
              >
                {responsePacotes.map((item, index) => (
                  <>
                    <Grid item xs={12} sm={8}>
                      <Cards
                        key={index}
                        title={item.nome}
                        subTitle={"Exclua  pacotes"}
                        size={"100%"}
                      >
                        <Box>
                          <Typography>Oferece: {item.chips} chips</Typography>
                          <Typography>
                            Oferece: {item.pontos} pontos para a rede do usuário
                          </Typography>
                          <Typography>
                            {" "}
                            Valor de venda: R$ {item.valor_venda}
                          </Typography>
                        </Box>

                        <IconButton
                          color="error"
                          onClick={() => handleOpen(index)}
                        >
                          <TbTrashX />
                        </IconButton>
                      </Cards>
                    </Grid>
                    <Modal
                      open={open && selectedCardIndex === index}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                        >
                          Certeza que deseja excluir : {item.nome}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Ao excluir este pacote ele não vai poder ser comprado
                          por novos usuários
                        </Typography>
                        <LoadingButton
                          color="error"
                          variant="contained"
                          fullWidth
                          sx={{ my: 2 }}
                          onClick={(e: any) => handleDelete(e)}
                          loading={loadingDelete}
                        >
                          Excluir
                        </LoadingButton>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleClose()}
                        >
                          Cancelar
                        </Button>
                      </Box>
                    </Modal>
                  </>
                ))}
              </Grid>
            )}
          </Cards>
        </>
      )}
      {selectedValue === "2" && (
        <Cards
          title={"Acrescentar Pacotes de chips"}
          subTitle={"Acrescente pacotes na sua lista de vendas"}
          size={"100%"}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
            component={"form"}
            onSubmit={handleSubmit}
          >
            {cardData.map((card, index) => (
              <Cards
                key={index}
                title={"Pacote de Chips"}
                subTitle={"Cadastre os dados dos seus pacotes de costumizaveis"}
                size={`${smDown ? "100%" : "50%"}`}
              >
                <TextField
                  variant="standard"
                  label={"Nome"}
                  value={card.nome}
                  onChange={(e: any) =>
                    handleInputChanges(index, "nome", e.target.value.trim())
                  }
                  helperText={
                    "Escolha um nome para o pacote, este nome será mostrado para os usuários"
                  }
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  variant="standard"
                  label={"Chips"}
                  value={card.chips}
                  type="tel"
                  onChange={(e: any) =>
                    handleInputChanges(index, "chips", e.target.value)
                  }
                  helperText={
                    "Escolha a quantidade de chips que será oferecido pra este pacote"
                  }
                  fullWidth
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  variant="standard"
                  label={"Pontos"}
                  value={mask(card.pontos, "9999")}
                  onChange={(e: any) =>
                    handleInputChanges(index, "pontos", e.target.value)
                  }
                  type="tel"
                  helperText={
                    "Defina a quantidade de pontos que cada venda deste modulo irá gerar para os usuários"
                  }
                  sx={{ mb: 2 }}
                  required
                />
                <TextField
                  type="tel"
                  id="id_valor_plano"
                  label="Valor de venda"
                  placeholder="0,00"
                  value={card.valor_venda}
                  onChange={(e: any) =>
                    handleInputChanges(
                      index,
                      "valor_venda",
                      currencyMask(e.target.value)
                    )
                  }
                  variant="standard"
                  fullWidth
                  required
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">R$</InputAdornment>
                    ),
                  }}
                />
                {index !== 0 && (
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCard(index)}
                  >
                    <TbTrashX />
                  </IconButton>
                )}
              </Cards>
            ))}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <Box mt={2}>
                <Tooltip title="Adicionar um novo pacote de chips">
                  <IconButton
                    onClick={() => handleAddCard()}
                    sx={{ backgroundColor: "var(--primary-color)" }}
                  >
                    <HiOutlinePlusSmall />
                  </IconButton>
                </Tooltip>
              </Box>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={loadingSubmit}
              >
                Salvar
              </LoadingButton>
            </Box>
          </Box>
        </Cards>
      )}
    </Box>
  );
}
