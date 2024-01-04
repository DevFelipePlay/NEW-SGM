import { Box, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Cards } from "../../../../../components";

const data = [
  { name: "Janeiro", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Fevereiro", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Março", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Abril", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Maio", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Junho", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Julho", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Agosto", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Setembro", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Outubro", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Novembro", uv: 3490, pv: 4300, amt: 2100 },
  { name: "Dezembro", uv: 3490, pv: 4300, amt: 2100 },
];

const data2 = [
  { name: "ATIVAÇÃO", value: 400 },
  { name: "RECARGA", value: 300 },
  { name: "VENDA DE CHIP", value: 300 },
];
const data3 = [
  { name: "Recarga", value: 400 },
  { name: "Licenças ", value: 300 },
  { name: "Pacote de chips", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

interface Iconst {
  cx: any;
  cy: any;
  midAngle: any;
  innerRadius: any;
  outerRadius: any;
  percent: any;
}

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: Iconst) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
export default function Tab0() {
  //breakpoints
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid
        xs={12}
        sm={"auto"}
        xl={6}
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Cards title={"Escala de usuários novos"} subTitle={""} size="90%">
          <LineChart
            width={smDown ? 250 : mdDown ? 400 : 500}
            height={400}
            data={data}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="uv"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
          </LineChart>
        </Cards>
        <Cards
          title={"Relação entre ativações e recargas"}
          subTitle={""}
          size={"90%"}
        >
          <BarChart
            width={smDown ? 250 : mdDown ? 400 : 500}
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
          title={"Total de Usuários Ativos"}
          subTitle={"Usuários ativos"}
          size={"90%"}
        >
          <Typography variant={smDown ? "h5" : "h4"}>
            40.973 Pessoas Ativas
          </Typography>
        </Cards>
      </Grid>
      <Grid
        item
        xs={12}
        sm={"auto"}
        xl={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Cards
          title={"Divisão do total de lucro"}
          subTitle={""}
          size={smDown ? "80%" : "100%"}
        >
          <PieChart width={smDown ? 200 : mdDown ? 300 : 400} height={400}>
            <Pie
              data={data2}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {
                //@ts-ignore
                data2.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))
              }
            </Pie>
            <Legend />
          </PieChart>
        </Cards>
        <Cards
          title={"Total do lucro mensal"}
          subTitle={"Lucro do mês de testeneiro"}
          size={"100%"}
        >
          <Typography variant="h4">R$ 320.000</Typography>
        </Cards>
        <Cards
          title={"Total do faturamento bruto"}
          subTitle={"Lucro do mês de testeneiro"}
          size={"100%"}
        >
          <PieChart width={smDown ? 250 : 400} height={400}>
            <Pie
              data={data3}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data2.map((item, index) => (
                <>
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                  <Typography>{item.name}</Typography>
                </>
              ))}
            </Pie>
            <Legend />
          </PieChart>
          <Box sx={{ mb: 1 }}>
            <Typography variant={smDown ? "h5" : "h4"}>Recargas</Typography>
            <Typography variant="h6">R$ 30.000</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant={smDown ? "h5" : "h4"}>Licenças</Typography>
            <Typography variant="h6">R$ 890.000</Typography>
          </Box>
          <Box sx={{ mb: 1 }}>
            <Typography variant={smDown ? "h5" : "h4"}>
              Pacotes de chips
            </Typography>
            <Typography variant="h6">R$ 520.000</Typography>
          </Box>
        </Cards>
      </Grid>
    </Grid>
  );
}
