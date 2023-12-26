import { useState } from "react";
import { CustomizedTabs, DefaultContainer } from "../../../components";
import DashBoardInfoUserMMN from "./Tab0";

export default function InfoUserMMN() {
  const [tabValue, setTabValue] = useState(0);
  console.log(tabValue);

  return (
    <DefaultContainer
      page={"Multinível"}
      title={"Bem-vindo"}
      subTitle={"Ficamos felizes em tê-lo de volta"}
      showSearch={false}
      showAvatar={true}
    >
      <CustomizedTabs
        value={tabValue}
        onChange={(newValue) => setTabValue(newValue)}
        tabsData={[
          { label: "Inicio", value: 0 },
          { label: "Relatório de vendas", value: 1 },
        ]}
        mostrarBotaoVoltar={false}
        mostrarNavbar={false}
      />
      {tabValue === 0 && <DashBoardInfoUserMMN />}
    </DefaultContainer>
  );
}
