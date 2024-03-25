import {
  Avatar,
  Box,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { GiLaurelsTrophy } from "react-icons/gi";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import perfil from "../../../../assets/MMNImg/perfil.jpeg";
import { Cards } from "../../../../components";

export default function DashBoardInfoUserMMN() {
  const data = [
    { name: "Janeiro", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Fevereiro", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Março", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Abril", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Maio", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Junho", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Julho", uv: 3490, pv: 4300, amt: 2100 },
  ];

  //breakpoints
  const theme = useTheme();
  const lgDown = useMediaQuery(theme.breakpoints.down("lg"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Cards title={"Dados Pessoais"} subTitle={""} size={"100%"}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Avatar sx={{ width: "100px", height: "100px", mb: 2 }}>
                <img src={perfil} style={{ width: "100%" }} />
              </Avatar>
              <Typography variant="h5">Ellon Musk</Typography>
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
                sx={{ display: "flex", flexDirection: "row", mt: 1 }}
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
                  <Typography>Plano Ativo:</Typography>
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
                  <Typography>OPUSCELL CORPORATIVO</Typography>
                  <Typography>MAXX</Typography>
                  <Typography>10/09/2023</Typography>
                  <Typography>Platina</Typography>
                </Grid>
              </Grid>
            </Box>
          </Cards>
          <Cards
            title={"Relação entre ativações e recargas"}
            subTitle={""}
            size={"100%"}
          >
            <BarChart
              width={smDown ? 250 : lgDown ? 500 : 700}
              height={250}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </Cards>
          <Cards
            title={"Total de vendas"}
            subTitle={"Total em dinheiro das vendas feitas por este usuário "}
            size={"100%"}
          >
            <Typography variant="h4">R$ 53,000.96</Typography>
          </Cards>
        </Grid>
        <Grid item xs={12} md={4}>
          <Cards
            title={"Plano mais vendido"}
            subTitle={"Plano mais vendido este mês"}
            size={"100%"}
          >
            <Avatar
              sx={{
                backgroundColor: "#FFCD4D",
                width: "100px",
                height: "100px",
                boxShadow:
                  " rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
                mb: 4,
              }}
            >
              <GiLaurelsTrophy style={{ fontSize: "3rem" }} />
            </Avatar>
            <div
              style={{
                width: "30%",
                height: "1px",
                backgroundColor: "var(--primary_color)",
              }}
            />
            <Typography
              variant="h5"
              sx={{ m: 2, color: "var(--primary_color)" }}
            >
              MAXX
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ fontSize: "1.2rem" }}>6 GB</Typography>
              <Typography sx={{ fontSize: "1.2rem" }}>
                100 minutos para SMS
              </Typography>
              <Typography sx={{ fontSize: "1.2rem" }}>
                WhatsApp Grátis
              </Typography>
              <Typography sx={{ fontSize: "1.2rem" }}>Dizzer</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box sx={{ mr: 5 }}>
                <Typography>Total de ativações</Typography>
                <Typography variant="h5">525</Typography>
              </Box>
              <Box>
                <Typography>Total de recargas</Typography>
                <Typography variant="h5">1525</Typography>
              </Box>
            </Box>
          </Cards>
          <Cards
            title={"Níveis de Usuário"}
            subTitle={"Níveis que este usuário pode receber"}
            size={"100%"}
          >
            <Typography variant="h5">10</Typography>
          </Cards>
          <Grid item>
            <Cards
              title={"Total de Usuários ativos"}
              subTitle={"Total de usuários indicados "}
              size={"100%"}
            >
              <Typography variant="h4">1.200</Typography>
            </Cards>
          </Grid>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </>
  );
}
