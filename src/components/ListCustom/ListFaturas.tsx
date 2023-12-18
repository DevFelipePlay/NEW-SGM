import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack,
  styled,
} from "@mui/material";
import { Link } from "react-router-dom";

interface IlistCustom {
  valor: string;
  dataDeCriacao: string;
  tipoDaFaturas: string;
  status: string;
  colorStatus: string;
  idFatura: string;
}

export function ListFaturasAtivacaoERecarga({
  valor,
  dataDeCriacao,
  idFatura,
  tipoDaFaturas,
  status,
  colorStatus,
}: IlistCustom) {
  const Demo = styled("div")(() => ({
    backgroundColor: "color.background.default",
  }));

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
      <Grid item xs={12} md={6}>
        <Demo>
          <List>
            <ListItem
              secondaryAction={<Stack direction="row" spacing={2}></Stack>}
              sx={{
                bgcolor: "#5f5f5f",
                color: "white",

                cursor: "pointer",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: "12px",
                  background: `${colorStatus}`,
                  height: "140px",
                  border: "solid 1px ",
                  marginRight: "10px",
                  borderRadius: "20px",
                }}
              ></div>
              <Box>
                <ListItemText sx={{ userSelect: "none" }}>
                  Criada em: {dataDeCriacao}
                </ListItemText>
                <ListItemText sx={{ userSelect: "none" }}>
                  Tipo: {tipoDaFaturas}
                </ListItemText>
                <ListItemText sx={{ userSelect: "none" }}>
                  Status: {status}
                </ListItemText>
                <ListItemText sx={{ userSelect: "none" }}>
                  R$ {valor}
                </ListItemText>
                <ListItemText sx={{ userSelect: "none" }}>
                  link:
                  <Link
                    style={{
                      wordBreak: "break-all",
                    }}
                    to={`https://fatura.operadora.app.br/?payid=${idFatura}`}
                    target="_blank"
                  >
                    https://fatura.operadora.app.br/?payid={idFatura}
                  </Link>
                </ListItemText>
              </Box>
            </ListItem>
          </List>
        </Demo>
      </Grid>
    </Box>
  );
}
