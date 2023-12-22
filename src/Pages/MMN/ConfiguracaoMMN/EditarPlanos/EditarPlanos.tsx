import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import {
  Box,
  MenuItem,
  Select,
  Switch,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  IResPostPlayRecuperaPlanosPrimeiroAcesso,
  postPlayEditarPlano,
  postPlayRecuperaPlanosPrimeiroAcesso,
} from "../../../../api";
import { Loading } from "../../../../components";
import useUser from "../../../../hooks/useUser";
import { errorToast } from "../../../../utils";

export function EditarPlanos() {
  const [loadingView, setLoadingView] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);

  const [responseView, setResponseView] = useState<
    IResPostPlayRecuperaPlanosPrimeiroAcesso[]
  >([]);
  const [editedValues, setEditedValues] = useState<{
    [key: number]: Partial<IResPostPlayRecuperaPlanosPrimeiroAcesso>;
  }>({});
  const { user } = useUser();
  const label = { inputProps: { "aria-label": "Plano MMN" } };

  //breakpoints
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));
  //

  async function handleView() {
    setLoadingView(true);

    let payload = {
      token: user?.token ? user?.token : "",
    };
    try {
      const data = await postPlayRecuperaPlanosPrimeiroAcesso(payload);
      setResponseView(data);
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingView(false);
    }
  }
  async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoadingEdit(true);

    try {
      const editedData = responseView.map((item, index) => {
        const editedItem = editedValues[index];

        return {
          plano_id: editedItem?.id?.toString() || item.id.toString() || "",
          acao:
            editedItem?.preferido !== undefined
              ? editedItem.preferido
              : item.preferido,

          nivel: editedItem?.nivel || item.nivel || "",
        };
      });
      const postData = {
        cpf: user?.cpf || "",
        token: user?.token || "",
        ...editedData,
      };
      //@ts-ignore
      await postPlayEditarPlano(postData);
      toast.success("Graduações Editados!");
    } catch (error: any) {
      errorToast(error);
    } finally {
      setLoadingEdit(false);
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
    handleView();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        p: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {loadingView ? (
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
          {responseView.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "100%",
                boxShadow:
                  " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                display: "flex",
                flexDirection: `${smDown ? "column" : "row"}`,
                alignItems: "center",
                p: 1,
                mb: 2,
                borderRadius: "10px",
                justifyContent: "space-between",
                textAlign: `${smDown ? "center" : "start"}`,
              }}
            >
              <Box sx={{ width: `${smDown ? "100%" : "30%"}` }}>
                <Typography variant="h6">{item.nomeplano}</Typography>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="subtitle2" color="var(--sub-text-color)">
                  Níveis que este plano acessa
                </Typography>
                <Select
                  labelId="nivel-label"
                  id="nivel"
                  label="Nível"
                  value={editedValues[index]?.nivel || item.nivel || "0"}
                  variant="standard"
                  onChange={(e) =>
                    handleEditChange(index, "nivel", e.target.value)
                  }
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "50%",
                    },
                  }}
                >
                  {[...Array(11).keys()].map((value) => (
                    <MenuItem key={value} value={value}>
                      {value} {value > 1 ? "Níveis" : "Nível"}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Tooltip title={"Plano MMN"}>
                <Switch
                  {...label}
                  checked={
                    editedValues[index]?.preferido !== undefined
                      ? editedValues[index]?.preferido
                      : item.preferido
                  }
                  onChange={(e) =>
                    handleEditChange(index, "preferido", e.target.checked)
                  }
                />
              </Tooltip>
            </Box>
          ))}
          <LoadingButton
            loading={loadingEdit}
            variant="contained"
            onClick={(e: any) => handleEdit(e)}
          >
            Confirmar Edição
          </LoadingButton>
        </>
      )}
    </Box>
  );
}
