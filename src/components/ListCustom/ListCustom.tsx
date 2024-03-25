import DeleteIcon from "@mui/icons-material/Delete";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  Stack,
  Tooltip,
  Typography,
  Zoom,
  styled,
} from "@mui/material";
import { MouseEventHandler, useState } from "react";
import { MdModeEditOutline } from "react-icons/md";

interface IlistCustom {
  avatar: string;
  nome: string;
  cpf: string;
  editar: MouseEventHandler<HTMLButtonElement>;
  excluir: MouseEventHandler<HTMLButtonElement>;
  pressItemList: MouseEventHandler<HTMLDivElement>;
}

export function ListCustom({
  nome,
  cpf,
  editar,
  excluir,
  pressItemList,
}: IlistCustom) {
  const Demo = styled("div")(() => ({
    backgroundColor: "color.background.default",
  }));

  const [selectedSeller, setSelectedSeller] = useState(null);
  console.log(selectedSeller);

  const [open, setOpen] = useState(false);
  const handleOpen = (seller: any) => {
    setSelectedSeller(seller);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: "30px",
  };

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid item xs={12} md={6}>
        <Demo>
          <List>
            <ListItem
              sx={{
                bgcolor: "#5f5f5f",
                color: "white",
                "&:hover": {
                  bgcolor: "var(--text_header_color)",
                  color: "white",
                  transition: "all 0.3s",
                },
                cursor: "pointer",
                borderRadius: "10px",
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                },
                textAlign: {
                  xs: "center",
                  sm: "inherit",
                },
                gap: 1,
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                  },
                  gap: {
                    xs: 1,
                    sm: 2,
                  },
                }}
              >
                <ListItemAvatar sx={{ minWidth: "0" }}>
                  <Tooltip
                    title="Abrir Informações"
                    arrow
                    TransitionComponent={Zoom}
                    TransitionProps={{ timeout: 600 }}
                    onClick={pressItemList}
                  >
                    <Avatar
                      sx={{
                        width: {
                          xs: 52,
                          sm: 40,
                        },
                        height: {
                          xs: 52,
                          sm: 40,
                        },
                      }}
                    />
                  </Tooltip>
                </ListItemAvatar>
                <Box>
                  <ListItemText
                    sx={{ userSelect: "none" }}
                    onClick={pressItemList}
                  >
                    Nome: {nome}
                  </ListItemText>
                  <ListItemText
                    sx={{ userSelect: "none" }}
                    onClick={pressItemList}
                  >
                    CPF: {cpf}
                  </ListItemText>
                </Box>
              </Box>
              <Stack order={2} direction="row" spacing={2}>
                <Tooltip
                  title="Editar"
                  arrow
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 600 }}
                >
                  <IconButton
                    sx={{
                      color: "primary.light",
                      bgcolor: "white",
                      width: {
                        xs: 32,
                        sm: 38,
                      },
                      height: {
                        xs: 32,
                        sm: 38,
                      },
                    }}
                    edge="end"
                    aria-label=""
                    onClick={editar}
                  >
                    <MdModeEditOutline />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  title={`Excluir`}
                  arrow
                  TransitionComponent={Zoom}
                  TransitionProps={{ timeout: 400 }}
                >
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    sx={{
                      bgcolor: "white",
                      width: {
                        xs: 32,
                        sm: 38,
                      },
                      height: {
                        xs: 32,
                        sm: 38,
                      },
                    }}
                    onClick={() => handleOpen("")}
                    disabled
                  >
                    <DeleteIcon style={{ color: "grey" }} />
                  </IconButton>
                </Tooltip>
              </Stack>
            </ListItem>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Stack spacing={2} sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  textAlign={"center"}
                >
                  Tem certeza que deseja excluir este usuário?
                </Typography>
                <Alert sx={{ mb: 2, textAlign: "center" }} severity="info">
                  <AlertTitle>
                    Ao realizar a exclusão deste usuário, todas as informações
                    serão excluídas
                  </AlertTitle>
                  Ao excluir dados do banco de dados, é importante ter cuidado e
                  considerar as consequências, pois a exclusão será permanente e
                  irreversível. Recomenda-se fazer backup dos dados antes de
                  prosseguir com essa ação, a fim de garantir a preservação e
                  disponibilidade dos dados para referências futuras, se
                  necessário.
                </Alert>
                <Button color="error" variant="contained" onClick={excluir}>
                  Excluir
                </Button>
                <Button onClick={() => handleClose()} variant="contained">
                  Cancelar
                </Button>
              </Stack>
            </Modal>
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
